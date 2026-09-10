/**
 * 프로필·이력 콘텐츠
 *
 * 파일 경로: src/content/profile.ts
 * 목적: Home 화면의 프로필 블록과 이력(경력/학력/자격증/교육) 블록에 쓰이는 데이터를 한곳에 모은다.
 * 주요 기능: 프로필 정보, 경력, 학력, 자격증, 교육 이력 제공
 * 주요 의존성: src/assets/images/my-photo.jpg
 */

import myPhoto from "@/assets/images/my-photo.jpg";

/** 이력 블록의 한 행. 날짜(term)와 제목(name), 선택적 설명(detail)으로 구성된다. */
export interface HistoryEntry {
  /** `YYYY.MM — YYYY.MM` 형식. 진행 중이면 `YYYY.MM — 현재`, 단월이면 `YYYY.MM`. 미상이면 빈 문자열. */
  term: string;
  name: string;
  detail?: string;
}

export const profile = {
  name: "박호영",
  /** About 프로필 블록의 직군 오버라인 라벨 */
  role: "AI 서비스 개발자 · LLM / AGENT / RAG",
  /** 좌측 레일 브랜드 블록에 들어가는 짧은 직군 표기 */
  railRole: "AI Agent 개발자",
  bio: "옆집 할아버지 할머니도 협업이 가능한 직관적인 코드와 명확한 설계를 추구합니다. 응용통계를 전공하고 데이터 분석에서 출발해, 지금은 로컬 LLM 환경에서 도구를 쓰는 에이전트와 RAG 시스템을 설계하고 운영합니다.",
  email: "hoyoungpark.ds@gmail.com",
  github: "https://github.com/HoyoungParkme",
  photo: myPhoto,
  /**
   * 이력서 PDF 경로. public/ 아래에 파일을 넣고 경로를 채우면 Home에 버튼이 나타난다.
   * TODO: 이력서 PDF 준비 후 "resume.pdf" 등으로 교체.
   */
  resumeUrl: "",
};

export const experiences: HistoryEntry[] = [
  {
    term: "2024.07 — 현재",
    name: "디포커스 · 선임",
    detail:
      "AI 서비스 개발. 로컬 LLM 서빙과 멀티턴 도구 호출 에이전트, 문서 RAG 파이프라인을 설계·구축·운영합니다.",
  },
];

export const academicHistory: HistoryEntry[] = [
  {
    term: "2016.03 — 2023.08",
    name: "고려대학교 세종캠퍼스",
    detail: "응용통계학과",
  },
];

/** 자격증은 취득 연월 데이터가 없어 term을 비운다. 열 정렬은 그대로 유지된다. */
export const certifications: HistoryEntry[] = [
  { term: "", name: "빅데이터 분석기사" },
  { term: "", name: "SQLD" },
  { term: "", name: "ADSP" },
  { term: "", name: "Salesforce Data Cloud Certification" },
];

export const education: HistoryEntry[] = [
  { term: "2025.10 — 2025.11", name: "온디바이스 AI", detail: "정보통신산업진흥원" },
  { term: "2025.05 — 2025.07", name: "데이터 엔지니어링", detail: "정보통신산업진흥원" },
  { term: "2024.11 — 2024.12", name: "블록체인", detail: "정보통신산업진흥원" },
  { term: "2024.11", name: "인공지능 (DQN)", detail: "정보통신산업진흥원" },
  { term: "2024.06", name: "인공지능 (언어)", detail: "정보통신산업진흥원" },
  {
    term: "2024.03 — 2024.05",
    name: "빅데이터 기반 비즈니스 분석가 양성과정",
    detail: "한국직업개발원",
  },
];
