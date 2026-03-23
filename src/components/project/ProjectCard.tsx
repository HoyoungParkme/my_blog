import { ArrowUpRight, Calendar, X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { type Project, getNotionEmbedUrl } from "@/content/portfolio";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative bg-card rounded-xl overflow-hidden border border-border/50 hover:border-accent/50 hover:shadow-xl transition-all duration-300 cursor-pointer"
        data-testid={`card-project-${project.id}`}
        onClick={() => { if (project.link) { setIsLoaded(false); setIsOpen(true); } }}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-3 gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              {project.period}
            </div>
            <div className="p-2 bg-secondary rounded-full group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 flex-shrink-0">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>

          <h3 className="font-serif text-2xl font-bold mb-1 group-hover:text-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-accent font-medium mb-3">{project.company}</p>

          <p className="text-muted-foreground mb-5 line-clamp-2">
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
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh]"
            >
              <div className="p-5 border-b border-border flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  {project.period}
                </span>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full hover:bg-accent/10">
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="flex-1 overflow-hidden bg-muted relative">
                {!isLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-muted">
                    <div className="w-8 h-8 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
                    <p className="text-sm text-muted-foreground">노션 페이지 불러오는 중...</p>
                  </div>
                )}
                <iframe
                  src={getNotionEmbedUrl(project.link!)}
                  className={`w-full h-full border-0 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                  title={project.title}
                  allowFullScreen
                  style={{ colorScheme: 'light' }}
                  onLoad={() => setIsLoaded(true)}
                />
              </div>

              <div className="px-6 py-4 border-t border-border flex flex-col sm:flex-row gap-3">
                <Button asChild variant="default" className="flex-1 rounded-full h-12 text-sm font-semibold">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    노션에서 전체 보기 <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
                <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1 rounded-full h-12 text-sm font-semibold">
                  닫기
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

