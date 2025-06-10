import myPhoto from "../assets/my-photo.jpg"; // 사용자 이미지

export default function About({ lang }) {
  const content = {
    ko: {
      title: "자기소개",
      description:
        "안녕하세요. 저는 데이터를 기반으로 분석, 시각화, 웹서비스까지 연결하는 올라운더 개발자 박호영입니다. 사용자 관점의 실용적인 시스템을 설계하고 구현하는 데 관심이 많으며, 실무에서 발생하는 문제를 흐름 중심으로 해결하는 데 강점을 가지고 있습니다.",
    },
    en: {
      title: "About Me",
      description:
        "Hello! I'm Hoyoung Park, an all-round developer who handles the full process from data analysis to visualization and web service deployment. I design practical systems from the user's point of view and specialize in solving real-world problems with a flow-centered approach.",
    },
  };

  const t = content[lang];

  return (
    <section id="about" className="py-20 bg-neutral-100 text-black">
      <div className="max-w-5xl mx-auto px-4 md:flex md:items-center md:gap-10">
        {" "}
        {/* md:gap-10 대신 md:gap-4 또는 다른 작은 값 사용 */}
        {/* 왼쪽 사진 - 크기 줄임 */}
        <div className="w-full md:w-1/4 mb-8 md:mb-0 flex">
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
          <p className="text-lg leading-relaxed text-zinc-700">
            {t.description}
          </p>
        </div>
      </div>
    </section>
  );
}
