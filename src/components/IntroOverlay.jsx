import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const IntroOverlay = ({ onComplete, playOnceKey = "introPlayed", durationMs = 2800 }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    try {
      if (playOnceKey && typeof window !== "undefined") {
        const played = window.sessionStorage.getItem(playOnceKey);
        if (played === "1") {
          setShow(false);
          onComplete?.();
          return;
        }
      }
    } catch (_) {
      // ignore storage errors (e.g., privacy mode)
    }

    const timer = setTimeout(() => {
      setShow(false);
      try {
        if (playOnceKey && typeof window !== "undefined") {
          window.sessionStorage.setItem(playOnceKey, "1");
        }
      } catch (_) {}
      onComplete?.();
    }, durationMs);

    return () => clearTimeout(timer);
  }, [onComplete, playOnceKey, durationMs]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.0, ease: "easeOut" } }}
          className="fixed inset-0 z-[60] bg-black"
        >
          {/* Subtle vignette */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0.9)_70%)]" />

          {/* Sweep line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-1/2 h-[2px] w-full origin-left bg-white/90"
          />

          {/* Central mark */}
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative">
              <div className="h-16 w-16 rounded-full bg-white/90" />
              <div className="absolute inset-0 -z-10 blur-xl rounded-full bg-white/40" />
            </div>
          </motion.div>

          {/* Removed side sweep mask for cleaner center-focused look */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroOverlay;
