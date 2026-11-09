/**
 * 에이전트 실행 흐름 데이터
 *
 * 파일 경로: src/content/agentFlows.ts
 * 목적: 프로젝트 상세의 "실행 흐름" 섹션(AgentFlow)에 쓰는 단계 목록. 화면 컴포넌트와 분리해 둔다.
 * 주요 기능: 보험청구심사 어시스턴트, Tableau AI 에이전트의 질문 1건 처리 단계
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

/** 출처: 본인 인터뷰(GitHub 이슈 #2, 2026-11). 적재는 매일 배치 뒤 미리 끝나 있고, 질문 때는 적재된 것만 읽는다. */
export const tableauAgentFlow: AgentFlow = {
  caption:
    "질문 하나가 증감 사유가 되기까지의 단계입니다. 대시보드 구조와 값은 매일 배치 뒤 미리 적재해 둡니다. 실측 시간·토큰 값은 넣지 않았습니다.",
  steps: [
    { title: "질문 받기", detail: "어느 대시보드의 어떤 숫자가 왜 바뀌었는지 자연어로 묻습니다." },
    {
      title: "화면 찾기",
      detail: "pgvector 검색으로 질문에 맞는 대시보드·시트를 찾습니다.",
    },
    {
      title: "구조와 값 읽기",
      detail: "워크북 XML 구조에 채워 둔 필드·계산식·필터와 그날 배치로 계산된 값을 읽어 변동을 확인합니다.",
    },
    {
      title: "외부 요인 찾기",
      detail: "숫자가 변한 날짜 범위를 정하고, 사내에 모아 둔 뉴스에서 그 기간의 기사를 찾습니다.",
    },
    { title: "답변", detail: "변동 수치와 그 기간의 뉴스를 함께 묶어 증감 사유로 답합니다." },
  ],
};
