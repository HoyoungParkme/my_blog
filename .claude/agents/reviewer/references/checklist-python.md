# Python 코드 리뷰 체크리스트

## FastAPI 전용

- [ ] 라우터에 `response_model`이 지정되어 있는가
- [ ] Pydantic 모델로 요청/응답 검증을 하는가
- [ ] `Depends()`로 의존성 주입을 사용하는가
- [ ] 비동기 함수(`async def`)가 적절히 사용되는가
- [ ] 동기 블로킹 작업에 `run_in_executor`를 사용하는가
- [ ] `HTTPException`으로 에러 응답을 반환하는가
- [ ] 환경변수는 `pydantic-settings`로 관리하는가
- [ ] CORS 설정이 적절한가 (`*` 사용 여부)

## SQLAlchemy 전용

- [ ] 세션을 `with` 문이나 `Depends(get_db)`로 관리하는가
- [ ] N+1 쿼리가 없는가 (`joinedload`, `selectinload` 사용)
- [ ] 트랜잭션 범위가 적절한가
- [ ] `session.commit()` 후 에러 시 `session.rollback()`이 있는가
- [ ] 대량 데이터 조회 시 페이지네이션이 있는가

## Python 일반

- [ ] 타입 힌트가 적용되어 있는가
- [ ] `from __future__ import annotations`를 사용하는가 (3.9 이하)
- [ ] f-string을 사용하는가 (`.format()`, `%` 대신)
- [ ] `pathlib`을 사용하는가 (`os.path` 대신)
- [ ] `dataclass` 또는 Pydantic을 사용하는가 (dict 남용 방지)
- [ ] context manager (`with`)로 리소스를 관리하는가
- [ ] list comprehension이 과하게 복잡하지 않은가 (3줄 이상이면 for문)
- [ ] mutable 기본 인자를 사용하지 않는가 (`def f(items=[])` 금지)
- [ ] `*args, **kwargs`를 남용하지 않는가
- [ ] `import *`를 사용하지 않는가
