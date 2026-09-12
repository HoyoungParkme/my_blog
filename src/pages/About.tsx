/**
 * About 화면
 *
 * 파일 경로: src/pages/About.tsx
 * 목적: 이력서 본체. 프로필, 프로젝트 목록, 이력을 담는다.
 * 주요 기능: 프로필 블록, 프로젝트 목록(Projects와 같은 행 구조), 경력/학력/자격증/교육 이력
 * 주요 의존성: src/content/profile.ts, src/content/projects.ts
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
    <div className="grid grid-cols-1 items-start gap-6 border-b border-rule pb-14 dt:grid-cols-[220px_minmax(0,1fr)] dt:gap-12">
      <img
        src={profile.photo}
        alt={`${profile.name} 프로필 사진`}
        className="h-[275px] w-[220px] rounded-md object-cover"
      />
      <div>
        <div className="text-sm font-semibold tracking-overline-wide text-accent">
          {profile.role}
        </div>
        <h1 className="mt-2.5 text-[38px] font-bold tracking-tightest dt:text-[38px]">
          {profile.name}
        </h1>
        <p className="mt-[18px] max-w-[640px] text-[17px] text-ink-muted [text-wrap:pretty]">
          {profile.bio}
        </p>
        <div className="mt-5 flex flex-wrap gap-2 text-sm font-semibold">
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
      <div className="mb-7 flex items-baseline justify-between">
        <h2 className="text-[28px] font-bold tracking-tightest">프로젝트</h2>
        <Link href="/projects" className="border-b border-ink text-[15px] font-semibold">
          전체 {projects.length}개 보기
        </Link>
      </div>

      <div className="flex flex-col border-t border-ink">
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
      <dl className="grid grid-cols-1 gap-x-6 gap-y-1 text-base dt:grid-cols-[150px_minmax(0,1fr)] dt:gap-y-[18px]">
        {entries.map((entry) => (
          <div key={entry.name} className="contents">
            <dt className="whitespace-nowrap text-ink-faint [font-variant-numeric:tabular-nums]">
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
