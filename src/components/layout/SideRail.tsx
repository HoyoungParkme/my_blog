/**
 * 좌측 고정 레일
 *
 * 파일 경로: src/components/layout/SideRail.tsx
 * 목적: 모든 페이지가 공유하는 내비게이션. 데스크톱에서는 좌측 240px 고정,
 *       1000px 이하에서는 상단 가로 바로 전환된다.
 * 주요 기능: 브랜드 블록, 아코디언 내비(Projects·Blog), 연락처 복사
 * 주요 의존성: wouter, src/content/profile.ts
 */

import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "wouter";

import { profile } from "@/content/profile";

/** 복사 피드백을 유지하는 시간(ms) */
const FEEDBACK_MS = 1600;

/** 아코디언으로 펼쳐지는 하위 항목. href의 해시는 각 목록 페이지의 섹션 id와 맞아야 한다. */
const PROJECT_LINKS = [
  { label: "전체", href: "/projects" },
  { label: "회사 프로젝트", href: "/projects#company" },
  { label: "개인 프로젝트", href: "/projects#personal" },
];

const BLOG_LINKS = [
  { label: "전체", href: "/blog" },
  { label: "트러블슈팅", href: "/blog#type-0" },
  { label: "비교 분석", href: "/blog#type-1" },
  { label: "개념 정리", href: "/blog#type-2" },
  { label: "설계·문화", href: "/blog#type-3" },
];

export function SideRail() {
  const [location] = useLocation();

  return (
    <aside className="block border-b border-rule bg-paper dt:fixed dt:left-0 dt:top-0 dt:z-10 dt:flex dt:h-screen dt:w-rail dt:flex-col dt:border-b-0 dt:border-r">
      <BrandBlock />

      <nav className="flex flex-row flex-wrap text-[15px] font-medium dt:mt-8 dt:flex-col dt:flex-nowrap">
        <RailLink href="/" label="Home" active={location === "/"} />
        <RailLink href="/about" label="About" active={location === "/about"} />
        <RailAccordion
          label="Projects"
          links={PROJECT_LINKS}
          active={location.startsWith("/projects")}
        />
        <RailAccordion
          label="Blog"
          links={BLOG_LINKS}
          active={location.startsWith("/blog") || location.startsWith("/tags")}
        />
      </nav>

      <RailFooter />
    </aside>
  );
}

function BrandBlock() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 bg-ink px-5 py-3.5 text-paper hover:text-paper dt:block dt:p-6"
    >
      <div>
        <div className="text-[19px] font-bold tracking-tightest">{profile.name}</div>
        <div className="mt-[3px] text-[13px] text-brand-sub">{profile.railRole}</div>
      </div>
    </Link>
  );
}

function RailLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`px-5 py-3.5 dt:border-b dt:border-rule-rail dt:px-6 ${
        active ? "bg-badge font-semibold" : ""
      }`}
    >
      {label}
    </Link>
  );
}

/**
 * details/summary 기반 아코디언.
 * 1000px 이하에서는 펼친 목록이 절대 위치 드롭다운으로 뜬다.
 */
function RailAccordion({
  label,
  links,
  active,
}: {
  label: string;
  links: { label: string; href: string }[];
  active: boolean;
}) {
  return (
    <details className="relative dt:static dt:border-b dt:border-rule-rail">
      <summary
        className={`flex cursor-pointer items-center justify-between gap-2 px-5 py-3.5 [&::-webkit-details-marker]:hidden dt:px-6 ${
          active ? "bg-badge font-semibold" : ""
        }`}
      >
        <span>{label}</span>
        <span className="text-[11px] text-ink-faint">▾</span>
      </summary>
      <div className="absolute left-0 top-full z-20 min-w-[190px] rounded-b-md border border-rule bg-badge py-1.5 shadow-[0_6px_18px_rgba(21,20,18,.08)] dt:static dt:min-w-0 dt:rounded-none dt:border-0 dt:border-t dt:border-rule-rail dt:shadow-none">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block py-[7px] pl-8 pr-6 text-sm font-medium text-ink-muted"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </details>
  );
}

function RailFooter() {
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
    <div className="flex flex-row flex-wrap items-center gap-4 border-t border-rule px-5 py-4 text-[13px] text-ink-faint dt:mt-auto dt:flex-col dt:items-start dt:gap-2.5 dt:border-t-0 dt:p-6">
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
