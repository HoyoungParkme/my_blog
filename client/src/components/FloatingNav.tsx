import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

export function FloatingNav() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 p-3 bg-card/90 backdrop-blur-md rounded-full border border-border shadow-lg hover:bg-secondary transition-colors cursor-pointer"
      data-testid="button-scroll-top"
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5 text-foreground" />
    </motion.button>
  );
}
