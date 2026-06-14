"use client";

import { motion } from "framer-motion";
import audioManager from "@/lib/audioManager";

export default function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.8,
  distance = 40,
  once = false,
  threshold = 0.05,
  className = "",
  staggerChildren = 0.1,
  playSound = false,
}) {
  // Define animation presets
  const variants = {
    hidden: {
      opacity: 0,
      y: variant === "fade-up" ? distance : variant === "fade-down" ? -distance : variant === "lens-focus" ? 15 : 0,
      x: variant === "fade-left" ? distance : variant === "fade-right" ? -distance : 0,
      scale: variant === "scale-in" ? 0.92 : variant === "lens-focus" ? 1.04 : 1,
      filter: variant === "lens-focus" ? "blur(12px)" : "none",
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.215, 0.61, 0.355, 1], // Custom cubic-bezier (easeOutCubic/Quint-like)
        when: "beforeChildren",
        staggerChildren: staggerChildren,
      },
    },
  };

  const handleViewportEnter = () => {
    if (playSound) {
      audioManager.playScrollSweep();
    }
  };

  // If this is a stagger container
  if (variant === "stagger-container") {
    const containerVariants = {
      hidden: { opacity: 1 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: delay,
          staggerChildren: staggerChildren,
        },
      },
    };

    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: threshold }}
        variants={containerVariants}
        onViewportEnter={handleViewportEnter}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={variants}
      onViewportEnter={handleViewportEnter}
      className={className}
    >
      {children}
    </motion.div>
  );
}
