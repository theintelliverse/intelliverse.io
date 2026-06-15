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
  once = true, // Set to true by default for zero-lag subsequent scrolls
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
    threshold: 0.05,
  });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 340) {
        // Fold phone (folded) - snappiest, lowest-overhead transition
        setDeviceConfig({
          distance: 8,
          duration: 0.35,
          enable3D: false,
          enableBlur: false,
          delayMultiplier: 0.5,
          threshold: 0.01, // trigger early
        });
      } else if (w < 768) {
        // Standard phone
        setDeviceConfig({
          distance: 12,
          duration: 0.4,
          enable3D: false,
          enableBlur: false,
          delayMultiplier: 0.6,
          threshold: 0.02,
        });
      } else if (w < 1024) {
        // Tablet / Unfolded fold phone
        setDeviceConfig({
          distance: 18,
          duration: 0.5,
          enable3D: false,
          enableBlur: false,
          delayMultiplier: 0.7,
          threshold: 0.03,
        });
      } else if (w < 1440) {
        // Laptop
        setDeviceConfig({
          distance: 25,
          duration: 0.6,
          enable3D: true,
          enableBlur: true,
          delayMultiplier: 0.85,
          threshold: 0.04,
        });
      } else {
        // PC / Desktop - fully rich high-framerate animations
        setDeviceConfig({
          distance: 35,
          duration: 0.7,
          enable3D: true,
          enableBlur: true,
          delayMultiplier: 1.0,
          threshold: 0.05,
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
  const activeThreshold = threshold !== 0.05 ? threshold : deviceConfig.threshold;

  // Multi-step custom keyframe configurations for rich visuals across all viewports (exactly 5 keys each)
  const variants = {
    hidden: {
      opacity: 0,
      y: variant === "fade-up" || variant === "bounce-up"
        ? activeDistance
        : variant === "fade-down"
        ? -activeDistance
        : variant === "perspective-3d"
        ? activeDistance * 1.2
        : variant === "lens-focus"
        ? 6
        : 0,
      x: variant === "fade-left" ? activeDistance : variant === "fade-right" ? -activeDistance : 0,
      scale: variant === "scale-in" ? 0.93 : variant === "lens-focus" ? 1.04 : 1,
      rotateX: variant === "perspective-3d" && deviceConfig.enable3D ? 12 : 0,
      filter: variant === "lens-focus" && deviceConfig.enableBlur ? "blur(12px)" : "none",
    },
    visible: {
      opacity: [0, 0.45, 0.8, 0.95, 1],
      y: variant === "fade-up"
        ? [activeDistance, activeDistance * 0.4, -activeDistance * 0.08, -activeDistance * 0.02, 0]
        : variant === "bounce-up"
        ? [activeDistance * 1.4, activeDistance * 0.45, -activeDistance * 0.15, activeDistance * 0.04, 0]
        : variant === "fade-down"
        ? [-activeDistance, -activeDistance * 0.4, activeDistance * 0.08, activeDistance * 0.02, 0]
        : variant === "perspective-3d"
        ? [activeDistance * 1.2, activeDistance * 0.45, -activeDistance * 0.08, -activeDistance * 0.02, 0]
        : 0,
      x: variant === "fade-left"
        ? [activeDistance, activeDistance * 0.4, -activeDistance * 0.08, -activeDistance * 0.02, 0]
        : variant === "fade-right"
        ? [-activeDistance, -activeDistance * 0.4, activeDistance * 0.08, activeDistance * 0.02, 0]
        : 0,
      scale: variant === "scale-in"
        ? [0.93, 0.97, 1.015, 0.99, 1]
        : variant === "bounce-up"
        ? [0.93, 0.97, 1.025, 0.995, 1]
        : variant === "lens-focus"
        ? [1.04, 1.01, 0.993, 1.002, 1]
        : 1,
      rotate: variant === "fade-left" && deviceConfig.enable3D
        ? [2, 0.8, -0.2, 0.05, 0]
        : variant === "fade-right" && deviceConfig.enable3D
        ? [-2, -0.8, 0.2, -0.05, 0]
        : 0,
      rotateX: variant === "perspective-3d" && deviceConfig.enable3D
        ? [12, 5, -1.8, 0.4, 0]
        : 0,
      filter: variant === "lens-focus" && deviceConfig.enableBlur
        ? ["blur(12px)", "blur(5px)", "blur(1.8px)", "blur(0.4px)", "blur(0px)"]
        : "blur(0px)",
      transition: {
        duration: activeDuration,
        delay: activeDelay,
        times: [0, 0.3, 0.6, 0.85, 1], // Fine-grained keyframe timeline distribution
        ease: ["easeOut", "easeInOut", "easeInOut", "easeOut"], 
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
        viewport={{ once, amount: activeThreshold }}
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
      viewport={{ once, amount: activeThreshold }}
      variants={variants}
      onViewportEnter={handleViewportEnter}
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
