"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Download } from "lucide-react";

import { Button } from "./ui/button";
import StackLoop from "./StackLoop";
import { ease } from "@/lib/animations";
import { site, stats } from "@/lib/site";

/** Word-by-word entrance for the headline. */
const line = {
  hidden: {},
  show: { transition: { staggerChildren: 0.055, delayChildren: 0.15 } },
};

const word = {
  hidden: { opacity: 0, y: "0.6em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const HEADLINE = ["Full-stack", "engineer", "shipping", "things", "that", "last."];

const Hero = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-24">
      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          {/* ---- Copy ---- */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card/60 py-1.5 pl-2 pr-4 text-sm backdrop-blur-sm"
            >
              <span className="relative grid size-5 place-items-center">
                <span className="absolute size-2 rounded-full bg-success/60 motion-safe:animate-pulse-ring" />
                <span className="relative size-2 rounded-full bg-success" />
              </span>
              <span className="text-muted-foreground">
                {site.available
                  ? "Available for new work"
                  : "Currently booked up"}
              </span>
            </motion.div>

            <motion.h1
              variants={line}
              initial="hidden"
              animate="show"
              className="mt-6 text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl lg:text-[4.25rem]"
            >
              {HEADLINE.map((w, i) => (
                // The wrapper masks the word as it slides up; the right margin
                // supplies the word gap, since a trailing space inside an
                // inline-block gets trimmed.
                <span
                  key={w}
                  className="mr-[0.26em] inline-block overflow-hidden pb-[0.08em] align-bottom"
                >
                  <motion.span
                    variants={word}
                    className={
                      i >= 4 ? "inline-block text-accent" : "inline-block"
                    }
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease }}
              className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-muted-foreground sm:text-lg"
            >
              {site.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.68, ease }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button asChild size="lg" className="group">
                <Link href="#contact">
                  Let&apos;s build together
                  <ArrowDownRight className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="group">
                <Link href="#work">
                  View selected work
                  <ArrowUpRight className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </Button>
              {/* Third, quieter action: recruiters look for this first. */}
              <Button asChild variant="ghost" size="lg" className="group">
                <a href={site.resume} download target="_blank" rel="noopener noreferrer">
                  <Download className="transition-transform duration-200 group-hover:translate-y-0.5" />
                  Résumé
                </a>
              </Button>
            </motion.div>

            {/* ---- Stats ---- */}
            <motion.dl
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.82, ease }}
              className="mt-12 flex flex-wrap gap-x-10 gap-y-6 border-t border-border pt-8"
            >
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {s.value}
                  </dd>
                  <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-subtle-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* ---- Portrait ---- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            /* pb/pr leave room for the offset caption so it can't spill out of
               the section on narrow screens. */
            className="relative mx-auto w-fit pb-4 pr-4 lg:mx-0"
          >
            <div className="absolute -inset-6 rounded-full bg-accent/15 blur-3xl" />
            <div className="relative size-40 overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-lift)] sm:size-52 lg:size-64">
              <Image
                src="/img/profile-image.jpg"
                alt={`${site.name}, ${site.role}`}
                fill
                sizes="(max-width: 640px) 160px, (max-width: 1024px) 208px, 256px"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute bottom-0 right-0 max-w-[11rem] rounded-xl border border-border bg-card px-3 py-2 shadow-[var(--shadow-soft)]">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-subtle-foreground">
                Based in
              </p>
              <p className="text-sm font-medium">{site.locationShort}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {site.timezone} · Remote
              </p>
            </div>
          </motion.div>
        </div>

        {/* ---- Tech marquee ---- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1, ease }}
          className="mt-20 sm:mt-24"
        >
          <p className="text-center font-mono text-[0.7rem] uppercase tracking-[0.2em] text-subtle-foreground">
            Daily drivers
          </p>
          <StackLoop />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
