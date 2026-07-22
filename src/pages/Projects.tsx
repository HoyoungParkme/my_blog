import { projects } from "@/content/portfolio";

export default function Projects() {
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
            return (
              <div key={project.id} className="relative">
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

                <h3 className="font-serif text-[21px] font-semibold leading-[1.4] break-keep mb-1">
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
    </div>
  );
}
