export const notionWorkspace = "large-milkshake-568";

export function getNotionEmbedUrl(notionLink: string): string {
  const slug = notionLink.split('?')[0].split('/').pop() || '';
  const pageId = slug.slice(-32);
  return `https://${notionWorkspace}.notion.site/ebd//${pageId}`;
}

export interface Project {
  id: number;
  title: string;
  period: string;
  tags: string[];
  /** 담당 역할 (예: "아키텍처 설계 및 개발") */
  role?: string;
  /** 핵심 성과·작업 항목. 카드에 불릿 목록으로 표시된다. */
  highlights?: string[];
  /** 회사/소속명. 없으면 표시하지 않는다. */
  company?: string;
  /** 한 줄 요약. highlights 대신 간단히 표현할 때 사용. */
  description?: string;
  /** Notion 등 상세 페이지 링크. 있으면 카드 클릭 시 모달로 표시된다. */
  link?: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  link?: string;
  createdAt: string;
  tags?: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "뉴럴-심볼릭 기반 보험청구 심사 어시스턴트 에이전트",
    period: "2026.03 ~ 현재",
    role: "아키텍처 설계 및 개발",
    highlights: [
      "각 보험사 상품 약관을 GraphRAG + RAG 이중 구조로 적재하여 복잡한 보험 상품 간 관계 탐색 구현",
      "뉴럴(LLM 추론) + 심볼릭(규칙 기반 판단) 하이브리드 아키텍처로 청구 심사 정확도 향상",
      "마이데이터 API 연동을 가정한 사용자 가입 보험 자동 조회 및 상품별 맞춤 검색 구현",
      "사용자 채팅 질의 기반 보험금 수령 가능성 판단 기능 설계",
      "보험 청구 심사 로직을 심볼릭 규칙으로 명시화하여 LLM 환각 최소화"
    ],
    tags: ["GraphRAG", "RAG", "Neural-Symbolic", "LLM", "마이데이터"]
  },
  {
    id: 2,
    title: "국내 대형 SI기업 간접재 구매 플랫폼 AI 개발",
    period: "2026.04 ~ 2026.06",
    role: "서비스 설계 및 AI 기능 개발",
    highlights: [
      "요청부서·구매부서·협력사 3개 사용자 유형 기반 플랫폼 서비스 구조 설계",
      "구매 요청(PR) 생성 시 AI 기반 구매 양식 자동완성 기능 개발",
      "사용자 요구 기반 상품 추천 챗봇 설계 및 구현",
      "RAG 기반 유사상품 검색으로 중복 구매 방지 기능 개발 (구매부서용)",
      "과거 유사 견적 데이터 검색 및 현재 가격 적정성 판단 기능 구현"
    ],
    tags: ["RAG", "추천 챗봇", "LLM", "유사상품 검색"]
  },
  {
    id: 3,
    title: "국내 대형 물류 기업 Tableau AI Agent",
    period: "2026.01 ~ 2026.04",
    role: "AI 아키텍처 설계 및 개발",
    highlights: [
      "Tableau 대시보드와 연동되는 LLM 기반 AI 에이전트 시스템 설계 및 구현",
      "GraphQL / REST 하이브리드 방식으로 Tableau 메타데이터 및 데이터 소스 연동",
      "Qdrant 기반 벡터 저장소 구성 및 RAG 파이프라인 설계",
      "자연어 질의 → 대시보드 인사이트 추출 에이전트 오케스트레이션 구현"
    ],
    tags: ["AI Agent", "Qdrant", "RAG", "GraphQL", "Tableau"]
  },
  {
    id: 4,
    title: "국내 대형 카지노 테이블 게임 이상탐지",
    period: "2025.11 ~ 2026.04",
    role: "모델 설계·학습·레이블링 플랫폼 개발",
    highlights: [
      "카지노 테이블 영역별 행동 이상 탐지를 위한 YOLOv8 모델 파인튜닝",
      "ROI 기반 공간 분석 로직 및 탐지 파이프라인 설계",
      "학습 데이터 구축을 위한 자체 ROI 레이블링 웹 플랫폼 직접 개발"
    ],
    tags: ["YOLOv8", "Computer Vision", "ROI 분석", "레이블링 플랫폼"]
  },
  {
    id: 5,
    title: "국내 대형 물류 기업 외부데이터 자산화 및 리스크관리 시스템 Tableau 개발",
    period: "2024.09 ~ 2025.05",
    role: "Tableau 화면 개발 및 망분리 환경 기반 데이터 연계 아키텍처 설계",
    highlights: [
      "내부 데이터를 클라우드와 연계하기 위한 망분리 환경 기반 데이터 연계 아키텍처 설계",
      "현업 담당자와 직접 미팅하며 단순 수치 조회가 아닌 리스크 판단에 실질적으로 필요한 인사이트 도출",
      "도출된 인사이트 기반으로 대시보드 화면 구성 및 Tableau 직접 개발"
    ],
    tags: ["Tableau", "망분리 아키텍처", "데이터 연계"]
  },
  {
    id: 6,
    title: "ERP 연동 LLM 챗봇 유지보수 및 고도화",
    period: "2024.07 ~ 현재",
    role: "유지보수 및 추가 개발",
    highlights: [
      "카니아스 ERP 시스템에 가젯 형태로 삽입되는 LLM 챗봇 백엔드 운영",
      "소켓 연결 누적 → DB 커넥션 풀 고갈 → 컨테이너 교체 반복 장애 원인 분석 및 해결",
      "pgbouncer 도입으로 DB 커넥션 풀 관리 개선, 커넥션 고갈 문제 근본 해소",
      "소켓 재연결 로직 구현 및 챗봇 컨테이너·DB 컨테이너 분리로 장애 전파 차단",
      "Django / FastAPI 기반 기존 코드베이스 인수 후 추가 기능 개발 및 안정화"
    ],
    tags: ["FastAPI", "Django", "pgbouncer", "PostgreSQL", "WebSocket"]
  }
];

export const posts: Post[] = [
  {
    id: 1,
    title: "WebSocket 이슈",
    slug: "websocket-issue",
    summary: "AI 서비스 실시간 스트리밍 구현 중 발생한 WebSocket 연결 불안정 문제를 분석하고 해결한 과정을 기록합니다.",
    content: "",
    link: "https://www.notion.so/WebSocket-PostgreSQL-32cacd78299e81289e6cf1ac171a9ca4?source=copy_link",
    createdAt: "2026-03-01T10:00:00.000Z",
    tags: ["WebSocket", "Streaming", "Debugging"]
  },
  {
    id: 2,
    title: "Tool Call Fail",
    slug: "tool-call-fail",
    summary: "LLM Agent의 Tool Calling 과정에서 발생하는 실패 패턴 분석 및 재시도 전략, 안정성 확보 방안을 공유합니다.",
    content: "",
    link: "https://www.notion.so/Tool-name-64-tool-call-32cacd78299e81f187cdd59da3843cf7?source=copy_link",
    createdAt: "2026-02-15T10:00:00.000Z",
    tags: ["LLM", "AI Agent", "Tool Calling", "Debugging"]
  },
  {
    id: 3,
    title: "집계 데이터 필드명 불일치",
    slug: "aggregate-field-mismatch",
    summary: "Tableau 등 BI 도구에 AI 기능을 통합하기 위한 아키텍처 설계 및 고려사항을 정리합니다.",
    content: "",
    link: "https://www.notion.so/Agent-32cacd78299e81afbe92f05824e01858?source=copy_link",
    createdAt: "2026-02-01T10:00:00.000Z",
    tags: ["BI", "Tableau", "AI", "Architecture"]
  }
];

import myPhoto from "@/assets/images/my-photo.jpg";

export interface Experience {
  company: string;
  position: string;
  period: string;
  description?: string;
}

export interface Education {
  name: string;
  period: string;
  organizer: string;
}

export const experiences: Experience[] = [
  {
    company: "디포커스",
    position: "선임",
    period: "2024.07 ~ 현재",
    description: "AI 서비스 개발 및 LLM/Agent/RAG 시스템 구축"
  }
];

export const academicHistory: Education[] = [
  {
    name: "고려대학교 세종캠퍼스",
    period: "2016.03 ~ 2023.08",
    organizer: "응용통계학과"
  }
];

export const certifications: string[] = [
  "빅데이터 분석기사",
  "SQLD",
  "ADSP",
  "Salesforce Data Cloud Certification"
];

export const education: Education[] = [
  {
    name: "온디바이스 AI",
    period: "2025.10.13 - 2025.11.13",
    organizer: "정보통신산업진흥원"
  },
  {
    name: "데이터 엔지니어링",
    period: "2025.05.03 - 2025.07.06",
    organizer: "정보통신산업진흥원"
  },
  {
    name: "블록체인",
    period: "2024.11.11 - 2024.12.06",
    organizer: "정보통신산업진흥원"
  },
  {
    name: "인공지능(DQN)",
    period: "2024.11.04 - 2024.11.15",
    organizer: "정보통신산업진흥원"
  },
  {
    name: "인공지능(언어)",
    period: "2024.06.03 - 2024.06.28",
    organizer: "정보통신산업진흥원"
  },
  {
    name: "빅데이터 기반 비즈니스 분석가 양성과정",
    period: "2024.03.06 - 2024.05.22",
    organizer: "한국직업개발원"
  }
];

export const profileInfo = {
  name: "박호영",
  title: "AI 에이전트 개발자 (Backend · Gen AI)",
  tagline: "옆집 할아버지도 이해하는 코드\n설명 없이도 의도가 보이는 설계",
  bio: "안녕하세요, AI 서비스 개발자 박호영입니다.",
  email: "hoyoungpark.ds@gmail.com",
  phone: "010-8663-4225",
  location: "South Korea",
  availableForWork: true,
  github: "https://github.com/HoyoungParkme",
  blog: "https://hypark.tistory.com/",
  profileImage: myPhoto
};
