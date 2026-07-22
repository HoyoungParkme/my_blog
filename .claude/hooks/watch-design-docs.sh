#!/bin/bash
# ============================================================
# Layer 5+: 설계 문서 변경 감지
# PostToolUse(Edit|Write) 이벤트에서 실행된다.
# 설계 문서가 변경되면 design-reviewer 검증을 권장한다.
# ============================================================

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null)

if [ -z "$FILE_PATH" ]; then
    exit 0
fi

# 설계 문서인지 확인
if echo "$FILE_PATH" | grep -qE "docs/design/(data-model|api-spec)"; then
    echo "[설계 변경 감지] $(basename "$FILE_PATH")가 수정되었습니다. design-reviewer에게 교차 검증을 위임하는 것을 권장합니다."
fi

# 요구사항 문서 변경 감지
if echo "$FILE_PATH" | grep -qE "docs/requirements\.md"; then
    echo "[요구사항 변경 감지] requirements.md가 수정되었습니다. sprint.md와 일관성을 확인하세요."
fi

exit 0
