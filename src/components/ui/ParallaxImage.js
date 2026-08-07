"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Cinematic Parallax Image with Animated Clip-Path Mask Reveal
 * Uses gsap.context() for safe React 19 cleanup & unmount memory safety.
 */
export default function ParallaxImage({
  src,
  alt = "Agency Image",
  className = "",
  aspectRatio = "aspect-video",
  parallaxFactor = 0.15
}) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // 1. Clip-Path Mask Reveal (bottom to top inset reveal)
      gsap.fromTo(
        containerRef.current,
        {
          clipPath: "inset(100% 0% 0% 0% rounded 1.5rem)",
        },
        {
          clipPath: "inset(0% 0% 0% 0% rounded 1.5rem)",
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // 2. Parallax scale & Y-parallax movement
      gsap.fromTo(
        imageRef.current,
        {
          scale: 1.25,
          yPercent: -12,
        },
        {
          scale: 1.0,
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert(); // Safely kill ScrollTriggers on component unmount
  }, [parallaxFactor]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl ${aspectRatio} ${className} will-change-[clip-path]`}
      style={{ clipPath: "inset(100% 0% 0% 0% rounded 1.5rem)" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className="w-full h-full object-cover will-change-transform"
      />
    </div>
  );
}
