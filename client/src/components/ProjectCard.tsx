import { ArrowUpRight, X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/portfolio";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative bg-card rounded-xl overflow-hidden border border-border/50 hover:border-accent/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
        data-testid={`card-project-${project.id}`}
        onClick={() => setIsPreviewOpen(true)}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4 gap-2">
            <h3 className="font-serif text-2xl font-bold group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <div className="p-2 bg-secondary rounded-full group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 flex-shrink-0">
              <ArrowUpRight className="w-5 h-5" />
            </div>
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

      <AnimatePresence>
        {isPreviewOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsPreviewOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-4 border-b border-border flex items-center justify-between bg-card/50 backdrop-blur-md sticky top-0 z-10">
                <h2 className="font-serif text-xl font-bold px-2">{project.title} 미리보기</h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsPreviewOpen(false)}
                  className="rounded-full hover:bg-accent/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 md:p-8">
                <div className="aspect-video w-full rounded-xl overflow-hidden mb-8 bg-muted">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="max-w-2xl mx-auto">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags?.map((tag) => (
                      <span 
                        key={tag} 
                        className="px-3 py-1 text-xs font-medium rounded-full bg-accent/10 text-accent border border-accent/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                    {project.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-border">
                    <Button asChild className="flex-1 rounded-full py-6 text-base font-semibold">
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                        페이지 바로가기 <ExternalLink className="w-5 h-5" />
                      </a>
                    </Button>
                    <Button variant="outline" onClick={() => setIsPreviewOpen(false)} className="flex-1 rounded-full py-6 text-base font-semibold">
                      닫기
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
