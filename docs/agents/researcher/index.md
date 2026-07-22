# 현재 작업

없음

## R-01: 포트폴리오 블로그 코드베이스 전체 파악 (완료)
- 요청일: 2026-06-16
- 상태: 완료 → docs/agents/researcher/01_codebase-overview.md
- 목적: 기존 개인 포트폴리오/블로그 프로젝트의 구조, 기술 스택, 라우팅, 데이터 흐름, 배포 방식을 파악해 PM이 향후 작업 계획을 세울 기반 마련
- 조사 범위:
  1. 프론트 라우팅/페이지 구조 (src/app, src/pages, src/components/layout)
  2. 콘텐츠/데이터 소스 (src/content/portfolio.ts 외 데이터 주입 방식)
  3. package.json의 백엔드 의존성(express, passport, drizzle, pg)이 실제 사용되는지 여부 — server 코드 존재 확인
  4. 빌드/배포 설정 (vite.config.ts, index.html, public/)
  5. 외부 의존(Notion 링크, Unsplash 이미지) 연동 방식

# 완료된 작업

| # | 내용 | 날짜 | 결과 |
|:--|:--|:--|:--|
