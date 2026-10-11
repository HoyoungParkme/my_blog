/**
 * 탭 제목 훅
 *
 * 파일 경로: src/components/layout/usePageTitle.ts
 * 목적: 앱 안에서 페이지를 옮길 때 브라우저 탭 제목을 그 페이지에 맞게 바꾼다.
 *       주소로 바로 들어올 때의 제목은 빌드 단계에서 만든 라우트별 HTML이 이미 맞춰 둔다.
 * 주요 의존성: react, src/content/siteMeta.ts
 */

import { useEffect } from "react";

import { pageTitle } from "@/content/siteMeta";

/**
 * 탭 제목을 페이지 이름에 맞춘다.
 *
 * Args:
 *   name: 페이지 이름. 생략하면 첫 화면 제목.
 * Side Effects:
 *   document.title을 바꾼다.
 */
export function usePageTitle(name?: string): void {
  useEffect(() => {
    document.title = pageTitle(name);
  }, [name]);
}
