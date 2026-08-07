"use client";

import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/";

/**
 * Cyber-Glitch Matrix Text Scramble Effect Component
 * Uses requestAnimationFrame for 60 FPS performance without React state thrashing.
 */
export default function ScrambleText({
  text = "INTELLIVERSE",
  className = "",
  speed = 40,
  scrambleCount = 3
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!isInView) return;

    let frameId;
    let iteration = 0;
    const totalFrames = text.length * scrambleCount;

    const animateScramble = () => {
      setDisplayText(() =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < Math.floor(iteration / scrambleCount)) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration < totalFrames) {
        iteration++;
        frameId = requestAnimationFrame(animateScramble);
      } else {
        setDisplayText(text);
      }
    };

    frameId = requestAnimationFrame(animateScramble);

    return () => cancelAnimationFrame(frameId);
  }, [isInView, text, scrambleCount]);

  return (
    <span ref={ref} className={`font-mono inline-block ${className}`}>
      {displayText}
    </span>
  );
}
