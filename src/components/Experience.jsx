export default function Experience({ lang }) {
  const content = {
    ko: {
      title: "기술 및 경력",
      skillsTitle: "보유 기술",
      highlightsTitle: "주요 경험",
      skills: [
        "Python",
        "Pandas",
        "SQL",
        "BeautifulSoup",
        "TensorFlow",
        "PyTorch",
        "Django",
        "React",
        "Tableau",
        "Docker",
        "Metabase",
      ],
      highlights: [
        "ETL 자동화 및 데이터 정제 파이프라인 구축 경험",
        "Tableau를 활용한 대시보드 구축 및 사용자 맞춤 시각화 제공",
        "Django REST API 개발 및 프론트와 통신 설계",
        "머신러닝 모델 서빙 및 웹 연동 경험",
        "Git과 협업 툴을 이용한 팀 프로젝트 진행",
      ],
    },
    en: {
      title: "Skills & Experience",
      skillsTitle: "Skills",
      highlightsTitle: "Highlights",
      skills: [
        "Python",
        "Pandas",
        "SQL",
        "BeautifulSoup",
        "TensorFlow",
        "PyTorch",
        "Django",
        "React",
        "Tableau",
        "Docker",
        "Metabase",
      ],
      highlights: [
        "Built automated ETL pipelines for data collection and cleansing",
        "Designed user-centric dashboards using Tableau",
        "Developed REST APIs with Django and frontend integration",
        "Deployed machine learning models into production systems",
        "Led team projects with Git and collaboration tools",
      ],
    },
  };

  const t = content[lang];

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
              <span
                key={idx}
                className="bg-white border border-zinc-300 text-sm px-3 py-1 rounded shadow-sm"
              >
                {skill}
              </span>
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
