#!/bin/bash
# ============================================================
# 설계 게이트 (v3 — 스프린트 연동)
# 소스 코드를 처음 생성할 때:
# 1. 설계 문서가 있는지 확인한다
# 2. 현재 스프린트의 단계가 "설계 완료"인지 확인한다
# 설계를 건너뛰고 구현하는 것을 방지한다.
# ============================================================

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null)

if [ -z "$FILE_PATH" ]; then
    exit 0
fi

# 소스 코드 파일인지 확인
EXT="${FILE_PATH##*.}"
case "$EXT" in
    py|ts|tsx|js|jsx)
        ;;
    *)
        exit 0
        ;;
esac

# 제외 대상: 설정, 테스트, 문서, venv, 초기설정
if echo "$FILE_PATH" | grep -qE "\.(claude|config|vscode)|node_modules|__pycache__|docs/|tests/|test/|__tests__|venv/|\.env|config\.py|main\.py|__init__"; then
    exit 0
fi

# 새 파일 생성인지 확인
if [ ! -f "$FILE_PATH" ]; then
    PROJECT_DIR="${CLAUDE_PROJECT_DIR:-.}"
    SPRINT_FILE="$PROJECT_DIR/docs/sprint.md"

    # sprint.md가 없으면 — 스프린트 관리 자체를 안 하는 상태
    if [ ! -f "$SPRINT_FILE" ]; then
        echo "[경고] docs/sprint.md가 없습니다. /pm으로 프로젝트를 시작하세요."
        exit 0
    fi

    # 현재 스프린트에서 설계 단계가 체크되었는지 확인
    DESIGN_CHECKED=$(grep -c "\[x\] 설계" "$SPRINT_FILE" 2>/dev/null)
    DESIGN_CHECKED=${DESIGN_CHECKED:-0}

    if [ "$DESIGN_CHECKED" -eq 0 ]; then
        # 설계 단계가 체크 안 됨 → 경고
        echo "[경고] 현재 스프린트에서 설계 단계가 완료되지 않았습니다." >&2
        echo "sprint.md의 설계 단계를 완료한 후 구현을 시작하세요." >&2
        echo "/tech-decision, /data-modeling, /api-design으로 설계를 먼저 진행하세요." >&2
        exit 2  # 설계 안 하면 차단
    fi
fi

exit 0
