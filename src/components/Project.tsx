"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { featuredProjects, visibleProjects } from "../../_data/data";
import ProjectCard from "./ProjectCard";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { Button } from "./ui/button";

const Project = () => {
  const featured = featuredProjects;

  return (
    <section id="work" className="scroll-mt-28 py-24 sm:py-32">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="02 — Selected work"
            title="Things I've shipped."
            description="A few builds worth opening up — client platforms, product experiments and the odd late-night idea."
          />

          <Reveal delay={0.15} className="hidden sm:block">
            <Button asChild variant="ghost" size="sm" className="group">
              <Link href="/projects">
                All {visibleProjects.length} projects
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <Reveal
          as="group"
          gap={0.09}
          delay={0.1}
          className="mt-14 grid gap-6 sm:grid-cols-2"
        >
          {featured.map((project, index) => (
            <Reveal key={project.slug} y={24} className="h-full">
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </Reveal>

        <Reveal delay={0.15} className="mt-12 flex justify-center sm:hidden">
          <Button asChild variant="outline" className="group w-full">
            <Link href="/projects">
              View all {visibleProjects.length} projects
              <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
};

export default Project;
