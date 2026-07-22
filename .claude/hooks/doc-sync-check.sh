#!/bin/bash
# ============================================================
# PM 문서 동기화 체크
# PostToolUse(Edit|Write) 이벤트에서 실행된다.
# 소스 코드를 수정할 때마다 PM 문서가 최신인지 확인한다.
# 5회 소스 수정마다 문서 업데이트를 강제 권장한다.
# ============================================================

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null)

if [ -z "$FILE_PATH" ]; then
    exit 0
fi

# 소스 코드 파일인지 확인 (설정/문서/훅 파일 제외)
EXT="${FILE_PATH##*.}"
case "$EXT" in
    py|ts|tsx|js|jsx|go|rs|java|kt|rb|php|css|html|json)
        ;;
    *)
        exit 0
        ;;
esac

# .claude/, docs/, tests/ 내 파일은 제외
if echo "$FILE_PATH" | grep -qE "\.(claude|config|vscode)|docs/|tests/|test/|__tests__"; then
    exit 0
fi

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-.}"
COUNTER_FILE="$PROJECT_DIR/.claude/.doc-sync-counter"
SPRINT_FILE="$PROJECT_DIR/docs/sprint.md"
WORK_LOG="$PROJECT_DIR/docs/work-log.md"
PM_INDEX="$PROJECT_DIR/docs/pm/index.md"

# sprint.md가 없으면 스킵
if [ ! -f "$SPRINT_FILE" ]; then
    exit 0
fi

# 스프린트가 "대기" 상태면 스킵
SPRINT_STATUS=$(grep -m1 "상태:" "$SPRINT_FILE" 2>/dev/null || echo "")
if echo "$SPRINT_STATUS" | grep -q "대기"; then
    exit 0
fi

# 카운터 증가
COUNT=0
if [ -f "$COUNTER_FILE" ]; then
    COUNT=$(cat "$COUNTER_FILE" 2>/dev/null)
    COUNT=${COUNT:-0}
fi
COUNT=$((COUNT + 1))
echo "$COUNT" > "$COUNTER_FILE"

# 5회마다 문서 동기화 체크
if [ "$COUNT" -ge 5 ]; then
    WARNINGS=""

    # work-log.md 존재 및 최신 여부
    if [ ! -f "$WORK_LOG" ]; then
        WARNINGS+="- docs/work-log.md가 없습니다. 작업 로그를 작성하세요."$'\n'
    fi

    # pm/index.md 존재 여부
    if [ ! -f "$PM_INDEX" ]; then
        WARNINGS+="- docs/pm/index.md가 없습니다. PM 작업 인덱스를 작성하세요."$'\n'
    fi

    # sprint.md의 "진행 중인 작업"이 비어있는지
    if grep -q "진행 중인 작업" "$SPRINT_FILE" 2>/dev/null; then
        CURRENT_WORK=$(sed -n '/진행 중인 작업/,/## /p' "$SPRINT_FILE" 2>/dev/null | grep -v "^##" | grep -v "^$" | grep -v "없음" | head -1)
        if [ -z "$CURRENT_WORK" ]; then
            WARNINGS+="- sprint.md의 '진행 중인 작업'이 비어있습니다. 현재 작업을 기록하세요."$'\n'
        fi
    fi

    if [ -n "$WARNINGS" ]; then
        echo "[문서 동기화 경고] 소스 코드 ${COUNT}회 수정. PM 문서를 업데이트하세요:" >&2
        echo "$WARNINGS" >&2
    fi

    # 카운터 리셋
    echo "0" > "$COUNTER_FILE"
fi

exit 0
