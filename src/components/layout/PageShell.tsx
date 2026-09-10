/**
 * 페이지 골격
 *
 * 파일 경로: src/components/layout/PageShell.tsx
 * 목적: 좌측 고정 레일과 본문 영역으로 이루어진 공통 골격을 제공한다.
 * 주요 의존성: SideRail
 *
 * 레일이 데스크톱에서 fixed 240px이라 본문에 같은 크기의 여백을 준다.
 * 1000px 이하에서는 레일이 상단 가로 바로 바뀌므로 여백 대신 자리를 차지한다.
 */

import type { ReactNode } from "react";

import { SideRail } from "./SideRail";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SideRail />
      <div className="flex min-h-screen flex-col dt:ml-rail">
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}
