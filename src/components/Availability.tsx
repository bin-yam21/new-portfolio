import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import Reveal from "./Reveal";
import { availability, site } from "@/lib/site";

/**
 * The band directly under the hero. Everything a hiring manager or client
 * needs before deciding whether to write the first email — engagement types,
 * start date, timezone overlap and how fast a reply comes back — so nobody
 * has to read the whole page to find out whether it's worth reaching out.
 */
export default function Availability() {
  if (!site.available) return null;

  return (
    <section
      id="availability"
      aria-label="Availability"
      className="scroll-mt-28 pt-4 pb-8 sm:pt-6 sm:pb-10"
    >
      <div className="shell">
        <Reveal>
          <div className="rounded-2xl border border-border bg-card/70 p-6 shadow-[var(--shadow-soft)] backdrop-blur-sm sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="max-w-xl">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-accent">
                  Currently
                </p>
                <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                  {availability.headline}
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                  {availability.blurb}
                </p>
              </div>

              <Link
                href="#contact"
                className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:text-accent hover:underline"
              >
                Start a conversation
                <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            <dl className="mt-7 grid gap-x-8 gap-y-5 border-t border-border pt-6 sm:grid-cols-2 lg:grid-cols-4">
              {availability.points.map((point) => (
                <div key={point.label}>
                  <dt className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-subtle-foreground">
                    {point.label}
                  </dt>
                  <dd className="mt-1.5 text-sm font-medium leading-snug">
                    {point.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
