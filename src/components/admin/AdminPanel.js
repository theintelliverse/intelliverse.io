"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPanel({ isOpen, data, testimonials: initialTestimonials, projects: initialProjects, submissions: initialSubmissions, admins: initialAdmins, chatbotKnowledge: initialChatbotKnowledge, currentUser, dbStatus }) {
  const router = useRouter();

  // --- Responsive mobile states ---
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- Active Tab State ---
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard | cms | projects | testimonials | chatbot | crm | settings

  // --- CMS Content States ---
  const [heroSubtitle, setHeroSubtitle] = useState(data.hero.subtitle);
  const [aboutP1, setAboutP1] = useState(data.about.p1);
  const [statsProjects, setStatsProjects] = useState(data.stats?.projects || 50);
  const [statsSatisfaction, setStatsSatisfaction] = useState(data.stats?.satisfaction || 100);
  const [statsClients, setStatsClients] = useState(data.stats?.clients || 30);

  // --- Dynamic Lists States ---
  const [testimonials, setTestimonials] = useState(initialTestimonials || []);
  const [projects, setProjects] = useState(initialProjects || []);
  const [contactLogs, setContactLogs] = useState(initialSubmissions || []);
  const [adminsList, setAdminsList] = useState(initialAdmins || ["admin"]);
  const [chatbotKnowledge, setChatbotKnowledge] = useState(initialChatbotKnowledge || []);

  // --- Settings Password Change States ---
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // --- Settings New Admin States ---
  const [newAdminUsername, setNewAdminUsername] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");

  // --- Password visibility states ---
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [showCreatePass, setShowCreatePass] = useState(false);

  // --- Active admins search filter state ---
  const [adminSearch, setAdminSearch] = useState("");

  // --- Custom admin delete confirmation modal state ---
  const [adminToDelete, setAdminToDelete] = useState(null);

  // --- CRM Selected Lead Modal State ---
  const [selectedLead, setSelectedLead] = useState(null);

  // --- UI Notification State ---
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" }); // success | error | info
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  // --- Show Notification Helper ---
  const notify = (text, type = "info") => {
    setStatusMessage({ text, type });
    setTimeout(() => {
      setStatusMessage({ text: "", type: "" });
    }, 5000);
  };

  // --- Handlers for Testimonials ---
  const handleAddTestimonial = () => {
    setTestimonials([...testimonials, { text: "", author: "" }]);
  };

  const handleTestimonialChange = (index, field, value) => {
    const updated = [...testimonials];
    updated[index][field] = value;
    setTestimonials(updated);
  };

  const handleDeleteTestimonial = (index) => {
    setTestimonials(testimonials.filter((_, i) => i !== index));
  };

  // --- Handlers for Projects ---
  const handleAddProject = () => {
    setProjects([...projects, { name: "", description: "", link: "", review: "", rating: 5, type: "", featureLink: "", featureText: "" }]);
  };

  const handleProjectChange = (index, field, value) => {
    const updated = [...projects];
    if (field === "rating") {
      updated[index][field] = parseInt(value) || 5;
    } else {
      updated[index][field] = value;
    }
    setProjects(updated);
  };

  const handleDeleteProject = (index) => {
    setProjects(projects.filter((_, i) => i !== index));
  };

  // --- Handlers for Chatbot Q&A ---
  const handleAddQA = () => {
    setChatbotKnowledge([...chatbotKnowledge, { keywords: "", response: "" }]);
  };

  const handleQAChange = (index, field, value) => {
    const updated = [...chatbotKnowledge];
    updated[index][field] = value;
    setChatbotKnowledge(updated);
  };

  const handleDeleteQA = (index) => {
    setChatbotKnowledge(chatbotKnowledge.filter((_, i) => i !== index));
  };

  // --- Save CMS Content & Lists ---
  const handleSaveCMS = async () => {
    setLoading(true);
    notify("Saving all changes to the database...", "info");

    const payload = {
      hero: { subtitle: heroSubtitle },
      about: { p1: aboutP1 },
      stats: {
        projects: parseInt(statsProjects) || 0,
        satisfaction: parseInt(statsSatisfaction) || 0,
        clients: parseInt(statsClients) || 0
      },
      testimonials,
      projects,
      chatbotKnowledge
    };

    try {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await response.json();
      if (response.ok) {
        notify("CMS Content and portfolio lists updated successfully!", "success");
        router.refresh(); // Sync server state
      } else {
        notify(json.error || "Failed to save CMS changes.", "error");
      }
    } catch (error) {
      notify("Network error. Failed to connect to server database backend.", "error");
    } finally {
      setLoading(false);
    }
  };

  // --- Change Password ---
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      notify("All password fields are required.", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      notify("New passwords do not match.", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const json = await response.json();
      if (response.ok) {
        notify("Password changed successfully!", "success");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        router.refresh();
      } else {
        notify(json.error || "Failed to update password.", "error");
      }
    } catch (err) {
      notify("Network error. Failed to submit password changes.", "error");
    } finally {
      setLoading(false);
    }
  };

  // --- Create New Admin ---
  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    if (!newAdminUsername || !newAdminPassword) {
      notify("Username and password are required.", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/admin/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: newAdminUsername, password: newAdminPassword }),
      });

      const json = await response.json();
      if (response.ok) {
        notify(`Admin account '${newAdminUsername.toLowerCase()}' created successfully!`, "success");
        setAdminsList([...adminsList, newAdminUsername.toLowerCase()]);
        setNewAdminUsername("");
        setNewAdminPassword("");
        router.refresh();
      } else {
        notify(json.error || "Failed to create admin account.", "error");
      }
    } catch (err) {
      notify("Network error. Failed to create administrator.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAdmin = async (usernameToDelete) => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usernameToDelete }),
      });

      const json = await response.json();
      if (response.ok) {
        notify(`Admin account '${usernameToDelete}' deleted successfully.`, "success");
        setAdminsList(adminsList.filter(u => u !== usernameToDelete));
        router.refresh();
      } else {
        notify(json.error || "Failed to delete admin account.", "error");
      }
    } catch (err) {
      notify("Network error. Failed to delete administrator.", "error");
    } finally {
      setLoading(false);
    }
  };

  // --- Delete CRM Contact Lead ---
  const handleDeleteLead = async (leadId) => {
    if (!window.confirm("Are you sure you want to delete this CRM lead submission permanently?")) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/contact?id=${leadId}`, { method: "DELETE" });
      const json = await response.json();
      if (response.ok) {
        notify("CRM lead submission deleted successfully.", "success");
        setContactLogs(contactLogs.filter(log => log._id !== leadId));
        if (selectedLead && selectedLead._id === leadId) {
          setSelectedLead(null);
        }
        router.refresh();
      } else {
        notify(json.error || "Failed to delete lead.", "error");
      }
    } catch (err) {
      notify("Network error. Failed to delete lead.", "error");
    } finally {
      setLoading(false);
    }
  };

  // --- Logout Handler ---
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      if (response.ok) {
        router.replace("/"); // redirect to landing
        router.refresh();    // reload route state
      } else {
        notify("Failed to logout securely.", "error");
      }
    } catch (err) {
      notify("Network error. Failed to log out.", "error");
    }
  };

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

  // Weekly Submissions SVG Graph variables
  const trendData = getSubmissionTrendData();
  const maxCount = Math.max(...trendData.map(p => p.count), 5);
  const chartWidth = 500;
  const chartHeight = 120;

  const points = trendData.map((p, idx) => {
    const x = (idx / 6) * chartWidth;
    const y = chartHeight - 15 - (p.count / maxCount) * 85; // fit in bounds
    return { x, y, count: p.count, label: p.label };
  });

  const linePath = points.length > 0
    ? `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(" ")
    : "";
  const areaPath = points.length > 0
    ? `${linePath} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`
    : "";

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-950 font-sans text-white relative">

      {/* Mobile Top Header (Sticky on phone views) */}
      <div className="md:hidden flex items-center justify-between bg-gray-900 border-b border-gray-800 p-4 sticky top-0 z-30 backdrop-blur-md bg-gray-900/80">
        <div className="flex items-center gap-3">
          <img
            src="/the%20intelliverse%20logo.jpg"
            alt="Intelliverse Logo"
            className="w-7 h-7 rounded-lg object-cover"
          />
          <div>
            <h1 className="text-xs font-bold tracking-wider text-white">Intelliverse Admin</h1>
          </div>
        </div>

        {/* Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-gray-400 hover:text-white p-1 text-lg focus:outline-none transition cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
        </button>
      </div>

      {/* Dim backdrop when mobile menu is slide out */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 border-r border-gray-800 flex flex-col z-40 transition-transform duration-300 ease-in-out md:translate-x-0 md:relative md:flex md:flex-col ${mobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"
          }`}
      >
        {/* Brand Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/the%20intelliverse%20logo.jpg"
              alt="Intelliverse Logo"
              className="w-8 h-8 rounded-lg object-cover shadow-lg shadow-blue-500/10"
            />
            <div>
              <h1 className="text-sm font-bold tracking-wider text-white">Intelliverse</h1>
              <p className="text-[10px] text-gray-500">Welcome, <strong className="text-blue-400">{currentUser}</strong></p>
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden text-gray-500 hover:text-gray-300 text-sm"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Navigation Tabs Links */}
        <nav className="flex-grow p-4 space-y-1 overflow-y-auto scrollbar-none">
          {[
            { id: "dashboard", label: "Dashboard", icon: "fa-chart-pie" },
            { id: "cms", label: "Hero & About", icon: "fa-edit" },
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
              className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${activeTab === tab.id
                  ? "bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-md shadow-blue-500/5"
                  : "text-gray-400 hover:bg-gray-800/40 hover:text-gray-200 border border-transparent"
                }`}
            >
              <i className={`fas ${tab.icon} text-sm`}></i>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Sidebar Footer (Logout/Status) */}
        <div className="p-4 border-t border-gray-800 bg-gray-900/40 space-y-4">
          <div className="flex items-center justify-between text-[10px] text-gray-500">
            <span>DB Status:</span>
            <span className={`font-semibold flex items-center gap-1.5 ${dbStatus === "Connected" ? "text-green-400" : "text-amber-500"}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${dbStatus === "Connected" ? "bg-green-500 animate-pulse" : "bg-amber-500"}`}></span>
              {dbStatus === "Connected" ? "Connected" : "Mock Fallback"}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-800 hover:bg-red-950/20 text-gray-400 hover:text-red-400 border border-gray-700/60 hover:border-red-900/40 rounded-lg text-xs font-semibold transition cursor-pointer"
          >
            <i className="fas fa-sign-out-alt"></i>
            <span>Secure Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-4 md:p-10 relative overflow-y-auto max-h-[calc(100vh-65px)] md:max-h-screen z-10">

        {/* Floating Notification */}
        {statusMessage.text && (
          <div className="fixed top-6 right-6 z-50 animate-slide-in shadow-2xl max-w-sm">
            <div
              className={`p-4 rounded-xl flex items-center gap-3 border ${statusMessage.type === "success"
                  ? "bg-green-950/80 border-green-800 text-green-400 backdrop-blur-md"
                  : statusMessage.type === "error"
                    ? "bg-red-950/80 border-red-800 text-red-400 backdrop-blur-md"
                    : "bg-blue-950/80 border-blue-800 text-blue-400 backdrop-blur-md"
                }`}
            >
              <i className={`fas ${statusMessage.type === "success" ? "fa-check-circle" : statusMessage.type === "error" ? "fa-exclamation-circle" : "fa-info-circle animate-pulse"
                } text-base`}></i>
              <span className="text-xs font-medium">{statusMessage.text}</span>
            </div>
          </div>
        )}

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6 md:space-y-8 animate-fade-in">
            {/* Header Greeting */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">Dashboard Overview</h2>
              <p className="text-xs md:text-sm text-gray-400 mt-1">Real-time status metrics and statistics summary.</p>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-gray-900/40 border border-gray-800 p-5 md:p-6 rounded-2xl backdrop-blur-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] md:text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Submissions (CRM Leads)</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mt-1.5">{contactLogs.length}</h3>
                  </div>
                  <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20">
                    <i className="fas fa-address-book text-base md:text-lg"></i>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900/40 border border-gray-800 p-5 md:p-6 rounded-2xl backdrop-blur-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] md:text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Worked Projects</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mt-1.5">{projects.length}</h3>
                  </div>
                  <div className="p-2.5 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/20">
                    <i className="fas fa-briefcase text-base md:text-lg"></i>
                  </div>
                </div>
              </div>
              <div className="bg-gray-900/40 border border-gray-800 p-5 md:p-6 rounded-2xl backdrop-blur-sm sm:col-span-2 lg:col-span-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] md:text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Testimonials Quotes</p>
                    <h3 className="text-2xl md:text-3xl font-bold text-white mt-1.5">{testimonials.length}</h3>
                  </div>
                  <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
                    <i className="fas fa-comments text-base md:text-lg"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Ingestion Trend SVG Graph */}
            <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5 md:p-6 backdrop-blur-sm space-y-4">
              <div>
                <h4 className="text-xs md:text-sm font-bold text-white flex items-center gap-2">
                  <i className="fas fa-chart-line text-blue-400"></i>
                  <span>CRM Ingestion Lead Activity (Last 7 Days)</span>
                </h4>
                <p className="text-[10px] text-gray-400 mt-1">Counts based on incoming contact submissions timeline.</p>
              </div>

              <div className="relative pt-2">
                <svg className="w-full h-[130px] md:h-[150px] overflow-visible" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(59, 130, 246, 0.45)" />
                      <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                    </linearGradient>
                  </defs>
                  {/* Grid helper lines */}
                  <line x1="0" y1="10" x2={chartWidth} y2="10" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="0" y1={chartHeight / 2} x2={chartWidth} y2={chartHeight / 2} stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="0" y1={chartHeight - 1} x2={chartWidth} y2={chartHeight - 1} stroke="#334155" />

                  {/* Glowing Area Fill */}
                  {areaPath && <path d={areaPath} fill="url(#chartGrad)" className="animate-fade-in" />}

                  {/* Connection Line */}
                  {linePath && <path d={linePath} fill="none" stroke="#3b82f6" strokeWidth="2.5" className="animate-fade-in" />}

                  {/* Dots / Interactive counts */}
                  {points.map((p, idx) => (
                    <g key={idx}>
                      <circle cx={p.x} cy={p.y} r="4.5" fill="#1e3a8a" stroke="#60a5fa" strokeWidth="2" />
                      {p.count > 0 && (
                        <text x={p.x} y={p.y - 10} fill="#93c5fd" fontSize="9" textAnchor="middle" fontWeight="bold">
                          {p.count}
                        </text>
                      )}
                    </g>
                  ))}
                </svg>
                {/* Horizontal Labels */}
                <div className="flex justify-between mt-2.5 px-0.5 text-[9px] md:text-[10px] text-gray-500 font-semibold uppercase">
                  {trendData.map((p, idx) => (
                    <span key={idx} className="w-12 text-center break-words">{p.label}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Dashboard Quick Actions & Recent Activity split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

              {/* Quick Actions Panel */}
              <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5 md:p-6 backdrop-blur-sm space-y-4">
                <h4 className="text-xs md:text-sm font-bold text-white flex items-center gap-2 pb-3 border-b border-gray-800">
                  <i className="fas fa-bolt text-amber-400"></i>
                  <span>Quick Tasks Shortcuts</span>
                </h4>
                <div className="space-y-2 text-xs">
                  <button
                    onClick={() => {
                      setActiveTab("projects");
                      handleAddProject();
                    }}
                    className="w-full flex items-center justify-between p-3 bg-gray-950/40 hover:bg-blue-600/10 border border-gray-850 hover:border-blue-500/20 text-gray-300 hover:text-blue-400 rounded-xl transition cursor-pointer font-medium"
                  >
                    <span>Add Project Portfolio Entry</span>
                    <i className="fas fa-plus text-[10px]"></i>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("testimonials");
                      handleAddTestimonial();
                    }}
                    className="w-full flex items-center justify-between p-3 bg-gray-950/40 hover:bg-purple-600/10 border border-gray-850 hover:border-purple-500/20 text-gray-300 hover:text-purple-400 rounded-xl transition cursor-pointer font-medium"
                  >
                    <span>Add Testimonial Quote</span>
                    <i className="fas fa-plus text-[10px]"></i>
                  </button>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className="w-full flex items-center justify-between p-3 bg-gray-950/40 hover:bg-emerald-600/10 border border-gray-850 hover:border-emerald-500/20 text-gray-300 hover:text-emerald-400 rounded-xl transition cursor-pointer font-medium"
                  >
                    <span>Register Administrator</span>
                    <i className="fas fa-user-plus text-[10px]"></i>
                  </button>
                </div>
              </div>

              {/* Recent Submissions Activity Feed */}
              <div className="lg:col-span-2 bg-gray-900/40 border border-gray-800 rounded-2xl p-5 md:p-6 backdrop-blur-sm space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-800">
                  <h4 className="text-xs md:text-sm font-bold text-white flex items-center gap-2">
                    <i className="fas fa-history text-purple-400"></i>
                    <span>Recent Activity Feed</span>
                  </h4>
                  <button
                    onClick={() => setActiveTab("crm")}
                    className="text-[10px] text-blue-400 hover:underline font-semibold"
                  >
                    View All leads
                  </button>
                </div>

                <div className="space-y-3">
                  {contactLogs.slice(0, 3).map((log, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedLead(log);
                      }}
                      className="p-3 bg-gray-950/40 hover:bg-gray-950/80 border border-gray-850 hover:border-gray-750 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-xs truncate max-w-[120px]">{log.name}</span>
                          <span className="text-[9px] text-gray-500 truncate max-w-[150px]">&lt;{log.email}&gt;</span>
                        </div>
                        <p className="text-[11px] text-gray-400 truncate mt-0.5 max-w-[250px] md:max-w-md">{log.message}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[9px] text-gray-500 block">{new Date(log.createdAt).toLocaleDateString()}</span>
                        <span className="text-[9px] px-1.5 py-0.5 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-full font-semibold mt-1 inline-block">
                          New Lead
                        </span>
                      </div>
                    </div>
                  ))}

                  {contactLogs.length === 0 && (
                    <p className="text-center text-xs text-gray-500 py-8">No recent activity received.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Diagnostic Detail */}
            <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5 md:p-6 backdrop-blur-sm space-y-4">
              <h4 className="text-xs md:text-sm font-bold text-white flex items-center gap-2 pb-3 border-b border-gray-800">
                <i className="fas fa-server text-gray-500"></i>
                <span>Database Connection Diagnostics</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="flex justify-between p-3 bg-gray-950/40 border border-gray-900 rounded-lg gap-2">
                  <span className="text-gray-400">Database Connection:</span>
                  <span className="font-semibold text-white text-right">{dbStatus}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-950/40 border border-gray-900 rounded-lg gap-2">
                  <span className="text-gray-400">Node Environment:</span>
                  <span className="font-semibold text-white text-right capitalize">{process.env.NODE_ENV}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-950/40 border border-gray-900 rounded-lg gap-2">
                  <span className="text-gray-400">Database Engine Host:</span>
                  <span className="font-semibold text-blue-400 overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px] text-right" title="MongoDB Cluster">
                    {dbStatus === "Connected" ? "cluster0.qq3gxq0.mongodb.net" : "In-Memory Memory Cache"}
                  </span>
                </div>
                <div className="flex justify-between p-3 bg-gray-950/40 border border-gray-900 rounded-lg gap-2">
                  <span className="text-gray-400">Logged-in Admin:</span>
                  <span className="font-semibold text-white text-right">{currentUser}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CMS Text Tab */}
        {activeTab === "cms" && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">Hero &amp; About CMS Editor</h2>
              <p className="text-xs md:text-sm text-gray-400 mt-1">Configure layout text, headlines, and statistics metrics.</p>
            </div>

            <div className="bg-gray-900/40 border border-gray-800 p-5 md:p-8 rounded-2xl backdrop-blur-sm space-y-6">
              {/* Text Fields */}
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-400 uppercase font-semibold tracking-wider">Hero Subtitle</label>
                  <textarea
                    value={heroSubtitle}
                    onChange={(e) => setHeroSubtitle(e.target.value)}
                    className="w-full mt-2 p-3 bg-gray-950 border border-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition"
                    rows="3"
                  ></textarea>
                </div>
                <div>
                  <label className="text-xs text-gray-400 uppercase font-semibold tracking-wider">About Description Paragraph</label>
                  <textarea
                    value={aboutP1}
                    onChange={(e) => setAboutP1(e.target.value)}
                    className="w-full mt-2 p-3 bg-gray-950 border border-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition"
                    rows="5"
                  ></textarea>
                </div>
              </div>

              {/* Statistics Metrics Numbers */}
              <div className="space-y-4 border-t border-gray-850 pt-6">
                <h3 className="text-xs md:text-sm font-bold text-white">Statistics Counters</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase font-semibold">Projects Completed</label>
                    <input
                      type="number"
                      value={statsProjects}
                      onChange={(e) => setStatsProjects(e.target.value)}
                      className="w-full mt-1.5 p-3 bg-gray-950 border border-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase font-semibold">Client Satisfaction (%)</label>
                    <input
                      type="number"
                      value={statsSatisfaction}
                      onChange={(e) => setStatsSatisfaction(e.target.value)}
                      className="w-full mt-1.5 p-3 bg-gray-950 border border-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-gray-400 uppercase font-semibold">Happy Clients</label>
                    <input
                      type="number"
                      value={statsClients}
                      onChange={(e) => setStatsClients(e.target.value)}
                      className="w-full mt-1.5 p-3 bg-gray-950 border border-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm transition"
                    />
                  </div>
                </div>
              </div>

              {/* CTA Save Action */}
              <div className="border-t border-gray-850 pt-6">
                <button
                  onClick={handleSaveCMS}
                  disabled={loading}
                  className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-blue-500/10 cursor-pointer disabled:opacity-50"
                >
                  <i className="fas fa-save mr-2"></i>
                  Save Layout Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Projects Portfolio Tab */}
        {activeTab === "projects" && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">Worked Projects Portfolio</h2>
                <p className="text-xs md:text-sm text-gray-400 mt-1">Add or remove portfolio entries. Shows only if projects are present.</p>
              </div>
              <button
                onClick={handleAddProject}
                className="w-full sm:w-auto px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-green-500/10"
              >
                <i className="fas fa-plus"></i>
                <span>Add Project Entry</span>
              </button>
            </div>

            <div className="bg-gray-900/40 border border-gray-800 p-5 md:p-8 rounded-2xl backdrop-blur-sm space-y-6">
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 scrollbar-none">
                {projects.map((proj, index) => (
                  <div key={index} className="bg-gray-950/60 border border-gray-800 p-4 md:p-5 rounded-xl space-y-4 relative animate-fade-in">
                    <button
                      onClick={() => handleDeleteProject(index)}
                      className="absolute top-4 right-4 p-2 py-1 bg-red-950/20 hover:bg-red-950/60 text-red-500 hover:text-red-400 rounded-lg text-[10px] font-semibold transition cursor-pointer border border-red-900/10"
                    >
                      <i className="fas fa-trash-alt mr-1"></i>
                      Delete
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 sm:pt-0">
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase font-semibold">Project Name</label>
                        <input
                          type="text"
                          value={proj.name}
                          onChange={(e) => handleProjectChange(index, "name", e.target.value)}
                          className="w-full mt-1 p-2.5 bg-gray-900 border border-gray-800 text-white rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          placeholder="e.g., Intelliverse CRM Website"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase font-semibold">Working Link</label>
                        <input
                          type="url"
                          value={proj.link}
                          onChange={(e) => handleProjectChange(index, "link", e.target.value)}
                          className="w-full mt-1 p-2.5 bg-gray-900 border border-gray-800 text-white rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          placeholder="https://example.com"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase font-semibold">Project Type</label>
                        <select
                          value={proj.type || ""}
                          onChange={(e) => handleProjectChange(index, "type", e.target.value)}
                          className="w-full mt-1 p-2.5 bg-gray-900 border border-gray-800 text-white rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none cursor-pointer"
                        >
                          <option value="">Select Type...</option>
                          <option value="SaaS Portal">SaaS Portal</option>
                          <option value="Web App">Web App</option>
                          <option value="Mobile App">Mobile App</option>
                          <option value="E-Commerce">E-Commerce</option>
                          <option value="Cloud Platform">Cloud Platform</option>
                          <option value="Landing Page">Landing Page</option>
                          <option value="Dashboard">Dashboard</option>
                          <option value="API Service">API Service</option>
                          <option value="Enterprise">Enterprise</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] text-gray-400 uppercase font-semibold">Description</label>
                      <textarea
                        value={proj.description}
                        onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                        className="w-full mt-1 p-2.5 bg-gray-900 border border-gray-800 text-white rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        placeholder="Brief summary of tech stack, goals, and results..."
                        rows="2"
                      ></textarea>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase font-semibold">Custom Walkthrough / Feature Link (Optional)</label>
                        <input
                          type="url"
                          value={proj.featureLink || ""}
                          onChange={(e) => handleProjectChange(index, "featureLink", e.target.value)}
                          className="w-full mt-1 p-2.5 bg-gray-900 border border-gray-800 text-white rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          placeholder="e.g., https://appointory.in/#features"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase font-semibold">Custom Link Text (e.g., "See How It Works")</label>
                        <input
                          type="text"
                          value={proj.featureText || ""}
                          onChange={(e) => handleProjectChange(index, "featureText", e.target.value)}
                          className="w-full mt-1 p-2.5 bg-gray-900 border border-gray-800 text-white rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          placeholder="e.g., See How It Works"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                      <div className="sm:col-span-3">
                        <label className="text-[10px] text-gray-400 uppercase font-semibold">Client Review Quote (Optional)</label>
                        <input
                          type="text"
                          value={proj.review}
                          onChange={(e) => handleProjectChange(index, "review", e.target.value)}
                          className="w-full mt-1 p-2.5 bg-gray-900 border border-gray-800 text-white rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          placeholder="Excellent work done on this dynamic app!"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase font-semibold">Rating Stars (1-5)</label>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={proj.rating}
                          onChange={(e) => handleProjectChange(index, "rating", e.target.value)}
                          className="w-full mt-1 p-2.5 bg-gray-900 border border-gray-800 text-white rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {projects.length === 0 && (
                  <p className="text-center text-xs text-gray-500 py-10">No projects added yet. The Portfolio section is currently hidden on the landing page.</p>
                )}
              </div>

              {/* Action save CTA */}
              <div className="border-t border-gray-850 pt-6">
                <button
                  onClick={handleSaveCMS}
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-blue-500/10 cursor-pointer"
                >
                  <i className="fas fa-save mr-2"></i>
                  Save Portfolio List
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === "testimonials" && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">Client Reviews &amp; Testimonials</h2>
                <p className="text-xs md:text-sm text-gray-400 mt-1">Manage testimonials shown inside the reviews slider.</p>
              </div>
              <button
                onClick={handleAddTestimonial}
                className="w-full sm:w-auto px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-green-500/10"
              >
                <i className="fas fa-plus"></i>
                <span>Add Testimonial Entry</span>
              </button>
            </div>

            <div className="bg-gray-900/40 border border-gray-800 p-5 md:p-8 rounded-2xl backdrop-blur-sm space-y-6">
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 scrollbar-none">
                {testimonials.map((test, index) => (
                  <div key={index} className="bg-gray-950/60 border border-gray-800 p-4 md:p-5 rounded-xl space-y-4 relative animate-fade-in">
                    <button
                      onClick={() => handleDeleteTestimonial(index)}
                      className="absolute top-4 right-4 p-2 py-1 bg-red-950/20 hover:bg-red-950/60 text-red-500 hover:text-red-400 rounded-lg text-[10px] font-semibold transition cursor-pointer border border-red-900/10"
                    >
                      <i className="fas fa-trash-alt mr-1"></i>
                      Delete
                    </button>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-6 sm:pt-0">
                      <div className="sm:col-span-3">
                        <label className="text-[10px] text-gray-400 uppercase font-semibold">Testimonial Review Quote</label>
                        <input
                          type="text"
                          value={test.text}
                          onChange={(e) => handleTestimonialChange(index, "text", e.target.value)}
                          className="w-full mt-1 p-2.5 bg-gray-900 border border-gray-800 text-white rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          placeholder="Fabulous custom solutions..."
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase font-semibold">Author</label>
                        <input
                          type="text"
                          value={test.author}
                          onChange={(e) => handleTestimonialChange(index, "author", e.target.value)}
                          className="w-full mt-1 p-2.5 bg-gray-900 border border-gray-800 text-white rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          placeholder="e.g., John Doe"
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {testimonials.length === 0 && (
                  <p className="text-center text-xs text-gray-500 py-10">No testimonials. Click Add Testimonial Entry above.</p>
                )}
              </div>

              {/* Action save CTA */}
              <div className="border-t border-gray-850 pt-6">
                <button
                  onClick={handleSaveCMS}
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-blue-500/10 cursor-pointer"
                >
                  <i className="fas fa-save mr-2"></i>
                  Save Testimonials List
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Chatbot Q&A Tab */}
        {activeTab === "chatbot" && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">Chatbot Q&A Knowledge Base</h2>
                <p className="text-xs md:text-sm text-gray-400 mt-1">Configure keywords triggers and responses for the chatbot. The bot scans these keywords in user inquiries.</p>
              </div>
              <button
                onClick={handleAddQA}
                className="w-full sm:w-auto px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-green-500/10"
              >
                <i className="fas fa-plus"></i>
                <span>Add Q&A Trigger</span>
              </button>
            </div>

            <div className="bg-gray-900/40 border border-gray-800 p-5 md:p-8 rounded-2xl backdrop-blur-sm space-y-6">
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 scrollbar-none">
                {chatbotKnowledge.map((qa, index) => (
                  <div key={index} className="bg-gray-950/60 border border-gray-800 p-4 md:p-5 rounded-xl space-y-4 relative animate-fade-in">
                    <button
                      onClick={() => handleDeleteQA(index)}
                      className="absolute top-4 right-4 p-2 py-1 bg-red-950/20 hover:bg-red-950/60 text-red-500 hover:text-red-400 rounded-lg text-[10px] font-semibold transition cursor-pointer border border-red-900/10"
                    >
                      <i className="fas fa-trash-alt mr-1"></i>
                      Delete
                    </button>

                    <div className="grid grid-cols-1 gap-4 pt-6 sm:pt-0">
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase font-semibold">Keywords (comma-separated)</label>
                        <input
                          type="text"
                          value={qa.keywords}
                          onChange={(e) => handleQAChange(index, "keywords", e.target.value)}
                          className="w-full mt-1 p-2.5 bg-gray-900 border border-gray-800 text-white rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          placeholder="e.g., pricing, cost, rates"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400 uppercase font-semibold">Bot Response Message</label>
                        <textarea
                          value={qa.response}
                          onChange={(e) => handleQAChange(index, "response", e.target.value)}
                          className="w-full mt-1 p-2.5 bg-gray-900 border border-gray-800 text-white rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          placeholder="What the chatbot will answer if these keywords are matched..."
                          rows="3"
                          required
                        ></textarea>
                      </div>
                    </div>
                  </div>
                ))}

                {chatbotKnowledge.length === 0 && (
                  <p className="text-center text-xs text-gray-500 py-10">No custom Q&A triggers configured yet. The chatbot will use default knowledge settings.</p>
                )}
              </div>

              {/* Action save CTA */}
              <div className="border-t border-gray-850 pt-6">
                <button
                  onClick={handleSaveCMS}
                  disabled={loading}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-blue-500/10 cursor-pointer"
                >
                  <i className="fas fa-save mr-2"></i>
                  Save Chatbot Q&A triggers
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CRM Submissions Tab */}
        {activeTab === "crm" && (
          <div className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">CRM Leads (Contact Form Submissions)</h2>
              <p className="text-xs md:text-sm text-gray-400 mt-1">Submissions sent via contact forms along with client IP addresses.</p>
            </div>

            <div className="bg-gray-900/40 border border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm">
              <div className="p-4 md:p-6 border-b border-gray-800 bg-gray-900/20 flex justify-between items-center">
                <span className="text-xs font-bold text-gray-300">Form Lead Messages Feed</span>
                <span className="px-2.5 py-1 bg-blue-600/10 border border-blue-500/20 rounded-full text-blue-400 font-bold text-[10px]">
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
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-[10px] text-gray-500">
                      <span>IP Address: <strong className="text-blue-400 font-semibold">{log.ip}</strong></span>
                      <span>{new Date(log.createdAt).toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="font-bold text-white text-sm">{log.name}</span>{" "}
                      <span className="text-gray-400 ml-1 sm:ml-1.5 font-medium break-all">&lt;{log.email}&gt;</span>
                    </div>
                    <p className="text-gray-300 bg-gray-900/30 p-3 rounded-lg border border-gray-850 leading-relaxed text-xs truncate max-w-full">
                      {log.message}
                    </p>
                    <div className="flex justify-end gap-2 pt-1">
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
                  <div className="text-center py-12 text-gray-500">
                    <i className="fas fa-inbox text-3xl mb-3 text-gray-700"></i>
                    <p>No messages received yet via the contact form.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Manage Settings / Admins Tab */}
        {activeTab === "settings" && (() => {
          // Password Strength Utility
          const getPasswordStrength = (pwd) => {
            if (!pwd) return { score: 0, label: "", color: "bg-gray-800", text: "text-gray-500" };
            let score = 0;
            if (pwd.length >= 8) score++;
            if (/[A-Z]/.test(pwd)) score++;
            if (/[0-9]/.test(pwd)) score++;
            if (/[^A-Za-z0-9]/.test(pwd)) score++;

            if (score <= 1) return { score: 25, label: "Weak Security", color: "bg-red-500", text: "text-red-400" };
            if (score === 2) return { score: 50, label: "Fair Security", color: "bg-amber-500", text: "text-amber-400" };
            if (score === 3) return { score: 75, label: "Good Security", color: "bg-blue-500", text: "text-blue-400" };
            return { score: 100, label: "Strong Security", color: "bg-emerald-500", text: "text-emerald-400" };
          };

          // Username Validation Utility
          const isUsernameValid = (uname) => {
            return /^[a-zA-Z0-9_-]*$/.test(uname);
          };

          // Avatar Theming Utility
          const getAvatarStyle = (name) => {
            const colors = [
              "bg-blue-900/40 text-blue-300 border-blue-500/20",
              "bg-teal-900/40 text-teal-300 border-teal-500/20",
              "bg-indigo-900/40 text-indigo-300 border-indigo-500/20",
              "bg-purple-900/40 text-purple-300 border-purple-500/20",
              "bg-rose-900/40 text-rose-300 border-rose-500/20",
              "bg-emerald-900/40 text-emerald-300 border-emerald-500/20",
              "bg-amber-900/40 text-amber-300 border-amber-500/20"
            ];
            let hash = 0;
            for (let i = 0; i < name.length; i++) {
              hash = name.charCodeAt(i) + ((hash << 5) - hash);
            }
            const index = Math.abs(hash) % colors.length;
            const initials = name.slice(0, 2).toUpperCase();
            return { classes: colors[index], initials };
          };

          const newPassStrength = getPasswordStrength(newPassword);
          const createPassStrength = getPasswordStrength(newAdminPassword);
          const isCreateUsernameValid = isUsernameValid(newAdminUsername);

          const filteredAdmins = adminsList.filter(u =>
            u.toLowerCase().includes(adminSearch.toLowerCase())
          );

          return (
            <div className="space-y-8 animate-fade-in">
              <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white font-heading">
                  Manage Administrator Accounts
                </h2>
                <p className="text-xs md:text-sm text-gray-400 mt-1">
                  Configure administrator login accounts and change passwords securely.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {/* Password Update Form */}
                <div className="bg-gray-900/40 border border-gray-800 p-5 md:p-8 rounded-2xl backdrop-blur-sm space-y-6">
                  <h3 className="text-xs md:text-sm font-bold text-white pb-3 border-b border-gray-800 flex items-center gap-2">
                    <i className="fas fa-lock text-blue-400"></i>
                    <span>Change My Password</span>
                  </h3>

                  <form onSubmit={handleChangePassword} className="space-y-4">
                    {/* Current Password */}
                    <div>
                      <label className="text-[10px] text-gray-400 uppercase font-semibold">Current Password</label>
                      <div className="relative mt-1.5">
                        <input
                          type={showCurrentPass ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full p-3 pr-10 bg-gray-950 border border-gray-800 text-white rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPass(!showCurrentPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition cursor-pointer text-xs"
                        >
                          <i className={`fas ${showCurrentPass ? "fa-eye-slash" : "fa-eye"}`} />
                        </button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="text-[10px] text-gray-400 uppercase font-semibold">New Password</label>
                      <div className="relative mt-1.5">
                        <input
                          type={showNewPass ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full p-3 pr-10 bg-gray-950 border border-gray-800 text-white rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPass(!showNewPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition cursor-pointer text-xs"
                        >
                          <i className={`fas ${showNewPass ? "fa-eye-slash" : "fa-eye"}`} />
                        </button>
                      </div>

                      {/* Password Strength Indicator */}
                      {newPassword.length > 0 && (
                        <div className="mt-2 space-y-1">
                          <div className="flex justify-between items-center text-[9px] font-bold">
                            <span className="text-gray-500">PASSWORD SECURITY:</span>
                            <span className={newPassStrength.text}>{newPassStrength.label}</span>
                          </div>
                          <div className="h-1 bg-gray-900 rounded-full overflow-hidden flex">
                            <div
                              className={`h-full transition-all duration-300 ${newPassStrength.color}`}
                              style={{ width: `${newPassStrength.score}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="text-[10px] text-gray-400 uppercase font-semibold">Confirm New Password</label>
                      <div className="relative mt-1.5">
                        <input
                          type={showConfirmPass ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full p-3 pr-10 bg-gray-950 border border-gray-800 text-white rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPass(!showConfirmPass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition cursor-pointer text-xs"
                        >
                          <i className={`fas ${showConfirmPass ? "fa-eye-slash" : "fa-eye"}`} />
                        </button>
                      </div>
                      {newPassword.length > 0 && confirmPassword.length > 0 && newPassword !== confirmPassword && (
                        <p className="text-[9px] text-rose-400 font-bold mt-1.5">
                          ⚠️ Passwords do not match.
                        </p>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading || (newPassword.length > 0 && newPassword !== confirmPassword)}
                        className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-xs font-bold transition cursor-pointer shadow-md shadow-blue-500/10"
                      >
                        Change Password
                      </button>
                    </div>
                  </form>
                </div>

                {/* Create New Admin Form */}
                <div className="bg-gray-900/40 border border-gray-800 p-5 md:p-8 rounded-2xl backdrop-blur-sm space-y-6">
                  <h3 className="text-xs md:text-sm font-bold text-white pb-3 border-b border-gray-800 flex items-center gap-2">
                    <i className="fas fa-user-plus text-green-400"></i>
                    <span>Create New Administrator</span>
                  </h3>

                  <form onSubmit={handleCreateAdmin} className="space-y-4">
                    {/* Username */}
                    <div>
                      <label className="text-[10px] text-gray-400 uppercase font-semibold">New Admin Username</label>
                      <input
                        type="text"
                        value={newAdminUsername}
                        onChange={(e) => setNewAdminUsername(e.target.value)}
                        className="w-full mt-1.5 p-3 bg-gray-950 border border-gray-800 text-white rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                        placeholder="e.g., john_doe"
                        required
                      />
                      {newAdminUsername.length > 0 && !isCreateUsernameValid && (
                        <p className="text-[9px] text-rose-400 font-bold mt-1.5">
                          ⚠️ Usernames can only contain letters, numbers, hyphens, and underscores.
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <label className="text-[10px] text-gray-400 uppercase font-semibold">Password</label>
                      <div className="relative mt-1.5">
                        <input
                          type={showCreatePass ? "text" : "password"}
                          value={newAdminPassword}
                          onChange={(e) => setNewAdminPassword(e.target.value)}
                          className="w-full p-3 pr-10 bg-gray-950 border border-gray-800 text-white rounded-lg text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowCreatePass(!showCreatePass)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition cursor-pointer text-xs"
                        >
                          <i className={`fas ${showCreatePass ? "fa-eye-slash" : "fa-eye"}`} />
                        </button>
                      </div>

                      {/* Password Strength Indicator */}
                      {newAdminPassword.length > 0 && (
                        <div className="mt-2 space-y-1">
                          <div className="flex justify-between items-center text-[9px] font-bold">
                            <span className="text-gray-500">PASSWORD SECURITY:</span>
                            <span className={createPassStrength.text}>{createPassStrength.label}</span>
                          </div>
                          <div className="h-1 bg-gray-900 rounded-full overflow-hidden flex">
                            <div
                              className={`h-full transition-all duration-300 ${createPassStrength.color}`}
                              style={{ width: `${createPassStrength.score}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading || !isCreateUsernameValid || newAdminUsername.length === 0}
                        className="w-full sm:w-auto px-5 py-2.5 bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-xs font-bold transition cursor-pointer shadow-md shadow-green-500/10"
                      >
                        Register Admin Account
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Active Admin List */}
              <div className="bg-gray-900/40 border border-gray-800 p-5 md:p-8 rounded-2xl backdrop-blur-sm space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-gray-800">
                  <h3 className="text-xs md:text-sm font-bold text-white flex items-center gap-2">
                    <i className="fas fa-users text-purple-400"></i>
                    <span>Active Admin Accounts</span>
                  </h3>

                  {/* Search filter bar */}
                  <div className="relative w-full sm:w-64">
                    <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-[10px]"></i>
                    <input
                      type="text"
                      value={adminSearch}
                      onChange={(e) => setAdminSearch(e.target.value)}
                      placeholder="Search accounts..."
                      className="w-full pl-7.5 pr-2.5 py-1.5 bg-gray-950 border border-gray-850 text-white rounded-lg text-[10px] focus:outline-none focus:border-purple-500 transition font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 scrollbar-none text-xs">
                  {filteredAdmins.map((username, index) => {
                    const isSelf = username.toLowerCase() === currentUser.toLowerCase();
                    const canDelete = !isSelf && adminsList.length > 1;
                    const avatar = getAvatarStyle(username);

                    return (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-gray-950/60 border border-gray-850 rounded-xl gap-2 hover:border-gray-800 transition"
                      >
                        <div className="flex items-center gap-3">
                          {/* Initials Avatar badge */}
                          <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs shrink-0 select-none ${avatar.classes}`}>
                            {avatar.initials}
                          </div>
                          <div>
                            <span className="font-semibold text-white break-all">{username}</span>
                            {isSelf && (
                              <span className="inline-block ml-2 px-2 py-0.5 bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[9px] rounded-full font-bold whitespace-nowrap">
                                Current User
                              </span>
                            )}
                          </div>
                        </div>

                        {canDelete ? (
                          <button
                            onClick={() => setAdminToDelete(username)}
                            disabled={loading}
                            className="px-3 py-1.5 bg-red-950/20 hover:bg-red-950/60 border border-red-900/10 text-red-500 hover:text-red-400 rounded-lg text-[10px] font-bold transition cursor-pointer shrink-0"
                          >
                            <i className="fas fa-trash-alt mr-1"></i>
                            Delete
                          </button>
                        ) : (
                          !isSelf && (
                            <span className="text-[10px] text-gray-500 italic text-right whitespace-nowrap">
                              Cannot delete last admin
                            </span>
                          )
                        )}
                      </div>
                    );
                  })}

                  {filteredAdmins.length === 0 && (
                    <p className="text-center text-xs text-gray-500 py-6">No matching administrators found.</p>
                  )}
                </div>
              </div>
            </div>
          );
        })()}
      </main>

      {/* CRM Lead Details Popup Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-800 flex justify-between items-start">
              <div>
                <h3 className="text-base font-bold text-white">CRM Lead Details</h3>
                <p className="text-[10px] text-gray-500 mt-0.5">{new Date(selectedLead.createdAt).toLocaleString()}</p>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-lg transition"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-950/60 rounded-xl border border-gray-850">
                  <span className="text-gray-500 font-semibold uppercase text-[9px] block">Submitter Name</span>
                  <span className="text-white font-bold text-sm block mt-0.5">{selectedLead.name}</span>
                </div>
                <div className="p-3 bg-gray-950/60 rounded-xl border border-gray-850">
                  <span className="text-gray-500 font-semibold uppercase text-[9px] block">Client IP Address</span>
                  <span className="text-blue-400 font-bold text-sm block mt-0.5">{selectedLead.ip}</span>
                </div>
              </div>

              <div className="p-3 bg-gray-950/60 rounded-xl border border-gray-850">
                <span className="text-gray-500 font-semibold uppercase text-[9px] block">Email Address</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-white font-semibold break-all">{selectedLead.email}</span>
                  <a
                    href={`mailto:${selectedLead.email}?subject=Reply from The Intelliverse`}
                    className="px-2.5 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[10px] font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    <i className="fas fa-envelope text-[9px]"></i>
                    Reply Mail
                  </a>
                </div>
              </div>

              <div className="p-4 bg-gray-950/60 rounded-xl border border-gray-850 space-y-1.5">
                <span className="text-gray-500 font-semibold uppercase text-[9px] block">Form Message</span>
                <p className="text-gray-200 leading-relaxed whitespace-pre-wrap break-words">{selectedLead.message}</p>
              </div>
            </div>

            <div className="p-6 border-t border-gray-800 bg-gray-950/40 flex justify-between gap-4">
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
      )}

          {/* Admin Delete Confirmation Modal */}
          {adminToDelete && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
              <div className="w-full max-w-sm bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-2xl text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-red-950/40 border border-red-500/20 text-red-500 flex items-center justify-center text-xl mx-auto animate-bounce">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <div className="space-y-1">
                  <h3 className="text-white font-bold text-sm">Delete Admin Account?</h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Are you sure you want to permanently delete the admin account for <strong className="text-white font-semibold">{adminToDelete}</strong>? This action cannot be undone.
                  </p>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setAdminToDelete(null)}
                    className="w-1/2 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold text-xs py-2 rounded-lg cursor-pointer transition text-center"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={async () => {
                      const target = adminToDelete;
                      setAdminToDelete(null);
                      await handleDeleteAdmin(target);
                    }}
                    className="w-1/2 bg-red-600 hover:bg-red-500 text-white font-bold text-xs py-2 rounded-lg cursor-pointer transition text-center font-bold"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      );
}
