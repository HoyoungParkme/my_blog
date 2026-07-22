#!/bin/bash
# ============================================================
# Layer 2: 유저 입력 키워드 분석 → 자동 Skill/Agent 제안
# UserPromptSubmit 이벤트에서 실행된다.
# 유저의 자연어 입력을 분석해서 관련 skill/agent를 제안한다.
# ============================================================

INPUT=$(cat)
PROMPT=$(echo "$INPUT" | jq -r '.prompt // empty' 2>/dev/null)

if [ -z "$PROMPT" ]; then
    exit 0
fi

# 소문자로 변환해서 매칭
LOWER_PROMPT=$(echo "$PROMPT" | tr '[:upper:]' '[:lower:]')

SUGGESTIONS=""

# ─── PM / 프로젝트 관리 ───
if echo "$LOWER_PROMPT" | grep -qE "프로젝트.*시작|새.*프로젝트|처음부터|빈.*폴더"; then
    SUGGESTIONS+="[자동 제안] 새 프로젝트 시작 → /new-project 사용을 권장합니다."$'\n'
fi

if echo "$LOWER_PROMPT" | grep -qE "계획|플랜|설계.*하자|기획|요구사항|스프린트"; then
    SUGGESTIONS+="[자동 제안] PM 모드 → /pm 사용을 권장합니다."$'\n'
fi

# ─── 설계 ───
if echo "$LOWER_PROMPT" | grep -qE "테이블|스키마|erd|db.*설계|데이터.*모델|컬럼|정규화"; then
    SUGGESTIONS+="[자동 제안] 데이터 모델링 → /data-modeling 사용을 권장합니다."$'\n'
fi

if echo "$LOWER_PROMPT" | grep -qE "api.*설계|엔드포인트|rest.*api|명세서|swagger|openapi"; then
    SUGGESTIONS+="[자동 제안] API 설계 → /api-design 사용을 권장합니다."$'\n'
fi

if echo "$LOWER_PROMPT" | grep -qE "클린.*아키텍처|레이어.*분리|도메인.*분리|의존성.*방향"; then
    SUGGESTIONS+="[자동 제안] 클린 아키텍처 → /clean-architecture 사용을 권장합니다."$'\n'
fi

# ─── 구현 ───
if echo "$LOWER_PROMPT" | grep -qE "기능.*추가|새.*기능|추가.*해줘|만들어.*줘|구현.*해줘"; then
    SUGGESTIONS+="[자동 제안] 기능 추가 → /add-feature 사용을 권장합니다."$'\n'
fi

if echo "$LOWER_PROMPT" | grep -qE "버그|수정|고쳐|에러.*수정|오류.*수정|안.*돼|작동.*안"; then
    SUGGESTIONS+="[자동 제안] 버그 수정 → /fix 사용을 권장합니다."$'\n'
fi

if echo "$LOWER_PROMPT" | grep -qE "리팩토링|리팩터|정리|개선|구조.*변경|코드.*정리"; then
    SUGGESTIONS+="[자동 제안] 리팩토링 → /refactor 사용을 권장합니다."$'\n'
fi

# ─── 설명 ───
if echo "$LOWER_PROMPT" | grep -qE "설명.*해줘|뭐야|어떻게.*동작|왜.*이렇게|이해.*안|알려줘"; then
    SUGGESTIONS+="[자동 제안] 쉬운 설명 → /explain 사용을 권장합니다."$'\n'
fi

# ─── 세션 관리 ───
if echo "$LOWER_PROMPT" | grep -qE "마무리|끝내자|인수인계|정리.*해줘|세션.*종료|다음.*세션"; then
    SUGGESTIONS+="[자동 제안] 세션 인수인계 → /handoff 사용을 권장합니다."$'\n'
fi

if [ -n "$SUGGESTIONS" ]; then
    echo "$SUGGESTIONS"
fi

exit 0
