"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "../../_data/data";
import ProjectThumb from "./ProjectThumb";

type ProjectCardProps = {
  project: Project;
  /** Index in the grid — drives image priority for above-the-fold cards. */
  index?: number;
};

/**
 * One project tile. The whole card is a single link, with the tech stack and
 * a hairline overlay layered on the screenshot.
 */
export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <Link
      href={`/project/${project.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--shadow-lift)]"
    >
      {/* ---- Screenshot ---- */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <ProjectThumb
          src={`/img/${project.img}`}
          alt={`${project.name} screenshot`}
          name={project.name}
          className="object-cover object-top transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
          priority={index < 2}
        />
        {/* Keeps the top edge readable regardless of the screenshot. */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* ---- Body ---- */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-xl">
            {project.name}
          </h3>
          <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full border border-border text-subtle-foreground transition-all duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
            <ArrowUpRight className="size-4" />
          </span>
        </div>

        <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.show}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5 pt-1">
          {project.lang.slice(0, 4).map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border bg-muted/60 px-2.5 py-1 font-mono text-[0.7rem] text-muted-foreground"
            >
              {tech}
            </li>
          ))}
          {project.lang.length > 4 ? (
            <li className="rounded-full px-2.5 py-1 font-mono text-[0.7rem] text-subtle-foreground">
              +{project.lang.length - 4}
            </li>
          ) : null}
        </ul>
      </div>
    </Link>
  );
}

export default ProjectCard;
