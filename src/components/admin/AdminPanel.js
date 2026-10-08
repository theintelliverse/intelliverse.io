"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Subcomponents
import Sidebar from "./Sidebar";
import DashboardTab from "./tabs/DashboardTab";
import CMSTab from "./tabs/CMSTab";
import TeamTab from "./tabs/TeamTab";
import ProjectsTab from "./tabs/ProjectsTab";
import CaseStudiesTab from "./tabs/CaseStudiesTab";
import TestimonialsTab from "./tabs/TestimonialsTab";
import ChatbotTab from "./tabs/ChatbotTab";
import CRMTab from "./tabs/CRMTab";
import SettingsTab from "./tabs/SettingsTab";

// Modals
import LeadDetailsModal from "./modals/LeadDetailsModal";
import DeleteAdminModal from "./modals/DeleteAdminModal";

export default function AdminPanel({
  isOpen,
  data,
  testimonials: initialTestimonials,
  projects: initialProjects,
  caseStudies: initialCaseStudies,
  submissions: initialSubmissions,
  admins: initialAdmins,
  chatbotKnowledge: initialChatbotKnowledge,
  founders: initialFounders,
  currentUser,
  dbStatus
}) {
  const router = useRouter();

  // --- Responsive mobile states ---
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- Active Tab State ---
  const [activeTab, setActiveTab] = useState("dashboard"); // dashboard | cms | team | projects | testimonials | chatbot | crm | settings

  // --- CMS Content States ---
  const [heroHeadline, setHeroHeadline] = useState(data.hero?.headline || "Innovation. Create. Grow.");
  const [heroSubtitle, setHeroSubtitle] = useState(data.hero?.subtitle || "Your one-stop solution for software development, web development, and IT services.");
  const [heroStatus, setHeroStatus] = useState(data.hero?.status || "Ahmedabad, India / Taking new projects");
  const [pillarsText, setPillarsText] = useState(data.hero?.pillarsText || "Web Architecture · Cloud Infrastructure · SaaS · AI Workflows");
  const [caseStudiesHighlight, setCaseStudiesHighlight] = useState(data.hero?.caseStudiesHighlight || "Appointory (Healthcare) & Vrix (Headless E-Commerce)");
  const [studioLocation, setStudioLocation] = useState(data.hero?.studioLocation || "Ahmedabad, Gujarat · Collaborating Worldwide");

  const [aboutP1, setAboutP1] = useState(data.about?.p1 || "The Intelliverse is an engineering-first software and web architecture company based in Ahmedabad, Gujarat. We build resilient digital platforms, custom SaaS architectures, and high-performance applications.");
  const [aboutMission, setAboutMission] = useState(data.about?.mission || "To solve problems worth solving with teams who care about excellence — building the kind of software that remains fast, secure, and maintainable long after deployment.");
  const [aboutPullQuote, setAboutPullQuote] = useState(data.about?.pullQuote || "We don't engineer to check boxes. We build the architecture that lets your team scale without rewriting the core every eighteen months.");
  const [aboutModelsText, setAboutModelsText] = useState(data.about?.modelsText || "Maybe you need an ultra-fast Next.js web application or a headless storefront right now. That's a completely valid place to start. We focus strictly on what creates measurable impact, without bloated scopes or unwanted upsells.");

  const [contactEmail, setContactEmail] = useState(data.contact?.email || "theintelliverse@gmail.com");
  const [contactLinkedin, setContactLinkedin] = useState(data.contact?.linkedin || "https://www.linkedin.com/company/the-intelliverse/");
  const [contactInstagram, setContactInstagram] = useState(data.contact?.instagram || "https://www.instagram.com/the_intelliverse/");

  const [statsProjects, setStatsProjects] = useState(data.stats?.projects !== undefined ? data.stats.projects : 2);
  const [statsSatisfaction, setStatsSatisfaction] = useState(data.stats?.satisfaction !== undefined ? data.stats.satisfaction : 100);
  const [statsClients, setStatsClients] = useState(data.stats?.clients !== undefined ? data.stats.clients : 15);

  const [estimatorStartingPrice, setEstimatorStartingPrice] = useState(data.estimator?.startingPrice || "₹15,000");
  const [estimatorTypes, setEstimatorTypes] = useState(
    data.estimator?.types || [
      { id: "starter", label: "Starter Web / Landing Page", baseRange: "₹15,000 – ₹45,000" },
      { id: "web", label: "Web Architecture / Next.js", baseRange: "₹45,000 – ₹1.5L" },
      { id: "mobile", label: "Mobile App (Android / iOS)", baseRange: "₹80,000 – ₹3.5L" },
      { id: "saas", label: "Custom SaaS Platform", baseRange: "₹1.5L – ₹8L+" },
      { id: "it", label: "Cloud & DevOps Architecture", baseRange: "₹25,000 – ₹1.2L" },
      { id: "ai", label: "Applied AI / Agentic Automation", baseRange: "₹40,000 – ₹2.5L+" },
    ]
  );
  const [estimatorIncludedCharges, setEstimatorIncludedCharges] = useState(
    data.estimator?.includedCharges || [
      { title: "100% IP & Full Source Code Ownership", badge: "INCLUDED", note: "Zero vendor lock-in; complete repository rights" },
      { title: "Cloud CI/CD & Zero-Downtime Deployment", badge: "INCLUDED", note: "Automated edge staging & production pipelines" },
      { title: "End-to-End Security & QA Audit", badge: "INCLUDED", note: "OWASP best practices & performance stress testing" },
      { title: "30-Day Post-Launch SLA Warranty", badge: "INCLUDED", note: "Dedicated bug resolution & uptime guarantees" },
    ]
  );

  const [telemetry, setTelemetry] = useState(
    data.telemetry || {
      headerTitle: "Studio Telemetry",
      badgeLabel: "LIVE FEED",
      badgeSub: "· W41",
      terminalTimestamp: "03 OCT 21:04",
      terminalProject: "site",
      terminalColor: "#2F63E0",
      terminalMessage: "v0.7: Vrix journal published",
      metricTitle: "Active Deployments · Q1",
      metricTrend: "↑ 18.4%",
      deployCount: 302,
      deployLabel: "total live",
      activityTitle: "7-DAY ACTIVITY · PEAK 96%",
      activityStatus: "HEALTHY",
      bars: [
        { day: "M", name: "Monday", val: 45, col: "#5B3FD9" },
        { day: "T", name: "Tuesday", val: 68, col: "#3D7BF7" },
        { day: "W", name: "Wednesday", val: 82, col: "#FF6B7B" },
        { day: "T", name: "Thursday", val: 54, col: "#FDB347" },
        { day: "F", name: "Friday", val: 91, col: "#10B981" },
        { day: "S", name: "Saturday", val: 74, col: "#8B5CF6" },
        { day: "S", name: "Sunday", val: 96, col: "#2F63E0" },
      ],
      eventTag: "DEPLOY",
      eventMessage: "vrix-edge-proxy online [18ms]",
      eventStatus: "OK",
      eventColor: "var(--blue)"
    }
  );

  const [services, setServices] = useState(data.services || []);
  const [processStages, setProcessStages] = useState(data.process || []);
  const [marquee, setMarquee] = useState(data.marquee || { items1: [], items2: [] });
  const [philosophy, setPhilosophy] = useState(data.philosophy || []);

  // --- Dynamic Lists States ---
  const [testimonials, setTestimonials] = useState(initialTestimonials || []);
  const [projects, setProjects] = useState(initialProjects || []);
  const [caseStudies, setCaseStudies] = useState(initialCaseStudies || []);
  const [selectedCaseStudyIndex, setSelectedCaseStudyIndex] = useState(initialCaseStudies && initialCaseStudies.length > 0 ? 0 : null);
  const [isEditingMobileCaseStudies, setIsEditingMobileCaseStudies] = useState(false);
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
    const newTest = {
      text: "",
      author: "",
      role: "",
      project: "Appointry",
      tag: "Appointry · Healthcare",
      rating: 4.5
    };
    setTestimonials([...testimonials, newTest]);
    setSelectedTestimonialIndex(testimonials.length);
    setIsEditingMobileTestimonials(true);
  };

  const handleTestimonialChange = (index, field, value) => {
    const updated = [...testimonials];
    if (field === "rating") {
      updated[index][field] = parseFloat(value) || 5;
    } else {
      updated[index][field] = value;
    }
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
    const newFounder = { name: "", role: "", badge: "", tagline: "", currently: "", image: "", imageX: 50, imageY: 50, linkedin: "", instagram: "", order: founders.length + 1, customLinks: [] };
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
    const newProj = {
      name: "",
      category: "SaaS Portal",
      type: "SaaS Portal",
      role: "",
      impact: "",
      summary: "",
      description: "",
      link: "",
      review: "",
      rating: 5,
      featureLink: "",
      featureText: "",
      features: [],
      techTags: [],
      stack: [],
      tagline: "",
      isFeatured: false,
      logo: "",
      icon: "fa-folder-open"
    };
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
    } else if (field === "techTags" || field === "stack") {
      updated[index]["techTags"] = value;
      updated[index]["stack"] = value;
    } else if (field === "summary" || field === "description") {
      updated[index]["summary"] = value;
      updated[index]["description"] = value;
    } else if (field === "type" || field === "category") {
      updated[index]["type"] = value;
      updated[index]["category"] = value;
    } else {
      updated[index][field] = value;
    }
    setProjects(updated);
  };

  // --- Handlers for Case Studies & Specifications ---
  const handleAddCaseStudy = () => {
    const newCS = {
      id: `cs-${Date.now()}`,
      name: "",
      category: "Healthcare SaaS Platform",
      role: "",
      impact: "",
      summary: "",
      description: "",
      stack: [],
      link: "",
      caseStudyLink: "",
      review: "",
      rating: 5
    };
    setCaseStudies([...caseStudies, newCS]);
    setSelectedCaseStudyIndex(caseStudies.length);
    setIsEditingMobileCaseStudies(true);
  };

  const handleCaseStudyChange = (index, field, value) => {
    const updated = [...caseStudies];
    if (field === "rating") {
      updated[index][field] = parseInt(value) || 5;
    } else if (field === "summary" || field === "description") {
      updated[index]["summary"] = value;
      updated[index]["description"] = value;
    } else {
      updated[index][field] = value;
    }
    setCaseStudies(updated);
  };

  const handleDeleteCaseStudy = (index) => {
    const updated = caseStudies.filter((_, i) => i !== index);
    setCaseStudies(updated);
    if (selectedCaseStudyIndex === index) {
      const nextIndex = updated.length > 0 ? Math.max(0, index - 1) : null;
      setSelectedCaseStudyIndex(nextIndex);
      if (nextIndex === null) {
        setIsEditingMobileCaseStudies(false);
      }
    } else if (selectedCaseStudyIndex > index) {
      setSelectedCaseStudyIndex(selectedCaseStudyIndex - 1);
    }
  };

  const handleMoveCaseStudy = (index, direction) => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === caseStudies.length - 1) return;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const updated = [...caseStudies];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setCaseStudies(updated);
    if (selectedCaseStudyIndex === index) {
      setSelectedCaseStudyIndex(targetIndex);
    } else if (selectedCaseStudyIndex === targetIndex) {
      setSelectedCaseStudyIndex(index);
    }
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
      hero: {
        headline: heroHeadline,
        subtitle: heroSubtitle,
        status: heroStatus,
        pillarsText: pillarsText,
        caseStudiesHighlight: caseStudiesHighlight,
        studioLocation: studioLocation
      },
      about: {
        p1: aboutP1,
        mission: aboutMission,
        pullQuote: aboutPullQuote,
        modelsText: aboutModelsText
      },
      contact: {
        email: contactEmail,
        linkedin: contactLinkedin,
        instagram: contactInstagram
      },
      stats: {
        projects: parseInt(statsProjects) || 0,
        satisfaction: parseInt(statsSatisfaction) || 0,
        clients: parseInt(statsClients) || 0
      },
      estimator: {
        startingPrice: estimatorStartingPrice,
        types: estimatorTypes,
        includedCharges: estimatorIncludedCharges
      },
      telemetry,
      services,
      process: processStages,
      marquee,
      philosophy,
      testimonials,
      projects,
      caseStudies,
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

  return (
    <div
      className="h-screen w-full flex flex-col md:flex-row font-sans relative admin-panel overflow-hidden"
      style={{
        backgroundColor: "var(--night)",
        color: "var(--cream)",
      }}
      data-lenis-prevent
    >

      {/* Mobile Top Header (Sticky on phone views) */}
      <div
        className="md:hidden flex items-center justify-between p-4 sticky top-0 z-30 shrink-0"
        style={{
          backgroundColor: "rgba(11, 21, 48, 0.95)",
          borderBottom: "1px solid rgba(228, 218, 195, 0.12)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/the%20intelliverse%20logo.jpg"
            alt="Intelliverse Logo"
            className="w-7 h-7 rounded-lg object-cover"
            style={{ border: "1px solid rgba(228, 218, 195, 0.2)" }}
          />
          <div>
            <h1
              className="text-xs font-bold tracking-wider uppercase font-mono"
              style={{ color: "var(--cream)" }}
            >
              The Intelliverse
            </h1>
          </div>
        </div>

        {/* Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1 text-lg focus:outline-none transition cursor-pointer"
          style={{ color: "rgba(248, 242, 228, 0.8)" }}
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
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        currentUser={currentUser}
        dbStatus={dbStatus}
        handleLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main
        className="flex-grow p-4 md:p-10 relative overflow-y-auto h-[calc(100dvh-65px)] md:h-screen z-10 overscroll-contain"
        data-lenis-prevent
      >

        {/* Persistent Global Top Action Bar */}
        <div
          className="sticky top-0 -mt-4 md:-mt-10 mb-6 md:mb-8 pt-4 md:pt-6 pb-4 z-30 flex flex-wrap items-center justify-between gap-3"
          style={{
            backgroundColor: "rgba(11, 21, 48, 0.9)",
            borderBottom: "1px solid rgba(228, 218, 195, 0.12)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="flex items-center gap-2">
            <span
              className="text-[10px] uppercase tracking-wider"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--orange)" }}
            >
              Studio Console /
            </span>
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--cream)" }}
            >
              {activeTab === "casestudies" ? "Case Studies & Specs" : activeTab === "cms" ? "Hero & About CMS" : activeTab}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl text-xs font-medium transition flex items-center gap-1.5"
              style={{
                backgroundColor: "rgba(18, 30, 68, 0.6)",
                border: "1px solid rgba(228, 218, 195, 0.18)",
                color: "var(--cream)",
                fontFamily: "'JetBrains Mono', monospace",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(18, 30, 68, 0.95)";
                e.currentTarget.style.borderColor = "var(--blue)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(18, 30, 68, 0.6)";
                e.currentTarget.style.borderColor = "rgba(228, 218, 195, 0.18)";
              }}
            >
              <span>View Live Site</span>
              <i className="fas fa-external-link-alt text-[10px]" style={{ color: "var(--orange)" }}></i>
            </a>

            <button
              onClick={handleSaveCMS}
              disabled={loading}
              className="px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer disabled:opacity-50 active:scale-95"
              style={{
                backgroundColor: "var(--blue-deep)",
                color: "var(--cream)",
                border: "none",
                boxShadow: "0 4px 14px rgba(47, 99, 224, 0.35)",
                fontFamily: "'JetBrains Mono', monospace",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--blue-press)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--blue-deep)")}
            >
              {loading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <i className="fas fa-save"></i>
              )}
              <span>Save All Changes</span>
            </button>
          </div>
        </div>

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
          <DashboardTab
            contactLogs={contactLogs}
            projects={projects}
            caseStudies={caseStudies}
            testimonials={testimonials}
            setActiveTab={setActiveTab}
            handleAddProject={handleAddProject}
            handleAddTestimonial={handleAddTestimonial}
            setSelectedLead={setSelectedLead}
            dbStatus={dbStatus}
            currentUser={currentUser}
          />
        )}

        {/* CMS Text Tab */}
        {activeTab === "cms" && (
          <CMSTab
            heroHeadline={heroHeadline}
            setHeroHeadline={setHeroHeadline}
            heroSubtitle={heroSubtitle}
            setHeroSubtitle={setHeroSubtitle}
            heroStatus={heroStatus}
            setHeroStatus={setHeroStatus}
            pillarsText={pillarsText}
            setPillarsText={setPillarsText}
            caseStudiesHighlight={caseStudiesHighlight}
            setCaseStudiesHighlight={setCaseStudiesHighlight}
            studioLocation={studioLocation}
            setStudioLocation={setStudioLocation}
            aboutP1={aboutP1}
            setAboutP1={setAboutP1}
            aboutMission={aboutMission}
            setAboutMission={setAboutMission}
            aboutPullQuote={aboutPullQuote}
            setAboutPullQuote={setAboutPullQuote}
            aboutModelsText={aboutModelsText}
            setAboutModelsText={setAboutModelsText}
            contactEmail={contactEmail}
            setContactEmail={setContactEmail}
            contactLinkedin={contactLinkedin}
            setContactLinkedin={setContactLinkedin}
            contactInstagram={contactInstagram}
            setContactInstagram={setContactInstagram}
            statsProjects={statsProjects}
            setStatsProjects={setStatsProjects}
            statsSatisfaction={statsSatisfaction}
            setStatsSatisfaction={setStatsSatisfaction}
            statsClients={statsClients}
            setStatsClients={setStatsClients}
            estimatorStartingPrice={estimatorStartingPrice}
            setEstimatorStartingPrice={setEstimatorStartingPrice}
            estimatorTypes={estimatorTypes}
            setEstimatorTypes={setEstimatorTypes}
            estimatorIncludedCharges={estimatorIncludedCharges}
            setEstimatorIncludedCharges={setEstimatorIncludedCharges}
            telemetry={telemetry}
            setTelemetry={setTelemetry}
            services={services}
            setServices={setServices}
            processStages={processStages}
            setProcessStages={setProcessStages}
            marquee={marquee}
            setMarquee={setMarquee}
            philosophy={philosophy}
            setPhilosophy={setPhilosophy}
            handleSaveCMS={handleSaveCMS}
            loading={loading}
          />
        )}

        {/* Team Members Tab */}
        {activeTab === "team" && (
          <TeamTab
            founders={founders}
            selectedFounderIndex={selectedFounderIndex}
            setSelectedFounderIndex={setSelectedFounderIndex}
            teamEditorTab={teamEditorTab}
            setTeamEditorTab={setTeamEditorTab}
            isEditingMobile={isEditingMobile}
            setIsEditingMobile={setIsEditingMobile}
            handleAddFounder={handleAddFounder}
            handleDeleteFounder={handleDeleteFounder}
            handleMoveFounder={handleMoveFounder}
            handleFounderChange={handleFounderChange}
            handleImageClick={handleImageClick}
            handleImageUpload={handleImageUpload}
            handleAddCustomLink={handleAddCustomLink}
            handleCustomLinkChange={handleCustomLinkChange}
            handleDeleteCustomLink={handleDeleteCustomLink}
            handleSaveCMS={handleSaveCMS}
            loading={loading}
            notify={notify}
          />
        )}

        {/* Projects Portfolio Tab */}
        {activeTab === "projects" && (
          <ProjectsTab
            projects={projects}
            setProjects={setProjects}
            selectedProjectIndex={selectedProjectIndex}
            setSelectedProjectIndex={setSelectedProjectIndex}
            isEditingMobileProjects={isEditingMobileProjects}
            setIsEditingMobileProjects={setIsEditingMobileProjects}
            handleAddProject={handleAddProject}
            handleProjectChange={handleProjectChange}
            handleDeleteProject={handleDeleteProject}
            handleMoveProject={handleMoveProject}
            handleSaveCMS={handleSaveCMS}
            loading={loading}
          />
        )}

        {/* Case Studies & Engineering Specifications Tab */}
        {activeTab === "casestudies" && (
          <CaseStudiesTab
            caseStudies={caseStudies}
            setCaseStudies={setCaseStudies}
            selectedCaseStudyIndex={selectedCaseStudyIndex}
            setSelectedCaseStudyIndex={setSelectedCaseStudyIndex}
            isEditingMobileCaseStudies={isEditingMobileCaseStudies}
            setIsEditingMobileCaseStudies={setIsEditingMobileCaseStudies}
            handleAddCaseStudy={handleAddCaseStudy}
            handleCaseStudyChange={handleCaseStudyChange}
            handleDeleteCaseStudy={handleDeleteCaseStudy}
            handleMoveCaseStudy={handleMoveCaseStudy}
            handleSaveCMS={handleSaveCMS}
            loading={loading}
          />
        )}

        {/* Testimonials Tab */}
        {activeTab === "testimonials" && (
          <TestimonialsTab
            testimonials={testimonials}
            selectedTestimonialIndex={selectedTestimonialIndex}
            setSelectedTestimonialIndex={setSelectedTestimonialIndex}
            isEditingMobileTestimonials={isEditingMobileTestimonials}
            setIsEditingMobileTestimonials={setIsEditingMobileTestimonials}
            handleAddTestimonial={handleAddTestimonial}
            handleTestimonialChange={handleTestimonialChange}
            handleDeleteTestimonial={handleDeleteTestimonial}
            handleMoveTestimonial={handleMoveTestimonial}
            handleSaveCMS={handleSaveCMS}
            loading={loading}
          />
        )}

        {/* Chatbot Q&A Tab */}
        {activeTab === "chatbot" && (
          <ChatbotTab
            chatbotKnowledge={chatbotKnowledge}
            selectedQAIndex={selectedQAIndex}
            setSelectedQAIndex={setSelectedQAIndex}
            isEditingMobileQA={isEditingMobileQA}
            setIsEditingMobileQA={setIsEditingMobileQA}
            handleAddQA={handleAddQA}
            handleQAChange={handleQAChange}
            handleDeleteQA={handleDeleteQA}
            handleMoveQA={handleMoveQA}
            handleSaveCMS={handleSaveCMS}
            loading={loading}
          />
        )}

        {/* CRM Submissions Tab */}
        {activeTab === "crm" && (
          <CRMTab
            contactLogs={contactLogs}
            setSelectedLead={setSelectedLead}
            handleDeleteLead={handleDeleteLead}
          />
        )}

        {/* Manage Settings / Admins Tab */}
        {activeTab === "settings" && (
          <SettingsTab
            currentUser={currentUser}
            adminsList={adminsList}
            adminSearch={adminSearch}
            setAdminSearch={setAdminSearch}
            currentPassword={currentPassword}
            setCurrentPassword={setCurrentPassword}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            newAdminUsername={newAdminUsername}
            setNewAdminUsername={setNewAdminUsername}
            newAdminPassword={newAdminPassword}
            setNewAdminPassword={setNewAdminPassword}
            showCurrentPass={showCurrentPass}
            setShowCurrentPass={setShowCurrentPass}
            showNewPass={showNewPass}
            setShowNewPass={setShowNewPass}
            showConfirmPass={showConfirmPass}
            setShowConfirmPass={setShowConfirmPass}
            showCreatePass={showCreatePass}
            setShowCreatePass={setShowCreatePass}
            setAdminToDelete={setAdminToDelete}
            handleChangePassword={handleChangePassword}
            handleCreateAdmin={handleCreateAdmin}
            loading={loading}
          />
        )}
      </main>

      {/* CRM Lead Details Popup Modal */}
      <LeadDetailsModal
        selectedLead={selectedLead}
        setSelectedLead={setSelectedLead}
        handleDeleteLead={handleDeleteLead}
      />

      {/* Admin Delete Confirmation Modal */}
      <DeleteAdminModal
        adminToDelete={adminToDelete}
        setAdminToDelete={setAdminToDelete}
        handleDeleteAdmin={handleDeleteAdmin}
      />

    </div>
  );
}
