/**
 * 태그 pill
 *
 * 파일 경로: src/components/common/TagPill.tsx
 * 목적: 태그를 테두리 pill 형태로 표시한다. 링크형과 정적 표시형을 함께 제공한다.
 * 주요 의존성: wouter, src/lib/utils.ts
 */

import type { ReactNode } from "react";
import { Link } from "wouter";

import { cn } from "@/lib/utils";

const BASE = "inline-block rounded-full border border-rule-tag font-medium";

/** 클릭할 수 없는 태그 표시. 카드 안처럼 이미 링크 내부일 때 쓴다. */
export function TagPill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={cn(BASE, className)}>{children}</span>;
}

/** 태그 페이지로 이동하는 태그 링크. */
export function TagLink({ name, className }: { name: string; className?: string }) {
  return (
    <Link href={`/tags/${encodeURIComponent(name)}`} className={cn(BASE, className)}>
      {name}
    </Link>
  );
}
