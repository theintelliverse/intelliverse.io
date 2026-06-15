"use client";

export default function DashboardTab({
  contactLogs,
  projects,
  testimonials,
  setActiveTab,
  handleAddProject,
  handleAddTestimonial,
  setSelectedLead,
  dbStatus,
  currentUser
}) {
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
      <div>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white font-mono uppercase">Dashboard Overview</h2>
        <p className="text-xs md:text-sm text-gray-400 mt-1">Real-time status metrics and statistics summary.</p>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Metric 1 */}
        <div className="bg-gray-900/30 border border-white/5 hover:border-blue-500/25 p-5 md:p-6 rounded-2xl backdrop-blur-sm hover:shadow-[0_0_30px_rgba(59,102,241,0.05)] hover:bg-gray-900/50 transition-all duration-300 relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">Submissions (CRM Leads)</p>
              <h3 className="text-2xl md:text-3xl font-black text-white mt-2 font-mono">{contactLogs.length}</h3>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/15 group-hover:scale-105 transition-transform duration-300 shadow-inner">
              <i className="fas fa-address-book text-base md:text-lg"></i>
            </div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-gray-900/30 border border-white/5 hover:border-purple-500/25 p-5 md:p-6 rounded-2xl backdrop-blur-sm hover:shadow-[0_0_30px_rgba(168,85,247,0.05)] hover:bg-gray-900/50 transition-all duration-300 relative overflow-hidden group">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">Worked Projects</p>
              <h3 className="text-2xl md:text-3xl font-black text-white mt-2 font-mono">{projects.length}</h3>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/15 group-hover:scale-105 transition-transform duration-300 shadow-inner">
              <i className="fas fa-briefcase text-base md:text-lg"></i>
            </div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-gray-900/30 border border-white/5 hover:border-emerald-500/25 p-5 md:p-6 rounded-2xl backdrop-blur-sm hover:shadow-[0_0_30px_rgba(16,185,129,0.05)] hover:bg-gray-900/50 transition-all duration-300 relative overflow-hidden group sm:col-span-2 lg:col-span-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">Testimonial Quotes</p>
              <h3 className="text-2xl md:text-3xl font-black text-white mt-2 font-mono">{testimonials.length}</h3>
            </div>
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/15 group-hover:scale-105 transition-transform duration-300 shadow-inner">
              <i className="fas fa-comments text-base md:text-lg"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Ingestion Trend SVG Graph */}
      <div className="bg-gray-900/30 border border-white/5 hover:border-blue-500/15 rounded-2xl p-5 md:p-6 backdrop-blur-sm transition-all duration-500 space-y-4">
        <div>
          <h4 className="text-xs font-bold text-white flex items-center gap-2 font-mono uppercase tracking-wider">
            <i className="fas fa-chart-line text-blue-400"></i>
            <span>CRM Lead Ingestion Flow (Last 7 Days)</span>
          </h4>
          <p className="text-[10px] text-gray-400 mt-1">Timeline activity based on form submissions.</p>
        </div>

        <div className="relative pt-2">
          <svg className="w-full h-[130px] md:h-[150px] overflow-visible" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
                <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
              </linearGradient>
              {/* SVG filter definition for a neon shadow glow */}
              <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#3b82f6" floodOpacity="0.45" />
              </filter>
            </defs>
            {/* Grid helper lines */}
            <line x1="0" y1="10" x2={chartWidth} y2="10" stroke="#1e293b" strokeDasharray="3 3" />
            <line x1="0" y1={chartHeight / 2} x2={chartWidth} y2={chartHeight / 2} stroke="#1e293b" strokeDasharray="3 3" />
            <line x1="0" y1={chartHeight - 1} x2={chartWidth} y2={chartHeight - 1} stroke="rgba(255,255,255,0.06)" />

            {/* Glowing Area Fill */}
            {areaPath && <path d={areaPath} fill="url(#chartGrad)" className="animate-fade-in" />}

            {/* Connection Line */}
            {linePath && <path d={linePath} fill="none" stroke="#3b82f6" strokeWidth="2.5" filter="url(#neonGlow)" className="animate-fade-in" />}

            {/* Dots / Interactive counts */}
            {points.map((p, idx) => (
              <g key={idx}>
                <circle cx={p.x} cy={p.y} r="4.5" fill="#090514" stroke="#60a5fa" strokeWidth="2" className="cursor-crosshair transition hover:scale-125" />
                {p.count > 0 && (
                  <text x={p.x} y={p.y - 12} fill="#93c5fd" fontSize="9" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
                    {p.count}
                  </text>
                )}
              </g>
            ))}
          </svg>
          {/* Horizontal Labels */}
          <div className="flex justify-between mt-3 px-0.5 text-[9px] text-gray-500 font-bold font-mono">
            {trendData.map((p, idx) => (
              <span key={idx} className="w-12 text-center break-words">{p.label}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Dashboard Quick Actions & Recent Activity split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        {/* Quick Actions Panel */}
        <div className="bg-gray-900/30 border border-white/5 rounded-2xl p-5 md:p-6 backdrop-blur-sm space-y-4">
          <h4 className="text-xs font-bold text-white flex items-center gap-2 pb-3 border-b border-white/5 font-mono uppercase tracking-wider">
            <i className="fas fa-bolt text-amber-400"></i>
            <span>Quick Tasks</span>
          </h4>
          <div className="space-y-2 text-xs">
            <button
              onClick={() => {
                setActiveTab("projects");
                handleAddProject();
              }}
              className="w-full flex items-center justify-between p-3.5 bg-gray-950/40 hover:bg-blue-600/10 border border-white/5 hover:border-blue-500/20 text-gray-300 hover:text-blue-400 rounded-xl transition duration-300 cursor-pointer font-bold active:scale-[0.99]"
            >
              <span>Add Portfolio Entry</span>
              <i className="fas fa-plus text-[10px]"></i>
            </button>
            <button
              onClick={() => {
                setActiveTab("testimonials");
                handleAddTestimonial();
              }}
              className="w-full flex items-center justify-between p-3.5 bg-gray-950/40 hover:bg-purple-600/10 border border-white/5 hover:border-purple-500/20 text-gray-300 hover:text-purple-400 rounded-xl transition duration-300 cursor-pointer font-bold active:scale-[0.99]"
            >
              <span>Add Testimonial Quote</span>
              <i className="fas fa-plus text-[10px]"></i>
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className="w-full flex items-center justify-between p-3.5 bg-gray-950/40 hover:bg-emerald-600/10 border border-white/5 hover:border-emerald-500/20 text-gray-300 hover:text-emerald-400 rounded-xl transition duration-300 cursor-pointer font-bold active:scale-[0.99]"
            >
              <span>Register Administrator</span>
              <i className="fas fa-user-plus text-[10px]"></i>
            </button>
          </div>
        </div>

        {/* Recent Submissions Activity Feed */}
        <div className="lg:col-span-2 bg-gray-900/30 border border-white/5 rounded-2xl p-5 md:p-6 backdrop-blur-sm space-y-4">
          <div className="flex justify-between items-center pb-3 border-b border-white/5">
            <h4 className="text-xs font-bold text-white flex items-center gap-2 font-mono uppercase tracking-wider">
              <i className="fas fa-history text-purple-400"></i>
              <span>Recent Activity Feed</span>
            </h4>
            <button
              onClick={() => setActiveTab("crm")}
              className="text-[10px] text-blue-400 hover:text-blue-300 hover:underline font-bold uppercase tracking-wider"
            >
              View All Leads
            </button>
          </div>

          <div className="space-y-3">
            {contactLogs.slice(0, 3).map((log, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedLead(log);
                }}
                className="p-3.5 bg-gray-950/40 hover:bg-gray-950/80 border border-white/5 hover:border-gray-800 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition duration-300 active:scale-[0.99]"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-xs truncate max-w-[120px]">{log.name}</span>
                    <span className="text-[9px] text-gray-500 truncate max-w-[150px] font-mono">&lt;{log.email}&gt;</span>
                  </div>
                  <p className="text-[11px] text-gray-400 truncate mt-1 max-w-[250px] md:max-w-md">{log.message}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[9px] text-gray-500 block font-mono">{new Date(log.createdAt).toLocaleDateString()}</span>
                  <span className="text-[9px] px-2 py-0.5 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-full font-bold mt-1 inline-block">
                    New Lead
                  </span>
                </div>
              </div>
            ))}

            {contactLogs.length === 0 && (
              <p className="text-center text-xs text-gray-500 py-8 italic">No recent activity received.</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Diagnostic Detail */}
      <div className="bg-gray-900/30 border border-white/5 rounded-2xl p-5 md:p-6 backdrop-blur-sm space-y-4">
        <h4 className="text-xs font-bold text-white flex items-center gap-2 pb-3 border-b border-white/5 font-mono uppercase tracking-wider">
          <i className="fas fa-server text-gray-500"></i>
          <span>Database Connection Diagnostics</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="flex justify-between items-center p-3.5 bg-gray-950/40 border border-white/5 rounded-xl gap-2 hover:border-gray-850 transition duration-300">
            <span className="text-gray-500 text-[10px] uppercase font-bold">Database:</span>
            <span className={`font-bold ${dbStatus === "Connected" ? "text-green-400" : "text-amber-500"}`}>{dbStatus}</span>
          </div>
          <div className="flex justify-between items-center p-3.5 bg-gray-950/40 border border-white/5 rounded-xl gap-2 hover:border-gray-850 transition duration-300">
            <span className="text-gray-500 text-[10px] uppercase font-bold">Node Env:</span>
            <span className="font-bold text-white capitalize">{process.env.NODE_ENV}</span>
          </div>
          <div className="flex justify-between items-center p-3.5 bg-gray-950/40 border border-white/5 rounded-xl gap-2 hover:border-gray-850 transition duration-300">
            <span className="text-gray-500 text-[10px] uppercase font-bold">Engine Host:</span>
            <span className="font-bold text-blue-400 overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px] text-right" title="MongoDB Cluster">
              {dbStatus === "Connected" ? "cluster0.qq3gxq0.mongodb.net" : "Memory Cache"}
            </span>
          </div>
          <div className="flex justify-between items-center p-3.5 bg-gray-950/40 border border-white/5 rounded-xl gap-2 hover:border-gray-850 transition duration-300">
            <span className="text-gray-500 text-[10px] uppercase font-bold">Active Admin:</span>
            <span className="font-bold text-white">{currentUser}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
