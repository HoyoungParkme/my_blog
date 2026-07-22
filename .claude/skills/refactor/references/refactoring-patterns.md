# 리팩토링 패턴 가이드

/refactor에서 코드 개선 시 참고하는 패턴 모음.

---

## 1. 코드 냄새(Code Smell) → 해결 패턴

| 코드 냄새 | 증상 | 해결 패턴 |
|:--|:--|:--|
| **긴 함수** | 30줄+ 함수 | 함수 추출 (Extract Function) |
| **깊은 중첩** | if 3단계+ | 얼리 리턴 (Guard Clause) |
| **매개변수 과다** | 4개+ 파라미터 | 파라미터 객체 도입 |
| **중복 코드** | 같은 로직 3번+ | 함수 추출 → 재사용 |
| **긴 if-else 체인** | 5개+ 조건 분기 | 딕셔너리 매핑 / 전략 패턴 |
| **매직 넘버** | `if status == 3` | 상수/Enum 추출 |
| **God 클래스** | 500줄+ 클래스 | 책임 분리 (클래스 분할) |
| **Feature Envy** | 다른 클래스 데이터만 사용 | 메서드 이동 (Move Method) |
| **순환 의존성** | A→B→A import | 인터페이스 도입 / 의존성 역전 |
| **보여주기식 try-catch** | `except: pass` | 구체적 예외만 처리 |

---

## 2. 리팩토링 기법 상세

### 2.1 얼리 리턴 (Guard Clause)

```python
# Before (깊은 중첩)
def process(user, order):
    if user:
        if user.is_active:
            if order:
                if order.status == "pending":
                    # 실제 로직
                    return do_something()
    return None

# After (얼리 리턴)
def process(user, order):
    if not user:
        return None
    if not user.is_active:
        return None
    if not order:
        return None
    if order.status != "pending":
        return None
    
    return do_something()
```

### 2.2 딕셔너리 매핑 (if-else 제거)

```python
# Before
def get_message(status):
    if status == "pending":
        return "대기 중입니다"
    elif status == "paid":
        return "결제 완료"
    elif status == "shipped":
        return "배송 중입니다"
    elif status == "delivered":
        return "배송 완료"
    else:
        return "알 수 없음"

# After
STATUS_MESSAGES = {
    "pending": "대기 중입니다",
    "paid": "결제 완료",
    "shipped": "배송 중입니다",
    "delivered": "배송 완료",
}

def get_message(status):
    return STATUS_MESSAGES.get(status, "알 수 없음")
```

### 2.3 파라미터 객체 도입

```python
# Before (파라미터 과다)
def create_user(name, email, phone, address, city, zipcode, country):
    ...

# After (객체로 묶기)
@dataclass
class CreateUserRequest:
    name: str
    email: str
    phone: str | None = None
    address: str | None = None
    city: str | None = None
    zipcode: str | None = None
    country: str = "KR"

def create_user(request: CreateUserRequest):
    ...
```

---

## 3. 리팩토링 우선순위 기준

| 우선순위 | 조건 | 예시 |
|:--|:--|:--|
| **1. 즉시** | 버그 위험, 보안 문제 | SQL 인젝션, 인증 누락 |
| **2. 이번에** | 현재 작업과 직접 관련 + 수정 비용 낮음 | 수정할 파일 안의 중복 코드 |
| **3. 다음에** | 관련 있지만 범위가 큼 | 아키텍처 변경이 필요한 것 |
| **4. 보류** | 현재 작업과 무관 + 동작에 문제 없음 | 스타일만 다른 코드 |

---

## 4. 리팩토링 안전 수칙

1. **테스트가 있으면 먼저 실행** — 현재 동작 확인
2. **한 번에 하나만 변경** — 여러 리팩토링 동시 X
3. **변경 후 테스트** — 깨진 게 없는지 확인
4. **기능 변경과 리팩토링 분리** — 같은 커밋에 섞지 않기
5. **되돌릴 수 있게** — 큰 변경 전 현재 상태 기록
