"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // Configure Lenis smooth scrolling with premium inertial characteristics
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium exponential out easing
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Sync scroll with scroll-to-top button or external links by binding custom behavior
    const handleScrollTo = (e) => {
      const target = e.target.closest("a[href^='#']");
      if (target) {
        const hash = target.getAttribute("href");
        if (hash && hash !== "#") {
          const element = document.querySelector(hash);
          if (element) {
            e.preventDefault();
            lenis.scrollTo(element, { offset: 0, duration: 1.2 });
          }
        }
      }
    };

    document.addEventListener("click", handleScrollTo);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleScrollTo);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
