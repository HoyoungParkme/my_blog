# 프로젝트 초기 설정 체크리스트

/new-project에서 새 프로젝트 생성 시 빠뜨리면 안 되는 항목.

---

## 1. 필수 파일

### 프로젝트 루트

| 파일 | 용도 | 필수 |
|:--|:--|:--|
| `README.md` | 프로젝트 소개, 설치/실행 방법 | O |
| `.gitignore` | git 제외 대상 | O |
| `CLAUDE.md` | Claude Code 기본 지침 | O |
| `.mcp.json` | MCP 서버 설정 | 필요 시 |

### 백엔드 (Python)

| 파일 | 용도 | 필수 |
|:--|:--|:--|
| `requirements.txt` / `pyproject.toml` | 의존성 목록 | O |
| `.env.example` | 환경변수 템플릿 | O |
| `.env` | 실제 환경변수 (.gitignore) | O |
| `app/__init__.py` | 패키지 초기화 | O |
| `app/main.py` | 앱 진입점 | O |
| `app/config.py` | 설정 관리 | O |

### 프론트엔드 (React/TypeScript)

| 파일 | 용도 | 필수 |
|:--|:--|:--|
| `package.json` | 의존성 + 스크립트 | O |
| `tsconfig.json` | TypeScript 설정 | O |
| `vite.config.ts` | Vite 설정 (프록시 포함) | O |
| `.env.local.example` | 프론트 환경변수 템플릿 | 필요 시 |

### 문서

| 파일 | 용도 | 필수 |
|:--|:--|:--|
| `docs/requirements.md` | 요구사항 인덱스 | O |
| `docs/requirements/01_*.md` | 첫 요구사항 상세 | O |
| `docs/sprint.md` | 스프린트 관리 | O |
| `docs/pm/index.md` | PM 작업 인덱스 | O |
| `docs/agents/*/index.md` | Agent 작업 인덱스 | O |

---

## 2. .gitignore 필수 항목

```gitignore
# 환경변수
.env
.env.local
.env.*.local

# Python
__pycache__/
*.pyc
venv/
.venv/
*.egg-info/

# Node
node_modules/

# IDE
.vscode/
.idea/

# OS
.DS_Store
Thumbs.db

# 빌드
dist/
build/

# Claude Code 임시
.claude/.edit-counter
.claude/settings.local.json
```

---

## 3. 프로젝트 시작 질문 순서

### 1차: 핵심 파악 (반드시)
1. "어떤 서비스를 만들고 싶나요?" — 한 줄 설명
2. "핵심 기능 3개만 꼽으면?" — MVP 범위
3. "누가 사용하나요?" — 사용자 규모/유형

### 2차: 기술 파악 (상황에 따라)
4. "웹? 모바일? 둘 다?" — 플랫폼
5. "기존 기술 스택 선호가 있나요?" — 제약 조건
6. "혼자? 팀?" — 개발 규모

### 3차: 제약 파악 (필요 시)
7. "배포 환경이 정해져 있나요?"
8. "외부 서비스 연동이 필요한가요?"
9. "참고하는 서비스가 있나요?"

---

## 4. 기술 스택 기본 추천

| 프로젝트 유형 | 백엔드 | 프론트 | DB |
|:--|:--|:--|:--|
| 개인 MVP | FastAPI | React (Vite) | SQLite |
| 소규모 서비스 | FastAPI | Next.js | PostgreSQL |
| 대규모 서비스 | FastAPI + Celery | Next.js | PostgreSQL + Redis |
| AI 서비스 | FastAPI | React (Vite) | PostgreSQL + 벡터 DB |
| 내부 도구 | FastAPI | React (Vite) | SQLite/PostgreSQL |
