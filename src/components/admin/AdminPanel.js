"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPanel({ isOpen, data, testimonials: initialTestimonials, projects: initialProjects, submissions: initialSubmissions, admins: initialAdmins, chatbotKnowledge: initialChatbotKnowledge, founders: initialFounders, currentUser, dbStatus }) {
  const router = useRouter();

  // --- Responsive mobile states ---
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- Active Tab State ---
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard | cms | team | projects | testimonials | chatbot | crm | settings

  // --- CMS Content States ---
  const [heroSubtitle, setHeroSubtitle] = useState(data.hero.subtitle);
  const [aboutP1, setAboutP1] = useState(data.about.p1);
  const [statsProjects, setStatsProjects] = useState(data.stats?.projects || 50);
  const [statsSatisfaction, setStatsSatisfaction] = useState(data.stats?.satisfaction || 100);
  const [statsClients, setStatsClients] = useState(data.stats?.clients || 30);

  // --- Dynamic Lists States ---
  const [testimonials, setTestimonials] = useState(initialTestimonials || []);
  const [projects, setProjects] = useState(initialProjects || []);
  const [founders, setFounders] = useState(initialFounders || []);
  const [selectedFounderIndex, setSelectedFounderIndex] = useState(initialFounders && initialFounders.length > 0 ? 0 : null);
  const [teamEditorTab, setTeamEditorTab] = useState("basic"); // basic | photo | socials
  const [isEditingMobile, setIsEditingMobile] = useState(false);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(initialProjects && initialProjects.length > 0 ? 0 : null);
  const [isEditingMobileProjects, setIsEditingMobileProjects] = useState(false);
  const [selectedTestimonialIndex, setSelectedTestimonialIndex] = useState(initialTestimonials && initialTestimonials.length > 0 ? 0 : null);
  const [isEditingMobileTestimonials, setIsEditingMobileTestimonials] = useState(false);
  const [selectedQAIndex, setSelectedQAIndex] = useState(initialChatbotKnowledge && initialChatbotKnowledge.length > 0 ? 0 : null);
  const [isEditingMobileQA, setIsEditingMobileQA] = useState(false);
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
    const newTest = { text: "", author: "" };
    setTestimonials([...testimonials, newTest]);
    setSelectedTestimonialIndex(testimonials.length);
    setIsEditingMobileTestimonials(true);
  };

  const handleTestimonialChange = (index, field, value) => {
    const updated = [...testimonials];
    updated[index][field] = value;
    setTestimonials(updated);
  };

  const handleDeleteTestimonial = (index) => {
    const updated = testimonials.filter((_, i) => i !== index);
    setTestimonials(updated);
    if (selectedTestimonialIndex === index) {
      const nextIndex = updated.length > 0 ? Math.max(0, index - 1) : null;
      setSelectedTestimonialIndex(nextIndex);
      if (nextIndex === null) {
        setIsEditingMobileTestimonials(false);
      }
    } else if (selectedTestimonialIndex > index) {
      setSelectedTestimonialIndex(selectedTestimonialIndex - 1);
    }
  };

  const handleMoveTestimonial = (index, direction) => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === testimonials.length - 1) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const updated = [...testimonials];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setTestimonials(updated);
    if (selectedTestimonialIndex === index) {
      setSelectedTestimonialIndex(targetIndex);
    } else if (selectedTestimonialIndex === targetIndex) {
      setSelectedTestimonialIndex(index);
    }
  };

  // --- Handlers for Founders ---
  const handleAddFounder = () => {
    const newFounder = { name: "", role: "", tagline: "", image: "", imageX: 50, imageY: 50, linkedin: "", instagram: "", order: founders.length + 1, customLinks: [] };
    setFounders([...founders, newFounder]);
    setSelectedFounderIndex(founders.length);
    setTeamEditorTab("basic");
    setIsEditingMobile(true);
  };

  const handleFounderChange = (index, field, value) => {
    const updated = founders.map((founder, i) => {
      if (i === index) {
        let parsedValue = value;
        if (field === "imageX" || field === "imageY" || field === "order") {
          const num = parseInt(value, 10);
          parsedValue = isNaN(num) ? (field === "order" ? 1 : 50) : num;
        }
        return { ...founder, [field]: parsedValue };
      }
      return founder;
    });
    setFounders(updated);
  };

  const handleDeleteFounder = (index) => {
    const updated = founders.filter((_, i) => i !== index);
    setFounders(updated);
    if (selectedFounderIndex === index) {
      const nextIndex = updated.length > 0 ? Math.max(0, index - 1) : null;
      setSelectedFounderIndex(nextIndex);
      if (nextIndex === null) {
        setIsEditingMobile(false);
      }
    } else if (selectedFounderIndex > index) {
      setSelectedFounderIndex(selectedFounderIndex - 1);
    }
  };

  const handleImageClick = (e, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;
    const pctX = Math.min(100, Math.max(0, Math.round((clickX / rect.width) * 100)));
    const pctY = Math.min(100, Math.max(0, Math.round((clickY / rect.height) * 100)));
    handleFounderChange(index, "imageX", pctX);
    handleFounderChange(index, "imageY", pctY);
  };

  const handleImageUpload = async (e, index) => {
    const file = e.target.files?.[0];
    if (!file) return;

    notify("Uploading image to server...", "info");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const json = await response.json();
      if (response.ok && json.url) {
        handleFounderChange(index, "image", json.url);
        notify("Image uploaded successfully!", "success");
      } else {
        notify(json.error || "Failed to upload image.", "error");
      }
    } catch (err) {
      console.error("Failed to upload image:", err);
      notify("Network error. Image upload failed.", "error");
    }
  };

  const handleMoveFounder = (index, direction) => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === founders.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const updated = [...founders];

    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;

    const resorted = updated.map((founder, i) => ({
      ...founder,
      order: i + 1
    }));

    setFounders(resorted);
    
    // Maintain selection index on the moved item
    if (selectedFounderIndex === index) {
      setSelectedFounderIndex(targetIndex);
    } else if (selectedFounderIndex === targetIndex) {
      setSelectedFounderIndex(index);
    }
  };

  const handleAddCustomLink = (founderIndex) => {
    const updated = [...founders];
    const currentLinks = updated[founderIndex].customLinks || [];
    updated[founderIndex] = {
      ...updated[founderIndex],
      customLinks: [...currentLinks, { name: "", url: "", icon: "fas fa-link" }]
    };
    setFounders(updated);
  };

  const handleCustomLinkChange = (founderIndex, linkIndex, field, value) => {
    const updated = [...founders];
    const currentLinks = [...(updated[founderIndex].customLinks || [])];
    currentLinks[linkIndex] = {
      ...currentLinks[linkIndex],
      [field]: value
    };
    updated[founderIndex] = {
      ...updated[founderIndex],
      customLinks: currentLinks
    };
    setFounders(updated);
  };

  const handleDeleteCustomLink = (founderIndex, linkIndex) => {
    const updated = [...founders];
    const currentLinks = (updated[founderIndex].customLinks || []).filter((_, i) => i !== linkIndex);
    updated[founderIndex] = {
      ...updated[founderIndex],
      customLinks: currentLinks
    };
    setFounders(updated);
  };

  const handleMoveCustomLink = (founderIndex, linkIndex, direction) => {
    const updated = [...founders];
    const currentLinks = [...(updated[founderIndex].customLinks || [])];
    if (direction === "up" && linkIndex === 0) return;
    if (direction === "down" && linkIndex === currentLinks.length - 1) return;

    const targetIndex = direction === "up" ? linkIndex - 1 : linkIndex + 1;
    const temp = currentLinks[linkIndex];
    currentLinks[linkIndex] = currentLinks[targetIndex];
    currentLinks[targetIndex] = temp;

    updated[founderIndex] = {
      ...updated[founderIndex],
      customLinks: currentLinks
    };
    setFounders(updated);
  };

  // --- Handlers for Projects ---
  const handleAddProject = () => {
    const newProj = { name: "", description: "", link: "", review: "", rating: 5, type: "", featureLink: "", featureText: "", features: [], techTags: [], tagline: "", isFeatured: false };
    setProjects([...projects, newProj]);
    setSelectedProjectIndex(projects.length);
    setIsEditingMobileProjects(true);
  };

  const handleProjectChange = (index, field, value) => {
    const updated = [...projects];
    if (field === "rating") {
      updated[index][field] = parseInt(value) || 5;
    } else if (field === "isFeatured") {
      updated[index][field] = !!value;
    } else {
      updated[index][field] = value;
    }
    setProjects(updated);
  };

  const handleDeleteProject = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    setProjects(updated);
    if (selectedProjectIndex === index) {
      const nextIndex = updated.length > 0 ? Math.max(0, index - 1) : null;
      setSelectedProjectIndex(nextIndex);
      if (nextIndex === null) {
        setIsEditingMobileProjects(false);
      }
    } else if (selectedProjectIndex > index) {
      setSelectedProjectIndex(selectedProjectIndex - 1);
    }
  };

  const handleMoveProject = (index, direction) => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === projects.length - 1) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const updated = [...projects];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setProjects(updated);
    if (selectedProjectIndex === index) {
      setSelectedProjectIndex(targetIndex);
    } else if (selectedProjectIndex === targetIndex) {
      setSelectedProjectIndex(index);
    }
  };

  // --- Handlers for Chatbot Q&A ---
  const handleAddQA = () => {
    const newQA = { keywords: "", response: "" };
    setChatbotKnowledge([...chatbotKnowledge, newQA]);
    setSelectedQAIndex(chatbotKnowledge.length);
    setIsEditingMobileQA(true);
  };

  const handleQAChange = (index, field, value) => {
    const updated = [...chatbotKnowledge];
    updated[index][field] = value;
    setChatbotKnowledge(updated);
  };

  const handleDeleteQA = (index) => {
    const updated = chatbotKnowledge.filter((_, i) => i !== index);
    setChatbotKnowledge(updated);
    if (selectedQAIndex === index) {
      const nextIndex = updated.length > 0 ? Math.max(0, index - 1) : null;
      setSelectedQAIndex(nextIndex);
      if (nextIndex === null) {
        setIsEditingMobileQA(false);
      }
    } else if (selectedQAIndex > index) {
      setSelectedQAIndex(selectedQAIndex - 1);
    }
  };

  const handleMoveQA = (index, direction) => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === chatbotKnowledge.length - 1) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const updated = [...chatbotKnowledge];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setChatbotKnowledge(updated);
    if (selectedQAIndex === index) {
      setSelectedQAIndex(targetIndex);
    } else if (selectedQAIndex === targetIndex) {
      setSelectedQAIndex(index);
    }
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
      chatbotKnowledge,
      founders
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
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
              <p className="text-[10px] text-gray-500 truncate mt-0.5 font-sans">Welcome, <strong className="text-blue-400 font-semibold">{currentUser}</strong></p>
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
              <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white font-mono uppercase">Dashboard Overview</h2>
              <p className="text-xs md:text-sm text-gray-400 mt-1">Real-time status metrics and statistics summary.</p>
            </div>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Metric 1 */}
              <div className="bg-gray-900/30 border border-white/5 hover:border-blue-500/25 p-5 md:p-6 rounded-2xl backdrop-blur-sm hover:shadow-[0_0_30px_rgba(59,102,241,0.05)] hover:bg-gray-900/50 transition-all duration-300 relative overflow-hidden group">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">Submissions (CRM Leads)</p>
                    <h3 className="text-2xl md:text-3xl font-black text-white mt-2 font-mono">{contactLogs.length}</h3>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/15 group-hover:scale-105 transition-transform duration-300 shadow-inner">
                    <i className="fas fa-address-book text-base md:text-lg"></i>
                  </div>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="bg-gray-900/30 border border-white/5 hover:border-purple-500/25 p-5 md:p-6 rounded-2xl backdrop-blur-sm hover:shadow-[0_0_30px_rgba(168,85,247,0.05)] hover:bg-gray-900/50 transition-all duration-300 relative overflow-hidden group">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">Worked Projects</p>
                    <h3 className="text-2xl md:text-3xl font-black text-white mt-2 font-mono">{projects.length}</h3>
                  </div>
                  <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400 border border-purple-500/15 group-hover:scale-105 transition-transform duration-300 shadow-inner">
                    <i className="fas fa-briefcase text-base md:text-lg"></i>
                  </div>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="bg-gray-900/30 border border-white/5 hover:border-emerald-500/25 p-5 md:p-6 rounded-2xl backdrop-blur-sm hover:shadow-[0_0_30px_rgba(16,185,129,0.05)] hover:bg-gray-900/50 transition-all duration-300 relative overflow-hidden group sm:col-span-2 lg:col-span-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">Testimonial Quotes</p>
                    <h3 className="text-2xl md:text-3xl font-black text-white mt-2 font-mono">{testimonials.length}</h3>
                  </div>
                  <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/15 group-hover:scale-105 transition-transform duration-300 shadow-inner">
                    <i className="fas fa-comments text-base md:text-lg"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Ingestion Trend SVG Graph */}
            <div className="bg-gray-900/30 border border-white/5 hover:border-blue-500/15 rounded-2xl p-5 md:p-6 backdrop-blur-sm transition-all duration-500 space-y-4">
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-2 font-mono uppercase tracking-wider">
                  <i className="fas fa-chart-line text-blue-400"></i>
                  <span>CRM Lead Ingestion Flow (Last 7 Days)</span>
                </h4>
                <p className="text-[10px] text-gray-400 mt-1">Timeline activity based on form submissions.</p>
              </div>

              <div className="relative pt-2">
                <svg className="w-full h-[130px] md:h-[150px] overflow-visible" viewBox={`0 0 ${chartWidth} ${chartHeight}`} preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
                      <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                    </linearGradient>
                    {/* SVG filter definition for a neon shadow glow */}
                    <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#3b82f6" floodOpacity="0.45" />
                    </filter>
                  </defs>
                  {/* Grid helper lines */}
                  <line x1="0" y1="10" x2={chartWidth} y2="10" stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="0" y1={chartHeight / 2} x2={chartWidth} y2={chartHeight / 2} stroke="#1e293b" strokeDasharray="3 3" />
                  <line x1="0" y1={chartHeight - 1} x2={chartWidth} y2={chartHeight - 1} stroke="rgba(255,255,255,0.06)" />

                  {/* Glowing Area Fill */}
                  {areaPath && <path d={areaPath} fill="url(#chartGrad)" className="animate-fade-in" />}

                  {/* Connection Line */}
                  {linePath && <path d={linePath} fill="none" stroke="#3b82f6" strokeWidth="2.5" filter="url(#neonGlow)" className="animate-fade-in" />}

                  {/* Dots / Interactive counts */}
                  {points.map((p, idx) => (
                    <g key={idx}>
                      <circle cx={p.x} cy={p.y} r="4.5" fill="#090514" stroke="#60a5fa" strokeWidth="2" className="cursor-crosshair transition hover:scale-125" />
                      {p.count > 0 && (
                        <text x={p.x} y={p.y - 12} fill="#93c5fd" fontSize="9" textAnchor="middle" fontWeight="bold" fontFamily="monospace">
                          {p.count}
                        </text>
                      )}
                    </g>
                  ))}
                </svg>
                {/* Horizontal Labels */}
                <div className="flex justify-between mt-3 px-0.5 text-[9px] text-gray-500 font-bold font-mono">
                  {trendData.map((p, idx) => (
                    <span key={idx} className="w-12 text-center break-words">{p.label}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Dashboard Quick Actions & Recent Activity split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

              {/* Quick Actions Panel */}
              <div className="bg-gray-900/30 border border-white/5 rounded-2xl p-5 md:p-6 backdrop-blur-sm space-y-4">
                <h4 className="text-xs font-bold text-white flex items-center gap-2 pb-3 border-b border-white/5 font-mono uppercase tracking-wider">
                  <i className="fas fa-bolt text-amber-400"></i>
                  <span>Quick Tasks</span>
                </h4>
                <div className="space-y-2 text-xs">
                  <button
                    onClick={() => {
                      setActiveTab("projects");
                      handleAddProject();
                    }}
                    className="w-full flex items-center justify-between p-3.5 bg-gray-950/40 hover:bg-blue-600/10 border border-white/5 hover:border-blue-500/20 text-gray-300 hover:text-blue-400 rounded-xl transition duration-300 cursor-pointer font-bold active:scale-[0.99]"
                  >
                    <span>Add Portfolio Entry</span>
                    <i className="fas fa-plus text-[10px]"></i>
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("testimonials");
                      handleAddTestimonial();
                    }}
                    className="w-full flex items-center justify-between p-3.5 bg-gray-950/40 hover:bg-purple-600/10 border border-white/5 hover:border-purple-500/20 text-gray-300 hover:text-purple-400 rounded-xl transition duration-300 cursor-pointer font-bold active:scale-[0.99]"
                  >
                    <span>Add Testimonial Quote</span>
                    <i className="fas fa-plus text-[10px]"></i>
                  </button>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className="w-full flex items-center justify-between p-3.5 bg-gray-950/40 hover:bg-emerald-600/10 border border-white/5 hover:border-emerald-500/20 text-gray-300 hover:text-emerald-400 rounded-xl transition duration-300 cursor-pointer font-bold active:scale-[0.99]"
                  >
                    <span>Register Administrator</span>
                    <i className="fas fa-user-plus text-[10px]"></i>
                  </button>
                </div>
              </div>

              {/* Recent Submissions Activity Feed */}
              <div className="lg:col-span-2 bg-gray-900/30 border border-white/5 rounded-2xl p-5 md:p-6 backdrop-blur-sm space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-white/5">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2 font-mono uppercase tracking-wider">
                    <i className="fas fa-history text-purple-400"></i>
                    <span>Recent Activity Feed</span>
                  </h4>
                  <button
                    onClick={() => setActiveTab("crm")}
                    className="text-[10px] text-blue-400 hover:text-blue-300 hover:underline font-bold uppercase tracking-wider"
                  >
                    View All Leads
                  </button>
                </div>

                <div className="space-y-3">
                  {contactLogs.slice(0, 3).map((log, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setSelectedLead(log);
                      }}
                      className="p-3.5 bg-gray-950/40 hover:bg-gray-950/80 border border-white/5 hover:border-gray-800 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition duration-300 active:scale-[0.99]"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-xs truncate max-w-[120px]">{log.name}</span>
                          <span className="text-[9px] text-gray-500 truncate max-w-[150px] font-mono">&lt;{log.email}&gt;</span>
                        </div>
                        <p className="text-[11px] text-gray-400 truncate mt-1 max-w-[250px] md:max-w-md">{log.message}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[9px] text-gray-500 block font-mono">{new Date(log.createdAt).toLocaleDateString()}</span>
                        <span className="text-[9px] px-2 py-0.5 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-full font-bold mt-1 inline-block">
                          New Lead
                        </span>
                      </div>
                    </div>
                  ))}

                  {contactLogs.length === 0 && (
                    <p className="text-center text-xs text-gray-500 py-8 italic">No recent activity received.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Diagnostic Detail */}
            <div className="bg-gray-900/30 border border-white/5 rounded-2xl p-5 md:p-6 backdrop-blur-sm space-y-4">
              <h4 className="text-xs font-bold text-white flex items-center gap-2 pb-3 border-b border-white/5 font-mono uppercase tracking-wider">
                <i className="fas fa-server text-gray-500"></i>
                <span>Database Connection Diagnostics</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="flex justify-between items-center p-3.5 bg-gray-950/40 border border-white/5 rounded-xl gap-2 hover:border-gray-850 transition duration-300">
                  <span className="text-gray-500 text-[10px] uppercase font-bold">Database:</span>
                  <span className={`font-bold ${dbStatus === "Connected" ? "text-green-400" : "text-amber-500"}`}>{dbStatus}</span>
                </div>
                <div className="flex justify-between items-center p-3.5 bg-gray-950/40 border border-white/5 rounded-xl gap-2 hover:border-gray-850 transition duration-300">
                  <span className="text-gray-500 text-[10px] uppercase font-bold">Node Env:</span>
                  <span className="font-bold text-white capitalize">{process.env.NODE_ENV}</span>
                </div>
                <div className="flex justify-between items-center p-3.5 bg-gray-950/40 border border-white/5 rounded-xl gap-2 hover:border-gray-850 transition duration-300">
                  <span className="text-gray-500 text-[10px] uppercase font-bold">Engine Host:</span>
                  <span className="font-bold text-blue-400 overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px] text-right" title="MongoDB Cluster">
                    {dbStatus === "Connected" ? "cluster0.qq3gxq0.mongodb.net" : "Memory Cache"}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3.5 bg-gray-950/40 border border-white/5 rounded-xl gap-2 hover:border-gray-850 transition duration-300">
                  <span className="text-gray-500 text-[10px] uppercase font-bold">Active Admin:</span>
                  <span className="font-bold text-white">{currentUser}</span>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
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

        {/* Team Members Tab */}
        {activeTab === "team" && (
          <div className="space-y-6 md:space-y-8 animate-fade-in">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">Team Members Editor</h2>
                <p className="text-xs md:text-sm text-gray-400 mt-1">Manage founders and team members, their roles, images, positions, and display order.</p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={handleAddFounder}
                  className="flex-grow sm:flex-grow-0 px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-green-500/10 active:scale-95"
                >
                  <i className="fas fa-plus"></i>
                  <span>Add Member</span>
                </button>
                <button
                  onClick={handleSaveCMS}
                  disabled={loading}
                  className="flex-grow sm:flex-grow-0 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/10 disabled:opacity-50 active:scale-95"
                >
                  <i className="fas fa-save"></i>
                  <span>Save Changes</span>
                </button>
              </div>
            </div>

            {/* Split Dual-Pane Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT SIDEBAR: Members list */}
              <div className={`lg:col-span-4 bg-gray-900/40 border border-gray-800 rounded-2xl p-4 md:p-5 backdrop-blur-sm space-y-4 transition-all duration-300 ${isEditingMobile ? "hidden lg:block animate-fade-out" : "block animate-fade-in"}`}>
                <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Member Cards ({founders.length})</h3>
                  {founders.length > 0 && (
                    <span className="text-[10px] text-gray-500 font-mono">Select to Edit</span>
                  )}
                </div>

                <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1 scrollbar-none">
                  {founders.map((founder, index) => {
                    const isSelected = selectedFounderIndex === index;
                    const imageX = founder.imageX !== undefined ? founder.imageX : 50;
                    const imageY = founder.imageY !== undefined ? founder.imageY : 50;
                    const avatarImg = founder.image || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedFounderIndex(index);
                          setIsEditingMobile(true);
                        }}
                        className={`group/item p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all duration-300 hover:scale-[1.01] relative select-none ${
                          isSelected
                            ? "bg-blue-600/10 border-blue-500/35 shadow-lg shadow-blue-500/5"
                            : "bg-gray-950/30 border-gray-855 hover:border-gray-700/60 hover:bg-gray-950/70"
                        }`}
                      >
                        {/* Selected Indicator Bar */}
                        {isSelected && (
                          <div className="absolute left-0 top-3.5 bottom-3.5 w-1 bg-blue-500 rounded-r-md"></div>
                        )}

                        <div className="flex items-center gap-3 min-w-0">
                          {/* Mini Cropped Avatar */}
                          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 shrink-0 bg-gray-900 shadow-inner">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={avatarImg}
                              alt={founder.name || "Avatar"}
                              className="w-full h-full object-cover"
                              style={{ objectPosition: `${imageX}% ${imageY}%` }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
                              }}
                            />
                          </div>
                          
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-white truncate max-w-[120px] sm:max-w-none">
                              {founder.name || <span className="text-gray-600 italic">Unnamed Member</span>}
                            </h4>
                            <p className="text-[10px] text-gray-500 font-mono truncate mt-0.5 max-w-[120px] sm:max-w-none">
                              {founder.role || <span className="text-gray-600 italic">No role specified</span>}
                            </p>
                          </div>
                        </div>

                        {/* Controls (Move & Delete) */}
                        <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover/item:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveFounder(index, "up");
                            }}
                            disabled={index === 0}
                            className="w-6 h-6 rounded bg-gray-900/60 hover:bg-gray-805 hover:text-blue-400 disabled:opacity-10 text-gray-400 text-[10px] flex items-center justify-center border border-gray-850 hover:border-gray-700 transition active:scale-90"
                            title="Move Up"
                          >
                            <i className="fas fa-chevron-up"></i>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveFounder(index, "down");
                            }}
                            disabled={index === founders.length - 1}
                            className="w-6 h-6 rounded bg-gray-900/60 hover:bg-gray-805 hover:text-blue-400 disabled:opacity-10 text-gray-400 text-[10px] flex items-center justify-center border border-gray-855 hover:border-gray-700 transition active:scale-90"
                            title="Move Down"
                          >
                            <i className="fas fa-chevron-down"></i>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteFounder(index);
                            }}
                            className="w-6 h-6 rounded bg-red-950/10 hover:bg-red-950/45 text-red-500 hover:text-red-400 text-[10px] flex items-center justify-center border border-red-900/10 hover:border-red-900/30 transition ml-1 active:scale-90"
                            title="Delete Card"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>

                        {/* Order badge */}
                        <div className="absolute right-2.5 top-1.5 text-[8px] font-mono text-gray-600">
                          #{founder.order || index + 1}
                        </div>
                      </div>
                    );
                  })}

                  {founders.length === 0 && (
                    <div className="text-center py-10 border border-dashed border-gray-850 rounded-xl bg-gray-950/20">
                      <i className="fas fa-users-slash text-gray-600 text-lg mb-2 block"></i>
                      <p className="text-[11px] text-gray-500">No members configured.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT DETAIL PANEL */}
              <div className={`lg:col-span-8 space-y-6 transition-all duration-300 ${isEditingMobile ? "block animate-fade-in" : "hidden lg:block"}`}>
                {selectedFounderIndex !== null && founders[selectedFounderIndex] ? (
                  (() => {
                    const index = selectedFounderIndex;
                    const founder = founders[index];
                    const imageX = founder.imageX !== undefined ? founder.imageX : 50;
                    const imageY = founder.imageY !== undefined ? founder.imageY : 50;
                    const previewImg = founder.image || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

                    return (
                      <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5 md:p-6 backdrop-blur-sm space-y-6 relative transition-all duration-300">
                        {/* Mobile Back Button */}
                        <div className="lg:hidden">
                          <button
                            type="button"
                            onClick={() => setIsEditingMobile(false)}
                            className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white px-3.5 py-2 rounded-xl bg-gray-950 border border-gray-850 active:scale-95 transition"
                          >
                            <i className="fas fa-arrow-left"></i>
                            <span>Back to Members List</span>
                          </button>
                        </div>

                        {/* Detail Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-800 gap-3">
                          <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-full shrink-0">
                              {/* Outer glowing ring */}
                              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 opacity-60 blur-sm"></div>
                              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20 bg-gray-950 shadow-inner z-10">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={previewImg}
                                  alt="Active edit thumbnail"
                                  className="w-full h-full object-cover"
                                  style={{ objectPosition: `${imageX}% ${imageY}%` }}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
                                  }}
                                />
                              </div>
                            </div>
                            <div className="text-left">
                              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <span>Editing: {founder.name || "New Team Member"}</span>
                                <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full font-mono font-bold">
                                  INDEX #{index + 1}
                                </span>
                              </h3>
                              <p className="text-[10px] text-gray-500 mt-0.5">Customize basic details, socials, and positioning crop settings below.</p>
                            </div>
                          </div>
                        </div>

                        {/* Tab Buttons Selection */}
                        <div className="flex border border-gray-800 bg-gray-950/60 p-1 rounded-xl shadow-inner gap-1">
                          {[
                            { id: "basic", label: "Basic Info", icon: "fa-user-circle" },
                            { id: "photo", label: "Photo & Crop", icon: "fa-image" },
                            { id: "socials", label: "Socials & Buttons", icon: "fa-share-alt" },
                          ].map((tab) => (
                            <button
                              key={tab.id}
                              type="button"
                              onClick={() => setTeamEditorTab(tab.id)}
                              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold rounded-lg transition-all duration-300 cursor-pointer ${
                                teamEditorTab === tab.id
                                  ? "bg-blue-600/10 text-blue-400 shadow-md border border-blue-500/20"
                                  : "text-gray-500 hover:text-gray-300 hover:bg-gray-900/30 border border-transparent"
                              }`}
                            >
                              <i className={`fas ${tab.icon} text-xs`}></i>
                              <span>{tab.label}</span>
                            </button>
                          ))}
                        </div>

                        {/* TAB CONTENT: Basic Info */}
                        {teamEditorTab === "basic" && (
                          <div className="space-y-4 animate-fade-in text-left">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="text-[10px] text-gray-400 uppercase font-semibold">Name</label>
                                <input
                                  type="text"
                                  value={founder.name}
                                  onChange={(e) => handleFounderChange(index, "name", e.target.value)}
                                  className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-lg text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600"
                                  placeholder="Member Full Name"
                                  required
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-gray-400 uppercase font-semibold">Role / Job Title</label>
                                <input
                                  type="text"
                                  value={founder.role}
                                  onChange={(e) => handleFounderChange(index, "role", e.target.value)}
                                  className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-855 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-lg text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600"
                                  placeholder="e.g., Co-founder & CTO"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <label className="text-[10px] text-gray-400 uppercase font-semibold">Tagline / Mission Statement</label>
                              <input
                                type="text"
                                value={founder.tagline || ""}
                                onChange={(e) => handleFounderChange(index, "tagline", e.target.value)}
                                className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-lg text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600"
                                placeholder="Visionary tagline shown on hover (e.g. Engineering scalable systems...)"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label className="text-[10px] text-gray-400 uppercase font-semibold">Order Index Weight</label>
                                <input
                                  type="number"
                                  min="1"
                                  value={founder.order || index + 1}
                                  onChange={(e) => handleFounderChange(index, "order", e.target.value)}
                                  className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-lg text-xs focus:outline-none transition"
                                />
                              </div>
                              <div className="flex items-end pb-1.5">
                                <p className="text-[10px] text-gray-500 leading-normal">
                                  Weights control list ordering on landing. Use list Chevrons to adjust automatically.
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* TAB CONTENT: Photo & Crop */}
                        {teamEditorTab === "photo" && (
                          <div className="space-y-6 animate-fade-in text-left">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="text-[10px] text-gray-400 uppercase font-semibold">Image Asset Path / URL</label>
                                <input
                                  type="text"
                                  value={founder.image}
                                  onChange={(e) => handleFounderChange(index, "image", e.target.value)}
                                  className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-855 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-lg text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600"
                                  placeholder="e.g., /founder_dhruvil.jpg"
                                />
                              </div>
                              <div>
                                <label className="text-[10px] text-gray-400 uppercase font-semibold block">Upload Local Image File</label>
                                <DragDropZone index={index} onUploadSuccess={(url) => handleFounderChange(index, "image", url)} notify={notify} />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-800 pt-5">
                              {/* Left side: interactive position tagger */}
                              <div className="space-y-3">
                                <div>
                                  <label className="text-[10px] text-gray-400 uppercase font-semibold block">Interactive Focal Center Alignment</label>
                                  <span className="text-[9px] text-gray-500 block leading-normal mt-0.5">Click directly on the subject&apos;s face/center inside the photo below.</span>
                                </div>
                                
                                <div 
                                  onClick={(e) => handleImageClick(e, index)}
                                  className="relative w-44 h-44 mx-auto bg-gray-950 border border-gray-805 rounded-2xl overflow-hidden cursor-crosshair group/crop select-none shadow-xl shadow-black/40 flex items-center justify-center active:scale-[0.98] transition-transform duration-100"
                                >
                                  {founder.image ? (
                                    <>
                                      {/* eslint-disable-next-line @next/next/no-img-element */}
                                      <img 
                                        src={founder.image} 
                                        alt="Focal target aligner canvas"
                                        className="w-full h-full object-cover pointer-events-none select-none"
                                        onError={(e) => {
                                          e.target.onerror = null;
                                          e.target.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
                                        }}
                                      />
                                      {/* Visual grid overlay helpers (Rule of thirds) */}
                                      <div className="absolute inset-0 bg-black/10 group-hover/crop:bg-transparent transition duration-300 pointer-events-none" />
                                      <div className="absolute left-1/3 top-0 bottom-0 w-[1px] bg-white/15 pointer-events-none border-dashed border-white/5" />
                                      <div className="absolute left-2/3 top-0 bottom-0 w-[1px] bg-white/15 pointer-events-none border-dashed border-white/5" />
                                      <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-white/15 pointer-events-none border-dashed border-white/5" />
                                      <div className="absolute top-2/3 left-0 right-0 h-[1px] bg-white/15 pointer-events-none border-dashed border-white/5" />
                                      
                                      {/* Targeting crosshair circle */}
                                      <div 
                                        className="absolute w-8 h-8 -ml-4 -mt-4 rounded-full border-2 border-dashed border-blue-400 bg-blue-500/15 shadow-[0_0_20px_rgba(59,130,246,0.85)] flex items-center justify-center pointer-events-none transition-all duration-200"
                                        style={{ left: `${imageX}%`, top: `${imageY}%` }}
                                      >
                                        <div className="absolute inset-0 rounded-full border border-blue-400/40 animate-ping opacity-60"></div>
                                        <div className="w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_8px_rgba(59,130,246,1)]" />
                                        <div className="absolute bottom-9 bg-gray-900/90 border border-blue-500/30 text-blue-400 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold whitespace-nowrap shadow-md">
                                          X:{imageX}% Y:{imageY}%
                                        </div>
                                      </div>
                                    </>
                                  ) : (
                                    <div className="p-4 flex flex-col items-center justify-center text-center space-y-1.5 pointer-events-none w-full h-full bg-gray-950">
                                      <i className="fas fa-image text-gray-600 text-lg"></i>
                                      <span className="text-[10px] text-gray-400 uppercase font-semibold tracking-wider">No Image Loaded</span>
                                      <span className="text-[9px] text-gray-600 leading-normal">
                                        Configure an image path or upload one to position it.
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Right side: Sliders and live Crop Preview */}
                              <div className="flex flex-col justify-between space-y-4">
                                <div className="space-y-3.5">
                                  <div className="space-y-1.5">
                                    <div className="flex justify-between text-[9px] font-bold font-mono text-gray-400">
                                      <span>Horizontal Shift (X Offset)</span>
                                      <span className="text-blue-400">{imageX}%</span>
                                    </div>
                                    <input 
                                      type="range" 
                                      min="0" 
                                      max="100" 
                                      value={imageX} 
                                      onChange={(e) => handleFounderChange(index, "imageX", e.target.value)}
                                      className="w-full h-1 bg-gray-950 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                    />
                                  </div>
                                  <div className="space-y-1.5">
                                    <div className="flex justify-between text-[9px] font-bold font-mono text-gray-400">
                                      <span>Vertical Shift (Y Offset)</span>
                                      <span className="text-blue-400">{imageY}%</span>
                                    </div>
                                    <input 
                                      type="range" 
                                      min="0" 
                                      max="100" 
                                      value={imageY} 
                                      onChange={(e) => handleFounderChange(index, "imageY", e.target.value)}
                                      className="w-full h-1 bg-gray-950 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                    />
                                  </div>
                                </div>

                                {/* Live Circular preview matching Team card avatar styles */}
                                <div className="bg-gray-950/50 p-3.5 border border-gray-850 rounded-xl flex items-center gap-3">
                                  <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500/20 shrink-0 bg-gray-950 shadow-inner">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img 
                                      src={previewImg} 
                                      alt="Circular preview avatar cropped" 
                                      className="w-full h-full object-cover transition-all duration-150"
                                      style={{ objectPosition: `${imageX}% ${imageY}%` }}
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
                                      }}
                                    />
                                  </div>
                                  <div className="min-w-0">
                                    <span className="text-[10px] text-gray-300 uppercase font-bold tracking-wider block text-left">Clipped Avatar Preview</span>
                                    <span className="text-[9px] text-gray-500 block leading-normal mt-0.5 text-left">This matches the exact size and crop position that will render on the home page.</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* TAB CONTENT: Socials & Custom Buttons */}
                        {teamEditorTab === "socials" && (
                          <div className="space-y-5 animate-fade-in text-left">
                            <div className="bg-gray-950/20 p-4 border border-gray-850 rounded-xl space-y-4">
                              <div className="flex items-center gap-2 pb-2 border-b border-gray-850 text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                                <i className="fas fa-share-alt"></i>
                                <span>Social Accounts</span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="text-[10px] text-gray-400 uppercase font-semibold">LinkedIn Profile URL</label>
                                  <input
                                    type="url"
                                    value={founder.linkedin || ""}
                                    onChange={(e) => handleFounderChange(index, "linkedin", e.target.value)}
                                    className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white rounded-lg text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600"
                                    placeholder="https://linkedin.com/in/username"
                                  />
                                </div>
                                <div>
                                  <label className="text-[10px] text-gray-400 uppercase font-semibold">Instagram Profile URL</label>
                                  <input
                                    type="url"
                                    value={founder.instagram || ""}
                                    onChange={(e) => handleFounderChange(index, "instagram", e.target.value)}
                                    className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white rounded-lg text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600"
                                    placeholder="https://instagram.com/username"
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="bg-gray-950/20 p-4 border border-gray-850 rounded-xl space-y-4">
                              <div className="flex items-center justify-between pb-2 border-b border-gray-850">
                                <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                                  <i className="fas fa-link"></i>
                                  <span>Custom Action Buttons (Optional)</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleAddCustomLink(index)}
                                  className="px-2.5 py-1 bg-emerald-600/10 hover:bg-emerald-600/20 border border-emerald-500/20 text-emerald-400 rounded text-[9px] font-bold transition flex items-center gap-1 cursor-pointer active:scale-95"
                                >
                                  <i className="fas fa-plus"></i>
                                  <span>Add Button</span>
                                </button>
                              </div>

                              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1 scrollbar-none">
                                {(founder.customLinks || []).map((link, lIdx) => (
                                  <div key={lIdx} className="p-3 bg-gray-950/40 border border-gray-855 rounded-xl space-y-3 relative group/link-item animate-fade-in">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[9px] font-mono text-gray-500 font-bold">BUTTON #{lIdx + 1}</span>
                                      <div className="flex items-center gap-1">
                                        <button
                                          type="button"
                                          onClick={() => handleMoveCustomLink(index, lIdx, "up")}
                                          disabled={lIdx === 0}
                                          className="w-5 h-5 rounded bg-gray-900/60 hover:bg-gray-850 hover:text-blue-400 disabled:opacity-20 text-gray-400 text-[9px] flex items-center justify-center border border-gray-800 transition active:scale-90"
                                          title="Move Up"
                                        >
                                          <i className="fas fa-chevron-up"></i>
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => handleMoveCustomLink(index, lIdx, "down")}
                                          disabled={lIdx === (founder.customLinks || []).length - 1}
                                          className="w-5 h-5 rounded bg-gray-900/60 hover:bg-gray-850 hover:text-blue-400 disabled:opacity-20 text-gray-400 text-[9px] flex items-center justify-center border border-gray-800 transition active:scale-90"
                                          title="Move Down"
                                        >
                                          <i className="fas fa-chevron-down"></i>
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => handleDeleteCustomLink(index, lIdx)}
                                          className="w-5 h-5 rounded bg-red-950/10 hover:bg-red-950/45 text-red-500 hover:text-red-400 text-[9px] flex items-center justify-center border border-red-900/10 hover:border-red-900/30 transition ml-1 active:scale-90"
                                          title="Delete Button"
                                        >
                                          <i className="fas fa-trash-alt"></i>
                                        </button>
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                      <div>
                                        <label className="text-[9px] text-gray-500 uppercase font-semibold">Button Label Name</label>
                                        <input
                                          type="text"
                                          value={link.name}
                                          onChange={(e) => handleCustomLinkChange(index, lIdx, "name", e.target.value)}
                                          className="w-full mt-1 p-2 bg-gray-950 border border-gray-850 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-white rounded-lg text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600 font-bold"
                                          placeholder="e.g., GitHub, Portfolio"
                                          required
                                        />
                                      </div>
                                      <div className="sm:col-span-2">
                                        <label className="text-[9px] text-gray-500 uppercase font-semibold">Button Redirect URL</label>
                                        <input
                                          type="url"
                                          value={link.url}
                                          onChange={(e) => handleCustomLinkChange(index, lIdx, "url", e.target.value)}
                                          className="w-full mt-1 p-2 bg-gray-950 border border-gray-850 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-white rounded-lg text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600"
                                          placeholder="https://example.com"
                                          required
                                        />
                                      </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                                      <div className="sm:col-span-2">
                                        <label className="text-[9px] text-gray-500 uppercase font-semibold">FontAwesome Icon Class</label>
                                        <input
                                          type="text"
                                          value={link.icon}
                                          onChange={(e) => handleCustomLinkChange(index, lIdx, "icon", e.target.value)}
                                          className="w-full mt-1 p-2 bg-gray-950 border border-gray-850 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 text-white rounded-lg text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600 font-mono"
                                          placeholder="e.g., fab fa-github"
                                        />
                                      </div>
                                      <div className="flex items-center gap-3">
                                        {/* Icon Preview */}
                                        <div className="w-9 h-9 rounded-lg bg-gray-950 border border-gray-850 flex items-center justify-center text-gray-400 shrink-0 shadow-inner">
                                          <i className={`${link.icon || "fas fa-link"} text-xs`}></i>
                                        </div>
                                        {/* Icon Suggestions Quick-Clicks */}
                                        <div className="flex flex-wrap gap-1">
                                          {[
                                            { icon: "fab fa-github", title: "GitHub" },
                                            { icon: "fas fa-globe", title: "Website" },
                                            { icon: "fas fa-file-pdf", title: "Resume" },
                                            { icon: "fas fa-envelope", title: "Mail" },
                                          ].map((sug) => (
                                            <button
                                              key={sug.icon}
                                              type="button"
                                              onClick={() => handleCustomLinkChange(index, lIdx, "icon", sug.icon)}
                                              className="p-1 text-[10px] text-gray-500 hover:text-white bg-gray-900 border border-gray-850 rounded hover:border-gray-700 transition"
                                              title={sug.title}
                                            >
                                              <i className={sug.icon}></i>
                                            </button>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}

                                {(founder.customLinks || []).length === 0 && (
                                  <div className="text-center py-6 border border-dashed border-gray-850 rounded-xl bg-gray-950/20">
                                    <i className="fas fa-link text-gray-600 text-base mb-1 block"></i>
                                    <p className="text-[10px] text-gray-500">No custom buttons added. Click &quot;Add Button&quot; above to create one.</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })()
                ) : (
                  <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-10 md:p-16 backdrop-blur-sm flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-2xl shadow-inner">
                      <i className="fas fa-users"></i>
                    </div>
                    <div className="max-w-xs space-y-1">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">No Member Selected</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Select an existing team member card from the list on the left to begin editing their information, or add a new card.
                      </p>
                    </div>
                    <button
                      onClick={handleAddFounder}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-blue-500/10 cursor-pointer active:scale-95"
                    >
                      <i className="fas fa-plus mr-1.5"></i>
                      Add New Member
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Projects Portfolio Tab */}
        {activeTab === "projects" && (
          <div className="space-y-6 md:space-y-8 animate-fade-in">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">Worked Projects Portfolio</h2>
                <p className="text-xs md:text-sm text-gray-400 mt-1">Manage Worked Projects and their highlights, taglines, ratings, and features.</p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={handleAddProject}
                  className="flex-grow sm:flex-grow-0 px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-green-500/10 active:scale-95"
                >
                  <i className="fas fa-plus"></i>
                  <span>Add Project</span>
                </button>
                <button
                  onClick={handleSaveCMS}
                  disabled={loading}
                  className="flex-grow sm:flex-grow-0 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/10 disabled:opacity-50 active:scale-95"
                >
                  <i className="fas fa-save"></i>
                  <span>Save Changes</span>
                </button>
              </div>
            </div>

            {/* Split Dual-Pane Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT SIDEBAR: Projects list */}
              <div className={`lg:col-span-4 bg-gray-900/40 border border-gray-800 rounded-2xl p-4 md:p-5 backdrop-blur-sm space-y-4 transition-all duration-300 ${isEditingMobileProjects ? "hidden lg:block animate-fade-out" : "block animate-fade-in"}`}>
                <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Project Cards ({projects.length})</h3>
                  {projects.length > 0 && (
                    <span className="text-[10px] text-gray-500 font-mono">Select to Edit</span>
                  )}
                </div>

                <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1 scrollbar-none">
                  {projects.map((proj, index) => {
                    const isSelected = selectedProjectIndex === index;

                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedProjectIndex(index);
                          setIsEditingMobileProjects(true);
                        }}
                        className={`group/item p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all duration-300 hover:scale-[1.01] relative select-none ${
                          isSelected
                            ? "bg-blue-600/10 border-blue-500/35 shadow-lg shadow-blue-500/5"
                            : "bg-gray-950/30 border-gray-855 hover:border-gray-700/60 hover:bg-gray-950/70"
                        }`}
                      >
                        {/* Selected Indicator Bar */}
                        {isSelected && (
                          <div className="absolute left-0 top-3.5 bottom-3.5 w-1 bg-blue-500 rounded-r-md"></div>
                        )}

                        <div className="flex items-center gap-3 min-w-0">
                          {/* Folder/Briefcase Icon */}
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 bg-gray-900 shadow-inner ${proj.isFeatured ? "text-amber-400 border-amber-500/20" : "text-blue-400 border-white/10"}`}>
                            <i className={`fas ${proj.isFeatured ? "fa-star" : "fa-briefcase"} text-sm`}></i>
                          </div>
                          
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-white truncate max-w-[120px] sm:max-w-none">
                              {proj.name || <span className="text-gray-600 italic">Unnamed Project</span>}
                            </h4>
                            <p className="text-[10px] text-gray-500 font-mono truncate mt-0.5 max-w-[120px] sm:max-w-none">
                              {proj.type || <span className="text-gray-600 italic">No type selected</span>}
                            </p>
                          </div>
                        </div>

                        {/* Controls (Move & Delete) */}
                        <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover/item:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveProject(index, "up");
                            }}
                            disabled={index === 0}
                            className="w-6 h-6 rounded bg-gray-900/60 hover:bg-gray-805 hover:text-blue-400 disabled:opacity-10 text-gray-400 text-[10px] flex items-center justify-center border border-gray-850 hover:border-gray-700 transition active:scale-90"
                            title="Move Up"
                          >
                            <i className="fas fa-chevron-up"></i>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveProject(index, "down");
                            }}
                            disabled={index === projects.length - 1}
                            className="w-6 h-6 rounded bg-gray-900/60 hover:bg-gray-805 hover:text-blue-400 disabled:opacity-10 text-gray-400 text-[10px] flex items-center justify-center border border-gray-855 hover:border-gray-700 transition active:scale-90"
                            title="Move Down"
                          >
                            <i className="fas fa-chevron-down"></i>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteProject(index);
                            }}
                            className="w-6 h-6 rounded bg-red-950/10 hover:bg-red-950/45 text-red-500 hover:text-red-400 text-[10px] flex items-center justify-center border border-red-900/10 hover:border-red-900/30 transition ml-1 active:scale-90"
                            title="Delete Card"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>

                        {/* Featured badge */}
                        {proj.isFeatured && (
                          <div className="absolute right-2.5 top-1.5 text-[8px] font-mono text-amber-500 font-bold uppercase tracking-wider">
                            ★ Featured
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {projects.length === 0 && (
                    <div className="text-center py-10 border border-dashed border-gray-855 rounded-xl bg-gray-950/20">
                      <i className="fas fa-folder-open text-gray-600 text-lg mb-2 block"></i>
                      <p className="text-[11px] text-gray-500">No projects configured.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT DETAIL PANEL */}
              <div className={`lg:col-span-8 space-y-6 transition-all duration-300 ${isEditingMobileProjects ? "block animate-fade-in" : "hidden lg:block"}`}>
                {selectedProjectIndex !== null && projects[selectedProjectIndex] ? (
                  (() => {
                    const index = selectedProjectIndex;
                    const proj = projects[index];

                    return (
                      <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5 md:p-6 backdrop-blur-sm space-y-6 relative transition-all duration-300">
                        {/* Mobile Back Button */}
                        <div className="lg:hidden">
                          <button
                            type="button"
                            onClick={() => setIsEditingMobileProjects(false)}
                            className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white px-3.5 py-2 rounded-xl bg-gray-950 border border-gray-850 active:scale-95 transition"
                          >
                            <i className="fas fa-arrow-left"></i>
                            <span>Back to Projects List</span>
                          </button>
                        </div>

                        {/* Detail Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-800 gap-3">
                          <div className="flex items-center gap-3">
                            <div className={`relative w-12 h-12 rounded-xl shrink-0 flex items-center justify-center border bg-gray-950 shadow-inner z-10 ${proj.isFeatured ? "text-amber-400 border-amber-500/20 animate-pulse" : "text-blue-400 border-blue-500/20"}`}>
                              <i className={`fas ${proj.isFeatured ? "fa-star animate-pulse" : "fa-folder-open"} text-base`}></i>
                            </div>
                            <div className="text-left">
                              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <span>Editing: {proj.name || "New Project Entry"}</span>
                                <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full font-mono font-bold">
                                  INDEX #{index + 1}
                                </span>
                              </h3>
                              <p className="text-[10px] text-gray-500 mt-0.5">Customize project tech stack tags, reviews, walkthrough parameters, and metrics.</p>
                            </div>
                          </div>
                        </div>

                        {/* Form Inputs Grid */}
                        <div className="space-y-4 text-left">
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                              <label className="text-[10px] text-gray-400 uppercase font-semibold">Project Name</label>
                              <input
                                type="text"
                                value={proj.name}
                                onChange={(e) => handleProjectChange(index, "name", e.target.value)}
                                className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-lg text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600"
                                placeholder="e.g., Appointory Portal"
                                required
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-gray-400 uppercase font-semibold">Working Link URL</label>
                              <input
                                type="url"
                                value={proj.link}
                                onChange={(e) => handleProjectChange(index, "link", e.target.value)}
                                className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-lg text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600"
                                placeholder="https://appointory.in"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-gray-400 uppercase font-semibold">Project Category Type</label>
                              <select
                                value={proj.type || ""}
                                onChange={(e) => handleProjectChange(index, "type", e.target.value)}
                                className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-lg text-xs focus:outline-none transition-all duration-300 cursor-pointer text-gray-300"
                              >
                                <option value="">Select Category...</option>
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
                            <label className="text-[10px] text-gray-400 uppercase font-semibold">Project Description</label>
                            <textarea
                              value={proj.description}
                              onChange={(e) => handleProjectChange(index, "description", e.target.value)}
                              className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-lg text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600"
                              placeholder="Describe target user, tech stack, key highlights and development processes..."
                              rows="3"
                              required
                            ></textarea>
                          </div>

                          {/* Featured Toggle + Tagline */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-855 pt-4">
                            <div className="flex items-center gap-3 pt-4 select-none">
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={proj.isFeatured || false}
                                  onChange={(e) => handleProjectChange(index, "isFeatured", e.target.checked)}
                                  className="sr-only peer"
                                />
                                <div className="w-9 h-5 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                              </label>
                              <span className="text-[10px] text-gray-400 uppercase font-semibold">★ Featured Project</span>
                            </div>
                            <div className="sm:col-span-2">
                              <label className="text-[10px] text-gray-400 uppercase font-semibold">Card Tagline Footer</label>
                              <input
                                type="text"
                                value={proj.tagline || ""}
                                onChange={(e) => handleProjectChange(index, "tagline", e.target.value)}
                                className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-lg text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600 font-mono text-blue-400"
                                placeholder="e.g. // DIGITAL HEALTHCARE"
                              />
                            </div>
                          </div>

                          {/* Walkthrough/Feature link */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-850 pt-4">
                            <div>
                              <label className="text-[10px] text-gray-400 uppercase font-semibold">Custom Walkthrough Link (Optional)</label>
                              <input
                                type="url"
                                value={proj.featureLink || ""}
                                onChange={(e) => handleProjectChange(index, "featureLink", e.target.value)}
                                className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-lg text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600"
                                placeholder="e.g., https://appointory.in/#features"
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-gray-400 uppercase font-semibold">Walkthrough Button Label Text</label>
                              <input
                                type="text"
                                value={proj.featureText || ""}
                                onChange={(e) => handleProjectChange(index, "featureText", e.target.value)}
                                className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-lg text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600"
                                placeholder="e.g., See How It Works"
                              />
                            </div>
                          </div>

                          {/* Tech Tags */}
                          <div className="border-t border-gray-850 pt-4">
                            <label className="text-[10px] text-gray-400 uppercase font-semibold">Tech Stack Tags (comma-separated)</label>
                            <input
                              type="text"
                              value={(proj.techTags || []).join(", ")}
                              onChange={(e) => handleProjectChange(index, "techTags", e.target.value.split(",").map(t => t.trim()).filter(Boolean))}
                              className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-lg text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600 font-mono text-gray-300"
                              placeholder="e.g. Next.js, Node.js, WebSockets, WhatsApp API"
                            />
                            {(proj.techTags || []).length > 0 && (
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {proj.techTags.map((tag, ti) => (
                                  <span key={ti} className="text-[9px] font-mono px-2.5 py-0.5 rounded bg-gray-850 text-blue-400 border border-gray-800">{tag}</span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Client Review quote */}
                          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 border-t border-gray-850 pt-4">
                            <div className="sm:col-span-3">
                              <label className="text-[10px] text-gray-400 uppercase font-semibold">Client Review Quote (Optional)</label>
                              <input
                                type="text"
                                value={proj.review}
                                onChange={(e) => handleProjectChange(index, "review", e.target.value)}
                                className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-855 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-lg text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600"
                                placeholder="Fabulous solutions provided by this company..."
                              />
                            </div>
                            <div>
                              <label className="text-[10px] text-gray-400 uppercase font-semibold">Client Rating Stars (1-5)</label>
                              <input
                                type="number"
                                min="1"
                                max="5"
                                value={proj.rating || 5}
                                onChange={(e) => handleProjectChange(index, "rating", e.target.value)}
                                className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white rounded-lg text-xs focus:outline-none transition-all duration-300"
                              />
                            </div>
                          </div>

                          {/* Featured Project Highlights */}
                          <div className="border-t border-gray-850 pt-4">
                            <div className="flex items-center justify-between pb-2">
                              <div>
                                <label className="text-[10px] text-gray-400 uppercase font-semibold block">Feature Bullet Points Highlights</label>
                                <span className="text-[9px] text-gray-500 block leading-normal mt-0.5">Configure highlights displayed inside the featured project layout card.</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...projects];
                                  if (!updated[index].features) updated[index].features = [];
                                  updated[index].features.push({ icon: "fa-star", label: "" });
                                  setProjects(updated);
                                }}
                                className="px-2.5 py-1 bg-green-600/10 hover:bg-green-600/20 border border-green-500/20 text-green-400 rounded text-[9px] font-bold transition flex items-center gap-1.5 cursor-pointer active:scale-95"
                              >
                                <i className="fas fa-plus"></i>Add Feature
                              </button>
                            </div>
                            
                            <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 scrollbar-none">
                              {(proj.features || []).map((feat, fi) => (
                                <div key={fi} className="flex items-center gap-2 animate-fade-in">
                                  <input
                                    type="text"
                                    value={feat.icon}
                                    onChange={(e) => {
                                      const updated = [...projects];
                                      updated[index].features[fi].icon = e.target.value;
                                      setProjects(updated);
                                    }}
                                    className="w-28 p-2 bg-gray-950 border border-gray-850 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-white rounded-lg text-xs focus:outline-none font-mono"
                                    placeholder="fa-star"
                                  />
                                  <input
                                    type="text"
                                    value={feat.label}
                                    onChange={(e) => {
                                      const updated = [...projects];
                                      updated[index].features[fi].label = e.target.value;
                                      setProjects(updated);
                                    }}
                                    className="flex-1 p-2 bg-gray-950 border border-gray-855 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-white rounded-lg text-xs focus:outline-none"
                                    placeholder="e.g. Automated Appointment Queues"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updated = [...projects];
                                      updated[index].features = updated[index].features.filter((_, ffi) => ffi !== fi);
                                      setProjects(updated);
                                    }}
                                    className="p-1.5 text-red-500 hover:text-red-400 cursor-pointer active:scale-90 transition"
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
                                </div>
                              ))}

                              {(proj.features || []).length === 0 && (
                                <div className="text-center py-4 border border-dashed border-gray-850 rounded-xl bg-gray-950/20">
                                  <p className="text-[10px] text-gray-600 italic">No feature highlights added. Click &quot;Add Feature&quot; above to list highlights.</p>
                                </div>
                              )}
                            </div>
                          </div>

                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-10 md:p-16 backdrop-blur-sm flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-2xl shadow-inner">
                      <i className="fas fa-folder-open"></i>
                    </div>
                    <div className="max-w-xs space-y-1">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">No Project Selected</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Select an existing worked project card from the list on the left to begin editing its details, or add a new one.
                      </p>
                    </div>
                    <button
                      onClick={handleAddProject}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-blue-500/10 cursor-pointer active:scale-95"
                    >
                      <i className="fas fa-plus mr-1.5"></i>
                      Add New Project
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === "testimonials" && (
          <div className="space-y-6 md:space-y-8 animate-fade-in">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">Client Reviews &amp; Testimonials</h2>
                <p className="text-xs md:text-sm text-gray-400 mt-1">Manage client testimonials shown inside the reviews slider.</p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={handleAddTestimonial}
                  className="flex-grow sm:flex-grow-0 px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-green-500/10 active:scale-95"
                >
                  <i className="fas fa-plus"></i>
                  <span>Add Review</span>
                </button>
                <button
                  onClick={handleSaveCMS}
                  disabled={loading}
                  className="flex-grow sm:flex-grow-0 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/10 disabled:opacity-50 active:scale-95"
                >
                  <i className="fas fa-save"></i>
                  <span>Save Changes</span>
                </button>
              </div>
            </div>

            {/* Split Dual-Pane Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT SIDEBAR: Testimonials list */}
              <div className={`lg:col-span-4 bg-gray-900/40 border border-gray-800 rounded-2xl p-4 md:p-5 backdrop-blur-sm space-y-4 transition-all duration-300 ${isEditingMobileTestimonials ? "hidden lg:block animate-fade-out" : "block animate-fade-in"}`}>
                <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Testimonials ({testimonials.length})</h3>
                  {testimonials.length > 0 && (
                    <span className="text-[10px] text-gray-500 font-mono">Select to Edit</span>
                  )}
                </div>

                <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1 scrollbar-none">
                  {testimonials.map((test, index) => {
                    const isSelected = selectedTestimonialIndex === index;

                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedTestimonialIndex(index);
                          setIsEditingMobileTestimonials(true);
                        }}
                        className={`group/item p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all duration-300 hover:scale-[1.01] relative select-none ${
                          isSelected
                            ? "bg-blue-600/10 border-blue-500/35 shadow-lg shadow-blue-500/5"
                            : "bg-gray-950/30 border-gray-855 hover:border-gray-700/60 hover:bg-gray-950/70"
                        }`}
                      >
                        {/* Selected Indicator Bar */}
                        {isSelected && (
                          <div className="absolute left-0 top-3.5 bottom-3.5 w-1 bg-blue-500 rounded-r-md"></div>
                        )}

                        <div className="flex items-center gap-3 min-w-0">
                          {/* Quote Bubble Icon */}
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 bg-gray-900 shadow-inner ${isSelected ? "text-purple-400 border-purple-500/20" : "text-gray-400 border-white/10"}`}>
                            <i className="fas fa-quote-left text-xs"></i>
                          </div>
                          
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-white truncate max-w-[120px] sm:max-w-none">
                              {test.author || <span className="text-gray-600 italic">Unnamed Client</span>}
                            </h4>
                            <p className="text-[10px] text-gray-500 truncate mt-0.5 max-w-[120px] sm:max-w-none">
                              &quot;{test.text || <span className="text-gray-600 italic">No text review</span>}&quot;
                            </p>
                          </div>
                        </div>

                        {/* Controls (Move & Delete) */}
                        <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover/item:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveTestimonial(index, "up");
                            }}
                            disabled={index === 0}
                            className="w-6 h-6 rounded bg-gray-900/60 hover:bg-gray-855 hover:text-blue-400 disabled:opacity-10 text-gray-400 text-[10px] flex items-center justify-center border border-gray-850 hover:border-gray-700 transition active:scale-90"
                            title="Move Up"
                          >
                            <i className="fas fa-chevron-up"></i>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveTestimonial(index, "down");
                            }}
                            disabled={index === testimonials.length - 1}
                            className="w-6 h-6 rounded bg-gray-900/60 hover:bg-gray-855 hover:text-blue-400 disabled:opacity-10 text-gray-400 text-[10px] flex items-center justify-center border border-gray-855 hover:border-gray-700 transition active:scale-90"
                            title="Move Down"
                          >
                            <i className="fas fa-chevron-down"></i>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteTestimonial(index);
                            }}
                            className="w-6 h-6 rounded bg-red-950/10 hover:bg-red-950/45 text-red-500 hover:text-red-400 text-[10px] flex items-center justify-center border border-red-900/10 hover:border-red-900/30 transition ml-1 active:scale-90"
                            title="Delete Card"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {testimonials.length === 0 && (
                    <div className="text-center py-10 border border-dashed border-gray-855 rounded-xl bg-gray-950/20">
                      <i className="fas fa-quote-right text-gray-600 text-lg mb-2 block"></i>
                      <p className="text-[11px] text-gray-500">No testimonials configured.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT DETAIL PANEL */}
              <div className={`lg:col-span-8 space-y-6 transition-all duration-300 ${isEditingMobileTestimonials ? "block animate-fade-in" : "hidden lg:block"}`}>
                {selectedTestimonialIndex !== null && testimonials[selectedTestimonialIndex] ? (
                  (() => {
                    const index = selectedTestimonialIndex;
                    const test = testimonials[index];

                    return (
                      <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5 md:p-6 backdrop-blur-sm space-y-6 relative transition-all duration-300">
                        {/* Mobile Back Button */}
                        <div className="lg:hidden">
                          <button
                            type="button"
                            onClick={() => setIsEditingMobileTestimonials(false)}
                            className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white px-3.5 py-2 rounded-xl bg-gray-950 border border-gray-850 active:scale-95 transition"
                          >
                            <i className="fas fa-arrow-left"></i>
                            <span>Back to Reviews List</span>
                          </button>
                        </div>

                        {/* Detail Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-800 gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center border border-purple-500/20 bg-gray-950 shadow-inner z-10 text-purple-400">
                              <i className="fas fa-comments text-base"></i>
                            </div>
                            <div className="text-left">
                              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <span>Editing: Review from {test.author || "New Client"}</span>
                                <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full font-mono font-bold">
                                  INDEX #{index + 1}
                                </span>
                              </h3>
                              <p className="text-[10px] text-gray-500 mt-0.5">Customize client name and their quote review description text below.</p>
                            </div>
                          </div>
                        </div>

                        {/* Form Inputs */}
                        <div className="space-y-4 text-left">
                          <div>
                            <label className="text-[10px] text-gray-400 uppercase font-semibold">Author / Client Name</label>
                            <input
                              type="text"
                              value={test.author}
                              onChange={(e) => handleTestimonialChange(index, "author", e.target.value)}
                              className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white rounded-lg text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600 font-bold"
                              placeholder="e.g. John Doe, CEO of Acme Inc."
                              required
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-gray-400 uppercase font-semibold">Client Review Quote Text</label>
                            <textarea
                              value={test.text}
                              onChange={(e) => handleTestimonialChange(index, "text", e.target.value)}
                              className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-855 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-white rounded-lg text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600 leading-relaxed"
                              placeholder="Write client testimonial quote here..."
                              rows="5"
                              required
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-10 md:p-16 backdrop-blur-sm flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 text-2xl shadow-inner">
                      <i className="fas fa-quote-left"></i>
                    </div>
                    <div className="max-w-xs space-y-1">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">No Testimonial Selected</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Select an existing testimonial card from the list on the left to begin editing, or add a new entry.
                      </p>
                    </div>
                    <button
                      onClick={handleAddTestimonial}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-purple-500/10 cursor-pointer active:scale-95"
                    >
                      <i className="fas fa-plus mr-1.5"></i>
                      Add Testimonial
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* Chatbot Q&A Tab */}
        {activeTab === "chatbot" && (
          <div className="space-y-6 md:space-y-8 animate-fade-in">
            {/* Header Area */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">Chatbot Q&A Knowledge Base</h2>
                <p className="text-xs md:text-sm text-gray-400 mt-1">Configure keywords triggers and responses for the chatbot assistant.</p>
              </div>
              <div className="flex gap-3 w-full sm:w-auto">
                <button
                  onClick={handleAddQA}
                  className="flex-grow sm:flex-grow-0 px-4 py-2.5 bg-green-600 hover:bg-green-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-green-500/10 active:scale-95"
                >
                  <i className="fas fa-plus"></i>
                  <span>Add Trigger</span>
                </button>
                <button
                  onClick={handleSaveCMS}
                  disabled={loading}
                  className="flex-grow sm:flex-grow-0 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-blue-500/10 disabled:opacity-50 active:scale-95"
                >
                  <i className="fas fa-save"></i>
                  <span>Save Changes</span>
                </button>
              </div>
            </div>

            {/* Split Dual-Pane Container */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* LEFT SIDEBAR: QA list */}
              <div className={`lg:col-span-4 bg-gray-900/40 border border-gray-800 rounded-2xl p-4 md:p-5 backdrop-blur-sm space-y-4 transition-all duration-300 ${isEditingMobileQA ? "hidden lg:block animate-fade-out" : "block animate-fade-in"}`}>
                <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Triggers ({chatbotKnowledge.length})</h3>
                  {chatbotKnowledge.length > 0 && (
                    <span className="text-[10px] text-gray-500 font-mono">Select to Edit</span>
                  )}
                </div>

                <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1 scrollbar-none">
                  {chatbotKnowledge.map((qa, index) => {
                    const isSelected = selectedQAIndex === index;
                    const keywordsSnippet = qa.keywords ? qa.keywords.split(",")[0] : "New Trigger";

                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedQAIndex(index);
                          setIsEditingMobileQA(true);
                        }}
                        className={`group/item p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all duration-300 hover:scale-[1.01] relative select-none ${
                          isSelected
                            ? "bg-blue-600/10 border-blue-500/35 shadow-lg shadow-blue-500/5"
                            : "bg-gray-950/30 border-gray-855 hover:border-gray-700/60 hover:bg-gray-950/70"
                        }`}
                      >
                        {/* Selected Indicator Bar */}
                        {isSelected && (
                          <div className="absolute left-0 top-3.5 bottom-3.5 w-1 bg-blue-500 rounded-r-md"></div>
                        )}

                        <div className="flex items-center gap-3 min-w-0">
                          {/* Robot Icon */}
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 bg-gray-900 shadow-inner ${isSelected ? "text-amber-400 border-amber-500/20 animate-pulse" : "text-gray-400 border-white/10"}`}>
                            <i className="fas fa-robot text-xs"></i>
                          </div>
                          
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-white truncate max-w-[120px] sm:max-w-none">
                              {keywordsSnippet || <span className="text-gray-600 italic">No keywords</span>}
                            </h4>
                            <p className="text-[10px] text-gray-500 truncate mt-0.5 max-w-[120px] sm:max-w-none">
                              {qa.keywords || <span className="text-gray-600 italic">No keywords configured</span>}
                            </p>
                          </div>
                        </div>

                        {/* Controls (Move & Delete) */}
                        <div className="flex items-center gap-1 shrink-0 opacity-80 group-hover/item:opacity-100 transition-opacity">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveQA(index, "up");
                            }}
                            disabled={index === 0}
                            className="w-6 h-6 rounded bg-gray-900/60 hover:bg-gray-805 hover:text-blue-400 disabled:opacity-10 text-gray-400 text-[10px] flex items-center justify-center border border-gray-850 hover:border-gray-700 transition active:scale-90"
                            title="Move Up"
                          >
                            <i className="fas fa-chevron-up"></i>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleMoveQA(index, "down");
                            }}
                            disabled={index === chatbotKnowledge.length - 1}
                            className="w-6 h-6 rounded bg-gray-900/60 hover:bg-gray-805 hover:text-blue-400 disabled:opacity-10 text-gray-400 text-[10px] flex items-center justify-center border border-gray-855 hover:border-gray-700 transition active:scale-90"
                            title="Move Down"
                          >
                            <i className="fas fa-chevron-down"></i>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteQA(index);
                            }}
                            className="w-6 h-6 rounded bg-red-950/10 hover:bg-red-950/45 text-red-500 hover:text-red-400 text-[10px] flex items-center justify-center border border-red-900/10 hover:border-red-900/30 transition ml-1 active:scale-90"
                            title="Delete Card"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {chatbotKnowledge.length === 0 && (
                    <div className="text-center py-10 border border-dashed border-gray-855 rounded-xl bg-gray-950/20">
                      <i className="fas fa-robot text-gray-600 text-lg mb-2 block"></i>
                      <p className="text-[11px] text-gray-500">No QA triggers configured.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT DETAIL PANEL */}
              <div className={`lg:col-span-8 space-y-6 transition-all duration-300 ${isEditingMobileQA ? "block animate-fade-in" : "hidden lg:block"}`}>
                {selectedQAIndex !== null && chatbotKnowledge[selectedQAIndex] ? (
                  (() => {
                    const index = selectedQAIndex;
                    const qa = chatbotKnowledge[index];

                    return (
                      <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5 md:p-6 backdrop-blur-sm space-y-6 relative transition-all duration-300">
                        {/* Mobile Back Button */}
                        <div className="lg:hidden">
                          <button
                            type="button"
                            onClick={() => setIsEditingMobileQA(false)}
                            className="flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white px-3.5 py-2 rounded-xl bg-gray-950 border border-gray-855 active:scale-95 transition"
                          >
                            <i className="fas fa-arrow-left"></i>
                            <span>Back to Triggers List</span>
                          </button>
                        </div>

                        {/* Detail Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-800 gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center border border-amber-500/20 bg-gray-950 shadow-inner z-10 text-amber-500">
                              <i className="fas fa-robot text-base"></i>
                            </div>
                            <div className="text-left">
                              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                                <span>Editing Trigger: {qa.keywords ? qa.keywords.split(",")[0] : "New Trigger"}</span>
                                <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-0.5 rounded-full font-mono font-bold">
                                  INDEX #{index + 1}
                                </span>
                              </h3>
                              <p className="text-[10px] text-gray-500 mt-0.5">Configure comma-separated keywords triggers and responses for the chatbot assistant.</p>
                            </div>
                          </div>
                        </div>

                        {/* Form Inputs */}
                        <div className="space-y-4 text-left">
                          <div>
                            <label className="text-[10px] text-gray-400 uppercase font-semibold">Keywords (comma-separated)</label>
                            <input
                              type="text"
                              value={qa.keywords}
                              onChange={(e) => handleQAChange(index, "keywords", e.target.value)}
                              className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-white rounded-lg text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600 font-mono text-amber-400"
                              placeholder="e.g. pricing, rates, quote"
                              required
                            />
                            {qa.keywords && (
                              <div className="flex flex-wrap gap-1.5 mt-2">
                                {qa.keywords.split(",").map(k => k.trim()).filter(Boolean).map((word, wi) => (
                                  <span key={wi} className="text-[9px] font-mono px-2.5 py-0.5 rounded bg-gray-850 text-amber-400 border border-gray-800">{word}</span>
                                ))}
                              </div>
                            )}
                          </div>

                          <div>
                            <label className="text-[10px] text-gray-400 uppercase font-semibold">Bot Response Message (Markdown-supported)</label>
                            <textarea
                              value={qa.response}
                              onChange={(e) => handleQAChange(index, "response", e.target.value)}
                              className="w-full mt-1.5 p-2.5 bg-gray-950 border border-gray-850 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 text-white rounded-lg text-xs focus:outline-none transition-all duration-300 placeholder:text-gray-600 leading-relaxed font-sans"
                              placeholder="Describe what the chatbot will answer if these keywords are matched..."
                              rows="8"
                              required
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-10 md:p-16 backdrop-blur-sm flex flex-col items-center justify-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 text-2xl shadow-inner">
                      <i className="fas fa-robot"></i>
                    </div>
                    <div className="max-w-xs space-y-1">
                      <h3 className="text-sm font-bold text-white uppercase tracking-wider">No Trigger Selected</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        Select an existing trigger keywords card from the list on the left to begin editing, or add a new Q&A trigger.
                      </p>
                    </div>
                    <button
                      onClick={handleAddQA}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg transition-all shadow-md shadow-amber-500/10 cursor-pointer active:scale-95"
                    >
                      <i className="fas fa-plus mr-1.5"></i>
                      Add Q&A Trigger
                    </button>
                  </div>
                )}
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

          return            <div className="space-y-6 md:space-y-8 animate-fade-in">
              <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white font-mono uppercase">
                  Manage Administrator Accounts
                </h2>
                <p className="text-xs md:text-sm text-gray-400 mt-1">
                  Configure administrator login credentials and update system access settings.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {/* Password Update Form */}
                <div className="bg-gray-900/30 border border-white/5 p-6 md:p-8 rounded-2xl backdrop-blur-sm space-y-6 shadow-xl shadow-black/20">
                  <h3 className="text-xs font-bold text-white pb-3 border-b border-white/5 flex items-center gap-2 font-mono uppercase tracking-wider">
                    <i className="fas fa-lock text-blue-400 font-bold"></i>
                    <span>Change My Password</span>
                  </h3>

                  <form onSubmit={handleChangePassword} className="space-y-5">
                    {/* Current Password */}
                    <div>
                      <label className="text-[10px] text-gray-400 uppercase font-semibold font-mono tracking-wider">Current Password</label>
                      <div className="relative mt-1.5 flex items-center bg-gray-950/80 border border-gray-850 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 rounded-xl transition-all duration-300 overflow-hidden">
                        <input
                          type={showCurrentPass ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full bg-transparent border-none py-3 px-4 pr-10 text-white focus:outline-none text-xs transition"
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPass(!showCurrentPass)}
                          className="absolute right-3.5 text-gray-500 hover:text-white transition cursor-pointer text-xs"
                        >
                          <i className={`fas ${showCurrentPass ? "fa-eye-slash" : "fa-eye"}`} />
                        </button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="text-[10px] text-gray-400 uppercase font-semibold font-mono tracking-wider">New Password</label>
                      <div className="relative mt-1.5 flex items-center bg-gray-950/80 border border-gray-850 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 rounded-xl transition-all duration-300 overflow-hidden">
                        <input
                          type={showNewPass ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full bg-transparent border-none py-3 px-4 pr-10 text-white focus:outline-none text-xs transition"
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPass(!showNewPass)}
                          className="absolute right-3.5 text-gray-500 hover:text-white transition cursor-pointer text-xs"
                        >
                          <i className={`fas ${showNewPass ? "fa-eye-slash" : "fa-eye"}`} />
                        </button>
                      </div>

                      {/* Password Strength Indicator */}
                      {newPassword.length > 0 && (
                        <div className="mt-2.5 space-y-1.5">
                          <div className="flex justify-between items-center text-[9px] font-bold">
                            <span className="text-gray-500 font-mono">PASSWORD STRENGTH:</span>
                            <span className={`${newPassStrength.text} font-mono`}>{newPassStrength.label}</span>
                          </div>
                          <div className="h-1 bg-gray-950 border border-white/5 rounded-full overflow-hidden flex">
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
                      <label className="text-[10px] text-gray-400 uppercase font-semibold font-mono tracking-wider">Confirm New Password</label>
                      <div className="relative mt-1.5 flex items-center bg-gray-950/80 border border-gray-850 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 rounded-xl transition-all duration-300 overflow-hidden">
                        <input
                          type={showConfirmPass ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full bg-transparent border-none py-3 px-4 pr-10 text-white focus:outline-none text-xs transition"
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPass(!showConfirmPass)}
                          className="absolute right-3.5 text-gray-500 hover:text-white transition cursor-pointer text-xs"
                        >
                          <i className={`fas ${showConfirmPass ? "fa-eye-slash" : "fa-eye"}`} />
                        </button>
                      </div>
                      {newPassword.length > 0 && confirmPassword.length > 0 && newPassword !== confirmPassword && (
                        <p className="text-[9px] text-rose-400 font-bold mt-1.5 font-mono">
                          ⚠️ Passwords do not match.
                        </p>
                      )}
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={loading || (newPassword.length > 0 && newPassword !== confirmPassword)}
                        className="w-full sm:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold transition cursor-pointer shadow-md shadow-blue-500/10 active:scale-95 duration-200"
                      >
                        Change Password
                      </button>
                    </div>
                  </form>
                </div>

                {/* Create New Admin Form */}
                <div className="bg-gray-900/30 border border-white/5 p-6 md:p-8 rounded-2xl backdrop-blur-sm space-y-6 shadow-xl shadow-black/20">
                  <h3 className="text-xs font-bold text-white pb-3 border-b border-white/5 flex items-center gap-2 font-mono uppercase tracking-wider">
                    <i className="fas fa-user-plus text-green-400 font-bold"></i>
                    <span>Create Administrator</span>
                  </h3>

                  <form onSubmit={handleCreateAdmin} className="space-y-5">
                    {/* Username */}
                    <div>
                      <label className="text-[10px] text-gray-400 uppercase font-semibold font-mono tracking-wider">New Admin Username</label>
                      <div className="relative mt-1.5 flex items-center bg-gray-950/80 border border-gray-850 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 rounded-xl transition-all duration-300 overflow-hidden">
                        <input
                          type="text"
                          value={newAdminUsername}
                          onChange={(e) => setNewAdminUsername(e.target.value)}
                          className="w-full bg-transparent border-none py-3 px-4 text-white focus:outline-none text-xs transition"
                          placeholder="e.g., john_doe"
                          required
                        />
                      </div>
                      {newAdminUsername.length > 0 && !isCreateUsernameValid && (
                        <p className="text-[9px] text-rose-400 font-bold mt-1.5 font-mono">
                          ⚠️ Usernames can only contain letters, numbers, hyphens, and underscores.
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div>
                      <label className="text-[10px] text-gray-400 uppercase font-semibold font-mono tracking-wider">Password</label>
                      <div className="relative mt-1.5 flex items-center bg-gray-950/80 border border-gray-850 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 rounded-xl transition-all duration-300 overflow-hidden">
                        <input
                          type={showCreatePass ? "text" : "password"}
                          value={newAdminPassword}
                          onChange={(e) => setNewAdminPassword(e.target.value)}
                          className="w-full bg-transparent border-none py-3 px-4 pr-10 text-white focus:outline-none text-xs transition"
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowCreatePass(!showCreatePass)}
                          className="absolute right-3.5 text-gray-500 hover:text-white transition cursor-pointer text-xs"
                        >
                          <i className={`fas ${showCreatePass ? "fa-eye-slash" : "fa-eye"}`} />
                        </button>
                      </div>

                      {/* Password Strength Indicator */}
                      {newAdminPassword.length > 0 && (
                        <div className="mt-2.5 space-y-1.5">
                          <div className="flex justify-between items-center text-[9px] font-bold">
                            <span className="text-gray-500 font-mono">PASSWORD STRENGTH:</span>
                            <span className={`${createPassStrength.text} font-mono`}>{createPassStrength.label}</span>
                          </div>
                          <div className="h-1 bg-gray-950 border border-white/5 rounded-full overflow-hidden flex">
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
                        className="w-full sm:w-auto px-5 py-2.5 bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-xs font-bold transition cursor-pointer shadow-md shadow-green-500/10 active:scale-95 duration-200"
                      >
                        Register Admin Account
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Active Admin List */}
              <div className="bg-gray-900/30 border border-white/5 p-6 md:p-8 rounded-2xl backdrop-blur-sm space-y-4 shadow-xl shadow-black/20 animate-fade-in">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-white/5">
                  <h3 className="text-xs font-bold text-white flex items-center gap-2 font-mono uppercase tracking-wider">
                    <i className="fas fa-users text-purple-400 font-bold"></i>
                    <span>Active Admin Accounts</span>
                  </h3>

                  {/* Search filter bar */}
                  <div className="relative w-full sm:w-64">
                    <i className="fas fa-search absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-[10px]"></i>
                    <input
                      type="text"
                      value={adminSearch}
                      onChange={(e) => setAdminSearch(e.target.value)}
                      placeholder="Search accounts..."
                      className="w-full pl-8.5 pr-3 py-2 bg-gray-950 border border-gray-850 text-white rounded-xl text-[10px] focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition duration-300 font-medium font-mono"
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
                        className="flex justify-between items-center p-3.5 bg-gray-950/40 border border-white/5 rounded-xl gap-2 hover:border-gray-800 transition duration-300"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Initials Avatar badge */}
                          <div className={`w-8.5 h-8.5 rounded-full border flex items-center justify-center font-bold font-mono text-[10px] shrink-0 select-none ${avatar.classes}`}>
                            {avatar.initials}
                          </div>
                          <div className="min-w-0">
                            <span className="font-semibold text-white break-all">{username}</span>
                            {isSelf && (
                              <span className="inline-block ml-2 px-2.5 py-0.5 bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[8px] rounded-full font-bold whitespace-nowrap uppercase tracking-wider font-mono">
                                Current
                              </span>
                            )}
                          </div>
                        </div>

                        {canDelete ? (
                          <button
                            onClick={() => setAdminToDelete(username)}
                            disabled={loading}
                            className="px-3.5 py-1.5 bg-red-950/15 hover:bg-red-950/35 border border-red-900/15 text-red-500 hover:text-red-400 rounded-xl text-[10px] font-bold transition cursor-pointer shrink-0 active:scale-95 duration-250"
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
                    <p className="text-center text-xs text-gray-500 py-6 italic">No matching administrators found.</p>
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

function DragDropZone({ index, onUploadSuccess, notify }) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await uploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      await uploadFile(e.target.files[0]);
    }
  };

  const uploadFile = async (file) => {
    if (!file.type.startsWith("image/")) {
      notify("Please upload an image file only.", "error");
      return;
    }
    setUploading(true);
    notify("Uploading dropped image to server...", "info");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const json = await response.json();
      if (response.ok && json.url) {
        onUploadSuccess(json.url);
        notify("Image uploaded successfully!", "success");
      } else {
        notify(json.error || "Failed to upload image.", "error");
      }
    } catch (err) {
      console.error("Failed to upload image:", err);
      notify("Network error. Image upload failed.", "error");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDrag}
      onDrop={handleDrop}
      className={`relative rounded-lg border border-dashed p-3 flex flex-col items-center justify-center text-center transition cursor-pointer select-none h-[42px] min-h-[42px] mt-1.5 ${
        dragActive
          ? "border-blue-500 bg-blue-600/10"
          : "border-gray-850 bg-gray-950 hover:bg-gray-950/80 hover:border-gray-800"
      }`}
    >
      <input
        type="file"
        accept="image/*"
        id={`drag-upload-file-${index}`}
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 font-bold"
        disabled={uploading}
      />
      <div className="flex flex-row items-center justify-center gap-2 pointer-events-none w-full">
        <i className={`fas ${uploading ? "fa-circle-notch animate-spin text-blue-400" : dragActive ? "fa-arrow-circle-down text-blue-400 animate-bounce" : "fa-cloud-upload-alt text-gray-500"} text-sm shrink-0`}></i>
        <div className="text-left leading-tight">
          <span className="text-[10px] font-bold text-gray-300 block">
            {uploading ? "Uploading file..." : dragActive ? "Drop file now!" : "Drag & drop image file"}
          </span>
          <span className="text-[9px] text-gray-500 block">or click to browse local files</span>
        </div>
      </div>
    </div>
  );
}
