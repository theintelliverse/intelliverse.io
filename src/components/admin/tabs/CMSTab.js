"use client";

export default function CMSTab({
  heroSubtitle,
  setHeroSubtitle,
  aboutP1,
  setAboutP1,
  statsProjects,
  setStatsProjects,
  statsClients,
  setStatsClients,
  handleSaveCMS,
  loading
}) {
  return (
    <div className="space-y-6 md:space-y-8 animate-fade-in">
      <div>
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white font-mono uppercase">Hero &amp; About CMS Editor</h2>
        <p className="text-xs md:text-sm text-gray-400 mt-1">Configure layout text, headlines, and statistics metrics.</p>
      </div>

      <div className="bg-gray-900/30 border border-white/5 p-6 md:p-8 rounded-2xl backdrop-blur-sm space-y-6 shadow-xl shadow-black/30">
        {/* Text Fields */}
        <div className="space-y-4">
          <div>
            <label className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider font-mono">Hero Subtitle</label>
            <textarea
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              className="w-full mt-2 p-3 bg-gray-950 border border-gray-855 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-xl text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600 leading-relaxed"
              rows="3"
            ></textarea>
          </div>
          <div>
            <label className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider font-mono">About Description Paragraph</label>
            <textarea
              value={aboutP1}
              onChange={(e) => setAboutP1(e.target.value)}
              className="w-full mt-2 p-3 bg-gray-950 border border-gray-855 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-xl text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600 leading-relaxed font-sans"
              rows="5"
            ></textarea>
          </div>
        </div>

        {/* Statistics Metrics Numbers */}
        <div className="space-y-4 border-t border-white/5 pt-6">
          <h3 className="text-xs font-bold text-white font-mono uppercase tracking-wider">Statistics Counters</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className="text-[10px] text-gray-400 uppercase font-semibold font-mono">Projects Completed</label>
              <input
                type="number"
                value={statsProjects}
                onChange={(e) => setStatsProjects(e.target.value)}
                className="w-full mt-1.5 p-3 bg-gray-950 border border-gray-850 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-xl text-xs focus:outline-none transition-all duration-300"
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 uppercase font-semibold font-mono">Happy Clients</label>
              <input
                type="number"
                value={statsClients}
                onChange={(e) => setStatsClients(e.target.value)}
                className="w-full mt-1.5 p-3 bg-gray-950 border border-gray-850 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-xl text-xs focus:outline-none transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* CTA Save Action */}
        <div className="border-t border-white/5 pt-6">
          <button
            onClick={handleSaveCMS}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 cursor-pointer disabled:opacity-50 active:scale-95 flex items-center justify-center gap-2"
          >
            <i className="fas fa-save mr-1.5"></i>
            <span>Save Layout Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
}
