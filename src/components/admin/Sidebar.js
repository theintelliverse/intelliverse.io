"use client";

export default function Sidebar({
  activeTab,
  setActiveTab,
  mobileMenuOpen,
  setMobileMenuOpen,
  currentUser,
  dbStatus,
  handleLogout
}) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 w-64 bg-gray-950/40 backdrop-blur-xl border-r border-white/5 flex flex-col z-40 transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:flex md:flex-col ${
        mobileMenuOpen ? "translate-x-0 shadow-2xl shadow-black/80" : "-translate-x-full md:translate-x-0"
      }`}
    >
      {/* Brand Header */}
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/the%20intelliverse%20logo.jpg"
            alt="Intelliverse Logo"
            className="w-8 h-8 rounded-lg object-cover shadow-lg shadow-blue-500/10 hover:scale-105 transition-transform duration-300"
          />
          <div className="min-w-0">
            <h1 className="text-xs font-bold tracking-widest text-white uppercase font-mono">Intelliverse</h1>
            <p className="text-[10px] text-gray-500 truncate mt-0.5 font-sans">
              Welcome, <strong className="text-blue-400 font-semibold">{currentUser}</strong>
            </p>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="md:hidden text-gray-400 hover:text-white p-1 text-xs transition cursor-pointer"
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

      {/* Navigation Tabs Links */}
      <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto scrollbar-none">
        {[
          { id: "dashboard", label: "Dashboard", icon: "fa-chart-pie" },
          { id: "cms", label: "Hero & About", icon: "fa-edit" },
          { id: "team", label: "Team Members", icon: "fa-users" },
          { id: "projects", label: "Projects Portfolio", icon: "fa-briefcase" },
          { id: "testimonials", label: "Client Reviews", icon: "fa-comments" },
          { id: "chatbot", label: "Chatbot Q&A", icon: "fa-robot" },
          { id: "crm", label: "CRM Form Leads", icon: "fa-address-book" },
          { id: "settings", label: "Manage Admins", icon: "fa-users-cog" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setMobileMenuOpen(false); // Close mobile sidebar on selection
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold rounded-xl transition-all duration-300 relative cursor-pointer group ${
              activeTab === tab.id
                ? "bg-blue-600/10 text-blue-400 border border-blue-500/15 shadow-lg shadow-blue-500/5"
                : "text-gray-400 hover:bg-white/[0.02] hover:text-gray-200 border border-transparent"
            }`}
          >
            {activeTab === tab.id && (
              <div className="absolute left-0 top-3.5 bottom-3.5 w-1 bg-blue-500 rounded-r-md"></div>
            )}
            <i className={`fas ${tab.icon} text-sm group-hover:scale-110 transition-transform duration-300 ${activeTab === tab.id ? "text-blue-400" : "text-gray-500 group-hover:text-gray-300"}`}></i>
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Sidebar Footer (Logout/Status) */}
      <div className="p-4 border-t border-white/5 bg-gray-950/20 space-y-4">
        <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono">
          <span>DB STATUS:</span>
          <span className={`font-semibold flex items-center gap-1.5 ${dbStatus === "Connected" ? "text-green-400" : "text-amber-500"}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dbStatus === "Connected" ? "bg-green-500 animate-pulse" : "bg-amber-500"}`}></span>
            {dbStatus === "Connected" ? "Connected" : "Mock Fallback"}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-900/30 hover:bg-red-950/15 text-gray-400 hover:text-red-400 border border-white/5 hover:border-red-500/20 rounded-xl text-xs font-bold transition duration-300 cursor-pointer active:scale-[0.98]"
        >
          <i className="fas fa-sign-out-alt"></i>
          <span>Secure Log Out</span>
        </button>
      </div>
    </aside>
  );
}
