/**
 * 사이트 헤더
 *
 * 파일 경로: src/components/layout/SiteHeader.tsx
 * 목적: 모든 페이지 상단에 고정되는 워드마크와 주 내비게이션을 렌더링한다.
 * 주요 기능: sticky 헤더, 현재 섹션 밑줄 표시
 * 주요 의존성: wouter
 */

import { Link, useLocation } from "wouter";

/** matches: 이 항목을 활성 상태로 표시할 경로 접두사 목록 (태그 페이지는 Blog에 속한다) */
const NAV_ITEMS = [
  { label: "Projects", href: "/projects", matches: ["/projects"] },
  { label: "Blog", href: "/blog", matches: ["/blog", "/tags"] },
];

export function SiteHeader() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-10 border-b border-rule bg-paper">
      <div className="mx-auto flex max-w-page items-center justify-between px-5 py-5 dt:px-12">
        <Link href="/" className="text-[19px] font-bold tracking-tightest">
          Home
        </Link>
        <nav className="flex flex-wrap gap-[18px] text-sm font-medium dt:gap-8 dt:text-[15px]">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                item.matches.some((prefix) => location.startsWith(prefix))
                  ? "border-b-2 border-ink pb-0.5"
                  : undefined
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
