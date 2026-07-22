# API 에러 코드 레퍼런스

## HTTP 상태 코드 가이드

### 2xx 성공

| 코드 | 의미 | 사용 시점 |
|:--|:--|:--|
| 200 | OK | 조회, 수정 성공 |
| 201 | Created | 생성 성공 (POST) |
| 204 | No Content | 삭제 성공, 응답 본문 없음 |

### 3xx 리다이렉션

| 코드 | 의미 | 사용 시점 |
|:--|:--|:--|
| 301 | Moved Permanently | URL 영구 변경 |
| 302 | Found | 임시 리다이렉트 |
| 304 | Not Modified | 캐시 유효 |

### 4xx 클라이언트 에러

| 코드 | 의미 | 사용 시점 | 에러 코드 예시 |
|:--|:--|:--|:--|
| 400 | Bad Request | 입력값 검증 실패 | VALIDATION_ERROR |
| 401 | Unauthorized | 인증 필요/실패 | UNAUTHORIZED, TOKEN_EXPIRED |
| 403 | Forbidden | 권한 없음 | FORBIDDEN, ACCESS_DENIED |
| 404 | Not Found | 리소스 없음 | NOT_FOUND, USER_NOT_FOUND |
| 405 | Method Not Allowed | HTTP 메서드 오류 | METHOD_NOT_ALLOWED |
| 409 | Conflict | 충돌 (중복) | ALREADY_EXISTS, EMAIL_TAKEN |
| 413 | Payload Too Large | 요청 크기 초과 | PAYLOAD_TOO_LARGE |
| 415 | Unsupported Media Type | 지원 안 하는 형식 | UNSUPPORTED_MEDIA_TYPE |
| 422 | Unprocessable Entity | 논리적 처리 불가 | UNPROCESSABLE, INSUFFICIENT_BALANCE |
| 429 | Too Many Requests | 요청 ��한 초과 | RATE_LIMITED |

### 5xx 서버 에러

| 코드 | 의미 | 사용 시점 | 에러 코드 예시 |
|:--|:--|:--|:--|
| 500 | Internal Server Error | 서버 내부 에러 | INTERNAL_ERROR |
| 502 | Bad Gateway | 업스트림 에러 | BAD_GATEWAY |
| 503 | Service Unavailable | 서비스 점검 중 | SERVICE_UNAVAILABLE |
| 504 | Gateway Timeout | 업스트림 타임아웃 | GATEWAY_TIMEOUT |

## 도메인별 에러 코드 예시

### 인증 (Auth)

| 에러 코드 | HTTP | 설명 |
|:--|:--|:--|
| INVALID_CREDENTIALS | 401 | 이메일 또는 비밀번호 틀림 |
| TOKEN_EXPIRED | 401 | 액세스 토큰 만료 |
| REFRESH_TOKEN_EXPIRED | 401 | 리프레시 토큰 만료 |
| ACCOUNT_DISABLED | 403 | 비활성화된 계정 |
| EMAIL_NOT_VERIFIED | 403 | 이메��� 미인증 |

### 사용자 (Users)

| 에러 코드 | HTTP | 설명 |
|:--|:--|:--|
| USER_NOT_FOUND | 404 | 사용자 없음 |
| EMAIL_ALREADY_EXISTS | 409 | 이메일 중복 |
| PHONE_ALREADY_EXISTS | 409 | 전화번호 중복 |
| INVALID_PASSWORD_FORMAT | 400 | 비밀번호 규칙 미충족 |

### 주문 (Orders)

| 에러 코드 | HTTP | 설명 |
|:--|:--|:--|
| ORDER_NOT_FOUND | 404 | 주문 없음 |
| ORDER_ALREADY_CANCELLED | 422 | 이미 취소된 주문 |
| ORDER_CANNOT_CANCEL | 422 | 취소 불가 상태 |
| INSUFFICIENT_STOCK | 422 | 재고 부족 |

### 결제 (Payments)

| 에러 코드 | HTTP | 설명 |
|:--|:--|:--|
| PAYMENT_FAILED | 422 | 결제 실패 |
| INSUFFICIENT_BALANCE | 422 | 잔액 부족 |
| REFUND_PERIOD_EXPIRED | 422 | 환불 기간 초과 |
| PAYMENT_ALREADY_COMPLETED | 409 | 이미 완료된 결제 |

## 에러 응답 템플릿

### 기�� 에러

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "사���자에��� 보여줄 메시지"
  }
}
```

### 검증 에러 (필드별)

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "입력값을 확인해주세요.",
    "details": [
      { "field": "email", "message": "이메일 형식이 올바르지 않습니다." },
      { "field": "password", "message": "비밀번호는 8자 이���이어야 합니다." }
    ]
  }
}
```

### 에러 코드 네이밍 규칙

- UPPER_SNAKE_CASE 사용
- `[도메인]_[상태]` ���태: `USER_NOT_FOUND`, `ORDER_ALREADY_CANCELLED`
- 일반적인 에러는 도메인 없이: `VALIDATION_ERROR`, `UNAUTHORIZED`
