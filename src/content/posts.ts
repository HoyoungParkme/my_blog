/**
 * 글 콘텐츠 로더
 *
 * 파일 경로: src/content/posts.ts
 * 목적: src/content/posts/*.md 를 빌드 타임에 읽어 프런트매터를 파싱하고, 글 목록·상세에 쓰이는 형태로 제공한다.
 *       이 블로그는 트러블슈팅 글만 다루므로 글 유형 분류를 두지 않는다.
 * 주요 기능: 마크다운 로드, 프런트매터 파싱, 읽는 시간 계산, slug 조회, 이전/다음 탐색
 * 주요 의존성: Vite의 import.meta.glob
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

export interface Post {
  slug: string;
  title: string;
  /** 표시용 날짜. `YYYY.MM.DD` */
  date: string;
  /** 정렬용 원본 날짜. `YYYY-MM-DD` */
  rawDate: string;
  tags: string[];
  summary: string;
  /** 목록과 상세 상단에 노출되는 핵심 한 줄 */
  takeaway: string;
  /** 프런트매터를 제외한 마크다운 본문 */
  body: string;
  /** 본문 길이로 계산한 읽는 시간(분) */
  readMin: number;
}

/** 프런트매터 한 줄의 값. 배열 표기 `[a, b]`면 문자열 배열로 파싱된다. */
type FrontmatterValue = string | string[];

const RAW_POSTS = import.meta.glob("./posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

/** 한국어 기준 분당 읽는 글자 수. 읽는 시간 계산에만 쓰인다. */
const CHARS_PER_MINUTE = 500;

/**
 * 마크다운 원문에서 프런트매터와 본문을 분리한다.
 *
 * Args:
 *   raw: `---`로 감싼 프런트매터가 앞에 붙은 마크다운 원문
 * Returns:
 *   파싱된 프런트매터 맵과 본문 문자열
 */
function parseFrontmatter(raw: string): {
  data: Record<string, FrontmatterValue>;
  body: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };

  const [, block, body] = match;
  const data: Record<string, FrontmatterValue> = {};

  for (const line of block.split(/\r?\n/)) {
    // 값에 콜론이 들어갈 수 있으므로 첫 번째 콜론에서만 자른다
    const separator = line.indexOf(":");
    if (separator === -1) continue;

    const key = line.slice(0, separator).trim();
    const rawValue = line.slice(separator + 1).trim();
    if (!key || !rawValue) continue;

    data[key] = rawValue.startsWith("[") ? parseList(rawValue) : unquote(rawValue);
  }

  return { data, body: body.trim() };
}

/** `[a, b, c]` 형태의 값을 문자열 배열로 바꾼다. */
function parseList(value: string): string[] {
  return value
    .replace(/^\[|\]$/g, "")
    .split(",")
    .map((item) => unquote(item.trim()))
    .filter(Boolean);
}

/** 값을 감싼 따옴표를 제거한다. */
function unquote(value: string): string {
  return value.replace(/^["']|["']$/g, "");
}

/** 마크다운 문법 기호를 걷어낸 글자 수로 읽는 시간을 계산한다. 최소 1분. */
function calcReadMin(body: string): number {
  const plain = body.replace(/[#>*`\-\[\]()]/g, "");
  return Math.max(1, Math.ceil(plain.length / CHARS_PER_MINUTE));
}

/** `./posts/2026-03-01-websocket-issue.md` → `websocket-issue` */
function toSlug(path: string): string {
  const filename = path.split("/").pop() ?? "";
  return filename.replace(/\.md$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

function toPost(path: string, raw: string): Post {
  const { data, body } = parseFrontmatter(raw);
  const rawDate = String(data.date ?? "");

  return {
    slug: toSlug(path),
    title: String(data.title ?? ""),
    date: rawDate.replace(/-/g, "."),
    rawDate,
    tags: Array.isArray(data.tags) ? data.tags : [],
    summary: String(data.summary ?? ""),
    takeaway: String(data.takeaway ?? ""),
    body,
    readMin: calcReadMin(body),
  };
}

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
