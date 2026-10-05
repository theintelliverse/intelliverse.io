"use client";

import { useState } from "react";

export default function CMSTab({
  heroHeadline,
  setHeroHeadline,
  heroSubtitle,
  setHeroSubtitle,
  heroStatus,
  setHeroStatus,
  pillarsText,
  setPillarsText,
  caseStudiesHighlight,
  setCaseStudiesHighlight,
  studioLocation,
  setStudioLocation,
  aboutP1,
  setAboutP1,
  aboutMission,
  setAboutMission,
  aboutPullQuote,
  setAboutPullQuote,
  aboutModelsText,
  setAboutModelsText,
  contactEmail,
  setContactEmail,
  contactLinkedin,
  setContactLinkedin,
  contactInstagram,
  setContactInstagram,
  statsProjects,
  setStatsProjects,
  statsSatisfaction,
  setStatsSatisfaction,
  statsClients,
  setStatsClients,
  estimatorStartingPrice,
  setEstimatorStartingPrice,
  estimatorTypes,
  setEstimatorTypes,
  handleSaveCMS,
  loading
}) {
  const [activeSection, setActiveSection] = useState("hero"); // hero | about | numbers | estimator | contact

  const handleUpdateEstimatorType = (index, field, value) => {
    const updated = [...estimatorTypes];
    updated[index] = { ...updated[index], [field]: value };
    setEstimatorTypes(updated);
  };

  const handleAddEstimatorType = () => {
    const newType = {
      id: `type-${Date.now()}`,
      label: "New Project Architecture",
      baseRange: "₹25,000 – ₹1.5L"
    };
    setEstimatorTypes([...estimatorTypes, newType]);
  };

  const handleDeleteEstimatorType = (index) => {
    if (estimatorTypes.length <= 1) return;
    setEstimatorTypes(estimatorTypes.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2
            className="text-xl md:text-2xl font-bold tracking-tight uppercase font-mono"
            style={{ color: "var(--cream)" }}
          >
            Website Content &amp; CMS Editor
          </h2>
          <p className="text-xs md:text-sm mt-1" style={{ color: "rgba(248, 242, 228, 0.65)" }}>
            Manage headlines, manifesto texts, statistics, project estimator pricing, and studio channels.
          </p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={handleSaveCMS}
            disabled={loading}
            className="flex-grow sm:flex-grow-0 px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50 active:scale-95"
            style={{
              backgroundColor: "var(--blue-deep)",
              color: "var(--cream)",
              border: "none",
              boxShadow: "0 4px 14px rgba(47, 99, 224, 0.35)",
              fontFamily: "'JetBrains Mono', monospace",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--blue-press)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--blue-deep)")}
          >
            {loading ? (
              <i className="fas fa-spinner fa-spin"></i>
            ) : (
              <i className="fas fa-save"></i>
            )}
            <span>Save All Content</span>
          </button>
        </div>
      </div>

      {/* Sub-Navigation Pills */}
      <div
        className="flex items-center gap-2 pb-3 overflow-x-auto scrollbar-none"
        style={{ borderBottom: "1px solid rgba(228, 218, 195, 0.12)" }}
      >
        {[
          { id: "hero", label: "01. Hero & Headlines", icon: "fa-bolt" },
          { id: "about", label: "02. About & Manifesto", icon: "fa-book-open" },
          { id: "numbers", label: "03. Verified Numbers", icon: "fa-chart-bar" },
          { id: "estimator", label: "04. Estimator & Pricing", icon: "fa-calculator" },
          { id: "contact", label: "05. Studio Channels", icon: "fa-paper-plane" },
        ].map((tab) => {
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition duration-200 cursor-pointer shrink-0 font-mono"
              style={{
                backgroundColor: isActive ? "var(--blue-deep)" : "transparent",
                color: isActive ? "var(--cream)" : "rgba(248, 242, 228, 0.65)",
                border: isActive
                  ? "1px solid rgba(228, 218, 195, 0.25)"
                  : "1px solid transparent",
                boxShadow: isActive ? "0 4px 14px rgba(47, 99, 224, 0.3)" : "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "rgba(248, 242, 228, 0.06)";
                  e.currentTarget.style.color = "var(--cream)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "rgba(248, 242, 228, 0.65)";
                }
              }}
            >
              <i
                className={`fas ${tab.icon} text-xs`}
                style={{ color: isActive ? "var(--orange)" : "rgba(248, 242, 228, 0.5)" }}
              ></i>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SECTION 1: HERO & HEADLINES */}
      {activeSection === "hero" && (
        <div
          className="p-6 md:p-8 rounded-2xl space-y-6 shadow-xl animate-fade-in"
          style={{
            backgroundColor: "rgba(18, 30, 68, 0.7)",
            border: "1px solid rgba(228, 218, 195, 0.14)",
          }}
        >
          <div
            className="flex items-center gap-2 pb-3"
            style={{ borderBottom: "1px solid rgba(228, 218, 195, 0.1)" }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--orange)" }}></span>
            <h3
              className="text-xs font-bold uppercase tracking-wider font-mono"
              style={{ color: "var(--cream)" }}
            >
              Hero Section Elements
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "var(--orange)" }}>
                Main Display Headline
              </label>
              <input
                type="text"
                value={heroHeadline}
                onChange={(e) => setHeroHeadline(e.target.value)}
                placeholder="Innovation. Create. Grow."
                style={{
                  width: "100%",
                  marginTop: "0.5rem",
                  padding: "0.75rem 1rem",
                  backgroundColor: "rgba(248, 242, 228, 0.05)",
                  border: "1px solid rgba(228, 218, 195, 0.16)",
                  borderRadius: "0.75rem",
                  color: "var(--cream)",
                  fontSize: "0.875rem",
                  outline: "none",
                }}
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "var(--orange)" }}>
                Hero Subtitle / Description
              </label>
              <textarea
                rows={2}
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                placeholder="Your one-stop solution for software development, web development, and IT services."
                style={{
                  width: "100%",
                  marginTop: "0.5rem",
                  padding: "0.75rem 1rem",
                  backgroundColor: "rgba(248, 242, 228, 0.05)",
                  border: "1px solid rgba(228, 218, 195, 0.16)",
                  borderRadius: "0.75rem",
                  color: "var(--cream)",
                  fontSize: "0.875rem",
                  lineHeight: "1.6",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "rgba(248, 242, 228, 0.75)" }}>
                Status Pill Text
              </label>
              <input
                type="text"
                value={heroStatus}
                onChange={(e) => setHeroStatus(e.target.value)}
                placeholder="Ahmedabad, India / Taking new projects"
                style={{
                  width: "100%",
                  marginTop: "0.5rem",
                  padding: "0.75rem 1rem",
                  backgroundColor: "rgba(248, 242, 228, 0.05)",
                  border: "1px solid rgba(228, 218, 195, 0.16)",
                  borderRadius: "0.75rem",
                  color: "var(--cream)",
                  fontSize: "0.875rem",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "rgba(248, 242, 228, 0.75)" }}>
                Studio Location Cap
              </label>
              <input
                type="text"
                value={studioLocation}
                onChange={(e) => setStudioLocation(e.target.value)}
                placeholder="Ahmedabad, Gujarat · Collaborating Worldwide"
                style={{
                  width: "100%",
                  marginTop: "0.5rem",
                  padding: "0.75rem 1rem",
                  backgroundColor: "rgba(248, 242, 228, 0.05)",
                  border: "1px solid rgba(228, 218, 195, 0.16)",
                  borderRadius: "0.75rem",
                  color: "var(--cream)",
                  fontSize: "0.875rem",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "rgba(248, 242, 228, 0.75)" }}>
                Engineering Pillars Row
              </label>
              <input
                type="text"
                value={pillarsText}
                onChange={(e) => setPillarsText(e.target.value)}
                placeholder="Web Architecture · Cloud Infrastructure · SaaS · AI Workflows"
                style={{
                  width: "100%",
                  marginTop: "0.5rem",
                  padding: "0.75rem 1rem",
                  backgroundColor: "rgba(248, 242, 228, 0.05)",
                  border: "1px solid rgba(228, 218, 195, 0.16)",
                  borderRadius: "0.75rem",
                  color: "var(--cream)",
                  fontSize: "0.875rem",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "rgba(248, 242, 228, 0.75)" }}>
                Featured Projects Callout
              </label>
              <input
                type="text"
                value={caseStudiesHighlight}
                onChange={(e) => setCaseStudiesHighlight(e.target.value)}
                placeholder="Appointory (Healthcare) & Vrix (Headless E-Commerce)"
                style={{
                  width: "100%",
                  marginTop: "0.5rem",
                  padding: "0.75rem 1rem",
                  backgroundColor: "rgba(248, 242, 228, 0.05)",
                  border: "1px solid rgba(228, 218, 195, 0.16)",
                  borderRadius: "0.75rem",
                  color: "var(--cream)",
                  fontSize: "0.875rem",
                  outline: "none",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: ABOUT & MANIFESTO */}
      {activeSection === "about" && (
        <div
          className="p-6 md:p-8 rounded-2xl space-y-6 shadow-xl animate-fade-in"
          style={{
            backgroundColor: "rgba(18, 30, 68, 0.7)",
            border: "1px solid rgba(228, 218, 195, 0.14)",
          }}
        >
          <div
            className="flex items-center gap-2 pb-3"
            style={{ borderBottom: "1px solid rgba(228, 218, 195, 0.1)" }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--orange)" }}></span>
            <h3
              className="text-xs font-bold uppercase tracking-wider font-mono"
              style={{ color: "var(--cream)" }}
            >
              Studio Manifesto &amp; Philosophy
            </h3>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "var(--orange)" }}>
                Primary Intro Paragraph
              </label>
              <textarea
                rows={3}
                value={aboutP1}
                onChange={(e) => setAboutP1(e.target.value)}
                placeholder="The Intelliverse is an engineering-first software..."
                style={{
                  width: "100%",
                  marginTop: "0.5rem",
                  padding: "0.75rem 1rem",
                  backgroundColor: "rgba(248, 242, 228, 0.05)",
                  border: "1px solid rgba(228, 218, 195, 0.16)",
                  borderRadius: "0.75rem",
                  color: "var(--cream)",
                  fontSize: "0.875rem",
                  lineHeight: "1.6",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "var(--orange)" }}>
                Mission Statement Card
              </label>
              <textarea
                rows={2}
                value={aboutMission}
                onChange={(e) => setAboutMission(e.target.value)}
                placeholder="To solve problems worth solving with teams who care about excellence..."
                style={{
                  width: "100%",
                  marginTop: "0.5rem",
                  padding: "0.75rem 1rem",
                  backgroundColor: "rgba(248, 242, 228, 0.05)",
                  border: "1px solid rgba(228, 218, 195, 0.16)",
                  borderRadius: "0.75rem",
                  color: "var(--cream)",
                  fontSize: "0.875rem",
                  lineHeight: "1.6",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "var(--orange)" }}>
                Editorial Pull-Quote (Large Serif Display)
              </label>
              <textarea
                rows={2}
                value={aboutPullQuote}
                onChange={(e) => setAboutPullQuote(e.target.value)}
                placeholder="We treat every project as a genuine collaboration, not an anonymous transaction..."
                style={{
                  width: "100%",
                  marginTop: "0.5rem",
                  padding: "0.75rem 1rem",
                  backgroundColor: "rgba(248, 242, 228, 0.05)",
                  border: "1px solid rgba(228, 218, 195, 0.16)",
                  borderRadius: "0.75rem",
                  color: "var(--cream)",
                  fontSize: "0.875rem",
                  lineHeight: "1.6",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "var(--orange)" }}>
                Engineering Blueprint &amp; Delivery Paragraph
              </label>
              <textarea
                rows={3}
                value={aboutModelsText}
                onChange={(e) => setAboutModelsText(e.target.value)}
                placeholder="We engineer with Next.js, Cloud Edge Architecture, and AI Automations..."
                style={{
                  width: "100%",
                  marginTop: "0.5rem",
                  padding: "0.75rem 1rem",
                  backgroundColor: "rgba(248, 242, 228, 0.05)",
                  border: "1px solid rgba(228, 218, 195, 0.16)",
                  borderRadius: "0.75rem",
                  color: "var(--cream)",
                  fontSize: "0.875rem",
                  lineHeight: "1.6",
                  outline: "none",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: VERIFIED NUMBERS */}
      {activeSection === "numbers" && (
        <div
          className="p-6 md:p-8 rounded-2xl space-y-6 shadow-xl animate-fade-in"
          style={{
            backgroundColor: "rgba(18, 30, 68, 0.7)",
            border: "1px solid rgba(228, 218, 195, 0.14)",
          }}
        >
          <div
            className="flex items-center gap-2 pb-3"
            style={{ borderBottom: "1px solid rgba(228, 218, 195, 0.1)" }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--orange)" }}></span>
            <h3
              className="text-xs font-bold uppercase tracking-wider font-mono"
              style={{ color: "var(--cream)" }}
            >
              Performance Metrics (Counter Cards)
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div
              className="p-4 rounded-xl"
              style={{
                backgroundColor: "rgba(248, 242, 228, 0.04)",
                border: "1px solid rgba(228, 218, 195, 0.14)",
              }}
            >
              <span className="text-[10px] uppercase font-semibold font-mono" style={{ color: "var(--orange)" }}>
                Projects Shipped (Value + &quot;+&quot;)
              </span>
              <div className="flex items-center gap-2 mt-3">
                <input
                  type="number"
                  min="0"
                  value={statsProjects}
                  onChange={(e) => setStatsProjects(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.8rem",
                    backgroundColor: "rgba(11, 21, 48, 0.6)",
                    border: "1px solid rgba(228, 218, 195, 0.16)",
                    borderRadius: "0.5rem",
                    color: "var(--cream)",
                    fontSize: "1.25rem",
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    outline: "none",
                  }}
                />
                <span className="text-xl font-serif" style={{ color: "var(--blue)" }}>+</span>
              </div>
              <p className="text-[10px] mt-2 font-mono" style={{ color: "rgba(248, 242, 228, 0.6)" }}>
                Live metric: &quot;{statsProjects}+ Projects shipped&quot;
              </p>
            </div>

            <div
              className="p-4 rounded-xl"
              style={{
                backgroundColor: "rgba(248, 242, 228, 0.04)",
                border: "1px solid rgba(228, 218, 195, 0.14)",
              }}
            >
              <span className="text-[10px] uppercase font-semibold font-mono" style={{ color: "var(--orange)" }}>
                Client Satisfaction (Percentage)
              </span>
              <div className="flex items-center gap-2 mt-3">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={statsSatisfaction}
                  onChange={(e) => setStatsSatisfaction(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.8rem",
                    backgroundColor: "rgba(11, 21, 48, 0.6)",
                    border: "1px solid rgba(228, 218, 195, 0.16)",
                    borderRadius: "0.5rem",
                    color: "var(--cream)",
                    fontSize: "1.25rem",
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    outline: "none",
                  }}
                />
                <span className="text-xl font-serif" style={{ color: "var(--blue)" }}>%</span>
              </div>
              <p className="text-[10px] mt-2 font-mono" style={{ color: "rgba(248, 242, 228, 0.6)" }}>
                Live metric: &quot;{statsSatisfaction}% Client satisfaction&quot;
              </p>
            </div>

            <div
              className="p-4 rounded-xl"
              style={{
                backgroundColor: "rgba(248, 242, 228, 0.04)",
                border: "1px solid rgba(228, 218, 195, 0.14)",
              }}
            >
              <span className="text-[10px] uppercase font-semibold font-mono" style={{ color: "var(--orange)" }}>
                Happy Clients Count
              </span>
              <div className="flex items-center gap-2 mt-3">
                <input
                  type="number"
                  min="0"
                  value={statsClients}
                  onChange={(e) => setStatsClients(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.8rem",
                    backgroundColor: "rgba(11, 21, 48, 0.6)",
                    border: "1px solid rgba(228, 218, 195, 0.16)",
                    borderRadius: "0.5rem",
                    color: "var(--cream)",
                    fontSize: "1.25rem",
                    fontFamily: "'Instrument Serif', Georgia, serif",
                    outline: "none",
                  }}
                />
                <span className="text-xl font-serif" style={{ color: "var(--blue)" }}>+</span>
              </div>
              <p className="text-[10px] mt-2 font-mono" style={{ color: "rgba(248, 242, 228, 0.6)" }}>
                Live metric: &quot;{statsClients}+ Happy clients&quot;
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: ESTIMATOR & PRICING */}
      {activeSection === "estimator" && (
        <div
          className="p-6 md:p-8 rounded-2xl space-y-6 shadow-xl animate-fade-in"
          style={{
            backgroundColor: "rgba(18, 30, 68, 0.7)",
            border: "1px solid rgba(228, 218, 195, 0.14)",
          }}
        >
          <div
            className="flex items-center justify-between pb-3"
            style={{ borderBottom: "1px solid rgba(228, 218, 195, 0.1)" }}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--orange)" }}></span>
              <h3
                className="text-xs font-bold uppercase tracking-wider font-mono"
                style={{ color: "var(--cream)" }}
              >
                Project Estimator &amp; Pricing Configuration
              </h3>
            </div>
            <button
              onClick={handleAddEstimatorType}
              className="px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer font-mono"
              style={{
                backgroundColor: "rgba(47, 99, 224, 0.15)",
                color: "var(--blue)",
                border: "1px solid rgba(61, 123, 247, 0.3)",
              }}
            >
              <i className="fas fa-plus text-[10px]"></i>
              <span>Add Architecture Tier</span>
            </button>
          </div>

          {/* Starting Price Field */}
          <div
            className="p-4 rounded-xl"
            style={{
              backgroundColor: "rgba(248, 242, 228, 0.04)",
              border: "1px solid rgba(228, 218, 195, 0.14)",
            }}
          >
            <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "var(--orange)" }}>
              Starting Price Badge (e.g. ₹15,000 / ₹15K)
            </label>
            <div className="flex items-center gap-3 mt-2">
              <input
                type="text"
                value={estimatorStartingPrice}
                onChange={(e) => setEstimatorStartingPrice(e.target.value)}
                placeholder="₹15,000"
                style={{
                  maxWidth: "320px",
                  padding: "0.75rem 1rem",
                  backgroundColor: "rgba(11, 21, 48, 0.6)",
                  border: "1px solid rgba(228, 218, 195, 0.16)",
                  borderRadius: "0.75rem",
                  color: "var(--cream)",
                  fontSize: "1rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600,
                  outline: "none",
                }}
              />
              <span className="text-xs font-mono" style={{ color: "rgba(248, 242, 228, 0.65)" }}>
                Shown on the Estimator header badge and scoping briefs.
              </span>
            </div>
          </div>

          {/* Architecture Tiers List */}
          <div className="space-y-4">
            <label className="text-[10px] uppercase font-semibold tracking-wider font-mono block" style={{ color: "var(--cream)" }}>
              Configurable Architecture Tiers ({estimatorTypes?.length || 0})
            </label>

            <div className="space-y-3">
              {estimatorTypes && estimatorTypes.map((tier, idx) => (
                <div
                  key={tier.id || idx}
                  className="p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center gap-3"
                  style={{
                    backgroundColor: "rgba(248, 242, 228, 0.03)",
                    border: "1px solid rgba(228, 218, 195, 0.12)",
                  }}
                >
                  <span
                    className="text-xs font-mono font-bold px-2 py-1 rounded"
                    style={{
                      backgroundColor: "rgba(253, 179, 71, 0.15)",
                      color: "var(--orange)",
                    }}
                  >
                    0{idx + 1}
                  </span>

                  <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                    <div>
                      <span className="text-[10px] uppercase font-mono block" style={{ color: "rgba(248, 242, 228, 0.55)" }}>
                        Service / Tier Name
                      </span>
                      <input
                        type="text"
                        value={tier.label}
                        onChange={(e) => handleUpdateEstimatorType(idx, "label", e.target.value)}
                        placeholder="e.g. Starter Web / Landing Page"
                        style={{
                          width: "100%",
                          marginTop: "0.25rem",
                          padding: "0.55rem 0.85rem",
                          backgroundColor: "rgba(11, 21, 48, 0.6)",
                          border: "1px solid rgba(228, 218, 195, 0.14)",
                          borderRadius: "0.5rem",
                          color: "var(--cream)",
                          fontSize: "0.8125rem",
                          outline: "none",
                        }}
                      />
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-mono block" style={{ color: "rgba(248, 242, 228, 0.55)" }}>
                        Indicative Price Range
                      </span>
                      <input
                        type="text"
                        value={tier.baseRange}
                        onChange={(e) => handleUpdateEstimatorType(idx, "baseRange", e.target.value)}
                        placeholder="e.g. ₹15,000 – ₹45,000"
                        style={{
                          width: "100%",
                          marginTop: "0.25rem",
                          padding: "0.55rem 0.85rem",
                          backgroundColor: "rgba(11, 21, 48, 0.6)",
                          border: "1px solid rgba(228, 218, 195, 0.14)",
                          borderRadius: "0.5rem",
                          color: "var(--cream)",
                          fontSize: "0.8125rem",
                          fontFamily: "'JetBrains Mono', monospace",
                          outline: "none",
                        }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteEstimatorType(idx)}
                    disabled={estimatorTypes.length <= 1}
                    className="p-2 rounded-lg text-xs transition cursor-pointer self-end md:self-center disabled:opacity-30"
                    style={{
                      color: "var(--coral)",
                      backgroundColor: "rgba(255, 107, 123, 0.1)",
                      border: "1px solid rgba(255, 107, 123, 0.2)",
                    }}
                    title="Remove tier"
                  >
                    <i className="fas fa-trash-alt"></i>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: STUDIO CHANNELS & SOCIALS */}
      {activeSection === "contact" && (
        <div
          className="p-6 md:p-8 rounded-2xl space-y-6 shadow-xl animate-fade-in"
          style={{
            backgroundColor: "rgba(18, 30, 68, 0.7)",
            border: "1px solid rgba(228, 218, 195, 0.14)",
          }}
        >
          <div
            className="flex items-center gap-2 pb-3"
            style={{ borderBottom: "1px solid rgba(228, 218, 195, 0.1)" }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--orange)" }}></span>
            <h3
              className="text-xs font-bold uppercase tracking-wider font-mono"
              style={{ color: "var(--cream)" }}
            >
              Direct Studio Contact &amp; Social Channels
            </h3>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "var(--orange)" }}>
                Direct Founder Email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="theintelliverse@gmail.com"
                style={{
                  width: "100%",
                  marginTop: "0.5rem",
                  padding: "0.75rem 1rem",
                  backgroundColor: "rgba(248, 242, 228, 0.05)",
                  border: "1px solid rgba(228, 218, 195, 0.16)",
                  borderRadius: "0.75rem",
                  color: "var(--cream)",
                  fontSize: "0.875rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "var(--orange)" }}>
                Official LinkedIn URL
              </label>
              <input
                type="url"
                value={contactLinkedin}
                onChange={(e) => setContactLinkedin(e.target.value)}
                placeholder="https://www.linkedin.com/company/the-intelliverse/"
                style={{
                  width: "100%",
                  marginTop: "0.5rem",
                  padding: "0.75rem 1rem",
                  backgroundColor: "rgba(248, 242, 228, 0.05)",
                  border: "1px solid rgba(228, 218, 195, 0.16)",
                  borderRadius: "0.75rem",
                  color: "var(--cream)",
                  fontSize: "0.875rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "var(--orange)" }}>
                Official Instagram URL
              </label>
              <input
                type="url"
                value={contactInstagram}
                onChange={(e) => setContactInstagram(e.target.value)}
                placeholder="https://www.instagram.com/the_intelliverse/"
                style={{
                  width: "100%",
                  marginTop: "0.5rem",
                  padding: "0.75rem 1rem",
                  backgroundColor: "rgba(248, 242, 228, 0.05)",
                  border: "1px solid rgba(228, 218, 195, 0.16)",
                  borderRadius: "0.75rem",
                  color: "var(--cream)",
                  fontSize: "0.875rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  outline: "none",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Save Bar */}
      <div
        className="pt-6 flex items-center justify-between"
        style={{ borderTop: "1px solid rgba(228, 218, 195, 0.12)" }}
      >
        <p className="text-xs font-sans" style={{ color: "rgba(248, 242, 228, 0.6)" }}>
          Clicking save synchronizes all content across the database and live visitors immediately.
        </p>
        <button
          onClick={handleSaveCMS}
          disabled={loading}
          className="px-6 py-3 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50 active:scale-95 flex items-center gap-2"
          style={{
            backgroundColor: "var(--blue-deep)",
            color: "var(--cream)",
            border: "none",
            boxShadow: "0 4px 14px rgba(47, 99, 224, 0.35)",
            fontFamily: "'JetBrains Mono', monospace",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--blue-press)")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--blue-deep)")}
        >
          {loading ? (
            <i className="fas fa-spinner fa-spin"></i>
          ) : (
            <i className="fas fa-save"></i>
          )}
          <span>Save Changes Now</span>
        </button>
      </div>
    </div>
  );
}
