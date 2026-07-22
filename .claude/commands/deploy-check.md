배포 전 검증 체크리스트를 실행한다.

다음 항목을 순서대로 확인하고 결과를 보고한다:

## 1. 코드 품질
- TypeScript 타입 에러: `npx tsc --noEmit`
- Python 린트: `python -m py_compile` (변경된 .py 파일)
- 미사용 import 확인

## 2. 환경 설정
- `.env` 파일에 필수 변수 존재 여부
- 설정 파일 JSON 유효성

## 3. Git 상태
- 커밋 안 된 변경사항 확인
- 브랜치가 main과 충돌 없는지 확인

## 4. 의존성
- `requirements.txt`와 실제 import 불일치 확인
- `package.json` 변경 시 lock 파일 동기화 여부

결과를 테이블로 출력:
| 항목 | 상태 | 비고 |
|:-----|:----:|:-----|
