# PM-01: 포트폴리오 블로그 코드베이스 파악

- 스프린트: 1
- 날짜: 2026-06-16

## 작업 로그

| 시점 | 행동 | 내용 |
|:--|:--|:--|
| 2026-06-16 | [분석 시작] | 유저 요청: "개인 포트폴리오를 블로그 형태로 만든 곳. 파악해줘" |
| 2026-06-16 | [PM 직접] | package.json, portfolio.ts, 디렉토리 구조 1차 오리엔테이션 |
| 2026-06-16 | [위임→researcher] | R-01: 전체 구조/라우팅/데이터흐름/배포/미사용 의존성 조사 |
| 2026-06-16 | [완료←researcher] | 서버리스 SPA 확인 + 개선점 5건/기술부채 4건 발견 |

## 파악 결과 (요약)

### 프로젝트 정체
박호영(AI 서비스 개발자, 디포커스 선임)의 **개인 포트폴리오 + 트러블슈팅 블로그**.
순수 클라이언트 사이드 SPA. 서버/DB 없음.

### 기술 스택
- React 18 + Vite 7 + TypeScript 5.6
- 라우팅: wouter / UI: Tailwind + shadcn/ui(radix) / 애니메이션: framer-motion
- 배포: GitHub Actions → GitHub Pages (gh-pages 브랜치, SPA 404 fallback)

### 데이터 흐름
- 유일한 데이터 소스: `src/content/portfolio.ts` (프로젝트 6건, 포스트 3건, 프로필/경력/학력/자격증)
- 콘텐츠 본문은 Notion 공개 **iframe embed**로 표시 (Notion API 미사용)
- 프로젝트 썸네일은 전부 Unsplash 외부 URL, 프로필 사진만 로컬 asset

### 라우팅
| 경로 | 페이지 |
|:--|:--|
| `/` | Home |
| `/projects` | Projects |
| `/blog` | Blog (Troubleshooting) |
| `/blog/:slug` | PostDetail |
| * | NotFound |

## 발견된 이슈 / 백로그 후보

| # | 분류 | 내용 | 심각도 |
|:--|:--|:--|:--|
| B-1 | 기술부채 | 미사용 백엔드 의존성(express, passport, drizzle, pg, ws 등 ~10개) — Replit 템플릿 잔재. 제거 권장 | 낮 |
| B-2 | 불일치 | `Contact.tsx` 파일 존재하나 라우터/네비 미등록 → 접근 불가. 등록 or 삭제 결정 필요 | 중 |
| B-3 | dead code | `PostDetail.tsx` — `post.content`가 항상 빈 문자열. 실제 본문은 Blog 모달의 Notion iframe. 역할 재정의 or 삭제 | 중 |
| B-4 | 미연결 | `queryClient.ts`(react-query) 트리에 미연결. 쓸 계획 없으면 삭제 | 낮 |
| B-5 | 성능 | `index.html`에서 Google Fonts 20종+ 로드, 실사용 2종(Inter, Playfair) | 낮 |
| B-6 | UX | `FloatingNav` 스크롤 감지 없이 항상 표시 | 낮 |
| B-7 | 외부 리스크 | 콘텐츠가 Notion embed 의존 → Notion embed 정책 변경 시 뷰어 중단 가능 | 인지 |

## 판단 기록

### 현 단계: 파악만 완료, 작업 미착수
- 결정: 유저가 "파악"만 요청. 구체적 작업(기능 추가/리팩토링/버그수정) 지시 없음.
- 이유: 발견 이슈를 백로그로 정리해두고, 다음 작업 방향은 유저 선택에 맡긴다.
- 대안: 명백한 정리(미사용 의존성 제거 등)를 바로 진행 — 미선택. 유저 의도 확인 우선.
