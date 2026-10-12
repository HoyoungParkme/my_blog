/**
 * 프로젝트 콘텐츠
 *
 * 파일 경로: src/content/projects.ts
 * 목적: 프로젝트 목록과 케이스 스터디 상세에 쓰이는 데이터를 정의한다.
 * 주요 기능: 프로젝트 배열 제공, slug 조회, 이전/다음 탐색
 *
 * 고객사 이름은 쓰지 않는다. 업종과 규모로만 표기한다.
 * 보안서약서의 외부 공표 조항을 확인하기 전까지 실명은 복원하지 않는다.
 *
 * 채워야 할 항목:
 * - flow는 에이전트 프로젝트의 "실행 흐름" 섹션 데이터(src/content/agentFlows.ts). 없으면 섹션이 빠진다.
 * - problem·result는 본인과 같이 쓰기 전인 초안이면 비워 둔다. 비어 있으면 상세에서 그 섹션과 목차 항목이 빠진다.
 *   지어낸 배경이나 "정리 예정" 같은 자리 표시 문구는 넣지 않는다.
 * - tags는 그 프로젝트에서 실제로 쓴 기술(언어·프레임워크·DB·도구) 4~6개만 쓴다.
 *   "AI Agent"·"LLM" 같은 분야 키워드는 summary·tasks 문장에 쓴다.
 * - contribution·tasks·outcomes는 상세 상단 "한눈에 보기" 카드에 쓰인다. 셋 다 없으면 카드가 빠진다.
 *   outcomes에는 사실·규모·변화만 쓰고, 숫자는 실제로 잰 값만 넣는다.
 * - metrics는 실측 수치가 나온 프로젝트에만 넣는다. 없으면 지표 카드가 렌더되지 않는다.
 * - code는 공개 가능한 핵심 스니펫이 준비되면 채운다. 없으면 상세에서 코드 블록이 생략된다.
 * - links(github/demo)는 공개 가능한 저장소나 데모가 있을 때만 채운다.
 */

import { graphragBiFlow, insuranceClaimFlow, type AgentFlow } from "./agentFlows";

/** 케이스 스터디 상단에 노출되는 지표 카드 한 칸. */
export interface ProjectMetric {
  /** 예: "-32%", "1.4초". 실측 전에는 "—". */
  value: string;
  label: string;
}

export interface Project {
  /** 상세 주소(/projects/:slug)에 쓰인다. "contests"는 대회 목록 주소라 쓰지 않는다. */
  slug: string;
  title: string;
  /** 카드 오버라인에 표시되는 대표 연도 */
  year: string;
  /** 소속. 상세 사이드바의 "소속" 행에 표시된다. */
  org: string;
  /** 대회 출품작이면 "contest". 없으면 업무 프로젝트다. Projects 화면에서 묶음을 나누고, About 첫 화면 목록에서는 뺀다. */
  kind?: "contest";
  /** `YYYY.MM – YYYY.MM` 형식. 진행 중이면 `YYYY.MM – 현재`, 투입 전이면 `YYYY.MM 투입 예정`. */
  period: string;
  /** 카드와 사이드바에 쓰이는 짧은 역할 표기 */
  roleShort: string;
  tags: string[];
  /** 목록 카드의 한 줄 요약 */
  summary: string;
  /** 케이스 스터디 "배경과 문제". 같이 쓰기 전이면 비워 둔다. */
  problem?: string;
  /** 케이스 스터디 "내가 한 일" */
  role: string;
  /** "내가 한 일" 아래 핵심 결정 목록(제목 + 이유). 대표 프로젝트만 쓴다. */
  highlights?: { title: string; body: string }[];
  /** 기여 범위. 팀 규모와 맡은 부분 (예: "3명 팀에서 개발 전담") */
  contribution?: string;
  /** 주요 업무. 무엇을 어떻게 했는지 한 줄씩 */
  tasks?: string[];
  /** 결과. 사실·규모·변화를 한 줄씩. 숫자는 실측값만 */
  outcomes?: string[];
  /**
   * 케이스 스터디 마지막 섹션 문단. 같이 쓰기 전이면 비워 둔다.
   * outcomes가 있으면 결과는 카드로 옮기고 여기에는 배운 점만 쓴다(섹션 제목도 "배운 점"이 된다).
   */
  result?: string;
  /** 에이전트가 질문 1건을 처리하는 단계. 상세의 "실행 흐름" 섹션에 쓰인다. */
  flow?: AgentFlow;
  /** 실측 수치. 없으면 상세에서 지표 카드를 띄우지 않는다. */
  metrics?: ProjectMetric[];
  /** 핵심 코드 스니펫. 없으면 코드 블록을 렌더링하지 않는다. */
  code?: string;
  links?: { github?: string; demo?: string; video?: string };
}

export const projects: Project[] = [
  {
    slug: "financial-ad-review-agent",
    title: "국내 대형 지방 금융그룹 AI Agent 개발",
    year: "2026",
    org: "디포커스",
    period: "2026.12 투입 예정",
    roleShort: "광고 심의 Agent 개발",
    tags: ["AI Agent"],
    summary: "업무 케이스별로 여러 Agent를 만드는 프로젝트. 그중 광고 심의 어시스턴트 Agent를 맡을 예정",
    role:
      "업무 케이스별로 여러 Agent를 만드는 프로젝트에서 광고 심의 어시스턴트 Agent를 맡을 예정입니다. 2026년 12월에 투입합니다.",
  },
  {
    slug: "refinery-master-data-cleansing",
    title: "국내 대형 정유사 기준정보 정비",
    year: "2026",
    org: "디포커스",
    period: "2026.10 – 현재",
    roleShort: "PL · 설계 · 개발",
    tags: ["SAP", "Python", "FastAPI", "LangGraph", "React"],
    summary:
      "SAP 버전 업그레이드에 맞춰 기준정보 6종을 사내 규칙대로 검사·정제하는 데이터 클렌징 플랫폼. 규칙으로 가르지 못한 값은 Agent가 검토",
    problem:
      "SAP 버전 업그레이드에 맞춰 기준정보 6종의 테이블을 정비해야 했습니다. 지금까지는 담당자마다 데이터를 하나하나 엑셀로 내려받아 비교·검증해서, 같은 사내 규칙도 사람마다 다르게 적용됐습니다.",
    role:
      "100여 명이 참여하는 기준정보 정비 프로젝트에서 개발자 2명 중 PL을 맡아, 사내 규칙대로 데이터를 정제하는 클렌징 플랫폼을 설계하고 개발하고 있습니다.",
    contribution: "100여 명 규모 프로젝트에서 개발자 2명 중 PL",
    tasks: [
      "문서로만 있던 사내 기준정보 규칙을 시스템이 검사할 수 있는 규칙으로 옮겨 관리",
      "기준정보 데이터에서 규칙 위반과 중복을 자동으로 검출",
      "LoV(값 목록)를 규칙 기반으로 자동 추출·분류하고, 규칙으로 분류되지 않은 값만 Agent가 사내 규칙 기준으로 검토",
      "정제 제안을 담당자가 확인·승인하는 검토 화면 개발",
    ],
    highlights: [
      {
        title: "규칙으로 먼저, Agent는 규칙이 못 가른 것만",
        body: "LoV 추출과 분류는 규칙으로 먼저 처리하고, 규칙으로 분류되지 않은 값만 Agent가 사내 규칙에 적힌 기준으로 검토하게 했습니다. 규칙으로 처리한 결과는 왜 그렇게 나왔는지 설명할 수 있고 비용도 적게 듭니다. Agent는 규칙이 가르지 못한 값에만 씁니다.",
      },
    ],
  },
  {
    slug: "insurance-claim-assistant",
    title: "보험청구심사 어시스턴트",
    year: "2026",
    org: "디포커스 AI 팀",
    kind: "contest",
    period: "2026.05 – 현재",
    roleShort: "설계 · 개발 전반",
    tags: ["Upstage Document Parse", "Solar", "GraphRAG", "Neo4j", "FastAPI"],
    summary: "2026 AI 챔피언 대회 1차 결선 진출작. 약관 원문을 근거로 보험 청구 가능성을 안내하는 RAG 에이전트",
    problem:
      "보험 약관은 길고 어려워 내 사고가 보장되는지 스스로 판단하기 어렵습니다. 보험사 상담에는 보험사 입장이 섞일 수 있고, 일반 AI 챗봇은 근거 없이 된다·안 된다를 단정할 위험이 있습니다.",
    role:
      "약관 문서를 추출해 GraphRAG로 구성하고 챗봇에 연동하는 파이프라인을 중심으로, 화면부터 배포까지 개발을 맡았습니다. 국내 AI 트랙 규정에 맞춰 문서 추출과 추론은 Upstage(Document Parse·Solar)로 구성했습니다.",
    contribution: "3명 팀에서 개발 전담 (기획·시나리오는 팀원)",
    tasks: [
      "Upstage Document Parse로 약관을 제N조·항 단위로 추출·청킹하는 파이프라인 구축",
      "보험사→상품→조→항 계층을 Neo4j 그래프로 적재하고, 벡터·그래프 하이브리드 검색 구현",
      "직접 만든 에이전트 실행기를 LangGraph 워크플로우로 옮겨, 정보 추출 → 되묻기 → 검색 → 판정 단계를 노드로 분리",
      "진단서·영수증 같은 사고 서류에서 Upstage IE로 핵심 정보를 뽑아 대화 입력을 자동으로 채움",
      "채팅 화면 개발과 Azure 배포",
    ],
    // AI Festa 부스 일정 출처: AI CHAMPION 공지 "[AI Festa] 전시 부스 안내" (운영 2026.10.6 ~ 10.8)
    outcomes: [
      "2026 AI 챔피언 대회 국내 AI 트랙 1차 결선 진출 (지원 122팀 중 20팀)",
      "5개 보험사 실손 약관을 추출해 검색 데이터로 적재",
      "AI Festa 전국민 AI 경진대회 특별관 부스에서 시연 (2026.10.6 – 10.8)",
    ],
    highlights: [
      {
        title: "약관을 구조째 추출한다",
        body: "Upstage Document Parse로 본문과 표를 함께 뽑고, 제N조·항 경계를 살려 한 조각을 한 조항으로 잡았습니다. 토큰 길이로 자르면 “단, 다음의 경우는 제외한다” 같은 단서가 다른 조각으로 떨어져 면책 조건이 빠지기 때문입니다.",
      },
      {
        title: "조항 관계를 그래프로 엮는다",
        body: "보험사→상품→판매기간→문서→조→항 계층을 LLM 호출 없이 Neo4j 그래프로 옮겼습니다. 질문과 맞는 조항의 부모·형제 조항까지 함께 찾아, 벡터 검색만으로는 놓치던 맥락을 채웁니다.",
      },
      {
        title: "그래프가 멈춰도 답은 나간다",
        body: "검색 경로를 벡터·그래프·하이브리드 중에서 고를 수 있게 하고, 그래프 DB에 연결되지 않으면 벡터 검색으로 자동 전환해 대화가 끊기지 않게 했습니다.",
      },
      {
        title: "검색된 조항만 근거로 쓴다",
        body: "챗봇이 인용한 조항이 실제 검색 결과에 있는지 교차 확인하고, 근거가 하나도 없으면 판단을 내리지 않게 연동했습니다.",
      },
    ],
    result:
      "가장 크게 배운 것은 개발의 기준을 사용자에게 두는 일입니다. 정보를 자세히 많이 받아 매핑할수록 답은 정확해지지만, 사용자에게는 그 질문들이 과합니다. 그래서 질문이 길어지면 그때까지 받은 정보로 부분 판단을 내리게 하는 식으로, 정확도와 사용자 부담 사이의 중간을 찾았습니다.",
    flow: insuranceClaimFlow,
    links: {
      github: "https://github.com/yonghyun-dev/Insurance-Helper",
      video: "https://www.youtube.com/watch?v=nDu77yEyso8",
    },
  },
  {
    slug: "graphrag-bi-agent",
    title: "GraphRAG 기반 BI 에이전트 플랫폼",
    year: "2026",
    org: "디포커스",
    period: "2026.05 – 현재",
    roleShort: "PL · 설계 · 개발",
    tags: ["GraphRAG", "Neo4j", "LangGraph", "FastAPI", "React", "Tableau"],
    summary:
      "명세서로 데이터 카탈로그와 스키마 그래프를 자동으로 만들고, 자연어 질문을 분석해 차트·보고서로 보여주는 BI 에이전트 플랫폼",
    problem:
      "사내 DB에서 필요한 데이터를 질문 하나로 찾고 바로 차트로 보고 싶었습니다. 검색 방식은 키워드를 맞추는 렉시컬 검색에서 RAG로 넘어왔지만, RAG로도 테이블과 스키마 사이의 관계는 풀리지 않았습니다. 값이 어느 테이블에 있고 무엇과 이어지는지 알아야 정확한 데이터를 꺼낼 수 있었습니다.",
    role:
      "PL로서 전체 구조를 설계하고, 분석을 맡는 에이전트 서버(FastAPI)와 웹 화면(React)을 개발했습니다. 공개 API와 업무 기반(Spring)은 동료가 맡았습니다.",
    contribution: "2명 팀 PL — 설계와 에이전트 서버·웹 화면 담당 (공개 API 서버는 동료)",
    tasks: [
      "ERD 이미지·정의서 엑셀을 멀티모달 에이전트가 읽어 데이터 카탈로그 초안을 자동으로 채우는 기능 구축",
      "카탈로그로 Neo4j 스키마 그래프(GraphRAG)를 자동 생성",
      "컬럼 이름·설명·실제 값을 비교해 테이블 관계를 추천하고, 운영자가 승인하면 그래프에 더하는 흐름 구현",
      "자연어 질문을 카탈로그·그래프 문맥으로 SQL로 바꿔 실행·분석하는 LangGraph 에이전트 서버(FastAPI) 개발",
      "분석 결과를 차트·보고서로 보여주는 React 웹 화면 개발과 Tableau 연동",
    ],
    outcomes: [
      "카탈로그 → GraphRAG → 자연어 분석 → 차트·보고서까지 1단계 핵심 기능 구현",
      "Tableau 연동 완료, SAP 연동 진행 중",
      "국내 대형 물류 기업 Tableau AI 경험을 바탕으로 만들어, 그 Tableau AI에 GraphRAG 기능으로 붙임",
      "고객사 데모·제안에 사용",
    ],
    highlights: [
      {
        title: "사람에게는 데이터에 없는 것만 묻는다",
        body: "카탈로그 초안은 ERD 이미지와 정의서 엑셀을 멀티모달 에이전트가 읽어 자동으로 채우고, 고유성·카디널리티처럼 데이터에서 잴 수 있는 성질은 시스템이 직접 잽니다. 사람이 적는 항목이 늘수록 카탈로그는 비어 가고, 잘못 적은 값이 그대로 오답이 되기 때문입니다. 사람은 업무 용어·지표 정의·코드 의미처럼 데이터에 없는 지식만 검토합니다.",
      },
      {
        title: "관계는 이름으로 찾고 값으로 확인한다",
        body: "컬럼 이름이 같아도 코드 체계가 다른 경우(상태 코드)가 있고, 값이 겹쳐도 조인 키가 아닌 경우(생년월일)가 있었습니다. 그래서 이름·의미 유사도로 후보를 넓히고, 날짜·지표 컬럼은 역할로 먼저 거른 뒤, 실제 값이 겹치는지를 최종 근거로 삼았습니다.",
      },
    ],
    result:
      "가장 크게 배운 것은 GraphRAG를 사람이 손으로 채우지 않아도 된다는 점입니다. 에이전트가 데이터 사전(DD) 같은 명세서를 읽어 데이터 카탈로그를 만들고, 그 카탈로그로 구조화된 노드 계층을 세운 뒤, “이 컬럼과 저 컬럼은 같은 것을 가리키니 묶자”는 관계까지 스스로 추천하게 하면 그래프 구성 자체를 자동으로 돌릴 수 있었습니다.",
    flow: graphragBiFlow,
  },
  {
    slug: "commerce-mall-poc",
    title: "국내 대형 IT 서비스 기업 쇼핑몰 PoC",
    year: "2026",
    org: "디포커스",
    period: "2026.04 – 2026.05",
    roleShort: "풀스택 · AI 기능 개발",
    tags: ["FastAPI", "PostgreSQL", "pgvector", "React", "OpenAI", "CLIP"],
    summary:
      "사내 쇼핑몰처럼 상품을 고르면 구매요청서부터 견적·발주까지 이어지는 B2B 구매 포털 PoC. AI 기능 개발 담당",
    problem:
      "회사에서 사무 비품·소모품을 살 때 쇼핑몰처럼 고르고, 구매요청서 작성부터 결재·견적·발주·입고까지 한 포털에서 처리하는 간접재 구매 포털의 프로토타입을 만드는 프로젝트였습니다.",
    role:
      "3명 팀에서 백엔드와 프론트엔드를 개발했고, 그중 AI 기능을 맡았습니다.",
    contribution: "3명 팀에서 백엔드·프론트 개발, AI 기능 전담",
    tasks: [
      "상품 검색부터 구매요청서 결재, 구매 주문, 견적 요청까지 이어지는 API와 화면 개발 (FastAPI·React)",
      "자연어로 상품을 찾는 멀티턴 AI 챗봇 개발",
      "신규 상품 등록 요청 때 텍스트(pgvector)·이미지(CLIP) 유사도로 기존 상품과 중복을 검토",
      "승인된 구매요청으로 견적 요청서 초안을 쓰고, 제출된 단가를 과거 낙찰가와 비교해 적정성을 판단하는 견적 AI 개발",
      "구매요청서의 요청 목적·정책 안내 문구를 LLM이 자동으로 채우는 기능 개발",
    ],
    outcomes: [
      "PoC가 본사업으로 이어짐",
    ],
    result:
      "AI 기능 자체는 이미 충분히 만들 수 있었습니다. 중요한 것은 사용자가 실제로 필요로 하는 지점에 맞춰 AI 기술을 고르고 넣는 일이었습니다.",
  },
  {
    slug: "tableau-ai-agent",
    title: "국내 대형 물류 기업 Tableau AI",
    year: "2026",
    org: "디포커스",
    period: "2026.01 – 2026.04",
    roleShort: "AI 아키텍처 설계 · 개발",
    tags: ["FastAPI", "LangGraph", "pgvector", "GraphQL", "Tableau", "React"],
    summary:
      "자연어 질의를 대시보드 인사이트로 바꾸는 Tableau 연동 에이전트",
    problem:
      "대시보드는 이미 있는데 정작 필요한 숫자를 찾으려면 어느 시트를 봐야 하는지부터 알아야 했습니다. Tableau의 메타데이터와 데이터 소스를 에이전트가 이해할 수 있는 형태로 끌어오는 것이 먼저 풀어야 할 문제였습니다.",
    role:
      "Tableau 대시보드와 연동되는 LLM 에이전트를 혼자 설계하고 개발했습니다.",
    contribution: "1인 개발 (설계부터 개발까지 전담)",
    tasks: [
      "Tableau 메타데이터는 GraphQL, 실데이터는 REST로 가져오는 하이브리드 연동 구현",
      "pgvector 벡터 검색과 GraphRAG로 질문에 맞는 대시보드·데이터 소스를 찾는 검색 파이프라인 구성",
      "자연어 질문에서 대시보드 인사이트를 뽑는 LangGraph 에이전트를 FastAPI 서버로 구현",
      "질의와 결과를 보여주는 React 화면 개발",
    ],
    outcomes: [
      "후속 사업으로 이어짐 (2026.12 착수 예정)",
    ],
    highlights: [
      {
        title: "메타데이터는 GraphQL, 실데이터는 REST",
        body: "Tableau의 대시보드·시트·데이터 소스 구조는 GraphQL로, 실제 값은 REST로 가져오도록 나눴습니다. 한쪽만 썼다면 스키마 탐색이나 실데이터 접근 중 하나가 막혔을 구조였습니다.",
      },
    ],
    result:
      "이 프로젝트에서 정리한 GraphRAG 접근을 한 고객사에 묶어 두지 않고, 범용 BI 에이전트 플랫폼으로 따로 개발해 다시 이 Tableau AI에 붙였습니다. 한 프로젝트를 위해 만든 기능도 구조를 떼어 두면 다른 곳에 다시 쓰는 제품이 될 수 있다는 것을 배웠습니다.",
  },
  {
    slug: "casino-anomaly-detection",
    title: "국내 대형 카지노 테이블 게임 이상탐지",
    year: "2025",
    org: "디포커스",
    period: "2025.11 – 2026.04",
    roleShort: "모델 설계 · 학습 · 플랫폼 개발",
    tags: ["YOLOv8", "Python", "PyTorch", "OpenCV", "FastAPI", "React"],
    summary: "YOLOv8 파인튜닝과 ROI 공간 분석, 학습 데이터를 위한 레이블링 플랫폼까지 혼자 개발",
    problem:
      "테이블 위 행동은 어디에서 일어났는지가 곧 의미입니다. 같은 동작이라도 베팅 영역인지 딜러 영역인지에 따라 정상과 이상이 갈리는데, 일반 객체 탐지만으로는 이 구분이 되지 않았습니다. 게다가 이 도메인의 학습 데이터는 기성 레이블링 도구로 만들 수 있는 형태가 아니었습니다.",
    role:
      "테이블 영역별 행동 이상 탐지를 위해 모델 학습부터 탐지 파이프라인, 학습 데이터를 만드는 레이블링 플랫폼까지 혼자 개발했습니다.",
    contribution: "1인 개발 (레이블링은 내부 인력 6명이 이 플랫폼으로 진행)",
    tasks: [
      "테이블 위 객체와 행동을 잡도록 YOLOv8 파인튜닝",
      "탐지 좌표를 베팅·딜러 영역(ROI) 단위 사건으로 해석하는 공간 분석 로직 개발",
      "영상 입력 → 탐지 → 이상 판단 → 알림으로 이어지는 탐지 파이프라인 구축",
      "테이블 영역과 행동을 함께 표시하는 ROI 레이블링 웹 플랫폼 개발",
    ],
    outcomes: [
      "내부 인력 6명이 이 레이블링 플랫폼으로 학습 데이터 제작",
      "고객사 시연·검수 완료",
      "고객사 대표이사 지시로 DX팀과 도입 협의까지 진행했으나, 비용 문제로 도입은 보류",
    ],
    highlights: [
      {
        title: "좌표가 아니라 영역 사건으로 본다",
        body: "탐지된 좌표를 베팅 영역·딜러 영역 같은 테이블 영역(ROI)에 대응시켜 “어느 영역에서 무슨 일이 일어났나”로 해석했습니다. 같은 동작도 영역에 따라 정상과 이상이 갈리기 때문입니다. 덕분에 모델 출력이 운영 규칙에 바로 연결됐습니다.",
      },
    ],
    result:
      "영상 속 이상 행동은 정상 장면에 비해 표본이 턱없이 적어, 일반적인 지도학습만으로는 한계가 있었습니다. 공간 분석이나 Agent로 보완할 수 있지만 비용도 무시할 수 없었습니다. 그래서 같은 탐지 결과라도 상황에 따라 나눠 판단할 수 있게 구조를 잡는 것이 중요하다는 것을 배웠습니다.",
  },
  {
    slug: "llm-sentiment-analysis",
    title: "국내 ERP 솔루션 기업 LLM 서비스 감정분석 고도화",
    year: "2025",
    org: "디포커스",
    period: "2025.10 – 2025.12",
    roleShort: "풀스택 개발",
    tags: ["Python", "Django", "Vanilla JS", "OpenAI"],
    summary:
      "고객 문의·상담 내용의 감정을 LLM으로 분석하는 API와 대시보드를 기존 LLM 서비스에 더한 고도화",
    role:
      "2명 팀에서 풀스택 개발을 맡아, 고객 문의·상담 감정분석 API와 대시보드를 만들고 LLM 호출을 비동기로 처리했습니다.",
    contribution: "2명 팀에서 풀스택 개발",
    tasks: [
      "고객 문의·상담 내용의 감정을 LLM으로 분석하는 감정분석 API 개발 (Django)",
      "감정분석 결과를 보여주는 대시보드 화면 개발",
      "LLM 호출을 비동기로 처리해 서비스 응답과 분리",
    ],
    outcomes: [
      "고객사 LLM 서비스에 반영돼 운영",
    ],
  },
  {
    slug: "cobol-java-migration",
    title: "국내 대형 자동차 부품사 COBOL → Java 전환",
    year: "2025",
    org: "디포커스",
    period: "2025.09 – 2025.10",
    roleShort: "백엔드 · 파이프라인 개발",
    tags: ["COBOL", "Java", "Python", "Neo4j", "LangGraph", "FastAPI"],
    summary:
      "화면 명세서가 없는 COBOL 서비스를 에이전트로 문서화하고, 그 명세를 바탕으로 Java 전환 문서를 만드는 파이프라인",
    problem:
      "고객사는 COBOL로 작성된 서비스를 Java로 옮기려 했지만, 현재 서비스의 화면 명세서가 없었습니다. 무엇을 옮겨야 하는지부터 문서로 정리해야 했고, 고객사는 이 과정을 에이전트로 해 달라고 요청했습니다.",
    role:
      "3명 팀에서 백엔드를 맡아, COBOL 소스를 문서로 되살리고 그 문서를 Java 전환 문서로 옮기는 두 파이프라인을 개발했습니다.",
    contribution: "3명 팀에서 백엔드(파이프라인) 개발",
    tasks: [
      "COBOL 소스를 파싱하는 파이프라인 개발",
      "프로그램·사본(copybook)·화면 같은 COBOL 구성 요소의 관계를 Neo4j 그래프(GraphRAG)로 구성",
      "파싱 결과와 그래프를 바탕으로 에이전트(LangGraph)가 COBOL 화면 명세서를 작성하는 흐름 구현",
      "COBOL 명세서를 Java 버전 문서로 옮기는 변환 자동화 파이프라인 개발",
    ],
    outcomes: [
      "고객사 시연·검수 완료",
    ],
    highlights: [
      {
        title: "코드보다 문서를 먼저 되살린다",
        body: "명세서가 없는 레거시를 코드에서 바로 번역하는 대신, 현재 동작을 화면 명세서로 먼저 되살리고 그 문서를 전환의 기준으로 삼았습니다. 무엇을 옮겨야 하는지부터 문서로 합의해야 했기 때문입니다.",
      },
    ],
  },
  {
    slug: "tableau-ai-poc",
    title: "국내 대기업 Tableau AI PoC",
    year: "2025",
    org: "디포커스",
    period: "2025.08 – 2025.09",
    roleShort: "풀스택 개발",
    tags: ["Java", "Spring Boot", "Vue 2", "Python", "FastAPI", "Tableau VDS API"],
    summary:
      "그룹사 사내 LLM과 Tableau VDS API를 연동해 질의 결과를 표와 차트로 보여준 PoC",
    role:
      "혼자 풀스택으로 개발해, 그룹사 사내 LLM과 Tableau VDS API를 연동하고 질의 결과를 표와 차트로 보여주는 화면을 만들었습니다.",
    contribution: "1인 개발",
    tasks: [
      "그룹사 사내 LLM과 Tableau VDS API를 연동해 질의 결과를 가져오는 서버 개발 (Spring Boot·FastAPI)",
      "질의 결과를 표와 차트로 보여주는 화면 개발 (Vue 2)",
    ],
    outcomes: [
      "고객사 시연 완료",
    ],
  },
  {
    slug: "logistics-risk-tableau",
    title: "국내 대형 물류 기업 리스크 관리·BI 대시보드",
    year: "2024",
    org: "디포커스",
    period: "2024.09 – 2025.06",
    roleShort: "데이터 연계 설계 · BI 개발 · DB 작업",
    tags: ["Tableau", "SQL"],
    summary:
      "망분리 환경의 데이터 연계 설계부터 리스크 판단 대시보드, 외부데이터·SCM 대시보드와 데이터 추출 쿼리까지 맡은 데이터·BI 구축",
    problem:
      "내부 데이터를 클라우드와 연계해야 하는데 망분리 환경이라 일반적인 연결 방식을 쓸 수 없었습니다. 그리고 현업이 원한 것은 수치 조회 화면이 아니라 리스크를 판단할 수 있는 화면이었는데, 요구사항 문서만으로는 그 차이가 드러나지 않았습니다.",
    role:
      "3명 팀에서 BI 개발과 DB 작업을 맡아, 리스크 관리 시스템을 시작으로 외부데이터 자산화와 SCM 대시보드 추가 개발까지 이어서 진행했습니다.",
    contribution: "3명 팀에서 BI 개발과 DB 작업 담당",
    tasks: [
      "망분리 환경에서 내부 데이터와 클라우드를 잇는 데이터 연계 아키텍처 설계",
      "현업 미팅으로 리스크 판단에 필요한 지표를 도출하고 Tableau 리스크 대시보드 개발",
      "외부데이터를 자산화하는 시계열 차트 대시보드 개발",
      "SCM 사업부 대시보드 추가 개발",
      "Tableau 대시보드 운영·유지보수",
      "대시보드용 데이터 추출 쿼리(DB 사용자 지정 쿼리) 작성",
    ],
    outcomes: [
      "현업이 대시보드를 운영에 사용",
      "리스크 관리 이후 외부데이터 자산화·SCM 대시보드 추가 개발로 이어짐",
      "이 고객사와의 BI 작업이 2026년 Tableau AI 프로젝트로 이어짐",
    ],
    highlights: [
      {
        title: "무엇을 보여줄지보다 무엇을 결정해야 하는지에서 시작한다",
        body: "요구사항을 그대로 화면으로 옮기는 대신, 현업과 직접 만나 리스크를 판단하는 기준부터 맞췄습니다. 현업이 원한 것은 수치 조회 화면이 아니라 리스크를 판단할 수 있는 화면이었고, 판단 기준이 정해지자 화면 구성이 따라왔습니다.",
      },
    ],
  },
];

/** slug로 프로젝트 하나를 찾는다. 없으면 undefined. */
export function findProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** 투입 전인 프로젝트인지. 기간이 `YYYY.MM 투입 예정`이면 아직 경력이 아니다. */
export function isPlanned(project: Project): boolean {
  return project.period.includes("예정");
}

/** 업무 프로젝트(대회 출품작 제외). 배열 순서(최신순)를 따른다. */
export const workProjects = projects.filter((project) => project.kind !== "contest");

/** 대회 출품작. 배열 순서(최신순)를 따른다. */
export const contestProjects = projects.filter((project) => project.kind === "contest");

/**
 * 상세 페이지의 이전/다음 프로젝트를 찾는다.
 * 같은 묶음(업무 프로젝트 또는 대회) 안에서 목록 순서를 따르며, 양 끝에서는 해당 방향이 undefined다.
 */
export function findProjectNeighbors(slug: string): {
  prev?: Project;
  next?: Project;
} {
  const group = findProject(slug)?.kind === "contest" ? contestProjects : workProjects;
  const index = group.findIndex((project) => project.slug === slug);
  if (index === -1) return {};
  return { prev: group[index - 1], next: group[index + 1] };
}

