"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScroll({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    // Disable Lenis smooth scrolling entirely on admin panel routes
    if (pathname?.startsWith("/admin")) {
      document.documentElement.classList.remove("lenis", "lenis-smooth", "lenis-stopped");
      return;
    }

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

    if (typeof window !== "undefined") {
      window.__lenis = lenis;
    }

    // Connect Lenis scroll events to ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", handleScroll);

    // Drive Lenis directly via GSAP ticker for frame-perfect sync
    const handleTicker = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(handleTicker);
    gsap.ticker.lagSmoothing(0);

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
      gsap.ticker.remove(handleTicker);
      lenis.off("scroll", handleScroll);
      document.removeEventListener("click", handleScrollTo);
      lenis.destroy();
      document.documentElement.classList.remove("lenis", "lenis-smooth", "lenis-stopped");
    };
  }, [pathname]);

  return <>{children}</>;
}
