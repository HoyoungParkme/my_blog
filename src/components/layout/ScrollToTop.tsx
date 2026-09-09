/**
 * 라우트 이동 시 스크롤 초기화
 *
 * 파일 경로: src/components/layout/ScrollToTop.tsx
 * 목적: 페이지를 이동했을 때 이전 스크롤 위치가 남지 않도록 맨 위로 되돌린다.
 * 주요 의존성: wouter
 *
 * Side Effects: window.scrollTo 호출
 */

import { useEffect } from "react";
import { useLocation } from "wouter";

export function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // html에 scroll-behavior: smooth가 걸려 있어 즉시 이동을 명시한다
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);

  return null;
}
