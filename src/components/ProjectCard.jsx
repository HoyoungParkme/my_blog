import { Link } from "react-router-dom";

/**
 * 프로젝트 미리보기 카드 컴포넌트
 * 자세히 보기를 눌렀을 때 표시되는 카드 형태
 */
export default function ProjectCard({ project, variant = "default" }) {
  // variant에 따른 스타일 변경
  const cardStyles = {
    default:
      "bg-white p-6 rounded-lg shadow hover:shadow-md transition block group",
    list: "bg-white p-6 rounded-lg shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 block group",
  };

  return (
    <Link
      to={`/projects/${
        project.id || project.title?.toLowerCase().replace(/\s+/g, "-")
      }`}
      className={cardStyles[variant] || cardStyles.default}
    >
      <h3 className="text-xl font-semibold mb-2 text-gray-900">
        {project.title}
      </h3>
      <p className="text-sm text-zinc-500 mb-2">{project.period}</p>
      <p
        className={`text-zinc-700 mb-3 ${
          variant === "list" ? "line-clamp-3" : ""
        }`}
      >
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-3">
        {project.stack?.map((tech, i) => (
          <span
            key={i}
            className={`bg-blue-600 px-2 py-1 rounded text-white ${
              variant === "list" ? "text-xs" : "text-sm"
            }`}
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <span className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
          {variant === "list" ? (
            <>
              자세히 보기
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </>
          ) : (
            <>
              자세히 보기
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </>
          )}
        </span>
      </div>
    </Link>
  );
}
