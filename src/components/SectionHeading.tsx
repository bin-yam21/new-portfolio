import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  /** Small monospace label above the title, e.g. "02 — Selected work". */
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      as="group"
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      <Reveal>
        <span className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <span
            aria-hidden
            className="h-px w-6 bg-accent-line"
          />
          {eyebrow}
        </span>
      </Reveal>

      <Reveal>
        <h2 className="text-3xl font-semibold sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
          {title}
        </h2>
      </Reveal>

      {description ? (
        <Reveal>
          <p
            className={cn(
              "max-w-xl text-base leading-relaxed text-muted-foreground",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </Reveal>
  );
}

export default SectionHeading;
