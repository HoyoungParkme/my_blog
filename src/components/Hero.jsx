import React, { useState } from "react";
import { motion } from "framer-motion";
import IntroOverlay from "./IntroOverlay";

const Hero = () => {
  const [introDone, setIntroDone] = useState(false);
  return (
    <section
      id="hero"
      className="h-screen w-full flex items-center justify-center bg-neutral-100 text-black"
    >
      {/* Intro overlay (plays once per session) */}
      <IntroOverlay onComplete={() => setIntroDone(true)} />

      <div className="relative w-full text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 1 }}
          animate={introDone ? { opacity: 0.12, scale: 1 } : { opacity: 0, scale: 1 }}
          transition={{ duration: 2.6, delay: introDone ? 0.5 : 0 }}
          className="absolute bottom-[10%] left-0 right-0 flex items-center justify-center text-[9vw] md:text-[8vw] font-extrabold text-zinc-500 select-none pointer-events-none"
        >
          AI Service Engineer
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 1.4, delay: introDone ? 0.9 : 0 }}
          className="relative z-10 text-2xl md:text-4xl"
        >
          AI 서비스 개발자 <span className="font-extrabold">박호영</span>입니다.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={introDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ delay: introDone ? 1.3 : 0, duration: 1.2 }}
          className="mt-4 text-zinc-600"
        >
          비즈니스 임팩트를 만드는 엔터프라이즈 AI 서비스 개발자입니다.
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
