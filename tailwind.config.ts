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
        // 디자인 핸드오프의 900px 분기. 900px 이하가 모바일이므로 데스크톱은 901px부터.
        dt: "901px",
      },
      colors: {
        paper: "var(--paper)",
        sheet: "var(--sheet)",
        badge: "var(--badge)",
        placeholder: "var(--placeholder)",
        ink: {
          DEFAULT: "var(--ink)",
          body: "var(--ink-body)",
          muted: "var(--ink-muted)",
          faint: "var(--ink-faint)",
        },
        accent: "var(--accent)",
        rule: {
          DEFAULT: "var(--rule)",
          tag: "var(--rule-tag)",
        },
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
        page: "1184px", // 페이지 컨테이너
        sheet: "920px", // 상세 본문 시트
        list: "760px", // 태그 페이지 글 목록
      },
    },
  },
  plugins: [],
} satisfies Config;
