/**
 * 목록 페이지 레이아웃
 *
 * 파일 경로: src/components/common/ListPageLayout.tsx
 * 목적: Projects와 Blog가 공유하는 "좌측 사이드바 + 우측 본문" 구조를 제공한다.
 * 주요 기능: sticky 사이드바, 섹션 점프 내비, 태그 목록
 * 주요 의존성: TagPill, src/content/taxonomy.ts
 */

import type { ReactNode } from "react";

import { TagLink } from "@/components/common/TagPill";
import type { TagSummary } from "@/content/taxonomy";

/** 사이드바 섹션 내비의 한 줄. id는 본문 섹션의 앵커와 같아야 한다. */
export interface SectionLink {
  id: string;
  label: string;
  count: number;
}

interface ListPageLayoutProps {
  title: string;
  sections: SectionLink[];
  /** 태그 목록 위에 붙는 라벨. 예: "기술", "태그" */
  tagLabel: string;
  tags: TagSummary[];
  children: ReactNode;
}

export function ListPageLayout({
  title,
  sections,
  tagLabel,
  tags,
  children,
}: ListPageLayoutProps) {
  return (
    <div className="mx-auto grid max-w-listing grid-cols-1 items-start gap-10 px-5 pb-24 pt-16 dt:grid-cols-[200px_minmax(0,1fr)] dt:gap-14 dt:px-12">
      <aside className="dt:sticky dt:top-24">
        <h1 className="text-[28px] font-bold tracking-tightest">{title}</h1>

        <nav className="mt-6 flex flex-col border-t border-ink text-sm">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="flex justify-between border-b border-rule py-[9px] font-medium"
            >
              <span>{section.label}</span>
              <span className="text-ink-faint">{section.count}</span>
            </a>
          ))}
        </nav>

        <div className="mt-6">
          <div className="mb-2 text-[11px] font-semibold tracking-overline text-ink-faint">
            {tagLabel}
          </div>
          <div className="flex flex-wrap gap-[5px] text-xs">
            {tags.map((tag) => (
              <TagLink key={tag.name} name={tag.name} className="px-[9px] py-0.5" />
            ))}
          </div>
        </div>
      </aside>

      <div>{children}</div>
    </div>
  );
}

/** 본문의 한 섹션. 사이드바 내비가 이 id로 점프한다. */
export function ListSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mb-14">
      <div className="border-b border-ink pb-3.5">
        <h2 className="text-[22px] font-bold tracking-tighter">{title}</h2>
      </div>
      {children}
    </section>
  );
}
