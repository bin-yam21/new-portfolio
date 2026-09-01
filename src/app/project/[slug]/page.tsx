import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { visibleProjects as projects } from "../../../../_data/data";
import { ProjectPageContent } from "@/components/ProjectPageContent";

export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return { title: "Project not found" };

  return {
    title: project.name,
    description: project.show,
    openGraph: {
      title: project.name,
      description: project.show,
      images: [{ url: `/img/${project.img}`, alt: `${project.name} screenshot` }],
    },
  };
}

const ProjectPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);

  if (index === -1) return notFound();

  return (
    <ProjectPageContent
      project={projects[index]}
      next={projects[(index + 1) % projects.length]}
    />
  );
};

export default ProjectPage;
