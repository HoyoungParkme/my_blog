---
name: clean-architecture
description: 클린 아키텍처 원칙을 적용해서 개발한다. 의존성 방향, 레이어 분리, 도메인 중심 설계를 따른다.
---

이번 작업은 클린 아키텍처 원칙을 기반으로 진행한다.

## 핵심 원칙: 의존성은 안쪽으로만 향한다

```
[외부 External] → [어댑터 Adapter] → [유스케이스 UseCase] → [도메인 Domain]
     DB              API/Repository      Service/UseCase       Entity/Model
     Web              Controller          비즈니스 로직          핵심 규칙
     외부API           Router              검증/조합             데이터 구조
```

- 바깥 레이어는 안쪽 레이어를 참조할 수 있다
- 안쪽 레이어는 바깥 레이어를 **절대** 모른다
- 안쪽이 바깥을 참조해야 할 때는 인터페이스(Port)를 사용한다

---

## 레이어 상세

### 1. Domain (도메인 모델)

가장 안쪽. 핵심 비즈니스 규칙과 데이터 구조.

**포함하는 것**:
- Entity: 핵심 비즈니스 객체
- Value Object: 불변 값 객체 (Email, Money, Address 등)
- Domain Exception: 비즈니스 규칙 위반 예외
- Domain Event: 도메인에서 발생하는 이벤트 (필요 시)

**규칙**:
- 프레임워크에 의존하지 않는다 (FastAPI, Express 등 import 금지)
- ORM에 의존하지 않는다 (SQLAlchemy 모델과 도메인 모델 분리)
- 외부 라이브러리 최소화 (표준 라이브러리만 사용 권장)
- 순수 데이터와 비즈니스 규칙만 포함한다

**Python 예시**:
```python
# domain/entities/user.py
from dataclasses import dataclass
from datetime import datetime

@dataclass
class User:
    id: int
    email: str
    name: str
    is_active: bool
    created_at: datetime
    
    def deactivate(self) -> None:
        """사용자를 비활성화한다."""
        if not self.is_active:
            raise UserAlreadyInactiveError(self.id)
        self.is_active = False
```

**TypeScript 예시**:
```typescript
// domain/entities/user.ts
export interface User {
  id: number;
  email: string;
  name: string;
  isActive: boolean;
  createdAt: Date;
}

export function deactivateUser(user: User): User {
  if (!user.isActive) {
    throw new UserAlreadyInactiveError(user.id);
  }
  return { ...user, isActive: false };
}
```

### 2. UseCase (유스케이스 / 서비스)

비즈니스 로직의 조합과 실행.

**포함하는 것**:
- UseCase/Service: 하나의 비즈니스 동작
- Port (인터페이스): 외부 의존성의 추상 계약
- DTO: 레이어 간 데이터 전달 객체

**규칙**:
- 하나의 UseCase = 하나의 비즈니스 동작
- Domain Entity를 조합해서 비즈니스 로직을 실행한다
- 외부 의존성(DB, API)은 직접 호출하지 않고 Port(인터페이스)를 사용한다
- 프레임워크에 의존하지 않는다

**Python 예시**:
```python
# usecases/create_user.py
from domain.entities.user import User
from usecases.ports.user_repository import UserRepository
from usecases.ports.email_service import EmailService

class CreateUserUseCase:
    """새 사용자를 생성하고 환영 이메일을 발송한다."""
    
    def __init__(self, user_repo: UserRepository, email_service: EmailService):
        self._user_repo = user_repo
        self._email_service = email_service
    
    def execute(self, email: str, name: str) -> User:
        # 비즈니스 규칙: 이메일 중복 확인
        existing = self._user_repo.find_by_email(email)
        if existing:
            raise EmailAlreadyExistsError(email)
        
        # 사용자 생성
        user = self._user_repo.create(email=email, name=name)
        
        # 환영 이메일 발송
        self._email_service.send_welcome(user)
        
        return user
```

**Port (인터페이스)**:
```python
# usecases/ports/user_repository.py
from abc import ABC, abstractmethod
from domain.entities.user import User

class UserRepository(ABC):
    """사용자 저장소 인터페이스."""
    
    @abstractmethod
    def find_by_email(self, email: str) -> User | None: ...
    
    @abstractmethod
    def create(self, email: str, name: str) -> User: ...
```

### 3. Adapter (인터페이스 어댑터)

외부 세계와 내부를 연결하는 변환기.

**포함하는 것**:
- Controller/Router: HTTP 요청 → UseCase 호출 → HTTP 응답
- Repository 구현체: Port 인터페이스의 실제 DB 구현
- 외부 서비스 구현체: Port 인터페이스의 실제 API 구현
- Presenter: UseCase 결과 → 응답 형식 변환

**규칙**:
- Router/Controller는 HTTP 요청/응답 변환에만 집중한다
- 비즈니스 로직을 Router에 넣지 않는다
- Repository 구현체는 ORM/쿼리 빌더를 여기서 사용한다
- API 응답 형식(DTO)과 도메인 모델을 분리한다

**Python 예시**:
```python
# adapters/api/user_router.py
from fastapi import APIRouter, Depends
from usecases.create_user import CreateUserUseCase
from adapters.api.schemas import CreateUserRequest, UserResponse

router = APIRouter()

@router.post("/users", response_model=UserResponse)
def create_user(request: CreateUserRequest, use_case: CreateUserUseCase = Depends()):
    user = use_case.execute(email=request.email, name=request.name)
    return UserResponse.from_entity(user)

# adapters/repositories/postgres_user_repository.py
from usecases.ports.user_repository import UserRepository
from domain.entities.user import User

class PostgresUserRepository(UserRepository):
    """PostgreSQL 기반 사용자 저장소."""
    
    def __init__(self, session):
        self._session = session
    
    def find_by_email(self, email: str) -> User | None:
        row = self._session.query(UserModel).filter_by(email=email).first()
        return self._to_entity(row) if row else None
    
    def create(self, email: str, name: str) -> User:
        model = UserModel(email=email, name=name, is_active=True)
        self._session.add(model)
        self._session.commit()
        return self._to_entity(model)
    
    def _to_entity(self, model: UserModel) -> User:
        return User(id=model.id, email=model.email, ...)
```

### 4. Infrastructure (외부 레이어)

프레임워크, DB 연결, 외부 서비스 설정.

**포함하는 것**:
- DB 연결 설정, 마이그레이션
- 외부 API 클라이언트 설정
- 의존성 주입(DI) 설정
- 환경변수, 설정 관리
- 로깅, 모니터링 설정

---

## 프로젝트 구조

### Python (FastAPI)
```
backend/app/
├── domain/                    ← 가장 안쪽 (의존성 없음)
│   ├── entities/
│   │   ├── user.py
│   │   └── order.py
│   ├── value_objects/
│   │   └── email.py
│   └── exceptions/
│       └── domain_errors.py
├── usecases/                  ← domain만 참조
│   ├── create_user.py
│   ├── process_order.py
│   └── ports/                 ← 인터페이스 정의
│       ├── user_repository.py
│       └── email_service.py
├── adapters/                  ← usecases + domain 참조
│   ├── api/
│   │   ├── user_router.py
│   │   ├── order_router.py
│   │   └── schemas/          ← 요청/응답 DTO
│   └── repositories/
│       ├── postgres_user_repository.py
│       └── models/            ← ORM 모델 (여기에만)
└── infrastructure/            ← 모든 레이어 참조 가능
    ├── database.py
    ├── config.py
    └── dependencies.py        ← DI 설정
```

### TypeScript (React + Node)
```
backend/src/
├── domain/
│   ├── entities/
│   └── errors/
├── usecases/
│   ├── ports/
│   └── dto/
├── adapters/
│   ├── controllers/
│   └── repositories/
└── infrastructure/
    ├── database/
    └── config/

frontend/src/
├── domain/                    ← 타입 정의, 비즈니스 규칙
├── usecases/                  ← 비즈니스 로직 (hooks)
├── adapters/
│   ├── api/                   ← API 클라이언트
│   └── ui/                    ← 컴포넌트
│       ├── components/
│       ├── pages/
│       └── layouts/
└── infrastructure/
    ├── routing/
    └── state/                 ← 상태 관리 설정
```

---

## 의존성 검증 체크리스트

| 레이어 | 참조해도 되는 것 | 참조하면 안 되는 것 |
|:--|:--|:--|
| Domain | 표준 라이브러리만 | 프레임워크, ORM, 외부 서비스 |
| UseCase | Domain | Adapter, Infrastructure, 프레임워크 |
| Adapter | UseCase, Domain | Infrastructure (직접 참조 최소화) |
| Infrastructure | 모든 레이어 | - |

---

## 과설계 방지 가이드

클린 아키텍처라고 모든 것을 엄격하게 분리할 필요는 없다.

| 상황 | 권장 |
|:--|:--|
| 프로젝트 초기, 소규모 | domain + usecases + adapters 3레이어면 충분 |
| 단순 CRUD | UseCase 없이 Router → Repository 직접 가능 |
| 구현체가 1개뿐인 Port | Port 없이 구현체 직접 사용 가능 |
| 도메인 로직이 거의 없는 Entity | 별도 파일 없이 DTO로 대체 가능 |
| Value Object | 로직이 있을 때만 만든다 (단순 문자열은 그냥 str) |

**핵심**: 구조는 필요에 따라 점진적으로 도입한다. 처음부터 모든 레이어를 만들지 않는다.

---

## 적용 규칙 요약

1. 도메인 모델은 프레임워크에 의존하지 않는다
2. 유스케이스는 DB/외부서비스를 직접 호출하지 않고 Port를 사용한다
3. Repository 구현체는 adapters에 둔다
4. API 응답 형식(DTO)과 도메인 모델을 분리한다
5. 레이어 간 데이터 전달은 명확한 타입으로 한다
6. 필요한 만큼만 분리한다 — 무조건 모든 레이어를 만들지 않는다
