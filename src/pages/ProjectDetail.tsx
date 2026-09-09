/**
 * 프로젝트 상세 화면 (케이스 스터디)
 *
 * 파일 경로: src/pages/ProjectDetail.tsx
 * 목적: 하나의 프로젝트를 "배경과 문제 → 내가 한 일 → 결과와 배운 점" 순서로 보여준다.
 * 주요 기능: 지표 카드, 본문 시트, 메타/목차/태그/이전·다음 사이드바
 * 주요 의존성: src/content/projects.ts
 */

import { Link } from "wouter";

import { DetailLayout, DetailSection, SidebarBlock } from "@/components/common/DetailLayout";
import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { TagLink } from "@/components/common/TagPill";
import { findProject, findProjectNeighbors, type Project } from "@/content/projects";
import NotFound from "@/pages/NotFound";

/** 사이드바 목차. 본문 섹션의 id·제목과 일치해야 한다. */
const SECTIONS = [
  { id: "sec-0", title: "배경과 문제" },
  { id: "sec-1", title: "내가 한 일" },
  { id: "sec-2", title: "결과와 배운 점" },
];

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = findProject(params.slug);
  if (!project) return <NotFound />;

  const { prev, next } = findProjectNeighbors(project.slug);

  return (
    <DetailLayout sidebar={<Sidebar project={project} prev={prev} next={next} />}>
      <h1 className="text-[32px] font-bold leading-[1.25] tracking-tighter">
        {project.title}
      </h1>
      <p className="mt-2.5 text-[17px] text-ink-muted">{project.summary}</p>

      <ImagePlaceholder className="mb-9 mt-7 h-[380px] rounded-md" />

      <div className="mb-10 grid grid-cols-1 gap-3 dt:grid-cols-3">
        {project.metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-md border border-rule bg-paper p-[18px]"
          >
            <div className="text-[26px] font-bold tracking-tighter">{metric.value}</div>
            <div className="mt-0.5 text-sm text-ink-faint">{metric.label}</div>
          </div>
        ))}
      </div>

      <div className="text-base leading-[1.75] text-ink-body">
        <DetailSection id="sec-0" title="배경과 문제">
          <p className="mb-8 [text-wrap:pretty]">{project.problem}</p>
        </DetailSection>

        <DetailSection id="sec-1" title="내가 한 일">
          <p className="mb-4 [text-wrap:pretty]">{project.role}</p>
        </DetailSection>
        {project.code && (
          <pre className="mb-8 overflow-auto rounded-md bg-ink px-5 py-[18px] font-mono text-sm leading-[1.6] text-placeholder">
            {project.code}
          </pre>
        )}

        <DetailSection id="sec-2" title="결과와 배운 점">
          <p className="[text-wrap:pretty]">{project.result}</p>
        </DetailSection>
      </div>
    </DetailLayout>
  );
}

function Sidebar({
  project,
  prev,
  next,
}: {
  project: Project;
  prev?: Project;
  next?: Project;
}) {
  return (
    <>
      <SidebarBlock>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2.5">
          <dt className="text-ink-faint">기간</dt>
          <dd>{project.period}</dd>
          <dt className="text-ink-faint">소속</dt>
          <dd>{project.org}</dd>
          <dt className="text-ink-faint">역할</dt>
          <dd>{project.roleShort}</dd>
          <dt className="text-ink-faint">스택</dt>
          <dd>{project.tags.join(" · ")}</dd>
        </dl>
      </SidebarBlock>

      {(project.links?.github || project.links?.demo) && (
        <SidebarBlock>
          <div className="flex flex-col gap-2 font-semibold">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="rounded border border-ink px-3.5 py-2.5 text-center"
              >
                GitHub ↗
              </a>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="rounded border border-ink px-3.5 py-2.5 text-center"
              >
                데모 / 발표자료 ↗
              </a>
            )}
          </div>
        </SidebarBlock>
      )}

      <SidebarBlock label="목차">
        <div className="flex flex-col gap-1.5 text-ink-muted">
          {SECTIONS.map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {section.title}
            </a>
          ))}
        </div>
      </SidebarBlock>

      <SidebarBlock label="태그">
        <div className="flex flex-wrap gap-1.5 text-[13px]">
          {project.tags.map((tag) => (
            <TagLink key={tag} name={tag} className="px-2.5 py-[3px]" />
          ))}
        </div>
      </SidebarBlock>

      {(prev || next) && (
        <SidebarBlock>
          <div className="flex flex-col gap-3.5 border-t border-rule pt-4">
            {prev && (
              <Link href={`/projects/${prev.slug}`}>
                <div className="text-xs font-semibold tracking-overline text-ink-faint">
                  ← 이전 프로젝트
                </div>
                <div className="mt-1 font-semibold">{prev.title}</div>
              </Link>
            )}
            {next && (
              <Link href={`/projects/${next.slug}`}>
                <div className="text-xs font-semibold tracking-overline text-ink-faint">
                  다음 프로젝트 →
                </div>
                <div className="mt-1 font-semibold">{next.title}</div>
              </Link>
            )}
          </div>
        </SidebarBlock>
      )}
    </>
  );
}
