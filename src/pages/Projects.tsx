/**
 * Projects 화면
 *
 * 파일 경로: src/pages/Projects.tsx
 * 목적: 업무 프로젝트(/projects)와 대회 출품작(/projects/contests) 목록을 최신순으로 보여준다.
 * 주요 기능: 묶음별 목록, 모바일 전용 하위 탭(데스크톱은 좌측 레일이 하위 항목을 보여준다)
 * 주요 의존성: wouter, src/content/projects.ts, src/components/layout/navItems.ts
 *
 * Troubleshooting 목록과 같은 행 구조를 쓴다(좌: 기간 / 중: 제목·요약 / 우: 역할).
 * 커버 이미지가 준비되지 않아 회색 블록만 자리를 차지하던 카드 그리드를 걷어냈다.
 */

import { Link } from "wouter";

import { ListPageLayout } from "@/components/common/ListPageLayout";
import { ProjectList } from "@/components/common/ProjectList";
import { PROJECT_SUB_ITEMS } from "@/components/layout/navItems";
import { contestProjects, workProjects } from "@/content/projects";

const GROUPS = {
  work: { href: "/projects", label: "프로젝트", tabTitle: "Projects", projects: workProjects },
  contest: { href: "/projects/contests", label: "대회", tabTitle: "대회", projects: contestProjects },
};

/**
 * 프로젝트 목록 화면.
 *
 * Args:
 *   group: 보여줄 묶음. work는 업무 프로젝트, contest는 대회 출품작
 */
export default function Projects({ group }: { group: keyof typeof GROUPS }) {
  const { href, label, tabTitle, projects } = GROUPS[group];

  return (
    <ListPageLayout title="Projects" tabTitle={tabTitle}>
      <SubTabs activeHref={href} />
      {/* 데스크톱은 탭 대신 묶음 제목을 보여준다. 크기·밑줄은 About 섹션 제목과 같다 */}
      <h2 className="hidden border-b border-ink pb-3 text-[22px] font-bold tracking-tighter dt:block">
        {label}
      </h2>
      <ProjectList projects={projects} className="flex flex-col" />
    </ListPageLayout>
  );
}

/** 모바일 하위 탭. 좌측 레일이 없는 1000px 이하에서만 보인다. */
function SubTabs({ activeHref }: { activeHref: string }) {
  return (
    <nav aria-label="프로젝트 분류" className="flex gap-6 border-b border-ink dt:hidden">
      {PROJECT_SUB_ITEMS.map((item) => {
        const active = item.href === activeHref;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`-mb-px border-b-2 pb-3 text-[15px] ${
              active ? "border-ink font-semibold text-ink" : "border-transparent text-ink-faint"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
