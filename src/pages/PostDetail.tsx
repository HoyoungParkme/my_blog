/**
 * 글 상세 화면
 *
 * 파일 경로: src/pages/PostDetail.tsx
 * 목적: 마크다운으로 작성된 글 한 편을 본문 시트와 사이드바 구조로 보여준다.
 * 주요 기능: 핵심 한 줄 카드, 마크다운 본문, 메타/태그/목차/이전·다음 사이드바
 * 주요 의존성: src/content/posts.ts
 */

import { Link } from "wouter";

import { DetailLayout, SidebarBlock } from "@/components/common/DetailLayout";
import { Markdown } from "@/components/common/Markdown";
import { TagLink } from "@/components/common/TagPill";
import { extractHeadings, findPost, findPostNeighbors, type Post } from "@/content/posts";
import NotFound from "@/pages/NotFound";

export default function PostDetail({ params }: { params: { slug: string } }) {
  const post = findPost(params.slug);
  if (!post) return <NotFound />;

  const { prev, next } = findPostNeighbors(post.slug);

  return (
    <DetailLayout sidebar={<Sidebar post={post} prev={prev} next={next} />}>
      <div className="text-[13px] font-semibold tracking-overline text-accent">
        {post.type}
      </div>
      <h1 className="mt-2.5 text-[32px] font-bold leading-[1.25] tracking-tighter [text-wrap:balance]">
        {post.title}
      </h1>
      <p className="mt-2.5 text-[17px] text-ink-muted [text-wrap:pretty]">{post.summary}</p>

      <div className="mb-9 mt-7 rounded-md border border-rule bg-paper px-7 py-6">
        <div className="text-xs font-semibold tracking-overline-wide text-ink-faint">
          핵심 한 줄
        </div>
        <div className="mt-1.5 text-[17px] leading-[1.6] [text-wrap:pretty]">
          {post.takeaway}
        </div>
      </div>

      <Markdown body={post.body} />
    </DetailLayout>
  );
}

function Sidebar({ post, prev, next }: { post: Post; prev?: Post; next?: Post }) {
  const headings = extractHeadings(post.body);

  return (
    <>
      <SidebarBlock>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2.5">
          <dt className="text-ink-faint">작성일</dt>
          <dd>{post.date}</dd>
          <dt className="text-ink-faint">분량</dt>
          <dd>{post.readMin}분</dd>
          <dt className="text-ink-faint">유형</dt>
          <dd>{post.type}</dd>
        </dl>
      </SidebarBlock>

      <SidebarBlock label="태그">
        <div className="flex flex-wrap gap-1.5 text-[13px]">
          {post.tags.map((tag) => (
            <TagLink key={tag} name={tag} className="px-2.5 py-[3px]" />
          ))}
        </div>
      </SidebarBlock>


      {headings.length > 0 && (
        <SidebarBlock label="목차">
          <div className="flex flex-col gap-1.5 text-ink-muted">
            {headings.map((heading, index) => (
              <a key={heading} href={`#sec-${index}`}>
                {heading}
              </a>
            ))}
          </div>
        </SidebarBlock>
      )}

      {prev && (
        <SidebarBlock label="← 이전 글">
          <Link href={`/blog/${prev.slug}`} className="block font-semibold">
            {prev.title}
          </Link>
        </SidebarBlock>
      )}

      {next && (
        <SidebarBlock label="다음 글 →">
          <Link href={`/blog/${next.slug}`} className="block font-semibold">
            {next.title}
          </Link>
        </SidebarBlock>
      )}
    </>
  );
}
