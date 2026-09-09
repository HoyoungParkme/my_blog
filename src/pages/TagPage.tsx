/**
 * 태그 화면
 *
 * 파일 경로: src/pages/TagPage.tsx
 * 목적: 하나의 태그가 붙은 프로젝트와 글을 한 화면에 모아 보여준다.
 * 주요 기능: 태그별 프로젝트 카드, 글 목록, 다른 태그 이동
 * 주요 의존성: src/content/taxonomy.ts
 */

import { Link } from "wouter";

import { allTags, findByTag } from "@/content/taxonomy";

export default function TagPage({ params }: { params: { tag: string } }) {
  const tag = decodeURIComponent(params.tag);
  const { projects, posts } = findByTag(tag);

  return (
    <section className="mx-auto max-w-page px-5 pb-24 pt-[72px] dt:px-12">
      <div className="text-sm text-ink-faint">태그</div>
      <h1 className="mt-1.5 text-[38px] font-bold tracking-tightest">#{tag}</h1>
      <p className="mb-10 mt-2 text-base text-ink-muted">
        프로젝트 {projects.length} · 글 {posts.length}
      </p>

      {projects.length > 0 && (
        <>
          <div className="mb-3.5 text-xs font-semibold tracking-overline-wide text-accent">
            PROJECTS
          </div>
          <div className="mb-14 grid grid-cols-1 gap-5 dt:grid-cols-3">
            {projects.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="block rounded-md border border-rule bg-sheet p-6 hover:border-ink"
              >
                <div className="text-lg font-bold tracking-tight">{project.title}</div>
                <div className="mt-1.5 text-sm text-ink-faint">
                  {project.year} · {project.tags.join(" · ")}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      {posts.length > 0 && (
        <>
          <div className="mb-1.5 text-xs font-semibold tracking-overline-wide text-ink-faint">
            POSTS
          </div>
          <div className="flex max-w-list flex-col border-b border-rule">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="grid grid-cols-1 gap-1.5 border-t border-rule py-[18px] dt:grid-cols-[120px_1fr] dt:gap-6"
              >
                <span className="text-[15px] text-ink-faint">{post.date}</span>
                <span className="text-[17px] font-semibold">{post.title}</span>
              </Link>
            ))}
          </div>
        </>
      )}

      <div className="mt-12">
        <div className="mb-3 text-xs font-semibold tracking-overline text-ink-faint">
          다른 태그
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          {allTags
            .filter((item) => item.name !== tag)
            .map((item) => (
              <Link
                key={item.name}
                href={`/tags/${encodeURIComponent(item.name)}`}
                className="rounded-full border border-rule-tag px-3 py-1 font-medium"
              >
                {item.name} <span className="text-ink-faint">{item.count}</span>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
