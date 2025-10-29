import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadProjectsFromMarkdown } from "../data/projectData";
import { projectsKo } from "../data/projectData";
import ProjectCard from "../components/ProjectCard";

/**
 * 프로젝트 목록 페이지
 * 모든 프로젝트를 카드 형태로 보여주는 페이지
 */
export default function ProjectList({ lang }) {
  const categories = ["전체", "실무", "개인"];
  const [filter, setFilter] = useState("전체");
  const [projects, setProjects] = useState(projectsKo);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 마크다운 파일에서 프로젝트 로드
    loadProjectsFromMarkdown()
      .then((loadedProjects) => {
        console.log("Loaded projects:", loadedProjects);
        console.log("실무 프로젝트 개수:", loadedProjects.실무?.length || 0);
        console.log("개인 프로젝트 개수:", loadedProjects.개인?.length || 0);
        setProjects(loadedProjects);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load projects:", error);
        setLoading(false);
      });
  }, []);

  const fullList = [...projects.실무, ...projects.개인];
  const filteredList = filter === "전체" ? fullList : projects[filter] || [];

  return (
    <div className="min-h-screen bg-neutral-100 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 mb-4 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 border border-gray-200 hover:border-gray-300"
          >
            <svg
              className="w-4 h-4 transition-transform hover:-translate-x-0.5"
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
            홈으로 돌아가기
          </Link>
          <h1 className="text-4xl font-bold mt-4 border-b border-zinc-400 pb-3">
            {lang === "ko" ? "프로젝트" : "Projects"}
          </h1>
        </div>

        {/* 필터 버튼 */}
        <div className="flex gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 text-sm rounded transition ${
                filter === cat
                  ? "bg-black text-white"
                  : "bg-zinc-300 hover:bg-zinc-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 프로젝트 카드 그리드 */}
        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-500">프로젝트를 불러오는 중...</p>
          </div>
        ) : filteredList.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredList.map((project, idx) => (
              <ProjectCard
                key={project.id || idx}
                project={project}
                variant="list"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">해당 카테고리의 프로젝트가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
