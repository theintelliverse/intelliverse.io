import { cookies } from "next/headers";
import { clientPromise, localMockDb } from "@/lib/db";
import { verifySession, ensureDefaultAdmin } from "@/lib/auth";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import AdminPanel from "@/components/admin/AdminPanel";

const defaultTestimonials = [
  { text: "The Intelliverse delivered an outstanding product on time and on budget. Highly recommended!", author: "Client A" },
  { text: "A fantastic team to work with. Professional, creative, and highly skilled.", author: "Client B" },
  { text: "Our new website has seen a significant increase in traffic thanks to their expertise.", author: "Client C" },
  { text: "They transformed our vision into a reality. Exceptional work!", author: "Client D" }
];

const defaultStats = { projects: 50, satisfaction: 100, clients: 30 };

const dummySubmissions = [
  {
    _id: "mock-1",
    name: "Test Submitter",
    email: "test@example.com",
    message: "This is a demo contact submission showing how captured inputs and IPs look on the dashboard.",
    ip: "192.168.1.101",
    createdAt: new Date().toISOString()
  }
];

export default async function AdminPage() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("admin_session")?.value;

  let db = null;
  let isDbConnected = false;

  if (clientPromise) {
    try {
      const client = await clientPromise;
      db = client.db("intelliverse");
      isDbConnected = true;
    } catch (err) {
      console.error("DB connection error in Admin page.js:", err);
    }
  }

  // Seed default admin (admin / admin123) if admins collection is empty
  if (isDbConnected && db) {
    await ensureDefaultAdmin(db);
  }

  const currentUser = await verifySession(sessionToken, db);

  if (!currentUser) {
    return <AdminLoginForm />;
  }

  // Pre-fetch all data on the server
  let hero = { ...localMockDb.hero };
  let about = { ...localMockDb.about };
  let contact = { ...localMockDb.contact };
  let stats = { ...defaultStats };
  let estimator = localMockDb.estimator ? { ...localMockDb.estimator } : null;
  let testimonials = [...defaultTestimonials];
  let projects = [];
  let caseStudies = [];
  let submissions = [];
  let admins = ["admin"];
  let chatbotKnowledge = localMockDb.chatbotKnowledge || [];
  let founders = [...localMockDb.founders];

  if (isDbConnected && db) {
    try {
      const content = await db.collection("content").findOne({});
      if (content) {
        if (content.hero) hero = { ...hero, ...content.hero };
        if (content.about) about = { ...about, ...content.about };
        if (content.contact) contact = { ...contact, ...content.contact };
        if (content.stats) stats = content.stats;
        if (content.estimator) estimator = content.estimator;
      }
      
      const dbTestimonials = await db.collection("testimonials").find({}).toArray();
      if (dbTestimonials.length > 0) {
        testimonials = dbTestimonials.map(t => ({ text: t.text, author: t.author }));
      }

      const dbProjects = await db.collection("projects").find({}).toArray();
      if (dbProjects.length > 0) {
        projects = dbProjects.map(p => ({
          name: p.name,
          description: p.description || p.summary || "",
          summary: p.summary || p.description || "",
          role: p.role || "",
          impact: p.impact || "",
          link: p.link || "",
          review: p.review || "",
          rating: p.rating || 5,
          type: p.type || p.category || "",
          category: p.category || p.type || "",
          featureLink: p.featureLink || "",
          featureText: p.featureText || "",
          features: p.features || [],
          techTags: p.techTags || p.stack || [],
          stack: p.stack || p.techTags || [],
          tagline: p.tagline || "",
          isFeatured: p.isFeatured || false,
          logo: p.logo || p.logoUrl || p.image || "",
          icon: p.icon || ""
        }));
      } else {
        projects = localMockDb.projects || [];
      }

      const dbCaseStudies = await db.collection("case_studies").find({}).toArray();
      if (dbCaseStudies.length > 0) {
        caseStudies = dbCaseStudies.map((cs, idx) => ({
          id: cs.id || cs._id?.toString() || `cs-${idx + 1}`,
          num: cs.num || `0${idx + 1}`,
          name: cs.name || "",
          category: cs.category || cs.type || "",
          role: cs.role || "",
          impact: cs.impact || "",
          summary: cs.summary || cs.description || "",
          description: cs.description || cs.summary || "",
          stack: Array.isArray(cs.stack) ? cs.stack : (Array.isArray(cs.techTags) ? cs.techTags : []),
          techTags: Array.isArray(cs.techTags) ? cs.techTags : (Array.isArray(cs.stack) ? cs.stack : []),
          link: cs.link || "",
          review: cs.review || "",
          rating: cs.rating !== undefined ? Number(cs.rating) : 5
        }));
      } else {
        caseStudies = localMockDb.caseStudies || [];
      }

      const dbSubmissions = await db.collection("contacts").find({}).sort({ createdAt: -1 }).toArray();
      submissions = dbSubmissions.map(s => ({
        _id: s._id.toString(),
        name: s.name,
        email: s.email,
        message: s.message,
        ip: s.ip,
        createdAt: s.createdAt.toISOString()
      }));

      const dbAdmins = await db.collection("admins").find({}).project({ username: 1, _id: 0 }).toArray();
      if (dbAdmins.length > 0) {
        admins = dbAdmins.map(a => a.username);
      }

      const dbKnowledge = await db.collection("chatbot_knowledge").find({}).toArray();
      if (dbKnowledge.length > 0) {
        chatbotKnowledge = dbKnowledge.map(k => ({ keywords: k.keywords, response: k.response }));
      }

      const dbFounders = await db.collection("founders").find({}).sort({ order: 1 }).toArray();
      if (dbFounders.length > 0) {
        founders = dbFounders.map(f => {
          let customLinks = f.customLinks || [];
          if (customLinks.length === 0 && f.customLinkUrl) {
            customLinks = [{
              url: f.customLinkUrl,
              name: f.customLinkName || "Link",
              icon: f.customLinkIcon || "fas fa-link"
            }];
          }
          return {
            name: f.name,
            role: f.role,
            tagline: f.tagline || "",
            image: f.image || "",
            imageX: f.imageX !== undefined ? Number(f.imageX) : 50,
            imageY: f.imageY !== undefined ? Number(f.imageY) : 50,
            linkedin: f.linkedin || "",
            instagram: f.instagram || "",
            customLinkUrl: f.customLinkUrl || "",
            customLinkName: f.customLinkName || "",
            customLinkIcon: f.customLinkIcon || "",
            customLinks,
            order: f.order !== undefined ? Number(f.order) : 1
          };
        });
      }
    } catch (err) {
      console.error("Error pre-fetching admin data:", err);
    }
  } else {
    // Read from fallback mock in-memory DB if active
    if (localMockDb.stats) stats = localMockDb.stats;
    if (localMockDb.testimonials) testimonials = localMockDb.testimonials;
    if (localMockDb.projects) projects = localMockDb.projects;
    if (localMockDb.caseStudies) caseStudies = localMockDb.caseStudies;
    if (localMockDb.founders) founders = localMockDb.founders;
    submissions = dummySubmissions;
  }

  const initialData = {
    hero,
    about,
    contact,
    stats,
    estimator
  };

  return (
    <div
      className="h-screen max-h-screen w-full font-sans relative overflow-hidden"
      style={{
        backgroundColor: "var(--night)",
        color: "var(--cream)",
      }}
      data-lenis-prevent
    >
      {/* Background gradients */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[var(--blue-deep)]/10 rounded-full blur-[160px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-[var(--orange)]/5 rounded-full blur-[160px]"></div>
      </div>
      
      <div className="relative z-10 h-full w-full">
        <AdminPanel
          isOpen={true}
          data={initialData}
          testimonials={testimonials}
          projects={projects}
          caseStudies={caseStudies}
          submissions={submissions}
          admins={admins}
          chatbotKnowledge={chatbotKnowledge}
          founders={founders}
          currentUser={currentUser}
          dbStatus={isDbConnected ? "Connected" : "Mock DB Fallback (Offline)"}
        />
      </div>
    </div>
  );
}
