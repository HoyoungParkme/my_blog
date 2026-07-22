# 클린 아키텍처 폴더 구��: Python + FastAPI

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py                          ← FastAPI 앱 생성, 라우터 등록
│   │
│   ├── domain/                          ← 가장 ���쪽 (의존성 없음)
│   │   ├── __init__.py
│   │   ├── entities/                    ← 도메인 모델
│   │   │   ├── __init__.py
│   │   │   ├── user.py                  ← @dataclass User
│   │   │   └── order.py
│   │   ├── value_objects/               ← 값 객체 (필요 시)
│   │   │   └── email.py
│   │   └��─ exceptions/                  ← 도메인 예외
│   │       ├── __init__.py
│   │       └── domain_errors.py
│   │
│   ├── usecases/                        ← domain만 참조
│   │   ├── __init__.py
│   │   ├── create_user.py               ← UseCase 클래스
│   │   ├── get_user.py
│   │   ├── ports/                       ← 인터페이스 (ABC)
│   │   │   ├── __init__.py
│   │   │   ├── user_repository.py       ← ABC
│   │   │   └── email_service.py         ← ABC
│   │   └── dto/                         ← 레이어 간 전달 객체
│   │       ├── __init__.py
│   │       └── user_dto.py
│   │
│   ├── adapters/                        ← usecases + domain 참조
│   │   ├── __init__.py
│   │   ├── api/                         ← HTTP 인터페이스
│   │   │   ├── __init__.py
│   │   │   ├── user_router.py           ← APIRouter
│   │   │   ├── order_router.py
│   │   │   ├── schemas/                 ← Pydantic 요청/응답
│   │   │   │   ├── __init__.py
│   │   │   │   ├── user_schema.py
│   │   │   │   └── common_schema.py     ← 페이지네이션 등
│   │   │   └── middleware/
│   │   │       └── auth.py
│   │   └── repositories/                ← DB 구현체
│   │       ├── __init__.py
│   │       ├── postgres_user_repo.py    ← Port 구현
│   │       └── models/                  ← SQLAlchemy 모델
│   │           ├── __init__.py
│   │           └── user_model.py
│   │
│   └── infrastructure/                  ← 모든 레이어 참조 가능
│       ├── __init__.py
│       ├── config.py                    ← 환���변���, 설정
│       ├── database.py                  ← DB 연결, 세션
│       └── dependencies.py              ← FastAPI DI 설정
│
├── tests/
│   ├── __init__.py
│   ├── conftest.py                      ← 공통 fixture
│   ├── unit/
│   │   ├── usecases/
│   │   │   └── test_create_user.py
│   │   └─�� domain/
│   │       └── test_user.py
│   └── integration/
│       ├── api/
│       │   └── test_user_api.py
│       └── repositories/
│           └── test_user_repo.py
│
├── migrations/                          ← Alembic 마이그레이션
│   ├── env.py
│   └── versions/
│
├��─ pyproject.toml
├── requirements.txt
├── .env.example
└── Dockerfile
```

## 의존성 방향

```
infrastructure → adapters → usecases → domain
     ↓              ↓           ↓         ↓
  DB설정        Router      비즈니스     Entity
  DI설정      Repository     로직     Value Object
  환경변수      Schema        Port      Exception
```

## main.py 예시

```python
from fastapi import FastAPI
from app.adapters.api.user_router import router as user_router
from app.infrastructure.database import engine

app = FastAPI(title="프로젝트명")

app.include_router(user_router, prefix="/api/v1")
```
