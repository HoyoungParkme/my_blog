import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "@/data/portfolio";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-card rounded-xl overflow-hidden border border-border/50 hover:border-accent/50 hover:shadow-xl transition-all duration-300"
      data-testid={`card-project-${project.id}`}
    >
      <div className="p-6">
        <div className="flex justify-between items-start mb-4 gap-2">
          <h3 className="font-serif text-2xl font-bold group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 bg-secondary rounded-full hover:bg-accent hover:text-accent-foreground transition-all duration-300 flex-shrink-0"
            data-testid={`link-project-${project.id}`}
          >
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
        
        <p className="text-muted-foreground mb-6 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.tags?.map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground border border-border"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
