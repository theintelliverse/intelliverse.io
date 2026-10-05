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
      className={`fixed inset-y-0 left-0 w-64 flex flex-col z-40 transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:flex md:flex-col ${
        mobileMenuOpen ? "translate-x-0 shadow-2xl shadow-black/80" : "-translate-x-full md:translate-x-0"
      }`}
      style={{
        backgroundColor: "rgba(11, 21, 48, 0.95)",
        borderRight: "1px solid rgba(228, 218, 195, 0.12)",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* Brand Header */}
      <div
        className="p-6 flex items-center justify-between"
        style={{ borderBottom: "1px solid rgba(228, 218, 195, 0.1)" }}
      >
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/the%20intelliverse%20logo.jpg"
            alt="Intelliverse Logo"
            className="w-8 h-8 rounded-lg object-cover shadow-md hover:scale-105 transition-transform duration-300"
            style={{ border: "1px solid rgba(228, 218, 195, 0.2)" }}
          />
          <div className="min-w-0">
            <h1
              className="text-xs font-bold tracking-widest uppercase font-mono"
              style={{ color: "var(--cream)" }}
            >
              The Intelliverse
            </h1>
            <p
              className="text-[10px] truncate mt-0.5"
              style={{ color: "rgba(248, 242, 228, 0.6)", fontFamily: "'JetBrains Mono', monospace" }}
            >
              Console / <strong style={{ color: "var(--orange)" }}>{currentUser}</strong>
            </p>
          </div>
        </div>
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="md:hidden p-1 text-xs transition cursor-pointer"
          style={{ color: "rgba(248, 242, 228, 0.6)" }}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

      {/* Navigation Tabs Links */}
      <nav className="flex-grow p-4 space-y-1.5 overflow-y-auto scrollbar-none">
        {[
          { id: "dashboard", label: "Dashboard", icon: "fa-chart-pie" },
          { id: "cms", label: "Hero & About CMS", icon: "fa-edit" },
          { id: "team", label: "Team Members", icon: "fa-users" },
          { id: "projects", label: "Projects & Portfolio", icon: "fa-layer-group" },
          { id: "casestudies", label: "Case Studies & Specs", icon: "fa-microchip" },
          { id: "testimonials", label: "Client Reviews", icon: "fa-comments" },
          { id: "chatbot", label: "Chatbot Q&A", icon: "fa-robot" },
          { id: "crm", label: "CRM Form Leads", icon: "fa-address-book" },
          { id: "settings", label: "Manage Admins", icon: "fa-users-cog" },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold rounded-xl transition-all duration-300 relative cursor-pointer group"
              style={{
                backgroundColor: isActive ? "var(--blue-deep)" : "transparent",
                color: isActive ? "var(--cream)" : "rgba(248, 242, 228, 0.7)",
                border: isActive
                  ? "1px solid rgba(228, 218, 195, 0.2)"
                  : "1px solid transparent",
                boxShadow: isActive ? "0 4px 14px rgba(47, 99, 224, 0.35)" : "none",
                fontFamily: "'JetBrains Mono', monospace",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "rgba(248, 242, 228, 0.05)";
                  e.currentTarget.style.color = "var(--cream)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "rgba(248, 242, 228, 0.7)";
                }
              }}
            >
              <i
                className={`fas ${tab.icon} text-sm transition-transform duration-300 group-hover:scale-110`}
                style={{
                  color: isActive ? "var(--orange)" : "rgba(248, 242, 228, 0.5)",
                }}
              ></i>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Sidebar Footer (Logout/Status) */}
      <div
        className="p-4 space-y-4"
        style={{
          borderTop: "1px solid rgba(228, 218, 195, 0.1)",
          backgroundColor: "rgba(11, 21, 48, 0.6)",
        }}
      >
        <div className="flex items-center justify-between text-[10px] font-mono">
          <span style={{ color: "rgba(248, 242, 228, 0.5)" }}>DB STATUS:</span>
          <span
            className="font-semibold flex items-center gap-1.5"
            style={{
              color: dbStatus === "Connected" ? "#10b981" : "var(--orange)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                backgroundColor: dbStatus === "Connected" ? "#10b981" : "var(--orange)",
                boxShadow: dbStatus === "Connected" ? "0 0 8px #10b981" : "none",
              }}
            ></span>
            {dbStatus === "Connected" ? "Live Atlas" : "Mock Fallback"}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold transition duration-300 cursor-pointer active:scale-[0.98]"
          style={{
            backgroundColor: "rgba(255, 107, 123, 0.1)",
            color: "var(--coral)",
            border: "1px solid rgba(255, 107, 123, 0.25)",
            fontFamily: "'JetBrains Mono', monospace",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 107, 123, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(255, 107, 123, 0.1)";
          }}
        >
          <i className="fas fa-sign-out-alt"></i>
          <span>Secure Log Out</span>
        </button>
      </div>
    </aside>
  );
}
