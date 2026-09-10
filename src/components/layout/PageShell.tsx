/**
 * 페이지 골격
 *
 * 파일 경로: src/components/layout/PageShell.tsx
 * 목적: 화면 폭에 따라 다른 내비게이션과 본문 영역을 배치한다.
 * 주요 의존성: MobileTopBar, SideRail
 *
 * MobileTopBar는 Fragment로 두 줄을 내보내고, 이 컴포넌트도 Fragment라
 * 두 줄이 #root의 직계 자식이 된다. 탭 줄의 sticky가 문서 전체를 활동 범위로
 * 쓰려면 이 배치가 필요하다 — 래퍼로 감싸면 sticky가 그 래퍼 안에 갇힌다.
 */

import type { ReactNode } from "react";

import { MobileTopBar } from "./MobileTopBar";
import { RailFooter, SideRail } from "./SideRail";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <MobileTopBar />
      <SideRail />
      <div className="flex flex-1 flex-col dt:ml-rail">
        <main className="flex-1">{children}</main>
        {/* 모바일 연락처는 상단이 아니라 페이지 끝에 둔다 */}
        <div className="border-t border-rule dt:hidden">
          <RailFooter />
        </div>
      </div>
    </>
  );
}
