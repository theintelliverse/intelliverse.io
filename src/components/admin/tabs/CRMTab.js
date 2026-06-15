"use client";

export default function CRMTab({
  contactLogs,
  setSelectedLead,
  handleDeleteLead
}) {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white font-mono uppercase">CRM Leads (Contact Form Submissions)</h2>
        <p className="text-xs md:text-sm text-gray-400 mt-1">Submissions sent via contact forms along with client IP addresses.</p>
      </div>

      <div className="bg-gray-900/30 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm shadow-xl shadow-black/20">
        <div className="p-4 md:p-6 border-b border-white/5 bg-gray-900/10 flex justify-between items-center">
          <span className="text-xs font-bold text-gray-300 font-mono">Form Lead Messages Feed</span>
          <span className="px-2.5 py-1 bg-blue-600/10 border border-blue-500/20 rounded-full text-blue-400 font-bold text-[10px] font-mono">
            {contactLogs.length} Records
          </span>
        </div>

        <div className="p-4 md:p-6 space-y-4 max-h-[50vh] overflow-y-auto pr-4 scrollbar-none text-xs">
          {contactLogs.map((log, index) => (
            <div
              key={index}
              onClick={() => setSelectedLead(log)}
              className="bg-gray-950/60 border border-gray-850 hover:border-gray-700 p-4 md:p-5 rounded-xl space-y-3 relative hover:bg-gray-950/90 transition duration-300 animate-fade-in cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-[10px] text-gray-500 font-mono">
                <span>IP Address: <strong className="text-blue-400 font-semibold">{log.ip}</strong></span>
                <span>{new Date(log.createdAt).toLocaleString()}</span>
              </div>
              <div>
                <span className="font-bold text-white text-sm font-sans">{log.name}</span>{" "}
                <span className="text-gray-400 ml-1 sm:ml-1.5 font-medium break-all font-mono">&lt;{log.email}&gt;</span>
              </div>
              <p className="text-gray-300 bg-gray-900/30 p-3 rounded-lg border border-gray-850 leading-relaxed text-xs truncate max-w-full font-sans">
                {log.message}
              </p>
              <div className="flex justify-end gap-2 pt-1 font-mono">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedLead(log);
                  }}
                  className="px-2.5 py-1 bg-blue-600/10 hover:bg-blue-600/30 border border-blue-500/20 text-blue-400 text-[10px] font-bold rounded-lg transition"
                >
                  View Details
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteLead(log._id);
                  }}
                  className="px-2.5 py-1 bg-red-950/20 hover:bg-red-950/60 border border-red-900/10 text-red-500 text-[10px] font-bold rounded-lg transition cursor-pointer"
                >
                  Delete Log
                </button>
              </div>
            </div>
          ))}

          {contactLogs.length === 0 && (
            <div className="text-center py-12 text-gray-500 font-sans">
              <i className="fas fa-inbox text-3xl mb-3 text-gray-700"></i>
              <p>No messages received yet via the contact form.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
