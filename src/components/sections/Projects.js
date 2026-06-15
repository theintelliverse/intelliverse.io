"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

// ─── Card colour themes keyed by project.type ────────────────────────────────
const typeThemes = {
  "SaaS Portal":      { border: "hover:border-blue-500/30",    bg: "bg-blue-500/5",    text: "text-blue-400",    glow: "from-blue-500/10"    },
  "Web App":          { border: "hover:border-cyan-500/30",    bg: "bg-cyan-500/5",    text: "text-cyan-400",    glow: "from-cyan-500/10"    },
  "Cloud Platform":   { border: "hover:border-slate-400/30",  bg: "bg-slate-400/5",  text: "text-slate-400",  glow: "from-slate-400/10"  },
  "E-Commerce":       { border: "hover:border-blue-600/30",  bg: "bg-blue-600/5",  text: "text-blue-500",  glow: "from-blue-600/10"  },
  "Mobile App":       { border: "hover:border-cyan-600/30", bg: "bg-cyan-600/5", text: "text-cyan-500", glow: "from-cyan-600/10" },
  "Landing Page":     { border: "hover:border-slate-500/30",    bg: "bg-slate-500/5",    text: "text-slate-400",    glow: "from-slate-500/10"    },
  "Dashboard":        { border: "hover:border-blue-500/30",   bg: "bg-blue-500/5",   text: "text-blue-400",   glow: "from-blue-500/10"   },
  "API Service":      { border: "hover:border-cyan-500/30",    bg: "bg-cyan-500/5",    text: "text-cyan-400",    glow: "from-cyan-500/10"    },
  "Enterprise":       { border: "hover:border-slate-400/30",  bg: "bg-slate-400/5",  text: "text-slate-400",  glow: "from-slate-400/10"  },
};

const fallbackThemes = [
  { border: "hover:border-blue-500/30",    bg: "bg-blue-500/5",    text: "text-blue-400",    glow: "from-blue-500/10"    },
  { border: "hover:border-cyan-500/30",    bg: "bg-cyan-500/5",    text: "text-cyan-400",    glow: "from-cyan-500/10"    },
  { border: "hover:border-slate-400/30",  bg: "bg-slate-400/5",  text: "text-slate-400",  glow: "from-slate-400/10"  },
  { border: "hover:border-blue-600/30",  bg: "bg-blue-600/5",  text: "text-blue-500",  glow: "from-blue-600/10"  },
  { border: "hover:border-cyan-600/30", bg: "bg-cyan-600/5", text: "text-cyan-500", glow: "from-cyan-600/10" },
];

function getCardTheme(project, idx) {
  if (project.type && typeThemes[project.type]) return typeThemes[project.type];
  return fallbackThemes[idx % fallbackThemes.length];
}

function getBadgeLabel(project, idx) {
  if (project.type) return project.type;
  const defaults = ["SaaS Portal", "Web App", "Cloud Platform", "E-Commerce", "Mobile Dashboard"];
  return defaults[idx % defaults.length];
}

// ─── Featured (wide) card for marquee projects ───────────────────────────────
function FeaturedCard({ project, idx, theme, badge, onPreview, onHowItWorks, playHover, playClick }) {
  const features = project.features || [];
  const tags     = project.techTags || [];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      className={`group relative col-span-1 md:col-span-2 lg:col-span-3 rounded-2xl glassmorphic-card overflow-hidden ${theme.border} hover:border-opacity-50 transition-all duration-500`}
      onMouseEnter={playHover}
    >
      {/* Glow layer */}
      <div className={`absolute inset-0 bg-gradient-to-br ${theme.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

      {/* "FEATURED" ribbon */}
      <div className="absolute top-5 right-5 z-10">
        <span className={`text-[9px] font-mono uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border border-white/10 bg-white/5 ${theme.text}`}>
          ★ Featured Project
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-0">
        {/* Left — Visual hero panel */}
        <div className={`lg:w-5/12 min-h-[220px] lg:min-h-0 relative flex flex-col items-center justify-center p-10 border-b lg:border-b-0 lg:border-r border-white/5 bg-gradient-to-br ${theme.glow} to-transparent`}>
          {/* Big icon */}
          <div className="relative mb-6">
            <div className={`w-20 h-20 rounded-2xl border border-white/10 bg-[#05020c]/80 flex items-center justify-center shadow-2xl`}>
              <i className={`fas fa-hospital-user text-3xl ${theme.text}`} aria-hidden="true" />
            </div>
            {/* Animated ping */}
            <span className={`absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#121212] flex items-center justify-center`}>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white font-mono text-center mb-1">
            {project.name}
          </h3>
          <span className={`text-[10px] font-mono uppercase tracking-widest ${theme.text} mb-6`}>{badge}</span>

          {/* Feature pills */}
          {features.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {features.map((f) => (
                <span key={f.label} className="flex items-center gap-1.5 text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.03] text-gray-300">
                  <i className={`fas ${f.icon} text-[8px] ${theme.text}`} />
                  {f.label}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right — Content panel */}
        <div className="lg:w-7/12 p-8 md:p-10 flex flex-col justify-between">
          <div>
            <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-8 font-normal">
              {project.description}
            </p>

            {/* Tech stack tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {tags.map((t) => (
                  <span key={t} className="text-[9px] font-mono uppercase tracking-widest px-2.5 py-1 rounded border border-white/10 bg-[#05020c]/60 text-gray-400">
                    {t}
                  </span>
                ))}
              </div>
            )}

            {/* Rating */}
            {project.rating > 0 && (
              <div className={`flex items-center gap-1.5 mb-8`}>
                {Array.from({ length: Math.min(5, project.rating) }).map((_, i) => (
                  <i key={i} className={`fas fa-star text-xs ${theme.text}`} />
                ))}
                <span className="text-gray-500 text-[10px] font-mono ml-1">Client Rating</span>
              </div>
            )}
          </div>

          {/* CTA row */}
          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-white/10">
            {project.link && (
              <button
                onClick={(e) => onPreview(e, project)}
                onMouseEnter={playHover}
                className={`group/btn flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-[11px] uppercase tracking-widest bg-blue-600 hover:bg-blue-500 text-white transition-all duration-300 shadow-lg shadow-blue-900/30`}
              >
                <i className="fas fa-eye text-[10px]" />
                View Preview
                <i className="fas fa-chevron-right text-[8px] group-hover/btn:translate-x-0.5 transition-transform" />
              </button>
            )}

            {project.featureLink && (
              <a
                href={project.featureLink}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={(e) => { e.stopPropagation(); playClick(); }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-[11px] uppercase tracking-widest border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] text-gray-300 hover:text-white transition-all duration-300`}
              >
                <i className="fas fa-play text-[9px]" />
                {project.featureText || "How It Works"}
              </a>
            )}

            <span className={`ml-auto text-[9px] font-mono uppercase tracking-widest ${theme.text} opacity-60`}>
              {project.tagline || ""}
            </span>
          </div>

          {/* Review */}
          {project.review && (
            <blockquote className="mt-4 border-t border-white/5 pt-4 italic text-gray-500 text-[10px] leading-relaxed font-mono">
              &quot;{project.review}&quot;
            </blockquote>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Standard project card ────────────────────────────────────────────────────
function StandardCard({ project, idx, theme, badge, onPreview, playHover, playClick }) {
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.4 }}
      key={project.name}
      onMouseEnter={playHover}
      onMouseMove={handleMouseMove}
      onClick={(e) => project.link && onPreview(e, project)}
      className={`group relative p-6 rounded-2xl glassmorphic-card hover:bg-white/[0.04] flex flex-col justify-between cursor-pointer transition-all duration-500 interactive-glow-card ${theme.border}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-b ${theme.glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 rounded-2xl`} />

      {/* Index watermark */}
      <div className="absolute top-4 right-5 text-2xl font-mono font-black text-white/[0.02] select-none group-hover:text-indigo-400/[0.08] transition-colors duration-500">
        {String(idx + 1).padStart(2, "0")}
      </div>

      <div>
        <span className={`inline-block text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-md border border-white/10 bg-black/40 mb-4 ${theme.text}`}>
          {badge}
        </span>

        <h4 className="text-white font-bold text-lg md:text-xl tracking-tight mb-2 group-hover:text-indigo-400 transition-colors duration-300 font-mono uppercase">
          {project.name}
        </h4>

        <p className="text-gray-200 text-xs md:text-sm leading-relaxed mb-6 font-normal">
          {project.description}
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 flex flex-col gap-3">
        <div className="flex justify-between items-center w-full">
          {project.rating > 0 ? (
            <div className={`flex space-x-0.5 text-[10px] ${theme.text}`}>
              {Array.from({ length: Math.min(5, Math.max(1, project.rating)) }).map((_, i) => (
                <i key={i} className="fas fa-circle" />
              ))}
            </div>
          ) : <div />}

          {project.link && (
            <span className={`inline-flex items-center text-[10px] font-mono uppercase tracking-widest ${theme.text} group-hover:text-white transition-colors duration-300`}>
              View Preview <i className="fas fa-chevron-right ml-1.5 text-[8px]" />
            </span>
          )}
        </div>

        {project.featureLink && (
          <div className="flex justify-end w-full">
            <a
              href={project.featureLink}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={(e) => { e.stopPropagation(); playClick(); }}
              className="text-[9px] font-mono uppercase tracking-widest text-cyan-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <i className="fas fa-play text-[7px]" />
              {project.featureText || "How It Works"}
            </a>
          </div>
        )}
      </div>

      {project.review && (
        <div className="border-t border-white/10 pt-3 mt-3 italic text-gray-500 text-[10px] leading-relaxed font-light font-mono">
          &quot;{project.review}&quot;
        </div>
      )}
    </motion.div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────
export default function Projects({ data }) {
  const [activeProject, setActiveProject]   = useState(null);
  const [activeUrl, setActiveUrl]           = useState(null);
  const [iframeLoading, setIframeLoading]   = useState(true);
  const [refreshKey, setRefreshKey]         = useState(0);
  const [deviceView, setDeviceView]         = useState("desktop");
  const [activeFilter, setActiveFilter]     = useState("All");

  const modalRef        = useRef(null);
  const modalContentRef = useRef(null);

  useEffect(() => {
    if (activeUrl && modalRef.current && modalContentRef.current) {
      gsap.killTweensOf([modalRef.current, modalContentRef.current]);
      gsap.set(modalRef.current, { opacity: 0 });
      gsap.set(modalContentRef.current, { scale: 0.92, y: 40, opacity: 0 });
      gsap.to(modalRef.current, { opacity: 1, duration: 0.45, ease: "power3.out" });
      gsap.to(modalContentRef.current, { scale: 1, y: 0, opacity: 1, duration: 0.55, ease: "power3.out", delay: 0.05 });
    }
  }, [activeUrl]);

  if (!data || data.length === 0) return null;

  const handleOpenPreview = (e, project) => {
    e.preventDefault();
    e.stopPropagation();
        setActiveProject(project);
    setActiveUrl(project.link);
    setIframeLoading(true);
  };

  const handleClosePreview = () => {
        if (modalRef.current && modalContentRef.current) {
      gsap.to(modalContentRef.current, { scale: 0.9, y: 30, opacity: 0, duration: 0.35, ease: "power2.in", onComplete: () => { setActiveProject(null); setActiveUrl(null); } });
      gsap.to(modalRef.current, { opacity: 0, duration: 0.35, ease: "power2.in" });
    } else {
      setActiveProject(null);
      setActiveUrl(null);
    }
  };



  const handleRefresh = (e) => {
    e.stopPropagation();
        setIframeLoading(true);
    setRefreshKey((prev) => prev + 1);
  };

  const playHover = () => {};
  const playClick = () => {};


  const showFilters  = data.length >= 6;
  const uniqueTypes  = showFilters ? ["All", ...Array.from(new Set(data.map(p => p.type || "Other").filter(Boolean)))] : [];
  const filteredProjects = activeFilter === "All" ? data : data.filter(p => (p.type || "Other") === activeFilter);

  // Split into featured vs standard based on admin-managed isFeatured flag
  const featuredProjects  = filteredProjects.filter(p => p.isFeatured);
  const standardProjects  = filteredProjects.filter(p => !p.isFeatured);

  return (
    <section id="projects" className="py-24 relative bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Section Heading */}
        <ScrollReveal variant="lens-focus" playSound={true}>
          <div className="text-center mb-4">
            <div className="glassmorphic-text-bg">
              <h2
                style={{ textShadow: "0 2px 10px rgba(0,0,0,0.85)" }}
                className="text-2xl sm:text-3xl md:text-5xl font-black mb-2 tracking-tighter uppercase text-white"
              >
                Our Worked Projects
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
                Real-world digital products built with precision — from SaaS platforms to healthcare solutions.
              </p>
            </div>
            <div className="w-16 h-[2px] bg-indigo-500 mx-auto mt-4 mb-4" />
          </div>
        </ScrollReveal>

        {/* Filters */}
        {showFilters && (
          <ScrollReveal variant="fade-up" delay={0.1}>
            <div className="flex flex-wrap justify-center gap-3 mb-12 mt-10">
              {uniqueTypes.map((type) => (
                <button
                  key={type}
                  onMouseEnter={playHover}
                  onClick={() => { playClick(); setActiveFilter(type); }}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                    activeFilter === type
                      ? "bg-white text-black border-white shadow-lg"
                      : "bg-white/[0.02] text-gray-400 border-white/5 hover:border-white/10 hover:text-white"
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
          </ScrollReveal>
        )}

        {/* Projects Grid */}
        <motion.div layout className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${showFilters ? "" : "mt-12"}`}>
          <AnimatePresence>
            {/* Featured cards first (full-width) */}
            {featuredProjects.map((project, idx) => {
              const theme = getCardTheme(project, idx);
              const badge = getBadgeLabel(project, idx);
              return (
                <FeaturedCard
                  key={project.name}
                  project={project}
                  idx={idx}
                  theme={theme}
                  badge={badge}
                  onPreview={handleOpenPreview}
                  onHowItWorks={() => {}}
                  playHover={playHover}
                  playClick={playClick}
                />
              );
            })}

            {/* Standard cards */}
            {standardProjects.map((project, idx) => {
              const theme = getCardTheme(project, idx + featuredProjects.length);
              const badge = getBadgeLabel(project, idx + featuredProjects.length);
              return (
                <StandardCard
                  key={project.name}
                  project={project}
                  idx={idx}
                  theme={theme}
                  badge={badge}
                  onPreview={handleOpenPreview}
                  playHover={playHover}
                  playClick={playClick}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Empty state */}
        {showFilters && filteredProjects.length === 0 && (
          <div className="text-center py-16 rounded-2xl glassmorphic-card">
            <i className="fas fa-folder-open text-3xl text-gray-700 mb-4 block" />
            <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">No projects found in this category.</p>
            <button
              onClick={() => { playClick(); setActiveFilter("All"); }}
              className="text-blue-400 hover:text-white transition-colors text-xs font-mono uppercase tracking-widest mt-3 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* ── Full-screen Preview Modal ────────────────────────────────────── */}
      {activeUrl && (
        <div
          ref={modalRef}
          onClick={handleClosePreview}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md"
        >
          <div
            ref={modalContentRef}
            onClick={(e) => e.stopPropagation()}
            className="glassmorphic-card border border-white/10 rounded-2xl w-full max-w-5xl h-[88vh] sm:h-[85vh] flex flex-col overflow-hidden shadow-2xl backdrop-blur-2xl"
          >
            {/* Browser toolbar */}
            <div className="bg-black/90 border-b border-white/5 px-4 py-3 flex items-center justify-between gap-4 select-none">
              <div className="hidden md:flex gap-2">
                <div onClick={handleClosePreview} className="w-3.5 h-3.5 rounded-full bg-rose-500/80 hover:bg-rose-500 cursor-pointer transition-colors" />
                <div className="w-3.5 h-3.5 rounded-full bg-amber-500/40" />
                <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/40" />
              </div>

              <div className="flex-1 flex items-center gap-3 min-w-0 max-w-3xl">
                <button onClick={handleRefresh} className="text-gray-500 hover:text-blue-400 cursor-pointer transition p-1.5" title="Reload Frame">
                  <i className="fas fa-rotate-right text-xs" />
                </button>

                <div className="flex-1 bg-[#05020c] border border-white/5 rounded-lg py-1.5 px-3 text-[10px] sm:text-xs text-gray-400 flex items-center gap-2 select-text font-mono min-w-0">
                  <i className="fas fa-lock text-indigo-400 text-[9px] flex-shrink-0" />
                  <span className="truncate">{activeUrl}</span>
                </div>

                <div className="hidden sm:flex bg-[#05020c] border border-white/5 rounded-lg p-0.5 flex-shrink-0">
                  <button
                    onClick={() => { playClick(); setDeviceView("desktop"); setIframeLoading(true); }}
                    className={`px-2 py-1 rounded text-[9px] font-mono uppercase transition flex items-center gap-1 cursor-pointer ${deviceView === "desktop" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-blue-400"}`}
                    title="Desktop View"
                  >
                    <i className="fas fa-desktop" />
                  </button>
                  <button
                    onClick={() => { playClick(); setDeviceView("mobile"); setIframeLoading(true); }}
                    className={`px-2 py-1 rounded text-[9px] font-mono uppercase transition flex items-center gap-1 cursor-pointer ${deviceView === "mobile" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-blue-400"}`}
                    title="Phone Simulator"
                  >
                    <i className="fas fa-mobile-alt" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {activeProject?.featureLink && (
                  <button
                    onClick={() => { playClick(); setActiveUrl(activeProject.featureLink); setIframeLoading(true); setRefreshKey(p => p + 1); }}
                    className="bg-cyan-600 hover:bg-blue-500 text-white font-mono text-[9px] uppercase py-1.5 px-2.5 rounded-lg flex items-center gap-1 transition-all"
                    title={activeProject.featureText || "See How It Works"}
                  >
                    <i className="fas fa-play text-[8px] mr-1" />
                    <span className="hidden sm:inline">{activeProject.featureText || "How It Works"}</span>
                  </button>
                )}
                <a
                  href={activeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-mono text-[9px] uppercase py-1.5 px-2.5 rounded-lg flex items-center gap-1.5 transition"
                >
                  <span className="hidden xs:inline">Open</span>
                  <i className="fas fa-external-link-alt text-[9px]" />
                </a>
                <button onClick={handleClosePreview} className="text-gray-400 hover:text-blue-400 transition cursor-pointer p-1.5">
                  <i className="fas fa-times text-base sm:text-lg" />
                </button>
              </div>
            </div>

            {/* Main iframe area */}
            <div className="flex-1 relative bg-black flex items-center justify-center p-3 overflow-hidden">
              {deviceView === "mobile" ? (
                <div className="relative mx-auto my-auto w-full max-w-[360px] h-[95%] max-h-[640px] bg-black rounded-[2.5rem] border-[10px] border-black shadow-2xl flex flex-col overflow-hidden ring-4 ring-white/5 transition-all duration-300">
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-20 flex items-center justify-center">
                    <div className="w-8 h-1 bg-gray-800 rounded-full mb-0.5" />
                  </div>
                  <div className="flex-1 relative w-full h-full bg-white pt-5">
                    <iframe key={`${refreshKey}-mobile`} src={activeUrl} onLoad={() => setIframeLoading(false)} className="w-full h-full border-none" title="Project Live Iframe Preview Mobile" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
                  </div>
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-20 h-1 bg-gray-800 rounded-full z-20" />
                </div>
              ) : (
                <div className="w-full h-full bg-white relative rounded-lg overflow-hidden transition-all duration-300">
                  <iframe key={`${refreshKey}-desktop`} src={activeUrl} onLoad={() => setIframeLoading(false)} className="w-full h-full border-none" title="Project Live Iframe Preview Desktop" sandbox="allow-scripts allow-same-origin allow-popups allow-forms" />
                </div>
              )}

              {iframeLoading && (
                <div className="absolute inset-0 bg-black/90 flex flex-col justify-center items-center gap-4 z-30">
                  <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase animate-pulse">
                    Connecting secure sandbox...
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
