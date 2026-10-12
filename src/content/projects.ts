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
    tags: ["SAP", "Python", "React", "데이터 클렌징"],
    summary: "SAP 버전 업그레이드에 맞춰 기준정보 6종을 사내 규칙대로 정제하는 데이터 클렌징 플랫폼",
    role:
      "PL을 맡아 설계와 개발을 함께 하고 있습니다. SAP로 관리하는 기준정보(마스터 데이터) 6종을 SAP 버전 업그레이드에 맞춰 정비하기 위해, 회사 내부 규칙에 따라 데이터를 정제하는 클렌징 플랫폼을 Python과 React로 개발하고 있습니다.",
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
      "같은 GraphRAG 기능 위에서 국내 대형 물류 기업 Tableau AI 프로젝트를 만듦",
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
    roleShort: "풀스택 개발",
    tags: ["React", "유사도 분석"],
    summary: "상품·구매 API와 React 쇼핑몰 화면, 유사도 분석 서비스를 구현한 PoC",
    role:
      "풀스택 개발을 맡아 상품·구매 API를 개발하고 React로 쇼핑몰 화면을 구현했습니다. 유사도 분석 서비스도 함께 구현했습니다.",
  },
  {
    slug: "tableau-ai-agent",
    title: "국내 대형 물류 기업 Tableau AI",
    year: "2026",
    org: "디포커스",
    period: "2026.01 – 2026.04",
    roleShort: "AI 아키텍처 설계 · 개발",
    tags: ["AI Agent", "Qdrant", "RAG", "GraphQL", "Tableau"],
    summary: "자연어 질의를 대시보드 인사이트로 바꾸는 Tableau 연동 에이전트",
    problem:
      "대시보드는 이미 있는데 정작 필요한 숫자를 찾으려면 어느 시트를 봐야 하는지부터 알아야 했습니다. Tableau의 메타데이터와 데이터 소스를 에이전트가 이해할 수 있는 형태로 끌어오는 것이 먼저 풀어야 할 문제였습니다.",
    role:
      "AI 아키텍처 설계와 개발을 맡았습니다. Tableau 대시보드와 연동되는 LLM 기반 에이전트 시스템을 설계·구현했고, GraphQL과 REST를 함께 쓰는 하이브리드 방식으로 메타데이터와 데이터 소스를 연동했습니다. Qdrant 기반 벡터 저장소를 구성해 RAG 파이프라인을 설계하고, 자연어 질의에서 대시보드 인사이트를 뽑아내는 에이전트 오케스트레이션을 구현했습니다.",
    result:
      "메타데이터 조회는 GraphQL, 실데이터는 REST로 나눈 하이브리드 연동이 결정적이었습니다. 한쪽만 썼다면 스키마 탐색이나 실데이터 접근 중 하나가 막혔을 구조였습니다.",
  },
  {
    slug: "casino-anomaly-detection",
    title: "국내 대형 카지노 테이블 게임 이상탐지",
    year: "2025",
    org: "디포커스",
    period: "2025.11 – 2026.04",
    roleShort: "모델 설계 · 학습 · 플랫폼 개발",
    tags: ["YOLOv8", "Computer Vision", "ROI 분석", "레이블링 플랫폼"],
    summary: "YOLOv8 파인튜닝과 ROI 공간 분석, 학습 데이터를 위한 레이블링 플랫폼까지 직접 개발",
    problem:
      "테이블 위 행동은 어디에서 일어났는지가 곧 의미입니다. 같은 동작이라도 베팅 영역인지 딜러 영역인지에 따라 정상과 이상이 갈리는데, 일반 객체 탐지만으로는 이 구분이 되지 않았습니다. 게다가 이 도메인의 학습 데이터는 기성 레이블링 도구로 만들 수 있는 형태가 아니었습니다.",
    role:
      "테이블 영역별 행동 이상 탐지를 위해 YOLOv8 모델을 파인튜닝하고, ROI 기반 공간 분석 로직과 탐지 파이프라인을 설계했습니다. 학습 데이터를 만들기 위한 ROI 레이블링 웹 플랫폼도 직접 개발했습니다.",
    result:
      "탐지 결과를 좌표가 아니라 영역 단위 사건으로 해석하게 되면서 모델 출력이 곧바로 운영 규칙에 연결됐습니다. 도메인에 맞는 레이블링 도구를 먼저 만든 것이 데이터 품질을 좌우했습니다.",
  },
  {
    slug: "llm-sentiment-analysis",
    title: "국내 ERP 솔루션 기업 LLM 서비스 감정분석 고도화",
    year: "2025",
    org: "디포커스",
    period: "2025.10 – 2025.12",
    roleShort: "풀스택 개발",
    tags: ["LLM", "감정분석", "비동기 처리"],
    summary: "LLM 서비스에 감정분석 API와 대시보드를 더하고, LLM 호출을 비동기로 처리한 고도화",
    role:
      "풀스택 개발을 맡아 감정분석 API를 개발하고 감정분석 대시보드 화면을 구현했습니다. LLM 호출은 비동기로 처리하도록 구현했습니다.",
  },
  {
    slug: "cobol-java-migration",
    title: "국내 대형 자동차 부품사 COBOL → Java 전환",
    year: "2025",
    org: "디포커스",
    period: "2025.09 – 2025.10",
    roleShort: "백엔드 · 파이프라인 개발",
    tags: ["COBOL", "Java", "AI Agent"],
    summary: "화면 명세서가 없는 COBOL 서비스를 에이전트로 문서화하고, 그 명세를 바탕으로 Java 전환 문서를 만드는 파이프라인",
    problem:
      "고객사는 COBOL로 작성된 서비스를 Java로 옮기려 했지만, 현재 서비스의 화면 명세서가 없었습니다. 무엇을 옮겨야 하는지부터 문서로 정리해야 했고, 고객사는 이 과정을 에이전트로 해 달라고 요청했습니다.",
    role:
      "백엔드를 맡아 두 개의 파이프라인을 개발했습니다. COBOL 소스를 파싱하는 파이프라인으로 COBOL 버전 화면 명세서의 바탕을 만들고, 이 명세서를 Java 버전 문서로 옮기는 변환 자동화 파이프라인을 만들었습니다.",
    result:
      "명세서가 없는 레거시를 코드에서 바로 번역하는 대신, 현재 동작을 문서로 먼저 되살리고 그 문서를 전환의 기준으로 삼았습니다.",
  },
  {
    slug: "tableau-ai-poc",
    title: "국내 대기업 Tableau AI PoC",
    year: "2025",
    org: "디포커스",
    period: "2025.08 – 2025.09",
    roleShort: "풀스택 개발",
    tags: ["LLM", "Tableau VDS API"],
    summary: "그룹사 사내 LLM과 Tableau VDS API를 연동해 질의 결과를 표와 차트로 보여준 PoC",
    role:
      "풀스택 개발을 맡아 그룹사 사내 LLM과 Tableau VDS API를 연동하고, 질의 결과를 표와 차트로 보여주는 화면을 구현했습니다.",
  },
  {
    slug: "logistics-scm-dashboard",
    title: "국내 대형 물류 기업 SCM 대시보드 추가개발",
    year: "2025",
    org: "디포커스",
    period: "2025.02 – 2025.06",
    roleShort: "BI 개발",
    tags: ["BI 대시보드", "SQL"],
    summary: "SCM 사업부 대시보드를 추가로 개발하고 데이터 추출 쿼리를 작성",
    role:
      "BI 개발을 맡아 SCM 사업부 대시보드를 개발하고, 데이터를 추출하는 DB 사용자 지정 쿼리를 작성했습니다.",
  },
  {
    slug: "logistics-external-data",
    title: "국내 대형 물류 기업 외부데이터 자산화",
    year: "2024",
    org: "디포커스",
    period: "2024.11 – 2024.12",
    roleShort: "BI 개발",
    tags: ["시계열 대시보드", "SQL"],
    summary: "외부데이터를 자산화하는 시계열 차트 대시보드와 데이터 추출 쿼리를 개발",
    role:
      "BI 개발을 맡아 시계열 차트 대시보드를 개발하고, 데이터를 추출하는 DB 사용자 지정 쿼리를 작성했습니다.",
  },
  {
    slug: "logistics-risk-tableau",
    title: "국내 대형 물류 기업 리스크 관리 시스템",
    year: "2024",
    org: "디포커스",
    period: "2024.09 – 2025.05",
    roleShort: "데이터 연계 설계 · Tableau 개발",
    tags: ["Tableau", "망분리 아키텍처", "데이터 연계"],
    summary: "망분리 환경의 데이터 연계 아키텍처 설계와 리스크 판단용 대시보드 개발",
    problem:
      "내부 데이터를 클라우드와 연계해야 하는데 망분리 환경이라 일반적인 연결 방식을 쓸 수 없었습니다. 그리고 현업이 원한 것은 수치 조회 화면이 아니라 리스크를 판단할 수 있는 화면이었는데, 요구사항 문서만으로는 그 차이가 드러나지 않았습니다.",
    role:
      "망분리 환경을 전제로 내부 데이터와 클라우드를 잇는 데이터 연계 아키텍처를 설계했습니다. 화면 개발에 앞서 현업 담당자와 직접 미팅하며 단순 수치 조회가 아니라 리스크 판단에 실제로 필요한 인사이트가 무엇인지 도출했고, 그 결과를 기준으로 대시보드를 구성해 Tableau로 직접 개발했습니다.",
    result:
      "요구사항을 그대로 화면으로 옮기는 대신 현업과 판단 기준을 먼저 맞춘 것이 결과를 갈랐습니다. 무엇을 보여줄지가 아니라 무엇을 결정해야 하는지에서 시작하면 화면 구성이 따라옵니다.",
  },
];

/** slug로 프로젝트 하나를 찾는다. 없으면 undefined. */
export function findProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
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

