/**
 * 내비게이션 항목
 *
 * 파일 경로: src/components/layout/navItems.ts
 * 목적: 데스크톱 레일과 모바일 상단 탭 바가 같은 목적지 목록을 쓰게 한다.
 * 주요 기능: 항목 정의, 현재 경로의 활성 판정
 */

export interface NavItem {
  href: string;
  label: string;
}

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "트러블슈팅" },
];

/**
 * 현재 경로가 해당 항목에 속하는지 판정한다.
 *
 * Args:
 *   href: 항목의 경로
 *   location: wouter가 준 현재 경로
 * Returns:
 *   활성 여부. Home만 완전 일치를 요구하고 나머지는 경로 접두사로 판정한다.
 */
export function isNavActive(href: string, location: string): boolean {
  if (href === "/") return location === "/";
  return location.startsWith(href);
}
