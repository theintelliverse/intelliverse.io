"use client";

import { useState, useEffect } from "react";
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
  const [deviceConfig, setDeviceConfig] = useState({
    distance: 20,
    duration: 0.5,
    enable3D: false,
    enableBlur: false,
    delayMultiplier: 0.8,
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 340) {
        // Fold phone (folded)
        setDeviceConfig({
          distance: 10,
          duration: 0.4,
          enable3D: false,
          enableBlur: false,
          delayMultiplier: 0.6,
        });
      } else if (w < 768) {
        // Standard phone
        setDeviceConfig({
          distance: 15,
          duration: 0.45,
          enable3D: false,
          enableBlur: false,
          delayMultiplier: 0.7,
        });
      } else if (w < 1024) {
        // Tablet / Unfolded fold
        setDeviceConfig({
          distance: 22,
          duration: 0.55,
          enable3D: false,
          enableBlur: false,
          delayMultiplier: 0.8,
        });
      } else if (w < 1440) {
        // Laptop
        setDeviceConfig({
          distance: 30,
          duration: 0.65,
          enable3D: true,
          enableBlur: true,
          delayMultiplier: 0.9,
        });
      } else {
        // PC / Desktop
        setDeviceConfig({
          distance: 40,
          duration: 0.75,
          enable3D: true,
          enableBlur: true,
          delayMultiplier: 1.0,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeDistance = distance !== 40 ? distance : deviceConfig.distance;
  const activeDuration = duration !== 0.8 ? duration : deviceConfig.duration;
  const activeDelay = delay * deviceConfig.delayMultiplier;

  // Define optimized GPU-accelerated keyframe presets
  const variants = {
    hidden: {
      opacity: 0,
      y: variant === "fade-up" || variant === "bounce-up"
        ? (variant === "bounce-up" ? activeDistance * 1.3 : activeDistance)
        : variant === "fade-down"
        ? -activeDistance
        : variant === "perspective-3d"
        ? activeDistance
        : variant === "lens-focus"
        ? 8
        : 0,
      x: variant === "fade-left" ? activeDistance : variant === "fade-right" ? -activeDistance : 0,
      scale: variant === "scale-in" ? 0.95 : variant === "lens-focus" ? 1.03 : 1,
      rotateX: variant === "perspective-3d" && deviceConfig.enable3D ? 8 : 0,
      filter: variant === "lens-focus" && deviceConfig.enableBlur ? "blur(8px)" : "none",
    },
    visible: {
      opacity: [0, 0.65, 1],
      y: variant === "fade-up"
        ? [activeDistance, -Math.round(activeDistance * 0.15), 0]
        : variant === "bounce-up"
        ? [activeDistance * 1.3, -Math.round(activeDistance * 0.25), Math.round(activeDistance * 0.06), 0]
        : variant === "fade-down"
        ? [-activeDistance, Math.round(activeDistance * 0.15), 0]
        : variant === "perspective-3d"
        ? [activeDistance, -Math.round(activeDistance * 0.12), 0]
        : 0,
      x: variant === "fade-left"
        ? [activeDistance, -Math.round(activeDistance * 0.15), 0]
        : variant === "fade-right"
        ? [-activeDistance, Math.round(activeDistance * 0.15), 0]
        : 0,
      scale: variant === "scale-in"
        ? [0.95, 1.01, 1]
        : variant === "bounce-up"
        ? [0.94, 1.025, 0.99, 1]
        : variant === "lens-focus"
        ? [1.03, 0.992, 1]
        : 1,
      rotate: variant === "fade-left" && deviceConfig.enable3D
        ? [1.5, -0.2, 0]
        : variant === "fade-right" && deviceConfig.enable3D
        ? [-1.5, 0.2, 0]
        : 0,
      rotateX: variant === "perspective-3d" && deviceConfig.enable3D
        ? [8, -1.5, 0]
        : 0,
      filter: variant === "lens-focus" && deviceConfig.enableBlur
        ? ["blur(8px)", "blur(2px)", "blur(0px)"]
        : "blur(0px)",
      transition: {
        duration: activeDuration,
        delay: activeDelay,
        ease: [0.25, 0.46, 0.45, 0.94], // Hardware accelerated ease-out curve
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
          delayChildren: activeDelay,
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
        style={{ willChange: "transform, opacity" }}
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
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
