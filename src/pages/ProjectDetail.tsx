/**
 * 프로젝트 상세 화면 (케이스 스터디)
 *
 * 파일 경로: src/pages/ProjectDetail.tsx
 * 목적: 하나의 프로젝트를 "한눈에 보기 → 배경과 문제 → 내가 한 일 → 결과와 배운 점" 순서로 보여준다.
 * 주요 기능: 본문 시트, 한눈에 보기 카드(기여·주요 업무·결과가 있을 때만), 지표 카드(수치가 있을 때만),
 *           메타/링크/목차/이전·다음 사이드바
 * 주요 의존성: src/content/projects.ts
 */

import type { ReactNode } from "react";
import { Link } from "wouter";

import { AgentFlow } from "@/components/common/AgentFlow";
import { DetailLayout, DetailSection, SidebarBlock } from "@/components/common/DetailLayout";
import { usePageTitle } from "@/components/layout/usePageTitle";
import { findProject, findProjectNeighbors, type Project } from "@/content/projects";
import { NOT_FOUND_NAME } from "@/content/siteMeta";
import NotFound from "@/pages/NotFound";

/**
 * 사이드바 목차. 본문 섹션의 id·제목과 일치해야 한다.
 * field가 비어 있는 프로젝트(같이 쓰기 전인 초안)는 본문과 목차에서 그 섹션을 함께 뺀다.
 */
const SECTIONS = [
  { id: "sec-0", title: "배경과 문제", field: "problem" },
  { id: "sec-1", title: "내가 한 일", field: "role" },
  { id: "sec-flow", title: "실행 흐름", field: "flow" },
  { id: "sec-2", title: "결과와 배운 점", field: "result" },
] as const;

/** 섹션 제목. 결과를 한눈에 보기 카드로 옮긴 프로젝트는 마지막 섹션을 "배운 점"으로 부른다. */
function sectionTitle(section: (typeof SECTIONS)[number], project: Project): string {
  return section.id === "sec-2" && project.outcomes ? "배운 점" : section.title;
}

export default function ProjectDetail({ params }: { params: { slug: string } }) {
  const project = findProject(params.slug);
  // 없는 slug면 NotFound와 같은 제목을 써서 훅 실행 순서와 상관없이 탭 제목이 맞게 한다
  usePageTitle(project?.title ?? NOT_FOUND_NAME);
  if (!project) return <NotFound />;

  const { prev, next } = findProjectNeighbors(project.slug);

  return (
    <DetailLayout sidebar={<Sidebar project={project} prev={prev} next={next} />}>
      <h1 className="text-[32px] font-bold leading-[1.25] tracking-tighter">
        {project.title}
      </h1>
      <p className="mt-2.5 text-[17px] text-ink-muted">{project.summary}</p>

      <GlanceCard project={project} />

      {/* 실측 수치가 채워진 프로젝트에만 지표 카드를 띄운다 */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="mt-9 grid grid-cols-1 gap-3 dt:grid-cols-3">
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
      )}

      <div className="mt-9 text-base leading-[1.75] text-ink-body">
        {project.problem && (
          <DetailSection id="sec-0" title="배경과 문제">
            <p className="mb-8 [text-wrap:pretty]">{project.problem}</p>
          </DetailSection>
        )}

        <DetailSection id="sec-1" title="내가 한 일">
          <p className="mb-4 [text-wrap:pretty]">{project.role}</p>
          {/* 대표 프로젝트만 쓰는 핵심 결정 목록. 없으면 렌더하지 않는다 */}
          {project.highlights && project.highlights.length > 0 && (
            <ul className="mb-8 flex flex-col gap-5">
              {project.highlights.map((item) => (
                <li key={item.title} className="border-l-2 border-rule pl-4">
                  <div className="font-semibold text-ink">{item.title}</div>
                  <p className="mt-1 [text-wrap:pretty]">{item.body}</p>
                </li>
              ))}
            </ul>
          )}
        </DetailSection>
        {project.code && (
          <pre className="mb-8 overflow-auto rounded-md bg-ink px-5 py-[18px] font-mono text-sm leading-[1.6] text-code-tint">
            {project.code}
          </pre>
        )}

        {project.flow && (
          <DetailSection id="sec-flow" title="실행 흐름">
            <AgentFlow flow={project.flow} />
          </DetailSection>
        )}

        {project.result && (
          <DetailSection id="sec-2" title={sectionTitle(SECTIONS[3], project)}>
            <p className="[text-wrap:pretty]">{project.result}</p>
          </DetailSection>
        )}
      </div>
    </DetailLayout>
  );
}

/**
 * 제목 아래 "한눈에 보기" 카드. 기여·주요 업무·결과를 모아 10초 안에 훑게 한다.
 * 셋 다 없으면(같이 쓰기 전인 프로젝트) 렌더하지 않는다.
 */
function GlanceCard({ project }: { project: Project }) {
  const { contribution, tasks, outcomes } = project;
  if (!contribution && !tasks?.length && !outcomes?.length) return null;

  return (
    <section
      aria-label="한눈에 보기"
      className="mt-8 flex flex-col gap-4 rounded-md border border-rule bg-paper p-4 dt:px-[22px] dt:py-5"
    >
      <div className="text-[13px] font-semibold tracking-overline text-ink-faint">한눈에 보기</div>
      {contribution && <GlanceRow label="기여">{contribution}</GlanceRow>}
      {tasks && tasks.length > 0 && (
        <GlanceRow label="주요 업무">
          <BulletList items={tasks} />
        </GlanceRow>
      )}
      {outcomes && outcomes.length > 0 && (
        <GlanceRow label="결과">
          <BulletList items={outcomes} />
        </GlanceRow>
      )}
    </section>
  );
}

/** 카드 한 줄. 데스크톱은 라벨(72px) / 내용 2단, 좁은 화면은 라벨 위·내용 아래. */
function GlanceRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1 dt:grid-cols-[72px_minmax(0,1fr)] dt:gap-3">
      <div className="text-sm text-ink-faint dt:pt-px">{label}</div>
      <div className="min-w-0 text-[15px] leading-[1.6] text-ink-body">{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-1.5">
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-3.5 [text-wrap:pretty] before:absolute before:left-0.5 before:top-[0.72em] before:h-1 before:w-1 before:rounded-full before:bg-ink-faint before:content-['']"
        >
          {item}
        </li>
      ))}
    </ul>
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
          {/* 가운뎃점 앞은 줄바꿈 없는 공백이라 줄이 바뀌어도 점이 줄 머리에 오지 않는다 */}
          <dd>{project.tags.join("\u00a0· ")}</dd>
        </dl>
      </SidebarBlock>

      {(project.links?.github || project.links?.demo || project.links?.video) && (
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
            {project.links.video && (
              <a
                href={project.links.video}
                target="_blank"
                rel="noreferrer"
                className="rounded border border-ink px-3.5 py-2.5 text-center"
              >
                시연 영상 ↗
              </a>
            )}
          </div>
        </SidebarBlock>
      )}

      <SidebarBlock label="목차">
        <div className="flex flex-col gap-1.5 text-ink-muted">
          {SECTIONS.filter((section) => project[section.field]).map((section) => (
            <a key={section.id} href={`#${section.id}`}>
              {sectionTitle(section, project)}
            </a>
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
