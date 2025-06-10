import React from "react";
import { motion } from "framer-motion";

const AnimatedSection = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ ease: "easeInOut", duration: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
