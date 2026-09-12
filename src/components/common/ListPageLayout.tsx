/**
 * 목록 페이지 레이아웃
 *
 * 파일 경로: src/components/common/ListPageLayout.tsx
 * 목적: Projects와 Blog가 공유하는 단일 컬럼 목록 구조를 제공한다.
 * 주요 기능: 페이지 제목, 개수를 붙인 섹션 헤딩
 *
 * 섹션 내비는 좌측 레일의 아코디언이 담당하므로 이 레이아웃에는 사이드바를 두지 않는다.
 * 덕분에 제목과 섹션 헤딩이 같은 왼쪽 끝을 공유하고, 목록이 컨테이너 폭을 그대로 쓴다.
 */

import type { ReactNode } from "react";

export function ListPageLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-listing px-5 pb-24 pt-16 dt:px-12">
      <h1 className="text-[28px] font-bold tracking-tightest">{title}</h1>
      <div className="mt-10">{children}</div>
    </div>
  );
}
