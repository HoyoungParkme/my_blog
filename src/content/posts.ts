/**
 * 글 콘텐츠 로더
 *
 * 파일 경로: src/content/posts.ts
 * 목적: src/content/posts/*.md 를 빌드 타임에 읽어 프런트매터를 파싱하고, 글 목록·상세에 쓰이는 형태로 제공한다.
 *       이 블로그는 트러블슈팅 글만 다루므로 글 유형 분류를 두지 않는다.
 * 주요 기능: 마크다운 로드, 프런트매터 파싱, 읽는 시간 계산, slug 조회, 이전/다음 탐색
 * 주요 의존성: Vite의 import.meta.glob, ./postParser(원문 → 글 객체 변환)
 *
 * 새 글 추가 방법:
 *   src/content/posts/YYYY-MM-DD-<slug>.md 파일을 만들고 아래 프런트매터를 채운다.
 *   ---
 *   title: 글 제목
 *   date: 2026-03-01
 *   tags: [WebSocket, Debugging]
 *   summary: 목록과 상세 상단에 쓰이는 한 줄 요약
 *   takeaway: 핵심 한 줄
 *   ---
 */

import { toPost, type Post } from "./postParser";

export type { Post };

const RAW_POSTS = import.meta.glob("./posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

/** 최신순으로 정렬된 전체 글. */
export const posts: Post[] = Object.entries(RAW_POSTS)
  .map(([path, raw]) => toPost(path, raw))
  .sort((a, b) => b.rawDate.localeCompare(a.rawDate));

/** slug로 글 하나를 찾는다. 없으면 undefined. */
export function findPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

/**
 * 상세 페이지의 이전/다음 글을 찾는다.
 * 목록이 최신순이므로 "이전 글"은 배열 뒤쪽(더 오래된 글)이다.
 */
export function findPostNeighbors(slug: string): { prev?: Post; next?: Post } {
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return {};
  return { prev: posts[index + 1], next: posts[index - 1] };
}

/** 본문에서 h2 제목만 순서대로 뽑는다. 상세 페이지 목차에 쓰인다. */
export function extractHeadings(body: string): string[] {
  return [...body.matchAll(/^##\s+(.+)$/gm)].map((match) => match[1].trim());
}
