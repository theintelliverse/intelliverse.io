"use client";

export default function CRMTab({
  contactLogs,
  setSelectedLead,
  handleDeleteLead
}) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight font-mono uppercase" style={{ color: "var(--cream)" }}>
          CRM Leads (Contact Form Submissions)
        </h2>
        <p className="text-xs md:text-sm mt-1" style={{ color: "var(--muted)" }}>
          Submissions sent via contact forms along with client IP addresses.
        </p>
      </div>

      <div
        className="rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl"
        style={{
          backgroundColor: "rgba(18, 30, 68, 0.7)",
          border: "1px solid rgba(228, 218, 195, 0.14)",
        }}
      >
        <div
          className="p-4 md:p-6 flex justify-between items-center"
          style={{
            borderBottom: "1px solid rgba(228, 218, 195, 0.1)",
            backgroundColor: "rgba(11, 21, 48, 0.5)",
          }}
        >
          <span className="text-xs font-bold font-mono uppercase tracking-wider" style={{ color: "var(--cream)" }}>
            Form Lead Messages Feed
          </span>
          <span
            className="px-2.5 py-1 rounded-full font-bold text-[10px] font-mono border"
            style={{
              backgroundColor: "rgba(47, 99, 224, 0.15)",
              color: "var(--blue)",
              borderColor: "rgba(61, 123, 247, 0.3)",
            }}
          >
            {contactLogs.length} Records
          </span>
        </div>

        <div className="p-4 md:p-6 space-y-4 max-h-[55vh] overflow-y-auto pr-4 scrollbar-none text-xs">
          {contactLogs.map((log, index) => (
            <div
              key={index}
              onClick={() => setSelectedLead(log)}
              className="p-4 md:p-5 rounded-xl space-y-3 relative transition duration-300 animate-fade-in cursor-pointer hover:border-opacity-40"
              style={{
                backgroundColor: "rgba(11, 21, 48, 0.7)",
                border: "1px solid rgba(228, 218, 195, 0.1)",
              }}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-[10px] font-mono" style={{ color: "var(--muted)" }}>
                <span>IP Address: <strong className="font-semibold" style={{ color: "var(--blue)" }}>{log.ip}</strong></span>
                <span>{new Date(log.createdAt).toLocaleString()}</span>
              </div>
              <div>
                <span className="font-bold text-sm font-sans" style={{ color: "var(--cream)" }}>{log.name}</span>{" "}
                <span className="ml-1 sm:ml-1.5 font-medium break-all font-mono" style={{ color: "var(--orange)" }}>&lt;{log.email}&gt;</span>
              </div>
              <p
                className="p-3 rounded-lg leading-relaxed text-xs truncate max-w-full font-sans"
                style={{
                  backgroundColor: "rgba(18, 30, 68, 0.5)",
                  border: "1px solid rgba(228, 218, 195, 0.08)",
                  color: "var(--cream)",
                }}
              >
                {log.message}
              </p>
              <div className="flex justify-end gap-2 pt-1 font-mono">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedLead(log);
                  }}
                  className="px-3 py-1.5 rounded-lg text-[10px] font-bold transition border"
                  style={{
                    backgroundColor: "rgba(47, 99, 224, 0.15)",
                    borderColor: "rgba(61, 123, 247, 0.3)",
                    color: "var(--blue)",
                  }}
                >
                  View Details
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteLead(log._id);
                  }}
                  className="px-3 py-1.5 rounded-lg text-[10px] font-bold transition border cursor-pointer"
                  style={{
                    backgroundColor: "rgba(255, 107, 123, 0.12)",
                    borderColor: "rgba(255, 107, 123, 0.25)",
                    color: "var(--coral)",
                  }}
                >
                  Delete Log
                </button>
              </div>
            </div>
          ))}

          {contactLogs.length === 0 && (
            <div className="text-center py-12 font-sans" style={{ color: "var(--muted)" }}>
              <i className="fas fa-inbox text-3xl mb-3" style={{ color: "var(--hairline)" }}></i>
              <p>No messages received yet via the contact form.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

