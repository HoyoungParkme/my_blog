/**
 * Home 배경 파티클
 *
 * 파일 경로: src/components/home/ParticleGlyph.tsx
 * 목적: 글리프(이모지) 모양으로 수렴하는 입자 애니메이션을 캔버스에 그린다.
 * 주요 기능: 글리프 픽셀 샘플링, 스프링 수렴, 주기적 재산란
 *
 * 동작 방식:
 *   1. 오프스크린 캔버스에 글리프를 크게 그린 뒤 불투명한 픽셀만 격자로 샘플링해 목표 좌표를 만든다
 *   2. 입자는 화면 전역에 흩뿌려진 상태에서 시작해 스프링으로 목표 좌표에 수렴한다
 *   3. RESCATTER_SEC마다 임의 방향 임펄스를 줘 흩어졌다가 다시 모이게 한다
 *
 * Side Effects: window에 setInterval 루프를 만들고 언마운트 시 해제한다.
 */

import { useEffect, useRef } from "react";

/** 배경에 그릴 글리프. 글자 하나면 무엇이든 가능하다. */
const GLYPH = "🤸‍♂️";

/** 프레임 간격(ms). 아래 물리 상수들이 이 간격에 맞춰 조정돼 있다. */
const FRAME_MS = 33;
/** 재산란 주기(초) */
const RESCATTER_SEC = 13;
/** 목표 좌표로 당기는 힘과 감쇠 */
const PULL = 0.012;
const DAMPING = 0.9;

interface Particle {
  /** 목표 좌표 */
  tx: number;
  ty: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** 흔들림 위상과 속도 */
  ph: number;
  sp: number;
  /** 강조색(초록) 입자 여부 */
  accent: boolean;
  size: number;
}

interface Scene {
  particles: Particle[];
  lastPhase: number;
}

/** 글리프를 오프스크린에 그려 불투명 픽셀 좌표를 뽑는다. */
function sampleGlyph(glyph: string, width: number, height: number) {
  const size = Math.min(height * 0.82, width * 0.62);
  const off = document.createElement("canvas");
  off.width = Math.ceil(size * 1.1);
  off.height = Math.ceil(size * 1.15);

  const g = off.getContext("2d");
  if (!g) return { points: [], offWidth: off.width, offHeight: off.height };

  g.fillStyle = "#000";
  g.font = `700 ${size}px Georgia, "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", serif`;
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText(glyph, off.width / 2, off.height / 2);

  const data = g.getImageData(0, 0, off.width, off.height).data;
  const step = size > 380 ? 7 : 6;
  const points: { x: number; y: number }[] = [];
  for (let y = 0; y < off.height; y += step) {
    for (let x = 0; x < off.width; x += step) {
      if (data[(y * off.width + x) * 4 + 3] > 140) points.push({ x, y });
    }
  }
  return { points, offWidth: off.width, offHeight: off.height };
}

function buildScene(width: number, height: number): Scene {
  const { points, offWidth, offHeight } = sampleGlyph(GLYPH, width, height);
  // 글리프를 오른쪽(74% 지점)에 배치해 좌측 문구와 겹치지 않게 한다
  const originX = width * 0.74 - offWidth / 2;
  const originY = height / 2 - offHeight / 2;

  return {
    particles: points.map((p) => ({
      tx: p.x + originX,
      ty: p.y + originY,
      x: p.x + originX + (Math.random() - 0.5) * width * 0.9,
      y: p.y + originY + (Math.random() - 0.5) * height * 1.1,
      vx: 0,
      vy: 0,
      ph: Math.random() * 6.28,
      sp: 0.6 + Math.random() * 0.8,
      accent: Math.random() < 0.11,
      size: 2 + Math.random() * 2.2,
    })),
    lastPhase: 0,
  };
}

export function ParticleGlyph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const startedAt = performance.now();
    let scene: Scene | null = null;
    let lastWidth = 0;
    let lastHeight = 0;

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (!width || !height) return;

      // 크기가 바뀌면 DPR을 다시 잡고 점 구름을 새로 계산한다
      if (width !== lastWidth || height !== lastHeight) {
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        lastWidth = width;
        lastHeight = height;
        scene = null;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      if (!scene) scene = buildScene(width, height);

      const elapsed = (performance.now() - startedAt) / 1000;
      const phase = elapsed % RESCATTER_SEC;

      // 주기가 막 넘어간 순간에 한 번만 임펄스를 준다
      if (phase < 0.05 && scene.lastPhase > 1 && !reduceMotion) {
        for (const p of scene.particles) {
          const angle = Math.random() * 6.28;
          const force = 2.2 + Math.random() * 3.4;
          p.vx += Math.cos(angle) * force;
          p.vy += Math.sin(angle) * force;
        }
      }
      scene.lastPhase = phase;

      for (const p of scene.particles) {
        const wobbleX = reduceMotion ? 0 : Math.cos(elapsed * 0.5 * p.sp + p.ph) * 2.6;
        const wobbleY = reduceMotion ? 0 : Math.sin(elapsed * 0.42 * p.sp + p.ph) * 3.2;
        const targetX = p.tx + wobbleX;
        const targetY = p.ty + wobbleY;

        p.vx = (p.vx + (targetX - p.x) * PULL) * DAMPING;
        p.vy = (p.vy + (targetY - p.y) * PULL) * DAMPING;
        p.x += p.vx;
        p.y += p.vy;

        // 목표에 가까울수록 진해진다
        const settle = Math.min(1, 1 - Math.hypot(p.x - targetX, p.y - targetY) / 120);
        ctx.fillStyle = p.accent
          ? `rgba(26,106,74,${0.25 + 0.5 * settle})`
          : `rgba(21,20,18,${0.08 + 0.22 * settle})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, 7);
        ctx.fill();
      }
    };

    const timer = window.setInterval(draw, FRAME_MS);
    return () => window.clearInterval(timer);
  }, []);

  // 좁은 화면에서는 글리프가 문구와 겹쳐 가독성을 해치므로 데스크톱에서만 노출한다
  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full dt:block"
    />
  );
}
