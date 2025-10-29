// 간단한 frontmatter 파서 (브라우저 호환)
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content };
  }

  const frontmatterText = match[1];
  const markdownContent = match[2];
  const data = {};

  // YAML 형식 파싱 (간단한 버전)
  const lines = frontmatterText.split("\n");
  let currentKey = null;
  let currentArray = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // 배열 항목인지 확인 (indented with -)
    if (line.match(/^\s+-\s+/) && currentKey) {
      if (!Array.isArray(data[currentKey])) {
        data[currentKey] = [];
        currentArray = data[currentKey];
      } else {
        currentArray = data[currentKey];
      }
      currentArray.push(line.replace(/^\s+-\s+/, "").trim());
      continue;
    } else {
      currentArray = null;
    }

    // 키: 값 형식
    const colonIndex = trimmed.indexOf(":");
    if (colonIndex > 0) {
      currentKey = trimmed.substring(0, colonIndex).trim();
      const value = trimmed.substring(colonIndex + 1).trim();

      // 따옴표 제거
      const unquotedValue = value.replace(/^["']|["']$/g, "");

      // 빈 문자열이면 빈 문자열로 저장
      if (value === '""' || value === "''") {
        data[currentKey] = "";
      } else {
        data[currentKey] = unquotedValue;
      }
    }
  }

  return { data, content: markdownContent };
}

// 마크다운을 노션 블록 형식으로 변환
export function parseMarkdownToBlocks(markdown) {
  if (!markdown) return [];

  const lines = markdown.split("\n");
  const blocks = [];
  let currentList = null;
  let currentListItemType = null;
  let currentParagraph = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const content = currentParagraph.join(" ").trim();
      if (content) {
        blocks.push({
          type: "paragraph",
          content: parseInlineContent(content),
        });
      }
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (currentList && currentList.length > 0) {
      blocks.push({
        type:
          currentListItemType === "ordered" ? "numberedList" : "bulletedList",
        items: currentList,
      });
      currentList = null;
      currentListItemType = null;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // 헤딩 (# ## ###)
    if (line.match(/^### /)) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "heading3",
        content: line.substring(4).trim(),
      });
    } else if (line.match(/^## /)) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "heading2",
        content: line.substring(3).trim(),
      });
    } else if (line.match(/^# /)) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "heading1",
        content: line.substring(2).trim(),
      });
    }
    // 코드 블록 (```)
    else if (line.match(/^```/)) {
      flushParagraph();
      flushList();
      const language = line.substring(3).trim();
      let codeLines = [];
      i++;
      while (i < lines.length && !lines[i].trim().match(/^```/)) {
        codeLines.push(lines[i]);
        i++;
      }
      blocks.push({
        type: "code",
        code: codeLines.join("\n"),
        language: language || "text",
      });
    }
    // 구분선 (---)
    else if (line.match(/^---+$/)) {
      flushParagraph();
      flushList();
      blocks.push({ type: "divider" });
    }
    // 인용구 (>) - 이모지가 있으면 callout으로 변환
    else if (line.match(/^> /)) {
      flushParagraph();
      flushList();
      const content = line.substring(2).trim();

      // 이모지 감지 (유니코드 이모지 범위 또는 일반 이모지 패턴)
      const emojiMatch = content.match(/^([^\s]+)\s+(.+)$/);
      const emojiPattern =
        /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u;

      if (emojiMatch && emojiPattern.test(emojiMatch[1])) {
        // 배열 타입 확인 (⚠️는 warning, 💡는 info)
        const icon = emojiMatch[1];
        const calloutContent = emojiMatch[2];
        const calloutType =
          icon.includes("⚠️") || icon.includes("❗")
            ? "warning"
            : icon.includes("✅") || icon.includes("✓")
            ? "success"
            : icon.includes("❌") || icon.includes("✗")
            ? "error"
            : "info";

        blocks.push({
          type: "callout",
          icon: icon,
          calloutType: calloutType,
          content: parseInlineContent(calloutContent),
        });
      } else {
        blocks.push({
          type: "quote",
          content: parseInlineContent(content),
        });
      }
    }
    // 순서 없는 리스트 (- * +)
    else if (line.match(/^[-*+] /)) {
      flushParagraph();
      const item = line.substring(2).trim();
      if (currentListItemType !== "unordered") {
        flushList();
        currentList = [];
        currentListItemType = "unordered";
      }
      currentList.push(parseInlineContent(item));
    }
    // 순서 있는 리스트 (1. 2. 등)
    else if (line.match(/^\d+\. /)) {
      flushParagraph();
      const item = line.replace(/^\d+\. /, "").trim();
      if (currentListItemType !== "ordered") {
        flushList();
        currentList = [];
        currentListItemType = "ordered";
      }
      currentList.push(parseInlineContent(item));
    }
    // 빈 줄
    else if (line === "") {
      flushParagraph();
      flushList();
    }
    // 일반 문단
    else {
      flushList();
      currentParagraph.push(line);
    }
  }

  flushParagraph();
  flushList();

  return blocks;
}

// 인라인 콘텐츠 파싱 (bold, italic, code)
function parseInlineContent(text) {
  // 단순 문자열인 경우 그대로 반환
  if (!text.includes("**") && !text.includes("*") && !text.includes("`")) {
    return text;
  }

  const parts = [];
  let currentPos = 0;

  // 정규식으로 **bold**, *italic*, `code` 찾기
  const patterns = [
    { regex: /\*\*(.+?)\*\*/g, type: "bold" },
    { regex: /\*(.+?)\*/g, type: "italic" },
    { regex: /`(.+?)`/g, type: "code" },
  ];

  const matches = [];

  patterns.forEach(({ regex, type }) => {
    let match;
    regex.lastIndex = 0;
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        type,
        text: match[1],
        start: match.index,
        end: match.index + match[0].length,
      });
    }
  });

  // 시작 위치로 정렬
  matches.sort((a, b) => a.start - b.start);

  // 겹치는 부분 처리 (가장 긴 것 우선)
  const finalMatches = [];
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    let overlapped = false;
    for (let j = 0; j < finalMatches.length; j++) {
      const prev = finalMatches[j];
      if (
        (match.start >= prev.start && match.start < prev.end) ||
        (match.end > prev.start && match.end <= prev.end)
      ) {
        overlapped = true;
        break;
      }
    }
    if (!overlapped) {
      finalMatches.push(match);
    }
  }

  // 파트 생성
  for (let i = 0; i < finalMatches.length; i++) {
    const match = finalMatches[i];

    // 이전 텍스트 추가
    if (currentPos < match.start) {
      const plainText = text.substring(currentPos, match.start);
      if (plainText) {
        parts.push(plainText);
      }
    }

    // 포맷된 텍스트 추가
    parts.push({ type: match.type, text: match.text });
    currentPos = match.end;
  }

  // 나머지 텍스트 추가
  if (currentPos < text.length) {
    const plainText = text.substring(currentPos);
    if (plainText) {
      parts.push(plainText);
    }
  }

  return parts.length > 0 ? parts : text;
}

// 마크다운 파일 파싱
export function parseProjectMarkdown(content) {
  const { data, content: markdownContent } = parseFrontmatter(content);

  return {
    id: data.id || data.title?.toLowerCase().replace(/\s+/g, "-"),
    title: data.title,
    type: data.type || "개인",
    period: data.period || "",
    description: data.description || "",
    stack: Array.isArray(data.stack) ? data.stack : [],
    link: data.link || "",
    blocks: parseMarkdownToBlocks(markdownContent),
  };
}
