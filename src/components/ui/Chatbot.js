"use client";

import { useState, useEffect, useRef } from "react";

export default function Chatbot() {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showGreeting, setShowGreeting] = useState(true);
  
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Lead capture state machine
  const [leadState, setLeadState] = useState("idle"); // idle, waiting_email, waiting_name
  const [leadData, setLeadData] = useState({ email: "", initialQuery: "" });

  // Dynamic layout data from database
  const [dbData, setDbData] = useState(null);

  // Suggestion chips (dynamic suggestion engine)
  const [suggestions, setSuggestions] = useState([
    "What services do you offer?", 
    "Who are the founders?", 
    "How can I get a quote?"
  ]);

  // Text to Speech active speaking index
  const [speakingMsgIndex, setSpeakingMsgIndex] = useState(null);

  const messagesEndRef = useRef(null);

  // --- Founders hardcoded data ---
  const foundersData = [
    {
      name: "Dhruvil Thummar",
      role: "Co-founder & CTO",
      initials: "DT",
      linkedin: "https://www.linkedin.com/in/dhruvilthummar",
      photo: "https://placehold.co/200x200/2563eb/ffffff?text=DT"
    },
    {
      name: "Rudra Kankotiya",
      role: "Co-founder & CMO",
      initials: "RK",
      linkedin: "https://www.linkedin.com/in/rudra-kankotiya-2173ab31a",
      photo: "https://placehold.co/200x200/2563eb/ffffff?text=RK"
    },
    {
      name: "Jal Anghan",
      role: "Founder & Director",
      initials: "JA",
      linkedin: "https://www.linkedin.com/in/jal-anghan-534628309",
      photo: "https://placehold.co/200x200/2563eb/ffffff?text=JA"
    }
  ];

  // --- Deep Knowledge Base (35+ entries covering all company topics) ---
  const botKnowledge = [

    // ── Company Identity ──
    {
      keywords: ["who are you", "what is intelliverse", "about intelliverse", "about the intelliverse", "about company", "about you", "tell me about", "describe", "introduction", "overview"],
      response: "**The Intelliverse** is a dynamic software development company dedicated to providing innovative digital solutions.\n\nWe specialize in:\n* 🌐 **Web Development** — Responsive websites & web apps\n* 💻 **Software Development** — Custom SaaS, mobile & enterprise apps\n* ☁️ **IT Services** — Cloud, DevOps & ongoing support\n\nOur mission: *Transform your ideas into powerful digital realities.*"
    },
    {
      keywords: ["vision", "mission", "goal", "purpose", "aim", "objective"],
      response: "**Our Vision**: To be at the forefront of digital innovation, creating solutions that drive progress.\n\n**Our Mission**: To transform your ideas into powerful digital realities, ensuring growth and success through technology and creativity.\n\nWe live by **Innovation, Create and Grow** — building premium digital products that propel businesses forward."
    },
    {
      keywords: ["slogan", "tagline", "motto", "innovation create", "one stop", "brand"],
      response: "Our tagline is:\n> **\"Innovation, Create and Grow\"**\n\nThe Intelliverse is your **one-stop solution** for software development, web development, and IT services — everything you need to grow digitally, under one roof."
    },
    {
      keywords: ["values", "culture", "principles", "work ethic", "belief", "philosophy"],
      response: "At The Intelliverse, we are guided by:\n\n* ✅ **Innovation First** — We constantly explore the latest tech\n* ✅ **Client-Centric** — Your success is our success\n* ✅ **Transparency** — Open, honest communication at every step\n* ✅ **Quality Over Quantity** — We deliver right, not just fast\n* ✅ **Continuous Growth** — We learn, iterate, and improve always\n* ✅ **Long-Term Partnership** — We stay with you beyond go-live"
    },
    {
      keywords: ["story", "history", "founded", "when started", "background", "origin", "how old"],
      response: "**The Intelliverse** was co-founded by three passionate entrepreneurs — Dhruvil, Rudra, and Jal — with a shared vision to help businesses thrive through digital innovation.\n\nFrom building premium websites to complex SaaS portals, we have grown into a trusted technology partner for businesses across India and globally."
    },

    // ── Services Overview ──
    {
      keywords: ["service", "what do you do", "offer", "capabilities", "what can you do", "help with", "how can you help", "solutions", "provide"],
      response: "We offer three core service pillars:\n\n🌐 **Web Development**\nBeautiful, fast, SEO-optimized websites and web applications.\n\n💻 **Software Development**\nCustom SaaS portals, mobile apps, and enterprise systems.\n\n🔧 **IT Services**\nCloud hosting, DevOps pipelines, security, and ongoing maintenance.\n\nEvery solution is **100% custom-built** — no templates, ever. Say **\"get a quote\"** to start!"
    },

    // ── Web Development ──
    {
      keywords: ["web development", "website", "web app", "web application", "frontend", "backend", "landing page", "responsive"],
      response: "Our **Web Development** services:\n\n* ⚡ **Next.js & React** — Blazing-fast, SEO-friendly web apps\n* 📱 **Mobile-first responsive** — Perfect on every screen size\n* 🛒 **E-Commerce stores** with secure payment integration\n* 🔐 **Admin dashboards & CMS** — Easily manage your content\n* 🔗 **API integrations** — Connect any third-party service\n* 🎨 **Premium UI/UX Design** — Modern, stunning interfaces\n* 📊 **Analytics & SEO** — Built-in from day one"
    },

    // ── Software Development ──
    {
      keywords: ["software development", "custom software", "application", "app development", "enterprise", "automation"],
      response: "Our **Software Development** services:\n\n* 📱 **Native Mobile Apps** — iOS & Android\n* ☁️ **SaaS Platforms** — Multi-tenant, subscription-based\n* 🏢 **Enterprise Portals** — CRM, HRM, ERP systems\n* 🤖 **Business Automation** — Save time and reduce errors\n* 🔌 **Microservice APIs** — Scalable backend architecture\n* 📊 **Real-time Dashboards** — Live analytics and reporting\n* 🔐 **Secure Auth Systems** — JWT, OAuth, role-based access"
    },

    // ── Mobile App ──
    {
      keywords: ["mobile app", "android", "ios", "flutter", "react native", "smartphone", "iphone", "cross platform"],
      response: "We build **premium mobile applications**:\n\n* 📱 **Android & iOS** — Native and cross-platform\n* 🛠️ **Flutter & React Native** — Write once, run everywhere\n* 🔔 **Push Notifications** — Keep users engaged\n* 📴 **Offline Support** — Works without internet\n* 🚀 **App Store Deployment** — We handle publishing too\n* 🌐 **Backend APIs** — Scalable Node.js server for your app"
    },

    // ── IT Services ──
    {
      keywords: ["it service", "it support", "infrastructure", "devops", "cloud", "hosting", "server", "maintenance", "aws", "vercel"],
      response: "Our **IT Services**:\n\n* ☁️ **Cloud Hosting** — AWS, Vercel, Firebase, DigitalOcean\n* 🐳 **DevOps Pipelines** — Docker, CI/CD, GitHub Actions\n* 🔒 **Security Audits** — Vulnerability scanning, SSL, firewall\n* 📊 **24/7 Monitoring** — Uptime tracking and instant alerts\n* 🗃️ **Database Management** — MongoDB, PostgreSQL optimization\n* 🔄 **Cloud Migrations** — Move legacy systems to cloud\n* 🛠️ **Ongoing Maintenance** — Regular updates and patches"
    },

    // ── E-Commerce ──
    {
      keywords: ["ecommerce", "e-commerce", "online store", "shop", "shopify", "payment", "woocommerce", "cart", "product"],
      response: "We build **powerful E-Commerce platforms**:\n\n* 🛒 Custom product catalogs and inventory management\n* 💳 Secure payment gateways — Stripe, Razorpay, PayPal\n* 📦 Order tracking, cart, wishlist, and returns management\n* 📊 Admin dashboard for sales analytics and reporting\n* 📱 Mobile-first, conversion-optimized shopping experiences\n* 🔍 SEO-optimized product pages\n* 🎯 Streamlined checkout flows to maximize conversions"
    },

    // ── SaaS ──
    {
      keywords: ["saas", "software as a service", "subscription", "platform", "portal", "multi-tenant"],
      response: "We specialize in **SaaS platform development**:\n\n* 🏢 Multi-tenant architecture with role-based access\n* 💰 Subscription billing and plan management\n* 📊 Real-time data dashboards and analytics\n* 📱 WhatsApp, Email & SMS automated notifications\n* 🏥 Industry-specific portals — Healthcare, HRM, CRM\n* 🔐 Secure data lockers and compliance features\n* 🌐 White-label reseller solutions\n\nOur live example: **Appointory** — a full SaaS healthcare portal!"
    },

    // ── UI/UX Design ──
    {
      keywords: ["design", "ui", "ux", "ui/ux", "figma", "wireframe", "prototype", "interface", "user experience", "graphic"],
      response: "Our **UI/UX Design** capabilities:\n\n* 🎨 **Figma** design systems and click-through prototypes\n* 📐 **Wireframing** — User flow and information architecture\n* 🖥️ **Interactive Prototypes** — Demo before a single line of code\n* 📱 **Responsive Design** — Desktop, tablet, and mobile\n* ⚡ **Micro-animations** — Smooth, engaging transitions\n* 🌗 **Dark & Light themes** — Modern glassmorphism aesthetics\n\nEvery product we build is designed to *wow* users at first glance."
    },

    // ── Tech Stack ──
    {
      keywords: ["tech", "stack", "technology", "react", "next", "node", "mongodb", "tools", "framework", "language", "programming", "typescript"],
      response: "Our complete tech stack:\n\n**Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS, Framer Motion\n\n**Backend**: Node.js, Express, Next.js API Routes, REST & GraphQL\n\n**Database**: MongoDB, PostgreSQL, Firebase Firestore, Redis\n\n**Cloud & DevOps**: AWS, Vercel, Docker, GitHub Actions, CI/CD\n\n**Mobile**: React Native, Flutter\n\n**Integrations**: Stripe, Razorpay, Twilio, WhatsApp API, OpenAI/Gemini API\n\nWe always select the right tools to maximize performance for your project."
    },

    // ── Integrations ──
    {
      keywords: ["integration", "api", "third party", "whatsapp", "stripe", "razorpay", "payment gateway", "sms", "twilio", "openai", "connect"],
      response: "We integrate with the best third-party services:\n\n* 💬 **WhatsApp API** — Automated status and notification messages\n* 💳 **Payment Gateways** — Stripe, Razorpay, PayPal\n* 📧 **Email Services** — Nodemailer, SendGrid, Mailchimp\n* 📱 **SMS** — Twilio, MSG91\n* 🤖 **AI/ML** — OpenAI, Google Gemini API integration\n* 📍 **Maps** — Google Maps API\n* 📊 **Analytics** — Google Analytics, Mixpanel, Hotjar"
    },

    // ── SEO & Performance ──
    {
      keywords: ["seo", "search engine", "google ranking", "performance", "speed", "optimization", "lighthouse", "core web vitals", "traffic"],
      response: "We build with **SEO & Performance first**:\n\n* 🔍 **On-page SEO** — Meta tags, structured data, XML sitemaps\n* ⚡ **Core Web Vitals** — LCP, FID, CLS all optimized\n* 🖼️ **Image Optimization** — WebP format, lazy loading\n* 📄 **SSR/SSG** — Next.js server rendering for fast Google indexing\n* 📊 **Analytics Setup** — Google Analytics and Search Console\n* 🌐 **CDN** — Global content delivery for maximum speed\n\nYour website will rank *and* perform — not just look beautiful."
    },

    // ── Security ──
    {
      keywords: ["security", "secure", "ssl", "https", "data protection", "privacy", "safe", "encryption", "gdpr", "vulnerability"],
      response: "We take **security seriously** at every layer:\n\n* 🔐 **SSL/HTTPS** — Enforced across all deployments\n* 🛡️ **JWT & OAuth** — Industry-standard authentication\n* 🔒 **Role-based access control** — Granular user permissions\n* 📋 **Input validation & sanitization** — Prevent SQL injection, XSS\n* 🔑 **Encrypted data storage** — Sensitive data always encrypted\n* 🧪 **Security audits** — Before every major product launch\n* 🔄 **Regular security patches** — Post-launch ongoing maintenance"
    },

    // ── Founders ──
    {
      keywords: ["founder", "founders", "team", "leader", "co-founder", "cto", "cmo", "director", "who runs", "who leads", "who started", "leadership", "meet the team"],
      response: "Meet the visionary founders of **The Intelliverse**:"
    },
    {
      keywords: ["dhruvil", "thummar", "dhruvil thummar", "chief technology"],
      response: "**Dhruvil Thummar** — **Co-founder & CTO** 👨‍💻\n\nDhruvil leads all technical architecture, engineering strategy, and product development. He ensures every product is scalable, secure, and state-of-the-art.\n\n🔗 [LinkedIn](https://www.linkedin.com/in/dhruvilthummar)"
    },
    {
      keywords: ["rudra", "kankotiya", "rudra kankotiya", "chief marketing"],
      response: "**Rudra Kankotiya** — **Co-founder & CMO** 📢\n\nRudra drives all marketing strategies, brand identity, content, and client acquisition — ensuring we reach the right businesses with the right message.\n\n🔗 [LinkedIn](https://www.linkedin.com/in/rudra-kankotiya-2173ab31a)"
    },
    {
      keywords: ["jal", "anghan", "jal anghan", "founder director"],
      response: "**Jal Anghan** — **Founder & Director** 🎯\n\nJal provides high-level strategic direction, oversees all business operations, and shapes the long-term vision and partnerships that drive The Intelliverse forward.\n\n🔗 [LinkedIn](https://www.linkedin.com/in/jal-anghan-534628309)"
    },

    // ── Portfolio ──
    {
      keywords: ["appointory", "healthcare", "health", "hospital", "appointment", "queue", "health locker", "medical"],
      response: "**Appointory** is our flagship SaaS healthcare portal:\n\n* ⚡ **Automated queues** — No more waiting room chaos\n* 📱 **WhatsApp status alerts** — Patients notified in real-time\n* 🏥 **Secure Health Locker** — Store prescriptions & reports safely\n* 📊 **Real-time admin dashboard** — Full clinic control panel\n* ⭐ **Rated 5/5** by our client\n\nSay **\"show worked projects\"** to see our full live portfolio!"
    },
    {
      keywords: ["project", "portfolio", "work", "worked", "delivered", "case", "works", "show projects", "case study"],
      response: null // handled dynamically from DB
    },

    // ── Stats ──
    {
      keywords: ["stats", "statistics", "achievements", "numbers", "metrics", "how many", "clients", "satisfaction", "track record"],
      response: null // handled dynamically from DB
    },

    // ── Testimonials ──
    {
      keywords: ["review", "testimonial", "client say", "feedback", "rating", "satisfaction", "opinion", "what clients think"],
      response: null // handled dynamically from DB
    },

    // ── Contact ──
    {
      keywords: ["contact", "email", "phone", "support", "reach", "touch", "get in touch", "how to contact", "connect", "message us"],
      response: "📬 **Get in touch:**\n\n* **Email**: theintelliverse@gmail.com\n* **Contact Form**: Scroll to the **Contact** section on this page\n* **LinkedIn**: Connect with our founders directly\n\nWe reply to every inquiry **within 24 hours!** 🚀\n\nWant a quote? Say **\"get a quote\"** and I'll collect your info right here."
    },

    // ── Timeline ──
    {
      keywords: ["time", "timeline", "duration", "how long", "delivery", "deadline", "when", "fast", "quick", "speed"],
      response: "⏱️ **Typical project timelines:**\n\n* **Landing Pages / MVPs**: 2–3 weeks\n* **Custom Web Apps**: 6–10 weeks\n* **SaaS Platforms**: 10–16 weeks\n* **Mobile Apps**: 8–14 weeks\n* **Enterprise Portals**: 16+ weeks\n\nWe send **weekly sprint demos** — you always know exactly where your project stands."
    },

    // ── Pricing ──
    {
      keywords: ["price", "pricing", "cost", "how much", "budget", "affordable", "cheap", "expensive", "rate", "fees"],
      response: "💰 **Our pricing is always custom** — tailored to your requirements.\n\nTypical starting ranges:\n* **Landing Pages**: From ₹15,000\n* **Web Portals / Dashboards**: ₹50,000 – ₹2,00,000+\n* **SaaS Platforms**: ₹1,00,000 – ₹5,00,000+\n* **Mobile Apps**: ₹80,000 – ₹3,00,000+\n* **Enterprise Systems**: Custom pricing\n\nSay **\"get a quote\"** for a free personalized estimate! 💼"
    },

    // ── Process ──
    {
      keywords: ["process", "how do you work", "workflow", "methodology", "approach", "agile", "steps", "sprint", "development cycle"],
      response: "Our **6-step agile process:**\n\n1. 🔍 **Discovery** — Understand your goals, users, and requirements\n2. 🎨 **UI/UX Design** — Figma wireframes and interactive prototypes\n3. ⚙️ **Development** — Agile sprints with weekly demos\n4. 🧪 **Testing & QA** — Cross-device, performance & security tests\n5. 🚀 **Launch** — Deployment with monitoring and analytics setup\n6. 🔧 **Post-Launch** — Ongoing support, updates, and scaling\n\nTransparency and communication sit at the heart of every project."
    },

    // ── Post-Launch Support ──
    {
      keywords: ["support", "maintenance", "update", "bug", "fix", "post-launch", "after delivery", "ongoing", "help after", "patch"],
      response: "We provide **dedicated post-launch support**:\n\n* 🐛 Bug fixes and critical issue resolution\n* 🔄 Feature updates and new module additions\n* 📈 Performance monitoring and optimization\n* 🔐 Security patches and SSL renewals\n* 📊 Analytics reports and business insights\n* 🔧 Server maintenance and auto-scaling\n\nWe are your **long-term digital partner** — not just a one-time vendor. 🤝"
    },

    // ── Why Choose Us ──
    {
      keywords: ["why", "choose", "different", "better", "advantage", "unique", "special", "benefit", "compare", "vs"],
      response: "Why **The Intelliverse** is the right choice:\n\n* ✅ **100% Custom** — No templates, tailored to your brand\n* ✅ **Modern Tech** — Next.js, React, Node.js, MongoDB\n* ✅ **Agile & Transparent** — Weekly sprints, open communication\n* ✅ **100% Client Satisfaction** — Proven track record\n* ✅ **Post-Launch Support** — We don't disappear after delivery\n* ✅ **SEO & Performance First** — Every product optimized by default\n* ✅ **Competitive Pricing** — Premium quality at fair rates\n* ✅ **All-in-One Partner** — Design, Dev, IT & Support under one roof\n\nReady to get started? Say **\"get a quote\"**!"
    },

    // ── Hiring ──
    {
      keywords: ["hire", "hiring", "job", "career", "work for", "join", "internship", "position", "vacancy", "apply", "opportunity", "fresher"],
      response: "🎉 **Join The Intelliverse Team!**\n\nWe are always looking for:\n* 👨‍💻 Full-stack Developers (Next.js, Node.js)\n* 🎨 UI/UX Designers (Figma)\n* 📢 Digital Marketing Specialists\n* 📱 Mobile App Developers (Flutter / React Native)\n* 🧪 QA & Testing Engineers\n\n📧 **theintelliverse@gmail.com**\nSubject: *\"Career Inquiry — [Your Role]\"*\n\nFreshers are welcome to apply for internship positions!"
    },

    // ── Location ──
    {
      keywords: ["where", "location", "based", "office", "address", "country", "city", "india", "remote", "global"],
      response: "🌍 **The Intelliverse** is a **digital-first company** working across India and globally.\n\nAll our projects are delivered remotely — with crystal-clear communication, regular live demos, and full transparency at every milestone.\n\n📧 Reach us anytime: **theintelliverse@gmail.com**"
    },

    // ── Greetings ──
    {
      keywords: ["hello", "hi", "hey", "greet", "good morning", "good evening", "good afternoon", "howdy", "yo", "sup", "namaste"],
      response: "Hello! 👋 I am the **Intelliverse AI** — your smart guide to everything about our company.\n\nI can help with:\n* 🌐 **Services** — Web, Software & IT\n* 👥 **Meet the Founders**\n* 💼 **Portfolio Projects** (live from DB)\n* 💰 **Get a Custom Quote**\n* ⏱️ **Timelines & Pricing**\n* 🔧 **Tech Stack & Process**\n\nWhat would you like to know? 😊"
    },

    // ── Thanks ──
    {
      keywords: ["thank", "thanks", "appreciate", "grateful", "awesome", "great", "nice", "wonderful", "perfect", "amazing"],
      response: "You are most welcome! 😊 It is a pleasure helping you learn about The Intelliverse.\n\nFeel free to ask anything else, or say **\"get a quote\"** to kickstart your project. We would love to work with you! 🚀"
    },

    // ── Goodbye ──
    {
      keywords: ["bye", "goodbye", "see you", "later", "cya", "take care", "farewell", "good night"],
      response: "Goodbye! 👋 It was wonderful chatting with you. Come back anytime — I am here 24/7.\n\nHave an amazing day and we hope to build something great together! 🚀"
    }
  ];

  const priceKeywords = ["price", "pricing", "quote", "cost", "how much", "custom project", "estimate", "build", "hire", "develop", "consultation", "rate", "get a quote"];

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (chatbotOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isTyping, chatbotOpen, isMinimized]);

  // Load database layout data on mount
  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => setDbData(data))
      .catch((err) => console.error("Error loading chat bot DB layout:", err));
  }, []);

  // Session Chat History Persistence - Load on Mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("chatbot_messages");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.length > 0) {
          setMessages(parsed);
          return;
        }
      }
    } catch (e) {
      console.warn("Could not load chatbot history from sessionStorage:", e);
    }
    setMessages([
      { text: "Hello! 👋 I am the **Intelliverse AI** assistant — your guide to everything about our services, portfolio, and team.\n\nHow can I help you today?", sender: "bot" }
    ]);
  }, []);

  // Session Chat History Persistence - Save on change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        sessionStorage.setItem("chatbot_messages", JSON.stringify(messages));
      } catch (e) {
        console.warn("Could not save chatbot history:", e);
      }
    }
  }, [messages]);

  // Load sound preference from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("chatbot_sound_enabled");
      if (saved !== null) setSoundEnabled(saved === "true");
    } catch (e) { /* ignore */ }
  }, []);

  // Play synthetic chime
  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(523.25, now);
      gain1.gain.setValueAtTime(0.06, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.15);
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(659.25, now + 0.07);
      gain2.gain.setValueAtTime(0.06, now + 0.07);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.07);
      osc2.stop(now + 0.25);
    } catch (err) { /* ignore */ }
  };

  const toggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    try { localStorage.setItem("chatbot_sound_enabled", String(nextVal)); } catch (e) { /* ignore */ }
  };

  // TTS Speech Synthesis
  const handleSpeech = (text, index) => {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    if (speakingMsgIndex === index) { stopSpeech(); return; }
    stopSpeech();
    const cleanText = text.replace(/\*\*|\*/g, "").replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1").replace(/`([^`]+)`/g, "$1");
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.onend = () => setSpeakingMsgIndex(null);
    utterance.onerror = () => setSpeakingMsgIndex(null);
    setSpeakingMsgIndex(index);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if (typeof window !== "undefined" && window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeakingMsgIndex(null);
  };

  useEffect(() => { if (!chatbotOpen) stopSpeech(); }, [chatbotOpen]);

  // Dynamic Context-Aware Suggestion Engine
  const updateSuggestions = (category) => {
    switch (category) {
      case "lead_capture":
      case "pricing":
        setSuggestions(["Cancel request"]);
        break;
      case "services":
        setSuggestions(["Show worked projects", "How much does a project cost?", "Who are the founders?", "How do you work?"]);
        break;
      case "projects":
        setSuggestions(["What services do you offer?", "Get a project quote", "Read client reviews", "What's your tech stack?"]);
        break;
      case "testimonials":
        setSuggestions(["View worked projects", "Get a project quote", "Who are the founders?", "Why choose Intelliverse?"]);
        break;
      case "about":
        setSuggestions(["What services do you offer?", "Show worked projects", "Get a project quote", "What's your vision?"]);
        break;
      case "founders":
        setSuggestions(["What services do you offer?", "Show worked projects", "What's the tech stack?", "Get a quote"]);
        break;
      default:
        setSuggestions(["What services do you offer?", "Who are the founders?", "Show worked projects", "How can I get a quote?"]);
        break;
    }
  };

  const handleChatSend = (customText) => {
    const text = typeof customText === "string" ? customText.trim() : chatInput.trim();
    if (!text) return;

    stopSpeech();
    setMessages((prev) => [...prev, { text, sender: "user" }]);
    setChatInput("");
    setIsTyping(true);

    if (leadState !== "idle" || priceKeywords.some(kw => text.toLowerCase().includes(kw))) {
      updateSuggestions("lead_capture");
    }

    setTimeout(async () => {
      setIsTyping(false);
      const lowerInput = text.toLowerCase();
      let botResponse = "";
      let category = "general";
      let msgType = undefined;

      // Cancel lead capture
      if (leadState !== "idle" && ["cancel", "exit", "quit", "cancel request", "back", "nevermind", "no"].includes(lowerInput)) {
        setLeadState("idle");
        setLeadData({ email: "", initialQuery: "" });
        botResponse = "No worries! Lead capture cancelled. 👍\n\nWhat else would you like to know?";
        setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
        updateSuggestions("general");
        playChime();
        return;
      }

      // Lead capture - waiting for email
      if (leadState === "waiting_email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(text)) {
          botResponse = "Hmm, that doesn't look like a valid email address. Could you double-check and try again?\n\n*(Type **cancel** to go back)*";
          setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
          playChime();
          return;
        }
        setLeadData((prev) => ({ ...prev, email: text }));
        setLeadState("waiting_name");
        botResponse = "Perfect! ✅ And what is your **full name**?";
        setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
        playChime();
        return;
      }

      // Lead capture - waiting for name
      if (leadState === "waiting_name") {
        const name = text;
        const email = leadData.email;
        const initialQuery = leadData.initialQuery;
        setLeadState("idle");
        setLeadData({ email: "", initialQuery: "" });

        try {
          const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message: `Chatbot Lead Inquiry: "${initialQuery}"` })
          });
          const result = await res.json();
          if (result.success) {
            botResponse = `Thank you, **${name}**! 🎉\n\nYour project inquiry has been submitted successfully. A confirmation has been sent to **${email}** and our team has been alerted.\n\nWe'll get back to you within **24 hours**. Is there anything else I can help with?`;
          } else {
            botResponse = `Thanks, **${name}**! I've noted your inquiry. We will contact you at **${email}** soon.`;
          }
        } catch (error) {
          botResponse = `Thanks, **${name}**! I've captured your details. Our team will reach out to **${email}** shortly.`;
        }

        setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
        updateSuggestions("general");
        playChime();
        return;
      }

      // --- Smart Intent Detection ---
      const isPriceInquiry = priceKeywords.some(kw => lowerInput.includes(kw));
      const isFoundersInquiry = ["founder", "founders", "team", "leader", "co-founder", "cto", "cmo", "director", "dhruvil", "rudra", "jal", "who runs", "who leads", "who started", "meet the"].some(kw => lowerInput.includes(kw));
      const isProjectInquiry = ["project", "portfolio", "work", "worked", "delivered", "case", "app", "works", "show projects", "case study", "appointory", "saas"].some(kw => lowerInput.includes(kw));
      const isTestimonialInquiry = ["review", "testimonial", "client say", "feedback", "rating", "what our clients", "opinion"].some(kw => lowerInput.includes(kw));
      const isStatsInquiry = ["stats", "statistics", "achievements", "number", "metrics", "how many clients", "how many projects", "satisfaction rate"].some(kw => lowerInput.includes(kw));

      // Match custom admin-managed Q&As first
      let matchedAdminQA = null;
      if (dbData?.chatbotKnowledge && Array.isArray(dbData.chatbotKnowledge)) {
        for (const item of dbData.chatbotKnowledge) {
          const kwStr = item.keywords || "";
          const kws = kwStr.split(",").map(k => k.trim().toLowerCase()).filter(Boolean);
          if (kws.some(kw => lowerInput.includes(kw))) {
            matchedAdminQA = item;
            break;
          }
        }
      }

      // Priority 1: Price inquiry → lead capture
      if (isPriceInquiry && !isProjectInquiry) {
        setLeadState("waiting_email");
        setLeadData({ email: "", initialQuery: text });
        botResponse = "I'd love to help you get a custom project quote! 💼\n\nCould you please provide your **email address** so our team can prepare a personalized estimate?";
        category = "pricing";
      }
      // Priority 2: Admin-managed custom Q&A
      else if (matchedAdminQA) {
        botResponse = matchedAdminQA.response;
        const kwStr = matchedAdminQA.keywords.toLowerCase();
        if (kwStr.includes("project") || kwStr.includes("work") || kwStr.includes("portfolio")) { msgType = "projects"; category = "projects"; }
        else if (kwStr.includes("founder") || kwStr.includes("team")) { msgType = "founders"; category = "founders"; }
        else if (kwStr.includes("service")) { category = "services"; }
        else if (kwStr.includes("review") || kwStr.includes("testimonial")) { category = "testimonials"; }
        else { category = "general"; }
      }
      // Priority 3: Founders inquiry
      else if (isFoundersInquiry) {
        botResponse = "Meet the **founders and directors** of The Intelliverse who drive our technical and creative execution:";
        msgType = "founders";
        category = "founders";
      }
      // Priority 4: Projects (from DB)
      else if (isProjectInquiry) {
        if (dbData?.projects && dbData.projects.length > 0) {
          botResponse = `We have delivered **${dbData.projects.length}** premium project${dbData.projects.length > 1 ? "s" : ""}! Here are the highlights from our live database:`;
        } else {
          botResponse = "We've worked on several premium custom websites, SaaS portals, mobile applications, and enterprise software. Our portfolio includes projects like **Appointory** — a digital healthcare platform with automated queues, WhatsApp status alerts, and a Secure Health Locker.\n\nWant to discuss your project? Just say **\"get a quote\"**!";
        }
        msgType = "projects";
        category = "projects";
      }
      // Priority 5: Testimonials (from DB)
      else if (isTestimonialInquiry) {
        if (dbData?.testimonials && dbData.testimonials.length > 0) {
          botResponse = "Here's what our clients say about our work:\n\n" +
            dbData.testimonials.map((t) => `* \"*${t.text}*\" — **${t.author}**`).join("\n");
        } else {
          botResponse = "Our clients love the work we deliver! Here's what they say:\n\n* \"*The Intelliverse delivered an outstanding product on time and on budget. Highly recommended!*\" — **Client A**\n* \"*A fantastic team to work with. Professional, creative, and highly skilled.*\" — **Client B**\n* \"*Our new website has seen a significant increase in traffic thanks to their expertise.*\" — **Client C**";
        }
        category = "testimonials";
      }
      // Priority 6: Stats (from DB)
      else if (isStatsInquiry) {
        const stats = dbData?.stats || { projects: 1, satisfaction: 100, clients: 4 };
        botResponse = `Here are our verified achievements:\n\n* 🏆 **${stats.projects || 1}+** Projects Completed\n* 🎯 **${stats.satisfaction || 100}%** Client Satisfaction\n* 🤝 **${stats.clients || 4}+** Happy Clients\n\nOur track record speaks for itself!`;
        category = "testimonials";
      }
      // Priority 7: About (from DB)
      else {
        // Try deep knowledge base
        let found = false;
        for (const item of botKnowledge) {
          if (item.response === null) continue; // skip DB-handled entries
          if (item.keywords.some(keyword => lowerInput.includes(keyword))) {
            botResponse = item.response;
            found = true;
            // Detect category for chip suggestions
            if (item.keywords.some(k => ["founder", "dhruvil", "rudra", "jal"].includes(k))) {
              msgType = "founders";
              category = "founders";
            } else if (item.keywords.some(k => ["service", "web development", "software development", "it service"].includes(k))) {
              category = "services";
            } else if (item.keywords.some(k => ["about", "vision", "who are you"].includes(k))) {
              // If about from DB is available, enhance
              if (dbData?.about?.p1 && item.keywords.includes("who are you")) {
                botResponse = `**About The Intelliverse**:\n${dbData.about.p1}\n\nOur mission is to transform your ideas into powerful digital realities!`;
              }
              category = "about";
            }
            break;
          }
        }

        if (!found) {
          // Smart fallback — try to understand partial matches
          const words = lowerInput.split(/\s+/).filter(w => w.length > 2);
          let partialMatch = null;
          for (const item of botKnowledge) {
            if (item.response === null) continue;
            if (item.keywords.some(kw => words.some(w => kw.includes(w) || w.includes(kw)))) {
              partialMatch = item;
              break;
            }
          }
          
          if (partialMatch) {
            botResponse = partialMatch.response;
          } else {
            botResponse = "I'm not sure I understood that, but I'm here to help! 🤔\n\nI can tell you about:\n* **Our Services** — Web, Software & IT\n* **The Founders** — Who leads Intelliverse\n* **Worked Projects** — Our portfolio\n* **Getting a Quote** — Start your project\n* **Tech Stack** — What we build with\n* **Our Process** — How we work\n\nJust pick a topic or ask me anything!";
          }
          category = "general";
        }
      }

      setMessages((prev) => [...prev, { text: botResponse, sender: "bot", type: msgType }]);
      updateSuggestions(category);
      playChime();
    }, 800 + Math.random() * 500); // Slightly variable delay for realism
  };

  const handleClearChat = () => {
    stopSpeech();
    setMessages([
      { text: "Hello! 👋 I am the **Intelliverse AI** assistant — your guide to everything about our services, portfolio, and team.\n\nHow can I help you today?", sender: "bot" }
    ]);
    setLeadState("idle");
    setLeadData({ email: "", initialQuery: "" });
    setSuggestions(["What services do you offer?", "Who are the founders?", "Show worked projects", "How can I get a quote?"]);
    try { sessionStorage.removeItem("chatbot_messages"); } catch (e) { /* ignore */ }
  };

  // --- Advanced Formatting Parser ---
  const formatMessageText = (text) => {
    if (!text) return "";

    // Split by triple backticks for code blocks
    const blocks = text.split("```");
    if (blocks.length > 1) {
      return (
        <div className="space-y-1.5 w-full">
          {blocks.map((block, index) => {
            if (index % 2 === 1) {
              const lines = block.split("\n");
              const firstLine = lines[0].trim();
              const isLang = ["javascript", "js", "html", "css", "python", "bash", "json", "typescript", "ts"].includes(firstLine);
              const codeContent = isLang ? lines.slice(1).join("\n") : block;
              return (
                <pre key={index} className="bg-gray-950 border border-gray-800 rounded-lg p-3 my-2 overflow-x-auto text-[11px] font-mono text-pink-400 max-w-full">
                  <code>{codeContent.trim()}</code>
                </pre>
              );
            }
            return parseInlineContent(block, index);
          })}
        </div>
      );
    }
    return parseInlineContent(text, 0);
  };

  const parseInlineContent = (textVal, sectionIdx) => {
    const lines = textVal.split("\n");
    const parsedLines = lines.map((line, lineIdx) => {
      let content = line.trim();
      if (!content) return null;

      // Numbered list detection (1. 2. etc.)
      const isNumbered = /^\d+\.\s/.test(content);
      const isBullet = content.startsWith("* ") || content.startsWith("- ");
      
      if (isBullet) content = content.substring(2);
      if (isNumbered) {
        const numMatch = content.match(/^(\d+)\.\s(.*)/);
        if (numMatch) content = numMatch[2];
      }

      const formattedParts = parseInlineFormatting(content, sectionIdx, lineIdx);

      if (isBullet || isNumbered) {
        return (
          <li key={`li-${sectionIdx}-${lineIdx}`} className="ml-4 list-disc my-0.5 text-gray-300 text-[13px] leading-relaxed">
            {formattedParts}
          </li>
        );
      }
      return <p key={`p-${sectionIdx}-${lineIdx}`} className="my-0.5 text-gray-200 text-[13px] leading-relaxed">{formattedParts}</p>;
    });

    return <div key={`sec-${sectionIdx}`} className="space-y-0.5 w-full">{parsedLines}</div>;
  };

  const parseInlineFormatting = (content, sectionIdx, lineIdx) => {
    const parts = [];
    let lastIndex = 0;

    // Match markdown links [text](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;

    const parseBackticksAndBold = (str) => {
      const subParts = [];
      const codeParts = str.split("`");
      codeParts.forEach((part, cIdx) => {
        if (cIdx % 2 === 1) {
          subParts.push(
            <code key={`code-${sectionIdx}-${lineIdx}-${cIdx}`} className="bg-gray-800/80 border border-gray-700 px-1.5 py-0.5 rounded text-pink-400 font-mono text-[11px] mx-0.5">
              {part}
            </code>
          );
        } else {
          const boldParts = part.split("**");
          boldParts.forEach((bPart, bIdx) => {
            if (bIdx % 2 === 1) {
              subParts.push(
                <strong key={`bold-${sectionIdx}-${lineIdx}-${bIdx}`} className="font-extrabold text-blue-400">
                  {bPart}
                </strong>
              );
            } else {
              // Parse italic *text*
              const italicParts = bPart.split(/(?<!\*)\*(?!\*)/);
              italicParts.forEach((iPart, iIdx) => {
                if (iIdx % 2 === 1) {
                  subParts.push(<em key={`it-${sectionIdx}-${lineIdx}-${iIdx}`} className="italic text-gray-300">{iPart}</em>);
                } else {
                  subParts.push(iPart);
                }
              });
            }
          });
        }
      });
      return subParts;
    };

    linkRegex.lastIndex = 0;
    while ((match = linkRegex.exec(content)) !== null) {
      const plainText = content.substring(lastIndex, match.index);
      if (plainText) parts.push(...parseBackticksAndBold(plainText));
      parts.push(
        <a key={`link-${sectionIdx}-${lineIdx}-${match.index}`} href={match[2]} target="_blank" rel="noopener noreferrer"
          className="text-blue-400 underline hover:text-blue-300 font-semibold mx-0.5" onClick={(e) => e.stopPropagation()}>
          {match[1]}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }

    const remaining = content.substring(lastIndex);
    if (remaining) parts.push(...parseBackticksAndBold(remaining));
    return parts;
  };

  return (
    <div id="chatbot-container">
      {/* Floating Greeting Chip */}
      {showGreeting && !chatbotOpen && (
        <div id="chatbot-greeting-chip" className="flex items-center gap-2 relative">
          <span className="absolute -top-1 -left-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span onClick={() => { setChatbotOpen(true); setShowGreeting(false); }} className="cursor-pointer font-medium hover:text-blue-400 transition">
            Need assistance? Ask me! 💬
          </span>
          <button onClick={(e) => { e.stopPropagation(); setShowGreeting(false); }} className="text-gray-500 hover:text-gray-300 ml-1 cursor-pointer transition" title="Dismiss">
            <i className="fas fa-times text-xs"></i>
          </button>
        </div>
      )}

      {/* Chatbot Window */}
      <div id="chatbot-window" className={`${chatbotOpen ? "open" : ""} ${isMinimized ? "minimized" : ""}`}>
        {/* Chat Header */}
        <div id="chat-header" onClick={() => isMinimized && setIsMinimized(false)}
          className={`flex justify-between items-center select-none ${isMinimized ? "cursor-pointer" : ""}`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs shadow-lg shadow-blue-500/20 border border-blue-400/30 flex-shrink-0">
              <i className="fas fa-robot"></i>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold leading-tight">Intelliverse AI</span>
              <span className="text-[9px] text-emerald-400 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse inline-block"></span>
                Online • AI Assistant
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <button onClick={toggleSound} className="text-gray-400 hover:text-white transition p-1 text-xs cursor-pointer"
              title={soundEnabled ? "Mute" : "Unmute"}>
              <i className={`fas ${soundEnabled ? "fa-volume-up" : "fa-volume-mute"}`}></i>
            </button>
            <button onClick={handleClearChat} className="text-gray-400 hover:text-white transition p-1 text-xs cursor-pointer" title="Clear chat">
              <i className="fas fa-trash-alt"></i>
            </button>
            <button onClick={() => setIsMinimized(!isMinimized)} className="text-gray-400 hover:text-white transition p-1 text-xs cursor-pointer"
              title={isMinimized ? "Expand" : "Minimize"}>
              <i className={`fas ${isMinimized ? "fa-chevron-up" : "fa-minus"}`}></i>
            </button>
            <button onClick={() => { setChatbotOpen(false); setIsMinimized(false); }}
              className="text-gray-400 hover:text-white transition p-1 text-xs cursor-pointer" title="Close">
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div id="chat-messages" className="flex-1 relative">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} items-end gap-2 my-1`}>
              {msg.sender === "bot" && (
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-[9px] shadow-md shadow-blue-500/20 border border-blue-400/30 flex-shrink-0 mb-1">
                  <i className="fas fa-robot"></i>
                </div>
              )}
              <div className="flex flex-col max-w-[85%] min-w-0">
                <div className={`chat-message ${msg.sender === "user" ? "user-message" : "bot-message"} relative group`}>
                  {formatMessageText(msg.text)}
                  {msg.sender === "bot" && (
                    <button onClick={() => handleSpeech(msg.text, idx)}
                      className={`absolute -bottom-1 -right-6 p-0.5 text-[9px] rounded-full bg-gray-800/80 border border-gray-700/50 text-gray-500 hover:text-white transition duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer ${speakingMsgIndex === idx ? "!opacity-100 !text-blue-400 !border-blue-500/50 animate-pulse" : ""}`}
                      title={speakingMsgIndex === idx ? "Stop" : "Read aloud"}>
                      <i className={`fas ${speakingMsgIndex === idx ? "fa-stop" : "fa-volume-up"}`}></i>
                    </button>
                  )}
                </div>

                {/* Founders visual cards */}
                {msg.type === "founders" && (
                  <div className="chat-founders-grid mt-2 grid grid-cols-3 gap-1.5 w-full">
                    {foundersData.map((f, fIdx) => (
                      <a key={fIdx} href={f.linkedin} target="_blank" rel="noopener noreferrer"
                        className="founder-chat-card bg-gray-900/90 border border-gray-800 hover:border-blue-500/40 rounded-xl p-2 text-center flex flex-col items-center shadow-lg transition-all duration-300 hover:shadow-blue-500/10 hover:-translate-y-0.5 group/card cursor-pointer">
                        <img className="w-10 h-10 rounded-full border border-blue-500/30 mb-1 object-cover group-hover/card:border-blue-400 transition"
                          src={f.photo} alt={`Photo of ${f.name}`} />
                        <h4 className="text-[10px] font-bold text-white leading-tight">{f.name}</h4>
                        <p className="text-[8px] text-blue-400 font-medium mt-0.5">{f.role}</p>
                        <span className="text-[8px] text-gray-500 group-hover/card:text-blue-400 mt-1 flex items-center gap-0.5 transition">
                          <i className="fab fa-linkedin-in text-[8px]"></i> LinkedIn
                        </span>
                      </a>
                    ))}
                  </div>
                )}

                {/* Projects visual cards */}
                {msg.type === "projects" && dbData?.projects && dbData.projects.length > 0 && (
                  <div className="chat-projects-list mt-2 space-y-1.5 w-full">
                    {dbData.projects.map((p, pIdx) => (
                      <div key={pIdx} className="project-chat-card bg-gray-900/90 border border-gray-800 rounded-xl p-2.5 shadow-lg flex flex-col gap-1 hover:border-gray-700 transition">
                        <div className="flex justify-between items-center">
                          <h4 className="text-[11px] font-bold text-white flex items-center gap-1.5">
                            <i className="fas fa-folder-open text-blue-400 text-[9px]"></i>
                            {p.name}
                          </h4>
                          {p.rating && <span className="text-[9px] text-amber-400 font-bold flex items-center gap-0.5"><i className="fas fa-star text-[7px]"></i> {p.rating}</span>}
                        </div>
                        <p className="text-[10px] text-gray-400 leading-normal">{p.description}</p>
                        {p.review && (
                          <p className="text-[9px] text-gray-500 italic border-l-2 border-blue-500/30 pl-2 mt-0.5">"{p.review}"</p>
                        )}
                        <div className="flex gap-1.5 mt-1">
                          {p.link && (
                            <a href={p.link} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                              className="px-2 py-0.5 bg-blue-600/80 hover:bg-blue-500 text-white text-[8px] font-bold rounded transition">
                              <i className="fas fa-external-link-alt mr-0.5 text-[7px]"></i> Live Site
                            </a>
                          )}
                          {p.featureLink && (
                            <a href={p.featureLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                              className="px-2 py-0.5 bg-purple-600/80 hover:bg-purple-500 text-white text-[8px] font-bold rounded transition">
                              <i className="fas fa-play-circle mr-0.5 text-[7px]"></i> {p.featureText || "How its work!"}
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Gemini-style 2x2 starter cards grid */}
          {messages.length <= 1 && !isTyping && (
            <div className="starter-cards-grid mt-3 grid grid-cols-2 gap-2 w-full">
              {[
                { icon: "fa-laptop-code", color: "text-blue-400", label: "Services", prompt: "What services do you offer?", border: "hover:border-blue-500/40" },
                { icon: "fa-users", color: "text-purple-400", label: "Founders", prompt: "Who are the founders?", border: "hover:border-purple-500/40" },
                { icon: "fa-briefcase", color: "text-emerald-400", label: "Portfolio", prompt: "Show worked projects", border: "hover:border-emerald-500/40" },
                { icon: "fa-file-invoice-dollar", color: "text-amber-400", label: "Quote", prompt: "How can I get a quote?", border: "hover:border-amber-500/40" }
              ].map((card, cIdx) => (
                <button key={cIdx} onClick={() => handleChatSend(card.prompt)}
                  className={`starter-card text-left p-2.5 rounded-xl bg-gray-900/60 border border-gray-800 ${card.border} hover:bg-gray-800/60 transition-all duration-300 group cursor-pointer hover:-translate-y-0.5`}>
                  <i className={`fas ${card.icon} ${card.color} group-hover:scale-110 transition duration-300 mb-1 block text-sm`}></i>
                  <span className="text-[9px] text-gray-500 block font-semibold uppercase tracking-wider">{card.label}</span>
                  <span className="text-[10px] text-gray-300 block font-medium leading-tight mt-0.5">{card.prompt}</span>
                </button>
              ))}
            </div>
          )}

          {isTyping && (
            <div className="flex justify-start items-end gap-2 my-1">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-[9px] shadow-md shadow-blue-500/20 border border-blue-400/30 flex-shrink-0 mb-1">
                <i className="fas fa-robot"></i>
              </div>
              <div className="chat-message bot-message typing-indicator">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Dynamic Suggestion Chips */}
        {!isMinimized && (
          <div id="quick-replies-container">
            <div className="quick-replies">
              {suggestions.map((replyText, idx) => (
                <button key={idx} onClick={() => handleChatSend(replyText)}
                  className={`quick-reply ${replyText === "Cancel request" ? "border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white font-bold" : ""}`}>
                  {replyText === "Cancel request" && <i className="fas fa-times-circle mr-1"></i>}
                  {replyText}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Input */}
        <div id="chat-input-container">
          <input type="text" id="chat-input" value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
            placeholder={leadState === "waiting_email" ? "Enter your email address..." : leadState === "waiting_name" ? "Enter your name..." : "Ask anything about Intelliverse..."} />
          <button id="chat-send" onClick={() => handleChatSend()} title="Send message">
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>

      {/* Floating Chat Bubble */}
      <div id="chatbot-bubble" className="chatbot-pulse-container"
        onClick={() => { setChatbotOpen(!chatbotOpen); setIsMinimized(false); setShowGreeting(false); }}>
        <i className={`fas ${chatbotOpen ? "fa-times" : "fa-comment-dots"} text-2xl transition-transform duration-300`}></i>
      </div>
    </div>
  );
}
