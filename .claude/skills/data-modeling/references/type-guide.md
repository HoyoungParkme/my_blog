# DB 데이터 타입 레퍼런스

## PostgreSQL

| 용도 | 타입 | 크기 | 비고 |
|:--|:--|:--|:--|
| 고유 ID (정수) | BIGSERIAL | 8B | 자동 증가, 대규모 서비스 권장 |
| 고유 ID (UUID) | UUID | 16B | 분산 시스템, 외부 노출 ID |
| 짧은 문자열 | VARCHAR(N) | 가변 | 이름, 이메일, 상태값 |
| 긴 텍스트 | TEXT | 가변 | 본문, 설명, 메모 |
| 정수 | INTEGER | 4B | 수량, ���수 |
| 큰 정수 | BIGINT | 8B | 조회수, 대용량 카운터 |
| 금액 | DECIMAL(10,2) | 가변 | 절대 FLOAT 쓰지 않음 |
| 소수점 | NUMERIC(P,S) | 가변 | 정밀한 계산 |
| 참/거짓 | BOOLEAN | 1B | NOT NULL + DEFAULT 필수 |
| 날짜+시간 | TIMESTAMPTZ | 8B | 타임존 포함, 국��� 서비스 필수 |
| 날짜만 | DATE | 4B | 생년월일 등 |
| JSON | JSONB | 가변 | 인덱스/쿼리 가능, JSON보다 JSONB |
| 배열 | TYPE[] | 가변 | PostgreSQL 전용, 간단한 태그 등 |
| 열거형 | VARCHAR(20) | 가변 | ENUM 대��� VARCHAR 권장 (변경 용이) |

## MySQL

| 용도 | 타입 | 크기 | 비고 |
|:--|:--|:--|:--|
| 고유 ID (정수) | BIGINT AUTO_INCREMENT | 8B | UNSIGNED 추가 권장 |
| 고유 ID (UUID) | CHAR(36) 또는 BINARY(16) | 36B/16B | BINARY가 성능 유리 |
| 짧은 문자열 | VARCHAR(N) | 가변 | utf8mb4 인코딩 확인 |
| 긴 텍스트 | TEXT | 가변 | 65KB 제한, LONGTEXT는 4GB |
| 정수 | INT | 4B | |
| 금액 | DECIMAL(10,2) | 가변 | |
| 참/거짓 | TINYINT(1) | 1B | BOOLEAN은 TINYINT의 별칭 |
| 날짜+시간 | DATETIME | 8B | TIMESTAMP는 2038년 문��� |
| JSON | JSON | 가변 | MySQL 5.7.8+ |

## 공통 권장 사항

### 모든 테이블에 필수 컬럼

```sql
id          BIGSERIAL PRIMARY KEY,       -- 고유 식별자
created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),  -- 생성일
updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()   -- 수정일
```

### 소프��� 삭제 시 추가

```sql
deleted_at  TIMESTAMPTZ NULL             -- NULL이면 활성, 값 있으면 삭제됨
```

### 금액 처리 규칙

- DECIMAL(10,2): 일반적인 금액 (최대 99,999,999.99)
- DECIMAL(15,2): 대규모 금액 (최대 9,999,999,999,999.99)
- DECIMAL(19,4): 환율, 주식 등 소수점 4자리 필요 시
- **절대 FLOAT/DOUBLE 사용 금지** — 소수점 오차 발생

### 문자열 길이 가이드

| 필드 | 권장 길이 | 이유 |
|:--|:--|:--|
| 이메일 | VARCHAR(255) | RFC 5321 기준 254자 |
| 비밀번호 해시 | VARCHAR(255) | bcrypt 60자 + 여유 |
| 이름 | VARCHAR(100) | 한글 50자, 영문 100자 |
| 전화번호 | VARCHAR(20) | 국제번호 포함 |
| URL | VARCHAR(2048) | 브라우저 최대 URL |
| 상태값 | VARCHAR(20) | pending, completed 등 |
| 짧은 제목 | VARCHAR(200) | |
| 주소 | VARCHAR(500) | |
