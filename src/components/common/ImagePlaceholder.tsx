/**
 * 이미지 자리표시자
 *
 * 파일 경로: src/components/common/ImagePlaceholder.tsx
 * 목적: 아직 준비되지 않은 프로젝트 커버·히어로 이미지 자리를 회색 블록으로 채운다.
 * 주요 의존성: src/lib/utils.ts
 *
 * TODO: 실제 이미지가 준비되면 이 컴포넌트 대신 <img>로 교체한다.
 */

import { cn } from "@/lib/utils";

export function ImagePlaceholder({ className }: { className?: string }) {
  return <div aria-hidden className={cn("bg-placeholder", className)} />;
}
