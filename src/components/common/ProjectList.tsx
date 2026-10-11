/**
 * 프로젝트 목록
 *
 * 파일 경로: src/components/common/ProjectList.tsx
 * 목적: About과 Projects가 같은 행 구조로 프로젝트 목록을 그린다.
 * 주요 기능: 프로젝트 행(기간 / 제목·요약 / 역할)
 * 주요 의존성: wouter, src/content/projects.ts
 *
 * 마우스를 올리면 표지를 띄우는 미리보기는 걷어냈다. 대표 이미지 없이 글자 표지만으로는
 * 행에 이미 있는 정보를 반복하고 아래 행을 가렸다. 이미지가 생기면 다시 검토한다.
 */

import { Link } from "wouter";

import type { Project } from "@/content/projects";

/**
 * 프로젝트 행 목록.
 *
 * Args:
 *   projects: 그릴 프로젝트 (호출하는 쪽에서 개수를 정한다)
 *   className: 행들을 감싸는 요소의 클래스. 위 구분선 여부가 페이지마다 달라서 받는다.
 */
export function ProjectList({ projects, className }: { projects: Project[]; className?: string }) {
  return (
    <div className={className}>
      {projects.map((project) => (
        <ProjectRow key={project.slug} project={project} />
      ))}
    </div>
  );
}

function ProjectRow({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="grid grid-cols-1 items-start gap-1.5 border-b border-rule py-5 dt:grid-cols-[132px_minmax(0,1fr)_auto] dt:items-baseline dt:gap-6"
    >
      <span className="whitespace-nowrap text-sm tabular-nums text-ink-faint">
        {project.period}
      </span>
      <div>
        <div className="text-base font-semibold">{project.title}</div>
        <div className="mt-1.5 text-base text-ink-muted [text-wrap:pretty]">
          {project.summary}
        </div>
      </div>
      <div className="whitespace-nowrap text-[13px] text-ink-faint dt:text-right">
        {project.roleShort}
      </div>
    </Link>
  );
}
