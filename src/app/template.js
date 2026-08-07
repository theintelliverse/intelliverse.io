"use client";

import { motion } from "framer-motion";

/**
 * Next.js App Router Template Wrapper for Page Transitions
 * Triggers cinematic entrance and exit animations on route changes (e.g. Home <-> /admin).
 */
export default function Template({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -15, scale: 0.99 }}
      transition={{
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo decel
      }}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  );
}
