/**
 * Projects 화면
 *
 * 파일 경로: src/pages/Projects.tsx
 * 목적: 전체 프로젝트를 회사/개인으로 나눠 보여주는 목록 화면.
 * 주요 기능: 소속별 섹션 분류, 사이드바 섹션 점프, 기술 태그 목록
 * 주요 의존성: src/content/projects.ts
 */

import { Link } from "wouter";

import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { ListPageLayout, ListSection } from "@/components/common/ListPageLayout";
import { projects, type Project } from "@/content/projects";

/** 회사 프로젝트로 분류할 소속명 */
const COMPANY = "디포커스";

const GROUPS = [
  { id: "company", label: "회사 프로젝트", match: (p: Project) => p.org === COMPANY },
  { id: "personal", label: "개인 프로젝트", match: (p: Project) => p.org !== COMPANY },
];

export default function Projects() {
  // 프로젝트가 없는 그룹은 섹션과 사이드바 양쪽에서 모두 감춘다
  const groups = GROUPS.map((group) => ({
    ...group,
    projects: projects.filter(group.match),
  })).filter((group) => group.projects.length > 0);

  return (
    <ListPageLayout title="Projects">
      {groups.map((group) => (
        <ListSection
          key={group.id}
          id={group.id}
          title={group.label}
          count={group.projects.length}
        >
          <div className="mt-6 grid grid-cols-1 gap-5 dt:grid-cols-2">
            {group.projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </ListSection>
      ))}
    </ListPageLayout>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block rounded-md border border-rule bg-sheet p-6 hover:border-ink hover:text-ink"
    >
      <ImagePlaceholder className="mb-4 h-[150px] rounded" />
      <div className="text-[13px] font-semibold tracking-overline text-accent">
        {project.year} · {project.roleShort}
      </div>
      <div className="mt-2 text-[19px] font-bold leading-[1.35] tracking-tight">
        {project.title}
      </div>
      <div className="mt-1.5 text-[15px] text-ink-muted [text-wrap:pretty]">
        {project.summary}
      </div>
    </Link>
  );
}
