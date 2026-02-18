import { ArrowUpRight, X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/content/portfolio";

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
              className="relative w-full max-w-5xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh]"
            >
              <div className="p-4 border-b border-border flex items-center justify-between bg-card/50 backdrop-blur-md sticky top-0 z-10">
                <h2 className="font-serif text-xl font-bold px-2">{project.title}</h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsPreviewOpen(false)}
                  className="rounded-full hover:bg-accent/10"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-hidden bg-muted relative">
                <iframe 
                  src={project.link.replace("www.notion.so", "www.notion.so/embed")}
                  className="w-full h-full border-0"
                  title={`${project.title} Preview`}
                  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
                  sandbox="allow-forms allow-modals allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                />
              </div>

              <div className="p-4 md:p-6 bg-card border-t border-border">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild variant="default" className="w-full sm:w-auto rounded-full px-8 h-12 text-sm font-semibold">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      노션에서 전체 보기 <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button variant="outline" onClick={() => setIsPreviewOpen(false)} className="w-full sm:w-auto rounded-full px-8 h-12 text-sm font-semibold">
                    닫기
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

