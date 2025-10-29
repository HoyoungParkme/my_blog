// src/data/projectData.js
// 이 파일은 더 이상 사용되지 않습니다. 대신 public/projects/ 폴더의 마크다운 파일을 사용하세요.
// 하지만 하위 호환성을 위해 유지됩니다.

import { parseProjectMarkdown } from "../utils/markdownParser";
import * as projectLoader from "../utils/projectLoader";

// 마크다운 파일에서 프로젝트를 로드하는 함수
export async function loadProjectsFromMarkdown() {
  try {
    const projects = await projectLoader.loadAllProjects();
    const parsed = {
      실무: [],
      개인: [],
    };

    for (const { content } of projects.실무) {
      if (content) {
        try {
          parsed.실무.push(parseProjectMarkdown(content));
        } catch (error) {
          console.error("Error parsing project:", error);
        }
      }
    }

    for (const { content } of projects.개인) {
      if (content) {
        try {
          parsed.개인.push(parseProjectMarkdown(content));
        } catch (error) {
          console.error("Error parsing project:", error);
        }
      }
    }

    // 로드된 프로젝트가 없으면 기본 데이터 사용
    if (parsed.실무.length === 0 && parsed.개인.length === 0) {
      console.warn("No projects loaded from markdown, using default data");
      return projectsKo;
    }

    return parsed;
  } catch (error) {
    console.error("Failed to load projects from markdown:", error);
    // 에러 발생 시 기본 데이터 반환
    return projectsKo;
  }
}

// 기본 프로젝트 데이터 (하위 호환성)
export const projectsKo = {
  실무: [
    {
      id: "hyundai-glovis",
      type: "실무",
      title: "현대글로비스 SCM사업부 지표 개발",
      period: "2025.02.11 ~ 2025.04.18",
      description:
        "ERP 데이터를 기반으로 핵심 지표를 설계하고 실시간 대시보드로 시각화하여 현업 의사결정을 지원했습니다.",
      stack: ["Tableau", "TDV", "SQL"],
      link: "https://velog.io/@stella4536/zoom%EC%A4%8C-%EB%8B%A4%EC%8B%9C%EB%B3%B4%EA%B8%B0-%EC%98%81%EC%83%81-%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C-%EB%B0%A9%EB%B2%95youtube-dl-%EC%98%A4%EB%A5%98%EC%8B%9C%EC%9C%88%EB%8F%84%EC%9A%B0",
      blocks: [
        {
          type: "heading2",
          content: "프로젝트 개요",
        },
        {
          type: "paragraph",
          content:
            "현대글로비스 SCM사업부의 ERP 데이터를 분석하여 핵심 비즈니스 지표를 설계하고, 실시간 대시보드를 통해 현업의 의사결정을 지원하는 프로젝트입니다.",
        },
        {
          type: "heading2",
          content: "주요 역할 및 성과",
        },
        {
          type: "bulletedList",
          items: [
            "ERP 시스템의 복잡한 데이터를 분석하여 핵심 지표(KPI) 도출",
            "Tableau를 활용한 실시간 대시보드 구축",
            "TDV를 통한 데이터 통합 및 전처리 작업",
            "SQL 쿼리 최적화를 통한 데이터 조회 성능 개선",
          ],
        },
        {
          type: "heading2",
          content: "사용 기술 스택",
        },
        {
          type: "paragraph",
          content: [
            "데이터 분석 도구로 ",
            { type: "bold", text: "Tableau" },
            "를 사용하여 대시보드를 구현했고, ",
            { type: "bold", text: "TDV(Tableau Data Visualization)" },
            "와 ",
            { type: "code", text: "SQL" },
            "을 활용하여 데이터를 효율적으로 처리했습니다.",
          ],
        },
        {
          type: "heading2",
          content: "프로젝트 기간",
        },
        {
          type: "paragraph",
          content: "2025년 2월 11일부터 2025년 4월 18일까지 진행되었습니다.",
        },
      ],
    },
  ],
  개인: [
    {
      id: "stock-analysis",
      type: "개인",
      title: "맞춤형 주가 데이터 분석 시스템 개발",
      period: "2025.01.27 ~ 2025.02.11",
      description:
        "웹 크롤링 기반 주가 데이터 수집 및 투자 리포트 자동 생성 시스템을 구축했습니다.",
      stack: ["Pandas", "BeautifulSoup", "requests"],
      link: "https://www.naver.com",
      blocks: [
        {
          type: "heading2",
          content: "프로젝트 개요",
        },
        {
          type: "paragraph",
          content:
            "웹 크롤링 기술을 활용하여 주가 데이터를 수집하고, 수집된 데이터를 분석하여 투자 리포트를 자동으로 생성하는 시스템을 개발했습니다.",
        },
        {
          type: "heading2",
          content: "주요 기능",
        },
        {
          type: "numberedList",
          items: [
            "웹 크롤링을 통한 실시간 주가 데이터 수집",
            "Pandas를 활용한 데이터 전처리 및 분석",
            "투자 리포트 템플릿 기반 자동 리포트 생성",
            "데이터 시각화를 통한 트렌드 분석",
          ],
        },
        {
          type: "heading2",
          content: "기술 스택 상세",
        },
        {
          type: "paragraph",
          content: [
            "데이터 수집을 위해 ",
            { type: "bold", text: "requests" },
            "와 ",
            { type: "bold", text: "BeautifulSoup" },
            "을 사용했으며, 데이터 처리 및 분석에는 ",
            { type: "code", text: "Pandas" },
            "를 활용했습니다.",
          ],
        },
        {
          type: "callout",
          icon: "💡",
          calloutType: "info",
          content:
            "이 프로젝트를 통해 웹 크롤링과 데이터 분석의 실무 경험을 쌓을 수 있었습니다.",
        },
      ],
    },
  ],
};
