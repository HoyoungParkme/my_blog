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
