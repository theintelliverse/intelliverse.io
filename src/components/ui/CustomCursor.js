"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Awwwards-grade Custom Trailing Cursor with mix-blend-mode difference and magnetic snapping
 */
export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMagnetic, setIsMagnetic] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth fluid trailing spring config
  const springConfig = { stiffness: 320, damping: 28, mass: 0.1 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);

    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;

    document.documentElement.classList.add("custom-cursor-active");

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const magneticEl = target.closest('[data-cursor="magnetic"]') || target.closest(".magnetic-target");
      const hoverEl =
        magneticEl ||
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".cursor-pointer");

      setIsMagnetic(!!magneticEl);
      setIsHovered(!!hoverEl);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });

    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!mounted || typeof window === "undefined") return null;
  if (window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      {/* Outer trailing mix-blend-mode circle */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference",
          display: isVisible ? "block" : "none",
        }}
        animate={{
          scale: isClicking ? 0.75 : isMagnetic ? 2.4 : isHovered ? 1.8 : 1,
          width: 32,
          height: 32,
          backgroundColor: "#ffffff",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999] hidden lg:block"
      />

      {/* Center pinpoint */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference",
          display: isVisible ? "block" : "none",
        }}
        animate={{
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: "tween", duration: 0.15 }}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[99999] hidden lg:block"
      />
    </>
  );
}
