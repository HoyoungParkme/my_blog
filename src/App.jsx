import { useState } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import FloatingNav from "./components/FloatingNav";
import AnimatedSection from "./components/AnimatedSection";

const translations = {
  ko: {
    langName: "한국어",
    toggle: "English",
    intro: "안녕하세요, 데이터 기반 올라운더 개발자 박호영입니다.",
  },
  en: {
    langName: "English",
    toggle: "한국어",
    intro: "Hi, I'm Hoyoung Park, a data-driven all-round developer.",
  },
};

function App() {
  const [lang, setLang] = useState("ko");
  const t = translations[lang];

  return (
    <div className="font-sans text-black bg-neutral-100">
      <Hero intro={t.intro} />

      <AnimatedSection>
        <About lang={lang} />
      </AnimatedSection>
      <AnimatedSection>
        <Projects lang={lang} />
      </AnimatedSection>
      <AnimatedSection>
        <Experience lang={lang} />
      </AnimatedSection>

      <FloatingNav />

      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setLang(lang === "ko" ? "en" : "ko")}
          className="px-4 py-2 bg-zinc-800 text-white hover:bg-zinc-700 rounded text-sm"
        >
          {t.toggle}
        </button>
      </div>
    </div>
  );
}

export default App;
