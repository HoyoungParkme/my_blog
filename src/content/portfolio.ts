export const notionWorkspace = "large-milkshake-568";

export function getNotionEmbedUrl(notionLink: string): string {
  const slug = notionLink.split('?')[0].split('/').pop() || '';
  const pageId = slug.slice(-32);
  return `https://${notionWorkspace}.notion.site/ebd//${pageId}`;
}

export interface Project {
  id: number;
  title: string;
  company: string;
  description: string;
  imageUrl: string;
  link?: string;
  tags: string[];
  period: string;
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
    title: "카지노 이상행동 탐지 모델 개발",
    company: "P사 (호텔·카지노)",
    description: "카지노 내 이상행동 탐지를 위한 딥러닝 모델 개발 및 MLOps 파이프라인 구축. 파인튜닝과 룰엔진을 결합한 탐지 고도화",
    imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800",
    link: "https://www.notion.so/MLOps-32cacd78299e8196ba71dc5b6536a714?source=copy_link",
    tags: ["YOLOv8", "FFmpeg", "OpenCLIP", "FAISS", "FastAPI", "React"],
    period: "2025.11 ~ 현재"
  },
  {
    id: 2,
    title: "Tableau AI Platform",
    company: "H사 (물류)",
    description: "Tableau 기반 데이터 분석 플랫폼에 AI 기능을 통합하여 자동화된 인사이트 도출 및 예측 분석 환경 구축",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    link: "https://www.notion.so/Tableau-AI-32cacd78299e81f69160db33cf54ea6e?source=copy_link",
    tags: ["Agent", "Qdrant", "Jina", "Tableau", "FastAPI", "Docker"],
    period: "2025.12 ~ 2026.03"
  },
  {
    id: 3,
    title: "Cobol to Java",
    company: "H사 (자동차부품)",
    description: "레거시 COBOL 시스템을 Java 기반으로 전환하는 마이그레이션 프로젝트. LLM Agent와 GraphRAG를 활용한 코드 변환 자동화",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800",
    link: "https://www.notion.so/COBOL-2025-32cacd78299e812ea4c2c76e75cb94d7?source=copy_link",
    tags: ["Agent", "Neo4j", "GraphRAG", "FastAPI"],
    period: "2025.09 ~ 2025.10"
  },
  {
    id: 4,
    title: "AI Chatbot",
    company: "S사 (종합상사)",
    description: "사내 업무 프로세스 AI 자동화 가능성 검증을 위한 챗봇 PoC. Agent 기반 대화형 인터페이스와 Tableau 데이터 연동 구현",
    imageUrl: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&q=80&w=800",
    link: "https://www.notion.so/Tableau-AI-2025-08-2025-09-32cacd78299e81eb9f74fad171edbec2?source=copy_link",
    tags: ["Agent", "Tableau", "FastAPI"],
    period: "2025.08 ~ 2025.09"
  },
  {
    id: 5,
    title: "SAP → Tableau 마이그레이션",
    company: "L사 (IT서비스)",
    description: "L사 주관 하에 전자·화학·배터리 등 다수 계열사의 SAP 기반 리포트 환경을 Tableau로 전환. 계열사별 데이터 연동 및 대시보드 재구성",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    link: "https://www.notion.so/SAP-Tableau-2025-07-2025-08-32cacd78299e81c3b4c6e215b65f6732?source=copy_link",
    tags: ["Tableau", "SAP"],
    period: "2025.07 ~ 2025.08"
  },
  {
    id: 6,
    title: "사내 ERP BI 구축",
    company: "H사 (물류)",
    description: "사내 ERP 데이터를 Tableau로 시각화하여 KPI 대시보드 및 자동화 리포트 환경 구축",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    link: "https://www.notion.so/ERP-BI-2024-09-2025-04-32cacd78299e816f8952d63f6b97633e?source=copy_link",
    tags: ["Tableau", "Tableau Pulse", "Tableau Einstein"],
    period: "2024.09 ~ 2025.04"
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
  title: "AI 서비스 개발자 (LLM·Agent/RAG)",
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
