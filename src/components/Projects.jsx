import { useState } from "react";
import { projectsKo } from "../data/projectData";

export default function Projects({ lang }) {
  const categories = ["전체", "실무", "개인"];
  const [filter, setFilter] = useState("전체");
  const [selectedProject, setSelectedProject] = useState(null); // 모달 상태

  const fullList = [...projectsKo.실무, ...projectsKo.개인];
  const filteredList = filter === "전체" ? fullList : projectsKo[filter];

  return (
    <section id="projects" className="py-20 bg-neutral-100 text-black">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 border-b border-zinc-400 pb-2">
          {lang === "ko" ? "프로젝트" : "Projects"}
        </h2>

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

        {/* 프로젝트 카드 */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredList.map((project, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-sm text-zinc-500 mb-2">{project.period}</p>
              <p className="text-zinc-700 mb-3">{project.description}</p>
              <div className="flex flex-wrap gap-2 text-sm mb-3">
                {project.stack.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-blue-600 px-2 py-1 rounded text-white"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {project.link && (
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-sm text-blue-700 underline"
                >
                  자세히 보기
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 모달 */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
          <div className="relative w-[95%] max-w-6xl h-[90%] bg-white rounded-xl overflow-hidden shadow-lg">
            {/* 닫기 버튼 */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-3 right-4 text-3xl text-gray-600 hover:text-black z-10"
            >
              ×
            </button>

            {/* iframe */}
            <iframe
              src={selectedProject.link}
              title={selectedProject.title}
              className="w-full h-full"
              frameBorder="0"
            ></iframe>

            {/* 하단 버튼 */}
            <div className="absolute bottom-0 left-0 w-full bg-white/90 flex justify-between px-6 py-3 border-t text-sm">
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                새 창에서 바로가기
              </a>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-zinc-600 hover:text-black"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
