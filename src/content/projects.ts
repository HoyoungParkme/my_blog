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

import { insuranceClaimFlow, type AgentFlow } from "./agentFlows";

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
    slug: "refinery-master-data-cleansing",
    title: "국내 대형 정유사 SAP 기준정보 정비 클렌징 플랫폼",
    year: "2026",
    org: "디포커스",
    period: "2026.10 – 현재",
    roleShort: "설계 · 개발",
    tags: ["SAP", "Python", "FastAPI", "LangGraph", "React"],
    summary:
      "엑셀로 하던 SAP 기준정보 6종 검증을 사내 규칙의 시스템 검사로 옮기는 클렌징 플랫폼. 규칙으로 가르지 못한 값은 Agent가 검토",
    problem:
      "SAP 버전 업그레이드에 맞춰 기준정보 6종의 테이블을 정비해야 했습니다. 지금까지는 담당자마다 데이터를 하나하나 엑셀로 내려받아 비교·검증해서, 같은 사내 규칙도 사람마다 다르게 적용됐습니다.",
    role:
      "100여 명이 참여하는 기준정보 정비 프로젝트에서 개발자 2명 중 한 명으로, 사내 규칙대로 데이터를 정제하는 클렌징 플랫폼을 설계하고 개발하고 있습니다.",
    contribution: "100여 명 규모 프로젝트에서 개발자 2명 중 1명",
    tasks: [
      "문서로만 있던 사내 기준정보 규칙을 시스템이 검사할 수 있는 규칙으로 옮겨 관리",
      "기준정보 데이터에서 규칙 위반과 중복을 자동으로 검출",
      "LoV(값 목록)를 규칙 기반으로 자동 추출·분류하고, 규칙으로 분류되지 않은 값만 Agent가 사내 규칙 기준으로 검토",
      "OneDrive 공유·엑셀로 일하던 흐름을 플랫폼에 연결하고, 엑셀 가져오기·내보내기와 담당자 승인 화면 개발",
    ],
    highlights: [
      {
        title: "규칙으로 먼저, Agent는 규칙이 못 가른 것만",
        body: "LoV 추출과 분류는 규칙으로 먼저 처리하고, 규칙으로 분류되지 않은 값만 Agent가 사내 규칙에 적힌 기준으로 검토하게 했습니다. 규칙으로 처리한 결과는 왜 그렇게 나왔는지 설명할 수 있고 비용도 적게 듭니다. Agent는 규칙이 가르지 못한 값에만 씁니다.",
      },
      {
        title: "현업이 일하던 방식은 바꾸지 않는다",
        body: "담당자들은 OneDrive로 엑셀 파일을 주고받으며 기준정보를 검증하고 있었습니다. 이 흐름은 그대로 두고 플랫폼에 엑셀 가져오기·내보내기를 붙여, 일하는 방식은 그대로 둔 채 검사만 시스템으로 옮겼습니다.",
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
    // AI Festa 부스 일정·결선 진행 상황 출처: 본인 이력서(2026.11). 예전 값(2026.10.6 ~ 10.8)은 이력서 기준으로 고쳤다.
    outcomes: [
      "2026 AI 챔피언 대회 국내 AI 트랙 1차 결선 진출 (지원 122팀 중 20팀), 11월 결선 진행 중",
      "5개 보험사 실손 약관을 추출해 검색 데이터로 적재",
      "AI Festa 특별관 부스에서 시연 (2026.11.3 – 11.5)",
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
    slug: "tableau-ai-agent",
    title: "대시보드 증감 사유 분석 Tableau AI 에이전트",
    year: "2026",
    org: "디포커스",
    period: "2025.08 – 2026.09",
    roleShort: "PoC·연구 설계 · 개발",
    tags: ["Tableau", "langchain_tableau", "LangGraph", "PostgreSQL", "pgvector", "FastAPI"],
    summary:
      "대시보드 숫자가 왜 오르고 내렸는지 자연어로 묻는 Tableau AI 에이전트. PoC 2건과 사내 연구를 거쳐 본 프로젝트로 확정",
    problem:
      "현업은 대시보드 숫자가 왜 바뀌었는지를 엑셀로 따로 정리해 공유하고 있었습니다. 이 일을 AI에게 맡기려 하자, 사람은 화면을 보고 묻는데 AI는 데이터 소스만 본다는 간극이 드러났습니다. 화면에 보이는 숫자나 여러 데이터에 걸친 질문에 답하려면 대시보드의 구조부터 AI가 알아야 했습니다.",
    role:
      "PoC 2건을 혼자 설계·개발하고, 그 결과를 사내 연구로 이어 가 본 프로젝트 착수까지 연결했습니다. 본 프로젝트에서는 에이전트 파트를 맡습니다.",
    contribution: "PoC 2건 1인 설계·개발, 사내 연구 2명, 본 프로젝트 에이전트 파트",
    tasks: [
      "PoC① 대기업 그룹사(2025.08 – 09): 사내 LLM과 langchain_tableau로 대시보드 질의 챗봇을 만들고, 데이터 소스마다 tool을 만드는 구조로는 화면 숫자·여러 데이터에 걸친 질문을 풀 수 없다는 한계 확인",
      "PoC② 대형 물류 기업(2026.01 – 03): Tableau MCP 대신 Metadata API·REST로 대시보드 구조와 값을 하루 1회 적재",
      "Qdrant 대신 고객사가 이미 쓰는 PostgreSQL에 pgvector로 검색을 통일하고, LangGraph(ReAct) 에이전트 구현",
      "사내 연구(2026.06 – 09, 2명): GraphRAG·멀티모달·워크북 XML 세 방식을 비교해 워크북 XML 구조 적재를 채택",
    ],
    outcomes: [
      "PoC② 고객사 임원 검토 통과, 사내 연구로 연결",
      "본 프로젝트 착수 확정 (2026.12 – 2027.02), 목표는 증감 사유 분석 자동화",
    ],
    highlights: [
      {
        title: "새 인프라 대신 고객사가 이미 쓰는 것 위에",
        body: "Tableau MCP나 별도 벡터 DB(Qdrant)를 새로 들이는 대신, 고객사가 허용한 LLM과 이미 쓰는 PostgreSQL(pgvector)로 구성하고 데이터는 고객사 배치 주기에 맞춰 하루 1회 적재했습니다. 새 인프라를 깔지 않았기 때문에 고객사가 받아들일 수 있었습니다.",
      },
      {
        title: "구조는 Metadata API, 값은 REST",
        body: "대시보드·시트·데이터 소스 구조는 Metadata API(GraphQL)로, 실제 값은 REST로 가져오도록 나눴습니다. 한쪽만 썼다면 구조 탐색이나 실데이터 접근 중 하나가 막혔을 구조였습니다.",
      },
    ],
  },
  {
    slug: "commerce-mall-poc",
    title: "국내 대형 IT 서비스 기업 B2B 구매 포털 PoC",
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
    slug: "casino-anomaly-detection",
    title: "국내 대형 카지노 테이블 게임 이상탐지",
    year: "2025",
    org: "디포커스",
    period: "2025.11 – 2026.01",
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
      "개발 완료 후 고객사 시연·검수 (2026.04까지)",
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
    title: "자사 LLM 챗봇 서비스(ERP 탑재) 유지보수·고도화",
    year: "2025",
    org: "디포커스",
    period: "2025.08 – 2025.12",
    roleShort: "유지보수 · 추가 개발",
    tags: ["Python", "Django", "PostgreSQL", "pgbouncer", "OpenAI"],
    summary:
      "ERP에 가젯으로 들어간 자사 LLM 챗봇의 백엔드를 넘겨받아, 반복 장애의 원인을 고치고 감정분석 기능을 고도화",
    role:
      "ERP 가젯형 LLM 챗봇의 백엔드를 인수해 유지보수하면서, 반복되던 장애를 해결하고 3명 팀에서 감정분석 API·대시보드 고도화를 맡았습니다. 2025.12 이후로도 유지보수를 이어 가고 있습니다.",
    contribution: "백엔드 유지보수 담당, 감정분석 고도화는 3명 팀",
    tasks: [
      "ERP 가젯형 LLM 챗봇 백엔드를 인수해 유지보수",
      "컨테이너가 반복해서 교체되던 장애의 원인(DB 커넥션 풀 고갈)을 찾아, pgbouncer 도입과 컨테이너 분리로 해결",
      "고객 문의·상담 감정분석 API와 대시보드 고도화 (2025.10 – 12, Django)",
      "LLM 호출을 비동기로 처리해 서비스 응답과 분리",
    ],
    outcomes: [
      "감정분석 고도화가 서비스에 반영돼 운영",
      "2025.12 이후에도 유지보수 계속",
    ],
    highlights: [
      {
        title: "재시작으로 넘기지 않고 원인을 찾는다",
        body: "컨테이너가 반복해서 교체되는 장애를 재시작으로 넘기지 않고 추적해, DB 커넥션 풀이 고갈되는 것이 원인임을 확인했습니다. pgbouncer로 커넥션을 모으고 컨테이너를 나눠 해결했습니다.",
      },
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
      "증감 사유를 엑셀로 작성·공유하던 운영에서 AI 분석 자동화 니즈를 확인해, 2026년 Tableau AI 에이전트로 이어짐",
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

