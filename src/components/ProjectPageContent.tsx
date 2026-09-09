"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Expand, X } from "lucide-react";

import type { Project } from "../../_data/data";
import { GithubIcon } from "./icons";
import ProjectDemo from "./ProjectDemo";
import ProjectThumb from "./ProjectThumb";
import Reveal from "./Reveal";
import { Button } from "@/components/ui/button";

type Props = {
  project: Project;
  /** The next project in the list, for the footer hand-off. */
  next?: Project;
};

/** A screenshot that opens the lightbox when clicked. */
function Shot({
  src,
  alt,
  name,
  onOpen,
  priority = false,
  aspect = "aspect-[16/10]",
}: {
  src: string;
  alt: string;
  name: string;
  onOpen: (src: string) => void;
  priority?: boolean;
  aspect?: string;
}) {
  // No screenshot on disk means nothing to enlarge, so the tile stops acting
  // like a button rather than opening an empty lightbox.
  const [missing, setMissing] = useState(false);

  return (
    <button
      type="button"
      onClick={() => !missing && onOpen(src)}
      disabled={missing}
      aria-label={missing ? alt : `${alt} — open larger`}
      className="group relative block w-full overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] transition-all duration-300 enabled:hover:border-border-strong enabled:hover:shadow-[var(--shadow-lift)] disabled:cursor-default"
    >
      <div className={`relative w-full overflow-hidden bg-muted ${aspect}`}>
        <ProjectThumb
          src={src}
          alt={alt}
          name={name}
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover object-top transition-transform duration-[600ms] ease-out group-enabled:group-hover:scale-[1.03]"
          priority={priority}
          onFallback={() => setMissing(true)}
        />
      </div>
      {!missing ? (
        <span className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-background/80 text-foreground opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100">
          <Expand className="size-4" />
        </span>
      ) : null}
    </button>
  );
}

export function ProjectPageContent({ project, next }: Props) {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const closeLightbox = useCallback(() => setLightboxSrc(null), []);

  // Freeze the page behind the lightbox and let Escape close it.
  useEffect(() => {
    if (!lightboxSrc) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxSrc, closeLightbox]);

  const gallery = [project.img2, project.img3].filter(Boolean) as string[];

  return (
    <article className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="shell max-w-4xl">
        {/* ---- Header ---- */}
        <Reveal>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-1" />
            All projects
          </Link>
        </Reveal>

        <Reveal as="group" gap={0.07} delay={0.05} className="mt-8">
          <Reveal>
            <h1 className="text-4xl font-semibold tracking-[-0.03em] sm:text-5xl md:text-[3.5rem] md:leading-[1.05]">
              {project.name}
            </h1>
          </Reveal>
          <Reveal>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {project.show}
            </p>
          </Reveal>

          <Reveal>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.link ? (
                <Button asChild size="lg" className="group">
                  <a href={project.link} target="_blank" rel="noreferrer">
                    Visit live site
                    <ExternalLink className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </Button>
              ) : null}
              {/* Source becomes the primary action when there's no deployment.
                  Confidential work has no repo, so the button is omitted
                  rather than rendered as an anchor with no href. */}
              {project.git ? (
                <Button
                  asChild
                  size="lg"
                  variant={project.link ? "outline" : "default"}
                >
                  <a href={project.git} target="_blank" rel="noreferrer">
                    <GithubIcon />
                    View source
                  </a>
                </Button>
              ) : null}
              <Button asChild size="lg" variant="ghost" className="group">
                <Link href="/#contact">
                  Work with me
                  <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </Reveal>

        {/* ---- Hero shot ---- */}
        <Reveal delay={0.1} className="mt-14">
          <Shot
            src={`/img/${project.img}`}
            alt={`${project.name} screenshot`}
            name={project.name}
            onOpen={setLightboxSrc}
            priority
          />
        </Reveal>

        {/* ---- Detail ---- */}
        <div className="mt-16 grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,15rem)] md:gap-14">
          <Reveal as="group" gap={0.08} className="space-y-10">
            <Reveal>
              <section>
                <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-subtle-foreground">
                  Overview
                </h2>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted-foreground">
                  {project.desc}
                </p>
              </section>
            </Reveal>

            {project.problem ? (
              <Reveal>
                <section>
                  <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-subtle-foreground">
                    The problem
                  </h2>
                  <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted-foreground">
                    {project.problem}
                  </p>
                </section>
              </Reveal>
            ) : null}

            {project.solution ? (
              <Reveal>
                <section className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] sm:p-7">
                  <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-accent">
                    What I built
                  </h2>
                  <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted-foreground">
                    {project.solution}
                  </p>
                </section>
              </Reveal>
            ) : null}
          </Reveal>

          {/* ---- Stack sidebar ---- */}
          <Reveal delay={0.12}>
            <div className="md:sticky md:top-28">
              <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-subtle-foreground">
                Built with
              </h2>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {project.lang.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-border bg-muted/60 px-3 py-1.5 font-mono text-[0.72rem] text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* ---- Demonstration / Video Walkthrough ---- */}
        <ProjectDemo project={project} />

        {/* ---- Gallery ---- */}
        {gallery.length > 0 ? (
          <Reveal
            as="group"
            gap={0.09}
            className="mt-16 grid gap-6 sm:grid-cols-2"
          >
            {gallery.map((img) => (
              <Reveal key={img} y={22}>
                <Shot
                  src={`/img/${img}`}
                  alt={`${project.name} screenshot`}
                  name={project.name}
                  onOpen={setLightboxSrc}
                  aspect="aspect-[4/3]"
                />
              </Reveal>
            ))}
          </Reveal>
        ) : null}

        {/* ---- Hire CTA ---- */}
        <Reveal className="mt-20">
          <div className="rounded-2xl border border-border bg-card p-7 text-center shadow-[var(--shadow-soft)] sm:p-9">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
              Want something like this built?
            </h2>
            <p className="mx-auto mt-2.5 max-w-md text-sm leading-relaxed text-muted-foreground">
              I&apos;m available for full-time, contract and freelance work.
              Tell me what you&apos;re building and I&apos;ll come back within
              a day.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="group">
                <Link href="/#contact">
                  Get in touch
                  <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/projects">Browse more work</Link>
              </Button>
            </div>
          </div>
        </Reveal>

        {/* ---- Next project ---- */}
        {next && next.slug !== project.slug ? (
          <Reveal className="mt-16">
            <hr className="rule" />
            <Link
              href={`/project/${next.slug}`}
              className="group mt-8 flex items-center justify-between gap-6 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-[var(--shadow-lift)] sm:p-6"
            >
              <div className="min-w-0">
                <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-subtle-foreground">
                  Next project
                </p>
                <p className="mt-1.5 truncate text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                  {next.name}
                </p>
              </div>
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-border text-subtle-foreground transition-all duration-200 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                <ArrowRight className="size-5" />
              </span>
            </Link>
          </Reveal>
        ) : null}
      </div>

      {/* ---- Lightbox ---- */}
      <AnimatePresence>
        {lightboxSrc ? (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8"
          >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close preview"
              className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="size-5" />
            </button>

            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-full"
            >
              <Image
                src={lightboxSrc}
                alt={`${project.name} screenshot, enlarged`}
                width={1600}
                height={1200}
                className="h-auto max-h-[86vh] w-auto rounded-xl object-contain shadow-2xl"
              />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </article>
  );
}

export default ProjectPageContent;
