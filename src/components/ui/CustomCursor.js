"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring configurations for the lagging trailing ring
  const springConfig = { stiffness: 280, damping: 26 };
  const trailX = useSpring(cursorX, springConfig);
  const trailY = useSpring(cursorY, springConfig);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);

    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) return;

    // Add class to document element to hide default cursor
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
      
      const isClickable = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") || 
        target.classList.contains("cursor-pointer") ||
        target.closest(".cursor-pointer") ||
        target.closest(".founder-chat-card") ||
        target.closest(".starter-card");
        
      setIsHovered(!!isClickable);
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

  const isMobile = window.matchMedia("(pointer: coarse)").matches;
  if (isMobile) return null;

  return (
    <>
      {/* Outer trailing neon ring */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          display: isVisible ? "block" : "none",
        }}
        animate={{
          scale: isClicking ? 0.75 : isHovered ? 1.6 : 1,
          backgroundColor: isHovered ? "rgba(99, 102, 241, 0.25)" : "transparent",
          borderColor: isHovered ? "rgba(6, 182, 212, 0.85)" : "rgba(255, 255, 255, 0.25)",
          borderWidth: isHovered ? "1px" : "1.5px",
          boxShadow: isHovered 
            ? "0 0 20px rgba(6, 182, 212, 0.4), inset 0 0 8px rgba(99, 102, 241, 0.3)" 
            : "none",
          width: isHovered ? 38 : 26,
          height: isHovered ? 38 : 26,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[99999] hidden lg:block"
      />

      {/* Inner pinpoint dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          display: isVisible ? "block" : "none",
        }}
        animate={{
          scale: isClicking ? 1.4 : isHovered ? 0.5 : 1,
          backgroundColor: isHovered ? "rgb(6, 182, 212)" : "rgb(255, 255, 255)",
        }}
        transition={{ type: "tween", duration: 0.1 }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[99999] hidden lg:block"
      />
    </>
  );
}
