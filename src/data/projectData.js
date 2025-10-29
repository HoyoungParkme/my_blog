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
    {
      id: "hyundai-glovis-tableau-ai",
      type: "실무",
      title: "현대글로비스 Tableau AI Agent PoC",
      period: "2025.03.15 ~ 2025θηκε.04.30",
      description:
        "Tableau 대시보드에 AI 에이전트를 통합하여 자연어로 데이터를 질의하고 인사이트를 도출하는 PoC 프로젝트를 진행했습니다.",
      stack: ["Tableau", "Python", "OpenAI API", "LangChain"],
      link: "",
      blocks: [
        {
          type: "heading2",
          content: "프로젝트 개요",
        },
        {
          type: "paragraph",
          content:
            "Tableau 대시보드를 활용하는 사용자들이 자연어로 데이터를 질의하고, AI가 자동으로 인사이트를 분석하여 제공하는 AI 에이전트를 개발했습니다. 이를 통해 비즈니스 사용자들이 별도의 데이터 분석 지식 없이도 직관적으로 데이터 인사이트를 얻을 수 있도록 지원했습니다.",
        },
        {
          type: "heading2",
          content: "주요 역할 및 성과",
        },
        {
          type: "bulletedList",
          items: [
            "Tableau REST API를 활용한 대시보드 데이터 추출 및 분석 파이프라인 구축",
            "OpenAI API와 LangChain을 활용한 자연어 처리 및 프롬프트 엔지니어링",
            "사용자 질의에 대한 컨텍스트 기반 답변 생성 시스템 개발",
            "대시보드 시각화 요소를 자동으로 추천하는 AI 기능 구현",
          ],
        },
        {
          type: "heading2",
          content: "기술 스택 상세",
        },
        {
          type: "paragraph",
          content: [
            "데이터 추출 및 처리를 위해 ",
            { type: "bold", text: "Python" },
            "을 사용했으며, AI 모델은 ",
            { type: "code", text: "OpenAI API" },
            "를 활용했습니다. 프롬프트 체이닝과 컨텍스트 관리에는 ",
            { type: "bold", text: "LangChain" },
            " 프레임워크를 도입하여 효율적으로 구현했습니다.",
          ],
        },
        {
          type: "heading2",
          content: "핵심 기능",
        },
        {
          type: "numberedList",
          items: [
            "자연어 질의 입력 및 의도 파악",
            "Tableau 데이터 자동 조회 및 분석",
            "컨텍스트 기반 인사이트 생성",
            "대시보드 요소 자동 추천",
          ],
        },
        {
          type: "heading2",
          content: "프로젝트 기간",
        },
        {
          type: "paragraph",
          content: "2025년 3월 15일부터 2025년 4월 30일까지 진행되었습니다.",
        },
        {
          type: "callout",
          icon: "💡",
          calloutType: "info",
          content:
            "이 프로젝트를 통해 AI와 BI 도구의 융합이 실제 비즈니스 환경에서 얼마나 유용한지 검증할 수 있었습니다.",
        },
      ],
    },
    {
      id: "samsung-fabric-chatbot",
      type: "실무",
      title: "삼성물산 패브릭 챗봇 생성 및 Tableau 연동",
      period: "2024.12.01 ~ 2025.02.15",
      description:
        "Microsoft Fabric를 활용한 챗봇 시스템 구축 및 Tableau 대시보드와 연동하여 실시간 데이터 조회 및 분석 기능을 제공했습니다.",
      stack: ["Microsoft Fabric", "Azure OpenAI", "Tableau", "Power BI"],
      link: "",
      blocks: [
        {
          type: "heading2",
          content: "프로젝트 개요",
        },
        {
          type: "paragraph",
          content:
            "Microsoft Fabric 플랫폼을 기반으로 AI 챗봇을 구축하고, Tableau 대시보드와 연동하여 사용자가 챗봇을 통해 실시간으로 데이터를 조회하고 분석할 수 있는 시스템을 개발했습니다.",
        },
        {
          type: "heading2",
          content: "주요 역할 및 성과",
        },
        {
          type: "bulletedList",
          items: [
            "Microsoft Fabric를 활용한 데이터 파이프라인 및 웨어하우스 구축",
            "Azure OpenAI를 활용한 지능형 챗봇 개발",
            "Tableau REST API 연동을 통한 대시보드 데이터 실시간 조회",
            "자연어 기반 리포트 생성 및 시각화 자동화",
          ],
        },
        {
          type: "heading2",
          content: "기술 스택 상세",
        },
        {
          type: "paragraph",
          content: [
            "데이터 플랫폼으로 ",
            { type: "bold", text: "Microsoft Fabric" },
            "를 사용했으며, AI 모델은 ",
            { type: "code", text: "Azure OpenAI" },
            "를 활용했습니다. ",
            { type: "bold", text: "Tableau" },
            "와의 연동을 통해 기존 BI 환경과의 통합을 완료했습니다.",
          ],
        },
        {
          type: "heading2",
          content: "핵심 기능",
        },
        {
          type: "numberedList",
          items: [
            "Microsoft Fabric 기반 데이터 수집 및 저장",
            "Azure OpenAI를 활용한 자연어 처리",
            "Tableau 대시보드 자동 조회 및 분석",
            "챗봇을 통한 리포트 생성 및 공유",
          ],
        },
        {
          type: "heading2",
          content: "프로젝트 기간",
        },
        {
          type: "paragraph",
          content: "2024년 12월 1일부터 2025년 2월 15일까지 진행되었습니다.",
        },
        {
          type: "callout",
          icon: "⚠️",
          calloutType: "warning",
          content:
            "이 프로젝트는 클라우드 기반 BI 플랫폼의 통합 활용에 대한 좋은 경험을 제공했습니다.",
        },
      ],
    },
    {
      id: "hyundai-mobis-cobol-java",
      type: "실무",
      title: "현대 모비스 Cobol to JAVA",
      period: "2024.10.01 ~ 2024.11.30",
      description:
        "레거시 COBOL 시스템을 현대적인 Java 기반 시스템으로 마이그레이션하는 프로젝트를 진행했습니다. 비즈니스 로직 보존 및 성능 최적화에 중점을 두었습니다.",
      stack: ["Java", "Spring Boot", "COBOL", "PostgreSQL", "Docker"],
      link: "",
      blocks: [
        {
          type: "heading2",
          content: "프로젝트 개요",
        },
        {
          type: "paragraph",
          content:
            "기존 COBOL 기반 레거시 시스템을 Java/Spring Boot 환경으로 마이그레이션하면서, 기존 비즈니스 로직의 정확성을 보장하고 성능을 개선하는 프로젝트입니다.",
        },
        {
          type: "heading2",
          content: "주요 역할 및 성과",
        },
        {
          type: "bulletedList",
          items: [
            "COBOL 코드 분석 및 비즈니스 로직 매핑",
            "Spring Boot 기반의 모던 아키텍처 설계 및 구현",
            "레거시 데이터베이스를 PostgreSQL로 마이그레이션",
            "Docker 컨테이너화를 통한 배포 자동화",
            "기존 시스템과의 데이터 일관성 검증 및 테스트",
          ],
        },
        {
          type: "heading2",
          content: "기술 스택 상세",
        },
        {
          type: "paragraph",
          content: [
            "백엔드 프레임워크로 ",
            { type: "bold", text: "Spring Boot" },
            "를 사용했으며, 데이터베이스는 ",
            { type: "code", text: "PostgreSQL" },
            "로 전환했습니다. 컨테이너화를 위해 ",
            { type: "bold", text: "Docker" },
            "를 활용하여 배포 프로세스를 개선했습니다.",
          ],
        },
        {
          type: "heading2",
          content: "핵심 기능",
        },
        {
          type: "numberedList",
          items: [
            "COBOL 코드 분석 및 비즈니스 로직 추출",
            "Java/Spring Boot 기반 재구현",
            "데이터 마이그레이션 및 검증",
            "성능 테스트 및 최적화",
            "컨테이너 기반 배포 시스템 구축",
          ],
        },
        {
          type: "heading2",
          content: "프로젝트 기간",
        },
        {
          type: "paragraph",
          content: "2024년 10월 1일부터 2024년 11월 30일까지 진행되었습니다.",
        },
        {
          type: "heading2",
          content: "주요 도전 과제",
        },
        {
          type: "bulletedList",
          items: [
            "레거시 코드의 복잡한 비즈니스 로직 이해",
            "데이터 일관성 보장",
            "성능 저하 없이 마이그레이션",
            "기존 시스템과의 무중단 전환",
          ],
        },
        {
          type: "callout",
          icon: "💡",
          calloutType: "info",
          content:
            "레거시 시스템 마이그레이션의 복잡성을 직접 경험하며, 체계적인 접근 방법의 중요성을 배울 수 있었습니다.",
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
