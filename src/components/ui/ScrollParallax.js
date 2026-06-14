"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollParallax({ children, speed = 0.2, className = "" }) {
  const ref = useRef(null);

  // Track the element's position relative to the viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Interpolate y offset: start at positive offset and end at negative offset
  const y = useTransform(scrollYProgress, [0, 1], [120 * speed, -120 * speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
