# 다이어그램 작성 가이드 (상용 수준)

design-reviewer가 다이어그램을 생성할 때 참고하는 가이드.

---

## 1. 다이어그램 선택 기준

| 표현하고 싶은 것 | 다이어그램 | 우선순위 |
|:--|:--|:--|
| DB 테이블 관계 | `erDiagram` | 데이터 모델 설계 시 필수 |
| API 요청/응답 흐름 | `sequenceDiagram` | API 설계 시 필수 |
| 전체 시스템 구성 | `graph TD` (flowchart) | 아키텍처 문서 필수 |
| 상태 변화 (주문, 결제 등) | `stateDiagram-v2` | 상태가 있는 엔티티에 필수 |
| 클래스/모델 구조 | `classDiagram` | 도메인 모델 복잡할 때 |
| 레이어 의존성 | `graph TD` + subgraph | 클린 아키텍처 시 |
| 컴포넌트 트리 | `graph TD` | 프론트엔드 구조 설명 시 |
| 배포 구조 | `graph LR` | 배포 환경 설명 시 |
| 의사결정 분기 | `flowchart TD` | 복잡한 비즈니스 로직 |
| 타임라인 | `timeline` | 프로젝트 로드맵 |

---

## 2. 작성 규칙

### 필수 규칙
- GitHub Markdown에서 바로 렌더 가능한 문법만 사용
- 노드 텍스트는 **한국어** (코드명은 영어 병기 가능)
- 한 다이어그램에 **노드 10개 이하** — 복잡하면 분리
- 다이어그램 바로 아래에 **한 줄 설명** 추가
- 관계 화살표에는 **동작을 나타내는 라벨** 사용

### 품질 기준
- 누가 봐도 5초 안에 전체 흐름을 파악할 수 있어야 한다
- 세부 사항은 다이어그램이 아니라 문서에 적는다
- 색상/스타일은 구분이 꼭 필요할 때만 사용

### 안티패턴
- 모든 걸 한 다이어그램에 넣는 것 → **분리**
- 노드 이름이 영어 약어만 있는 것 → **한국어 병기**
- 화살표에 라벨이 없는 것 → **동작 명시**
- 다이어그램만 있고 설명이 없는 것 → **설명 추가**

---

## 3. 다이어그램 유형별 예시

### 3.1 ERD — 테이블 관계 (필수 속성 포함)

```mermaid
erDiagram
    USERS ||--o{ ORDERS : "주문한다"
    ORDERS ||--|{ ORDER_ITEMS : "포함한다"
    PRODUCTS ||--o{ ORDER_ITEMS : "포함된다"
    USERS ||--|| USER_PROFILES : "가진다"

    USERS {
        bigint id PK "고유 식별자"
        varchar email UK "이메일 (로그인용)"
        varchar password_hash "비밀번호 해시"
        varchar name "이름"
        varchar role "역할 (user/admin)"
        boolean is_active "활성 여부"
        timestamp created_at "가입일"
        timestamp updated_at "수정일"
        timestamp deleted_at "삭제일 (소프트삭제)"
    }

    ORDERS {
        bigint id PK
        bigint user_id FK "주문자"
        decimal total_amount "총 금액"
        varchar status "상태 (pending/paid/shipped/done/cancelled)"
        varchar payment_method "결제 수단"
        timestamp ordered_at "주문일"
        timestamp created_at
    }

    ORDER_ITEMS {
        bigint id PK
        bigint order_id FK "주문"
        bigint product_id FK "상품"
        integer quantity "수량"
        decimal unit_price "단가 (주문 시점)"
    }

    PRODUCTS {
        bigint id PK
        varchar name "상품명"
        decimal price "가격"
        integer stock "재고"
        boolean is_available "판매 가능"
        timestamp created_at
    }
```

> 주문 시스템의 핵심 4개 테이블. ORDER_ITEMS의 unit_price는 주문 시점 가격을 보존한다.

### 3.2 시퀀스 — 정상 + 에러 흐름 포함

```mermaid
sequenceDiagram
    actor U as 사용자
    participant F as 프론트엔드
    participant A as API Gateway
    participant Auth as 인증 미들웨어
    participant S as 주문 서비스
    participant D as DB
    participant P as 결제 PG

    U->>F: 주문하기 클릭
    F->>A: POST /orders {items, payment}

    rect rgb(240, 248, 255)
        Note over A,Auth: 인증 검증
        A->>Auth: 토큰 검증
        Auth-->>A: user_id 추출
    end

    A->>S: create_order(user_id, items)

    rect rgb(240, 255, 240)
        Note over S,D: 주문 생성
        S->>D: 재고 확인 (SELECT FOR UPDATE)
        D-->>S: 재고 정보

        alt 재고 부족
            S-->>A: 422 "재고가 부족합니다"
            A-->>F: 에러 응답
            F-->>U: "재고 부족" 알림
        else 재고 충분
            S->>D: INSERT orders + order_items
            S->>D: UPDATE products (재고 차감)
            D-->>S: order_id
        end
    end

    rect rgb(255, 248, 240)
        Note over S,P: 결제 처리
        S->>P: 결제 요청 (amount)
        alt 결제 실패
            P-->>S: 실패
            S->>D: UPDATE orders SET status='cancelled'
            S-->>A: 422 "결제에 실패했습니다"
            A-->>F: 에러
            F-->>U: "결제 실패" 알림
        else 결제 성공
            P-->>S: 성공 (transaction_id)
            S->>D: UPDATE orders SET status='paid'
            S-->>A: 201 Created {order}
            A-->>F: 주문 완료
            F-->>U: "주문이 완료되었습니다"
        end
    end
```

> 주문 생성 전체 흐름. 재고 부족/결제 실패 분기를 포함한다.

### 3.3 상태 다이어그램 — 전이 조건 포함

```mermaid
stateDiagram-v2
    [*] --> 주문생성: POST /orders

    주문생성 --> 결제대기: 주문 확인
    결제대기 --> 결제완료: PG 결제 성공
    결제대기 --> 주문취소: PG 결제 실패
    결제대기 --> 주문취소: 30분 타임아웃

    결제완료 --> 상품준비: 판매자 확인
    상품준비 --> 배송중: 송장 등록
    배송중 --> 배송완료: 배송 완료 확인

    배송완료 --> 구매확정: 7일 경과 또는 수동 확정
    구매확정 --> [*]

    결제완료 --> 환불요청: 고객 환불 신청
    상품준비 --> 환불요청: 배송 전 취소
    환불요청 --> 환불완료: 환불 처리
    환불완료 --> [*]

    주문취소 --> [*]

    note right of 결제대기: 30분 내 미결제 시 자동 취소
    note right of 배송완료: 7일 내 미확정 시 자동 확정
```

> 주문 상태 전이. 타임아웃 자동 전이와 환불 분기를 포함한다.

### 3.4 시스템 아키텍처 — subgraph 활용

```mermaid
graph TD
    subgraph 클라이언트
        A[웹 브라우저\nReact SPA]
        B[모바일 앱\nReact Native]
    end

    subgraph CDN
        C[정적 자산\nCloudFront]
    end

    subgraph 로드밸런서
        D[ALB\nHTTPS 종단]
    end

    subgraph 애플리케이션
        E[API 서버 1\nFastAPI]
        F[API 서버 2\nFastAPI]
        G[배치 워커\nCelery]
    end

    subgraph 데이터
        H[(PostgreSQL\nRDS)]
        I[(Redis\nElastiCache)]
        J[S3\n파일 저장소]
    end

    subgraph 외부
        K[결제 PG\nPortOne]
        L[이메일\nSES]
        M[SMS\nNaver Cloud]
    end

    A --> C
    B --> D
    C --> D
    D --> E
    D --> F
    E --> H
    F --> H
    E --> I
    G --> H
    G --> K
    G --> L
    G --> M
    E --> J
```

> 프로덕션 배포 아키텍처. CDN, 로드밸런서, 이중화된 API 서버를 포함한다.

### 3.5 레이어 의존성 — 클린 아키텍처

```mermaid
graph TD
    subgraph "4. Infrastructure 외부"
        A[main.py\nFastAPI 앱 설정]
        B[config.py\n환경변수]
        C[database.py\nDB 연결]
    end

    subgraph "3. Adapters 어댑터"
        D[api/routes.py\nHTTP 요청/응답]
        E[repositories/\nDB 접근 구현체]
        F[external/\n외부 API 클라이언트]
    end

    subgraph "2. UseCases 유스케이스"
        G[usecases/\n비즈니스 로직]
        H[ports/\n인터페이스 정의]
    end

    subgraph "1. Domain 도메인"
        I[entities/\n핵심 모델]
        J[exceptions/\n도메인 예외]
        K[value_objects/\n값 객체]
    end

    A --> D
    D --> G
    G --> H
    G --> I
    E -.->|implements| H
    F -.->|implements| H
    D --> I
    E --> I

    style I fill:#e8f5e9
    style J fill:#e8f5e9
    style K fill:#e8f5e9
```

> 의존성은 안쪽으로만 향한다. 점선은 인터페이스 구현을 나타낸다.

### 3.6 컴포넌트 트리 — 프론트엔드

```mermaid
graph TD
    A["App\n(레이아웃 + 라우팅)"]
    
    subgraph 페이지
        B[HomePage]
        C[ProductListPage]
        D[ProductDetailPage]
        E[CartPage]
        F[OrderPage]
    end

    subgraph 공통 컴포넌트
        G[Header\n(네비게이션)]
        H[Footer]
        I[Modal]
        J[LoadingSpinner]
    end

    subgraph 훅
        K["useAuth\n(인증 상태)"]
        L["useCart\n(장바구니)"]
        M["useApi\n(API 호출)"]
    end

    A --> G
    A --> H
    A --> B
    A --> C
    A --> D
    A --> E
    A --> F

    B -.-> M
    C -.-> M
    D -.-> L
    E -.-> L
    F -.-> K
    F -.-> L
```

> 실선은 렌더링 관계, 점선은 훅 사용 관계를 나타낸다.

### 3.7 데이터 흐름 — flowchart

```mermaid
flowchart TD
    A[사용자 입력] --> B{입력 유효?}
    B -- 아니오 --> C[검증 에러 표시]
    C --> A
    B -- 예 --> D[API 호출]
    D --> E{응답 성공?}
    E -- 아니오 --> F{에러 종류}
    F -- 401 --> G[로그인 페이지]
    F -- 422 --> H[비즈니스 에러 표시]
    F -- 500 --> I[서버 에러 표시 + 재시도 버튼]
    E -- 예 --> J[결과 상태 업데이트]
    J --> K[UI 렌더링]
```

> 프론트엔드의 API 호출 흐름. 에러 종류별 처리 분기를 포함한다.

---

## 4. 다이어그램 조합 가이드

### MVP 프로젝트 (최소)
1. 시스템 아키텍처 (graph) — 1개
2. API 시퀀스 (sequenceDiagram) — 핵심 흐름 1~2개
3. ERD (erDiagram) — DB 있으면 1개

### 프로덕션 프로젝트 (권장)
1. 시스템 아키텍처 — 1개
2. 레이어 구조 — 1개
3. ERD — 1개
4. 핵심 API 시퀀스 — 주요 흐름별 1개씩
5. 상태 다이어그램 — 상태가 있는 엔티티별 1개
6. 컴포넌트 트리 — 프론트엔드 있으면 1개
7. 배포 구조 — 배포 환경이 복잡하면 1개

---

## 5. Mermaid 렌더링 주의사항

### GitHub에서 안 되는 것
- `%%` 주석은 일부 렌더러에서 무시됨
- `classDiagram`에서 제네릭 `<>` 표기 시 `~`로 대체 (예: `list~str~`)
- subgraph 이름에 특수문자 제한
- `\n` 줄바꿈은 일부 렌더러에서 `<br/>`로 대체 필요

### MCP (mcp__mermaid__generate) 사용 시
- PNG/SVG 파일로 저장: `folder` 파라미터에 절대 경로
- 테마: default, forest, dark, neutral
- 배경색: white 권장 (문서 인쇄/공유 시)
