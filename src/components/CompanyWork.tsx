import { Building2, Check, ExternalLink, Lock } from "lucide-react";

import type { Project } from "../../_data/data";
import { visibleCompanyProjects } from "../../_data/data";
import ProjectThumb from "./ProjectThumb";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { Button } from "./ui/button";

/**
 * One private client/company engagement, shown as a sanitized case study.
 *
 * Deliberately never links to a source repo — this is protected work. A live
 * or case-study link is shown only if the entry provides one; otherwise the
 * card stands on its own as a description of the engineering.
 */
function CompanyCard({ project }: { project: Project }) {
  const liveUrl = project.demoUrl || project.link;
  const meta = [project.role, project.period].filter(Boolean).join(" · ");

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--shadow-lift)]">
      {/* ---- Sanitized screenshot (falls back to a monogram tile) ---- */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <ProjectThumb
          src={`/img/${project.img}`}
          alt={`${project.name} — sanitized preview`}
          name={project.name}
          className="object-cover object-top transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
        />
        {/* Confidential marker */}
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/65 px-2.5 py-1 text-[0.7rem] font-medium text-white backdrop-blur-md border border-white/15 shadow-sm">
          <Lock className="size-2.5" />
          <span>Private / NDA</span>
        </span>
        {project.company ? (
          <span className="absolute left-3 top-3 inline-flex max-w-[45%] items-center gap-1.5 rounded-full bg-background/80 px-2.5 py-1 text-[0.7rem] font-medium text-foreground backdrop-blur-md border border-border shadow-sm">
            <Building2 className="size-2.5 shrink-0 text-accent" />
            <span className="truncate">{project.company}</span>
          </span>
        ) : null}
      </div>

      {/* ---- Body ---- */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
          {project.name}
        </h3>
        {meta ? (
          <p className="mt-1 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-subtle-foreground">
            {meta}
          </p>
        ) : null}

        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {project.show}
        </p>

        {/* What I built — honest, NDA-safe highlights */}
        {project.outcomes?.length ? (
          <ul className="mt-4 space-y-2">
            {project.outcomes.map((point) => (
              <li key={point} className="flex gap-2.5 text-sm text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                <span className="leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {/* Stack */}
        <ul className="mt-5 flex flex-wrap gap-1.5 pt-1">
          {project.lang.slice(0, 6).map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border bg-muted/60 px-2.5 py-1 font-mono text-[0.7rem] text-muted-foreground"
            >
              {tech}
            </li>
          ))}
          {project.lang.length > 6 ? (
            <li className="rounded-full px-2.5 py-1 font-mono text-[0.7rem] text-subtle-foreground">
              +{project.lang.length - 6}
            </li>
          ) : null}
        </ul>

        {/* Optional case-study / live link — never a source repo */}
        {liveUrl ? (
          <div className="mt-6 pt-5 border-t border-border">
            <Button asChild variant="outline" size="sm" className="group/btn">
              <a href={liveUrl} target="_blank" rel="noreferrer">
                View case study
                <ExternalLink className="size-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>
            </Button>
          </div>
        ) : null}
      </div>
    </article>
  );
}

/**
 * "Client & Company Work" — private engagements that can't be open-sourced,
 * presented as sanitized case studies. Renders nothing when there are no
 * visible company projects, so the homepage stays clean until entries exist.
 */
export default function CompanyWork() {
  const items = visibleCompanyProjects;
  if (items.length === 0) return null;

  return (
    <section id="company-work" className="scroll-mt-28 py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="03 — Client & company work"
          title="Work I can't open-source."
          description="Real engagements for companies and clients, under NDA. No public repos or live links — here's the problem, what I built and the stack, sanitized."
        />

        <Reveal
          as="group"
          gap={0.09}
          delay={0.1}
          className="mt-14 grid gap-6 sm:grid-cols-2"
        >
          {items.map((project) => (
            <Reveal key={project.slug} y={24} className="h-full">
              <CompanyCard project={project} />
            </Reveal>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
