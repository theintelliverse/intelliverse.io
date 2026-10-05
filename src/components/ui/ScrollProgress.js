"use client";

import { useEffect, useRef } from "react";

/**
 * Scroll progress bar — a 2px amber line at the very top of the viewport
 * that fills as the user scrolls. Uses scaleX on a fixed element for 60fps.
 */
export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={barRef}
      className="scroll-progress-bar"
      aria-hidden="true"
      style={{ transformOrigin: "left", transform: "scaleX(0)" }}
    />
  );
}
