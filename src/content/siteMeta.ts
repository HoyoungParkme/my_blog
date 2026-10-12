/**
 * 사이트 메타 정보
 *
 * 파일 경로: src/content/siteMeta.ts
 * 목적: 페이지 제목·설명·주소처럼 탭 제목과 검색엔진·링크 미리보기에 쓰이는 값을 한곳에 모은다.
 *       앱(탭 제목)과 빌드 단계(라우트별 HTML의 meta 태그)가 같은 값을 쓴다.
 * 주요 기능: 사이트 주소·이름, 기본 제목·설명, 페이지 제목 조합
 * 주요 의존성: 없음. 빌드 설정(scripts/routeHtmlPlugin.ts)에서도 불러오므로 브라우저 전용 API를 쓰지 않는다.
 */

export const SITE_URL = "https://hoyoungpark.com";
export const SITE_NAME = "박호영";

/** 첫 화면(About) 제목. 다른 페이지는 `페이지 이름 | 박호영` 형식이다. */
export const DEFAULT_TITLE = "박호영 | AI Agent 개발자";
export const DEFAULT_DESCRIPTION =
  "AI Agent 개발자 박호영의 포트폴리오와 기술 블로그. LLM / Agent / RAG 시스템 설계와 운영 사례를 정리합니다.";

export const PROJECTS_DESCRIPTION =
  "박호영이 참여한 AI Agent·RAG·백엔드·BI 프로젝트를 최신순으로 정리했습니다.";
export const CONTESTS_DESCRIPTION = "박호영이 출전한 AI·데이터 대회의 출품작을 정리했습니다.";
export const BLOG_DESCRIPTION =
  "박호영이 개발하며 겪은 문제와 해결 과정을 정리한 트러블슈팅 기록입니다.";

export const NOT_FOUND_NAME = "페이지를 찾을 수 없습니다";

/**
 * 페이지 이름으로 탭 제목을 만든다.
 *
 * Args:
 *   name: 페이지 이름. 생략하면 첫 화면 제목을 돌려준다.
 * Returns:
 *   `페이지 이름 | 박호영` 형식의 제목
 */
export function pageTitle(name?: string): string {
  return name ? `${name} | ${SITE_NAME}` : DEFAULT_TITLE;
}
