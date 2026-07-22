# Claude Code 프로젝트 템플릿 사용법

## 새 프로젝트에 적용하기

### 1. 전체 복사
```bash
cp -r D:/dev/claude-code-template/.claude   새_프로젝트/
cp -r D:/dev/claude-code-template/.claude-plugin  새_프로젝트/
cp -r D:/dev/claude-code-template/docs      새_프로젝트/
cp    D:/dev/claude-code-template/CLAUDE.md 새_프로젝트/
cp    D:/dev/claude-code-template/.mcp.json 새_프로젝트/
```

### 2. 프로젝트별 조정

#### CLAUDE.md
- `## 아키텍처` 섹션을 프로젝트에 맞게 수정

#### docs/ 폴더명 충돌 시
프로젝트에 이미 `docs/`가 있으면:
```bash
# 1. 폴더명 변경
mv docs claude_docs

# 2. 경로 일괄 치환 (훅 + CLAUDE.md)
find .claude/hooks -name "*.sh" -exec sed -i 's|docs/|claude_docs/|g' {} +
sed -i 's|docs/|claude_docs/|g' CLAUDE.md
sed -i 's|docs/|claude_docs/|g' .claude/settings.json
```

#### .mcp.json
- 불필요한 MCP 서버 제거
- 프로젝트에 필요한 서버 추가

### 3. 시작
```
claude
> /pm
```

## 포함된 구성

| 항목 | 수량 | 내용 |
|:-----|:----:|:-----|
| Skills | 12개 | pm, fix, refactor, explain, add-feature, api-design 등 |
| Agents | 5개 | reviewer, test-writer, researcher, doc-writer, design-reviewer |
| Hooks | 14개 | 세션 복원, 위임 게이트, 설계 게이트, 자동 포맷 등 |
| Commands | 2개 | quick-context, deploy-check |
| MCP | 5개 | playwright, context7, mermaid, plantuml, github |

## 훅 이벤트 맵

| 이벤트 | 훅 | 역할 |
|:-------|:---|:-----|
| SessionStart | restore-context | 이전 세션 맥락 복원 |
| UserPromptSubmit | keyword-trigger | Skill 자동 제안 |
| PostToolUse(Edit/Write) | auto-format, post-implementation-check, watch-design-docs, doc-sync-check | 자동 포맷, 수정 추적, 설계 변경 감지 |
| PreToolUse(Bash) | validate-before-commit | 커밋 전 린트 |
| PreToolUse(Edit/Write) | protect-files, agent-delegation-gate, design-gate | 보호 파일 차단, Agent 위임 강제, 설계 없이 구현 차단 |
| SubagentStop | agent-lifecycle | Agent 완료 알림 |
| PostCompact | preserve-context | 컨텍스트 재주입 + 위임 규칙 리마인더 |
| SessionEnd | auto-handoff | handoff 권장 |
| Stop | stop-check | 문서 업데이트 확인 |
| Notification | (Windows 팝업) | 입력 대기 알림 |
