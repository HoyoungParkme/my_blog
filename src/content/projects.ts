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
  /** 소속. 상세 사이드바의 "소속" 행에 표시된다. */
  org: string;
  /** `YYYY.MM — YYYY.MM` 형식. 진행 중이면 `YYYY.MM — 현재`. */
  period: string;
  /** 카드와 사이드바에 쓰이는 짧은 역할 표기 */
  roleShort: string;
  tags: string[];
  /** 목록 카드의 한 줄 요약 */
  summary: string;
  /** 케이스 스터디 "배경과 문제" */
  problem: string;
  /** 케이스 스터디 "내가 한 일" */
  role: string;
  /** 케이스 스터디 "결과와 배운 점" */
  result: string;
  metrics: ProjectMetric[];
  /** 핵심 코드 스니펫. 없으면 코드 블록을 렌더링하지 않는다. */
  code?: string;
  links?: { github?: string; demo?: string };
}

const PLACEHOLDER_METRICS: ProjectMetric[] = [
  { value: "—", label: "지표 1" },
  { value: "—", label: "지표 2" },
  { value: "—", label: "지표 3" },
];

export const projects: Project[] = [
  {
    slug: "tableau-ai-agent",
    title: "국내 대형 물류 기업 Tableau AI",
    year: "2026",
    org: "디포커스",
    period: "2026.01 — 2026.04",
    roleShort: "AI 아키텍처 설계 · 개발",
    tags: ["AI Agent", "Qdrant", "RAG", "GraphQL", "Tableau"],
    summary: "자연어 질의를 대시보드 인사이트로 바꾸는 Tableau 연동 에이전트",
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
    title: "국내 대형 물류 기업 리스크 관리 시스템",
    year: "2024",
    org: "디포커스",
    period: "2024.09 — 2025.05",
    roleShort: "데이터 연계 설계 · Tableau 개발",
    tags: ["Tableau", "망분리 아키텍처", "데이터 연계"],
    summary: "망분리 환경의 데이터 연계 아키텍처 설계와 리스크 판단용 대시보드 개발",
    problem:
      "내부 데이터를 클라우드와 연계해야 하는데 망분리 환경이라 일반적인 연결 방식을 쓸 수 없었습니다. 그리고 현업이 원한 것은 수치 조회 화면이 아니라 리스크를 판단할 수 있는 화면이었는데, 요구사항 문서만으로는 그 차이가 드러나지 않았습니다.",
    role:
      "망분리 환경을 전제로 내부 데이터와 클라우드를 잇는 데이터 연계 아키텍처를 설계했습니다. 화면 개발에 앞서 현업 담당자와 직접 미팅하며 단순 수치 조회가 아니라 리스크 판단에 실제로 필요한 인사이트가 무엇인지 도출했고, 그 결과를 기준으로 대시보드를 구성해 Tableau로 직접 개발했습니다.",
    result:
      "요구사항을 그대로 화면으로 옮기는 대신 현업과 판단 기준을 먼저 맞춘 것이 결과를 갈랐습니다. 무엇을 보여줄지가 아니라 무엇을 결정해야 하는지에서 시작하면 화면 구성이 따라옵니다. (실측 수치 정리 예정)",
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

