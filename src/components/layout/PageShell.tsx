/**
 * 페이지 골격
 *
 * 파일 경로: src/components/layout/PageShell.tsx
 * 목적: 헤더 - 본문 - 푸터로 이어지는 공통 골격을 제공한다.
 * 주요 의존성: SiteHeader, SiteFooter
 */

import type { ReactNode } from "react";

import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
