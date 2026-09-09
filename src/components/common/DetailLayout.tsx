/**
 * 상세 페이지 레이아웃
 *
 * 파일 경로: src/components/common/DetailLayout.tsx
 * 목적: 프로젝트·글 상세가 공유하는 "본문 시트 + 우측 사이드바" 구조와 사이드바 블록을 제공한다.
 * 주요 기능: 3열 그리드(.detail-grid), 흰 배경 본문 시트, sticky 사이드바, 구분선이 붙는 사이드바 블록
 */

import type { ReactNode } from "react";

export function DetailLayout({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <article className="detail-grid px-5 pb-24 pt-14 dt:px-12">
      <div className="col-start-1 w-full min-w-0 rounded-lg border border-rule bg-sheet px-5 py-7 dt:col-start-2 dt:px-14 dt:pb-14 dt:pt-12">
        {children}
      </div>
      <aside className="mt-2 flex flex-col gap-6 text-[15px] dt:col-start-3 dt:mt-0 dt:w-60 dt:sticky dt:top-24 dt:self-start dt:pt-11">
        {sidebar}
      </aside>
    </article>
  );
}

/**
 * 사이드바의 한 블록. 상단 구분선과 오버라인 라벨을 붙인다.
 * label을 주지 않으면 구분선 없이 내용만 렌더링한다(메타 정의 목록, 버튼 묶음 등).
 */
export function SidebarBlock({
  label,
  children,
}: {
  label?: string;
  children: ReactNode;
}) {
  if (!label) return <div>{children}</div>;

  return (
    <div className="border-t border-rule pt-4">
      <div className="mb-2 text-xs font-semibold tracking-overline text-ink-faint">
        {label}
      </div>
      {children}
    </div>
  );
}

/** 상세 본문의 h2 섹션. 사이드바 목차가 이 id로 점프한다. */
export function DetailSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <>
      <h2 id={id} className="mb-3 text-[21px] font-bold tracking-snug">
        {title}
      </h2>
      {children}
    </>
  );
}
