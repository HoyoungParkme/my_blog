import { ProjectCard } from "@/components/project/ProjectCard";
import { projects } from "@/content/portfolio";

export default function Projects() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <h1 className="font-serif text-5xl font-bold mb-6">All Projects</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            A complete list of my works, side projects, and experiments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

