/**
 * 프로필·이력 콘텐츠
 *
 * 파일 경로: src/content/profile.ts
 * 목적: About(첫 화면)의 프로필 블록과 이력(경력/학력/자격증/대회/교육) 블록에 쓰이는 데이터를 한곳에 모은다.
 * 주요 기능: 프로필 정보, 경력, 학력, 자격증, 대회, 교육 이력 제공
 * 주요 의존성: src/assets/images/my-photo.jpg
 */

import myPhoto from "@/assets/images/my-photo.jpg";

/** 이력 블록의 한 행. 날짜(term)와 제목(name), 선택적 설명(detail)으로 구성된다. */
export interface HistoryEntry {
  /** `YYYY.MM – YYYY.MM` 형식. 진행 중이면 `YYYY.MM – 현재`, 단월이면 `YYYY.MM`. 미상이면 빈 문자열. */
  term: string;
  name: string;
  detail?: string;
  /** 사이트 안 상세 페이지 주소. 있으면 이름이 링크가 된다. (예: 대회 출품작 상세) */
  href?: string;
}

export const profile = {
  name: "박호영",
  /** About 프로필 블록의 직군 오버라인 라벨 */
  role: "AI Agent 개발자 · LLM / RAG",
  /** 좌측 레일 브랜드 블록에 들어가는 짧은 직군 표기 */
  railRole: "AI Agent 개발자",
  /** "AI Agent"는 좁은 화면에서 두 줄로 갈라지지 않게 줄바꿈 없는 공백(\u00a0)으로 잇는다. */
  bio: "동화책처럼 읽히는 명세서를 쓰고, 백엔드부터 AI\u00a0Agent까지 구현하는 개발자",
  email: "hoyoungpark.ds@gmail.com",
  github: "https://github.com/HoyoungParkme",
  photo: myPhoto,
  /**
   * 경력기술서 PDF 경로. 값이 있으면 About에 버튼이 나타난다.
   * 파일은 배포할 때 `npm run pdf`가 경력기술서 화면(/resume, 개발 서버 전용)을 인쇄해 만든다.
   */
  resumeUrl: "/pdf/resume.pdf",
  /** 경력기술서 맨 위 핵심역량. 근거가 되는 프로젝트가 있는 강점만 쓴다. */
  coreSkills: [
    "발굴·사업화: 현업 시스템 운영 중 찾은 AI 과제를 PoC와 사내 연구로 검증해 본 프로젝트로 연결",
    "구축: 고객사가 허용한 LLM과 이미 쓰는 DB 안에서 챗봇·RAG·에이전트 설계·개발",
    "데이터 분석: 현업과 리스크 판단 지표를 정의해 대시보드로 구현, 공공데이터 생존분석·공간분석으로 빅데이터 대회 결선",
    "현장 적용: 엑셀·OneDrive 같은 기존 작업 방식을 바꾸지 않고 그 위에 올리는 설계",
  ],
  /** 경력기술서 핵심역량 아래 기술 한 줄 */
  coreTech: ["Python", "FastAPI", "LangGraph", "Neo4j", "pgvector", "React", "Tableau"],
  /** 이력서 PDF 경로. 경력기술서와 같이 `npm run pdf`가 이력서 화면(/cv)을 인쇄해 만든다. */
  cvUrl: "/pdf/cv.pdf",
  /** 이력서 이름 아래 한 줄 소개 */
  cvHeadline: "현업이 쓰던 방식 위에 AI를 올려 실제로 쓰이게 만드는 AI 엔지니어",
};

/** 이력서의 재직 상세. 지금은 회사가 하나라 한 덩어리로 둔다. */
export const employment = {
  company: "디포커스",
  business: "IT 서비스 · 데이터/AI 솔루션",
  term: "2024.07 – 현재",
  position: "선임",
  departments: ["Data Biz 본부 AI팀 (2025.08 – 현재)", "BI팀 (2024.07 – 2025.07)"],
  duties: "AI 서비스 기획·개발(풀스택), 자사 LLM 서비스 유지보수",
};

/** 이력서 "주요 성과" 한 건. href는 근거가 되는 프로젝트 상세 주소다. */
export interface Achievement {
  title: string;
  period: string;
  points: string[];
  href: string;
}

/** 이력서 "주요 성과". 출처: 본인 이력서(2026.11)의 "경력사항 중 내세울 수 있는 성과" */
export const keyAchievements: Achievement[] = [
  {
    title: "대시보드 증감 사유 분석 AI 에이전트, PoC에서 본 프로젝트까지",
    period: "2025.08 – 2026.09 (본 프로젝트 2026.12 착수)",
    points: [
      "화면을 보는 사람과 데이터만 보는 AI의 간극을 문제로 정의",
      "고객사 LLM·배치 주기·기존 DB에 맞춘 AI 환경 구축",
      "PoC 2건과 사내 연구를 설계·개발, 고객사 임원 검토 통과 후 본 프로젝트 수주",
    ],
    href: "/projects/tableau-ai-agent",
  },
  {
    title: "간접재 구매 포털 AI 기능 설계·개발, 본사업 전환",
    period: "2026.04 – 2026.05",
    points: [
      "멀티턴 상품 검색 챗봇, 텍스트·이미지 유사도로 중복 상품 검토",
      "견적 초안 작성·과거 낙찰가 대비 단가 적정성 판단, 구매요청서 문구 자동 작성",
    ],
    href: "/projects/commerce-mall-poc",
  },
  {
    title: "정유사 SAP 기준정보 6종 검증 자동화 플랫폼 개발",
    period: "2026.10 – 현재",
    points: [
      "엑셀로 하던 기준정보 6종 검증을 사내 규칙의 시스템 검사로 전환",
      "OneDrive 공유·엑셀 작업 흐름을 그대로 연결, 엑셀 가져오기·내보내기 지원",
    ],
    href: "/projects/refinery-master-data-cleansing",
  },
];

export const military: HistoryEntry = {
  term: "2017.07 – 2019.04",
  name: "육군 만기 제대",
  detail: "병장",
};

export const experiences: HistoryEntry[] = [
  {
    term: "2024.07 – 현재",
    name: "디포커스",
    detail: "Data Biz 본부 AI팀 선임",
  },
];

export const academicHistory: HistoryEntry[] = [
  {
    term: "2016.03 – 2023.08",
    name: "고려대학교 세종캠퍼스",
    detail: "응용통계학과",
  },
];

/** 자격증. 다른 이력 블록과 같이 최신순으로 둔다. 약칭이 널리 쓰이는 건 괄호로 함께 적는다. */
export const certifications: HistoryEntry[] = [
  {
    term: "2025.12",
    name: "Salesforce Certified Data Cloud Consultant",
    detail: "Salesforce",
  },
  { term: "2024.12", name: "빅데이터분석기사", detail: "한국데이터산업진흥원" },
  { term: "2024.03", name: "데이터분석 준전문가 (ADSP)", detail: "한국데이터산업진흥원" },
  { term: "2023.10", name: "SQL 개발자 (SQLD)", detail: "한국데이터산업진흥원" },
];

/**
 * 대회. term은 진출 결과가 발표된 달이다.
 * AI 챔피언: 본선 심사 통과 = 1차 결선 진출 40팀(일반 20 / 국내 AI 20, 2026.08.21 공식 공지). 국내 AI 트랙 지원 122팀. 2026.11 결선 진행 중.
 * 부산 Big Data 활용 대회: 결선 진출(2026.09, 부산테크노파크). 명칭·주최는 본인 이력서(2026.11) 기준.
 */
export const competitions: HistoryEntry[] = [
  {
    term: "2026.09",
    name: "2026년 Big Data 활용 대회 결선 진출",
    detail: "부산테크노파크 · 빅데이터 분석·시각화 부문, 부산 상권 빈 점포 위험 진단",
  },
  {
    term: "2026.08",
    name: "2026 AI 챔피언 대회 국내 AI 트랙 1차 결선 진출",
    detail: "과학기술정보통신부",
    href: "/projects/insurance-claim-assistant",
  },
];

export const education: HistoryEntry[] = [
  { term: "2026.09 – 2026.10", name: "온디바이스 AI와 AX", detail: "정보통신산업진흥원" },
  { term: "2025.10 – 2025.11", name: "온디바이스 AI와 앱 개발", detail: "정보통신산업진흥원" },
  { term: "2025.05 – 2025.07", name: "데이터 엔지니어링", detail: "정보통신산업진흥원" },
  { term: "2024.11 – 2024.12", name: "WEB 3.0 기반 블록체인 서비스 개발", detail: "정보통신산업진흥원" },
  { term: "2024.11", name: "인공지능 강화학습 DQN", detail: "정보통신산업진흥원" },
  { term: "2024.06", name: "인공지능 자연어처리", detail: "정보통신산업진흥원" },
  {
    term: "2024.03 – 2024.05",
    name: "빅데이터 기반 비즈니스 분석가 양성과정",
    detail: "한국직업개발원",
  },
];
