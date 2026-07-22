#!/bin/bash
# ============================================================
# 보호 파일 수정 차단
# 실수로 중요한 설정 파일을 덮어쓰는 것을 방지한다
# ============================================================

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null)

if [ -z "$FILE_PATH" ]; then
    exit 0
fi

# 보호 대상 패턴
PROTECTED_PATTERNS=(
    "package-lock.json"
    "yarn.lock"
    "pnpm-lock.yaml"
    "poetry.lock"
    ".git/"
    "node_modules/"
    "__pycache__/"
)

for pattern in "${PROTECTED_PATTERNS[@]}"; do
    if [[ "$FILE_PATH" == *"$pattern"* ]]; then
        echo "차단: '$FILE_PATH'는 보호된 파일입니다. 직접 수정하지 마세요." >&2
        exit 2
    fi
done

exit 0
