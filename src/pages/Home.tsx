/**
 * Home 화면
 *
 * 파일 경로: src/pages/Home.tsx
 * 목적: 프로필, 대표 프로젝트, 이력을 한 페이지에서 보여주는 첫인상 화면.
 * 주요 기능: 프로필 블록, Featured 프로젝트 카드와 하위 카드 3개, 경력/학력/자격증/교육 이력
 * 주요 의존성: src/content/profile.ts, src/content/projects.ts
 */

import { Link } from "wouter";

import { ImagePlaceholder } from "@/components/common/ImagePlaceholder";
import { TagPill } from "@/components/common/TagPill";
import {
  academicHistory,
  certifications,
  education,
  experiences,
  profile,
  type HistoryEntry,
} from "@/content/profile";
import { featuredProject, projects } from "@/content/projects";

/** Featured 아래에 놓이는 하위 카드 개수 */
const SUB_CARD_COUNT = 3;

export default function Home() {
  const subProjects = projects
    .filter((project) => project.slug !== featuredProject.slug)
    .slice(0, SUB_CARD_COUNT);

  return (
    <section className="mx-auto max-w-page px-5 pb-24 pt-[72px] dt:px-12">
      <ProfileBlock />
      <FeaturedBlock subProjects={subProjects} />
      <HistoryBlock />
    </section>
  );
}

function ProfileBlock() {
  return (
    <div className="grid grid-cols-1 items-start gap-6 border-b border-rule pb-14 dt:grid-cols-[200px_minmax(0,1fr)] dt:gap-12">
      <img
        src={profile.photo}
        alt={`${profile.name} 프로필 사진`}
        className="h-[250px] w-[200px] rounded-md object-cover"
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

function FeaturedBlock({ subProjects }: { subProjects: typeof projects }) {
  return (
    <div className="border-b border-rule py-14">
      <div className="mb-7 flex items-baseline justify-between">
        <h2 className="text-[28px] font-bold tracking-tightest">대표 프로젝트</h2>
        <Link href="/projects" className="border-b border-ink text-[15px] font-semibold">
          전체 {projects.length}개 보기
        </Link>
      </div>

      <Link
        href={`/projects/${featuredProject.slug}`}
        className="grid grid-cols-1 gap-6 rounded-md border border-rule bg-sheet p-5 hover:border-ink hover:text-ink dt:grid-cols-[1.15fr_1fr] dt:gap-10 dt:p-8"
      >
        <ImagePlaceholder className="min-h-[320px] rounded" />
        <div className="flex flex-col gap-[18px]">
          <div className="text-[13px] font-semibold tracking-overline-wide text-accent">
            FEATURED · {featuredProject.year} · {featuredProject.org}
          </div>
          <div className="text-[26px] font-bold leading-[1.25] tracking-tightest">
            {featuredProject.title}
          </div>
          <dl className="grid grid-cols-[56px_1fr] gap-x-4 gap-y-3 text-base text-ink-body">
            <dt className="font-medium text-ink-faint">문제</dt>
            <dd>{featuredProject.brief.problem}</dd>
            <dt className="font-medium text-ink-faint">역할</dt>
            <dd>{featuredProject.brief.role}</dd>
            <dt className="font-medium text-ink-faint">결과</dt>
            <dd>{featuredProject.brief.result}</dd>
          </dl>
          <div className="flex flex-wrap gap-2 text-[13px]">
            {featuredProject.tags.map((tag) => (
              <TagPill key={tag} className="px-3 py-1">
                {tag}
              </TagPill>
            ))}
          </div>
          <div className="mt-auto self-start border-b border-ink text-[15px] font-semibold">
            케이스 스터디 읽기 →
          </div>
        </div>
      </Link>

      <div className="mt-5 grid grid-cols-1 gap-5 dt:grid-cols-3">
        {subProjects.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
            className="block rounded-md border border-rule bg-sheet p-6 hover:border-ink hover:text-ink"
          >
            <ImagePlaceholder className="mb-4 h-[120px] rounded" />
            <div className="text-lg font-bold tracking-tight">{project.title}</div>
            <div className="mt-1.5 text-[15px] text-ink-muted">{project.summary}</div>
            <div className="mt-3.5 text-[13px] font-medium text-ink-faint">
              {project.year} · {project.tags.join(" · ")}
            </div>
          </Link>
        ))}
      </div>
    </div>
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
