#!/bin/bash
# ============================================================
# 파일 수정 후 자동 포맷팅
# Edit/Write 도구 실행 후 해당 파일을 자동으로 포맷한다
# ============================================================

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null)

if [ -z "$FILE_PATH" ] || [ ! -f "$FILE_PATH" ]; then
    exit 0
fi

# 파일 확장자 추출
EXT="${FILE_PATH##*.}"

case "$EXT" in
    py)
        # Python: ruff로 포맷
        if command -v ruff &>/dev/null; then
            ruff format "$FILE_PATH" 2>/dev/null
            ruff check --fix "$FILE_PATH" 2>/dev/null
        elif command -v black &>/dev/null; then
            black --quiet "$FILE_PATH" 2>/dev/null
        fi
        ;;
    ts|tsx|js|jsx|json|css|scss|md)
        # TypeScript/JavaScript/JSON/CSS/Markdown: prettier로 포맷
        PROJECT_DIR="${CLAUDE_PROJECT_DIR:-.}"
        if [ -f "$PROJECT_DIR/node_modules/.bin/prettier" ]; then
            npx prettier --write "$FILE_PATH" 2>/dev/null
        fi
        ;;
esac

exit 0
