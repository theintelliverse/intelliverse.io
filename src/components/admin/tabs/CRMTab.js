"use client";

import { useState } from "react";

export default function CRMTab({
  contactLogs,
  setSelectedLead,
  handleDeleteLead
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const filteredLogs = contactLogs.filter((log) => {
    const q = searchTerm.toLowerCase();
    return (
      (log.name && log.name.toLowerCase().includes(q)) ||
      (log.email && log.email.toLowerCase().includes(q)) ||
      (log.message && log.message.toLowerCase().includes(q)) ||
      (log.ip && log.ip.includes(q))
    );
  });

  const handleCopyEmail = (e, email, id) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--blue)] animate-pulse shadow-[0_0_10px_rgba(61,123,247,0.8)]"></span>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight font-mono uppercase" style={{ color: "var(--cream)" }}>
              CRM Client Inquiries
            </h2>
          </div>
          <p className="text-xs md:text-sm mt-1 font-mono" style={{ color: "rgba(248, 242, 228, 0.65)" }}>
            Inbound prospective client transmissions captured from website forms.
          </p>
        </div>

        {/* Counter Tag */}
        <div className="flex items-center gap-2">
          <span
            className="px-3.5 py-1.5 rounded-full font-bold text-xs font-mono"
            style={{
              backgroundColor: "rgba(47, 99, 224, 0.15)",
              color: "var(--blue)",
              border: "1px solid rgba(61, 123, 247, 0.3)",
            }}
          >
            {contactLogs.length} Records Logged
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="admin-console-card overflow-hidden">
        {/* Search & Filter Toolbar */}
        <div
          className="p-4 md:p-5 flex flex-col sm:flex-row gap-3 justify-between items-center"
          style={{
            borderBottom: "1px solid rgba(228, 218, 195, 0.1)",
            backgroundColor: "rgba(11, 21, 48, 0.6)",
          }}
        >
          <div className="relative w-full sm:w-80">
            <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-xs" style={{ color: "rgba(248, 242, 228, 0.4)" }}></i>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by client name, email, or message..."
              className="admin-input-field pl-9 pr-8 text-xs font-mono"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs hover:text-white cursor-pointer"
                style={{ color: "rgba(248, 242, 228, 0.5)" }}
              >
                ✕
              </button>
            )}
          </div>

          <div className="text-[11px] font-mono text-right w-full sm:w-auto" style={{ color: "rgba(248, 242, 228, 0.55)" }}>
            Showing <strong>{filteredLogs.length}</strong> of <strong>{contactLogs.length}</strong> inquiries
          </div>
        </div>

        {/* Inquiries Feed List */}
        <div className="p-4 md:p-6 space-y-4 max-h-[62vh] overflow-y-auto pr-3 scrollbar-none text-xs">
          {filteredLogs.map((log, index) => {
            const isCopied = copiedId === (log._id || index);

            return (
              <div
                key={log._id || index}
                onClick={() => setSelectedLead(log)}
                className="p-4 md:p-5 rounded-xl space-y-3 relative transition-all duration-300 cursor-pointer hover:border-[var(--blue)] hover:shadow-lg active:scale-[0.99] group"
                style={{
                  backgroundColor: "rgba(11, 21, 48, 0.8)",
                  border: "1px solid rgba(228, 218, 195, 0.12)",
                }}
              >
                {/* Top Row: IP & Timestamp */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1.5 text-[10px] font-mono">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span style={{ color: "rgba(248, 242, 228, 0.6)" }}>
                      Source IP: <strong className="font-semibold" style={{ color: "var(--blue)" }}>{log.ip || "Direct"}</strong>
                    </span>
                  </div>
                  <span style={{ color: "rgba(248, 242, 228, 0.5)" }}>
                    {new Date(log.createdAt).toLocaleString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {/* Submitter Info */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-sm" style={{ color: "var(--cream)" }}>
                      {log.name}
                    </span>
                    <span className="font-mono text-xs" style={{ color: "var(--orange)" }}>
                      &lt;{log.email}&gt;
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => handleCopyEmail(e, log.email, log._id || index)}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition flex items-center gap-1.5 cursor-pointer"
                      style={{
                        backgroundColor: isCopied ? "rgba(16, 185, 129, 0.2)" : "rgba(248, 242, 228, 0.06)",
                        color: isCopied ? "#34d399" : "var(--cream)",
                        border: isCopied ? "1px solid rgba(16, 185, 129, 0.4)" : "1px solid rgba(228, 218, 195, 0.15)",
                      }}
                      title="Copy Email Address"
                    >
                      <i className={`fas ${isCopied ? "fa-check" : "fa-copy"} text-[9px]`}></i>
                      <span>{isCopied ? "Copied" : "Copy Email"}</span>
                    </button>

                    <a
                      href={`mailto:${log.email}?subject=The Intelliverse — Follow up on your inquiry`}
                      onClick={(e) => e.stopPropagation()}
                      className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold transition flex items-center gap-1.5 cursor-pointer"
                      style={{
                        backgroundColor: "rgba(47, 99, 224, 0.2)",
                        color: "var(--blue)",
                        border: "1px solid rgba(61, 123, 247, 0.35)",
                        textDecoration: "none",
                      }}
                      title="Open Email Client"
                    >
                      <i className="fas fa-paper-plane text-[9px]"></i>
                      <span>Reply</span>
                    </a>
                  </div>
                </div>

                {/* Message Snippet */}
                <p
                  className="p-3.5 rounded-xl leading-relaxed text-xs font-sans whitespace-pre-wrap line-clamp-3"
                  style={{
                    backgroundColor: "rgba(18, 30, 68, 0.55)",
                    border: "1px solid rgba(228, 218, 195, 0.08)",
                    color: "rgba(248, 242, 228, 0.9)",
                  }}
                >
                  {log.message}
                </p>

                {/* Actions Footer */}
                <div className="flex justify-between items-center pt-1 font-mono text-[10px]">
                  <span style={{ color: "rgba(248, 242, 228, 0.45)" }}>
                    Click card for full intelligence dossier
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedLead(log);
                      }}
                      className="px-3 py-1.5 rounded-lg font-bold transition border cursor-pointer"
                      style={{
                        backgroundColor: "rgba(47, 99, 224, 0.15)",
                        borderColor: "rgba(61, 123, 247, 0.3)",
                        color: "var(--blue)",
                      }}
                    >
                      View Details →
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Are you sure you want to delete the lead from ${log.name}?`)) {
                          handleDeleteLead(log._id);
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg font-bold transition border cursor-pointer hover:bg-red-950/60"
                      style={{
                        backgroundColor: "rgba(255, 107, 123, 0.12)",
                        borderColor: "rgba(255, 107, 123, 0.25)",
                        color: "var(--coral)",
                      }}
                    >
                      <i className="fas fa-trash-alt text-[9px]"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredLogs.length === 0 && (
            <div className="text-center py-14" style={{ color: "rgba(248, 242, 228, 0.6)" }}>
              <i className="fas fa-inbox text-3xl mb-3 block" style={{ color: "rgba(248, 242, 228, 0.2)" }}></i>
              <p className="font-mono text-xs">
                {searchTerm ? `No leads matching "${searchTerm}".` : "No inquiries received yet."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
