export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  tags: string[];
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  createdAt: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description: "A comprehensive dashboard for managing online stores with real-time analytics.",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    link: "https://www.notion.so/test-2dcacd78299e8046909fce0dbc35efea?source=copy_link",
    tags: ["React", "TypeScript", "Tailwind"]
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task manager with team features and drag-and-drop interface.",
    imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=800",
    link: "https://www.notion.so/test-2dcacd78299e8046909fce0dbc35efea?source=copy_link",
    tags: ["Node.js", "PostgreSQL", "Socket.io"]
  },
  {
    id: 3,
    title: "Weather Forecast",
    description: "Beautiful weather application using external APIs for accurate global forecasting.",
    imageUrl: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&q=80&w=800",
    link: "https://www.notion.so/test-2dcacd78299e8046909fce0dbc35efea?source=copy_link",
    tags: ["Vue", "API Integration", "CSS Grid"]
  }
];

export const posts: Post[] = [
  {
    id: 1,
    title: "AI 에이전트의 미래",
    slug: "future-of-ai-agents",
    summary: "자율적으로 작동하는 AI 에이전트가 우리의 일상을 어떻게 바꿀까요?",
    content: "AI 에이전트는 단순히 질문에 답하는 수준을 넘어, 사용자의 목표를 이해하고 이를 달성하기 위한 일련의 작업을 스스로 계획하고 실행합니다...",
    createdAt: "2026-01-28T10:00:00.000Z"
  },
  {
    id: 2,
    title: "RAG(Retrieval-Augmented Generation) 이해하기",
    slug: "understanding-rag",
    summary: "LLM의 환각 현상을 줄이고 최신 정보를 제공하는 RAG 기술에 대해 알아봅니다.",
    content: "RAG는 외부 데이터베이스에서 관련 정보를 검색하여 LLM의 답변 생성 과정에 활용함으로써 정보의 정확성을 높이는 기술입니다...",
    createdAt: "2026-01-27T10:00:00.000Z"
  },
  {
    id: 3,
    title: "직관적인 코드 설계의 중요성",
    slug: "intuitive-code-design",
    summary: "협업을 위한 명확하고 읽기 쉬운 코드 작성법.",
    content: "코드는 기계가 읽는 것이 아니라 사람이 읽는 것입니다. 누구나 이해할 수 있는 명확한 구조와 명명 규칙은 유지보수 비용을 획기적으로 줄여줍니다...",
    createdAt: "2026-01-26T10:00:00.000Z"
  },
  {
    id: 4,
    title: "LLM 보안과 프롬프트 인젝션",
    slug: "llm-security-prompt-injection",
    summary: "안전한 AI 서비스를 구축하기 위한 보안 고려사항.",
    content: "프롬프트 인젝션은 AI 시스템의 의도된 동작을 방해하거나 민감한 정보를 유출시킬 수 있는 공격 기법입니다...",
    createdAt: "2026-01-25T10:00:00.000Z"
  },
  {
    id: 5,
    title: "벡터 데이터베이스 비교분석",
    slug: "vector-db-comparison",
    summary: "Pinecone, Milvus, Weaviate 중 우리 서비스에 맞는 선택은?",
    content: "RAG 시스템 구축 시 핵심적인 역할을 하는 벡터 데이터베이스들의 특징과 장단점을 비교해 봅니다...",
    createdAt: "2026-01-24T10:00:00.000Z"
  },
  {
    id: 6,
    title: "Python으로 구축하는 AI 워크플로우",
    slug: "ai-workflow-with-python",
    summary: "LangChain과 LlamaIndex를 활용한 효율적인 개발 방법.",
    content: "현대적인 AI 서비스 개발에서 프레임워크를 활용하면 복잡한 체인과 에이전트 로직을 더 쉽고 관리하기 편하게 구현할 수 있습니다...",
    createdAt: "2026-01-23T10:00:00.000Z"
  },
  {
    id: 7,
    title: "AI 서비스의 사용자 경험(UX)",
    slug: "ai-service-ux",
    summary: "사용자가 AI와 소통하는 가장 자연스러운 방식.",
    content: "단순한 채팅 인터페이스를 넘어, AI의 사고 과정을 시각화하고 사용자에게 적절한 피드백을 주는 것이 중요합니다...",
    createdAt: "2026-01-22T10:00:00.000Z"
  },
  {
    id: 8,
    title: "모델 파인튜닝 vs 프롬프트 엔지니어링",
    slug: "finetuning-vs-prompt-engineering",
    summary: "성능 향상을 위한 최선의 전략 선택하기.",
    content: "특정 도메인 지식이 필요할 때 무작정 파인튜닝을 하기보다는, 먼저 고도화된 프롬프트 기법과 RAG를 고려해보는 것이 경제적일 수 있습니다...",
    createdAt: "2026-01-21T10:00:00.000Z"
  },
  {
    id: 9,
    title: "멀티모달 AI의 시대",
    slug: "era-of-multimodal-ai",
    summary: "텍스트를 넘어 이미지, 오디오, 비디오를 이해하는 AI.",
    content: "이제 AI는 텍스트뿐만 아니라 다양한 형태의 데이터를 동시에 처리하고 연계하여 생각할 수 있는 능력을 갖추고 있습니다...",
    createdAt: "2026-01-20T10:00:00.000Z"
  },
  {
    id: 10,
    title: "지속 가능한 AI 개발 문화",
    slug: "sustainable-ai-dev-culture",
    summary: "팀 내에서 AI 기술을 내재화하고 공유하는 방법.",
    content: "빠르게 발전하는 기술 트렌드를 따라잡기 위해 팀원들과 함께 학습하고 실험하는 문화를 조성하는 것이 핵심입니다...",
    createdAt: "2026-01-19T10:00:00.000Z"
  },
  {
    id: 11,
    title: "임베딩 모델의 선택 기준",
    slug: "choosing-embedding-model",
    summary: "의미론적 검색 성능을 좌우하는 임베딩 모델.",
    content: "한국어 데이터의 특성을 잘 반영하는 임베딩 모델을 선택하는 것이 검색 품질을 결정짓는 중요한 요소입니다...",
    createdAt: "2026-01-18T10:00:00.000Z"
  },
  {
    id: 12,
    title: "서버리스 환경에서의 AI 배포",
    slug: "ai-deployment-on-serverless",
    summary: "Vercel이나 AWS Lambda에서 AI 서비스 운영하기.",
    content: "스트리밍 응답과 타임아웃 제한 등 서버리스 환경에서 고려해야 할 기술적 도전 과제들을 살펴봅니다...",
    createdAt: "2026-01-17T10:00:00.000Z"
  }
];

import myPhoto from "@/assets/images/my-photo.jpg";

export interface Experience {
  company: string;
  position: string;
  period: string;
  description?: string;
}

export const experiences: Experience[] = [
  {
    company: "디포커스",
    position: "선임",
    period: "2024.07 ~ 현재",
    description: "AI 서비스 개발 및 LLM/Agent/RAG 시스템 구축"
  }
];

export const profileInfo = {
  name: "박호영",
  title: "AI 서비스 개발자 (LLM·Agent/RAG)",
  tagline: "직관적인 코드, 명확한 설계",
  bio: "옆집 할아버지 할머니도 협업이 가능한 직관적인 코드와 명확한 설계를 추구합니다. 안녕하세요, AI 서비스 개발자 박호영입니다.",
  email: "hello@example.dev",
  location: "South Korea",
  availableForWork: true,
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  profileImage: myPhoto
};
