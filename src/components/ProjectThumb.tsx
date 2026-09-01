"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/** Initials for the monogram: "AI Code Reviewer" → "AC", "RustFlow" → "RF". */
function monogram(name: string) {
  const words = name.trim().split(/\s+/);
  if (words.length > 1) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  // Single word — use the capitals inside it, else the first two letters.
  const caps = name.replace(/[^A-Z]/g, "");
  return (caps.length >= 2 ? caps.slice(0, 2) : name.slice(0, 2)).toUpperCase();
}

/** Stable 0–360 hue from the name, so a project always gets the same tile. */
function hueFrom(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash * 31 + name.charCodeAt(i)) % 360;
  }
  return hash;
}

type ProjectThumbProps = {
  src: string;
  alt: string;
  /** Project name — drives the monogram and tint of the fallback tile. */
  name: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Called once if the screenshot is missing and the fallback takes over. */
  onFallback?: () => void;
};

/**
 * Project screenshot with a generated fallback.
 *
 * Several projects don't have a screenshot committed yet. Rather than showing
 * a broken image, this renders an on-brand monogram tile until the file lands
 * in `public/img` under the name given in `_data/data.ts`.
 */
export function ProjectThumb({
  src,
  alt,
  name,
  className,
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 480px",
  priority = false,
  onFallback,
}: ProjectThumbProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    const hue = hueFrom(name);

    return (
      <div
        role="img"
        aria-label={`${name} — screenshot coming soon`}
        className={cn(
          "relative grid h-full w-full place-items-center overflow-hidden bg-muted",
          className
        )}
        style={{
          backgroundImage: `radial-gradient(circle at 30% 20%, oklch(0.72 0.13 ${hue} / 0.28), transparent 60%), radial-gradient(circle at 78% 85%, var(--accent-soft), transparent 55%)`,
        }}
      >
        {/* Faint blueprint grid, echoing the page backdrop. */}
        <div className="grid-backdrop absolute inset-0 opacity-60" />

        <span className="relative select-none font-mono text-4xl font-semibold tracking-[-0.04em] text-foreground/25 sm:text-5xl">
          {monogram(name)}
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => {
        setFailed(true);
        onFallback?.();
      }}
      className={className}
    />
  );
}

export default ProjectThumb;
