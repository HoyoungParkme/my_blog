/**
 * 모바일 상단 바 (1000px 이하 전용)
 *
 * 파일 경로: src/components/layout/MobileTopBar.tsx
 * 목적: 브랜드 줄과 4등분 탭 줄로 이루어진 2줄 상단 내비.
 *       브랜드 줄은 스크롤과 함께 올라가고 탭 줄만 화면 상단에 붙는다.
 * 주요 기능: 브랜드 줄, sticky 탭 줄, 현재 페이지 표시
 * 주요 의존성: wouter, src/content/profile.ts, ./navItems
 *
 * [중요] 두 줄을 하나의 요소로 감싸지 않고 Fragment로 내보낸다.
 * position: sticky는 부모의 패딩 박스 안에서만 붙는다. 래퍼로 감싸면 래퍼 높이가
 * 100px이라 탭 줄이 100px 지점에서 멈춰 사실상 붙지 않는다.
 * PageShell이 이 둘을 #root 직계 자식으로 두는 배치를 반드시 지켜야 한다.
 */

import { Link, useLocation } from "wouter";

import { profile } from "@/content/profile";

import { NAV_ITEMS, isNavActive } from "./navItems";

export function MobileTopBar() {
  const [location] = useLocation();

  return (
    <>
      {/*
        브랜드 줄: 흐름에 남아 스크롤과 함께 올라간다.
        높이를 고정하지 않아 글자 크기를 키워도 이름이 잘리지 않는다.
      */}
      <Link
        href="/"
        className="flex items-baseline gap-2 bg-ink px-5 py-3 text-paper hover:text-paper dt:hidden"
      >
        <span className="text-[17px] font-bold tracking-tightest">{profile.name}</span>
        <span className="text-[13px] text-brand-sub">{profile.railRole}</span>
      </Link>

      {/*
        탭 줄: 4등분 그리드.
        flex + justify-between이면 넓은 화면에서 항목 사이에 죽은 구간이 생기고,
        글자를 키웠을 때 페이지 전체가 가로로 밀린다.
        minmax(min-content, 1fr)는 각 칸이 최소한 글자 폭만큼은 확보하게 하고,
        남는 폭만 균등 분배한다. 라벨 길이가 달라도 잘리지 않고 빈 구간도 안 생긴다.
        whitespace-nowrap이 없으면 좁은 화면에서 긴 라벨이 두 줄로 접혀 바 높이가 튄다.
      */}
      <nav
        aria-label="주요 메뉴"
        className="sticky top-0 z-10 grid grid-cols-[repeat(4,minmax(min-content,1fr))] overflow-x-auto border-b border-rule bg-paper text-sm font-medium [scrollbar-width:none] [&::-webkit-scrollbar]:hidden dt:hidden"
      >
        {NAV_ITEMS.map((item) => {
          const active = isNavActive(item.href, location);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-[44px] items-center justify-center whitespace-nowrap px-2 py-3 ${
                active ? "bg-badge font-semibold" : ""
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}
