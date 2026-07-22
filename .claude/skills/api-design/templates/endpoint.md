# API 엔드포인트 템플릿

아래 템플릿을 복사해서 각 엔드포인트를 작성한다.

---

## [HTTP메서드] [경로]

[이 API가 하는 일 한 줄 설명]

**인증**: 필요 / 불필요
**권한**: 본인만 / 관리자만 / 전체

### 요청

**Path Parameters**

| 파라미터 | 타입 | 설명 |
|:--|:--|:--|
| id | integer | 리소스 ID |

**Query Parameters** (GET 목록 조회 시)

| 파라미터 | 타입 | 기본값 | 설명 |
|:--|:--|:--|:--|
| page | integer | 1 | 페이지 번호 |
| size | integer | 20 | 페이지 크기 (최대 100) |
| sort | string | created_at | 정렬 기준 |
| order | string | desc | 정렬 방향 |
| search | string | - | 검색어 |
| status | string | - | 상태 필터 |

**Request Body** (POST, PUT, PATCH 시)

| 필드 | 타입 | 필수 | 검증 | 설명 |
|:--|:--|:--|:--|:--|
| field_name | string | O | 최소 2자, 최대 100자 | 설명 |

```json
{
  "field_name": "값"
}
```

### 응답

**성공** ([상태코드])

| 필드 | 타입 | 설명 |
|:--|:--|:--|
| id | integer | ID |

```json
{
  "id": 1
}
```

**목록 응답** (GET 목록 시)

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "size": 20,
    "total_count": 150,
    "total_pages": 8,
    "has_next": true,
    "has_prev": false
  }
}
```

**에러**

| 상태 코드 | 에러 코드 | 설명 |
|:--|:--|:--|
| 400 | VALIDATION_ERROR | 입력값 오류 |
| 401 | UNAUTHORIZED | 인증 필요 |
| 404 | NOT_FOUND | 리소스 없음 |

---
