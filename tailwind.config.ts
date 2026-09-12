/**
 * Tailwind 설정
 *
 * 파일 경로: tailwind.config.ts
 * 목적: 디자인 핸드오프의 색상·자간·폭 토큰을 Tailwind 유틸리티로 노출한다.
 * 주요 기능: 색상 팔레트, 컨테이너 최대 폭(1184px), 자간 스케일, 모노스페이스 서체
 */

import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        // 디자인 핸드오프의 1000px 분기. 1000px 이하가 모바일이므로 데스크톱은 1001px부터.
        dt: "1001px",
      },
      colors: {
        paper: "var(--paper)",
        sheet: "var(--sheet)",
        badge: "var(--badge)",
        "code-tint": "var(--code-tint)",
        ink: {
          DEFAULT: "var(--ink)",
          body: "var(--ink-body)",
          muted: "var(--ink-muted)",
          faint: "var(--ink-faint)",
        },
        accent: "var(--accent)",
        rule: {
          DEFAULT: "var(--rule)",
          rail: "var(--rule-rail)",
        },
        "brand-sub": "var(--brand-sub)",
      },
      fontFamily: {
        sans: ["Pretendard", "-apple-system", "'Apple SD Gothic Neo'", "sans-serif"],
        mono: ["ui-monospace", "Menlo", "monospace"],
      },
      letterSpacing: {
        // 제목용 음수 자간
        tightest: "-.03em",
        tighter: "-.025em",
        tight: "-.02em",
        snug: "-.015em",
        // 오버라인 라벨용 양수 자간
        overline: ".1em",
        "overline-wide": ".12em",
      },
      maxWidth: {
        page: "1184px", // Tag 페이지 컨테이너
        about: "1120px", // About 페이지 컨테이너
        listing: "1000px", // Projects·Blog 목록 컨테이너
      },
      spacing: {
        rail: "240px", // 좌측 고정 레일 폭
      },
    },
  },
  plugins: [],
} satisfies Config;
