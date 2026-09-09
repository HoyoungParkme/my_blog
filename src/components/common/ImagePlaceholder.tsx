/**
 * 이미지 자리표시자
 *
 * 파일 경로: src/components/common/ImagePlaceholder.tsx
 * 목적: 아직 준비되지 않은 프로젝트 커버·히어로 이미지 자리를 회색 블록으로 채운다.
 *
 * TODO: 실제 이미지가 준비되면 이 컴포넌트 대신 <img>로 교체한다.
 */

/** 크기와 radius는 호출하는 쪽에서 className으로 지정한다. */
export function ImagePlaceholder({ className }: { className?: string }) {
  return <div aria-hidden className={`bg-placeholder ${className ?? ""}`} />;
}
