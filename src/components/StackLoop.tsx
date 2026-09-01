"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";

/**
 * The stack shown under the hero.
 *
 * `src` points at a file in `public/tech`; entries without one render a
 * monogram tile instead, so the row stays complete without shipping
 * inaccurate brand marks. To promote one, drop the SVG in and add the path.
 * (`phyton.svg` is the on-disk filename; the label is the correct spelling.)
 */
const techStack: { name: string; src?: string }[] = [
  { name: "TypeScript", src: "/tech/typescript.svg" },
  { name: "React", src: "/tech/react.svg" },
  { name: "Next.js", src: "/tech/nextjs.svg" },
  { name: "Rust" },
  { name: "Go" },
  { name: "Node.js", src: "/tech/nodejs.svg" },
  { name: "NestJS" },
  { name: "PostgreSQL" },
  { name: "MongoDB", src: "/tech/mongodb.svg" },
  { name: "Prisma" },
  { name: "Docker" },
  { name: "Tailwind", src: "/tech/tailwind.svg" },
  { name: "JavaScript", src: "/tech/javascript.svg" },
];

const StackLoop = () => {
  return (
    <div className="edge-fade mt-6">
      <Marquee speed={34} autoFill pauseOnHover gradient={false}>
        {techStack.map((tech) => (
          <div
            key={tech.name}
            className="mx-1.5 flex items-center gap-2.5 rounded-full border border-border bg-card/70 px-4 py-2.5 backdrop-blur-sm transition-colors hover:border-border-strong"
          >
            {tech.src ? (
              <Image
                src={tech.src}
                alt=""
                width={20}
                height={20}
                className="size-5 object-contain"
              />
            ) : (
              <span
                aria-hidden
                className="grid size-5 place-items-center rounded-[5px] bg-accent-soft font-mono text-[0.62rem] font-semibold text-accent"
              >
                {tech.name.slice(0, 2).toUpperCase()}
              </span>
            )}
            <span className="text-sm font-medium text-muted-foreground">
              {tech.name}
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default StackLoop;
