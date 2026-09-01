import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { visibleProjects as projects } from "../../../_data/data";
import ProjectCard from "@/components/ProjectCard";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "All projects",
  description:
    "Every project worth showing — client platforms, product experiments and side builds, with the stack and story behind each one.",
};

export default function AllProjects() {
  return (
    <div className="pt-32 pb-24 sm:pt-40 sm:pb-32">
      <div className="shell">
        <Reveal>
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4 transition-transform duration-200 group-hover:-translate-x-1" />
            Back home
          </Link>
        </Reveal>

        <SectionHeading
          className="mt-8"
          eyebrow={`Archive — ${projects.length} projects`}
          title="Everything I've shipped."
          description="Client work, product experiments and the odd late-night idea. Open any one for the problem, the approach and the stack."
        />

        <Reveal
          as="group"
          gap={0.07}
          delay={0.1}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, index) => (
            <Reveal key={project.slug} y={24} className="h-full">
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
