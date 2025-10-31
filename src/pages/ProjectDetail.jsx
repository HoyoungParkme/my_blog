import { useParams, Link, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { loadProjectsFromMarkdown } from "../data/projectData";
import { projectsKo } from "../data/projectData";
import ProjectDetailContent from "../components/ProjectDetailContent";

/**
 * 프로젝트 상세 페이지
 * "자세히 보기"를 누른 후 표시되는 전체 페이지 레이아웃
 */
export default function ProjectDetail({ lang }) {
  const { projectId } = useParams();
  const [projects, setProjects] = useState(projectsKo);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 마크다운 파일에서 프로젝트 로드
    loadProjectsFromMarkdown()
      .then((loadedProjects) => {
        setProjects(loadedProjects);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load projects:", error);
        setLoading(false);
      });
  }, []);

  // 모든 프로젝트 합치기
  const allProjects = [...projects.실무, ...projects.연구];

  // ID로 프로젝트 찾기 (숫자인 경우 인덱스로 변환)
  const project =
    allProjects.find((p) => p.id === projectId) ||
    (!isNaN(parseInt(projectId)) && allProjects[parseInt(projectId)]) ||
    null;

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500">프로젝트를 불러오는 중...</p>
      </div>
    );
  }

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <Link
            to="/"
            aria-label="홈으로"
            className="inline-flex items-center justify-center w-9 h-9 mb-4 rounded-full border border-zinc-300 text-zinc-600 hover:text-black hover:bg-zinc-100 hover:border-zinc-400 transition"
            title="홈으로"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              {project.title}
            </h1>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <ProjectDetailContent project={project} />
    </div>
  );
}
