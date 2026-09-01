"use client";

import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { experience } from "@/lib/site";
import { cn } from "@/lib/utils";

const Experience = () => {
  return (
    <section id="experience" className="scroll-mt-28 py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="03 — Experience"
          title="Where I've been putting the hours."
        />

        <Reveal as="group" gap={0.09} delay={0.1} className="mt-14">
          {/* The vertical rule is drawn by each row's left border so it never
              runs past the last item. */}
          <ol className="relative">
            {experience.map((job, i) => (
              <Reveal key={`${job.company}-${job.period}`} y={22}>
                <li
                  className={cn(
                    "group relative grid gap-x-8 gap-y-3 border-l pl-8 md:grid-cols-[10rem_minmax(0,1fr)] md:pl-10",
                    // The rule is drawn by each row's left border, so the last
                    // row leaves it off rather than trailing past the timeline.
                    i === experience.length - 1
                      ? "border-transparent pb-0"
                      : "border-border pb-12"
                  )}
                >
                  {/* Node on the rule */}
                  <span
                    aria-hidden
                    className="absolute -left-[5px] top-1.5 size-[9px] rounded-full border-2 border-background bg-border-strong transition-colors duration-300 group-hover:bg-accent"
                  />

                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-subtle-foreground md:pt-1">
                    {job.period}
                  </p>

                  <div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {job.role}
                    </h3>
                    <p className="mt-0.5 text-sm text-accent">{job.company}</p>
                    <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
                      {job.summary}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-1.5">
                      {job.stack.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full border border-border bg-muted/60 px-2.5 py-1 font-mono text-[0.7rem] text-muted-foreground"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
};

export default Experience;
