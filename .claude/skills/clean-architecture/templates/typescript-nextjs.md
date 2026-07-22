# 클린 아키텍처 폴더 구조: TypeScript + Next.js

```
frontend/
├── src/
│   ├── app/                             ← Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── (auth)/                      ← 라우�� ���룹
│   │   │   ├── login/page.tsx
│   │   │   ���── signup/page.tsx
│   │   ├── (main)/
│   │   │   ├── dashboard/page.tsx
│   │   │   └── orders/
│   │   │       ├─��� page.tsx
│   │   │       └── [id]/page.tsx
│   │   └── api/                         ← Route Handlers (필요 시)
│   │
│   ├── domain/                          ← 가장 안쪽 (의존성 없음)
│   │   ├── entities/                    ← 타입/인터페이스
│   │   │   ├── user.ts
│   │   │   └── order.ts
│   │   ├── errors/                      ← 도메인 에러
│   │   │   └── domain-errors.ts
│   │   └── constants/                   ← 상수
│   │       └── order-status.ts
│   │
│   ├── usecases/                        ← domain만 참조
│   │   ├── hooks/                       ← React 커스텀 훅
│   │   │   ├── useAuth.ts
│   │   │   ├── useOrders.ts
│   │   │   └── useUser.ts
│   │   └── validators/                  ← 검증 로직
│   │       └── user-validator.ts
│   │
│   ├── adapters/                        ← usecases + domain 참조
│   │   ├── api/                         ← API 클라이언트
│   │   │   ├── client.ts                ← axios/fetch 설정
│   │   │   ├── userApi.ts
│   │   │   └── orderApi.ts
│   │   └── ui/                          ← UI 컴포넌트
│   │       ├── components/              ← 재사용 컴포넌트
│   │       │   ├── Button.tsx
│   │       │   ├── Input.tsx
│   │       │   └─��� Modal.tsx
│   │       ├── features/                ← 기능��� 컴포넌트
│   │       │   ├��─ auth/
│   │       │   │   ├── LoginForm.tsx
│   │       │   │   └��─ SignupForm.tsx
│   │       │   └── orders/
│   │       │       ├── OrderList.tsx
│   │       │       └── OrderDetail.tsx
│   │       └── layouts/
│   │           ├── Header.tsx
│   │           └── Sidebar.tsx
│   │
│   └── infrastructure/                  ← 모든 레이어 참조 가능
│       ├── config/
│       │   └��─ env.ts                   ← 환경변수 타입
│       ├── providers/
│       │   └── QueryProvider.tsx         ← TanStack Query 등
│       └── store/                       ← 전역 상태 (필요 시)
│           └─��� authStore.ts
│
├── public/
├── tests/
│   ├── unit/
│   └─��� e2e/
│
├── next.config.js
├── tsconfig.json
├── tailwind.config.ts
├── package.json
└── .env.local.example
```

## 의존성 방향

```
infrastructure → adapters → usecases → domain
     ↓              ↓           ↓         ↓
  Provider       API Client   Hooks     Entity
  Store          Component   Validator   Error
  Config         Layout                 Constant
```

## API 클라이언트 예시

```typescript
// adapters/api/client.ts
const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// adapters/api/userApi.ts
export const userApi = {
  getMe: () => client.get<User>('/users/me'),
  update: (data: UpdateUserDto) => client.patch<User>('/users/me', data),
};
```
