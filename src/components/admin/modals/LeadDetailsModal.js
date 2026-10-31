"use client";

import { useState } from "react";

export default function LeadDetailsModal({
  selectedLead,
  setSelectedLead,
  handleDeleteLead
}) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMsg, setCopiedMsg] = useState(false);

  if (!selectedLead) return null;

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedMsg(true);
      setTimeout(() => setCopiedMsg(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div
        className="w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border"
        style={{
          backgroundColor: "rgba(11, 21, 48, 0.96)",
          borderColor: "rgba(228, 218, 195, 0.16)",
          boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.8)",
        }}
      >
        {/* Modal Header */}
        <div
          className="p-5 md:p-6 flex justify-between items-start"
          style={{
            borderBottom: "1px solid rgba(228, 218, 195, 0.12)",
            backgroundColor: "rgba(18, 30, 68, 0.5)",
          }}
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--blue)] animate-pulse"></span>
              <h3 className="text-sm font-bold uppercase tracking-wider font-mono" style={{ color: "var(--cream)" }}>
                Lead Intelligence Dossier
              </h3>
            </div>
            <p className="text-[10px] mt-1 font-mono" style={{ color: "rgba(248, 242, 228, 0.55)" }}>
              Transmitted on {new Date(selectedLead.createdAt).toLocaleString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <button
            onClick={() => setSelectedLead(null)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs transition cursor-pointer"
            style={{
              backgroundColor: "rgba(248, 242, 228, 0.06)",
              color: "rgba(248, 242, 228, 0.6)",
              border: "1px solid rgba(228, 218, 195, 0.1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--cream)";
              e.currentTarget.style.backgroundColor = "rgba(248, 242, 228, 0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(248, 242, 228, 0.6)";
              e.currentTarget.style.backgroundColor = "rgba(248, 242, 228, 0.06)";
            }}
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 md:p-6 space-y-4 text-xs">
          {/* Submitter & IP Grid */}
          <div className="grid grid-cols-2 gap-3.5">
            <div
              className="p-3.5 rounded-xl border"
              style={{
                backgroundColor: "rgba(18, 30, 68, 0.6)",
                borderColor: "rgba(228, 218, 195, 0.1)",
              }}
            >
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider block" style={{ color: "var(--orange)" }}>
                Submitter Name
              </span>
              <span className="font-bold text-sm block mt-1" style={{ color: "var(--cream)" }}>
                {selectedLead.name}
              </span>
            </div>

            <div
              className="p-3.5 rounded-xl border"
              style={{
                backgroundColor: "rgba(18, 30, 68, 0.6)",
                borderColor: "rgba(228, 218, 195, 0.1)",
              }}
            >
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider block" style={{ color: "var(--blue)" }}>
                Client IP Address
              </span>
              <span className="font-bold text-sm block mt-1 font-mono" style={{ color: "var(--cream)" }}>
                {selectedLead.ip || "Direct Web"}
              </span>
            </div>
          </div>

          {/* Email Info Box */}
          <div
            className="p-3.5 rounded-xl border"
            style={{
              backgroundColor: "rgba(18, 30, 68, 0.6)",
              borderColor: "rgba(228, 218, 195, 0.1)",
            }}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider" style={{ color: "rgba(248, 242, 228, 0.6)" }}>
                Contact Email
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleCopy(selectedLead.email, "email")}
                  className="px-2 py-0.5 rounded text-[10px] font-mono transition cursor-pointer"
                  style={{
                    backgroundColor: copiedEmail ? "rgba(16, 185, 129, 0.2)" : "rgba(248, 242, 228, 0.08)",
                    color: copiedEmail ? "#34d399" : "var(--cream)",
                    border: "1px solid rgba(228, 218, 195, 0.12)",
                  }}
                >
                  <i className={`fas ${copiedEmail ? "fa-check" : "fa-copy"} text-[9px] mr-1`}></i>
                  {copiedEmail ? "Copied" : "Copy"}
                </button>
                <a
                  href={`mailto:${selectedLead.email}?subject=The Intelliverse — Follow up on your inquiry`}
                  className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold transition flex items-center gap-1 cursor-pointer"
                  style={{
                    backgroundColor: "var(--blue-deep)",
                    color: "var(--cream)",
                    textDecoration: "none",
                  }}
                >
                  <i className="fas fa-paper-plane text-[9px]"></i>
                  Reply Mail
                </a>
              </div>
            </div>
            <span className="font-mono text-xs break-all" style={{ color: "var(--orange)" }}>
              {selectedLead.email}
            </span>
          </div>

          {/* Message Area */}
          <div
            className="p-4 rounded-xl border space-y-2"
            style={{
              backgroundColor: "rgba(18, 30, 68, 0.6)",
              borderColor: "rgba(228, 218, 195, 0.1)",
            }}
          >
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider" style={{ color: "rgba(248, 242, 228, 0.6)" }}>
                Transmitted Inquiry Content
              </span>
              <button
                type="button"
                onClick={() => handleCopy(selectedLead.message, "msg")}
                className="px-2 py-0.5 rounded text-[10px] font-mono transition cursor-pointer"
                style={{
                  backgroundColor: copiedMsg ? "rgba(16, 185, 129, 0.2)" : "rgba(248, 242, 228, 0.08)",
                  color: copiedMsg ? "#34d399" : "rgba(248, 242, 228, 0.8)",
                  border: "1px solid rgba(228, 218, 195, 0.12)",
                }}
              >
                <i className={`fas ${copiedMsg ? "fa-check" : "fa-copy"} text-[9px] mr-1`}></i>
                {copiedMsg ? "Copied Content" : "Copy Message"}
              </button>
            </div>
            <p
              className="leading-relaxed whitespace-pre-wrap break-words font-sans text-xs p-3 rounded-lg max-h-48 overflow-y-auto"
              style={{
                backgroundColor: "rgba(11, 21, 48, 0.6)",
                border: "1px solid rgba(228, 218, 195, 0.08)",
                color: "var(--cream)",
              }}
            >
              {selectedLead.message}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          className="p-4 md:p-5 flex justify-between items-center gap-3 font-mono text-xs"
          style={{
            borderTop: "1px solid rgba(228, 218, 195, 0.12)",
            backgroundColor: "rgba(18, 30, 68, 0.4)",
          }}
        >
          <button
            onClick={() => {
              if (confirm(`Delete the inquiry record from ${selectedLead.name}?`)) {
                handleDeleteLead(selectedLead._id);
                setSelectedLead(null);
              }
            }}
            className="px-4 py-2 rounded-xl font-bold transition cursor-pointer flex items-center gap-1.5"
            style={{
              backgroundColor: "rgba(255, 107, 123, 0.12)",
              color: "var(--coral)",
              border: "1px solid rgba(255, 107, 123, 0.25)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 107, 123, 0.25)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(255, 107, 123, 0.12)")}
          >
            <i className="fas fa-trash-alt text-[10px]"></i>
            <span>Delete Lead</span>
          </button>

          <button
            onClick={() => setSelectedLead(null)}
            className="px-5 py-2 rounded-xl font-bold transition cursor-pointer"
            style={{
              backgroundColor: "rgba(248, 242, 228, 0.1)",
              color: "var(--cream)",
              border: "1px solid rgba(228, 218, 195, 0.16)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "rgba(248, 242, 228, 0.18)")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "rgba(248, 242, 228, 0.1)")}
          >
            Close View
          </button>
        </div>
      </div>
    </div>
  );
}
