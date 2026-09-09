/**
 * Vite 설정
 *
 * 파일 경로: vite.config.ts
 * 목적: React 빌드 설정과 GitHub Pages 배포용 base path를 정의한다.
 * 주요 기능: @ 경로 별칭, 저장소 이름 기반 base path 자동 설정
 */

import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  // 커스텀 도메인(hoyoungpark.com)을 쓰므로 사이트가 루트에 배포된다.
  // 저장소 하위 경로(github.io/my_blog/)로 되돌릴 경우에만 base를 바꾸면 된다.
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
    },
  },
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    port: 5000,
  },
});
