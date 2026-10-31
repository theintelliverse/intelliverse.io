"use client";

import { useState } from "react";

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
      const label = d.toLocaleDateString(undefined, { weekday: "short", day: "numeric" });
      const dateString = d.toDateString();
      trendData.push({ label, dateString, count: 0 });
    }

    contactLogs.forEach(log => {
      const logDate = new Date(log.createdAt).toDateString();
      const point = trendData.find(p => p.dateString === logDate);
      if (point) {
        point.count += 1;
      }
    });

    return trendData;
  };

  const trendData = getSubmissionTrendData();
  const maxCount = Math.max(...trendData.map(p => p.count), 5);
  const chartWidth = 500;
  const chartHeight = 120;

  const points = trendData.map((p, idx) => {
    const x = (idx / 6) * chartWidth;
    const y = chartHeight - 15 - (p.count / maxCount) * 85;
    return { x, y, count: p.count, label: p.label };
  });

  const linePath = points.length > 0
    ? `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(" ")
    : "";
  const areaPath = points.length > 0
    ? `${linePath} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`
    : "";

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

      {/* Ingestion Trend SVG Graph */}
      <div className="admin-console-card p-5 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h4
              className="text-xs font-bold flex items-center gap-2 font-mono uppercase tracking-wider"
              style={{ color: "var(--cream)" }}
            >
              <i className="fas fa-chart-line" style={{ color: "var(--blue)" }}></i>
              <span>CRM Lead Ingestion Flow (Last 7 Days)</span>
            </h4>
            <p className="text-[10px] mt-1 font-mono" style={{ color: "rgba(248, 242, 228, 0.6)" }}>
              Real-time pipeline activity from inquiries submitted via client form.
            </p>
          </div>
          <span
            className="text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold self-start sm:self-auto"
            style={{
              backgroundColor: "rgba(47, 99, 224, 0.12)",
              color: "var(--blue)",
              border: "1px solid rgba(61, 123, 247, 0.25)",
            }}
          >
            {contactLogs.length} Ingested Total
          </span>
        </div>

        <div className="relative pt-2">
          <svg className="w-full h-[130px] md:h-[150px] overflow-visible" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(47, 99, 224, 0.45)" />
                <stop offset="100%" stopColor="rgba(47, 99, 224, 0)" />
              </linearGradient>
              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#2f63e0" floodOpacity="0.6" />
              </filter>
            </defs>
            <line x1="0" y1="10" x2={chartWidth} y2="10" stroke="rgba(228, 218, 195, 0.08)" strokeDasharray="3 3" />
            <line x1="0" y1={chartHeight / 2} x2={chartWidth} y2={chartHeight / 2} stroke="rgba(228, 218, 195, 0.08)" strokeDasharray="3 3" />
            <line x1="0" y1={chartHeight - 1} x2={chartWidth} y2={chartHeight - 1} stroke="rgba(228, 218, 195, 0.12)" />

            {areaPath && <path d={areaPath} fill="url(#chartGrad)" className="animate-fade-in" />}
            {linePath && <path d={linePath} fill="none" stroke="var(--blue-deep)" strokeWidth="3" filter="url(#neonGlow)" className="animate-fade-in" />}

            {points.map((p, idx) => (
              <g key={idx}>
                <circle cx={p.x} cy={p.y} r="5" fill="var(--night)" stroke="var(--orange)" strokeWidth="2.5" className="cursor-crosshair transition hover:scale-150" />
                {p.count > 0 && (
                  <text x={p.x} y={p.y - 12} fill="var(--orange)" fontSize="10" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
                    {p.count}
                  </text>
                )}
              </g>
            ))}
          </svg>
          <div className="flex justify-between mt-3 px-0.5 text-[9px] font-bold font-mono" style={{ color: "rgba(248, 242, 228, 0.55)" }}>
            {trendData.map((p, idx) => (
              <span key={idx} className="w-12 text-center break-words">{p.label}</span>
            ))}
          </div>
        </div>
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
            className={`p-3.5 rounded-xl text-xs font-mono border transition-all ${
              googleIndexingResult.type === "success"
                ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                : googleIndexingResult.type === "info"
                  ? "bg-blue-950/40 border-blue-500/40 text-blue-300"
                  : "bg-red-950/40 border-red-500/40 text-red-300"
            }`}
          >
            <div className="flex items-start gap-2">
              <i
                className={`fas mt-0.5 ${
                  googleIndexingResult.type === "success"
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
            className={`p-3.5 rounded-xl text-xs font-mono border transition-all ${
              indexNowResult.type === "success"
                ? "bg-emerald-950/40 border-emerald-500/40 text-emerald-300"
                : "bg-red-950/40 border-red-500/40 text-red-300"
            }`}
          >
            <div className="flex items-start gap-2">
              <i
                className={`fas mt-0.5 ${
                  indexNowResult.type === "success" ? "fa-check-circle" : "fa-exclamation-triangle"
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
