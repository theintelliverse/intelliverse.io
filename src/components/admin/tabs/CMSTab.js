"use client";

import { useState } from "react";
import StudioTelemetryCard from "@/components/ui/StudioTelemetryCard";

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
  estimatorIncludedCharges,
  setEstimatorIncludedCharges,
  telemetry,
  setTelemetry,
  services,
  setServices,
  processStages,
  setProcessStages,
  marquee,
  setMarquee,
  philosophy,
  setPhilosophy,
  handleSaveCMS,
  loading
}) {
  const [activeSection, setActiveSection] = useState("hero"); // hero | about | services | process | philosophy | marquee | estimator | numbers | contact | telemetry

  const handleUpdateTelemetry = (field, value) => {
    setTelemetry((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateTelemetryBar = (index, field, value) => {
    const updatedBars = [...(telemetry?.bars || [])];
    updatedBars[index] = {
      ...updatedBars[index],
      [field]: field === "val" ? Number(value) : value,
    };
    setTelemetry((prev) => ({
      ...prev,
      bars: updatedBars,
    }));
  };

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

  const handleUpdateIncludedCharge = (index, field, value) => {
    const updated = [...(estimatorIncludedCharges || [])];
    updated[index] = { ...updated[index], [field]: value };
    setEstimatorIncludedCharges(updated);
  };

  const handleAddIncludedCharge = () => {
    const newCharge = {
      title: "New Deliverable / Package Inclusion",
      badge: "INCLUDED",
      note: "Fully covered in the base architecture package"
    };
    setEstimatorIncludedCharges([...(estimatorIncludedCharges || []), newCharge]);
  };

  const handleDeleteIncludedCharge = (index) => {
    if ((estimatorIncludedCharges || []).length <= 1) return;
    setEstimatorIncludedCharges(estimatorIncludedCharges.filter((_, i) => i !== index));
  };

  // --- Handlers for Services Pillars ---
  const handleServiceChange = (index, field, value) => {
    const updated = [...(services || [])];
    updated[index] = { ...updated[index], [field]: value };
    setServices(updated);
  };

  const handleServiceSubChange = (serviceIndex, subIndex, value) => {
    const updated = [...(services || [])];
    const newSub = [...(updated[serviceIndex]?.sub || [])];
    newSub[subIndex] = value;
    updated[serviceIndex] = { ...updated[serviceIndex], sub: newSub };
    setServices(updated);
  };

  const handleAddServiceSub = (serviceIndex) => {
    const updated = [...(services || [])];
    const newSub = [...(updated[serviceIndex]?.sub || []), "New Capability / Technology"];
    updated[serviceIndex] = { ...updated[serviceIndex], sub: newSub };
    setServices(updated);
  };

  const handleDeleteServiceSub = (serviceIndex, subIndex) => {
    const updated = [...(services || [])];
    const newSub = (updated[serviceIndex]?.sub || []).filter((_, i) => i !== subIndex);
    updated[serviceIndex] = { ...updated[serviceIndex], sub: newSub };
    setServices(updated);
  };

  const handleAddService = () => {
    const count = (services || []).length + 1;
    const newPillar = {
      id: `service-${Date.now()}`,
      title: "New Architectural Pillar",
      index: count < 10 ? `0${count}` : `${count}`,
      dotColor: "var(--blue)",
      previewText: "Description of new technical pillar and capabilities.",
      sub: ["First Core Capability", "Second Core Capability", "Third Core Capability"],
    };
    setServices([...(services || []), newPillar]);
  };

  const handleDeleteService = (index) => {
    if ((services || []).length <= 1) return;
    setServices((services || []).filter((_, i) => i !== index));
  };

  // --- Handlers for Process Flywheel ---
  const handleProcessChange = (index, field, value) => {
    const updated = [...(processStages || [])];
    updated[index] = { ...updated[index], [field]: value };
    setProcessStages(updated);
  };

  const handleProcessDeliverableChange = (stageIndex, delIndex, value) => {
    const updated = [...(processStages || [])];
    const newDel = [...(updated[stageIndex]?.deliverables || [])];
    newDel[delIndex] = value;
    updated[stageIndex] = { ...updated[stageIndex], deliverables: newDel };
    setProcessStages(updated);
  };

  const handleAddProcessDeliverable = (stageIndex) => {
    const updated = [...(processStages || [])];
    const newDel = [...(updated[stageIndex]?.deliverables || []), "Key Deliverable"];
    updated[stageIndex] = { ...updated[stageIndex], deliverables: newDel };
    setProcessStages(updated);
  };

  const handleDeleteProcessDeliverable = (stageIndex, delIndex) => {
    const updated = [...(processStages || [])];
    const newDel = (updated[stageIndex]?.deliverables || []).filter((_, i) => i !== delIndex);
    updated[stageIndex] = { ...updated[stageIndex], deliverables: newDel };
    setProcessStages(updated);
  };

  const handleAddProcessStage = () => {
    const count = (processStages || []).length + 1;
    const newStage = {
      num: count < 10 ? `0${count}` : `${count}`,
      tag: "NEW PHASE",
      title: "New Stage Title",
      description: "Description of the architectural execution phase and milestones.",
      deliverables: ["Specification Document", "Operational Deliverable"],
      telemetry: "STAGE: ACTIVE · ZERO DOWNTIME",
    };
    setProcessStages([...(processStages || []), newStage]);
  };

  const handleDeleteProcessStage = (index) => {
    if ((processStages || []).length <= 1) return;
    setProcessStages((processStages || []).filter((_, i) => i !== index));
  };

  // --- Handlers for Engagement Philosophy ---
  const handlePhilosophyChange = (index, field, value) => {
    const updated = [...(philosophy || [])];
    updated[index] = { ...updated[index], [field]: value };
    setPhilosophy(updated);
  };

  const handlePhilosophyChipChange = (rowIndex, chipIndex, value) => {
    const updated = [...(philosophy || [])];
    const newChips = [...(updated[rowIndex]?.chips || [])];
    newChips[chipIndex] = value;
    updated[rowIndex] = { ...updated[rowIndex], chips: newChips };
    setPhilosophy(updated);
  };

  const handleAddPhilosophyChip = (rowIndex) => {
    const updated = [...(philosophy || [])];
    const newChips = [...(updated[rowIndex]?.chips || []), "New Capability"];
    updated[rowIndex] = { ...updated[rowIndex], chips: newChips };
    setPhilosophy(updated);
  };

  const handleDeletePhilosophyChip = (rowIndex, chipIndex) => {
    const updated = [...(philosophy || [])];
    const newChips = (updated[rowIndex]?.chips || []).filter((_, i) => i !== chipIndex);
    updated[rowIndex] = { ...updated[rowIndex], chips: newChips };
    setPhilosophy(updated);
  };

  // --- Handlers for Marquee Tickers ---
  const handleMarquee1Change = (index, value) => {
    const updated = [...(marquee?.items1 || [])];
    updated[index] = value;
    setMarquee({ ...marquee, items1: updated });
  };

  const handleAddMarquee1 = () => {
    const updated = [...(marquee?.items1 || []), "New Editorial Statement"];
    setMarquee({ ...marquee, items1: updated });
  };

  const handleDeleteMarquee1 = (index) => {
    const updated = (marquee?.items1 || []).filter((_, i) => i !== index);
    setMarquee({ ...marquee, items1: updated });
  };

  const handleMarquee2Change = (index, value) => {
    const updated = [...(marquee?.items2 || [])];
    updated[index] = value;
    setMarquee({ ...marquee, items2: updated });
  };

  const handleAddMarquee2 = () => {
    const updated = [...(marquee?.items2 || []), "New Tech Tag"];
    setMarquee({ ...marquee, items2: updated });
  };

  const handleDeleteMarquee2 = (index) => {
    const updated = (marquee?.items2 || []).filter((_, i) => i !== index);
    setMarquee({ ...marquee, items2: updated });
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
          { id: "services", label: "03. Services (4 Pillars)", icon: "fa-cubes" },
          { id: "process", label: "04. Process Flywheel", icon: "fa-sync-alt" },
          { id: "philosophy", label: "05. Engagement Models", icon: "fa-handshake" },
          { id: "marquee", label: "06. Marquee Tickers", icon: "fa-scroll" },
          { id: "estimator", label: "07. Estimator & Pricing", icon: "fa-calculator" },
          { id: "numbers", label: "08. Verified Numbers", icon: "fa-chart-bar" },
          { id: "contact", label: "09. Studio Channels", icon: "fa-paper-plane" },
          { id: "telemetry", label: "10. Studio Telemetry", icon: "fa-satellite-dish" },
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

      {/* SECTION: SERVICES (4 PILLARS) */}
      {activeSection === "services" && (
        <div
          className="p-6 md:p-8 rounded-2xl space-y-6 shadow-xl animate-fade-in"
          style={{
            backgroundColor: "rgba(18, 30, 68, 0.7)",
            border: "1px solid rgba(228, 218, 195, 0.14)",
          }}
        >
          <div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3"
            style={{ borderBottom: "1px solid rgba(228, 218, 195, 0.1)" }}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--orange)" }}></span>
              <h3
                className="text-xs font-bold uppercase tracking-wider font-mono"
                style={{ color: "var(--cream)" }}
              >
                Core Architectural Pillars &amp; Services
              </h3>
            </div>
            <button
              onClick={handleAddService}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5 self-start sm:self-auto transition"
              style={{
                backgroundColor: "rgba(47, 99, 224, 0.25)",
                border: "1px solid rgba(47, 99, 224, 0.45)",
                color: "var(--cream)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <i className="fas fa-plus text-[10px]"></i>
              <span>Add New Pillar</span>
            </button>
          </div>

          <p className="text-xs" style={{ color: "rgba(248, 242, 228, 0.65)" }}>
            Configure each service pillar, its index number, dot accent color, narrative preview, and bullet points.
          </p>

          <div className="space-y-6">
            {(services || []).map((srv, srvIdx) => (
              <div
                key={srv.id || srvIdx}
                className="p-5 rounded-xl space-y-4"
                style={{
                  backgroundColor: "rgba(248, 242, 228, 0.03)",
                  border: "1px solid rgba(228, 218, 195, 0.12)",
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2 py-0.5 rounded text-[11px] font-bold font-mono"
                      style={{
                        backgroundColor: "rgba(47, 99, 224, 0.3)",
                        color: "var(--cream)",
                      }}
                    >
                      Pillar {srv.index || `0${srvIdx + 1}`}
                    </span>
                    <span className="text-xs font-bold font-mono" style={{ color: "var(--cream)" }}>
                      {srv.title || "Untitled Pillar"}
                    </span>
                  </div>
                  {(services || []).length > 1 && (
                    <button
                      onClick={() => handleDeleteService(srvIdx)}
                      className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded cursor-pointer transition"
                      title="Delete Pillar"
                    >
                      <i className="fas fa-trash-alt mr-1"></i> Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-6">
                    <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "var(--orange)" }}>
                      Pillar Title
                    </label>
                    <input
                      type="text"
                      value={srv.title || ""}
                      onChange={(e) => handleServiceChange(srvIdx, "title", e.target.value)}
                      placeholder="e.g. Web Architecture & Frontend"
                      style={{
                        width: "100%",
                        marginTop: "0.4rem",
                        padding: "0.6rem 0.85rem",
                        backgroundColor: "rgba(248, 242, 228, 0.05)",
                        border: "1px solid rgba(228, 218, 195, 0.16)",
                        borderRadius: "0.5rem",
                        color: "var(--cream)",
                        fontSize: "0.85rem",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "var(--orange)" }}>
                      Display Index
                    </label>
                    <input
                      type="text"
                      value={srv.index || ""}
                      onChange={(e) => handleServiceChange(srvIdx, "index", e.target.value)}
                      placeholder="01"
                      style={{
                        width: "100%",
                        marginTop: "0.4rem",
                        padding: "0.6rem 0.85rem",
                        backgroundColor: "rgba(248, 242, 228, 0.05)",
                        border: "1px solid rgba(228, 218, 195, 0.16)",
                        borderRadius: "0.5rem",
                        color: "var(--cream)",
                        fontSize: "0.85rem",
                        fontFamily: "'JetBrains Mono', monospace",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "var(--orange)" }}>
                      Dot Color Accent
                    </label>
                    <input
                      type="text"
                      value={srv.dotColor || ""}
                      onChange={(e) => handleServiceChange(srvIdx, "dotColor", e.target.value)}
                      placeholder="var(--blue) or #3D7BF7"
                      style={{
                        width: "100%",
                        marginTop: "0.4rem",
                        padding: "0.6rem 0.85rem",
                        backgroundColor: "rgba(248, 242, 228, 0.05)",
                        border: "1px solid rgba(228, 218, 195, 0.16)",
                        borderRadius: "0.5rem",
                        color: "var(--cream)",
                        fontSize: "0.85rem",
                        fontFamily: "'JetBrains Mono', monospace",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div className="md:col-span-12">
                    <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "var(--orange)" }}>
                      Preview Summary / Subtitle
                    </label>
                    <textarea
                      rows={2}
                      value={srv.previewText || ""}
                      onChange={(e) => handleServiceChange(srvIdx, "previewText", e.target.value)}
                      placeholder="Sub-second Next.js 15 apps, headless Shopify storefronts..."
                      style={{
                        width: "100%",
                        marginTop: "0.4rem",
                        padding: "0.6rem 0.85rem",
                        backgroundColor: "rgba(248, 242, 228, 0.05)",
                        border: "1px solid rgba(228, 218, 195, 0.16)",
                        borderRadius: "0.5rem",
                        color: "var(--cream)",
                        fontSize: "0.85rem",
                        lineHeight: "1.5",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div className="md:col-span-12 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "var(--cream)" }}>
                        Bullet Capabilities / Sub-Items
                      </label>
                      <button
                        onClick={() => handleAddServiceSub(srvIdx)}
                        className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded cursor-pointer transition"
                        style={{
                          backgroundColor: "rgba(248, 242, 228, 0.08)",
                          color: "var(--orange)",
                        }}
                      >
                        + Add Capability
                      </button>
                    </div>

                    <div className="space-y-2">
                      {(srv.sub || []).map((subItem, subIdx) => (
                        <div key={subIdx} className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-[rgba(248,242,228,0.4)] shrink-0 w-4">
                            {subIdx + 1}.
                          </span>
                          <input
                            type="text"
                            value={subItem}
                            onChange={(e) => handleServiceSubChange(srvIdx, subIdx, e.target.value)}
                            placeholder="Capability specification..."
                            style={{
                              flex: 1,
                              padding: "0.5rem 0.75rem",
                              backgroundColor: "rgba(248, 242, 228, 0.04)",
                              border: "1px solid rgba(228, 218, 195, 0.14)",
                              borderRadius: "0.4rem",
                              color: "var(--cream)",
                              fontSize: "0.8rem",
                              outline: "none",
                            }}
                          />
                          <button
                            onClick={() => handleDeleteServiceSub(srvIdx, subIdx)}
                            className="text-red-400 hover:text-red-300 text-xs px-2 py-1 cursor-pointer"
                            title="Remove item"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: PROCESS FLYWHEEL */}
      {activeSection === "process" && (
        <div
          className="p-6 md:p-8 rounded-2xl space-y-6 shadow-xl animate-fade-in"
          style={{
            backgroundColor: "rgba(18, 30, 68, 0.7)",
            border: "1px solid rgba(228, 218, 195, 0.14)",
          }}
        >
          <div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3"
            style={{ borderBottom: "1px solid rgba(228, 218, 195, 0.1)" }}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--orange)" }}></span>
              <h3
                className="text-xs font-bold uppercase tracking-wider font-mono"
                style={{ color: "var(--cream)" }}
              >
                Execution Flywheel &amp; System Architecture (Process Stages)
              </h3>
            </div>
            <button
              onClick={handleAddProcessStage}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer flex items-center gap-1.5 self-start sm:self-auto transition"
              style={{
                backgroundColor: "rgba(47, 99, 224, 0.25)",
                border: "1px solid rgba(47, 99, 224, 0.45)",
                color: "var(--cream)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <i className="fas fa-plus text-[10px]"></i>
              <span>Add Stage</span>
            </button>
          </div>

          <p className="text-xs" style={{ color: "rgba(248, 242, 228, 0.65)" }}>
            Customize the step-by-step engineering flywheel stages (Discover, Architect, Deploy, Scale), including live telemetry badges and deliverables.
          </p>

          <div className="space-y-6">
            {(processStages || []).map((stg, stgIdx) => (
              <div
                key={stg.num || stgIdx}
                className="p-5 rounded-xl space-y-4"
                style={{
                  backgroundColor: "rgba(248, 242, 228, 0.03)",
                  border: "1px solid rgba(228, 218, 195, 0.12)",
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2 py-0.5 rounded text-[11px] font-bold font-mono"
                      style={{
                        backgroundColor: "rgba(47, 99, 224, 0.3)",
                        color: "var(--cream)",
                      }}
                    >
                      Stage {stg.num || `0${stgIdx + 1}`}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase"
                      style={{
                        backgroundColor: "rgba(253, 179, 71, 0.15)",
                        color: "var(--orange)",
                      }}
                    >
                      {stg.tag || "PHASE"}
                    </span>
                    <span className="text-xs font-bold font-mono" style={{ color: "var(--cream)" }}>
                      {stg.title || "Untitled Stage"}
                    </span>
                  </div>
                  {(processStages || []).length > 1 && (
                    <button
                      onClick={() => handleDeleteProcessStage(stgIdx)}
                      className="text-red-400 hover:text-red-300 text-xs px-2 py-1 rounded cursor-pointer transition"
                      title="Delete Stage"
                    >
                      <i className="fas fa-trash-alt mr-1"></i> Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "var(--orange)" }}>
                      Number
                    </label>
                    <input
                      type="text"
                      value={stg.num || ""}
                      onChange={(e) => handleProcessChange(stgIdx, "num", e.target.value)}
                      placeholder="01"
                      style={{
                        width: "100%",
                        marginTop: "0.4rem",
                        padding: "0.6rem 0.85rem",
                        backgroundColor: "rgba(248, 242, 228, 0.05)",
                        border: "1px solid rgba(228, 218, 195, 0.16)",
                        borderRadius: "0.5rem",
                        color: "var(--cream)",
                        fontSize: "0.85rem",
                        fontFamily: "'JetBrains Mono', monospace",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div className="md:col-span-3">
                    <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "var(--orange)" }}>
                      Tag / Phase Badge
                    </label>
                    <input
                      type="text"
                      value={stg.tag || ""}
                      onChange={(e) => handleProcessChange(stgIdx, "tag", e.target.value)}
                      placeholder="DISCOVER"
                      style={{
                        width: "100%",
                        marginTop: "0.4rem",
                        padding: "0.6rem 0.85rem",
                        backgroundColor: "rgba(248, 242, 228, 0.05)",
                        border: "1px solid rgba(228, 218, 195, 0.16)",
                        borderRadius: "0.5rem",
                        color: "var(--cream)",
                        fontSize: "0.85rem",
                        fontFamily: "'JetBrains Mono', monospace",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div className="md:col-span-7">
                    <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "var(--orange)" }}>
                      Stage Title
                    </label>
                    <input
                      type="text"
                      value={stg.title || ""}
                      onChange={(e) => handleProcessChange(stgIdx, "title", e.target.value)}
                      placeholder="Discover & Strategize"
                      style={{
                        width: "100%",
                        marginTop: "0.4rem",
                        padding: "0.6rem 0.85rem",
                        backgroundColor: "rgba(248, 242, 228, 0.05)",
                        border: "1px solid rgba(228, 218, 195, 0.16)",
                        borderRadius: "0.5rem",
                        color: "var(--cream)",
                        fontSize: "0.85rem",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div className="md:col-span-12">
                    <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "var(--orange)" }}>
                      Telemetry / Metric Pill
                    </label>
                    <input
                      type="text"
                      value={stg.telemetry || ""}
                      onChange={(e) => handleProcessChange(stgIdx, "telemetry", e.target.value)}
                      placeholder="SPECS: 100% DEFINED · ZERO AMBIGUITY"
                      style={{
                        width: "100%",
                        marginTop: "0.4rem",
                        padding: "0.6rem 0.85rem",
                        backgroundColor: "rgba(248, 242, 228, 0.05)",
                        border: "1px solid rgba(228, 218, 195, 0.16)",
                        borderRadius: "0.5rem",
                        color: "var(--cream)",
                        fontSize: "0.85rem",
                        fontFamily: "'JetBrains Mono', monospace",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div className="md:col-span-12">
                    <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "var(--orange)" }}>
                      Narrative Description
                    </label>
                    <textarea
                      rows={2}
                      value={stg.description || ""}
                      onChange={(e) => handleProcessChange(stgIdx, "description", e.target.value)}
                      placeholder="We clarify system requirements, map critical edge cases..."
                      style={{
                        width: "100%",
                        marginTop: "0.4rem",
                        padding: "0.6rem 0.85rem",
                        backgroundColor: "rgba(248, 242, 228, 0.05)",
                        border: "1px solid rgba(228, 218, 195, 0.16)",
                        borderRadius: "0.5rem",
                        color: "var(--cream)",
                        fontSize: "0.85rem",
                        lineHeight: "1.5",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div className="md:col-span-12 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "var(--cream)" }}>
                        Stage Deliverables
                      </label>
                      <button
                        onClick={() => handleAddProcessDeliverable(stgIdx)}
                        className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded cursor-pointer transition"
                        style={{
                          backgroundColor: "rgba(248, 242, 228, 0.08)",
                          color: "var(--orange)",
                        }}
                      >
                        + Add Deliverable
                      </button>
                    </div>

                    <div className="space-y-2">
                      {(stg.deliverables || []).map((delItem, delIdx) => (
                        <div key={delIdx} className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-[rgba(248,242,228,0.4)] shrink-0 w-4">
                            {delIdx + 1}.
                          </span>
                          <input
                            type="text"
                            value={delItem}
                            onChange={(e) => handleProcessDeliverableChange(stgIdx, delIdx, e.target.value)}
                            placeholder="Deliverable spec item..."
                            style={{
                              flex: 1,
                              padding: "0.5rem 0.75rem",
                              backgroundColor: "rgba(248, 242, 228, 0.04)",
                              border: "1px solid rgba(228, 218, 195, 0.14)",
                              borderRadius: "0.4rem",
                              color: "var(--cream)",
                              fontSize: "0.8rem",
                              outline: "none",
                            }}
                          />
                          <button
                            onClick={() => handleDeleteProcessDeliverable(stgIdx, delIdx)}
                            className="text-red-400 hover:text-red-300 text-xs px-2 py-1 cursor-pointer"
                            title="Remove deliverable"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: ENGAGEMENT PHILOSOPHY */}
      {activeSection === "philosophy" && (
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
              Engagement Models &amp; Collaboration Philosophy
            </h3>
          </div>

          <p className="text-xs" style={{ color: "rgba(248, 242, 228, 0.65)" }}>
            Configure the 3 scalable engagement models (&ldquo;Start where you need us. Grow when you&apos;re ready&rdquo;).
          </p>

          <div className="space-y-6">
            {(philosophy || []).map((row, rowIdx) => (
              <div
                key={row.num || rowIdx}
                className="p-5 rounded-xl space-y-4"
                style={{
                  backgroundColor: "rgba(248, 242, 228, 0.03)",
                  border: "1px solid rgba(228, 218, 195, 0.12)",
                }}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="px-2 py-0.5 rounded text-[11px] font-bold font-mono"
                    style={{
                      backgroundColor: "rgba(47, 99, 224, 0.3)",
                      color: "var(--cream)",
                    }}
                  >
                    Model {row.num || `0${rowIdx + 1}`}
                  </span>
                  <span className="text-xs font-bold font-mono" style={{ color: "var(--cream)" }}>
                    {row.title || "Engagement Model"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "var(--orange)" }}>
                      Step Num
                    </label>
                    <input
                      type="text"
                      value={row.num || ""}
                      onChange={(e) => handlePhilosophyChange(rowIdx, "num", e.target.value)}
                      placeholder="01"
                      style={{
                        width: "100%",
                        marginTop: "0.4rem",
                        padding: "0.6rem 0.85rem",
                        backgroundColor: "rgba(248, 242, 228, 0.05)",
                        border: "1px solid rgba(228, 218, 195, 0.16)",
                        borderRadius: "0.5rem",
                        color: "var(--cream)",
                        fontSize: "0.85rem",
                        fontFamily: "'JetBrains Mono', monospace",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "var(--orange)" }}>
                      Model Title
                    </label>
                    <input
                      type="text"
                      value={row.title || ""}
                      onChange={(e) => handlePhilosophyChange(rowIdx, "title", e.target.value)}
                      placeholder="Single Service Engagement"
                      style={{
                        width: "100%",
                        marginTop: "0.4rem",
                        padding: "0.6rem 0.85rem",
                        backgroundColor: "rgba(248, 242, 228, 0.05)",
                        border: "1px solid rgba(228, 218, 195, 0.16)",
                        borderRadius: "0.5rem",
                        color: "var(--cream)",
                        fontSize: "0.85rem",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div className="md:col-span-5">
                    <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "var(--orange)" }}>
                      Subtitle / Punchline
                    </label>
                    <input
                      type="text"
                      value={row.subtitle || ""}
                      onChange={(e) => handlePhilosophyChange(rowIdx, "subtitle", e.target.value)}
                      placeholder="Start with one critical objective executed impeccably."
                      style={{
                        width: "100%",
                        marginTop: "0.4rem",
                        padding: "0.6rem 0.85rem",
                        backgroundColor: "rgba(248, 242, 228, 0.05)",
                        border: "1px solid rgba(228, 218, 195, 0.16)",
                        borderRadius: "0.5rem",
                        color: "var(--cream)",
                        fontSize: "0.85rem",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div className="md:col-span-12">
                    <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "var(--orange)" }}>
                      Body Description
                    </label>
                    <textarea
                      rows={2}
                      value={row.body || ""}
                      onChange={(e) => handlePhilosophyChange(rowIdx, "body", e.target.value)}
                      placeholder="Maybe you need an ultra-fast Next.js web application..."
                      style={{
                        width: "100%",
                        marginTop: "0.4rem",
                        padding: "0.6rem 0.85rem",
                        backgroundColor: "rgba(248, 242, 228, 0.05)",
                        border: "1px solid rgba(228, 218, 195, 0.16)",
                        borderRadius: "0.5rem",
                        color: "var(--cream)",
                        fontSize: "0.85rem",
                        lineHeight: "1.5",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div className="md:col-span-12 space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] uppercase font-semibold tracking-wider font-mono" style={{ color: "var(--cream)" }}>
                        Feature Chips / Scope Tags
                      </label>
                      <button
                        onClick={() => handleAddPhilosophyChip(rowIdx)}
                        className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded cursor-pointer transition"
                        style={{
                          backgroundColor: "rgba(248, 242, 228, 0.08)",
                          color: "var(--orange)",
                        }}
                      >
                        + Add Chip
                      </button>
                    </div>

                    <div className="space-y-2">
                      {(row.chips || []).map((chipItem, chipIdx) => (
                        <div key={chipIdx} className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-[rgba(248,242,228,0.4)] shrink-0 w-4">
                            {chipIdx + 1}.
                          </span>
                          <input
                            type="text"
                            value={chipItem}
                            onChange={(e) => handlePhilosophyChipChange(rowIdx, chipIdx, e.target.value)}
                            placeholder="Chip text (e.g. Next.js Architecture)..."
                            style={{
                              flex: 1,
                              padding: "0.5rem 0.75rem",
                              backgroundColor: "rgba(248, 242, 228, 0.04)",
                              border: "1px solid rgba(228, 218, 195, 0.14)",
                              borderRadius: "0.4rem",
                              color: "var(--cream)",
                              fontSize: "0.8rem",
                              outline: "none",
                            }}
                          />
                          <button
                            onClick={() => handleDeletePhilosophyChip(rowIdx, chipIdx)}
                            className="text-red-400 hover:text-red-300 text-xs px-2 py-1 cursor-pointer"
                            title="Remove chip"
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION: MARQUEE TICKERS */}
      {activeSection === "marquee" && (
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
              Open Workshop Velocity Marquee Tickers
            </h3>
          </div>

          <p className="text-xs" style={{ color: "rgba(248, 242, 228, 0.65)" }}>
            Edit the continuous scroll banners that appear beneath the Hero section.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Strip 1: Large Serif Phrases */}
            <div
              className="p-5 rounded-xl space-y-4"
              style={{
                backgroundColor: "rgba(248, 242, 228, 0.03)",
                border: "1px solid rgba(228, 218, 195, 0.12)",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold font-mono uppercase" style={{ color: "var(--cream)" }}>
                    Upper Strip: Editorial Serif Statements
                  </h4>
                  <p className="text-[11px]" style={{ color: "rgba(248, 242, 228, 0.5)" }}>
                    Moves left · Serif font
                  </p>
                </div>
                <button
                  onClick={handleAddMarquee1}
                  className="px-2.5 py-1 rounded text-[11px] font-mono font-semibold cursor-pointer transition"
                  style={{
                    backgroundColor: "rgba(47, 99, 224, 0.3)",
                    color: "var(--cream)",
                  }}
                >
                  + Add Phrase
                </button>
              </div>

              <div className="space-y-2">
                {(marquee?.items1 || []).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[rgba(248,242,228,0.4)] shrink-0 w-4">
                      {idx + 1}.
                    </span>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleMarquee1Change(idx, e.target.value)}
                      placeholder="Editorial statement..."
                      style={{
                        flex: 1,
                        padding: "0.5rem 0.75rem",
                        backgroundColor: "rgba(248, 242, 228, 0.04)",
                        border: "1px solid rgba(228, 218, 195, 0.14)",
                        borderRadius: "0.4rem",
                        color: "var(--cream)",
                        fontSize: "0.85rem",
                        outline: "none",
                      }}
                    />
                    <button
                      onClick={() => handleDeleteMarquee1(idx)}
                      className="text-red-400 hover:text-red-300 text-xs px-2 py-1 cursor-pointer"
                      title="Remove phrase"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Strip 2: Technical Mono Tags */}
            <div
              className="p-5 rounded-xl space-y-4"
              style={{
                backgroundColor: "rgba(248, 242, 228, 0.03)",
                border: "1px solid rgba(228, 218, 195, 0.12)",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold font-mono uppercase" style={{ color: "var(--cream)" }}>
                    Lower Strip: Technical Architecture Tags
                  </h4>
                  <p className="text-[11px]" style={{ color: "rgba(248, 242, 228, 0.5)" }}>
                    Moves right · Mono font
                  </p>
                </div>
                <button
                  onClick={handleAddMarquee2}
                  className="px-2.5 py-1 rounded text-[11px] font-mono font-semibold cursor-pointer transition"
                  style={{
                    backgroundColor: "rgba(47, 99, 224, 0.3)",
                    color: "var(--cream)",
                  }}
                >
                  + Add Tag
                </button>
              </div>

              <div className="space-y-2">
                {(marquee?.items2 || []).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[rgba(248,242,228,0.4)] shrink-0 w-4">
                      {idx + 1}.
                    </span>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleMarquee2Change(idx, e.target.value)}
                      placeholder="Tech tag..."
                      style={{
                        flex: 1,
                        padding: "0.5rem 0.75rem",
                        backgroundColor: "rgba(248, 242, 228, 0.04)",
                        border: "1px solid rgba(228, 218, 195, 0.14)",
                        borderRadius: "0.4rem",
                        color: "var(--cream)",
                        fontSize: "0.85rem",
                        fontFamily: "'JetBrains Mono', monospace",
                        outline: "none",
                      }}
                    />
                    <button
                      onClick={() => handleDeleteMarquee2(idx)}
                      className="text-red-400 hover:text-red-300 text-xs px-2 py-1 cursor-pointer"
                      title="Remove tag"
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 8: VERIFIED NUMBERS */}
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

          {/* Predefined Package Inclusions & Covered Charges */}
          <div className="space-y-4 pt-4" style={{ borderTop: "1px dashed rgba(228, 218, 195, 0.15)" }}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <label className="text-[10px] uppercase font-semibold tracking-wider font-mono block" style={{ color: "var(--cream)" }}>
                  Predefined Package Inclusions &amp; Covered Charges ({estimatorIncludedCharges?.length || 0})
                </label>
                <span className="text-[11px] font-mono" style={{ color: "rgba(248, 242, 228, 0.55)" }}>
                  Deliverables covered in the base budget package shown on the Studio Specification Sheet.
                </span>
              </div>
              <button
                type="button"
                onClick={handleAddIncludedCharge}
                className="px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer font-mono self-start md:self-auto"
                style={{
                  backgroundColor: "rgba(34, 165, 91, 0.15)",
                  color: "#22A55B",
                  border: "1px solid rgba(34, 165, 91, 0.3)",
                }}
              >
                <i className="fas fa-plus text-[10px]"></i>
                <span>Add Covered Deliverable</span>
              </button>
            </div>

            <div className="space-y-3">
              {estimatorIncludedCharges && estimatorIncludedCharges.map((charge, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center gap-3"
                  style={{
                    backgroundColor: "rgba(248, 242, 228, 0.03)",
                    border: "1px solid rgba(228, 218, 195, 0.12)",
                  }}
                >
                  <span
                    className="text-xs font-mono font-bold px-2 py-1 rounded"
                    style={{
                      backgroundColor: "rgba(34, 165, 91, 0.15)",
                      color: "#22A55B",
                    }}
                  >
                    0{idx + 1}
                  </span>

                  <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                    <div className="md:col-span-2">
                      <span className="text-[10px] uppercase font-mono block" style={{ color: "rgba(248, 242, 228, 0.55)" }}>
                        Deliverable / Inclusion Name
                      </span>
                      <input
                        type="text"
                        value={charge.title}
                        onChange={(e) => handleUpdateIncludedCharge(idx, "title", e.target.value)}
                        placeholder="e.g. 100% IP & Full Source Code Ownership"
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
                        Status Badge
                      </span>
                      <input
                        type="text"
                        value={charge.badge || "INCLUDED"}
                        onChange={(e) => handleUpdateIncludedCharge(idx, "badge", e.target.value)}
                        placeholder="INCLUDED"
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
                    type="button"
                    onClick={() => handleDeleteIncludedCharge(idx)}
                    disabled={estimatorIncludedCharges.length <= 1}
                    className="p-2 rounded-lg text-xs transition cursor-pointer self-end md:self-center disabled:opacity-30"
                    style={{
                      color: "var(--coral)",
                      backgroundColor: "rgba(255, 107, 123, 0.1)",
                      border: "1px solid rgba(255, 107, 123, 0.2)",
                    }}
                    title="Remove inclusion"
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

      {/* SECTION 10: STUDIO TELEMETRY & EDGE ACTIVITY */}
      {activeSection === "telemetry" && (
        <div className="space-y-6 animate-fade-in">
          {/* Section Header */}
          <div
            className="p-6 rounded-2xl shadow-xl flex flex-wrap items-center justify-between gap-4"
            style={{
              backgroundColor: "rgba(18, 30, 68, 0.7)",
              border: "1px solid rgba(228, 218, 195, 0.14)",
            }}
          >
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider font-mono text-[var(--cream)]">
                  10. Studio Telemetry &amp; Edge Activity Feed
                </h3>
                <p className="text-xs font-sans text-[rgba(248,242,228,0.6)] mt-0.5">
                  Configure live deployment counters, journal ticker, 7-day sparkline edge activity bars, and event stream console.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-[rgba(34,165,91,0.15)] text-[#22a55b] border border-[rgba(34,165,91,0.3)] font-bold">
                ● Live Dynamic Feed
              </span>
            </div>
          </div>

          {/* 2-Column Layout: Left Controls, Right Realtime Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            {/* Left Column: Form Controls */}
            <div className="lg:col-span-7 space-y-6">

              {/* Group 1: Header & Live Feed Badges */}
              <div
                className="p-5 md:p-6 rounded-2xl space-y-4 shadow-lg"
                style={{
                  backgroundColor: "rgba(18, 30, 68, 0.55)",
                  border: "1px solid rgba(228, 218, 195, 0.12)",
                }}
              >
                <div className="flex items-center gap-2 pb-2 border-b border-[rgba(228,218,195,0.08)]">
                  <i className="fas fa-satellite text-xs text-[var(--orange)]" />
                  <span className="text-xs font-bold uppercase tracking-wider font-mono text-[var(--cream)]">
                    Card Header &amp; Live Badges
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-semibold tracking-wider font-mono text-[var(--orange)]">
                      Card Title
                    </label>
                    <input
                      type="text"
                      value={telemetry?.headerTitle || ""}
                      onChange={(e) => handleUpdateTelemetry("headerTitle", e.target.value)}
                      placeholder="Studio Telemetry"
                      className="w-full mt-1.5 p-2.5 rounded-xl text-xs font-mono bg-[rgba(248,242,228,0.05)] border border-[rgba(228,218,195,0.16)] text-[var(--cream)] outline-none focus:border-[var(--blue)]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-semibold tracking-wider font-mono text-[var(--orange)]">
                      Feed Badge Label
                    </label>
                    <input
                      type="text"
                      value={telemetry?.badgeLabel || ""}
                      onChange={(e) => handleUpdateTelemetry("badgeLabel", e.target.value)}
                      placeholder="LIVE FEED"
                      className="w-full mt-1.5 p-2.5 rounded-xl text-xs font-mono bg-[rgba(248,242,228,0.05)] border border-[rgba(228,218,195,0.16)] text-[var(--cream)] outline-none focus:border-[var(--blue)]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-semibold tracking-wider font-mono text-[var(--orange)]">
                      Week / Sub Badge
                    </label>
                    <input
                      type="text"
                      value={telemetry?.badgeSub || ""}
                      onChange={(e) => handleUpdateTelemetry("badgeSub", e.target.value)}
                      placeholder="· W41"
                      className="w-full mt-1.5 p-2.5 rounded-xl text-xs font-mono bg-[rgba(248,242,228,0.05)] border border-[rgba(228,218,195,0.16)] text-[var(--cream)] outline-none focus:border-[var(--blue)]"
                    />
                  </div>
                </div>
              </div>

              {/* Group 2: Workshop Journal Log / Terminal Typewriter */}
              <div
                className="p-5 md:p-6 rounded-2xl space-y-4 shadow-lg"
                style={{
                  backgroundColor: "rgba(18, 30, 68, 0.55)",
                  border: "1px solid rgba(228, 218, 195, 0.12)",
                }}
              >
                <div className="flex items-center gap-2 pb-2 border-b border-[rgba(228,218,195,0.08)]">
                  <i className="fas fa-terminal text-xs text-[var(--orange)]" />
                  <span className="text-xs font-bold uppercase tracking-wider font-mono text-[var(--cream)]">
                    Typewriting Journal Log (Open Workshop Terminal)
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-semibold tracking-wider font-mono text-[var(--orange)]">
                      Timestamp
                    </label>
                    <input
                      type="text"
                      value={telemetry?.terminalTimestamp || ""}
                      onChange={(e) => handleUpdateTelemetry("terminalTimestamp", e.target.value)}
                      placeholder="03 OCT 21:04"
                      className="w-full mt-1.5 p-2.5 rounded-xl text-xs font-mono bg-[rgba(248,242,228,0.05)] border border-[rgba(228,218,195,0.16)] text-[var(--cream)] outline-none focus:border-[var(--blue)]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-semibold tracking-wider font-mono text-[var(--orange)]">
                      Project Tag
                    </label>
                    <input
                      type="text"
                      value={telemetry?.terminalProject || ""}
                      onChange={(e) => handleUpdateTelemetry("terminalProject", e.target.value)}
                      placeholder="site"
                      className="w-full mt-1.5 p-2.5 rounded-xl text-xs font-mono bg-[rgba(248,242,228,0.05)] border border-[rgba(228,218,195,0.16)] text-[var(--cream)] outline-none focus:border-[var(--blue)]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-semibold tracking-wider font-mono text-[var(--orange)]">
                      Tag Color (Hex / Var)
                    </label>
                    <div className="flex items-center gap-2 mt-1.5">
                      <input
                        type="color"
                        value={telemetry?.terminalColor?.startsWith("#") ? telemetry.terminalColor : "#2F63E0"}
                        onChange={(e) => handleUpdateTelemetry("terminalColor", e.target.value)}
                        className="w-8 h-8 rounded-lg border-0 bg-transparent cursor-pointer shrink-0"
                      />
                      <input
                        type="text"
                        value={telemetry?.terminalColor || ""}
                        onChange={(e) => handleUpdateTelemetry("terminalColor", e.target.value)}
                        placeholder="#2F63E0"
                        className="flex-1 p-2.5 rounded-xl text-xs font-mono bg-[rgba(248,242,228,0.05)] border border-[rgba(228,218,195,0.16)] text-[var(--cream)] outline-none focus:border-[var(--blue)]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold tracking-wider font-mono text-[var(--orange)]">
                    Typewritten Terminal Message
                  </label>
                  <input
                    type="text"
                    value={telemetry?.terminalMessage || ""}
                    onChange={(e) => handleUpdateTelemetry("terminalMessage", e.target.value)}
                    placeholder="v0.7: Vrix journal published"
                    className="w-full mt-1.5 p-2.5 rounded-xl text-xs font-mono bg-[rgba(248,242,228,0.05)] border border-[rgba(228,218,195,0.16)] text-[var(--cream)] outline-none focus:border-[var(--blue)]"
                  />
                </div>
              </div>

              {/* Group 3: Primary Counter & Trend */}
              <div
                className="p-5 md:p-6 rounded-2xl space-y-4 shadow-lg"
                style={{
                  backgroundColor: "rgba(18, 30, 68, 0.55)",
                  border: "1px solid rgba(228, 218, 195, 0.12)",
                }}
              >
                <div className="flex items-center gap-2 pb-2 border-b border-[rgba(228,218,195,0.08)]">
                  <i className="fas fa-chart-line text-xs text-[var(--orange)]" />
                  <span className="text-xs font-bold uppercase tracking-wider font-mono text-[var(--cream)]">
                    Active Deployments &amp; Counter Metric
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-semibold tracking-wider font-mono text-[var(--orange)]">
                      Metric Title
                    </label>
                    <input
                      type="text"
                      value={telemetry?.metricTitle || ""}
                      onChange={(e) => handleUpdateTelemetry("metricTitle", e.target.value)}
                      placeholder="Active Deployments · Q1"
                      className="w-full mt-1.5 p-2.5 rounded-xl text-xs font-mono bg-[rgba(248,242,228,0.05)] border border-[rgba(228,218,195,0.16)] text-[var(--cream)] outline-none focus:border-[var(--blue)]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-semibold tracking-wider font-mono text-[var(--orange)]">
                      Trend Badge
                    </label>
                    <input
                      type="text"
                      value={telemetry?.metricTrend || ""}
                      onChange={(e) => handleUpdateTelemetry("metricTrend", e.target.value)}
                      placeholder="↑ 18.4%"
                      className="w-full mt-1.5 p-2.5 rounded-xl text-xs font-mono bg-[rgba(248,242,228,0.05)] border border-[rgba(228,218,195,0.16)] text-[var(--cream)] outline-none focus:border-[var(--blue)]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-semibold tracking-wider font-mono text-[var(--orange)]">
                      Total Count Number
                    </label>
                    <input
                      type="number"
                      value={telemetry?.deployCount ?? 302}
                      onChange={(e) => handleUpdateTelemetry("deployCount", parseInt(e.target.value) || 0)}
                      placeholder="302"
                      className="w-full mt-1.5 p-2.5 rounded-xl text-xs font-mono bg-[rgba(248,242,228,0.05)] border border-[rgba(228,218,195,0.16)] text-[var(--cream)] outline-none focus:border-[var(--blue)]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-semibold tracking-wider font-mono text-[var(--orange)]">
                      Sub-label Beside Number
                    </label>
                    <input
                      type="text"
                      value={telemetry?.deployLabel || ""}
                      onChange={(e) => handleUpdateTelemetry("deployLabel", e.target.value)}
                      placeholder="total live"
                      className="w-full mt-1.5 p-2.5 rounded-xl text-xs font-mono bg-[rgba(248,242,228,0.05)] border border-[rgba(228,218,195,0.16)] text-[var(--cream)] outline-none focus:border-[var(--blue)]"
                    />
                  </div>
                </div>
              </div>

              {/* Group 4: 7-Day Activity Sparkline & Bars */}
              <div
                className="p-5 md:p-6 rounded-2xl space-y-4 shadow-lg"
                style={{
                  backgroundColor: "rgba(18, 30, 68, 0.55)",
                  border: "1px solid rgba(228, 218, 195, 0.12)",
                }}
              >
                <div className="flex items-center gap-2 pb-2 border-b border-[rgba(228,218,195,0.08)]">
                  <i className="fas fa-signal text-xs text-[var(--orange)]" />
                  <span className="text-xs font-bold uppercase tracking-wider font-mono text-[var(--cream)]">
                    7-Day Activity Sparkline &amp; Colorful Bars
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-semibold tracking-wider font-mono text-[var(--orange)]">
                      Sparkline Section Title
                    </label>
                    <input
                      type="text"
                      value={telemetry?.activityTitle || ""}
                      onChange={(e) => handleUpdateTelemetry("activityTitle", e.target.value)}
                      placeholder="7-DAY ACTIVITY · PEAK 96%"
                      className="w-full mt-1.5 p-2.5 rounded-xl text-xs font-mono bg-[rgba(248,242,228,0.05)] border border-[rgba(228,218,195,0.16)] text-[var(--cream)] outline-none focus:border-[var(--blue)]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-semibold tracking-wider font-mono text-[var(--orange)]">
                      Default Status Badge
                    </label>
                    <input
                      type="text"
                      value={telemetry?.activityStatus || ""}
                      onChange={(e) => handleUpdateTelemetry("activityStatus", e.target.value)}
                      placeholder="HEALTHY"
                      className="w-full mt-1.5 p-2.5 rounded-xl text-xs font-mono bg-[rgba(248,242,228,0.05)] border border-[rgba(228,218,195,0.16)] text-[var(--cream)] outline-none focus:border-[var(--blue)]"
                    />
                  </div>
                </div>

                {/* Individual 7 Days Bars Editor */}
                <div className="pt-2">
                  <label className="text-[10px] uppercase font-semibold tracking-wider font-mono text-[var(--orange)] block mb-2">
                    7-Day Bar Percentages &amp; Accents (M, T, W, T, F, S, S)
                  </label>
                  <div className="space-y-2">
                    {(telemetry?.bars || [
                      { day: "M", name: "Monday", val: 45, col: "#5B3FD9" },
                      { day: "T", name: "Tuesday", val: 68, col: "#3D7BF7" },
                      { day: "W", name: "Wednesday", val: 82, col: "#FF6B7B" },
                      { day: "T", name: "Thursday", val: 54, col: "#FDB347" },
                      { day: "F", name: "Friday", val: 91, col: "#10B981" },
                      { day: "S", name: "Saturday", val: 74, col: "#8B5CF6" },
                      { day: "S", name: "Sunday", val: 96, col: "#2F63E0" },
                    ]).map((bar, idx) => (
                      <div
                        key={`admin-bar-${idx}`}
                        className="flex items-center gap-2.5 p-2 rounded-xl bg-[rgba(248,242,228,0.03)] border border-[rgba(228,218,195,0.08)]"
                      >
                        <span
                          className="w-6 h-6 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0"
                          style={{ backgroundColor: bar.col || "#5B3FD9", color: "#ffffff" }}
                        >
                          {bar.day || ["M", "T", "W", "T", "F", "S", "S"][idx]}
                        </span>

                        <input
                          type="text"
                          value={bar.name || ""}
                          onChange={(e) => handleUpdateTelemetryBar(idx, "name", e.target.value)}
                          placeholder="Day Name"
                          className="w-28 p-1.5 rounded-lg text-xs font-mono bg-[rgba(248,242,228,0.05)] border border-[rgba(228,218,195,0.12)] text-[var(--cream)] outline-none"
                        />

                        <div className="flex items-center gap-2 flex-1">
                          <input
                            type="range"
                            min="10"
                            max="100"
                            value={bar.val || 50}
                            onChange={(e) => handleUpdateTelemetryBar(idx, "val", e.target.value)}
                            className="flex-1 cursor-pointer accent-[var(--blue)]"
                          />
                          <span className="font-mono text-xs w-10 text-right text-[var(--cream)] font-bold">
                            {bar.val}%
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <input
                            type="color"
                            value={bar.col?.startsWith("#") ? bar.col : "#5B3FD9"}
                            onChange={(e) => handleUpdateTelemetryBar(idx, "col", e.target.value)}
                            className="w-6 h-6 rounded border-0 bg-transparent cursor-pointer"
                          />
                          <input
                            type="text"
                            value={bar.col || ""}
                            onChange={(e) => handleUpdateTelemetryBar(idx, "col", e.target.value)}
                            placeholder="#5B3FD9"
                            className="w-20 p-1 rounded text-[11px] font-mono bg-[rgba(248,242,228,0.05)] border border-[rgba(228,218,195,0.12)] text-[var(--cream)] outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Group 5: Event Stream Console */}
              <div
                className="p-5 md:p-6 rounded-2xl space-y-4 shadow-lg"
                style={{
                  backgroundColor: "rgba(18, 30, 68, 0.55)",
                  border: "1px solid rgba(228, 218, 195, 0.12)",
                }}
              >
                <div className="flex items-center gap-2 pb-2 border-b border-[rgba(228,218,195,0.08)]">
                  <i className="fas fa-stream text-xs text-[var(--orange)]" />
                  <span className="text-xs font-bold uppercase tracking-wider font-mono text-[var(--cream)]">
                    Bottom Event Stream Console
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-semibold tracking-wider font-mono text-[var(--orange)]">
                      Event Tag
                    </label>
                    <input
                      type="text"
                      value={telemetry?.eventTag || ""}
                      onChange={(e) => handleUpdateTelemetry("eventTag", e.target.value)}
                      placeholder="DEPLOY"
                      className="w-full mt-1.5 p-2.5 rounded-xl text-xs font-mono bg-[rgba(248,242,228,0.05)] border border-[rgba(228,218,195,0.16)] text-[var(--cream)] outline-none focus:border-[var(--blue)]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-semibold tracking-wider font-mono text-[var(--orange)]">
                      Event Status Badge
                    </label>
                    <input
                      type="text"
                      value={telemetry?.eventStatus || ""}
                      onChange={(e) => handleUpdateTelemetry("eventStatus", e.target.value)}
                      placeholder="OK"
                      className="w-full mt-1.5 p-2.5 rounded-xl text-xs font-mono bg-[rgba(248,242,228,0.05)] border border-[rgba(228,218,195,0.16)] text-[var(--cream)] outline-none focus:border-[var(--blue)]"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-semibold tracking-wider font-mono text-[var(--orange)]">
                      Tag Highlight Color
                    </label>
                    <div className="flex items-center gap-2 mt-1.5">
                      <input
                        type="color"
                        value={telemetry?.eventColor?.startsWith("#") ? telemetry.eventColor : "#3D7BF7"}
                        onChange={(e) => handleUpdateTelemetry("eventColor", e.target.value)}
                        className="w-8 h-8 rounded-lg border-0 bg-transparent cursor-pointer shrink-0"
                      />
                      <input
                        type="text"
                        value={telemetry?.eventColor || ""}
                        onChange={(e) => handleUpdateTelemetry("eventColor", e.target.value)}
                        placeholder="var(--blue) or #3D7BF7"
                        className="flex-1 p-2.5 rounded-xl text-xs font-mono bg-[rgba(248,242,228,0.05)] border border-[rgba(228,218,195,0.16)] text-[var(--cream)] outline-none focus:border-[var(--blue)]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-semibold tracking-wider font-mono text-[var(--orange)]">
                    Event Stream Message
                  </label>
                  <input
                    type="text"
                    value={telemetry?.eventMessage || ""}
                    onChange={(e) => handleUpdateTelemetry("eventMessage", e.target.value)}
                    placeholder="vrix-edge-proxy online [18ms]"
                    className="w-full mt-1.5 p-2.5 rounded-xl text-xs font-mono bg-[rgba(248,242,228,0.05)] border border-[rgba(228,218,195,0.16)] text-[var(--cream)] outline-none focus:border-[var(--blue)]"
                  />
                </div>
              </div>

            </div>

            {/* Right Column: Sticky Live Card Preview */}
            <div className="lg:col-span-5 sticky top-24 space-y-4">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--orange)] font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Live Preview
                </span>
                <span className="text-[10px] font-mono text-[rgba(248,242,228,0.5)]">
                  Synchronizes in real time
                </span>
              </div>

              <div className="p-4 md:p-5 rounded-2xl bg-[rgba(11,21,48,0.65)] border border-[rgba(228,218,195,0.16)] backdrop-blur-md shadow-2xl">
                <StudioTelemetryCard
                  data={telemetry}
                  initialCount={telemetry?.deployCount || 302}
                  showFullLogs={true}
                />
              </div>

              <div className="p-3.5 rounded-xl bg-[rgba(248,242,228,0.04)] border border-[rgba(228,218,195,0.1)] text-[11px] font-mono text-[rgba(248,242,228,0.65)] leading-relaxed space-y-1.5">
                <div className="flex items-center gap-1.5 text-[var(--orange)] font-bold">
                  <i className="fas fa-info-circle text-xs" />
                  <span>Deployment Targets:</span>
                </div>
                <p>
                  • <strong>Hero Section:</strong> Desktop upper-right live card.
                </p>
                <p>
                  • <strong>How We Work / Process:</strong> Pinned flywheel telemetry interactive view.
                </p>
                <p className="text-[10px] text-[rgba(248,242,228,0.45)] pt-1">
                  Click <em>Save All Content</em> below to persist these telemetry settings to MongoDB.
                </p>
              </div>
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
