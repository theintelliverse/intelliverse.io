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
        // Fold phone (folded) - compact, ultra-snappy scroll animation
        setDeviceConfig({
          distance: 6,
          duration: 0.35,
          enable3D: false,
          enableBlur: false,
          delayMultiplier: 0.5,
          threshold: 0.01, // trigger early for small viewports
        });
      } else if (w < 768) {
        // Standard phone - mobile fluid layout, fast and smooth
        setDeviceConfig({
          distance: 10,
          duration: 0.4,
          enable3D: false,
          enableBlur: false,
          delayMultiplier: 0.6,
          threshold: 0.02,
        });
      } else if (w < 1024) {
        // Tablet / Unfolded fold phone - medium scale, smooth
        setDeviceConfig({
          distance: 15,
          duration: 0.5,
          enable3D: false,
          enableBlur: false,
          delayMultiplier: 0.7,
          threshold: 0.03,
        });
      } else if (w < 1440) {
        // Laptop - high quality, light 3D and blur
        setDeviceConfig({
          distance: 20,
          duration: 0.65,
          enable3D: true,
          enableBlur: true,
          delayMultiplier: 0.85,
          threshold: 0.04,
        });
      } else {
        // PC / Desktop / Ultrawide - maximum fidelity, deep perspective & blur
        setDeviceConfig({
          distance: 28,
          duration: 0.8,
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

  // 8-step keyframes timeline distribution for extreme smoothness (times has 8 values)
  const stepTimes = [0, 0.12, 0.28, 0.45, 0.62, 0.78, 0.9, 1];

  // Easing function intervals (7 segments between 8 keyframes)
  // Decelerating cubic-bezier curve to give a premium inertia-scrolling aesthetic
  const premiumEasings = [
    "cubic-bezier(0.16, 1, 0.3, 1)", // easeOutExpo
    "cubic-bezier(0.16, 1, 0.3, 1)",
    "cubic-bezier(0.16, 1, 0.3, 1)",
    "cubic-bezier(0.16, 1, 0.3, 1)",
    "cubic-bezier(0.16, 1, 0.3, 1)",
    "cubic-bezier(0.16, 1, 0.3, 1)",
    "cubic-bezier(0.16, 1, 0.3, 1)",
  ];

  const variants = {
    hidden: {
      opacity: 0,
      y:
        variant === "fade-up"
          ? activeDistance
          : variant === "bounce-up"
          ? activeDistance * 1.5
          : variant === "fade-down"
          ? -activeDistance
          : variant === "perspective-3d"
          ? activeDistance * 1.3
          : variant === "lens-focus"
          ? 6
          : 0,
      x: variant === "fade-left" ? activeDistance : variant === "fade-right" ? -activeDistance : 0,
      scale:
        variant === "scale-in"
          ? 0.9
          : variant === "bounce-up"
          ? 0.9
          : variant === "lens-focus"
          ? 1.06
          : 1,
      rotateX: variant === "perspective-3d" && deviceConfig.enable3D ? 15 : 0,
      rotate:
        variant === "fade-left" && deviceConfig.enable3D
          ? 3
          : variant === "fade-right" && deviceConfig.enable3D
          ? -3
          : 0,
      filter: variant === "lens-focus" && deviceConfig.enableBlur ? "blur(16px)" : "none",
    },
    visible: {
      opacity: [0, 0.2, 0.45, 0.7, 0.88, 0.96, 0.99, 1],
      y:
        variant === "fade-up"
          ? [activeDistance, activeDistance * 0.72, activeDistance * 0.44, activeDistance * 0.22, activeDistance * 0.08, activeDistance * 0.02, activeDistance * 0.005, 0]
          : variant === "bounce-up"
          ? [activeDistance * 1.5, activeDistance * 0.8, activeDistance * 0.25, -activeDistance * 0.08, -activeDistance * 0.12, -activeDistance * 0.04, activeDistance * 0.01, 0]
          : variant === "fade-down"
          ? [-activeDistance, -activeDistance * 0.72, -activeDistance * 0.44, -activeDistance * 0.22, -activeDistance * 0.08, -activeDistance * 0.02, -activeDistance * 0.005, 0]
          : variant === "perspective-3d"
          ? [activeDistance * 1.3, activeDistance * 0.8, activeDistance * 0.4, activeDistance * 0.18, activeDistance * 0.06, -activeDistance * 0.01, 0, 0]
          : variant === "lens-focus"
          ? [6, 4.8, 3.6, 2.4, 1.2, 0.4, 0.1, 0]
          : 0,
      x:
        variant === "fade-left"
          ? [activeDistance, activeDistance * 0.72, activeDistance * 0.44, activeDistance * 0.22, activeDistance * 0.08, activeDistance * 0.02, activeDistance * 0.005, 0]
          : variant === "fade-right"
          ? [-activeDistance, -activeDistance * 0.72, -activeDistance * 0.44, -activeDistance * 0.22, -activeDistance * 0.08, -activeDistance * 0.02, -activeDistance * 0.005, 0]
          : 0,
      scale:
        variant === "scale-in"
          ? [0.9, 0.93, 0.96, 0.985, 1.005, 1.01, 1.002, 1]
          : variant === "bounce-up"
          ? [0.9, 0.94, 0.98, 1.03, 1.04, 1.01, 0.995, 1]
          : variant === "lens-focus"
          ? [1.06, 1.04, 1.02, 1.008, 0.995, 0.99, 0.997, 1]
          : 1,
      rotate:
        variant === "fade-left" && deviceConfig.enable3D
          ? [3, 2.2, 1.3, 0.6, 0.1, -0.2, -0.05, 0]
          : variant === "fade-right" && deviceConfig.enable3D
          ? [-3, -2.2, -1.3, -0.6, -0.1, 0.2, 0.05, 0]
          : 0,
      rotateX:
        variant === "perspective-3d" && deviceConfig.enable3D
          ? [15, 12, 8, 4.5, 2, -0.8, -0.2, 0]
          : 0,
      filter:
        variant === "lens-focus" && deviceConfig.enableBlur
          ? [
              "blur(16px)",
              "blur(12px)",
              "blur(8px)",
              "blur(5px)",
              "blur(2.5px)",
              "blur(1px)",
              "blur(0.3px)",
              "blur(0px)",
            ]
          : "none",
      transition: {
        duration: activeDuration,
        delay: activeDelay,
        times: stepTimes,
        ease: premiumEasings,
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

  // Build high-performance style declaration promoting properties to GPU compositing layers
  const containerStyle = {
    willChange: `transform, opacity${deviceConfig.enableBlur && variant === "lens-focus" ? ", filter" : ""}`,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    transformStyle: "preserve-3d",
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
        style={containerStyle}
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
      style={containerStyle}
    >
      {children}
    </motion.div>
  );
}
