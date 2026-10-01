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
 * - metrics는 실측 수치가 나온 프로젝트에만 넣는다. 없으면 지표 카드가 렌더되지 않는다.
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
  /** `YYYY.MM – YYYY.MM` 형식. 진행 중이면 `YYYY.MM – 현재`. */
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
  /** 실측 수치. 없으면 상세에서 지표 카드를 띄우지 않는다. */
  metrics?: ProjectMetric[];
  /** 핵심 코드 스니펫. 없으면 코드 블록을 렌더링하지 않는다. */
  code?: string;
  links?: { github?: string; demo?: string };
}

export const projects: Project[] = [
  {
    slug: "graphrag-bi-agent",
    title: "GraphRAG 기반 사내 BI 에이전트",
    year: "2026",
    org: "디포커스",
    period: "2026.05 – 현재",
    roleShort: "PL · 설계 · 개발",
    tags: ["GraphRAG", "FastAPI", "React", "Tableau"],
    summary: "데이터 명세서로 스키마 관계를 그래프로 엮고, 질문에 맞는 데이터를 찾아 차트로 보여주는 BI 에이전트",
    problem:
      "사내 DB에서 필요한 데이터를 질문 하나로 찾고 바로 차트로 보고 싶었습니다. 검색 방식은 키워드를 맞추는 렉시컬 검색에서 RAG로 넘어왔지만, RAG로도 테이블과 스키마 사이의 관계는 풀리지 않았습니다. 값이 어느 테이블에 있고 무엇과 이어지는지 알아야 정확한 데이터를 꺼낼 수 있었습니다.",
    role:
      "PL로서 전체 구조를 설계하고 개발했습니다. 사용자가 데이터 사전(DD)이나 데이터 명세서를 올리면 데이터 카탈로그를 자동으로 만들고, 이를 GraphRAG 그래프로 구성합니다. 이어서 컬럼 설명을 읽어 테이블 간 관계를 추천하고, 그 관계를 그래프에 더해 GraphRAG가 스스로 보강되게 했습니다. 백엔드는 FastAPI로 DB 모델링부터 자연어 질의 API까지 만들었고, 답변을 차트로 보여주는 대시보드는 React로 구현했습니다.",
    result:
      "기본 기능은 구현을 마쳤고, 지금은 외부 시스템을 플러그인으로 붙이는 단계입니다. Tableau는 연결을 마쳤고 다음은 SAP입니다. 테이블 간 관계를 사람이 하나하나 정의하지 않고 명세서에서 뽑아 그래프를 채우게 한 것이 이 구조의 중심입니다.",
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

