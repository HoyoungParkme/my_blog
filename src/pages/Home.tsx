/**
 * Home 화면 (랜딩)
 *
 * 파일 경로: src/pages/Home.tsx
 * 목적: 스크롤 없이 한 화면에서 인상만 남기는 랜딩. 이력과 소개는 About으로 분리했다.
 * 주요 기능: 문구 블록, 파티클 글리프 배경
 * 주요 의존성: src/components/home/ParticleGlyph.tsx
 */

import { ParticleGlyph } from "@/components/home/ParticleGlyph";

export default function Home() {
  return (
    <div className="relative min-h-[70vh] dt:h-screen dt:min-h-0 dt:overflow-hidden">
      <ParticleGlyph />
      <div className="relative z-[1] flex min-h-[70vh] flex-col items-start justify-center px-5 py-12 dt:h-screen dt:min-h-0 dt:py-[clamp(32px,6vh,72px)] dt:pl-[clamp(80px,14vw,220px)] dt:pr-[clamp(40px,6vw,96px)]">
        {/* 모바일에서는 40px이 좁은 화면에 걸려 줄이 어색하게 끊겨 폭에 맞춰 줄인다 */}
        <h1 className="w-auto text-[clamp(28px,7vw,40px)] font-bold leading-[1.24] tracking-[-.04em] [text-wrap:pretty] dt:w-[min(620px,54%)] dt:text-[clamp(26px,3vw,42px)]">
          영유아부터 할아버지까지,
          <br />
          누구와도 협업할 수 있는 개발자
        </h1>
      </div>
    </div>
  );
}
