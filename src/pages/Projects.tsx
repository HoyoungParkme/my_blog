/**
 * Projects 화면
 *
 * 파일 경로: src/pages/Projects.tsx
 * 목적: 전체 프로젝트를 최신순 목록으로 보여준다.
 * 주요 의존성: src/content/projects.ts
 *
 * Troubleshooting 목록과 같은 행 구조를 쓴다(좌: 기간 / 중: 제목·요약 / 우: 역할).
 * 커버 이미지가 준비되지 않아 회색 블록만 자리를 차지하던 카드 그리드를 걷어냈다.
 */

import { Link } from "wouter";

import { ListPageLayout } from "@/components/common/ListPageLayout";
import { projects, type Project } from "@/content/projects";

export default function Projects() {
  return (
    <ListPageLayout title="Projects">
      <div className="flex flex-col border-t border-ink">
        {projects.map((project) => (
          <ProjectRow key={project.slug} project={project} />
        ))}
      </div>
    </ListPageLayout>
  );
}

function ProjectRow({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="grid grid-cols-1 items-start gap-1.5 border-b border-rule py-5 dt:grid-cols-[132px_minmax(0,1fr)_auto] dt:gap-6"
    >
      <span className="whitespace-nowrap pt-[3px] text-sm text-ink-faint">
        {project.period}
      </span>
      <div>
        <div className="text-lg font-bold leading-[1.4] tracking-tight">{project.title}</div>
        <div className="mt-1.5 text-[15px] text-ink-muted [text-wrap:pretty]">
          {project.summary}
        </div>
      </div>
      <div className="whitespace-nowrap pt-[3px] text-[13px] text-ink-faint dt:text-right">
        {project.roleShort}
      </div>
    </Link>
  );
}
