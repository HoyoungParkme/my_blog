import { ProjectCard } from "@/components/project/ProjectCard";
import { projects } from "@/content/portfolio";

export default function Projects() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16">
          <h1 className="font-serif text-5xl font-bold mb-6">Projects</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            수행 프로젝트 소개
          </p>
        </div>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

