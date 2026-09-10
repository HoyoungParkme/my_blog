/**
 * 좌측 고정 레일 (1001px 이상 전용)
 *
 * 파일 경로: src/components/layout/SideRail.tsx
 * 목적: 데스크톱에서 좌측에 고정되는 내비게이션.
 *       1000px 이하는 MobileTopBar가 담당하므로 이 컴포넌트는 화면에서 감춘다.
 * 주요 기능: 브랜드 블록, 평평한 내비 4개, 연락처 푸터
 * 주요 의존성: wouter, src/content/profile.ts, ./navItems
 */

import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";

import { profile } from "@/content/profile";

import { NAV_ITEMS, isNavActive } from "./navItems";

/** 복사 피드백을 유지하는 시간(ms) */
const FEEDBACK_MS = 1600;

export function SideRail() {
  const [location] = useLocation();

  return (
    <aside className="hidden border-r border-rule bg-paper dt:fixed dt:left-0 dt:top-0 dt:z-10 dt:flex dt:h-screen dt:w-rail dt:flex-col">
      <Link href="/" className="block bg-ink p-6 text-paper hover:text-paper">
        <div className="text-[19px] font-bold tracking-tightest">{profile.name}</div>
        <div className="mt-[3px] text-[13px] text-brand-sub">{profile.railRole}</div>
      </Link>

      <nav aria-label="주요 메뉴" className="mt-8 flex flex-col text-[15px] font-medium">
        {NAV_ITEMS.map((item) => {
          const active = isNavActive(item.href, location);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`border-b border-rule-rail px-6 py-3.5 ${
                active ? "bg-badge font-semibold" : ""
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto">
        <RailFooter />
      </div>
    </aside>
  );
}

/**
 * 연락처 블록. 데스크톱에서는 레일 하단, 모바일에서는 페이지 하단에 놓인다.
 * 두 곳에서 렌더되지만 각 인스턴스가 독립된 상태와 타이머를 가지므로 서로 간섭하지 않는다.
 *
 * Side Effects: 클립보드에 이메일 주소를 쓰고, 피드백 타이머를 건다.
 */
export function RailFooter() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number>();

  // 언마운트 시 남아 있는 타이머를 정리한다
  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      // 클립보드 권한이 없으면 조용히 넘어간다
      return;
    }
    setCopied(true);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopied(false), FEEDBACK_MS);
  };

  return (
    <div className="flex flex-row flex-wrap items-center gap-4 px-5 py-4 text-[13px] text-ink-faint dt:flex-col dt:items-start dt:gap-2.5 dt:p-6">
      <a href={profile.github} target="_blank" rel="noreferrer">
        GitHub ↗
      </a>
      <button type="button" onClick={copyEmail} className="hover:text-accent">
        {copied ? "복사됨" : "Email"}
      </button>
      <span className="dt:mt-1.5">© 2026 {profile.name}</span>
    </div>
  );
}
