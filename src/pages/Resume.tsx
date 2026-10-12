/**
 * 경력기술서 화면 (A4 인쇄용)
 *
 * 파일 경로: src/pages/Resume.tsx
 * 목적: 사이트와 같은 데이터(profile.ts·projects.ts)로 경력기술서를 그려, PDF로 인쇄할 원본을 만든다.
 * 주요 기능: 머리(연락처) · 핵심역량 · 경력 · 대표 프로젝트 3개 상세 · 나머지 프로젝트 요약표 · 대회·자격증·학력·교육
 * 주요 의존성: src/content/profile.ts, src/content/projects.ts, src/content/siteMeta.ts
 *
 * 개발 서버에서만 열린다(App.tsx에서 DEV일 때만 라우트를 등록). 배포 사이트에는 인쇄된 PDF만 올라간다.
 * 분량 목표는 A4 2쪽. 프로젝트 제목은 PDF 안에서 눌리는 링크라 상세 주소를 따로 적지 않는다.
 * 고객사는 사이트와 같이 업종으로만 쓴다.
 */

import type { ReactNode } from "react";

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
import { findProject, isPlanned, workProjects, type Project } from "@/content/projects";
import { SITE_URL } from "@/content/siteMeta";

/** 자세히 쓰는 대표 프로젝트. 최신순으로 둔다. */
const FEATURED_SLUGS = ["graphrag-bi-agent", "tableau-ai-agent", "casino-anomaly-detection"];

/** "https://" 없이 보여 줄 사이트 주소 */
const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");

export default function Resume() {
  usePageTitle("경력기술서");

  const featured = FEATURED_SLUGS.map(findProject).filter((p): p is Project => Boolean(p));
  // 투입 전인 프로젝트는 경력이 아니라서 뺀다
  const others = workProjects.filter((p) => !FEATURED_SLUGS.includes(p.slug) && !isPlanned(p));

  return (
    <div className="mx-auto my-10 w-[210mm] bg-sheet px-[14mm] py-[14mm] text-[12.5px] leading-[1.5] text-ink-body shadow-sm print:m-0 print:w-auto print:p-0 print:shadow-none">
      <ResumeHeader />

      <ResumeSection title="핵심역량">
        <BulletList items={profile.coreSkills} />
        <p className="mt-1.5 text-ink-muted">
          <span className="mr-2 font-semibold text-ink">기술</span>
          {profile.coreTech.join(" · ")}
        </p>
      </ResumeSection>

      <ResumeSection title="경력">
        {experiences.map((entry) => (
          <div key={entry.name} className="flex flex-wrap items-baseline gap-x-3">
            <span className="font-semibold text-ink">{entry.name}</span>
            <span>{entry.detail}</span>
            <span className="ml-auto tabular-nums text-ink-faint">{entry.term}</span>
          </div>
        ))}
      </ResumeSection>

      <ResumeSection title="대표 프로젝트" note="제목을 누르면 사이트 상세로 이동">
        <div className="flex flex-col gap-4">
          {featured.map((project) => (
            <FeaturedProject key={project.slug} project={project} />
          ))}
        </div>
      </ResumeSection>

      <ResumeSection title="그 외 프로젝트">
        <OtherProjectsTable projects={others} />
      </ResumeSection>

      {/* 두 단의 길이가 비슷하도록 왼쪽은 대회·자격증, 오른쪽은 교육·학력을 둔다 */}
      <div className="grid grid-cols-2 gap-x-8">
        <div>
          <ResumeSection title="대회">
            <HistoryLines entries={competitions} />
          </ResumeSection>
          <ResumeSection title="자격증">
            <HistoryLines entries={certifications} />
          </ResumeSection>
        </div>
        <div>
          <ResumeSection title="교육">
            <HistoryLines entries={education} />
          </ResumeSection>
          <ResumeSection title="학력">
            <HistoryLines entries={academicHistory} />
          </ResumeSection>
        </div>
      </div>
    </div>
  );
}

/** 이름 · 직무 · 연락처 */
function ResumeHeader() {
  const githubHost = profile.github.replace(/^https?:\/\//, "");
  return (
    <header className="border-b-2 border-ink pb-3">
      <h1 className="text-[26px] font-bold leading-none tracking-tightest text-ink">
        {profile.name}
        <span className="ml-3 text-[15px] font-semibold tracking-normal text-ink-muted">
          경력기술서
        </span>
      </h1>
      <p className="mt-2 font-semibold text-ink">
        {profile.railRole} · 경력 {careerLength(experiences[0].term)}
      </p>
      <p className="mt-1 text-[12px] text-ink-muted">
        {profile.email} · {githubHost} · {SITE_HOST}
      </p>
    </header>
  );
}

/** 섹션 제목(밑줄)과 내용. 제목만 쪽 끝에 남지 않게 한다. note는 제목 오른쪽의 작은 안내. */
function ResumeSection({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-4">
      <h2 className="mb-2 flex items-baseline justify-between break-after-avoid border-b border-rule pb-1 text-[15px] font-bold text-ink">
        {title}
        {note && <span className="text-[11px] font-normal text-ink-faint">{note}</span>}
      </h2>
      {children}
    </section>
  );
}

/** 사이트 상세로 가는 링크. PDF에서도 눌린다. */
function SiteLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={`${SITE_URL}${href}`} className="text-ink hover:text-accent">
      {children}
    </a>
  );
}

/** 대표 프로젝트 한 덩어리: 사이트의 "한눈에 보기" 카드와 같은 항목 */
function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="break-inside-avoid">
      <div className="flex flex-wrap items-baseline gap-x-3">
        <h3 className="text-[14px] font-bold">
          <SiteLink href={`/projects/${project.slug}`}>{project.title}</SiteLink>
        </h3>
        <span className="ml-auto tabular-nums text-ink-faint">{project.period}</span>
      </div>
      <p className="mt-0.5 text-ink-muted">{project.summary}</p>

      <dl className="mt-1.5 grid grid-cols-[64px_minmax(0,1fr)] gap-x-3 gap-y-1">
        <Row label="역할">
          {project.roleShort}
          {project.contribution && <span className="text-ink-muted"> · {project.contribution}</span>}
        </Row>
        {project.tasks && (
          <Row label="주요 업무">
            <BulletList items={project.tasks} />
          </Row>
        )}
        {project.outcomes && (
          <Row label="결과">
            <BulletList items={project.outcomes} />
          </Row>
        )}
        {project.highlights && (
          <Row label="핵심 결정">{project.highlights.map((h) => h.title).join(" / ")}</Row>
        )}
        <Row label="기술">{project.tags.join(" · ")}</Row>
      </dl>
    </article>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <>
      <dt className="text-ink-faint">{label}</dt>
      <dd className="min-w-0">{children}</dd>
    </>
  );
}

/** 회사 컨설턴트 프로파일처럼 한 줄씩: 기간 · 프로젝트 · 역할 · 요약 */
function OtherProjectsTable({ projects }: { projects: Project[] }) {
  return (
    <table className="w-full border-collapse text-[12px]">
      <thead>
        <tr className="border-b border-ink text-left text-ink-faint">
          <th className="w-[112px] py-1 pr-2 font-semibold">기간</th>
          <th className="py-1 pr-2 font-semibold">프로젝트 · 요약</th>
          <th className="w-[120px] py-1 font-semibold">역할</th>
        </tr>
      </thead>
      <tbody>
        {projects.map((project) => (
          <tr key={project.slug} className="break-inside-avoid border-b border-rule align-top">
            <td className="whitespace-nowrap py-1 pr-2 tabular-nums text-ink-faint">
              {project.period}
            </td>
            <td className="py-1 pr-2">
              <div className="font-semibold">
                <SiteLink href={`/projects/${project.slug}`}>{project.title}</SiteLink>
              </div>
              <div className="text-ink-muted">{project.summary}</div>
            </td>
            <td className="py-1">{project.roleShort}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** 대회·자격증·학력·교육 한 줄씩. 사이트 상세가 있는 항목(대회 출품작)은 이름이 링크가 된다. */
function HistoryLines({ entries }: { entries: HistoryEntry[] }) {
  return (
    <ul className="flex flex-col gap-1 text-[12px]">
      {entries.map((entry) => (
        <li key={entry.name} className="grid grid-cols-[104px_minmax(0,1fr)] gap-x-2">
          <span className="whitespace-nowrap tabular-nums text-ink-faint">{entry.term}</span>
          <span>
            <span className="font-semibold text-ink">
              {entry.href ? <SiteLink href={entry.href}>{entry.name}</SiteLink> : entry.name}
            </span>
            {entry.detail && <span className="text-ink-muted"> · {entry.detail}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * 재직 기간을 "n년 m개월"로 만든다. 인쇄하는 날 기준이라 PDF를 다시 만들면 따라 늘어난다.
 *
 * Args:
 *   term: 경력 기간 (`YYYY.MM – 현재` 형식). 앞의 시작 연월만 쓴다.
 */
function careerLength(term: string): string {
  const [year, month] = term.split(" ")[0].split(".").map(Number);
  const today = new Date();
  const months = (today.getFullYear() - year) * 12 + (today.getMonth() + 1 - month);
  return `${Math.floor(months / 12)}년 ${months % 12}개월`;
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-0.5">
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-3 before:absolute before:left-0.5 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-ink-faint before:content-['']"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
