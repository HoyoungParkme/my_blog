export default function Experience({ lang }) {
  const content = {
    ko: {
      title: "기술 및 경력",
      skillsTitle: "보유 기술",
      highlightsTitle: "주요 경험",
      skills: [
        "Python",
        "TypeScript",
        "Node.js",
        "React",
        "Next.js",
        "FastAPI",
        "Django",
        "TensorFlow",
        "LangChain",
        "OpenAI",
        "Docker",
        "Kubernetes",
        "AWS",
        "GCP",
      ],
      highlights: [
        "현대글로비스 ERP 데이터 기반 KPI 설계 및 실시간 대시보드 구축",
        "삼성물산 Tableau REST API + FabricX + LangChain으로 AI Agent PoC 구현",
        "현대모비스 COBOL → Java 전환 에이전트 개발 PoC",
        "이상 패턴 탐지 모델에 RAG 개념을 접목해 영상 메타를 Vector DB로 관리하고, 학습 없이 유사 영상 탐지 연구",
      ],
    },
  };

  const t = content[lang] || content.ko;

  // Map for shields.io badge styling
  const badgeMeta = {
    Python: { color: "3776AB", logo: "python", logoColor: "white" },
    "TypeScript": { color: "3178C6", logo: "typescript", logoColor: "white" },
    "Node.js": { color: "339933", logo: "nodedotjs", logoColor: "white" },
    React: { color: "20232A", logo: "react", logoColor: "61DAFB" },
    "Next.js": { color: "000000", logo: "nextdotjs", logoColor: "white" },
    FastAPI: { color: "05998B", logo: "fastapi", logoColor: "white" },
    Django: { color: "092E20", logo: "django", logoColor: "white" },
    TensorFlow: { color: "FF6F00", logo: "tensorflow", logoColor: "white" },
    LangChain: { color: "2C3E50" },
    OpenAI: { color: "000000", logo: "openai", logoColor: "white" },
    Docker: { color: "2496ED", logo: "docker", logoColor: "white" },
    Kubernetes: { color: "326CE5", logo: "kubernetes", logoColor: "white" },
    AWS: { color: "232F3E", logo: "amazonaws", logoColor: "FF9900" },
    GCP: { color: "4285F4", logo: "googlecloud", logoColor: "white" },
  };

  const badgeUrl = (label) => {
    const meta = badgeMeta[label] || { color: "555" };
    const base = `https://img.shields.io/badge/${encodeURIComponent(label)}-${meta.color}`;
    const params = new URLSearchParams({ style: "for-the-badge" });
    if (meta.logo) params.set("logo", meta.logo);
    if (meta.logoColor) params.set("logoColor", meta.logoColor);
    return `${base}?${params.toString()}`;
  };

  return (
    <section id="experience" className="py-20 bg-neutral-100 text-black">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 border-b border-zinc-400 pb-2">
          {t.title}
        </h2>

        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-3">{t.skillsTitle}</h3>
          <div className="flex flex-wrap gap-2">
            {t.skills.map((skill, idx) => (
              <img
                key={idx}
                src={badgeUrl(skill)}
                alt={skill}
                className="h-7 md:h-8"
                loading="lazy"
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3">{t.highlightsTitle}</h3>
          <ul className="list-disc list-inside space-y-2 text-zinc-700">
            {t.highlights.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
