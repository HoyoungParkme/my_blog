#!/bin/bash
# ============================================================
# Layer 4: 컨텍스트 압축 후 핵심 지시 재주입
# PostCompact 이벤트에서 실행된다.
# 컨텍스트가 압축될 때 잃어버리면 안 되는 핵심 정보를 다시 주입한다.
# ============================================================

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-.}"
OUTPUT=""

# [절대 규칙] Agent 위임 리마인더 — 컨텍스트 압축 후 잊지 않도록 재주입
OUTPUT+="[절대 규칙] 코드 리뷰→reviewer, 테스트→test-writer, 설계 검증→design-reviewer, 코드 조사→researcher, 기술 문서→doc-writer에게 반드시 위임. 바쁘다는 이유로 생략 금지."$'\n'

# 현재 스프린트 상태 재주입
SPRINT_FILE="$PROJECT_DIR/docs/sprint.md"
if [ -f "$SPRINT_FILE" ]; then
    SPRINT_GOAL=$(grep -m1 "목표:" "$SPRINT_FILE" 2>/dev/null || echo "")
    SPRINT_STATUS=$(grep -m1 "상태:" "$SPRINT_FILE" 2>/dev/null || echo "")
    SPRINT_PHASE=""

    # 현재 체크된 단계 확인
    if grep -q "\[x\] 검증" "$SPRINT_FILE" 2>/dev/null; then
        SPRINT_PHASE="검증"
    elif grep -q "\[x\] 구현" "$SPRINT_FILE" 2>/dev/null; then
        SPRINT_PHASE="구현"
    elif grep -q "\[x\] 설계" "$SPRINT_FILE" 2>/dev/null; then
        SPRINT_PHASE="설계"
    elif grep -q "\[x\] 분석" "$SPRINT_FILE" 2>/dev/null; then
        SPRINT_PHASE="분석"
    fi

    if [ -n "$SPRINT_GOAL" ]; then
        OUTPUT+="[컨텍스트 복원] 현재 스프린트 $SPRINT_GOAL"$'\n'
    fi
    if [ -n "$SPRINT_PHASE" ]; then
        OUTPUT+="[컨텍스트 복원] 현재 단계: ${SPRINT_PHASE}"$'\n'
    fi
fi

# 파킹랏에 항목이 있는지 확인
if [ -f "$SPRINT_FILE" ]; then
    PARKING_COUNT=$(grep -c "^| P-" "$SPRINT_FILE" 2>/dev/null)
    PARKING_COUNT=${PARKING_COUNT:-0}
    if [ "$PARKING_COUNT" -gt 0 ]; then
        OUTPUT+="[컨텍스트 복원] 파킹랏에 ${PARKING_COUNT}개 대기 요청이 있습니다. docs/sprint.md 참고."$'\n'
    fi
fi

# 설계 결정사항 존재 여부
DECISIONS_FILE="$PROJECT_DIR/docs/context/decisions.md"
if [ -f "$DECISIONS_FILE" ]; then
    OUTPUT+="[컨텍스트 복원] 합의된 설계 결정사항이 있습니다. docs/context/decisions.md를 반드시 참고하세요."$'\n'
fi

# 진행 중인 agent 작업 확인
AGENTS_DIR="$PROJECT_DIR/docs/agents"
if [ -d "$AGENTS_DIR" ]; then
    for agent_file in "$AGENTS_DIR"/*.md; do
        if [ -f "$agent_file" ]; then
            AGENT_NAME=$(basename "$agent_file" .md)
            if grep -q "## 현재 작업" "$agent_file" 2>/dev/null; then
                CURRENT_WORK=$(sed -n '/## 현재 작업/,/## /p' "$agent_file" | grep -v "^##" | grep -v "^$" | grep -v "없음" | head -1)
                if [ -n "$CURRENT_WORK" ]; then
                    OUTPUT+="[컨텍스트 복원] ${AGENT_NAME}가 작업 중: ${CURRENT_WORK}"$'\n'
                fi
            fi
        fi
    done
fi

if [ -n "$OUTPUT" ]; then
    echo "$OUTPUT"
fi

exit 0
