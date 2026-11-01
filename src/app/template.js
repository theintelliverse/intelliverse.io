"use client";

import { motion } from "framer-motion";

/**
 * Next.js App Router Template Wrapper for Page Transitions
 * Triggers cinematic entrance and exit animations on route changes (e.g. Home <-> /admin).
 */
export default function Template({ children }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  );
}
