/**
 * 타임라인 선 채우기 훅
 *
 * 파일 경로: src/components/common/useTimelineFill.ts
 * 목적: 이력 섹션 왼쪽 선을 스크롤한 만큼 위에서부터 채우고, 선이 지나간 항목의 점을 켠다.
 * 주요 기능:
 *   - 섹션이 화면 위에서 85% 지점을 지나 올라온 만큼 선을 채운다
 *   - 페이지 끝까지 내리면 남은 부분도 모두 채운다 (마지막 섹션이 끝까지 못 올라오는 경우)
 *   - 움직임 줄이기 설정이면 처음부터 다 채운다
 * 주요 의존성: react
 *
 * 사용법: 반환된 ref를 선과 항목을 감싼 요소에 붙이고, 안쪽에 `data-fill`(채워지는 선)과
 *         항목마다 `data-dot`(점)을 둔다. 켜진 점에는 `data-on` 속성이 붙는다.
 */

import { useEffect, useRef } from "react";

/** 화면 위에서 이 비율 지점까지 올라온 부분만큼 선을 채운다 */
const FILL_LINE = 0.85;

/**
 * 스크롤에 맞춰 타임라인 선을 채운다.
 *
 * Returns:
 *   타임라인을 감싸는 요소에 붙일 ref
 * Side Effects:
 *   window의 scroll·resize 이벤트를 구독하고, data-fill 높이와 data-dot의 data-on 속성을 바꾼다.
 */
export function useTimelineFill<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const track = ref.current;
    const fill = track?.querySelector<HTMLElement>("[data-fill]");
    if (!track || !fill) return;

    const dots = [...track.querySelectorAll<HTMLElement>("[data-dot]")];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const draw = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const atPageEnd =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      const filled =
        reduceMotion.matches || atPageEnd
          ? rect.height
          : Math.min(rect.height, Math.max(0, window.innerHeight * FILL_LINE - rect.top));

      fill.style.height = `${filled}px`;
      for (const dot of dots) {
        const center = dot.getBoundingClientRect().top + dot.offsetHeight / 2 - rect.top;
        dot.toggleAttribute("data-on", center <= filled);
      }
    };
    // 스크롤마다 바로 그리지 않고 다음 프레임에 한 번만 그린다
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(draw);
    };

    draw();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return ref;
}
