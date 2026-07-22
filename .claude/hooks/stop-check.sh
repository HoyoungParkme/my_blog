#!/bin/bash
# ============================================================
# Stop 시 작업 완료 확인
# 개발 작업 후 sprint.md, agent 파일, work-log 업데이트를 확인한다
# ============================================================

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-.}"
SPRINT_FILE="$PROJECT_DIR/docs/sprint.md"
WORK_LOG="$PROJECT_DIR/docs/work-log.md"

# sprint.md가 없으면 검사 스킵 (환경 구성 등 비개발 작업)
if [ ! -f "$SPRINT_FILE" ]; then
    exit 0
fi

# sprint 상태가 "대기"면 아직 개발 시작 안 한 것 → 스킵
SPRINT_STATUS=$(grep -m1 "상태:" "$SPRINT_FILE" 2>/dev/null || echo "")
if echo "$SPRINT_STATUS" | grep -q "대기"; then
    exit 0
fi

MESSAGES=""

# 소스 코드 수정 카운터 확인
COUNTER_FILE="$PROJECT_DIR/.claude/.edit-counter"
if [ -f "$COUNTER_FILE" ]; then
    COUNT=$(cat "$COUNTER_FILE" 2>/dev/null || echo "0")
    if [ "$COUNT" -gt 0 ]; then
        MESSAGES+="[알림] 소스 코드 ${COUNT}회 수정. sprint.md와 agent 파일이 최신인지 확인하세요."$'\n'
    fi
fi

# work-log.md 존재 여부 확인
if [ ! -f "$WORK_LOG" ]; then
    MESSAGES+="[알림] docs/work-log.md가 없습니다. 작업 로그를 남겨주세요."$'\n'
fi

if [ -n "$MESSAGES" ]; then
    echo "$MESSAGES"
fi

exit 0
