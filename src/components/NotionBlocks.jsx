import React from "react";

// 노션 스타일의 헤딩 컴포넌트
export function Heading1({ children }) {
  return (
    <h1 className="text-4xl font-bold my-6 text-gray-900 not-prose">
      {children}
    </h1>
  );
}

export function Heading2({ children }) {
  return (
    <h2 className="text-3xl font-bold my-5 text-gray-900 not-prose">
      {children}
    </h2>
  );
}

export function Heading3({ children }) {
  return (
    <h3 className="text-2xl font-semibold my-4 text-gray-900 not-prose">
      {children}
    </h3>
  );
}

// 문단 컴포넌트
export function Paragraph({ children }) {
  return (
    <p className="text-gray-700 my-3 leading-7 text-base not-prose">
      {children}
    </p>
  );
}

// 리스트 컴포넌트
export function BulletedList({ items }) {
  return (
    <ul className="list-disc list-inside my-4 space-y-2 text-gray-700 pl-6 not-prose">
      {items.map((item, idx) => (
        <li key={idx} className="leading-7">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function NumberedList({ items }) {
  return (
    <ol className="list-decimal list-inside my-4 space-y-2 text-gray-700 pl-6 not-prose">
      {items.map((item, idx) => (
        <li key={idx} className="leading-7">
          {item}
        </li>
      ))}
    </ol>
  );
}

// 코드 블록 컴포넌트
export function CodeBlock({ code, language }) {
  return (
    <div className="my-4 not-prose">
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
        <code className={`language-${language || "text"}`}>{code}</code>
      </pre>
    </div>
  );
}

// 인라인 코드 컴포넌트
export function InlineCode({ children }) {
  return (
    <code className="bg-gray-200 text-red-600 px-1.5 py-0.5 rounded text-sm font-mono not-prose">
      {children}
    </code>
  );
}

// 이미지 컴포넌트
export function ImageBlock({ src, alt, caption }) {
  return (
    <figure className="my-6 not-prose">
      <img src={src} alt={alt || ""} className="w-full rounded-lg shadow-md" />
      {caption && (
        <figcaption className="text-center text-sm text-gray-500 mt-2">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// 구분선 컴포넌트
export function Divider() {
  return <hr className="my-8 border-gray-300 not-prose" />;
}

// 인용구 컴포넌트
export function Quote({ children }) {
  return (
    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 italic text-gray-600 bg-gray-50 rounded-r not-prose">
      {children}
    </blockquote>
  );
}

// 테이블 컴포넌트
export function Table({ headers, rows }) {
  return (
    <div className="my-6 overflow-x-auto not-prose">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((header, idx) => (
              <th
                key={idx}
                className="border border-gray-300 px-4 py-2 text-left font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-gray-50">
              {row.map((cell, cellIdx) => (
                <td
                  key={cellIdx}
                  className="border border-gray-300 px-4 py-2 text-gray-700"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 텍스트 강조 컴포넌트
export function Bold({ children }) {
  return (
    <strong className="font-semibold text-gray-900 not-prose">
      {children}
    </strong>
  );
}

export function Italic({ children }) {
  return <em className="italic not-prose">{children}</em>;
}

// 콜아웃 박스 (노션의 Callout)
export function Callout({ icon, children, type = "info" }) {
  const bgColors = {
    info: "bg-blue-50 border-blue-200",
    warning: "bg-yellow-50 border-yellow-200",
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
  };

  return (
    <div
      className={`border-l-4 p-4 my-4 rounded-r ${bgColors[type]} not-prose`}
    >
      <div className="flex items-start gap-3">
        {icon && <span className="text-xl">{icon}</span>}
        <div className="text-gray-700">{children}</div>
      </div>
    </div>
  );
}
