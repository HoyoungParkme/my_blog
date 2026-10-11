/**
 * Projects 화면
 *
 * 파일 경로: src/pages/Projects.tsx
 * 목적: 전체 프로젝트를 최신순 목록으로 보여준다.
 * 주요 의존성: src/content/projects.ts
 *
 * Troubleshooting 목록과 같은 행 구조를 쓴다(좌: 기간 / 중: 제목·요약 / 우: 역할).
 * 커버 이미지가 준비되지 않아 회색 블록만 자리를 차지하던 카드 그리드를 걷어냈다.
 */

import { ListPageLayout } from "@/components/common/ListPageLayout";
import { ProjectList } from "@/components/common/ProjectList";
import { projects } from "@/content/projects";

export default function Projects() {
  return (
    <ListPageLayout title="Projects">
      <ProjectList projects={projects} className="flex flex-col border-t border-ink" />
    </ListPageLayout>
  );
}
