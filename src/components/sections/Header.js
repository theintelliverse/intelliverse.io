"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
    const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    let lastScrollTop = 0;
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        setHeaderVisible(false);
      } else {
        setHeaderVisible(true);
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (e, targetId) => {
    setSidebarOpen(false);
        const element = document.getElementById(targetId);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      e.preventDefault();
      window.location.assign(`/#${targetId}`);
    }
  };

  
  const playHoverSound = () => {};

  const playClickSound = () => {
      };

  return (
    <>
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Sidebar Overlay */}
            <motion.div
              id="sidebar-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSidebarOpen(false);
                playClickSound();
              }}
              className="fixed inset-0 bg-black/75 z-40"
            />

            {/* Sidebar Menu */}
            <motion.aside
              id="sidebar-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 bg-[#121212]/95 backdrop-blur-2xl border-l border-white/10 z-50 shadow-2xl"
            >
              <div className="p-6 flex justify-between items-center border-b border-white/5">
                <h2 className="text-xl font-bold tracking-wider uppercase text-white font-mono">Menu</h2>
                <button
                  id="sidebar-close-btn"
                  onClick={() => {
                    setSidebarOpen(false);
                    playClickSound();
                  }}
                  className="text-gray-400 hover:text-white transition-colors duration-300 text-3xl"
                  onMouseEnter={playHoverSound}
                >
                  &times;
                </button>
              </div>
              <motion.nav
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.05 }
                  }
                }}
                className="flex flex-col p-6 space-y-4 font-mono uppercase text-sm"
              >
                {["home", "about", "services", "team", "projects", "terms", "privacy", "contact"].map((link) => {
                  const isExternal = link === "terms" || link === "privacy";
                  const targetHref = isExternal ? `/${link}` : `/#${link}`;
                  return (
                    <motion.a
                      key={link}
                      href={targetHref}
                      variants={{
                        hidden: { x: 20, opacity: 0 },
                        visible: { x: 0, opacity: 1 }
                      }}
                      onClick={(e) => !isExternal && handleSmoothScroll(e, link)}
                      onMouseEnter={playHoverSound}
                      className="group flex items-center justify-between text-gray-400 hover:text-white p-3 rounded-xl border border-transparent hover:border-white/5 hover:bg-white/[0.02] transition-all duration-300"
                    >
                      <span>{link}</span>
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] text-blue-400">
                        {"// "}0{["home", "about", "services", "team", "projects", "terms", "privacy", "contact"].indexOf(link) + 1}
                      </span>
                    </motion.a>
                  );
                })}
              </motion.nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Header Container */}
      <motion.header
        id="header"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: headerVisible ? 0 : -100, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-0 w-full z-30 bg-[#121212]/40 backdrop-blur-lg border-b border-white/5"
      >
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center relative">
          {/* Left side: Logo */}
          <div className="flex items-center gap-6">
            <a
              href="#home"
              onClick={(e) => handleSmoothScroll(e, "home")}
              onMouseEnter={playHoverSound}
              className="flex items-center gap-3 text-lg font-extrabold z-10 font-mono tracking-wider uppercase"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/the%20intelliverse%20logo.jpg"
                alt="The Intelliverse Logo"
                className="h-10 w-10 logo-glow border border-white/10"
              />
            </a>
          </div>

          {/* Desktop Navigation Links (Glow Pill Slide) */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-1 px-2 py-1 rounded-full glassmorphic-card"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {["home", "about", "services", "team", "projects", "terms", "privacy", "contact"].map((link) => {
              const isExternal = link === "terms" || link === "privacy";
              const targetHref = isExternal ? `/${link}` : `/#${link}`;
              return (
                <a
                  key={link}
                  href={targetHref}
                  onClick={(e) => !isExternal && handleSmoothScroll(e, link)}
                  onMouseEnter={() => {
                    playHoverSound();
                    setHoveredLink(link);
                  }}
                  className="relative px-3.5 py-1.5 text-[10px] font-mono tracking-widest uppercase text-gray-400 hover:text-white transition-colors select-none z-10"
                >
                  {link}
                  {hoveredLink === link && (
                    <motion.span
                      layoutId="header-nav-pill"
                      className="absolute inset-0 bg-white/[0.06] rounded-full border border-white/10 -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right side: Audio Soundwave Indicator, Social Icons & Menu Button */}
          <div className="flex items-center space-x-6 z-10">
            
            {/* Social Links */}
            <div className="hidden sm:flex items-center space-x-4">
              <a
                href="https://www.linkedin.com/company/the-intelliverse/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
                className="text-gray-400 hover:text-white transition-colors duration-300 text-lg p-1.5"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="https://www.instagram.com/the_intelliverse/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
                className="text-gray-400 hover:text-white transition-colors duration-300 text-lg p-1.5"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="mailto:theintelliverse@gmail.com"
                onMouseEnter={playHoverSound}
                onClick={playClickSound}
                className="text-gray-400 hover:text-white transition-colors duration-300 text-lg p-1.5"
                title="Email Us"
              >
                <i className="fas fa-envelope"></i>
              </a>
            </div>

            {/* Menu Toggle Button */}
            <button
              id="menu-toggle-btn"
              onClick={() => {
                setSidebarOpen(true);
                playClickSound();
              }}
              className="text-white hover:text-blue-400 focus:outline-none p-2 relative h-8 w-8 transition-colors duration-300 cursor-pointer"
              aria-controls="sidebar-menu"
              aria-expanded={sidebarOpen}
              onMouseEnter={playHoverSound}
            >
              <i className="fas fa-bars text-xl"></i>
              <span className="sr-only">Open navigation menu</span>
            </button>
          </div>
        </nav>
              </motion.header>
    </>
  );
}
