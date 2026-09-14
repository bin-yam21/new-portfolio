import { NextResponse } from "next/server";
import { Resend } from "resend";

// Node runtime: the in-memory rate limiter below needs a persistent module
// scope, which the edge runtime doesn't reliably give us.
export const runtime = "nodejs";

const LIMITS = { name: 120, email: 200, message: 5000 } as const;

/** Longest a message can be before it's almost certainly not a real enquiry. */
const MIN_MESSAGE_LENGTH = 10;

const isNonEmptyString = (v: unknown, max: number) =>
  typeof v === "string" && v.trim().length > 0 && v.trim().length <= max;

/**
 * Naive fixed-window rate limit, keyed by client IP.
 *
 * This lives in module scope, so it only protects a single warm instance —
 * enough to stop a script hammering the form and burning the Resend quota,
 * not a substitute for a real limiter (Upstash, Vercel KV) if this ever gets
 * meaningful traffic.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimit(key: string) {
  const now = Date.now();
  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  entry.count += 1;
  if (entry.count > MAX_PER_WINDOW) {
    return {
      allowed: false,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    };
  }
  return { allowed: true, retryAfter: 0 };
}

/** Keeps the map from growing without bound on a long-lived instance. */
function sweep() {
  if (hits.size < 500) return;
  const now = Date.now();
  for (const [key, entry] of hits) {
    if (now > entry.resetAt) hits.delete(key);
  }
}

function clientIp(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: Request) {
  try {
    sweep();
    const { allowed, retryAfter } = rateLimit(clientIp(req));
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many messages. Please try again a little later." },
        { status: 429, headers: { "Retry-After": String(retryAfter) } }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
    }

    const { name, email, message, company } = body as Record<string, unknown>;

    // Honeypot: a hidden field no human ever fills in. Answer 200 so a bot
    // can't distinguish a rejected submission from an accepted one.
    if (typeof company === "string" && company.trim().length > 0) {
      return NextResponse.json({ success: true });
    }

    // Reject junk before spending a Resend call on it.
    if (
      !isNonEmptyString(name, LIMITS.name) ||
      !isNonEmptyString(email, LIMITS.email) ||
      !isNonEmptyString(message, LIMITS.message) ||
      String(message).trim().length < MIN_MESSAGE_LENGTH ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim())
    ) {
      return NextResponse.json(
        { error: "Please check your name, email and message, then try again." },
        { status: 400 }
      );
    }

    const cleanName = String(name).trim();
    const cleanEmail = String(email).trim();
    const cleanMessage = String(message).trim();

    if (!process.env.RESEND_API_KEY || !process.env.RESEND_TO_EMAIL) {
      console.error("Contact form is missing RESEND_API_KEY or RESEND_TO_EMAIL");
      return NextResponse.json(
        { error: "The form isn't configured yet — please email me directly." },
        { status: 503 }
      );
    }

    // Constructed per request: the Resend client throws on a missing key, so
    // building it at module scope would fail the whole build without a .env.
    const resend = new Resend(process.env.RESEND_API_KEY);

    // `onboarding@resend.dev` is Resend's shared sandbox sender and will only
    // deliver to the address that owns the API key. Set RESEND_FROM_EMAIL to
    // an address on a domain verified in Resend for real delivery.
    const from = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

    // The subject is header data: strip anything that could start a new header.
    const subjectName = cleanName.replace(/[\r\n]+/g, " ").slice(0, 78);

    const { error } = await resend.emails.send({
      from,
      to: process.env.RESEND_TO_EMAIL,
      subject: `Portfolio enquiry from ${subjectName}`,
      replyTo: cleanEmail,
      text: `From: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMessage}`,
    });

    if (error) {
      console.error("Resend rejected the message:", error);
      return NextResponse.json(
        { error: "Failed to send message" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
