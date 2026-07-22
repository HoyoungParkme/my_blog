#!/bin/bash
# ============================================================
# 구현 완료 감지
# Edit/Write가 소스 코드 파일(비설정)에 실행된 횟수를 추적한다.
# 일정 횟수 이상이면 리뷰/테스트를 권장하는 메시지를 출력한다.
# ============================================================

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null)

if [ -z "$FILE_PATH" ]; then
    exit 0
fi

# 소스 코드 파일인지 확인 (설정/문서 파일 제외)
EXT="${FILE_PATH##*.}"
case "$EXT" in
    py|ts|tsx|js|jsx|go|rs|java|kt|rb|php)
        # 소스 코드 파일
        ;;
    *)
        # 설정/문서/기타 → 무시
        exit 0
        ;;
esac

# 설정 디렉토리 내 파일은 제외
if echo "$FILE_PATH" | grep -qE "\.(claude|config|vscode)|node_modules|__pycache__|docs/"; then
    exit 0
fi

# 수정 횟수 추적 파일
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-.}"
COUNTER_FILE="$PROJECT_DIR/.claude/.edit-counter"

# 카운터 증가
COUNT=0
if [ -f "$COUNTER_FILE" ]; then
    COUNT=$(cat "$COUNTER_FILE" 2>/dev/null || echo "0")
fi
COUNT=$((COUNT + 1))
echo "$COUNT" > "$COUNTER_FILE"

# 10회 이상 소스 코드 수정 시 리뷰/테스트 권장
if [ "$COUNT" -eq 10 ]; then
    echo "[알림] 소스 코드 파일을 10회 수정했습니다. reviewer와 test-writer에게 검증을 위임하는 것을 권장합니다."
    echo "0" > "$COUNTER_FILE"
fi

exit 0
