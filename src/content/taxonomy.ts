/**
 * 태그 집계
 *
 * 파일 경로: src/content/taxonomy.ts
 * 목적: 프로젝트와 글에 붙은 태그를 모아 사이드바·태그 페이지에서 쓸 수 있는 형태로 집계한다.
 * 주요 기능: 태그별 개수 집계, 태그로 프로젝트·글 조회
 * 주요 의존성: src/content/projects.ts, src/content/posts.ts
 */

import { posts, type Post } from "./posts";
import { projects, type Project } from "./projects";

export interface TagSummary {
  name: string;
  /** 이 태그가 붙은 프로젝트와 글의 합계 */
  count: number;
}

/** 태그가 붙은 항목 목록을 받아 개수 많은 순으로 집계한다. */
function countTags(items: { tags: string[] }[]): TagSummary[] {
  const counts = new Map<string, number>();
  for (const item of items) {
    for (const tag of item.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

/** 프로젝트와 글 전체의 태그 집계. 태그 페이지 하단 "다른 태그"에 쓰인다. */
export const allTags: TagSummary[] = countTags([...projects, ...posts]);

/** 프로젝트 태그만 집계. Projects 사이드바의 "기술" 목록. */
export const projectTags: TagSummary[] = countTags(projects);

/** 글 태그만 집계. Blog 사이드바의 "태그" 목록. */
export const postTags: TagSummary[] = countTags(posts);

/** 특정 태그가 붙은 프로젝트와 글을 함께 찾는다. */
export function findByTag(tag: string): { projects: Project[]; posts: Post[] } {
  return {
    projects: projects.filter((project) => project.tags.includes(tag)),
    posts: posts.filter((post) => post.tags.includes(tag)),
  };
}
