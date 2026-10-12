/**
 * 내비게이션 항목
 *
 * 파일 경로: src/components/layout/navItems.ts
 * 목적: 데스크톱 레일과 모바일 상단 탭 바가 같은 목적지 목록을 쓰게 한다.
 * 주요 기능: 항목 정의(하위 항목 포함), 현재 경로의 활성 판정
 * 주요 의존성: src/content/projects.ts (상세 페이지가 대회 출품작인지 판정)
 */

import { findProject } from "@/content/projects";

export interface NavItem {
  href: string;
  label: string;
  /** 하위 항목. 상위 항목이 활성일 때 레일에서 펼쳐진다. */
  children?: NavItem[];
}

/** Projects 하위 항목. 데스크톱 레일과 모바일 Projects 화면의 탭이 같이 쓴다. */
export const PROJECT_SUB_ITEMS: NavItem[] = [
  { href: "/projects", label: "프로젝트" },
  { href: "/projects/contests", label: "대회" },
];

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "About" },
  { href: "/projects", label: "Projects", children: PROJECT_SUB_ITEMS },
  { href: "/blog", label: "Troubleshooting" },
];

/**
 * 현재 경로가 해당 항목에 속하는지 판정한다.
 *
 * Args:
 *   href: 항목의 경로
 *   location: wouter가 준 현재 경로
 * Returns:
 *   활성 여부. 첫 화면(/)만 완전 일치를 요구하고 나머지는 경로 접두사로 판정한다.
 */
export function isNavActive(href: string, location: string): boolean {
  if (href === "/") return location === "/";
  return location.startsWith(href);
}

/**
 * Projects 하위 항목 중 현재 경로에 해당하는 항목의 주소를 찾는다.
 * 상세 페이지(/projects/:slug)는 그 프로젝트가 대회 출품작이면 "대회", 아니면 "프로젝트"로 본다.
 *
 * Args:
 *   location: wouter가 준 현재 경로
 * Returns:
 *   활성 하위 항목의 주소. Projects 밖이면 undefined.
 */
export function activeProjectSubHref(location: string): string | undefined {
  if (!location.startsWith("/projects")) return undefined;
  if (location === "/projects/contests") return "/projects/contests";
  const slug = location.split("/")[2];
  return slug && findProject(slug)?.kind === "contest" ? "/projects/contests" : "/projects";
}
