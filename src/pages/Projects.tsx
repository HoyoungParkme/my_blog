/**
 * Projects 화면
 *
 * 파일 경로: src/pages/Projects.tsx
 * 목적: 전체 프로젝트를 최신순으로 보여주는 목록 화면.
 * 주요 의존성: src/content/projects.ts
 *
 * 소속별 그룹을 두지 않는다. 지금은 전부 회사 프로젝트라 섹션 제목이
 * 페이지 제목과 같은 말을 반복하기 때문이다. 개인 프로젝트가 생기면 그때 나눈다.
 */

import { Link } from "wouter";

import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { ListPageLayout } from "@/components/common/ListPageLayout";
import { projects, type Project } from "@/content/projects";

export default function Projects() {
  return (
    <ListPageLayout title="Projects">
      <div className="grid grid-cols-1 gap-5 border-t border-ink pt-6 dt:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
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
