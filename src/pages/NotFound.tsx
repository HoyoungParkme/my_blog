/**
 * 404 화면
 *
 * 파일 경로: src/pages/NotFound.tsx
 * 목적: 존재하지 않는 경로나 slug로 접근했을 때 보여주는 안내 화면.
 */

import { Link } from "wouter";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-page px-5 pb-24 pt-[72px] dt:px-12">
      <div className="text-sm font-semibold tracking-overline-wide text-accent">404</div>
      <h1 className="mt-2.5 text-[38px] font-bold tracking-tightest">
        페이지를 찾을 수 없습니다
      </h1>
      <p className="mt-4 text-[17px] text-ink-muted">
        주소가 바뀌었거나 삭제된 페이지입니다.
      </p>
      <div className="mt-6 flex flex-wrap gap-2 text-sm font-semibold">
        <Link href="/" className="rounded border border-ink px-4 py-2">
          홈으로
        </Link>
        <Link href="/projects" className="rounded border border-ink px-4 py-2">
          Projects
        </Link>
        <Link href="/blog" className="rounded border border-ink px-4 py-2">
          Blog
        </Link>
      </div>
    </section>
  );
}
