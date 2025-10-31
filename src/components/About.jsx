import myPhoto from "../assets/my-photo.jpg"; // 사용자 이미지

export default function About({ lang }) {
  const content = {
    ko: {
      title: "자기소개",
      description: (
        <div className="space-y-4">
          <p className="text-lg leading-relaxed text-zinc-700">
            저는 <span className="font-semibold">AI 기술 융합</span>과 <span className="font-semibold">서비스 전체 구조 설계</span>를 전문으로 하는 <span className="font-semibold">올라운더 개발자 박호영</span>입니다.
          </p>
          <p className="text-lg leading-relaxed text-zinc-700">
            챗봇, 비전, 에이전트 등 서로 다른 <span className="font-semibold">기술 스택</span>을 유기적으로 연결하여, <span className="font-semibold">새로운 가치</span>를 창출하는 것에 집중합니다. 필요하다면 <span className="font-semibold">라이브러리 코드 직접 수정</span>으로 <span className="font-semibold">현실적인 결과</span>를 만듭니다.
          </p>
          <p className="text-lg leading-relaxed text-zinc-700">
            저는 <span className="font-semibold">결과 중심의 프로젝트 관리</span>를 통해 목표를 달성하고, <span className="font-semibold">반복적인 시스템 개선</span>으로 서비스의 <span className="font-semibold">완성도</span>와 <span className="font-semibold">지속 가능성</span>을 극대화합니다.
          </p>
        </div>
      ),
    },
    en: {
      title: "About Me",
      description:
        "Hello! I'm Hoyoung Park, an all-round developer who handles the full process from data analysis to visualization and web service deployment. I design practical systems from the user's point of view and specialize in solving real-world problems with a flow-centered approach.",
    },
  };

  // Skills badges (shields.io)
  const skills = [
    { label: "Python", color: "3776AB", logo: "python", logoColor: "white" },
    { label: "Pandas", color: "150458", logo: "pandas", logoColor: "white" },
    { label: "SQL", color: "3E6E93" },
    { label: "BeautifulSoup", color: "5A9F4B" },
    { label: "TensorFlow", color: "FF6F00", logo: "tensorflow", logoColor: "white" },
    { label: "PyTorch", color: "EE4C2C", logo: "pytorch", logoColor: "white" },
    { label: "Django", color: "092E20", logo: "django", logoColor: "white" },
    { label: "React", color: "20232A", logo: "react", logoColor: "61DAFB" },
    { label: "Tableau", color: "E97627", logo: "tableau", logoColor: "white" },
    { label: "Docker", color: "2496ED", logo: "docker", logoColor: "white" },
    { label: "Metabase", color: "509EE3", logo: "metabase", logoColor: "white" },
  ];

  const badgeUrl = ({ label, color, logo, logoColor }) => {
    const base = `https://img.shields.io/badge/${encodeURIComponent(label)}-${color}`;
    const params = new URLSearchParams({ style: "for-the-badge" });
    if (logo) params.set("logo", logo);
    if (logoColor) params.set("logoColor", logoColor);
    return `${base}?${params.toString()}`;
  };

  // Key experiences derived from projects
  const experiences = [
    "현대글로비스 ERP 기반 KPI 설계 및 실시간 대시보드 구축",
    "Tableau REST API + OpenAI + LangChain으로 AI Agent PoC 구현",
    "Microsoft Fabric 기반 챗봇과 Tableau 연동으로 데이터 질의 자동화",
  ];

  const t = content[lang];

  return (
    <section id="about" className="py-20 bg-neutral-100 text-black">
      <div className="max-w-5xl mx-auto px-4 md:flex md:items-start md:gap-10">
        {" "}
        {/* md:gap-10 대신 md:gap-4 또는 다른 작은 값 사용 */}
        {/* 왼쪽 사진 - 크기 줄임 */}
        <div className="w-full md:w-1/4 mb-8 md:mb-0 flex md:justify-start">
          <img
            src={myPhoto}
            alt="박호영"
            className="rounded-xl shadow-lg max-w-[220px] h-auto object-cover"
          />
        </div>
        {/* 오른쪽 소개 텍스트 */}
        <div className="w-full md:w-2/3">
          <h2 className="text-3xl font-bold mb-6 border-b border-zinc-300 pb-2">
            {t.title}
          </h2>
          <div className="text-lg leading-relaxed text-zinc-700">
            {t.description}
          </div>

          {/* 기술 및 경력 섹션은 별도 컴포넌트(Experience)에서 렌더링됩니다. */}
        </div>
      </div>
    </section>
  );
}
