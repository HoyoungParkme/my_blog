/**
 * 인쇄용 문서 공통 조각
 *
 * 파일 경로: src/components/common/PrintParts.tsx
 * 목적: 경력기술서(/resume)와 이력서(/cv)처럼 A4로 인쇄하는 화면이 같은 모양의 섹션·목록을 쓰게 한다.
 * 주요 기능: 섹션 제목, 점 목록, 이력 한 줄 목록, 사이트 상세 링크, 재직 기간 계산
 * 주요 의존성: src/content/profile.ts(HistoryEntry), src/content/siteMeta.ts(SITE_URL)
 */

import type { ReactNode } from "react";

import type { HistoryEntry } from "@/content/profile";
import { SITE_URL } from "@/content/siteMeta";

/** 섹션 제목(밑줄)과 내용. 제목만 쪽 끝에 남지 않게 한다. note는 제목 오른쪽의 작은 안내. */
export function PrintSection({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <section className="mt-4">
      <h2 className="mb-2 flex items-baseline justify-between break-after-avoid border-b border-rule pb-1 text-[15px] font-bold text-ink">
        {title}
        {note && <span className="text-[11px] font-normal text-ink-faint">{note}</span>}
      </h2>
      {children}
    </section>
  );
}

/** 사이트 상세로 가는 링크. PDF에서도 눌린다. */
export function SiteLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={`${SITE_URL}${href}`} className="text-ink hover:text-accent">
      {children}
    </a>
  );
}

/** 작은 점이 붙은 목록 */
export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-0.5">
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-3 before:absolute before:left-0.5 before:top-[0.7em] before:h-1 before:w-1 before:rounded-full before:bg-ink-faint before:content-['']"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

/** 대회·자격증·학력·교육 한 줄씩. 사이트 상세가 있는 항목(대회 출품작)은 이름이 링크가 된다. */
export function HistoryLines({ entries }: { entries: HistoryEntry[] }) {
  return (
    <ul className="flex flex-col gap-1 text-[12px]">
      {entries.map((entry) => (
        <li key={entry.name} className="grid grid-cols-[104px_minmax(0,1fr)] gap-x-2">
          <span className="whitespace-nowrap tabular-nums text-ink-faint">{entry.term}</span>
          <span>
            <span className="font-semibold text-ink">
              {entry.href ? <SiteLink href={entry.href}>{entry.name}</SiteLink> : entry.name}
            </span>
            {entry.detail && <span className="text-ink-muted"> · {entry.detail}</span>}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * 재직 기간을 "n년 m개월"로 만든다. 인쇄하는 날 기준이라 PDF를 다시 만들면 따라 늘어난다.
 *
 * Args:
 *   term: 경력 기간 (`YYYY.MM – 현재` 형식). 앞의 시작 연월만 쓴다.
 * Returns:
 *   예: "2년 4개월"
 */
export function careerLength(term: string): string {
  const [year, month] = term.split(" ")[0].split(".").map(Number);
  const today = new Date();
  const months = (today.getFullYear() - year) * 12 + (today.getMonth() + 1 - month);
  return `${Math.floor(months / 12)}년 ${months % 12}개월`;
}
