/**
 * 글 마크다운 파서
 *
 * 파일 경로: src/content/postParser.ts
 * 목적: 마크다운 원문 하나를 글 객체로 바꾼다. 앱(posts.ts)과 빌드 단계(라우트별 HTML 생성)가 같은 함수를 써서
 *       slug와 제목이 어긋나지 않게 한다.
 * 주요 기능: 프런트매터 파싱, 읽는 시간 계산, 파일 경로 → slug
 * 주요 의존성: 없음. Vite 전용 API(import.meta.glob)를 쓰지 않아야 빌드 설정에서도 불러올 수 있다.
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

/**
 * 마크다운 원문 하나를 글 객체로 바꾼다.
 *
 * Args:
 *   path: 파일 경로. 파일 이름 앞의 날짜를 뗀 부분이 slug가 된다.
 *   raw: 프런트매터가 붙은 마크다운 원문
 * Returns:
 *   목록·상세에서 쓰는 글 객체
 */
export function toPost(path: string, raw: string): Post {
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
