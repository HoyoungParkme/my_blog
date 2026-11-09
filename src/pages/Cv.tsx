/**
 * 이력서 화면 (A4 인쇄용)
 *
 * 파일 경로: src/pages/Cv.tsx
 * 목적: 포트폴리오를 달라는 요청에 URL 대신 문서로 건넬 수 있는 범용 이력서를 그린다. PDF로 인쇄할 원본이다.
 * 주요 기능: 머리(사진·소개·연락처) · 핵심역량 · 경력 · 주요 성과 3건 · 프로젝트 이력 · 수상·자격·교육·학력·병역
 * 주요 의존성: src/content/profile.ts, src/content/projects.ts, src/content/privateProfile.ts,
 *             src/components/common/PrintParts.tsx
 *
 * 두 가지로 인쇄한다.
 * - /cv: 공개용. 사이트에 올라가는 PDF라 전화·주소·생년월일은 넣지 않는다.
 * - /cv/full: 전달용. private/cv-private.json의 개인정보까지 넣는다. 그 파일이 없으면 공개용과 같다.
 * 개발 서버에서만 열린다(App.tsx에서 DEV일 때만 라우트를 등록). 경력기술서(/resume)와 같은 방식이다.
 */

import {
  BulletList,
  careerLength,
  HistoryLines,
  PrintSection,
  SiteLink,
} from "@/components/common/PrintParts";
import { usePageTitle } from "@/components/layout/usePageTitle";
import { usePrivateProfile, type PrivateProfile } from "@/content/privateProfile";
import {
  academicHistory,
  certifications,
  competitions,
  education,
  employment,
  keyAchievements,
  military,
  profile,
} from "@/content/profile";
import { isPlanned, workProjects } from "@/content/projects";
import { SITE_URL } from "@/content/siteMeta";

/** "https://" 없이 보여 줄 사이트 주소 */
const SITE_HOST = SITE_URL.replace(/^https?:\/\//, "");

/**
 * 이력서 화면.
 *
 * Args:
 *   full: true면 private/cv-private.json의 개인정보(전화·주소·생년월일·고등학교·학점)까지 넣는다.
 */
export default function Cv({ full = false }: { full?: boolean }) {
  usePageTitle("이력서");

  const personal = usePrivateProfile(full);
  // 투입 전인 프로젝트는 경력이 아니라서 뺀다
  const projects = workProjects.filter((p) => !isPlanned(p));
  const schools = personal ? [...academicHistory, personal.highSchool] : academicHistory;

  return (
    <div className="mx-auto my-10 w-[210mm] bg-sheet px-[14mm] py-[14mm] text-[12.5px] leading-[1.5] text-ink-body shadow-sm print:m-0 print:w-auto print:p-0 print:shadow-none">
      <CvHeader personal={personal} />

      <PrintSection title="핵심역량">
        <CoreSkillList items={profile.coreSkills} />
      </PrintSection>

      <PrintSection title="경력">
        <div className="flex flex-wrap items-baseline gap-x-3">
          <span className="text-[14px] font-bold text-ink">{employment.company}</span>
          <span className="text-ink-muted">{employment.business}</span>
          <span className="ml-auto tabular-nums text-ink-faint">
            {employment.term} ({careerLength(employment.term)})
          </span>
        </div>
        <dl className="mt-1 grid grid-cols-[64px_minmax(0,1fr)] gap-x-3 gap-y-0.5">
          <dt className="text-ink-faint">직위</dt>
          <dd>{employment.position}</dd>
          <dt className="text-ink-faint">부서</dt>
          <dd>{employment.departments.join(" · ")}</dd>
          <dt className="text-ink-faint">담당</dt>
          <dd>{employment.duties}</dd>
        </dl>
      </PrintSection>

      <PrintSection title="주요 성과" note="제목을 누르면 사이트 상세로 이동">
        <div className="flex flex-col gap-2.5">
          {keyAchievements.map((item, index) => (
            <article key={item.href} className="break-inside-avoid">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="font-bold">
                  <span className="mr-1.5 text-accent">{index + 1}</span>
                  <SiteLink href={item.href}>{item.title}</SiteLink>
                </h3>
                <span className="ml-auto tabular-nums text-ink-faint">{item.period}</span>
              </div>
              <div className="mt-0.5">
                <BulletList items={item.points} />
              </div>
            </article>
          ))}
        </div>
      </PrintSection>

      <PrintSection title="프로젝트 이력">
        <ul className="flex flex-col text-[12px]">
          {projects.map((project) => (
            <li
              key={project.slug}
              className="grid grid-cols-[112px_minmax(0,1fr)_auto] gap-x-3 border-b border-rule py-1 last:border-b-0"
            >
              <span className="whitespace-nowrap tabular-nums text-ink-faint">{project.period}</span>
              <SiteLink href={`/projects/${project.slug}`}>
                <span className="font-semibold">{project.title}</span>
              </SiteLink>
              <span className="text-ink-muted">{project.roleShort}</span>
            </li>
          ))}
        </ul>
      </PrintSection>

      {/* 두 단의 길이가 비슷하도록 왼쪽은 수상·자격증, 오른쪽은 교육·학력·병역을 둔다 */}
      <div className="grid grid-cols-2 gap-x-8">
        <div>
          <PrintSection title="수상 · 대외활동">
            <HistoryLines entries={competitions} />
          </PrintSection>
          <PrintSection title="자격증">
            <HistoryLines entries={certifications} />
          </PrintSection>
        </div>
        <div>
          <PrintSection title="교육">
            <HistoryLines entries={education} />
          </PrintSection>
          <PrintSection title="학력 · 병역">
            <HistoryLines entries={schools} />
            {personal && <p className="mt-1 text-[12px] text-ink-muted">평균 학점 {personal.gpa}</p>}
            <div className="mt-1">
              <HistoryLines entries={[military]} />
            </div>
          </PrintSection>
        </div>
      </div>
    </div>
  );
}

/** 사진 · 이름 · 한 줄 소개 · 연락처 */
function CvHeader({ personal }: { personal?: PrivateProfile }) {
  const githubHost = profile.github.replace(/^https?:\/\//, "");
  const contacts = [
    personal && ["전화", personal.phone],
    ["이메일", profile.email],
    ["GitHub", githubHost],
    ["사이트", SITE_HOST],
    personal && ["생년월일", personal.birth],
    personal && ["주소", personal.address],
  ].filter((row): row is string[] => Boolean(row));

  return (
    <header className="flex gap-5 border-b-2 border-ink pb-4">
      <img
        src={profile.photo}
        alt={`${profile.name} 사진`}
        className="h-[34mm] w-[27mm] shrink-0 rounded-sm border border-ink object-cover"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <h1 className="text-[28px] font-bold leading-none tracking-tightest text-ink">
          {profile.name}
          <span className="ml-3 text-[15px] font-semibold tracking-normal text-ink-muted">이력서</span>
        </h1>
        <p className="mt-2 text-[14px] font-semibold text-accent">{profile.cvHeadline}</p>
        <p className="mt-0.5 text-ink-muted">
          {profile.railRole} · 경력 {careerLength(employment.term)}
        </p>
        <dl className="mt-auto grid grid-cols-[auto_minmax(0,1fr)_auto_minmax(0,1fr)] gap-x-3 gap-y-0.5 pt-2 text-[12px]">
          {contacts.map(([label, value]) => (
            <div key={label} className="contents">
              <dt className="text-ink-faint">{label}</dt>
              <dd className="min-w-0">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}

/** 핵심역량. "분야: 설명" 형식이면 분야를 굵게 보여 준다. */
function CoreSkillList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-1">
      {items.map((item) => {
        const [label, text] = item.includes(": ") ? item.split(": ") : ["", item];
        return (
          <li key={item} className="grid grid-cols-[84px_minmax(0,1fr)] gap-x-2">
            <span className="font-semibold text-ink">{label}</span>
            <span>{text}</span>
          </li>
        );
      })}
    </ul>
  );
}
