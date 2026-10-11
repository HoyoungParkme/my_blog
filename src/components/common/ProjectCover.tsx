/**
 * 프로젝트 표지 (임시)
 *
 * 파일 경로: src/components/common/ProjectCover.tsx
 * 목적: 프로젝트 대표 이미지가 아직 없어서, 목록 미리보기에 쓸 표지를 글자로만 그린다.
 *       소속·제목·역할·기간 등 실제 프로젝트 정보만 쓴다. 대표 이미지가 생기면 이미지로 바꾼다.
 * 주요 의존성: src/content/projects.ts
 */

import type { Project } from "@/content/projects";

/**
 * 책 표지 비율(3:4)의 글자 표지.
 *
 * Args:
 *   project: 표지에 쓸 프로젝트
 */
export function ProjectCover({ project }: { project: Project }) {
  return (
    <div className="flex h-[290px] w-[220px] flex-col rounded-md border border-ink bg-sheet p-5">
      <div className="text-[13px] text-ink-faint">{project.org}</div>
      <div className="mt-3 text-[22px] font-bold leading-[1.3] tracking-tighter text-ink [text-wrap:balance]">
        {project.title}
      </div>
      <div className="mt-auto border-t border-rule pt-3 text-[13px]">
        <div className="text-ink-muted">{project.roleShort}</div>
        <div className="mt-0.5 tabular-nums text-ink-faint">{project.period}</div>
      </div>
    </div>
  );
}
