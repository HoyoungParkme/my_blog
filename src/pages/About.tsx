/**
 * About 화면
 *
 * 파일 경로: src/pages/About.tsx
 * 목적: 첫 화면(/)이자 이력서 본체. 프로필, 프로젝트 목록, 이력을 담는다.
 * 주요 기능: 프로필 블록, 프로젝트 목록(Projects와 같은 행 구조), 경력/학력/자격증/교육 이력
 * 주요 의존성: src/content/profile.ts, src/content/projects.ts
 *
 * 글자 크기는 다섯 단계만 쓴다.
 *   이름 38 / 섹션 제목 22 / 항목 제목·설명 16 / 날짜 14 / 보조 텍스트(라벨·버튼·역할) 13
 */

import { Link } from "wouter";

import {
  academicHistory,
  certifications,
  education,
  experiences,
  profile,
  type HistoryEntry,
} from "@/content/profile";
import { projects, type Project } from "@/content/projects";

/** About에 노출할 프로젝트 개수. 넘치면 "전체 보기"로 넘긴다. */
const SHOWN_COUNT = 3;

export default function About() {
  const shown = projects.slice(0, SHOWN_COUNT);

  return (
    <section className="mx-auto max-w-about px-5 pb-24 pt-12 dt:px-16 dt:pt-[88px]">
      <ProfileBlock />
      <ProjectsBlock shown={shown} />
      <HistoryBlock />
    </section>
  );
}

function ProfileBlock() {
  return (
    <div className="grid grid-cols-1 items-start gap-6 border-b border-rule pb-14 dt:grid-cols-[220px_minmax(0,1fr)] dt:items-stretch dt:gap-12">
      {/* 사진 배경이 흰색이라 페이지 배경과 섞이지 않게 테두리로 경계를 준다 */}
      <img
        src={profile.photo}
        alt={`${profile.name} 프로필 사진`}
        className="h-[275px] w-[220px] rounded-md border-2 border-accent object-cover"
      />
      {/*
        데스크톱에서는 글 영역을 사진 높이로 늘려 직군·이름·소개는 사진 윗선에,
        버튼은 사진 아랫선에 맞춘다. 직군 표기의 행간을 없애야 글자 윗선이 사진 윗선과 겹친다.
      */}
      <div className="dt:flex dt:flex-col dt:justify-between">
        <div>
          <div className="text-[13px] font-semibold tracking-overline-wide text-accent dt:leading-none">
            {profile.role}
          </div>
          <h1 className="mt-2.5 text-[38px] font-bold tracking-tightest">
            {profile.name}
          </h1>
          <p className="mt-[18px] max-w-[640px] text-base text-ink-muted [text-wrap:pretty]">
            {profile.bio}
          </p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2 text-[13px] font-semibold">
          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              className="rounded border border-ink bg-ink px-4 py-2 text-paper hover:border-accent hover:bg-accent hover:text-paper"
            >
              이력서 PDF
            </a>
          )}
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="rounded border border-ink px-4 py-2"
          >
            GitHub
          </a>
          <a href={`mailto:${profile.email}`} className="rounded border border-ink px-4 py-2">
            이메일
          </a>
        </div>
      </div>
    </div>
  );
}

function ProjectsBlock({ shown }: { shown: Project[] }) {
  return (
    <div className="border-b border-rule py-14">
      {/* 섹션 제목은 이력 블록(HistoryList) 제목과 같은 크기·밑줄 간격을 쓴다 */}
      <div className="flex items-baseline justify-between border-b border-ink pb-3">
        <h2 className="text-[22px] font-bold tracking-tighter">프로젝트</h2>
        <Link href="/projects" className="border-b border-ink text-[13px] font-semibold">
          전체 {projects.length}개 보기
        </Link>
      </div>

      <div className="flex flex-col">
        {shown.map((project) => (
          <ProjectRow key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}

/** Projects·Troubleshooting 목록과 같은 행 구조를 쓴다. */
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

function HistoryBlock() {
  return (
    <div className="grid grid-cols-1 items-start gap-10 pt-14 dt:grid-cols-2 dt:gap-16">
      <div className="flex flex-col gap-12">
        <HistoryList title="경력" entries={experiences} />
        <HistoryList title="학력" entries={academicHistory} />
        <HistoryList title="자격증" entries={certifications} />
      </div>
      <HistoryList title="교육" entries={education} />
    </div>
  );
}

function HistoryList({ title, entries }: { title: string; entries: HistoryEntry[] }) {
  return (
    <div>
      <h2 className="mb-5 border-b border-ink pb-3 text-[22px] font-bold tracking-tighter">
        {title}
      </h2>
      <dl className="grid grid-cols-1 gap-x-6 gap-y-1 text-base dt:grid-cols-[150px_minmax(0,1fr)] dt:items-baseline dt:gap-y-[18px]">
        {entries.map((entry) => (
          <div key={entry.name} className="contents">
            <dt className="whitespace-nowrap text-sm tabular-nums text-ink-faint">
              {entry.term}
            </dt>
            <dd className="mb-4 dt:mb-0">
              <div className="font-semibold">{entry.name}</div>
              {entry.detail && <div className="mt-1 text-ink-muted">{entry.detail}</div>}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
