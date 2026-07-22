#!/bin/bash
# ============================================================
# Layer 3: Agent 완료 시 task 파일 자동 업데이트 알림
# SubagentStop 이벤트에서 실행된다.
# Agent가 작업을 마치면 task 파일 업데이트를 리마인드한다.
# ============================================================

INPUT=$(cat)
AGENT_NAME=$(echo "$INPUT" | jq -r '.agent_name // empty' 2>/dev/null)

if [ -z "$AGENT_NAME" ]; then
    exit 0
fi

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-.}"
TASK_FILE="$PROJECT_DIR/docs/agents/${AGENT_NAME}.md"

if [ -f "$TASK_FILE" ]; then
    echo "[Agent 완료] ${AGENT_NAME}가 작업을 마쳤습니다. docs/agents/${AGENT_NAME}.md의 작업 상태를 '완료'로 업데이트하세요."
fi

exit 0
