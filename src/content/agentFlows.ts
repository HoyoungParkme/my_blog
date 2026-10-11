/**
 * 에이전트 실행 흐름 데이터
 *
 * 파일 경로: src/content/agentFlows.ts
 * 목적: 프로젝트 상세의 "실행 흐름" 섹션(AgentFlow)에 쓰는 단계 목록. 화면 컴포넌트와 분리해 둔다.
 * 주요 기능: 보험청구심사 어시스턴트, GraphRAG 기반 사내 BI 에이전트의 질문 1건 처리 단계
 *
 * 실제 실행 로그(단계별 시간·토큰 수)가 없어서 단계 이름과 설명만 둔다. 수치를 지어 넣지 않는다.
 * 실측 값이 생기면 단계에 필드를 더해 화면에 함께 보여준다.
 */

/** 실행 단계 하나. children은 이 단계 안에서 동시에 실행되는 하위 단계다. */
export interface FlowStep {
  title: string;
  detail: string;
  children?: FlowStep[];
}

export interface AgentFlow {
  /** 섹션 상단 설명 한 줄 */
  caption: string;
  steps: FlowStep[];
}

/** 출처: 팀 저장소 docs/SERVICE_OVERVIEW.md "LLM 호출 순서", docs/design/tech-decisions.md */
export const insuranceClaimFlow: AgentFlow = {
  caption: "질문 하나가 답이 되기까지의 단계입니다. 실측 시간·토큰 값은 넣지 않았습니다.",
  steps: [
    {
      title: "질문 받기",
      detail: "사용자 문장에서 사고 유형과 날짜 같은 판단에 필요한 정보를 뽑습니다.",
    },
    {
      title: "부족한 정보 묻기",
      detail: "필수 정보가 비어 있으면 되묻고, 질문이 길어지면 받은 정보로 부분 판단을 합니다.",
    },
    {
      title: "약관 검색",
      detail: "두 경로로 동시에 찾아 합칩니다.",
      children: [
        { title: "벡터 검색", detail: "질문과 비슷한 조항을 찾습니다." },
        { title: "그래프 검색", detail: "찾은 조항의 부모 조항과 형제 조항까지 함께 가져옵니다." },
      ],
    },
    {
      title: "근거 조항 확인",
      detail: "인용할 조항이 실제 검색 결과에 있는지 교차 확인합니다.",
    },
    {
      title: "판단과 답변",
      detail: "청구 가능성을 높음·중간·낮음으로 판단하고 근거 조항 원문을 인용해 답합니다.",
    },
  ],
};

/** 출처: 사용자 설명(DD·데이터 명세서 → 카탈로그 → GraphRAG → 질의·시각화) */
export const graphragBiFlow: AgentFlow = {
  caption:
    "질문 하나가 차트가 되기까지의 단계입니다. 스키마 그래프는 데이터 명세서로 미리 만들어 둡니다. 실측 시간·토큰 값은 넣지 않았습니다.",
  steps: [
    { title: "질문 받기", detail: "찾고 싶은 데이터를 자연어로 묻습니다." },
    {
      title: "스키마 그래프 탐색",
      detail: "데이터 카탈로그 그래프에서 질문에 맞는 테이블·컬럼을 찾고 테이블 사이 관계를 따라갑니다.",
    },
    { title: "쿼리 생성", detail: "찾은 테이블과 관계로 데이터를 꺼낼 쿼리를 만듭니다." },
    { title: "데이터 조회", detail: "사내 DB에서 값을 가져옵니다." },
    { title: "차트 렌더링", detail: "결과를 대시보드 차트로 보여줍니다." },
  ],
};
