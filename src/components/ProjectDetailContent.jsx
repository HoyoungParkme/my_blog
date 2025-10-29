import {
  Heading1,
  Heading2,
  Heading3,
  Paragraph,
  BulletedList,
  NumberedList,
  CodeBlock,
  InlineCode,
  ImageBlock,
  Divider,
  Quote,
  Table,
  Bold,
  Italic,
  Callout,
} from "./NotionBlocks";

/**
 * 프로젝트 상세 페이지의 컨텐츠 렌더링 컴포넌트
 * "자세히 보기"를 누른 후 표시되는 화면의 내용
 */
export default function ProjectDetailContent({ project }) {
  // 노션 블록 렌더링 함수
  const renderBlock = (block, idx) => {
    switch (block.type) {
      case "heading1":
        return <Heading1 key={idx}>{block.content}</Heading1>;
      case "heading2":
        return <Heading2 key={idx}>{block.content}</Heading2>;
      case "heading3":
        return <Heading3 key={idx}>{block.content}</Heading3>;
      case "paragraph":
        return (
          <Paragraph key={idx}>{renderInlineContent(block.content)}</Paragraph>
        );
      case "bulletedList":
        return (
          <BulletedList
            key={idx}
            items={block.items.map((item) => renderInlineContent(item))}
          />
        );
      case "numberedList":
        return (
          <NumberedList
            key={idx}
            items={block.items.map((item) => renderInlineContent(item))}
          />
        );
      case "code":
        return (
          <CodeBlock key={idx} code={block.code} language={block.language} />
        );
      case "image":
        return (
          <ImageBlock
            key={idx}
            src={block.src}
            alt={block.alt}
            caption={block.caption}
          />
        );
      case "divider":
        return <Divider key={idx} />;
      case "quote":
        return <Quote key={idx}>{renderInlineContent(block.content)}</Quote>;
      case "table":
        return <Table key={idx} headers={block.headers} rows={block.rows} />;
      case "callout":
        return (
          <Callout
            key={idx}
            icon={block.icon}
            type={block.calloutType || "info"}
          >
            {renderInlineContent(block.content)}
          </Callout>
        );
      default:
        return null;
    }
  };

  // 인라인 콘텐츠 렌더링 (bold, italic, code 등)
  const renderInlineContent = (content) => {
    if (typeof content === "string") {
      return content;
    }

    if (Array.isArray(content)) {
      return content.map((item, idx) => {
        if (typeof item === "string") {
          return item;
        }
        if (item.type === "bold") {
          return <Bold key={idx}>{item.text}</Bold>;
        }
        if (item.type === "italic") {
          return <Italic key={idx}>{item.text}</Italic>;
        }
        if (item.type === "code") {
          return <InlineCode key={idx}>{item.text}</InlineCode>;
        }
        return item.text || "";
      });
    }

    return content;
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* 프로젝트 메타 정보 */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
          <div>
            <span className="font-semibold text-gray-700">기간:</span>{" "}
            {project.period}
          </div>
          <div>
            <span className="font-semibold text-gray-700">유형:</span>{" "}
            {project.type}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.stack?.map((tech, i) => (
            <span
              key={i}
              className="bg-blue-600 px-3 py-1 rounded-full text-white text-sm font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 노션 블록 컨텐츠 */}
      {project.blocks && project.blocks.length > 0 ? (
        <div className="prose max-w-none">
          {project.blocks.map((block, idx) => renderBlock(block, idx))}
        </div>
      ) : (
        // 기본 설명만 있는 경우
        <Paragraph>{project.description}</Paragraph>
      )}
    </div>
  );
}
