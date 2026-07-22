import { useState } from "react";
import { Calendar, X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { projects, type Project, getNotionEmbedUrl } from "@/content/portfolio";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-16">
          <h1 className="font-serif text-[44px] font-bold mb-3 tracking-[-0.02em]">Projects</h1>
          <p className="text-[17px] text-muted-foreground">
            수행 프로젝트 소개
          </p>
        </div>

        <div className="relative flex flex-col gap-11 pl-9">
          <div className="absolute left-[5px] top-0 bottom-0 w-0.5 bg-[#ececec]" />

          {projects.map((project) => {
            const isOngoing = project.period.includes("현재");
            const hasLink = Boolean(project.link);

            return (
              <div
                key={project.id}
                className={`group relative ${hasLink ? "cursor-pointer" : ""}`}
                onClick={() => {
                  if (project.link) {
                    setIsLoaded(false);
                    setSelectedProject(project);
                  }
                }}
              >
                <span
                  className={`absolute -left-9 top-1 w-3 h-3 rounded-full border-[3px] border-background ${
                    isOngoing ? "bg-accent" : "bg-[#d4d4d4]"
                  }`}
                  style={isOngoing ? { boxShadow: "0 0 0 2px rgba(0,128,255,.25)" } : undefined}
                />

                <div
                  className={`font-mono text-xs font-medium mb-2 ${
                    isOngoing ? "text-accent" : "text-[#a3a3a3]"
                  }`}
                >
                  {project.period.replace(/\s*~\s*/, " — ")}
                </div>

                <h3
                  className={`font-serif text-[21px] font-semibold leading-[1.4] break-keep mb-1 ${
                    hasLink ? "group-hover:text-accent transition-colors" : ""
                  }`}
                >
                  {project.title}
                </h3>

                {project.role && (
                  <p className="text-[13px] text-[#737373] mb-3">{project.role}</p>
                )}

                {project.highlights && project.highlights.length > 0 && (
                  <ul className="space-y-1.5 mb-3">
                    {project.highlights.slice(0, 2).map((highlight) => (
                      <li key={highlight} className="flex gap-2 text-[13.5px] text-[#525252] leading-[1.6]">
                        <span className="text-accent flex-shrink-0">—</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-1.5">
                  {project.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-[3px] text-[11px] font-medium rounded-full bg-secondary text-secondary-foreground border border-border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-background/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
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
                  {selectedProject.period}
                </span>
                <Button variant="ghost" size="icon" onClick={() => setSelectedProject(null)} className="rounded-full hover:bg-accent/10">
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
                  src={getNotionEmbedUrl(selectedProject.link!)}
                  className={`w-full h-full border-0 transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                  title={selectedProject.title}
                  allowFullScreen
                  style={{ colorScheme: 'light' }}
                  onLoad={() => setIsLoaded(true)}
                />
              </div>

              <div className="px-6 py-4 border-t border-border flex flex-col sm:flex-row gap-3">
                <Button asChild variant="default" className="flex-1 rounded-full h-12 text-sm font-semibold">
                  <a href={selectedProject.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    노션에서 전체 보기 <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
                <Button variant="outline" onClick={() => setSelectedProject(null)} className="flex-1 rounded-full h-12 text-sm font-semibold">
                  닫기
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
