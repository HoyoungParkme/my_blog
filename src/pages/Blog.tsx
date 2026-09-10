/**
 * Blog 화면
 *
 * 파일 경로: src/pages/Blog.tsx
 * 목적: 글을 유형별로 묶어 보여주는 목록 화면.
 * 주요 기능: 유형별 섹션 분류, 섹션 헤딩의 글 개수
 * 주요 의존성: src/content/posts.ts, src/content/taxonomy.ts
 */

import { Link } from "wouter";

import { ListPageLayout, ListSection } from "@/components/common/ListPageLayout";
import { POST_TYPES, posts, type Post } from "@/content/posts";

export default function Blog() {
  // 글이 없는 유형은 섹션과 사이드바 양쪽에서 모두 감춘다
  const groups = POST_TYPES.map((type, index) => ({
    id: `type-${index}`,
    label: type,
    posts: posts.filter((post) => post.type === type),
  })).filter((group) => group.posts.length > 0);

  return (
    <ListPageLayout title="Blog">
      {groups.map((group) => (
        <ListSection
          key={group.id}
          id={group.id}
          title={group.label}
          count={group.posts.length}
        >
          <div className="flex flex-col">
            {group.posts.map((post) => (
              <PostRow key={post.slug} post={post} />
            ))}
          </div>
        </ListSection>
      ))}
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
