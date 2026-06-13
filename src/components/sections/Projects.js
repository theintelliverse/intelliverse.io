"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Projects({ data }) {
  // Hide section completely if there are no projects in the database
  if (!data || data.length === 0) return null;

  // State for active iframe preview
  const [activeProject, setActiveProject] = useState(null);
  const [activeUrl, setActiveUrl] = useState(null);
  const [iframeLoading, setIframeLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);
  const [deviceView, setDeviceView] = useState("desktop");
  const [activeFilter, setActiveFilter] = useState("All");

  // Open iframe modal
  const handleOpenPreview = (e, project) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveProject(project);
    setActiveUrl(project.link);
    setIframeLoading(true);
  };

  // Close iframe modal
  const handleClosePreview = () => {
    setActiveProject(null);
    setActiveUrl(null);
  };

  // Refresh iframe
  const handleRefresh = (e) => {
    e.stopPropagation();
    setIframeLoading(true);
    setRefreshKey((prev) => prev + 1);
  };

  // Themed accents for project cards based on type
  const typeThemes = {
    "SaaS Portal": { border: "border-blue-500/20 hover:border-blue-500/50", bg: "bg-blue-500/10", text: "text-blue-400" },
    "Web App": { border: "border-teal-500/20 hover:border-teal-500/50", bg: "bg-teal-500/10", text: "text-teal-400" },
    "Cloud Platform": { border: "border-indigo-500/20 hover:border-indigo-500/50", bg: "bg-indigo-500/10", text: "text-indigo-400" },
    "E-Commerce": { border: "border-purple-500/20 hover:border-purple-500/50", bg: "bg-purple-500/10", text: "text-purple-400" },
    "Mobile App": { border: "border-emerald-500/20 hover:border-emerald-500/50", bg: "bg-emerald-500/10", text: "text-emerald-400" },
    "Landing Page": { border: "border-cyan-500/20 hover:border-cyan-500/50", bg: "bg-cyan-500/10", text: "text-cyan-400" },
    "Dashboard": { border: "border-amber-500/20 hover:border-amber-500/50", bg: "bg-amber-500/10", text: "text-amber-400" },
    "API Service": { border: "border-rose-500/20 hover:border-rose-500/50", bg: "bg-rose-500/10", text: "text-rose-400" },
    "Enterprise": { border: "border-violet-500/20 hover:border-violet-500/50", bg: "bg-violet-500/10", text: "text-violet-400" },
  };

  const fallbackThemes = [
    { border: "border-blue-500/20 hover:border-blue-500/50", bg: "bg-blue-500/10", text: "text-blue-400" },
    { border: "border-teal-500/20 hover:border-teal-500/50", bg: "bg-teal-500/10", text: "text-teal-400" },
    { border: "border-indigo-500/20 hover:border-indigo-500/50", bg: "bg-indigo-500/10", text: "text-indigo-400" },
    { border: "border-purple-500/20 hover:border-purple-500/50", bg: "bg-purple-500/10", text: "text-purple-400" },
    { border: "border-emerald-500/20 hover:border-emerald-500/50", bg: "bg-emerald-500/10", text: "text-emerald-400" }
  ];

  const getCardTheme = (project, idx) => {
    if (project.type && typeThemes[project.type]) return typeThemes[project.type];
    return fallbackThemes[idx % fallbackThemes.length];
  };

  const getBadgeLabel = (project, idx) => {
    if (project.type) return project.type;
    const defaults = ["SaaS Portal", "Web App", "Cloud Platform", "E-Commerce", "Mobile Dashboard"];
    return defaults[idx % defaults.length];
  };

  // Collect unique types for filter tabs (only when 6+ projects)
  const showFilters = data.length >= 6;
  const uniqueTypes = showFilters
    ? ["All", ...Array.from(new Set(data.map(p => p.type || "Other").filter(Boolean)))]
    : [];

  const filteredProjects = activeFilter === "All"
    ? data
    : data.filter(p => (p.type || "Other") === activeFilter);

  return (
    <section id="projects" className="py-24 reveal-on-scroll relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-3 text-white tracking-tight">
            Our Worked Projects
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm md:text-base leading-relaxed">
            Discover some of the outstanding solutions we have delivered for our clients.
          </p>
          <div className="w-24 h-1 bg-blue-500 mx-auto mt-5 rounded-full"></div>
        </div>

        {/* Filter Tabs (shown when 6+ projects) */}
        {showFilters && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {uniqueTypes.map((type) => (
              <button
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer border ${
                  activeFilter === type
                    ? "bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-500/20"
                    : "bg-gray-900/60 text-gray-400 border-gray-800 hover:border-gray-600 hover:text-white"
                }`}
              >
                {type}
                {type !== "All" && (
                  <span className="ml-1.5 text-[9px] opacity-60">
                    ({data.filter(p => (p.type || "Other") === type).length})
                  </span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, idx) => {
            const theme = getCardTheme(project, idx);
            const badge = getBadgeLabel(project, idx);

            return (
              <motion.div
                key={idx}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={(e) => project.link && handleOpenPreview(e, project)}
                className={`group p-6 rounded-2xl border bg-gray-950/40 backdrop-blur-md flex flex-col justify-between cursor-pointer transition-all ${theme.border} opacity-90 hover:opacity-100`}
              >
                {/* Background Glow */}
                <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-b from-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Step / Number Badge */}
                <div className="absolute top-4 right-5 text-2xl font-black text-gray-800/20 select-none group-hover:text-blue-500/10 transition-colors">
                  {String(idx + 1).padStart(2, "0")}
                </div>

                <div>
                  {/* Icon Block */}
                  <div className={`w-10 h-10 rounded-xl ${theme.bg} ${theme.text} border border-gray-800 flex items-center justify-center text-lg shadow-sm mb-4`}>
                    <i className="fas fa-globe"></i>
                  </div>

                  {/* Type Badge */}
                  <span className={`inline-block text-[10px] font-extrabold uppercase tracking-wider bg-gray-900 border border-gray-850 px-2 py-0.5 rounded-md mb-2 ${theme.text}`}>
                    {badge}
                  </span>

                  {/* Title */}
                  <h4 className="text-white font-bold text-lg md:text-xl tracking-tight mb-2 group-hover:text-blue-400 transition-colors">
                    {project.name}
                  </h4>

                  {/* Description */}
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                {/* Rating & Action */}
                <div className="mt-6 pt-4 border-t border-gray-900 flex flex-col gap-2">
                  <div className="flex justify-between items-center w-full">
                    {project.rating > 0 ? (
                      <div className="flex text-amber-400 space-x-0.5 text-xs">
                        {Array.from({ length: Math.min(5, Math.max(1, project.rating)) }).map((_, i) => (
                          <i key={i} className="fas fa-star" />
                        ))}
                      </div>
                    ) : (
                      <div />
                    )}

                    {project.link && (
                      <button
                        onClick={(e) => handleOpenPreview(e, project)}
                        className="inline-flex items-center text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                      >
                        View Live Preview <i className="fas fa-desktop ml-1.5 text-[10px]" />
                      </button>
                    )}
                  </div>

                  {project.featureLink && (
                    <div className="flex justify-end w-full">
                      <a
                        href={project.featureLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="text-[10px] font-bold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
                      >
                        <i className="fas fa-info-circle text-[9px]"></i>
                        {project.featureText || "See How It Works"}
                      </a>
                    </div>
                  )}
                </div>

                {/* Review Quote (if present) */}
                {project.review && (
                  <div className="border-t border-gray-900 pt-3 mt-3 italic text-gray-400 text-[10px] leading-relaxed">
                    <i className="fas fa-quote-left mr-1.5 text-blue-500/40" />
                    {project.review}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Empty state when filter yields no results */}
        {showFilters && filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <i className="fas fa-folder-open text-4xl text-gray-700 mb-4 block"></i>
            <p className="text-gray-500 text-sm">No projects found for "{activeFilter}" category.</p>
            <button onClick={() => setActiveFilter("All")} className="text-blue-400 hover:underline text-xs mt-2 font-bold cursor-pointer">
              Show all projects
            </button>
          </div>
        )}
      </div>

      {/* --- Fullscreen Web Browser Mockup Modal --- */}
      <AnimatePresence>
        {activeUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClosePreview}
            className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-2 sm:p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-5xl h-[88vh] sm:h-[85vh] flex flex-col overflow-hidden shadow-2xl"
            >
              {/* Browser Toolbar Header */}
              <div className="bg-gray-950 border-b border-gray-850 px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-between gap-3 sm:gap-4 select-none">
                {/* Mac buttons */}
                <div className="hidden md:flex gap-1.5">
                  <div onClick={handleClosePreview} className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-600 cursor-pointer"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>

                {/* Navigation Tools & Address Bar */}
                <div className="flex-1 flex items-center gap-2 sm:gap-3 min-w-0 max-w-3xl">
                  {/* Navigation buttons */}
                  <div className="flex gap-1 text-gray-500">
                    <button disabled className="hidden sm:inline-block hover:text-gray-300 opacity-40 cursor-not-allowed p-1">
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <button disabled className="hidden sm:inline-block hover:text-gray-300 opacity-40 cursor-not-allowed p-1">
                      <i className="fas fa-chevron-right"></i>
                    </button>
                    <button onClick={handleRefresh} className="hover:text-gray-300 cursor-pointer transition p-1.5" title="Reload Frame">
                      <i className="fas fa-rotate-right text-xs"></i>
                    </button>
                  </div>

                  {/* Browser URL address bar */}
                  <div className="flex-1 bg-gray-900 border border-gray-800 rounded-lg py-1 px-2.5 text-[10px] sm:text-xs text-gray-400 flex items-center gap-1.5 select-text font-mono min-w-0">
                    <i className="fas fa-lock text-emerald-500 text-[8px] sm:text-[9px] flex-shrink-0"></i>
                    <span className="truncate">{activeUrl}</span>
                  </div>

                  {/* Device view switcher (Desktop/Phone switcher for premium desktop experience) */}
                  <div className="hidden sm:flex bg-gray-900 border border-gray-800 rounded-lg p-0.5 flex-shrink-0">
                    <button
                      onClick={() => { setDeviceView("desktop"); setIframeLoading(true); }}
                      className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase transition flex items-center gap-1 ${deviceView === "desktop" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
                      title="Desktop View"
                    >
                      <i className="fas fa-desktop"></i>
                    </button>
                    <button
                      onClick={() => { setDeviceView("mobile"); setIframeLoading(true); }}
                      className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase transition flex items-center gap-1 ${deviceView === "mobile" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"}`}
                      title="Phone Simulator"
                    >
                      <i className="fas fa-mobile-alt"></i>
                    </button>
                  </div>
                </div>

                {/* Right actions: Direct Visit & Close */}
                <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
                  {activeProject?.featureLink && (
                    <button
                      onClick={() => {
                        setActiveUrl(activeProject.featureLink);
                        setIframeLoading(true);
                        setRefreshKey((prev) => prev + 1);
                      }}
                      className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-[10px] uppercase py-1.5 px-2.5 sm:px-3 rounded-lg flex items-center gap-1 transition-all"
                      title={activeProject.featureText || "See How It Works"}
                    >
                      <i className="fas fa-play text-[8px] sm:mr-1"></i>
                      <span className="hidden sm:inline">{activeProject.featureText || "How It Works"}</span>
                    </button>
                  )}
                  <a
                    href={activeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] uppercase py-1.5 px-2.5 sm:px-3.5 rounded-lg flex items-center gap-1.5 transition"
                    title="Open Live Site in New Tab"
                  >
                    <span className="hidden xs:inline">Open</span>
                    <i className="fas fa-external-link-alt text-[9px]"></i>
                  </a>
                  <button
                    onClick={handleClosePreview}
                    className="text-gray-400 hover:text-white transition cursor-pointer p-1.5"
                    title="Close Preview"
                  >
                    <i className="fas fa-times text-base sm:text-lg"></i>
                  </button>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 relative bg-gray-950 flex items-center justify-center p-2 sm:p-4 overflow-hidden">
                {deviceView === "mobile" ? (
                  <div className="relative mx-auto my-auto w-[360px] h-[95%] max-h-[640px] bg-black rounded-[2.5rem] border-[10px] border-gray-950 shadow-2xl flex flex-col overflow-hidden ring-4 ring-gray-900/50 transition-all duration-300">
                    {/* Phone Notch/Island */}
                    <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-950 rounded-full z-20 flex items-center justify-center">
                      <div className="w-8 h-1 bg-gray-800 rounded-full mb-0.5"></div>
                    </div>
                    {/* Phone Screen Iframe Container */}
                    <div className="flex-1 relative w-full h-full bg-white pt-5">
                      <iframe
                        key={`${refreshKey}-mobile`}
                        src={activeUrl}
                        onLoad={() => setIframeLoading(false)}
                        className="w-full h-full border-none"
                        title="Project Live Iframe Preview Mobile"
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                      />
                    </div>
                    {/* Home Indicator Bar */}
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-20 h-1 bg-gray-800 rounded-full z-20"></div>
                  </div>
                ) : (
                  <div className="w-full h-full bg-white relative transition-all duration-300">
                    <iframe
                      key={`${refreshKey}-desktop`}
                      src={activeUrl}
                      onLoad={() => setIframeLoading(false)}
                      className="w-full h-full border-none"
                      title="Project Live Iframe Preview Desktop"
                      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                    />
                  </div>
                )}

                {/* Loader Overlay */}
                <AnimatePresence>
                  {iframeLoading && (
                    <motion.div
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gray-950/85 flex flex-col justify-center items-center gap-3 z-30"
                    >
                      <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-xs text-gray-400 font-bold tracking-wider animate-pulse">
                        Connecting secure sandbox...
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
