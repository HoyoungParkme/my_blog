#!/bin/bash
# ============================================================
# Agent 위임 강제 게이트
# PreToolUse(Edit|Write) 이벤트에서 실행된다.
#
# PM이 직접 작성하면 안 되는 파일을 감지하여 차단한다.
# Agent에게 위임해야 하는 작업을 PM이 직접 하는 것을 방지한다.
#
# 차단 대상:
# 1. 테스트 파일 → test-writer agent 사용
# 2. 리뷰 결과 문서 → reviewer agent 사용
# 3. README/API/아키텍처 문서 → doc-writer agent 사용
# 4. 설계 검증 보고서 → design-reviewer agent 사용
# 5. 코드 조사 보고서 → researcher agent 사용
#
# 예외: Agent가 실행한 경우 (CLAUDE_AGENT_NAME 환경변수로 판별)
# ============================================================

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null)

if [ -z "$FILE_PATH" ]; then
    exit 0
fi

# Agent가 실행한 경우는 통과 (Agent 자신이 파일을 쓰는 것은 허용)
# Claude Code는 subagent 실행 시 별도 프로세스이므로 이 훅이 적용되지 않지만,
# 혹시 적용되더라도 agent 이름이 있으면 통과시킨다.
if [ -n "$CLAUDE_AGENT_NAME" ]; then
    exit 0
fi

PROJECT_DIR="${CLAUDE_PROJECT_DIR:-.}"
SPRINT_FILE="$PROJECT_DIR/docs/sprint.md"

# 스프린트가 없거나 "대기" 상태면 스킵 (아직 프로젝트 시작 전)
if [ ! -f "$SPRINT_FILE" ]; then
    exit 0
fi
SPRINT_STATUS=$(grep -m1 "상태:" "$SPRINT_FILE" 2>/dev/null || echo "")
if echo "$SPRINT_STATUS" | grep -q "대기"; then
    exit 0
fi

# ============================================================
# 규칙 1: 테스트 파일 → test-writer agent 필수
# ============================================================
if echo "$FILE_PATH" | grep -qE "tests/|test/|__tests__|\.test\.|\.spec\.|_test\.py|test_"; then
    echo "[차단] 테스트 파일은 직접 작성하지 마세요." >&2
    echo "" >&2
    echo "test-writer agent에게 위임하세요:" >&2
    echo "  1. docs/agents/test-writer/index.md에 작업 기록" >&2
    echo "  2. Agent 도구로 test-writer 실행" >&2
    echo "  3. 프롬프트: \"docs/agents/test-writer/index.md를 읽고 [대상 파일]의 테스트를 작성해라\"" >&2
    exit 2
fi

# ============================================================
# 규칙 2: Agent 작업 결과 문서 → 해당 agent 필수
# ============================================================

# reviewer 결과 문서
if echo "$FILE_PATH" | grep -qE "docs/agents/reviewer/[0-9]"; then
    echo "[차단] 리뷰 결과는 직접 작성하지 마세요." >&2
    echo "" >&2
    echo "reviewer agent에게 위임하세요:" >&2
    echo "  1. docs/agents/reviewer/index.md에 작업 기록" >&2
    echo "  2. Agent 도구로 reviewer 실행" >&2
    echo "  3. 프롬프트: \"docs/agents/reviewer/index.md를 읽고 리뷰를 수행해라\"" >&2
    exit 2
fi

# test-writer 결과 문서
if echo "$FILE_PATH" | grep -qE "docs/agents/test-writer/[0-9]"; then
    echo "[차단] 테스트 결과는 직접 작성하지 마세요." >&2
    echo "" >&2
    echo "test-writer agent에게 위임하세요." >&2
    exit 2
fi

# doc-writer 결과 문서
if echo "$FILE_PATH" | grep -qE "docs/agents/doc-writer/[0-9]"; then
    echo "[차단] 기술 문서 작성 결과는 직접 작성하지 마세요." >&2
    echo "" >&2
    echo "doc-writer agent에게 위임하세요." >&2
    exit 2
fi

# design-reviewer 결과 문서
if echo "$FILE_PATH" | grep -qE "docs/agents/design-reviewer/[0-9]"; then
    echo "[차단] 설계 검증 결과는 직접 작성하지 마세요." >&2
    echo "" >&2
    echo "design-reviewer agent에게 위임하세요." >&2
    exit 2
fi

# researcher 결과 문서
if echo "$FILE_PATH" | grep -qE "docs/agents/researcher/[0-9]"; then
    echo "[차단] 코드 조사 결과는 직접 작성하지 마세요." >&2
    echo "" >&2
    echo "researcher agent에게 위임하세요." >&2
    exit 2
fi

# ============================================================
# 규칙 3: README / API 문서 / 아키텍처 문서 → doc-writer agent 필수
# (docs/design/은 PM이 직접 작성 가능 — 설계는 PM 역할)
# (README.md, docs/api-*.md, docs/architecture.md는 doc-writer 영역)
# ============================================================
if echo "$FILE_PATH" | grep -qiE "README\.md$"; then
    echo "[차단] README.md는 직접 작성하지 마세요." >&2
    echo "" >&2
    echo "doc-writer agent에게 위임하세요:" >&2
    echo "  1. docs/agents/doc-writer/index.md에 작업 기록" >&2
    echo "  2. Agent 도구로 doc-writer 실행" >&2
    echo "  3. 프롬프트: \"docs/agents/doc-writer/index.md를 읽고 README를 작성해라\"" >&2
    exit 2
fi

exit 0
