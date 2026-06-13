"use client";

import { useState, useEffect } from "react";

export default function ScrollToTop() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      id="scroll-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={showScrollTop ? "visible" : ""}
      aria-label="Scroll to top"
    >
      <i className="fas fa-chevron-up"></i>
    </button>
  );
}
