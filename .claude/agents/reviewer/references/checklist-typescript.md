# TypeScript 코드 리뷰 체크리스트

## React 전용

- [ ] 컴포넌트가 단일 책임을 가지는가
- [ ] props 타입이 명확히 정의되어 있는가
- [ ] `any` 타입을 사용하지 않는가
- [ ] `useEffect` 의존성 배열이 올바른가
- [ ] 불필요한 리렌더링이 없는가 (`React.memo`, `useMemo`, `useCallback`)
- [ ] 이벤트 핸들러 네이밍이 `handle~`/`on~`인가
- [ ] 조건부 렌더링이 깔끔한가 (삼항 중첩 금지)
- [ ] key prop이 유니크하고 안정적인가 (배열 index 지양)
- [ ] API 호출이 컴포넌트 바깥(hooks/서비스)에 분리되어 있는가
- [ ] 로딩/에러/빈 상태를 모두 처리하는가

## Next.js 전용

- [ ] Server Component와 Client Component 분리가 적절한가
- [ ] `'use client'`가 필요한 곳에만 있는가
- [ ] 데이터 페칭이 서버 컴포넌트에서 이루어지는가
- [ ] 메타데이터(`metadata`)가 적절히 설정되어 있는가
- [ ] 이미지에 `<Image>` 컴포넌트를 사용하는가

## TypeScript 일반

- [ ] `any` 대신 구체적인 타입을 사용하는가
- [ ] `interface`와 `type`을 일관되게 사용하는가
- [ ] 유니온 타입을 활용하는가 (string 대신 `'pending' | 'completed'`)
- [ ] Optional chaining (`?.`)을 활용하는가
- [ ] Nullish coalescing (`??`)을 사용하는가 (`||` 대신)
- [ ] `as` 타입 단언을 남용하지 않는가
- [ ] 제네릭을 적절히 사용하는가
- [ ] `enum` 대신 `as const` 객체를 고려했는가
- [ ] `Promise`와 `async/await`를 일관되게 사용하는가
- [ ] try-catch에서 에러 타입을 확인하는가
