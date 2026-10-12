/**
 * About 화면
 *
 * 파일 경로: src/pages/About.tsx
 * 목적: 첫 화면(/)이자 이력서 본체. 프로필, 프로젝트 목록, 이력을 담는다.
 * 주요 기능: 프로필 블록, 프로젝트 목록(Projects와 같은 행 구조), 경력/학력/자격증/대회/교육 이력
 * 주요 의존성: src/content/profile.ts, src/content/projects.ts
 *
 * 글자 크기는 다섯 단계만 쓴다.
 *   이름 38 / 섹션 제목 22 / 항목 제목·설명 16 / 날짜 14 / 보조 텍스트(라벨·버튼·역할) 13
 */

import { Link } from "wouter";

import { ProjectList } from "@/components/common/ProjectList";
import { useTimelineFill } from "@/components/common/useTimelineFill";
import { usePageTitle } from "@/components/layout/usePageTitle";
import {
  academicHistory,
  certifications,
  competitions,
  education,
  experiences,
  profile,
  type HistoryEntry,
} from "@/content/profile";
import { projects, workProjects, type Project } from "@/content/projects";

/** About에 노출할 업무 프로젝트 개수. 넘치면 "전체 보기"로 넘긴다. 대회 출품작은 대회 섹션에서 링크로 연결한다. */
const SHOWN_COUNT = 3;

export default function About() {
  usePageTitle();
  const shown = workProjects.slice(0, SHOWN_COUNT);

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
      {/* 사진 배경이 흰색이라 페이지 배경과 섞이지 않게 버튼과 같은 선으로 경계를 준다 */}
      <img
        src={profile.photo}
        alt={`${profile.name} 프로필 사진`}
        className="h-[275px] w-[220px] rounded-md border border-ink object-cover"
      />
      <div>
        {/* 행간을 없애 직군 글자 윗선을 사진 윗선에 맞춘다 */}
        <div className="text-[13px] font-semibold tracking-overline-wide text-accent dt:leading-none">
          {profile.role}
        </div>
        <h1 className="mt-2.5 text-[38px] font-bold tracking-tightest">
          {profile.name}
        </h1>
        <p className="blur-fade-in mt-[18px] max-w-[640px] text-base text-ink-muted [text-wrap:pretty]">
          {profile.bio}
        </p>
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

      <ProjectList projects={shown} className="flex flex-col" />
    </div>
  );
}

/**
 * 경력·학력 / 자격증·대회 / 교육 순서의 2단 격자로 섹션 제목끼리 가로줄을 맞추고 이력서 순서대로 읽히게 한다.
 * 대회(본선 진출)는 채용담당자가 바로 보는 성과라 교육보다 앞에 둔다.
 * 두 단은 1280px부터 쓴다. 그보다 좁으면 이력 글자 칸이 110px대로 줄어 단어가 잘린다.
 * (dt 분기는 설정상 xl보다 뒤에 생성돼 같은 요소에 섞으면 넓은 화면에서 dt가 이긴다. 여기엔 xl만 쓴다.)
 */
function HistoryBlock() {
  return (
    <div className="grid grid-cols-1 items-start gap-12 pt-14 xl:grid-cols-2 xl:gap-x-16">
      <HistoryList title="경력" entries={experiences} />
      <HistoryList title="학력" entries={academicHistory} />
      <HistoryList title="자격증" entries={certifications} />
      <HistoryList title="대회" entries={competitions} />
      <HistoryList title="교육" entries={education} />
    </div>
  );
}

/** 이력 한 섹션. 왼쪽 타임라인 선 + 날짜(132px) / 이름·설명 2단. */
function HistoryList({ title, entries }: { title: string; entries: HistoryEntry[] }) {
  const trackRef = useTimelineFill<HTMLDivElement>();

  return (
    <div>
      <h2 className="mb-5 border-b border-ink pb-3 text-[22px] font-bold tracking-tighter">
        {title}
      </h2>
      {/* 왼쪽 선은 스크롤한 만큼 위에서부터 채워지고, 선이 지나간 항목의 점이 켜진다 */}
      <div ref={trackRef} className="relative pl-7">
        <div aria-hidden className="absolute bottom-0 left-[6px] top-0 w-0.5 rounded-full bg-rule">
          <div data-fill className="h-0 w-full rounded-full bg-ink" />
        </div>
        <dl className="grid grid-cols-1 gap-x-6 gap-y-1 text-base dt:grid-cols-[132px_minmax(0,1fr)] dt:items-baseline dt:gap-y-[18px]">
          {entries.map((entry) => (
            <div key={entry.name} className="contents">
              <dt className="relative whitespace-nowrap text-sm tabular-nums text-ink-faint">
                <span
                  aria-hidden
                  data-dot
                  className="absolute -left-7 top-[3px] h-3.5 w-3.5 rounded-full border-2 border-rule bg-rule transition-colors duration-300 data-[on]:border-ink data-[on]:bg-paper motion-reduce:transition-none"
                />
                {entry.term}
              </dt>
              <dd className="mb-4 dt:mb-0">
                {entry.href ? (
                  <Link
                    href={entry.href}
                    className="font-semibold underline decoration-rule underline-offset-4 hover:text-accent hover:decoration-accent"
                  >
                    {entry.name}
                  </Link>
                ) : (
                  <div className="font-semibold">{entry.name}</div>
                )}
                {entry.detail && <div className="mt-1 text-ink-muted">{entry.detail}</div>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
