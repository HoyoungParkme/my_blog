/**
 * 프로젝트 목록
 *
 * 파일 경로: src/components/common/ProjectList.tsx
 * 목적: About과 Projects가 같은 행 구조로 프로젝트 목록을 그리고,
 *       데스크톱에서 행에 마우스를 올리면 커서를 따라다니는 미리보기 표지를 띄운다.
 * 주요 기능: 프로젝트 행(기간 / 제목·요약 / 역할), 미리보기(데스크톱 폭 + 마우스 환경에서만)
 * 주요 의존성: react, wouter, src/content/projects.ts, ./ProjectCover
 */

import { useEffect, useState, type MouseEvent } from "react";
import { Link } from "wouter";

import type { Project } from "@/content/projects";

import { ProjectCover } from "./ProjectCover";

/** 미리보기를 켜는 환경: 데스크톱 폭 + 마우스처럼 올려둘 수 있는 포인터. 터치에서는 끈다. */
const PREVIEW_MEDIA = "(min-width: 1001px) and (hover: hover) and (pointer: fine)";
/** ProjectCover 크기와 같아야 화면 끝에서 카드가 잘리지 않는다 */
const COVER_WIDTH = 220;
const COVER_HEIGHT = 290;
/** 커서와 카드 사이 간격, 화면 가장자리 여백(px) */
const CURSOR_GAP = 24;
const EDGE_GAP = 8;

interface Preview {
  project: Project;
  x: number;
  y: number;
}

/**
 * 프로젝트 행 목록과 미리보기.
 *
 * Args:
 *   projects: 그릴 프로젝트 (호출하는 쪽에서 개수를 정한다)
 *   className: 행들을 감싸는 요소의 클래스. 위 구분선 여부가 페이지마다 달라서 받는다.
 */
export function ProjectList({ projects, className }: { projects: Project[]; className?: string }) {
  const canPreview = useMediaQuery(PREVIEW_MEDIA);
  const [preview, setPreview] = useState<Preview | null>(null);

  const show = (project: Project) => (event: MouseEvent) =>
    setPreview({ project, ...placeNearCursor(event) });
  const move = (event: MouseEvent) =>
    setPreview((current) => (current ? { ...current, ...placeNearCursor(event) } : current));
  const hide = () => setPreview(null);

  return (
    <>
      <div className={className}>
        {projects.map((project) => (
          <ProjectRow
            key={project.slug}
            project={project}
            {...(canPreview && { onMouseEnter: show(project), onMouseMove: move, onMouseLeave: hide })}
          />
        ))}
      </div>

      {canPreview && preview && (
        // 위치는 바깥 요소가, 나타나는 애니메이션은 안쪽 요소가 맡아 transform이 서로 덮어쓰지 않게 한다
        <div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-30"
          style={{ transform: `translate(${preview.x}px, ${preview.y}px)` }}
        >
          <div key={preview.project.slug} className="cover-in">
            <ProjectCover project={preview.project} />
          </div>
        </div>
      )}
    </>
  );
}

function ProjectRow({
  project,
  ...handlers
}: {
  project: Project;
  onMouseEnter?: (event: MouseEvent) => void;
  onMouseMove?: (event: MouseEvent) => void;
  onMouseLeave?: () => void;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="grid grid-cols-1 items-start gap-1.5 border-b border-rule py-5 dt:grid-cols-[132px_minmax(0,1fr)_auto] dt:items-baseline dt:gap-6"
      {...handlers}
    >
      <span className="whitespace-nowrap text-sm tabular-nums text-ink-faint">
        {project.period}
      </span>
      <div>
        <div className="text-base font-semibold">{project.title}</div>
        <div className="mt-1.5 text-base text-ink-muted [text-wrap:pretty]">
          {project.summary}
        </div>
      </div>
      <div className="whitespace-nowrap text-[13px] text-ink-faint dt:text-right">
        {project.roleShort}
      </div>
    </Link>
  );
}

/** 커서 오른쪽에 카드를 두되, 화면 밖으로 나가면 왼쪽으로 넘기고 위아래는 화면 안으로 맞춘다. */
function placeNearCursor(event: MouseEvent): { x: number; y: number } {
  const right = event.clientX + CURSOR_GAP;
  const x =
    right + COVER_WIDTH > window.innerWidth - EDGE_GAP
      ? event.clientX - CURSOR_GAP - COVER_WIDTH
      : right;
  const y = Math.min(
    Math.max(event.clientY - COVER_HEIGHT / 2, EDGE_GAP),
    window.innerHeight - COVER_HEIGHT - EDGE_GAP,
  );
  return { x, y };
}

/** 미디어 쿼리 일치 여부. 창 크기나 입력 장치가 바뀌면 다시 계산한다. */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setMatches(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}
