/**
 * 마크다운 렌더러
 *
 * 파일 경로: src/components/common/Markdown.tsx
 * 목적: 글 본문 마크다운을 본문 시트 스타일로 렌더링한다.
 * 주요 기능: h2에 목차 앵커 id(sec-N) 부여. 나머지 요소 스타일은 index.css의 .post-body가 담당한다.
 * 주요 의존성: react-markdown, remark-gfm
 */

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Markdown({ body }: { body: string }) {
  // 문서 순서대로 sec-0, sec-1... 을 붙인다. extractHeadings()가 만드는 목차와 순서가 같다.
  let headingIndex = 0;

  return (
    <div className="post-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2
              id={`sec-${headingIndex++}`}
              className="mb-3 mt-8 text-[21px] font-bold tracking-snug text-ink first:mt-0"
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-2 mt-6 text-[18px] font-bold tracking-tight text-ink">
              {children}
            </h3>
          ),
        }}
      >
        {body}
      </ReactMarkdown>
    </div>
  );
}
