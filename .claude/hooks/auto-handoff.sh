#!/bin/bash
# ============================================================
# Layer 5: 세션 종료 시 자동 handoff 알림
# SessionEnd 이벤트에서 실행된다.
# 개발 작업이 있었으면 handoff 문서 작성을 권장한다.
# ============================================================

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-.}"
COUNTER_FILE="$PROJECT_DIR/.claude/.edit-counter"

# 소스 코드 수정이 있었는지 확인
if [ -f "$COUNTER_FILE" ]; then
    COUNT=$(cat "$COUNTER_FILE" 2>/dev/null || echo "0")
    if [ "$COUNT" -gt 0 ]; then
        echo "[세션 종료] 이번 세션에서 소스 코드를 ${COUNT}회 수정했습니다. /handoff로 인수인계 문서를 작성하는 것을 권장합니다."
        # 카운터 리셋
        echo "0" > "$COUNTER_FILE"
    fi
fi

# 스프린트 진행 중이면 알림
SPRINT_FILE="$PROJECT_DIR/docs/sprint.md"
if [ -f "$SPRINT_FILE" ]; then
    SPRINT_STATUS=$(grep -m1 "상태:" "$SPRINT_FILE" 2>/dev/null || echo "")
    if echo "$SPRINT_STATUS" | grep -qv "대기"; then
        echo "[세션 종료] 스프린트가 진행 중입니다. docs/sprint.md를 최신 상태로 업데이트했는지 확인하세요."
    fi
fi

exit 0
