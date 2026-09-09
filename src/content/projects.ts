/**
 * 프로젝트 콘텐츠
 *
 * 파일 경로: src/content/projects.ts
 * 목적: 프로젝트 목록과 케이스 스터디 상세에 쓰이는 데이터를 정의한다.
 * 주요 기능: 프로젝트 배열 제공, slug 조회, 이전/다음 탐색
 *
 * 채워야 할 항목:
 * - metrics의 value는 실측 수치로 교체해야 한다. 현재는 모두 자리표시자("—")다.
 * - code는 공개 가능한 핵심 스니펫이 준비되면 채운다. 없으면 상세에서 코드 블록이 생략된다.
 * - links(github/demo)는 공개 가능한 저장소나 데모가 있을 때만 채운다.
 */

/** 케이스 스터디 상단에 노출되는 지표 카드 한 칸. */
export interface ProjectMetric {
  /** 예: "-32%", "1.4초". 실측 전에는 "—". */
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  /** 카드 오버라인에 표시되는 대표 연도 */
  year: string;
  /** 소속. "디포커스"면 회사 프로젝트, 그 외는 개인 프로젝트로 분류된다. */
  org: string;
  /** `YYYY.MM — YYYY.MM` 형식. 진행 중이면 `YYYY.MM — 현재`. */
  period: string;
  /** 카드와 사이드바에 쓰이는 짧은 역할 표기 */
  roleShort: string;
  tags: string[];
  /** 목록 카드의 한 줄 요약 */
  summary: string;
  /**
   * Home의 Featured 카드에 들어가는 문제/역할/결과 한 줄 요약.
   * 상세의 problem/role/result는 서술형이라 카드에 그대로 넣으면 비율이 무너진다.
   */
  brief: { problem: string; role: string; result: string };
  /** 케이스 스터디 "배경과 문제" */
  problem: string;
  /** 케이스 스터디 "내가 한 일" */
  role: string;
  /** 케이스 스터디 "결과와 배운 점" */
  result: string;
  metrics: ProjectMetric[];
  /** 핵심 코드 스니펫. 없으면 코드 블록을 렌더링하지 않는다. */
  code?: string;
  /** Home 대표 프로젝트로 노출할지 여부. 첫 번째 featured 하나만 사용된다. */
  featured?: boolean;
  links?: { github?: string; demo?: string };
}

const PLACEHOLDER_METRICS: ProjectMetric[] = [
  { value: "—", label: "지표 1" },
  { value: "—", label: "지표 2" },
  { value: "—", label: "지표 3" },
];

export const projects: Project[] = [
  {
    slug: "insurance-claim-agent",
    title: "뉴럴-심볼릭 기반 보험청구 심사 어시스턴트 에이전트",
    year: "2026",
    org: "디포커스",
    period: "2026.03 — 현재",
    roleShort: "아키텍처 설계 · 개발",
    tags: ["GraphRAG", "RAG", "Neural-Symbolic", "LLM", "마이데이터"],
    summary: "GraphRAG 이중 구조와 심볼릭 규칙으로 LLM 환각을 최소화한 보험청구 심사 어시스턴트",
    brief: {
      problem:
        "약관이 상품을 가로질러 얽혀 있어 단순 검색으로는 근거를 모으기 어렵고, LLM 단독 판단은 근거 없는 결론을 냅니다.",
      role:
        "약관을 GraphRAG + RAG 이중 구조로 적재하고, LLM 추론과 규칙 기반 판단을 결합한 하이브리드 구조를 설계·개발했습니다.",
      result:
        "심사 로직을 심볼릭 규칙으로 명시화해 환각을 줄이고, 판단 근거를 사후 검증 가능한 형태로 남겼습니다.",
    },
    problem:
      "보험 약관은 특약과 담보가 상품을 가로질러 얽혀 있어 단순 벡터 검색만으로는 판단 근거를 모으기 어렵습니다. 게다가 청구 심사는 지급 여부라는 확정적인 결론을 내야 하는 영역이라, LLM 추론에만 맡기면 근거 없는 답이 그대로 결론이 되어버립니다.",
    role:
      "아키텍처 설계와 개발을 맡았습니다. 각 보험사 상품 약관을 GraphRAG와 일반 RAG의 이중 구조로 적재해 상품 간 관계 탐색이 가능하도록 했고, 뉴럴(LLM 추론)과 심볼릭(규칙 기반 판단)을 결합한 하이브리드 구조를 설계했습니다. 마이데이터 API 연동을 가정한 가입 보험 자동 조회와 상품별 맞춤 검색, 채팅 질의를 받아 보험금 수령 가능성을 판단하는 기능을 구현했습니다.",
    result:
      "청구 심사 로직을 심볼릭 규칙으로 명시화해 LLM이 지급 여부를 임의로 추론하지 않도록 경계를 그었습니다. 판단의 근거가 규칙과 검색 결과로 남기 때문에 결과를 사후에 검증할 수 있습니다. (실측 수치 정리 예정)",
    metrics: PLACEHOLDER_METRICS,
    featured: true,
  },
  {
    slug: "procurement-ai",
    title: "국내 대형 SI기업 간접재 구매 플랫폼 AI 개발",
    year: "2026",
    org: "디포커스",
    period: "2026.04 — 2026.06",
    roleShort: "서비스 설계 · AI 기능 개발",
    tags: ["RAG", "추천 챗봇", "LLM", "유사상품 검색"],
    summary: "구매 요청 자동완성·추천 챗봇·유사상품 검색으로 중복 구매를 막은 간접재 구매 플랫폼",
    brief: {
      problem:
        "요청부서는 구매 양식 작성이 부담이었고, 구매부서는 중복 구매와 가격 적정성을 판단할 근거가 없었습니다.",
      role:
        "세 사용자 유형 기준으로 서비스를 설계하고, PR 자동완성·추천 챗봇·RAG 유사상품 검색을 개발했습니다.",
      result:
        "경험에 의존하던 구매 판단을 과거 데이터와 검색 근거 위에서 하도록 바꿨습니다.",
    },
    problem:
      "요청부서·구매부서·협력사가 각자 다른 목적으로 같은 플랫폼을 쓰는 구조였습니다. 요청부서는 구매 양식 작성 자체가 부담이었고, 구매부서는 이미 사놓은 물건을 다시 사거나 지금 받은 견적이 적정한지 판단할 근거가 없었습니다.",
    role:
      "세 사용자 유형을 기준으로 서비스 구조를 설계하고 AI 기능을 개발했습니다. 구매 요청(PR) 생성 시 AI가 구매 양식을 자동완성하도록 했고, 사용자 요구를 받아 상품을 추천하는 챗봇을 설계·구현했습니다. 구매부서용으로는 RAG 기반 유사상품 검색을 붙여 중복 구매를 걸러내고, 과거 유사 견적을 검색해 현재 가격의 적정성을 판단하는 기능을 만들었습니다.",
    result:
      "구매 요청 작성과 검토가 각각 사람이 하던 판단을 검색 근거 위에서 하도록 바뀌었습니다. 중복 구매와 가격 적정성처럼 원래 담당자의 경험에 의존하던 판단에 과거 데이터를 붙인 것이 핵심이었습니다. (실측 수치 정리 예정)",
    metrics: PLACEHOLDER_METRICS,
  },
  {
    slug: "tableau-ai-agent",
    title: "국내 대형 물류 기업 Tableau AI Agent",
    year: "2026",
    org: "디포커스",
    period: "2026.01 — 2026.04",
    roleShort: "AI 아키텍처 설계 · 개발",
    tags: ["AI Agent", "Qdrant", "RAG", "GraphQL", "Tableau"],
    summary: "자연어 질의를 대시보드 인사이트로 바꾸는 Tableau 연동 에이전트",
    brief: {
      problem:
        "대시보드는 있는데 필요한 숫자를 찾으려면 어느 시트를 봐야 하는지부터 알아야 했습니다.",
      role:
        "GraphQL·REST 하이브리드로 Tableau를 연동하고, Qdrant 기반 RAG와 에이전트 오케스트레이션을 구현했습니다.",
      result:
        "자연어 질의만으로 대시보드 인사이트를 얻을 수 있게 됐습니다.",
    },
    problem:
      "대시보드는 이미 있는데 정작 필요한 숫자를 찾으려면 어느 시트를 봐야 하는지부터 알아야 했습니다. Tableau의 메타데이터와 데이터 소스를 에이전트가 이해할 수 있는 형태로 끌어오는 것이 먼저 풀어야 할 문제였습니다.",
    role:
      "AI 아키텍처 설계와 개발을 맡았습니다. Tableau 대시보드와 연동되는 LLM 기반 에이전트 시스템을 설계·구현했고, GraphQL과 REST를 함께 쓰는 하이브리드 방식으로 메타데이터와 데이터 소스를 연동했습니다. Qdrant 기반 벡터 저장소를 구성해 RAG 파이프라인을 설계하고, 자연어 질의에서 대시보드 인사이트를 뽑아내는 에이전트 오케스트레이션을 구현했습니다.",
    result:
      "메타데이터 조회는 GraphQL, 실데이터는 REST로 나눈 하이브리드 연동이 결정적이었습니다. 한쪽만 썼다면 스키마 탐색이나 실데이터 접근 중 하나가 막혔을 구조였습니다. (실측 수치 정리 예정)",
    metrics: PLACEHOLDER_METRICS,
  },
  {
    slug: "casino-anomaly-detection",
    title: "국내 대형 카지노 테이블 게임 이상탐지",
    year: "2025",
    org: "디포커스",
    period: "2025.11 — 2026.04",
    roleShort: "모델 설계 · 학습 · 플랫폼 개발",
    tags: ["YOLOv8", "Computer Vision", "ROI 분석", "레이블링 플랫폼"],
    summary: "YOLOv8 파인튜닝과 ROI 공간 분석, 학습 데이터를 위한 레이블링 플랫폼까지 직접 개발",
    brief: {
      problem:
        "같은 동작도 어느 영역에서 일어났는지에 따라 정상과 이상이 갈리는데, 일반 객체 탐지로는 구분되지 않았습니다.",
      role:
        "YOLOv8을 파인튜닝하고 ROI 기반 공간 분석 로직과 탐지 파이프라인을 설계했으며, 레이블링 플랫폼도 직접 만들었습니다.",
      result:
        "탐지 결과를 영역 단위 사건으로 해석하게 되면서 모델 출력이 곧바로 운영 규칙에 연결됐습니다.",
    },
    problem:
      "테이블 위 행동은 어디에서 일어났는지가 곧 의미입니다. 같은 동작이라도 베팅 영역인지 딜러 영역인지에 따라 정상과 이상이 갈리는데, 일반 객체 탐지만으로는 이 구분이 되지 않았습니다. 게다가 이 도메인의 학습 데이터는 기성 레이블링 도구로 만들 수 있는 형태가 아니었습니다.",
    role:
      "테이블 영역별 행동 이상 탐지를 위해 YOLOv8 모델을 파인튜닝하고, ROI 기반 공간 분석 로직과 탐지 파이프라인을 설계했습니다. 학습 데이터를 만들기 위한 ROI 레이블링 웹 플랫폼도 직접 개발했습니다.",
    result:
      "탐지 결과를 좌표가 아니라 영역 단위 사건으로 해석하게 되면서 모델 출력이 곧바로 운영 규칙에 연결됐습니다. 도메인에 맞는 레이블링 도구를 먼저 만든 것이 데이터 품질을 좌우했습니다. (실측 수치 정리 예정)",
    metrics: PLACEHOLDER_METRICS,
  },
  {
    slug: "logistics-risk-tableau",
    title: "국내 대형 물류 기업 외부데이터 자산화 및 리스크관리 시스템",
    year: "2024",
    org: "디포커스",
    period: "2024.09 — 2025.05",
    roleShort: "데이터 연계 설계 · Tableau 개발",
    tags: ["Tableau", "망분리 아키텍처", "데이터 연계"],
    summary: "망분리 환경의 데이터 연계 아키텍처 설계와 리스크 판단용 대시보드 개발",
    brief: {
      problem:
        "망분리 환경이라 일반적인 연계 방식을 쓸 수 없었고, 현업이 원한 것은 조회 화면이 아니라 판단 화면이었습니다.",
      role:
        "망분리 전제의 데이터 연계 아키텍처를 설계하고, 현업과 판단 기준을 맞춘 뒤 Tableau로 직접 개발했습니다.",
      result:
        "요구사항을 화면으로 옮기는 대신 판단 기준에서 시작한 것이 결과를 갈랐습니다.",
    },
    problem:
      "내부 데이터를 클라우드와 연계해야 하는데 망분리 환경이라 일반적인 연결 방식을 쓸 수 없었습니다. 그리고 현업이 원한 것은 수치 조회 화면이 아니라 리스크를 판단할 수 있는 화면이었는데, 요구사항 문서만으로는 그 차이가 드러나지 않았습니다.",
    role:
      "망분리 환경을 전제로 내부 데이터와 클라우드를 잇는 데이터 연계 아키텍처를 설계했습니다. 화면 개발에 앞서 현업 담당자와 직접 미팅하며 단순 수치 조회가 아니라 리스크 판단에 실제로 필요한 인사이트가 무엇인지 도출했고, 그 결과를 기준으로 대시보드를 구성해 Tableau로 직접 개발했습니다.",
    result:
      "요구사항을 그대로 화면으로 옮기는 대신 현업과 판단 기준을 먼저 맞춘 것이 결과를 갈랐습니다. 무엇을 보여줄지가 아니라 무엇을 결정해야 하는지에서 시작하면 화면 구성이 따라옵니다. (실측 수치 정리 예정)",
    metrics: PLACEHOLDER_METRICS,
  },
  {
    slug: "erp-llm-chatbot",
    title: "ERP 연동 LLM 챗봇 유지보수 및 고도화",
    year: "2024",
    org: "디포커스",
    period: "2024.07 — 현재",
    roleShort: "유지보수 · 추가 개발",
    tags: ["FastAPI", "Django", "pgbouncer", "PostgreSQL", "WebSocket"],
    summary: "pgbouncer 도입과 컨테이너 분리로 반복되던 챗봇 장애를 근본 해소",
    brief: {
      problem:
        "챗봇 컨테이너가 주기적으로 교체되는 장애가 반복됐고, 증상만으로는 원인을 특정하기 어려웠습니다.",
      role:
        "소켓 연결 누적 → 커넥션 풀 고갈 연쇄를 추적해 pgbouncer 도입, 재연결 로직, 컨테이너 분리를 적용했습니다.",
      result:
        "재기동이 아니라 커넥션 수명 관리가 답이었고, 이후 같은 장애가 재발하지 않았습니다.",
    },
    problem:
      "카니아스 ERP에 가젯 형태로 삽입되는 LLM 챗봇을 인수받아 운영했는데, 컨테이너가 주기적으로 교체되는 장애가 반복됐습니다. 재기동하면 잠시 돌아왔다가 다시 죽는 패턴이라, 증상만 보고는 원인을 특정하기 어려웠습니다.",
    role:
      "장애를 소켓 연결 누적 → DB 커넥션 풀 고갈 → 컨테이너 교체로 이어지는 연쇄로 추적했습니다. pgbouncer를 도입해 커넥션 풀 관리를 개선하고, 소켓 재연결 로직을 구현했으며, 챗봇 컨테이너와 DB 컨테이너를 분리해 장애 전파를 차단했습니다. Django / FastAPI 기반의 기존 코드베이스를 인수해 추가 기능 개발과 안정화도 함께 진행했습니다.",
    result:
      "커넥션 고갈이 근본 원인이라는 것을 확인한 뒤에는 재기동이 아니라 커넥션 수명 관리가 답이었습니다. 반복 장애는 대부분 증상 지점과 원인 지점이 떨어져 있고, 그 사이를 잇는 것이 실제 작업이었습니다.",
    metrics: PLACEHOLDER_METRICS,
  },
];

/** slug로 프로젝트 하나를 찾는다. 없으면 undefined. */
export function findProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/**
 * 상세 페이지의 이전/다음 프로젝트를 찾는다.
 * 배열 순서(최신순)를 그대로 따르며, 양 끝에서는 해당 방향이 undefined다.
 */
export function findProjectNeighbors(slug: string): {
  prev?: Project;
  next?: Project;
} {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return {};
  return { prev: projects[index - 1], next: projects[index + 1] };
}

/** Home 대표 프로젝트. featured가 없으면 첫 번째 프로젝트를 쓴다. */
export const featuredProject = projects.find((p) => p.featured) ?? projects[0];
