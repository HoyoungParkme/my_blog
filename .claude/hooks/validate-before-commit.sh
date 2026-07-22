#!/bin/bash
# ============================================================
# 커밋 전 품질 검증
# git commit 명령 실행 전에 린트/포맷 체크를 수행한다
# ============================================================

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty' 2>/dev/null)

# git commit 명령인지 확인
if echo "$COMMAND" | grep -qE "git commit"; then
    PROJECT_DIR="${CLAUDE_PROJECT_DIR:-.}"
    ERRORS=""

    # Python 프로젝트: ruff 체크
    if [ -f "$PROJECT_DIR/pyproject.toml" ] || [ -f "$PROJECT_DIR/requirements.txt" ]; then
        if command -v ruff &>/dev/null; then
            RUFF_OUTPUT=$(cd "$PROJECT_DIR" && ruff check . 2>&1)
            if [ $? -ne 0 ]; then
                ERRORS+="[Python 린트 에러 발견]\n$RUFF_OUTPUT\n"
            fi
        fi
    fi

    # Node.js 프로젝트: eslint 체크
    if [ -f "$PROJECT_DIR/package.json" ]; then
        if [ -f "$PROJECT_DIR/node_modules/.bin/eslint" ]; then
            ESLINT_OUTPUT=$(cd "$PROJECT_DIR" && npx eslint . --quiet 2>&1)
            if [ $? -ne 0 ]; then
                ERRORS+="[TypeScript/JavaScript 린트 에러 발견]\n$ESLINT_OUTPUT\n"
            fi
        fi
    fi

    if [ -n "$ERRORS" ]; then
        echo -e "커밋 전 검증에서 문제를 발견했습니다:\n$ERRORS\n수정 후 다시 커밋해주세요." >&2
        exit 2  # exit 2 = 차단
    fi
fi

exit 0
