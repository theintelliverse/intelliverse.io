"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);

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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    setSidebarOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Sidebar Overlay */}
      <div
        id="sidebar-overlay"
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${sidebarOpen ? "" : "hidden"}`}
      ></div>

      {/* Sidebar Menu */}
      <aside
        id="sidebar-menu"
        className={`fixed top-0 left-0 h-full w-72 bg-gray-900/50 backdrop-blur-xl border-r border-gray-700 z-50 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "open translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-5 flex justify-between items-center border-b border-gray-800">
          <h2 className="text-xl font-bold text-white">Menu</h2>
          <button
            id="sidebar-close-btn"
            onClick={() => setSidebarOpen(false)}
            className="text-gray-400 hover:text-white text-2xl"
          >
            &times;
          </button>
        </div>
        <nav className="flex flex-col p-5 space-y-2">
          <a
            href="#home"
            onClick={(e) => handleSmoothScroll(e, "home")}
            className="sidebar-link text-gray-300 hover:text-white hover:bg-gray-800/50 p-3 rounded-md transition-colors"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={(e) => handleSmoothScroll(e, "about")}
            className="sidebar-link text-gray-300 hover:text-white hover:bg-gray-800/50 p-3 rounded-md transition-colors"
          >
            About
          </a>
          <a
            href="#services"
            onClick={(e) => handleSmoothScroll(e, "services")}
            className="sidebar-link text-gray-300 hover:text-white hover:bg-gray-800/50 p-3 rounded-md transition-colors"
          >
            Services
          </a>
          <a
            href="#team"
            onClick={(e) => handleSmoothScroll(e, "team")}
            className="sidebar-link text-gray-300 hover:text-white hover:bg-gray-800/50 p-3 rounded-md transition-colors"
          >
            Team
          </a>
          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "contact")}
            className="sidebar-link text-gray-300 hover:text-white hover:bg-gray-800/50 p-3 rounded-md transition-colors"
          >
            Contact
          </a>
        </nav>
      </aside>

      {/* Header Container */}
      <header
        id="header"
        style={{ top: headerVisible ? "0" : "-100px" }}
        className="fixed left-0 w-full z-30 transition-all duration-500"
      >
        <nav className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          {/* Left side: Menu Button and Logo */}
          <div className="flex items-center gap-4">
            <button
              id="menu-toggle-btn"
              onClick={() => setSidebarOpen(true)}
              className="text-white focus:outline-none p-2 relative h-8 w-8 z-10"
              aria-controls="sidebar-menu"
              aria-expanded={sidebarOpen}
            >
              <i className="fas fa-bars text-2xl"></i>
              <span className="sr-only">Open navigation menu</span>
            </button>
            <a
              href="#home"
              onClick={(e) => handleSmoothScroll(e, "home")}
              className="flex items-center gap-3 text-xl sm:text-2xl font-bold z-10"
            >
              <img
                src="/the%20intelliverse%20logo.jpg"
                alt="The Intelliverse Logo"
                className="h-12 logo-glow"
              />
              <span className="whitespace-nowrap hidden sm:inline">The Intelliverse</span>
            </a>
          </div>

          {/* Social Icons for Desktop */}
          <div className="hidden md:flex items-center space-x-6 z-10">
            <a
              href="https://www.linkedin.com/company/the-intelliverse/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#3b82f6] transition-colors text-xl"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="https://www.instagram.com/the_intelliverse/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#3b82f6] transition-colors text-xl"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="mailto:theintelliverse@gmail.com"
              className="text-gray-300 hover:text-[#3b82f6] transition-colors text-xl"
              title="Email Us"
            >
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </nav>
      </header>
    </>
  );
}
