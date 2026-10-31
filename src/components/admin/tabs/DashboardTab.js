"use client";

import { useState, useRef } from "react";

export default function DashboardTab({
  contactLogs,
  projects,
  caseStudies = [],
  testimonials,
  setActiveTab,
  handleAddProject,
  handleAddTestimonial,
  setSelectedLead,
  dbStatus,
  currentUser
}) {
  const [googleIndexingLoading, setGoogleIndexingLoading] = useState(false);
  const [googleIndexingResult, setGoogleIndexingResult] = useState(null);
  const [indexNowLoading, setIndexNowLoading] = useState(false);
  const [indexNowResult, setIndexNowResult] = useState(null);
  const [chartTooltip, setChartTooltip] = useState(null);
  const chartSvgRef = useRef(null);

  const handleTriggerGoogleIndexing = async () => {
    setGoogleIndexingLoading(true);
    setGoogleIndexingResult(null);
    try {
      const res = await fetch("/api/google-indexing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.success) {
        setGoogleIndexingResult({
          type: "success",
          msg: `Successfully submitted ${data.successCount}/${data.totalSubmitted} canonical pages to Google Search.`,
        });
      } else if (data.configured === false) {
        setGoogleIndexingResult({
          type: "info",
          msg: `${data.urlsToSubmit?.length || 16} URLs prepared. Add GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY in .env.local to activate instant Google Search dispatch.`,
        });
      } else {
        setGoogleIndexingResult({
          type: "error",
          msg: data.error || data.message || "Failed to submit indexing request to Google.",
        });
      }
    } catch (err) {
      setGoogleIndexingResult({
        type: "error",
        msg: `Connection error: ${err.message}`,
      });
    } finally {
      setGoogleIndexingLoading(false);
    }
  };

  const handleTriggerIndexNow = async () => {
    setIndexNowLoading(true);
    setIndexNowResult(null);
    try {
      const res = await fetch("/api/indexnow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (data.success) {
        setIndexNowResult({
          type: "success",
          msg: `Submitted ${data.submittedUrls} URLs to IndexNow network (Bing & Yandex).`,
        });
      } else {
        setIndexNowResult({
          type: "error",
          msg: data.message || "IndexNow ping failed.",
        });
      }
    } catch (err) {
      setIndexNowResult({
        type: "error",
        msg: `Connection error: ${err.message}`,
      });
    } finally {
      setIndexNowLoading(false);
    }
  };

  // --- Calculate Last 7 Days CRM Submission Trend for Chart ---
  const getSubmissionTrendData = () => {
    const trendData = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const dayLabel = d.toLocaleDateString(undefined, { weekday: "short" });
      const dateLabel = d.toLocaleDateString(undefined, { day: "numeric", month: "short" });
      const dateString = d.toDateString();
      trendData.push({ dayLabel, dateLabel, dateString, count: 0 });
    }
    contactLogs.forEach(log => {
      const logDate = new Date(log.createdAt).toDateString();
      const point = trendData.find(p => p.dateString === logDate);
      if (point) point.count += 1;
    });
    return trendData;
  };

  const trendData = getSubmissionTrendData();
  const weekTotal = trendData.reduce((s, d) => s + d.count, 0);
  const maxCount = Math.max(...trendData.map(p => p.count), 1);
  const barChartH = 120; // SVG viewbox height
  const barChartW = 560;
  const barCount = trendData.length;
  const barSlot = barChartW / barCount;
  const barW = barSlot * 0.52;
  const barGap = (barSlot - barW) / 2;

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      {/* Header Greeting */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.8)]"></span>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight font-mono uppercase" style={{ color: "var(--cream)" }}>
              Studio Console Dashboard
            </h2>
          </div>
          <p className="text-xs md:text-sm mt-1 font-mono" style={{ color: "rgba(248, 242, 228, 0.65)" }}>
            Real-time telemetry, lead pipelines, SEO search index status, and system diagnostics.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span
            className="px-3 py-1 rounded-full text-[10px] font-bold font-mono uppercase tracking-wider flex items-center gap-1.5"
            style={{
              backgroundColor: "rgba(47, 99, 224, 0.15)",
              color: "var(--blue)",
              border: "1px solid rgba(61, 123, 247, 0.3)",
            }}
          >
            <i className="fas fa-shield-alt text-[9px]"></i>
            Session: {currentUser || "Administrator"}
          </span>
        </div>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {/* Metric 1: CRM Leads */}
        <div
          onClick={() => setActiveTab("crm")}
          className="admin-console-card p-5 md:p-6 relative overflow-hidden group cursor-pointer hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          style={{
            background: "linear-gradient(145deg, rgba(18, 30, 68, 0.85), rgba(11, 21, 48, 0.95))",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--blue)] to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-widest font-mono" style={{ color: "var(--orange)" }}>CRM Leads</p>
                <span className="text-[9px] px-1.5 py-0.2 rounded font-mono font-semibold" style={{ backgroundColor: "rgba(61, 123, 247, 0.15)", color: "var(--blue)" }}>Live</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black mt-2 font-mono tracking-tight" style={{ color: "var(--cream)" }}>{contactLogs.length}</h3>
              <p className="text-[10px] mt-1 font-mono" style={{ color: "rgba(248, 242, 228, 0.55)" }}>Inquiries received</p>
            </div>
            <div className="p-3 rounded-xl border group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: "rgba(47, 99, 224, 0.15)", color: "var(--blue)", borderColor: "rgba(61, 123, 247, 0.3)" }}>
              <i className="fas fa-address-book text-base md:text-lg"></i>
            </div>
          </div>
        </div>

        {/* Metric 2: Portfolio Projects */}
        <div
          onClick={() => setActiveTab("projects")}
          className="admin-console-card p-5 md:p-6 relative overflow-hidden group cursor-pointer hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          style={{
            background: "linear-gradient(145deg, rgba(18, 30, 68, 0.85), rgba(11, 21, 48, 0.95))",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--purple)] to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-widest font-mono" style={{ color: "var(--orange)" }}>Portfolio Projects</p>
                <span className="text-[9px] px-1.5 py-0.2 rounded font-mono font-semibold" style={{ backgroundColor: "rgba(155, 114, 216, 0.15)", color: "var(--purple)" }}>Catalog</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black mt-2 font-mono tracking-tight" style={{ color: "var(--cream)" }}>{projects.length}</h3>
              <p className="text-[10px] mt-1 font-mono" style={{ color: "rgba(248, 242, 228, 0.55)" }}>Shipped architectures</p>
            </div>
            <div className="p-3 rounded-xl border group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: "rgba(155, 114, 216, 0.15)", color: "var(--purple)", borderColor: "rgba(155, 114, 216, 0.3)" }}>
              <i className="fas fa-layer-group text-base md:text-lg"></i>
            </div>
          </div>
        </div>

        {/* Metric 3: Case Studies & Specs */}
        <div
          onClick={() => setActiveTab("casestudies")}
          className="admin-console-card p-5 md:p-6 relative overflow-hidden group cursor-pointer hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          style={{
            background: "linear-gradient(145deg, rgba(18, 30, 68, 0.85), rgba(11, 21, 48, 0.95))",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--orange)] to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-widest font-mono" style={{ color: "var(--orange)" }}>Case Studies &amp; Specs</p>
                <span className="text-[9px] px-1.5 py-0.2 rounded font-mono font-semibold" style={{ backgroundColor: "rgba(253, 179, 71, 0.15)", color: "var(--orange)" }}>Deep Dive</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black mt-2 font-mono tracking-tight" style={{ color: "var(--cream)" }}>{caseStudies.length}</h3>
              <p className="text-[10px] mt-1 font-mono" style={{ color: "rgba(248, 242, 228, 0.55)" }}>Technical breakdowns</p>
            </div>
            <div className="p-3 rounded-xl border group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: "rgba(253, 179, 71, 0.15)", color: "var(--orange)", borderColor: "rgba(253, 179, 71, 0.3)" }}>
              <i className="fas fa-microchip text-base md:text-lg"></i>
            </div>
          </div>
        </div>

        {/* Metric 4: Client Reviews */}
        <div
          onClick={() => setActiveTab("testimonials")}
          className="admin-console-card p-5 md:p-6 relative overflow-hidden group cursor-pointer hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
          style={{
            background: "linear-gradient(145deg, rgba(18, 30, 68, 0.85), rgba(11, 21, 48, 0.95))",
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-bold uppercase tracking-widest font-mono" style={{ color: "var(--orange)" }}>Client Reviews</p>
                <span className="text-[9px] px-1.5 py-0.2 rounded font-mono font-semibold" style={{ backgroundColor: "rgba(16, 185, 129, 0.15)", color: "#10b981" }}>5.0 Rating</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-black mt-2 font-mono tracking-tight" style={{ color: "var(--cream)" }}>{testimonials.length}</h3>
              <p className="text-[10px] mt-1 font-mono" style={{ color: "rgba(248, 242, 228, 0.55)" }}>Verified quotes</p>
            </div>
            <div className="p-3 rounded-xl border group-hover:scale-110 transition-transform duration-300" style={{ backgroundColor: "rgba(16, 185, 129, 0.15)", color: "#10b981", borderColor: "rgba(16, 185, 129, 0.3)" }}>
              <i className="fas fa-comments text-base md:text-lg"></i>
            </div>
          </div>
        </div>
      </div>

      {/* CRM Lead Ingestion — Vertical Bar Chart */}
      <div className="admin-console-card overflow-hidden">

        {/* Card Header */}
        <div
          className="px-5 md:px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          style={{ borderBottom: "1px solid rgba(228, 218, 195, 0.08)", background: "rgba(11, 21, 48, 0.5)" }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg" style={{ backgroundColor: "rgba(47, 99, 224, 0.15)", border: "1px solid rgba(61, 123, 247, 0.25)" }}>
              <i className="fas fa-chart-bar text-xs" style={{ color: "var(--blue)" }}></i>
            </div>
            <div>
              <h4 className="text-xs font-bold font-mono uppercase tracking-wider" style={{ color: "var(--cream)" }}>
                CRM Lead Ingestion Flow
              </h4>
              <p className="text-[10px] mt-0.5 font-mono" style={{ color: "rgba(248, 242, 228, 0.5)" }}>
                7-day pipeline · client form submissions
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-[10px] font-mono px-3 py-1 rounded-full font-bold flex items-center gap-1.5"
              style={{
                backgroundColor: contactLogs.length > 0 ? "rgba(16, 185, 129, 0.12)" : "rgba(47, 99, 224, 0.12)",
                color: contactLogs.length > 0 ? "#34d399" : "var(--blue)",
                border: `1px solid ${contactLogs.length > 0 ? "rgba(16, 185, 129, 0.3)" : "rgba(61, 123, 247, 0.25)"}`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: contactLogs.length > 0 ? "#34d399" : "var(--blue)" }} />
              {contactLogs.length} All Time
            </span>
            <span
              className="text-[10px] font-mono px-3 py-1 rounded-full font-bold"
              style={{ backgroundColor: "rgba(253, 179, 71, 0.1)", color: "var(--orange)", border: "1px solid rgba(253, 179, 71, 0.2)" }}
            >
              {weekTotal} This Week
            </span>
          </div>
        </div>

        {/* Bar Chart Body */}
        <div className="px-5 md:px-6 pt-5 pb-4">
          <div className="relative" style={{ userSelect: "none" }}>

            {/* Y-axis tick labels pinned left */}
            <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-right pr-2" style={{ width: "28px" }}>
              {[maxCount, Math.ceil(maxCount / 2), 0].map((v, i) => (
                <span key={i} className="text-[9px] font-mono font-bold leading-none" style={{ color: "rgba(248, 242, 228, 0.28)" }}>{v}</span>
              ))}
            </div>

            {/* SVG bar chart */}
            <div className="ml-8">
              <svg
                ref={chartSvgRef}
                className="w-full overflow-visible"
                style={{ height: "140px" }}
                viewBox={`0 0 ${barChartW} ${barChartH}`}
                preserveAspectRatio="none"
                onMouseLeave={() => setChartTooltip(null)}
              >
                <defs>
                  <linearGradient id="barGradActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3d7bf7" stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#2f63e0" stopOpacity="0.6" />
                  </linearGradient>
                  <linearGradient id="barGradHover" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fdb347" stopOpacity="1" />
                    <stop offset="100%" stopColor="#e8920a" stopOpacity="0.7" />
                  </linearGradient>
                  <filter id="barGlow" x="-40%" y="-10%" width="180%" height="130%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="barGlowHover" x="-40%" y="-10%" width="180%" height="130%">
                    <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#fdb347" floodOpacity="0.7" />
                  </filter>
                </defs>

                {/* Horizontal grid lines */}
                {[0, 0.33, 0.66, 1].map((frac, i) => (
                  <line
                    key={i}
                    x1={0} y1={frac * (barChartH - 2)}
                    x2={barChartW} y2={frac * (barChartH - 2)}
                    stroke="rgba(228, 218, 195, 0.06)"
                    strokeDasharray={frac === 1 ? "0" : "4 6"}
                    strokeWidth={frac === 1 ? 1.5 : 1}
                  />
                ))}

                {/* Bars */}
                {trendData.map((d, idx) => {
                  const isToday = idx === trendData.length - 1;
                  const isHovered = chartTooltip?.idx === idx;
                  const barHeight = d.count > 0
                    ? Math.max(6, (d.count / maxCount) * (barChartH - 12))
                    : 0;
                  const x = idx * barSlot + barGap;
                  const y = barChartH - barHeight - 1;
                  const midX = x + barW / 2;

                  return (
                    <g key={idx}>
                      {/* Ghost bar (empty outline — always visible) */}
                      <rect
                        x={x} y={0}
                        width={barW} height={barChartH - 1}
                        rx={4} ry={4}
                        fill={isHovered ? "rgba(61, 123, 247, 0.06)" : "rgba(228, 218, 195, 0.03)"}
                        stroke={isToday ? "rgba(253, 179, 71, 0.2)" : "rgba(228, 218, 195, 0.09)"}
                        strokeWidth={isToday ? 1.5 : 1}
                        strokeDasharray={d.count === 0 ? "3 3" : "0"}
                      />

                      {/* Filled active bar */}
                      {d.count > 0 && (
                        <>
                          {/* Glow shadow */}
                          <rect
                            x={x + 2} y={y}
                            width={barW - 4} height={barHeight}
                            rx={4} ry={4}
                            fill={isHovered ? "url(#barGradHover)" : "url(#barGradActive)"}
                            filter="url(#barGlow)"
                            opacity={0.5}
                          />
                          {/* Main bar */}
                          <rect
                            x={x + 2} y={y}
                            width={barW - 4} height={barHeight}
                            rx={4} ry={4}
                            fill={isHovered ? "url(#barGradHover)" : "url(#barGradActive)"}
                            filter={isHovered ? "url(#barGlowHover)" : undefined}
                          />
                          {/* Count label above bar */}
                          <text
                            x={midX} y={y - 5}
                            fill={isHovered ? "var(--orange)" : "rgba(248, 242, 228, 0.8)"}
                            fontSize="9" textAnchor="middle" fontWeight="800" fontFamily="monospace"
                          >
                            {d.count}
                          </text>
                        </>
                      )}

                      {/* Invisible hover hit zone */}
                      <rect
                        x={x} y={0}
                        width={barW} height={barChartH}
                        fill="transparent"
                        className="cursor-crosshair"
                        onMouseEnter={(e) => {
                          const svgEl = chartSvgRef.current;
                          if (!svgEl) return;
                          const rect = svgEl.getBoundingClientRect();
                          setChartTooltip({
                            idx,
                            count: d.count,
                            label: `${d.dayLabel} · ${d.dateLabel}`,
                            x: rect.left + ((x + barW / 2) / barChartW) * rect.width,
                            y: rect.top,
                          });
                        }}
                        onMouseLeave={() => setChartTooltip(null)}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Floating tooltip */}
              {chartTooltip && (
                <div
                  className="pointer-events-none fixed z-50 px-3 py-2 rounded-xl text-[10px] font-mono font-bold"
                  style={{
                    left: `${chartTooltip.x}px`,
                    top: `${chartTooltip.y - 60}px`,
                    transform: "translateX(-50%)",
                    backgroundColor: "rgba(11, 21, 48, 0.96)",
                    border: "1px solid rgba(61, 123, 247, 0.4)",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                    color: "var(--cream)",
                    backdropFilter: "blur(12px)",
                    whiteSpace: "nowrap",
                  }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: chartTooltip.count > 0 ? "var(--orange)" : "rgba(228,218,195,0.3)" }} />
                    <span style={{ color: "rgba(248, 242, 228, 0.6)" }}>{chartTooltip.label}</span>
                    <span style={{ color: chartTooltip.count > 0 ? "var(--orange)" : "rgba(248,242,228,0.4)" }}>
                      {chartTooltip.count > 0 ? `${chartTooltip.count} lead${chartTooltip.count !== 1 ? "s" : ""}` : "No leads"}
                    </span>
                  </div>
                </div>
              )}

              {/* X-axis day labels */}
              <div
                className="flex mt-2"
                style={{ gap: "0px" }}
              >
                {trendData.map((d, idx) => {
                  const isToday = idx === trendData.length - 1;
                  return (
                    <div
                      key={idx}
                      className="text-center flex-1"
                    >
                      <div
                        className="text-[9px] font-bold font-mono"
                        style={{ color: isToday ? "var(--orange)" : "rgba(248, 242, 228, 0.38)" }}
                      >
                        {d.dayLabel}
                      </div>
                      <div
                        className="text-[8px] font-mono mt-0.5"
                        style={{ color: isToday ? "rgba(253,179,71,0.6)" : "rgba(248, 242, 228, 0.22)" }}
                      >
                        {d.dateLabel}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom divider + empty state message when no leads */}
        {weekTotal === 0 && (
          <div
            className="px-5 md:px-6 pb-4 pt-1 text-center"
            style={{ borderTop: "1px solid rgba(228, 218, 195, 0.06)" }}
          >
            <p className="text-[10px] font-mono" style={{ color: "rgba(248, 242, 228, 0.28)" }}>
              <i className="fas fa-satellite-dish mr-1.5" style={{ color: "rgba(61,123,247,0.4)" }}></i>
              Awaiting first inbound signal — bars will fill as leads arrive
            </p>
          </div>
        )}
      </div>

      {/* Dashboard Quick Actions & Recent Activity split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Quick Actions Panel */}
          <div className="admin-console-card p-5 md:p-6 space-y-4">
            <h4
              className="text-xs font-bold flex items-center gap-2 pb-3 font-mono uppercase tracking-wider"
              style={{
                color: "var(--cream)",
                borderBottom: "1px solid rgba(228, 218, 195, 0.1)",
              }}
            >
              <i className="fas fa-bolt" style={{ color: "var(--orange)" }}></i>
              <span>Quick Studio Actions</span>
            </h4>
            <div className="space-y-2.5 text-xs">
              <button
                onClick={() => {
                  setActiveTab("projects");
                  handleAddProject();
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-xl transition duration-300 cursor-pointer font-bold active:scale-[0.99] font-mono group"
                style={{
                  backgroundColor: "rgba(248, 242, 228, 0.04)",
                  border: "1px solid rgba(228, 218, 195, 0.12)",
                  color: "var(--cream)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(47, 99, 224, 0.15)";
                  e.currentTarget.style.borderColor = "var(--blue)";
                  e.currentTarget.style.color = "var(--cream)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(248, 242, 228, 0.04)";
                  e.currentTarget.style.borderColor = "rgba(228, 218, 195, 0.12)";
                  e.currentTarget.style.color = "var(--cream)";
                }}
              >
                <span className="flex items-center gap-2">
                  <i className="fas fa-plus text-[10px]" style={{ color: "var(--blue)" }}></i>
                  <span>Add Portfolio Entry</span>
                </span>
                <i className="fas fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform" style={{ color: "var(--orange)" }}></i>
              </button>

              <button
                onClick={() => {
                  setActiveTab("casestudies");
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-xl transition duration-300 cursor-pointer font-bold active:scale-[0.99] font-mono group"
                style={{
                  backgroundColor: "rgba(248, 242, 228, 0.04)",
                  border: "1px solid rgba(228, 218, 195, 0.12)",
                  color: "var(--cream)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(253, 179, 71, 0.15)";
                  e.currentTarget.style.borderColor = "var(--orange)";
                  e.currentTarget.style.color = "var(--cream)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(248, 242, 228, 0.04)";
                  e.currentTarget.style.borderColor = "rgba(228, 218, 195, 0.12)";
                  e.currentTarget.style.color = "var(--cream)";
                }}
              >
                <span className="flex items-center gap-2">
                  <i className="fas fa-microchip text-[10px]" style={{ color: "var(--orange)" }}></i>
                  <span>Manage Case Studies</span>
                </span>
                <i className="fas fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform" style={{ color: "var(--orange)" }}></i>
              </button>

              <button
                onClick={() => {
                  setActiveTab("testimonials");
                  handleAddTestimonial();
                }}
                className="w-full flex items-center justify-between p-3.5 rounded-xl transition duration-300 cursor-pointer font-bold active:scale-[0.99] font-mono group"
                style={{
                  backgroundColor: "rgba(248, 242, 228, 0.04)",
                  border: "1px solid rgba(228, 218, 195, 0.12)",
                  color: "var(--cream)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(155, 114, 216, 0.15)";
                  e.currentTarget.style.borderColor = "var(--purple)";
                  e.currentTarget.style.color = "var(--cream)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(248, 242, 228, 0.04)";
                  e.currentTarget.style.borderColor = "rgba(228, 218, 195, 0.12)";
                  e.currentTarget.style.color = "var(--cream)";
                }}
              >
                <span className="flex items-center gap-2">
                  <i className="fas fa-quote-left text-[10px]" style={{ color: "var(--purple)" }}></i>
                  <span>Add Testimonial Quote</span>
                </span>
                <i className="fas fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform" style={{ color: "var(--orange)" }}></i>
              </button>

              <button
                onClick={() => setActiveTab("settings")}
                className="w-full flex items-center justify-between p-3.5 rounded-xl transition duration-300 cursor-pointer font-bold active:scale-[0.99] font-mono group"
                style={{
                  backgroundColor: "rgba(248, 242, 228, 0.04)",
                  border: "1px solid rgba(228, 218, 195, 0.12)",
                  color: "var(--cream)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(16, 185, 129, 0.15)";
                  e.currentTarget.style.borderColor = "#10b981";
                  e.currentTarget.style.color = "var(--cream)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(248, 242, 228, 0.04)";
                  e.currentTarget.style.borderColor = "rgba(228, 218, 195, 0.12)";
                  e.currentTarget.style.color = "var(--cream)";
                }}
              >
                <span className="flex items-center gap-2">
                  <i className="fas fa-user-shield text-[10px]" style={{ color: "#10b981" }}></i>
                  <span>Security &amp; Admins</span>
                </span>
                <i className="fas fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform" style={{ color: "var(--orange)" }}></i>
              </button>
            </div>
          </div>

          {/* Recent Submissions Activity Feed */}
          <div className="lg:col-span-2 admin-console-card p-5 md:p-6 space-y-4">
            <div
              className="flex justify-between items-center pb-3"
              style={{ borderBottom: "1px solid rgba(228, 218, 195, 0.1)" }}
            >
              <h4
                className="text-xs font-bold flex items-center gap-2 font-mono uppercase tracking-wider"
                style={{ color: "var(--cream)" }}
              >
                <i className="fas fa-history" style={{ color: "var(--orange)" }}></i>
                <span>Recent Form Submissions</span>
              </h4>
              <button
                onClick={() => setActiveTab("crm")}
                className="text-[10px] font-bold uppercase tracking-wider font-mono hover:underline flex items-center gap-1 cursor-pointer"
                style={{ color: "var(--blue)" }}
              >
                <span>View All ({contactLogs.length})</span>
                <i className="fas fa-arrow-right text-[9px]"></i>
              </button>
            </div>

            <div className="space-y-3">
              {contactLogs.slice(0, 3).map((log, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedLead(log)}
                  className="p-3.5 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:border-[var(--blue)] active:scale-[0.99] group"
                  style={{
                    backgroundColor: "rgba(11, 21, 48, 0.8)",
                    border: "1px solid rgba(228, 218, 195, 0.12)",
                  }}
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs truncate max-w-[140px]" style={{ color: "var(--cream)" }}>{log.name}</span>
                      <span className="text-[10px] truncate max-w-[180px] font-mono" style={{ color: "var(--orange)" }}>&lt;{log.email}&gt;</span>
                    </div>
                    <p className="text-[11px] truncate mt-1 max-w-[250px] md:max-w-md font-sans" style={{ color: "rgba(248, 242, 228, 0.75)" }}>{log.message}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-[9px] block font-mono" style={{ color: "rgba(248, 242, 228, 0.5)" }}>{new Date(log.createdAt).toLocaleDateString()}</span>
                    <span
                      className="text-[9px] px-2.5 py-0.5 rounded-full font-bold mt-1 inline-block font-mono"
                      style={{
                        backgroundColor: "rgba(47, 99, 224, 0.15)",
                        color: "var(--blue)",
                        border: "1px solid rgba(61, 123, 247, 0.3)",
                      }}
                    >
                      View Lead →
                    </span>
                  </div>
                </div>
              ))}

              {contactLogs.length === 0 && (
                <p className="text-center text-xs py-8 italic font-mono" style={{ color: "rgba(248, 242, 228, 0.5)" }}>No recent activity received yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Search Engine Page Indexing Controls */}
        <div className="admin-console-card p-5 md:p-6 space-y-4">
          <div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-3 gap-2"
            style={{ borderBottom: "1px solid rgba(228, 218, 195, 0.1)" }}
          >
            <div className="flex items-center gap-2">
              <i className="fab fa-google font-bold" style={{ color: "var(--blue)" }}></i>
              <h4
                className="text-xs font-bold font-mono uppercase tracking-wider"
                style={{ color: "var(--cream)" }}
              >
                Search Engine Page Indexing (Google &amp; IndexNow)
              </h4>
            </div>
            <span
              className="text-[10px] px-2.5 py-0.5 rounded-full font-bold font-mono self-start sm:self-auto"
              style={{
                backgroundColor: "rgba(61, 123, 247, 0.15)",
                color: "var(--blue)",
                border: "1px solid rgba(61, 123, 247, 0.3)",
              }}
            >
              Google Indexing API v1.0
            </span>
          </div>

          <p className="text-xs font-mono" style={{ color: "rgba(248, 242, 228, 0.7)" }}>
            Publish canonical URLs to Googlebot and Bingbot instantly upon deploying case studies, blogs, or content edits.
          </p>

          {/* Feedback alerts */}
          {googleIndexingResult && (
            <div
              className={`p-3.5 rounded-xl text-xs font-mono border transition-all ${googleIndexingResult.type === "success"
                  ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                  : googleIndexingResult.type === "info"
                    ? "bg-blue-950/40 border-blue-500/40 text-blue-300"
                    : "bg-red-950/40 border-red-500/40 text-red-300"
                }`}
            >
              <div className="flex items-start gap-2">
                <i
                  className={`fas mt-0.5 ${googleIndexingResult.type === "success"
                      ? "fa-check-circle"
                      : googleIndexingResult.type === "info"
                        ? "fa-info-circle"
                        : "fa-exclamation-triangle"
                    }`}
                ></i>
                <span>{googleIndexingResult.msg}</span>
              </div>
            </div>
          )}

          {indexNowResult && (
            <div
              className={`p-3.5 rounded-xl text-xs font-mono border transition-all ${indexNowResult.type === "success"
                  ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                  : "bg-red-950/40 border-red-500/40 text-red-300"
                }`}
            >
              <div className="flex items-start gap-2">
                <i
                  className={`fas mt-0.5 ${indexNowResult.type === "success" ? "fa-check-circle" : "fa-exclamation-triangle"
                    }`}
                ></i>
                <span>{indexNowResult.msg}</span>
              </div>
            </div>
          )}

          {/* Action Buttons & Status */}
          <div className="flex flex-wrap gap-3 pt-1">
            <button
              type="button"
              onClick={handleTriggerGoogleIndexing}
              disabled={googleIndexingLoading}
              className="px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 active:scale-95"
              style={{
                backgroundColor: "var(--blue-deep)",
                color: "var(--cream)",
                border: "1px solid rgba(228, 218, 195, 0.2)",
                boxShadow: "0 4px 14px rgba(47, 99, 224, 0.35)",
              }}
            >
              <i className={`fab fa-google ${googleIndexingLoading ? "fa-spin" : ""}`}></i>
              <span>{googleIndexingLoading ? "Publishing to Google Search..." : "Submit All Pages to Google"}</span>
            </button>

            <button
              type="button"
              onClick={handleTriggerIndexNow}
              disabled={indexNowLoading}
              className="px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50 active:scale-95"
              style={{
                backgroundColor: "rgba(248, 242, 228, 0.08)",
                color: "var(--cream)",
                border: "1px solid rgba(228, 218, 195, 0.16)",
              }}
            >
              <i className={`fas fa-bolt ${indexNowLoading ? "fa-spin" : ""}`} style={{ color: "var(--orange)" }}></i>
              <span>{indexNowLoading ? "Pinging IndexNow..." : "Submit to Bing &amp; Yandex"}</span>
            </button>

            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl text-xs font-bold font-mono transition-all flex items-center gap-2 cursor-pointer ml-auto"
              style={{
                backgroundColor: "transparent",
                color: "rgba(248, 242, 228, 0.7)",
                border: "1px solid rgba(228, 218, 195, 0.14)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--cream)";
                e.currentTarget.style.borderColor = "var(--blue)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(248, 242, 228, 0.7)";
                e.currentTarget.style.borderColor = "rgba(228, 218, 195, 0.14)";
              }}
            >
              <i className="fas fa-external-link-alt text-[10px]"></i>
              <span>View sitemap.xml ↗</span>
            </a>
          </div>
        </div>

        {/* Quick Diagnostic Detail */}
        <div className="admin-console-card p-5 md:p-6 space-y-4">
          <h4
            className="text-xs font-bold flex items-center gap-2 pb-3 font-mono uppercase tracking-wider"
            style={{
              color: "var(--cream)",
              borderBottom: "1px solid rgba(228, 218, 195, 0.1)",
            }}
          >
            <i className="fas fa-server" style={{ color: "var(--orange)" }}></i>
            <span>Database &amp; Engine Telemetry</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div
              className="p-3.5 rounded-xl flex items-center justify-between"
              style={{
                backgroundColor: "rgba(11, 21, 48, 0.8)",
                border: "1px solid rgba(228, 218, 195, 0.1)",
              }}
            >
              <span className="text-[10px] uppercase font-bold" style={{ color: "rgba(248, 242, 228, 0.5)" }}>Database:</span>
              <span className={`font-bold flex items-center gap-1.5 ${dbStatus === "Connected" ? "text-emerald-400" : "text-amber-400"}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${dbStatus === "Connected" ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`}></span>
                {dbStatus === "Connected" ? "MongoDB Live" : "Memory Fallback"}
              </span>
            </div>

            <div
              className="p-3.5 rounded-xl flex items-center justify-between"
              style={{
                backgroundColor: "rgba(11, 21, 48, 0.8)",
                border: "1px solid rgba(228, 218, 195, 0.1)",
              }}
            >
              <span className="text-[10px] uppercase font-bold" style={{ color: "rgba(248, 242, 228, 0.5)" }}>Runtime:</span>
              <span className="font-bold uppercase" style={{ color: "var(--cream)" }}>Next.js 16 Edge</span>
            </div>

            <div
              className="p-3.5 rounded-xl flex items-center justify-between"
              style={{
                backgroundColor: "rgba(11, 21, 48, 0.8)",
                border: "1px solid rgba(228, 218, 195, 0.1)",
              }}
            >
              <span className="text-[10px] uppercase font-bold" style={{ color: "rgba(248, 242, 228, 0.5)" }}>Cluster Host:</span>
              <span className="font-bold truncate max-w-[140px]" style={{ color: "var(--blue)" }} title="MongoDB Atlas">
                {dbStatus === "Connected" ? "Atlas Primary" : "Local Mock"}
              </span>
            </div>

            <div
              className="p-3.5 rounded-xl flex items-center justify-between"
              style={{
                backgroundColor: "rgba(11, 21, 48, 0.8)",
                border: "1px solid rgba(228, 218, 195, 0.1)",
              }}
            >
              <span className="text-[10px] uppercase font-bold" style={{ color: "rgba(248, 242, 228, 0.5)" }}>Active Admin:</span>
              <span className="font-bold" style={{ color: "var(--orange)" }}>{currentUser}</span>
            </div>
          </div>
        </div>
      </div>
      );
}
