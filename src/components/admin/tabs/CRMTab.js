"use client";

import { useState, useMemo } from "react";

const STATUS_CONFIG = {
  new:        { label: "New",        color: "#34d399", bg: "rgba(16, 185, 129, 0.12)", border: "rgba(16, 185, 129, 0.3)",  icon: "fa-inbox" },
  contacted:  { label: "Contacted",  color: "var(--blue)", bg: "rgba(47, 99, 224, 0.12)", border: "rgba(61, 123, 247, 0.3)",   icon: "fa-paper-plane" },
  qualified:  { label: "Qualified",  color: "var(--orange)", bg: "rgba(253, 179, 71, 0.12)", border: "rgba(253, 179, 71, 0.3)",  icon: "fa-star" },
  closed:     { label: "Closed",     color: "rgba(248, 242, 228, 0.4)", bg: "rgba(248, 242, 228, 0.05)", border: "rgba(228, 218, 195, 0.15)", icon: "fa-check-circle" },
};

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "name",   label: "Name A–Z" },
];

export default function CRMTab({ contactLogs, setSelectedLead, handleDeleteLead }) {
  const [searchTerm, setSearchTerm]   = useState("");
  const [copiedId,   setCopiedId]     = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy]           = useState("newest");
  const [leadStatuses, setLeadStatuses] = useState({});

  // Derive status for a lead (persisted locally per session)
  const getStatus = (log) => leadStatuses[log._id || log.email] || "new";

  const setStatus = (log, status) => {
    const key = log._id || log.email;
    setLeadStatuses(prev => ({ ...prev, [key]: status }));
  };

  // Compute stats
  const stats = useMemo(() => {
    const total  = contactLogs.length;
    const today  = contactLogs.filter(l => new Date(l.createdAt).toDateString() === new Date().toDateString()).length;
    const week   = contactLogs.filter(l => (Date.now() - new Date(l.createdAt)) < 7 * 86400000).length;
    const uniq   = new Set(contactLogs.map(l => l.email?.toLowerCase())).size;
    return { total, today, week, uniq };
  }, [contactLogs]);

  // Filter + sort
  const filteredLogs = useMemo(() => {
    let list = [...contactLogs];
    // status filter
    if (filterStatus !== "all") {
      list = list.filter(l => getStatus(l) === filterStatus);
    }
    // search
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(l =>
        (l.name  && l.name.toLowerCase().includes(q))  ||
        (l.email && l.email.toLowerCase().includes(q)) ||
        (l.message && l.message.toLowerCase().includes(q))
      );
    }
    // sort
    if (sortBy === "newest") list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    if (sortBy === "oldest") list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    if (sortBy === "name")   list.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    return list;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactLogs, searchTerm, filterStatus, sortBy, leadStatuses]);

  const handleCopyEmail = (e, email, id) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const timeAgo = (dateStr) => {
    const diff  = Date.now() - new Date(dateStr);
    const mins  = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days  = Math.floor(diff / 86400000);
    if (days > 0)  return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (mins > 0)  return `${mins}m ago`;
    return "Just now";
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">

      {/* ── Page Header ────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: "var(--blue)", boxShadow: "0 0 10px rgba(61,123,247,0.8)" }} />
            <h2 className="text-xl md:text-2xl font-black font-mono uppercase tracking-tight" style={{ color: "var(--cream)" }}>
              CRM Pipeline
            </h2>
          </div>
          <p className="text-xs font-mono" style={{ color: "rgba(248, 242, 228, 0.55)" }}>
            Inbound client inquiries · manage, qualify, and close leads
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-full text-[10px] font-bold font-mono flex items-center gap-1.5" style={{ backgroundColor: "rgba(47, 99, 224, 0.12)", color: "var(--blue)", border: "1px solid rgba(61,123,247,0.25)" }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: "var(--blue)" }} />
            {contactLogs.length} Leads Total
          </span>
        </div>
      </div>

      {/* ── Stats Strip ────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total Leads",    value: stats.total, icon: "fa-inbox",         color: "var(--blue)" },
          { label: "This Week",      value: stats.week,  icon: "fa-calendar-week", color: "var(--orange)" },
          { label: "Today",          value: stats.today, icon: "fa-clock",         color: "#34d399" },
          { label: "Unique Clients", value: stats.uniq,  icon: "fa-at",            color: "var(--purple, #9b72d8)" },
        ].map((s, i) => (
          <div
            key={i}
            className="admin-console-card p-4 flex items-center gap-3"
          >
            <div className="p-2 rounded-xl shrink-0" style={{ backgroundColor: `color-mix(in srgb, ${s.color} 12%, transparent)`, border: `1px solid color-mix(in srgb, ${s.color} 28%, transparent)` }}>
              <i className={`fas ${s.icon} text-sm`} style={{ color: s.color }} />
            </div>
            <div>
              <div className="text-xl font-black font-mono leading-none" style={{ color: "var(--cream)" }}>{s.value}</div>
              <div className="text-[9px] font-mono uppercase tracking-wider mt-0.5" style={{ color: "rgba(248, 242, 228, 0.45)" }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Main Table Card ────────────────────────────── */}
      <div className="admin-console-card overflow-hidden">

        {/* Toolbar */}
        <div
          className="px-4 md:px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
          style={{ borderBottom: "1px solid rgba(228, 218, 195, 0.1)", backgroundColor: "rgba(11, 21, 48, 0.6)" }}
        >
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-xs" style={{ color: "rgba(248, 242, 228, 0.35)" }} />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="Search name, email, message..."
              className="admin-input-field pl-9 pr-8 text-xs font-mono w-full"
            />
            {searchTerm && (
              <button type="button" onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs cursor-pointer" style={{ color: "rgba(248,242,228,0.5)" }}>✕</button>
            )}
          </div>

          {/* Controls Row */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Sort */}
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="admin-input-field text-[10px] font-mono py-1.5 px-3 cursor-pointer"
              style={{ width: "auto" }}
            >
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            {/* Result count */}
            <span className="text-[10px] font-mono shrink-0" style={{ color: "rgba(248, 242, 228, 0.45)" }}>
              {filteredLogs.length} / {contactLogs.length}
            </span>
          </div>
        </div>

        {/* Status filter pills */}
        <div className="px-4 md:px-5 py-3 flex items-center gap-2 overflow-x-auto scrollbar-none" style={{ borderBottom: "1px solid rgba(228, 218, 195, 0.07)" }}>
          {[
            { value: "all", label: "All Leads", count: contactLogs.length },
            ...Object.entries(STATUS_CONFIG).map(([k, v]) => ({
              value: k,
              label: v.label,
              count: contactLogs.filter(l => getStatus(l) === k).length,
              color: v.color,
            })),
          ].map(pill => {
            const isActive = filterStatus === pill.value;
            return (
              <button
                key={pill.value}
                onClick={() => setFilterStatus(pill.value)}
                className="px-3 py-1.5 rounded-xl text-[10px] font-bold font-mono flex items-center gap-1.5 transition shrink-0 cursor-pointer"
                style={{
                  backgroundColor: isActive ? (pill.color ? `color-mix(in srgb, ${pill.color} 18%, transparent)` : "var(--blue-deep)") : "transparent",
                  color: isActive ? (pill.color || "var(--cream)") : "rgba(248, 242, 228, 0.55)",
                  border: isActive ? `1px solid ${pill.color || "rgba(61,123,247,0.4)"}` : "1px solid transparent",
                }}
              >
                <span>{pill.label}</span>
                <span className="px-1.5 py-0.5 rounded-full text-[8px] font-black" style={{ backgroundColor: "rgba(248,242,228,0.08)" }}>{pill.count}</span>
              </button>
            );
          })}
        </div>

        {/* Lead Feed */}
        <div className="p-4 md:p-5 space-y-3 max-h-[62vh] overflow-y-auto scrollbar-none">

          {filteredLogs.length === 0 && (
            <div className="text-center py-16">
              <i className="fas fa-inbox text-4xl mb-3 block" style={{ color: "rgba(248, 242, 228, 0.1)" }} />
              <p className="text-xs font-mono" style={{ color: "rgba(248, 242, 228, 0.4)" }}>
                {searchTerm ? `No leads matching "${searchTerm}"` : filterStatus !== "all" ? `No ${filterStatus} leads yet.` : "No inbound leads yet."}
              </p>
            </div>
          )}

          {filteredLogs.map((log, index) => {
            const id       = log._id || index;
            const isCopied = copiedId === id;
            const status   = getStatus(log);
            const sc       = STATUS_CONFIG[status];
            const isNew    = (Date.now() - new Date(log.createdAt)) < 24 * 3600000;

            return (
              <div
                key={id}
                className="rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer group"
                style={{ background: "rgba(11, 21, 48, 0.75)", border: "1px solid rgba(228, 218, 195, 0.1)" }}
                onClick={() => setSelectedLead(log)}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(61, 123, 247, 0.35)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(228, 218, 195, 0.1)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                {/* Card Top Bar */}
                <div className="px-4 py-3 flex items-center justify-between gap-2" style={{ borderBottom: "1px solid rgba(228, 218, 195, 0.07)" }}>
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm font-mono shrink-0" style={{ background: "rgba(61, 123, 247, 0.15)", border: "1px solid rgba(61, 123, 247, 0.25)", color: "var(--blue)" }}>
                      {(log.name || "?").charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-black text-sm font-mono" style={{ color: "var(--cream)" }}>{log.name || "Unknown"}</span>
                        {isNew && (
                          <span className="text-[8px] font-bold font-mono px-1.5 py-0.5 rounded-full uppercase tracking-wider shrink-0" style={{ background: "rgba(16, 185, 129, 0.2)", color: "#34d399", border: "1px solid rgba(16, 185, 129, 0.3)" }}>New</span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono block truncate" style={{ color: "var(--orange)" }}>{log.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Time */}
                    <span className="text-[9px] font-mono hidden sm:block" style={{ color: "rgba(248,242,228,0.35)" }}>{timeAgo(log.createdAt)}</span>
                    {/* Status Badge */}
                    <span className="text-[9px] font-bold font-mono px-2 py-1 rounded-lg flex items-center gap-1 shrink-0" style={{ backgroundColor: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>
                      <i className={`fas ${sc.icon} text-[8px]`} />
                      {sc.label}
                    </span>
                  </div>
                </div>

                {/* Message Preview */}
                <div className="px-4 py-3">
                  <p className="text-xs font-sans leading-relaxed line-clamp-2" style={{ color: "rgba(248, 242, 228, 0.75)" }}>{log.message}</p>
                </div>

                {/* Action Footer */}
                <div className="px-4 pb-3 flex flex-wrap items-center gap-2" onClick={e => e.stopPropagation()}>
                  {/* Status Changer */}
                  <div className="flex items-center gap-1 mr-2">
                    {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                      <button
                        key={k}
                        type="button"
                        title={`Mark as ${v.label}`}
                        onClick={e => { e.stopPropagation(); setStatus(log, k); }}
                        className="w-5 h-5 rounded-full transition-all cursor-pointer"
                        style={{ backgroundColor: status === k ? v.color : "rgba(228,218,195,0.1)", border: status === k ? `2px solid ${v.color}` : "2px solid rgba(228,218,195,0.15)", boxShadow: status === k ? `0 0 8px ${v.color}` : "none" }}
                      />
                    ))}
                    <span className="text-[9px] font-mono ml-1" style={{ color: "rgba(248,242,228,0.35)" }}>stage</span>
                  </div>

                  {/* Copy */}
                  <button
                    type="button"
                    onClick={e => handleCopyEmail(e, log.email, id)}
                    className="px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
                    style={{ backgroundColor: isCopied ? "rgba(16, 185, 129, 0.15)" : "rgba(248,242,228,0.06)", color: isCopied ? "#34d399" : "rgba(248,242,228,0.7)", border: `1px solid ${isCopied ? "rgba(16,185,129,0.3)" : "rgba(228,218,195,0.12)"}` }}
                  >
                    <i className={`fas ${isCopied ? "fa-check" : "fa-copy"} text-[9px]`} />
                    <span>{isCopied ? "Copied!" : "Email"}</span>
                  </button>

                  {/* Reply */}
                  <a
                    href={`mailto:${log.email}?subject=The Intelliverse — Re: your inquiry`}
                    onClick={e => e.stopPropagation()}
                    className="px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1.5 transition"
                    style={{ backgroundColor: "rgba(47, 99, 224, 0.15)", color: "var(--blue)", border: "1px solid rgba(61,123,247,0.3)", textDecoration: "none" }}
                  >
                    <i className="fas fa-paper-plane text-[9px]" />
                    <span>Reply</span>
                  </a>

                  {/* View */}
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); setSelectedLead(log); }}
                    className="px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
                    style={{ backgroundColor: "rgba(155, 114, 216, 0.12)", color: "var(--purple, #9b72d8)", border: "1px solid rgba(155, 114, 216, 0.25)" }}
                  >
                    <i className="fas fa-expand-alt text-[9px]" />
                    <span>Details</span>
                  </button>

                  {/* Delete */}
                  {log._id && (
                    <button
                      type="button"
                      onClick={e => { e.stopPropagation(); if (confirm(`Delete lead from ${log.name}?`)) handleDeleteLead(log._id); }}
                      className="ml-auto px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-bold flex items-center gap-1.5 transition cursor-pointer"
                      style={{ backgroundColor: "rgba(255, 107, 123, 0.1)", color: "#ff6b7b", border: "1px solid rgba(255, 107, 123, 0.2)" }}
                    >
                      <i className="fas fa-trash-alt text-[9px]" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
