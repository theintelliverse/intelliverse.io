"use client";

export default function LeadDetailsModal({
  selectedLead,
  setSelectedLead,
  handleDeleteLead
}) {
  if (!selectedLead) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 border-b border-gray-800 flex justify-between items-start">
          <div>
            <h3 className="text-base font-bold text-white font-mono uppercase tracking-wider">CRM Lead Details</h3>
            <p className="text-[10px] text-gray-500 mt-0.5 font-mono">{new Date(selectedLead.createdAt).toLocaleString()}</p>
          </div>
          <button
            onClick={() => setSelectedLead(null)}
            className="p-1.5 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg transition cursor-pointer"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="p-6 space-y-4 text-xs font-sans">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-950/60 rounded-xl border border-gray-850">
              <span className="text-gray-500 font-semibold uppercase text-[9px] block font-mono">Submitter Name</span>
              <span className="text-white font-bold text-sm block mt-0.5">{selectedLead.name}</span>
            </div>
            <div className="p-3 bg-gray-950/60 rounded-xl border border-gray-850">
              <span className="text-gray-500 font-semibold uppercase text-[9px] block font-mono">Client IP Address</span>
              <span className="text-blue-400 font-bold text-sm block mt-0.5 font-mono">{selectedLead.ip}</span>
            </div>
          </div>

          <div className="p-3 bg-gray-950/60 rounded-xl border border-gray-850">
            <span className="text-gray-500 font-semibold uppercase text-[9px] block font-mono">Email Address</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-white font-semibold break-all font-mono">{selectedLead.email}</span>
              <a
                href={`mailto:${selectedLead.email}?subject=Reply from The Intelliverse`}
                className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[10px] font-bold transition flex items-center gap-1 cursor-pointer font-mono"
              >
                <i className="fas fa-envelope text-[9px]"></i>
                Reply Mail
              </a>
            </div>
          </div>

          <div className="p-4 bg-gray-950/60 rounded-xl border border-gray-855 space-y-1.5">
            <span className="text-gray-500 font-semibold uppercase text-[9px] block font-mono">Form Message</span>
            <p className="text-gray-200 leading-relaxed whitespace-pre-wrap break-words">{selectedLead.message}</p>
          </div>
        </div>

        <div className="p-6 border-t border-gray-800 bg-gray-950/40 flex justify-between gap-4 font-mono">
          <button
            onClick={() => handleDeleteLead(selectedLead._id)}
            className="px-4 py-2 bg-red-950/30 hover:bg-red-950/80 border border-red-900/20 text-red-500 hover:text-red-400 rounded-lg font-bold text-xs transition cursor-pointer"
          >
            Delete Lead
          </button>
          <button
            onClick={() => setSelectedLead(null)}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg font-bold text-xs transition cursor-pointer"
          >
            Close View
          </button>
        </div>
      </div>
    </div>
  );
}
