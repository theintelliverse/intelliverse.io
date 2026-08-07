"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";

/**
 * SVG Circular Scroll Progress Indicator & Magnetic Back-To-Top Button
 */
export default function ScrollProgress() {
  const { scrollYProgress, scrollY } = useScroll();

  // Smooth scroll progress spring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 25,
    restDelta: 0.001
  });

  // SVG circle circumference for r=18: 2 * PI * 18 = ~113.1
  const strokeDashoffset = useTransform(smoothProgress, [0, 1], [113.1, 0]);

  // Hide scale when at top of page (scrollY < 60)
  const scale = useTransform(scrollY, [0, 60], [0, 1]);
  const opacity = useTransform(scrollY, [0, 60], [0, 1]);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <motion.div
      style={{ scale, opacity }}
      className="fixed bottom-6 right-6 z-[9990] pointer-events-auto"
    >
      <Magnetic strength={0.4}>
        <button
          onClick={scrollToTop}
          className="relative w-12 h-12 rounded-full border border-white/10 bg-[#05020c]/80 backdrop-blur-md flex items-center justify-center text-white shadow-2xl hover:border-blue-500/50 transition-colors group"
          aria-label="Scroll to top"
        >
          {/* SVG Circular Progress Track */}
          <svg className="absolute inset-0 w-full h-full -rotate-90 p-0.5" viewBox="0 0 44 44">
            <circle
              cx="22"
              cy="22"
              r="18"
              className="stroke-white/10 fill-none"
              strokeWidth="2"
            />
            <motion.circle
              cx="22"
              cy="22"
              r="18"
              className="stroke-blue-500 fill-none"
              strokeWidth="2.5"
              strokeDasharray="113.1"
              style={{ strokeDashoffset }}
              strokeLinecap="round"
            />
          </svg>

          {/* Up Chevron Icon */}
          <i className="fas fa-chevron-up text-xs text-blue-400 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </Magnetic>
    </motion.div>
  );
}
