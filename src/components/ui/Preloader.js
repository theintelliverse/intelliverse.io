"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";

const emptySubscribe = () => () => {};

/**
 * Cinematic 0%-100% Preloader Sequence
 * Uses sessionStorage to run once per session and prevents body scroll while active.
 */
export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(() => {
    if (typeof window !== "undefined") {
      return !sessionStorage.getItem("intelliverse_preloader_seen");
    }
    return true;
  });
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Check if user already saw the preloader in this session
    const hasSeen = sessionStorage.getItem("intelliverse_preloader_seen");
    if (hasSeen) {
      queueMicrotask(() => setIsLoading(false));
      return;
    }

    // Lock body scrolling during load
    document.body.style.overflow = "hidden";

    // Simulate smooth asset & 3D WebGL loading counter
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "";
            sessionStorage.setItem("intelliverse_preloader_seen", "true");
          }, 300);
          return 100;
        }
        const increment = Math.floor(Math.random() * 12) + 4;
        return Math.min(100, prev + increment);
      });
    }, 45);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  if (!isClient) return null;

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ y: "0%" }}
          exit={{
            y: "-100%",
            transition: { duration: 0.85, ease: [0.85, 0, 0.15, 1] }
          }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#05020c] text-white select-none pointer-events-auto"
        >
          {/* Brand Logo & Spinner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-6"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/the%20intelliverse%20logo.jpg"
              alt="The Intelliverse Logo"
              className="w-24 h-24 rounded-full border border-blue-500/30 shadow-2xl shadow-blue-500/20 animate-pulse"
            />

            {/* Percentage Number */}
            <div className="flex items-baseline font-mono">
              <span className="text-5xl sm:text-7xl font-black tracking-tighter text-white">
                {String(progress).padStart(3, "0")}
              </span>
              <span className="text-blue-500 text-xl font-bold ml-1">%</span>
            </div>

            {/* Loading Bar */}
            <div className="w-48 sm:w-64 h-1 bg-white/10 rounded-full overflow-hidden mt-2">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-gray-500 mt-2">
              {"// "}INITIALIZING 3D ENGINE
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
