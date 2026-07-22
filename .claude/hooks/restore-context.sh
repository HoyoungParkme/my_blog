#!/bin/bash
# ============================================================
# 세션 시작 시 context 자동 복원
# 이전 세션의 인수인계 문서가 있으면 Claude에게 주입한다
# ============================================================

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-.}"
CONTEXT_DIR="$PROJECT_DIR/docs/context"
SPRINT_FILE="$PROJECT_DIR/docs/sprint.md"
REQ_FILE="$PROJECT_DIR/docs/requirements.md"

OUTPUT=""

# 인수인계 문서 확인
if [ -f "$CONTEXT_DIR/session_handoff.md" ]; then
    OUTPUT+="[이전 세션 인수인계 문서가 있습니다. docs/context/session_handoff.md를 먼저 읽고 맥락을 복원하세요.]"
    OUTPUT+=$'\n'
fi

# 스프린트 상태 확인
if [ -f "$SPRINT_FILE" ]; then
    SPRINT_STATUS=$(grep -m1 "상태:" "$SPRINT_FILE" 2>/dev/null || echo "")
    if [ -n "$SPRINT_STATUS" ]; then
        OUTPUT+="[현재 스프린트 $SPRINT_STATUS — docs/sprint.md 참고]"
        OUTPUT+=$'\n'
    fi
fi

# 요구사항 문서 확인
if [ -f "$REQ_FILE" ]; then
    OUTPUT+="[요구사항 문서가 있습니다. docs/requirements.md 참고]"
    OUTPUT+=$'\n'
fi

# 설계 문서 확인
if [ -d "$PROJECT_DIR/docs/design" ]; then
    DESIGN_COUNT=$(find "$PROJECT_DIR/docs/design" -name "*.md" -type f 2>/dev/null | wc -l)
    if [ "$DESIGN_COUNT" -gt 0 ]; then
        OUTPUT+="[설계 문서 ${DESIGN_COUNT}개 존재. docs/design/ 참고]"
        OUTPUT+=$'\n'
    fi
fi

if [ -n "$OUTPUT" ]; then
    echo "$OUTPUT"
fi

exit 0
