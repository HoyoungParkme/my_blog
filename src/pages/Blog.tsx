/**
 * 트러블슈팅 목록 화면
 *
 * 파일 경로: src/pages/Blog.tsx
 * 목적: 겪은 문제와 해결 기록을 최신순으로 보여준다.
 * 주요 의존성: src/content/posts.ts
 *
 * 이 블로그는 트러블슈팅만 다루므로 유형별 섹션을 두지 않는다.
 */

import { Link } from "wouter";

import { ListPageLayout } from "@/components/common/ListPageLayout";
import { posts, type Post } from "@/content/posts";

export default function Blog() {
  return (
    <ListPageLayout title="트러블슈팅">
      <div className="flex flex-col border-t border-ink">
        {posts.map((post) => (
          <PostRow key={post.slug} post={post} />
        ))}
      </div>
    </ListPageLayout>
  );
}

function PostRow({ post }: { post: Post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="grid grid-cols-1 items-start gap-1.5 border-b border-rule py-5 dt:grid-cols-[104px_minmax(0,1fr)_auto] dt:gap-6"
    >
      <span className="pt-[3px] text-sm text-ink-faint">{post.date}</span>
      <div>
        <div className="text-lg font-bold leading-[1.4] tracking-tight">{post.title}</div>
        <div className="mt-1.5 text-[15px] text-ink-muted [text-wrap:pretty]">
          {post.takeaway}
        </div>
      </div>
      <div className="whitespace-nowrap pt-[3px] text-[13px] text-ink-faint dt:text-right">
        <div>{post.readMin}분</div>
      </div>
    </Link>
  );
}
