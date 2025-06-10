import React from "react";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      id="hero"
      className="h-screen w-full flex items-center justify-center bg-neutral-100 text-black"
    >
      <div className="relative w-full text-center">
        <motion.h1
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 0.12, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute bottom-[10%] left-0 right-0 flex items-center justify-center text-[9vw] md:text-[8vw] font-extrabold text-zinc-500 select-none pointer-events-none"
        >
          Data Analyst
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-2xl md:text-4xl"
        >
          데이터 분석가 <span className="font-extrabold">박호영</span>입니다.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-4 text-zinc-600"
        >
          분석부터 서비스까지, 직접 만드는 데이터 중심 개발자입니다.
        </motion.p>
      </div>
    </section>
  );
};

export default Hero;
