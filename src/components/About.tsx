"use client";

import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";

import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { site } from "@/lib/site";

const focusAreas = [
  {
    title: "MERN & product engineering",
    body: "MongoDB, Express, React, Node.js and Next.js — full-stack apps owned end to end, from the interface down to the data model.",
  },
  {
    title: "Backend & systems",
    body: "REST APIs, database design and the performance-critical paths — Go for concurrent services, Rust for systems-level work.",
  },
  {
    title: "Developer tooling",
    body: "Tools that take work off other engineers — schema visualisers, mock servers, editor extensions.",
  },
];

const About = () => {
  return (
    <section id="about" className="scroll-mt-28 py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow="01 — About"
          title={
            <>
              I build the whole thing —{" "}
              <span className="text-muted-foreground">
                interface, service and everything between.
              </span>
            </>
          }
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-16">
          {/* ---- Narrative ---- */}
          <Reveal as="group" className="space-y-5 text-[1.0625rem] leading-relaxed text-muted-foreground">
            <Reveal>
              <p>
                I&apos;m {site.name}, a full-stack engineer and a 2026 Software
                Engineering graduate of Bahir Dar University. I
                like the unglamorous parts: the data model that holds up under
                real load, the error state nobody thought about, the build that
                stays under a minute a year from now.
              </p>
            </Reveal>
            <Reveal>
              <p>
                Most of my work starts at the interface and follows the request
                all the way down. I reach for React, TypeScript and Next.js on
                the front, Node.js and a boring Postgres or MongoDB schema
                behind it, and Docker to ship the whole thing.
              </p>
            </Reveal>
            <Reveal>
              <p>
                When a service needs raw performance I reach past Node — Go for
                concurrent backend services, and Rust for systems-level work
                like a WebSocket chat server or an HTTP server built straight on
                TCP sockets. I&apos;m a self-directed learner who picks up new
                tech by building something real with it.
              </p>
            </Reveal>
            <Reveal>
              <p className="text-foreground">
                If you&apos;re weighing a build and want someone who&apos;ll
                sweat the architecture as much as the pixels — let&apos;s talk.
              </p>
            </Reveal>

            <Reveal>
              <div className="flex flex-wrap gap-3 pt-3">
                <Link
                  href="#contact"
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:text-accent hover:underline"
                >
                  Start a conversation
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <span aria-hidden className="text-border-strong">
                  /
                </span>
                <a
                  href={site.resume}
                  download
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground underline-offset-4 hover:text-accent hover:underline"
                >
                  Download résumé
                  <Download className="size-4 transition-transform duration-200 group-hover:translate-y-0.5" />
                </a>
                <span aria-hidden className="text-border-strong">
                  /
                </span>
                <a
                  href={site.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground underline-offset-4 hover:text-accent hover:underline"
                >
                  LinkedIn
                  <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </Reveal>
          </Reveal>

          {/* ---- Focus areas ---- */}
          <div className="space-y-8">
            <Reveal as="group" gap={0.07} className="space-y-4">
              {focusAreas.map((area) => (
                <Reveal key={area.title}>
                  <div className="border-l-2 border-border pl-4 transition-colors hover:border-accent">
                    <h3 className="text-sm font-semibold">{area.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {area.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
