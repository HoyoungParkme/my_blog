/**
 * 사이트 푸터
 *
 * 파일 경로: src/components/layout/SiteFooter.tsx
 * 목적: 저작권 표기와 연락 수단(GitHub 링크, 이메일 복사 버튼)을 렌더링한다.
 * 주요 기능: 클립보드 복사와 "복사됨" 피드백
 * 주요 의존성: src/content/profile.ts
 */

import { useEffect, useRef, useState } from "react";

import { profile } from "@/content/profile";

/** 복사 피드백을 유지하는 시간(ms) */
const FEEDBACK_MS = 1600;

export function SiteFooter() {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number>();

  // 언마운트 시 남아 있는 타이머를 정리한다
  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      // 클립보드 권한이 없으면 조용히 넘어간다 (mailto 링크가 대체 수단)
      return;
    }
    setCopied(true);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setCopied(false), FEEDBACK_MS);
  };

  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-page flex-wrap justify-between gap-2 px-5 py-6 text-sm text-ink-faint dt:px-12">
        <span>© 2026 {profile.name}</span>
        <span className="flex gap-4">
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <button type="button" onClick={copyEmail} className="hover:text-accent">
            {copied ? "복사됨" : "Email"}
          </button>
        </span>
      </div>
    </footer>
  );
}
