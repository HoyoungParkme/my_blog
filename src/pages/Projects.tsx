/**
 * Projects 화면
 *
 * 파일 경로: src/pages/Projects.tsx
 * 목적: 전체 프로젝트를 업무 프로젝트와 대회 출품작 두 묶음으로 나눠 최신순으로 보여준다.
 * 주요 의존성: src/content/projects.ts
 *
 * Troubleshooting 목록과 같은 행 구조를 쓴다(좌: 기간 / 중: 제목·요약 / 우: 역할).
 * 커버 이미지가 준비되지 않아 회색 블록만 자리를 차지하던 카드 그리드를 걷어냈다.
 */

import { ListPageLayout } from "@/components/common/ListPageLayout";
import { ProjectList } from "@/components/common/ProjectList";
import { contestProjects, workProjects, type Project } from "@/content/projects";

export default function Projects() {
  return (
    <ListPageLayout title="Projects">
      <ProjectGroup title="프로젝트" projects={workProjects} />
      <ProjectGroup title="대회" projects={contestProjects} className="mt-14" />
    </ListPageLayout>
  );
}

/** 묶음 하나. 제목은 About 섹션 제목과 같은 크기·밑줄을 쓴다. */
function ProjectGroup({
  title,
  projects,
  className = "",
}: {
  title: string;
  projects: Project[];
  className?: string;
}) {
  return (
    <section className={className}>
      <h2 className="border-b border-ink pb-3 text-[22px] font-bold tracking-tighter">{title}</h2>
      <ProjectList projects={projects} className="flex flex-col" />
    </section>
  );
}
