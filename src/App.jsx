import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import FloatingNav from "./components/FloatingNav";
import AnimatedSection from "./components/AnimatedSection";
import ProjectList from "./pages/ProjectList";
import ProjectDetail from "./pages/ProjectDetail";

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

function HomePage({ lang, setLang, t }) {
  return (
    <>
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
    </>
  );
}

function App() {
  const [lang, setLang] = useState("ko");
  const t = translations[lang];

  return (
    <Router>
      <div className="font-sans text-black bg-neutral-100">
        <Routes>
          <Route
            path="/"
            element={<HomePage lang={lang} setLang={setLang} t={t} />}
          />
          <Route path="/projects" element={<ProjectList lang={lang} />} />
          <Route
            path="/projects/:projectId"
            element={<ProjectDetail lang={lang} />}
          />
        </Routes>

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
    </Router>
  );
}

export default App;
