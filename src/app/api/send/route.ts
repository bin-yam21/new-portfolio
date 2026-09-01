import { NextResponse } from "next/server";
import { Resend } from "resend";

const isNonEmptyString = (v: unknown, max: number) =>
  typeof v === "string" && v.trim().length > 0 && v.length <= max;

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Reject junk before spending a Resend call on it.
    if (
      !isNonEmptyString(name, 120) ||
      !isNonEmptyString(email, 200) ||
      !isNonEmptyString(message, 5000) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { error: "Invalid submission" },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY || !process.env.RESEND_TO_EMAIL) {
      console.error("Contact form is missing RESEND_API_KEY or RESEND_TO_EMAIL");
      return NextResponse.json({ error: "Not configured" }, { status: 500 });
    }

    // Constructed per request: the Resend client throws on a missing key, so
    // building it at module scope would fail the whole build without a .env.
    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.RESEND_TO_EMAIL,
      subject: `Portfolio enquiry from ${name}`,
      replyTo: email,
      text: `From: ${name}\nEmail: ${email}\n\n${message}`,
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
