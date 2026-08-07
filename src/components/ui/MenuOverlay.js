"use client";

import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "@/components/ui/Magnetic";

/**
 * Fullscreen Staggered Glassmorphic Overlay Navigation Menu
 */
export default function MenuOverlay({
  isOpen,
  onClose,
  navLinks = [
    { label: "Home", href: "/#home" },
    { label: "About", href: "/#about" },
    { label: "Services", href: "/#services" },
    { label: "Team", href: "/#team" },
    { label: "Worked Projects", href: "/#projects" },
    { label: "Contact", href: "/#contact" },
    { label: "Admin Portal", href: "/admin" }
  ]
}) {
  const containerVariants = {
    hidden: { opacity: 0, clipPath: "circle(0% at 100% 0%)" },
    visible: {
      opacity: 1,
      clipPath: "circle(150% at 100% 0%)",
      transition: {
        duration: 0.75,
        ease: [0.85, 0, 0.15, 1],
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      clipPath: "circle(0% at 100% 0%)",
      transition: {
        duration: 0.5,
        ease: [0.85, 0, 0.15, 1]
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0, rotate: 5 },
    visible: {
      y: 0,
      opacity: 1,
      rotate: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          key="menu-overlay"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[9999] bg-[#05020c]/90 backdrop-blur-2xl text-white flex flex-col justify-between p-8 md:p-16 select-none"
        >
          {/* Header Bar inside overlay */}
          <div className="flex justify-between items-center w-full">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-blue-400">
              {"// "}INTELLIVERSE NAVIGATION
            </span>

            {/* Magnetic Close Button */}
            <Magnetic strength={0.4}>
              <button
                onClick={onClose}
                className="w-12 h-12 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all shadow-xl"
                aria-label="Close Menu"
              >
                <i className="fas fa-times text-lg" />
              </button>
            </Magnetic>
          </div>

          {/* Staggered Navigation Links List */}
          <div className="flex flex-col gap-4 my-auto max-w-4xl">
            {navLinks.map((link, idx) => (
              <motion.div key={link.label} variants={itemVariants}>
                <a
                  href={link.href}
                  onClick={onClose}
                  className="group flex items-baseline gap-4 text-3xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter hover:text-blue-400 transition-colors font-mono"
                >
                  <span className="text-xs sm:text-base text-gray-500 font-mono">
                    0{idx + 1}
                  </span>
                  <span>{link.label}</span>
                  <i className="fas fa-arrow-right text-xl sm:text-3xl opacity-0 group-hover:opacity-100 group-hover:translate-x-4 transition-all" />
                </a>
              </motion.div>
            ))}
          </div>

          {/* Footer inside menu */}
          <div className="flex flex-col sm:flex-row justify-between items-center border-t border-white/10 pt-6 text-xs font-mono text-gray-400 gap-4">
            <div>theintelliverse@gmail.com</div>
            <div className="flex gap-6 uppercase tracking-widest text-[10px]">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">LinkedIn</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400">Instagram</a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
