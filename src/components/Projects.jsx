import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadProjectsFromMarkdown } from "../data/projectData";
import { projectsKo } from "../data/projectData";
import ProjectCard from "./ProjectCard";

/**
 * 메인 페이지의 프로젝트 섹션
 * "자세히 보기"를 누르기 전의 미리보기 카드들
 */
export default function Projects({ lang }) {
  const categories = ["전체", "실무", "연구"];
  const [filter, setFilter] = useState("전체");
  const [projects, setProjects] = useState({ 실무: [], 연구: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 마크다운 파일에서 프로젝트 로드
    loadProjectsFromMarkdown()
      .then((loadedProjects) => {
        console.log("Loaded projects in Projects component:", loadedProjects);
        console.log("실무 프로젝트 개수:", loadedProjects.실무?.length || 0);
        console.log("연구 프로젝트 개수:", loadedProjects.연구?.length || 0);
        setProjects(loadedProjects);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load projects:", error);
        // 에러 발생 시 기본 데이터 사용
        setProjects(projectsKo);
        setLoading(false);
      });
  }, []);

  const fullList = [...projects.실무, ...projects.연구];
  const filteredList = filter === "전체" ? fullList : projects[filter] || [];

  return (
    <section id="projects" className="py-20 bg-neutral-100 text-black">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-8 border-b border-zinc-400 pb-2">
          <h2 className="text-3xl font-bold">
            {lang === "ko" ? "프로젝트" : "Projects"}
          </h2>
        </div>

        {/* 필터 버튼 */}
        <div className="flex gap-3 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-1.5 text-sm rounded ${
                filter === cat ? "bg-black text-white" : "bg-zinc-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 프로젝트 카드 - 미리보기 */}
        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-500">프로젝트를 불러오는 중...</p>
          </div>
        ) : filteredList.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredList.map((project, idx) => (
              <ProjectCard
                key={project.id || idx}
                project={project}
                variant="default"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">해당 카테고리의 프로젝트가 없습니다.</p>
          </div>
        )}
      </div>
    </section>
  );
}
