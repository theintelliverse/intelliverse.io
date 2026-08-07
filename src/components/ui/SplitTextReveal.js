"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Reusable GSAP Split-Text Character/Word Scroll Reveal Component
 * Uses gsap.context() for safe React 19 cleanup & unmount memory safety.
 */
export default function SplitTextReveal({
  children,
  as: Component = "h2",
  className = "",
  stagger = 0.03,
  duration = 0.8,
  yOffset = 45,
  triggerStart = "top 85%",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;

    // React 19 GSAP Context scoping for clean memory disposal
    const ctx = gsap.context(() => {
      const charElements = containerRef.current.querySelectorAll(".split-char");

      if (charElements.length > 0) {
        gsap.fromTo(
          charElements,
          {
            y: yOffset,
            opacity: 0,
            rotateX: -20,
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            duration: duration,
            stagger: stagger,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: triggerStart,
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert(); // Automatically kills all ScrollTriggers & timelines inside container
  }, [stagger, duration, yOffset, triggerStart]);

  // Transform children string into characters wrapped in inline-block spans
  const text = typeof children === "string" ? children : "";
  const words = text.split(" ");

  return (
    <Component
      ref={containerRef}
      className={`inline-block overflow-hidden ${className}`}
      style={{ perspective: "600px" }}
    >
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split("").map((char, cIdx) => (
            <span
              key={cIdx}
              className="split-char inline-block will-change-transform opacity-0"
              style={{ display: "inline-block" }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </Component>
  );
}
