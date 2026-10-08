import { getDb, localMockDb, defaultTestimonials } from "@/lib/db";
import ClientHome from "./ClientHome";

// Ensure live MongoDB Atlas data is loaded dynamically on each request
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  let initialData = {
    hero: { ...localMockDb.hero },
    about: { ...localMockDb.about },
    contact: { ...localMockDb.contact },
    stats: { ...localMockDb.stats },
    estimator: { ...localMockDb.estimator },
    telemetry: { ...localMockDb.telemetry },
    services: localMockDb.services,
    process: localMockDb.process,
    marquee: localMockDb.marquee,
    philosophy: localMockDb.philosophy,
    testimonials: [...defaultTestimonials],
    projects: [...(localMockDb.projects || [])],
    caseStudies: [...(localMockDb.caseStudies || [])],
    founders: [...localMockDb.founders]
  };

  try {
    const db = await getDb();
    if (db) {
      const [content, testimonials, projects, caseStudies, founders] = await Promise.all([
        db.collection("content").findOne({}),
        db.collection("testimonials").find({}).toArray(),
        db.collection("projects").find({}).toArray(),
        db.collection("case_studies").find({}).toArray(),
        db.collection("founders").find({}).sort({ order: 1 }).toArray()
      ]);
      
      initialData = {
        hero: {
          headline: content?.hero?.headline || localMockDb.hero.headline,
          subtitle: content?.hero?.subtitle || localMockDb.hero.subtitle,
          status: content?.hero?.status || localMockDb.hero.status,
          pillarsText: content?.hero?.pillarsText || localMockDb.hero.pillarsText,
          caseStudiesHighlight: content?.hero?.caseStudiesHighlight || localMockDb.hero.caseStudiesHighlight,
          studioLocation: content?.hero?.studioLocation || localMockDb.hero.studioLocation,
        },
        about: {
          p1: content?.about?.p1 || localMockDb.about.p1,
          mission: content?.about?.mission || localMockDb.about.mission,
          pullQuote: content?.about?.pullQuote || localMockDb.about.pullQuote,
          modelsText: content?.about?.modelsText || localMockDb.about.modelsText,
        },
        contact: {
          email: content?.contact?.email || localMockDb.contact.email,
          linkedin: content?.contact?.linkedin || localMockDb.contact.linkedin,
          instagram: content?.contact?.instagram || localMockDb.contact.instagram,
        },
        stats: content?.stats && Number(content.stats.projects) > 0 ? content.stats : {
          projects: projects.length > 0 ? projects.length : 2,
          satisfaction: 100,
          clients: testimonials.length > 0 ? testimonials.length : 15
        },
        estimator: content?.estimator || localMockDb.estimator,
        telemetry: content?.telemetry || localMockDb.telemetry,
        services: content?.services || localMockDb.services,
        process: content?.process || localMockDb.process,
        marquee: content?.marquee || localMockDb.marquee,
        philosophy: content?.philosophy || localMockDb.philosophy,
        testimonials: (testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials).map(t => ({
          text: t.text || t.quote || "",
          author: t.author || "",
          role: t.role || "",
          project: t.project || "",
          tag: t.tag || "",
          rating: t.rating !== undefined ? Number(t.rating) : 5,
        })),
        projects: projects.length > 0
          ? projects.map(p => ({
              name: p.name,
              description: p.description || p.summary || "",
              summary: p.summary || p.description || "",
              role: p.role || "",
              impact: p.impact || "",
              stack: p.stack || p.techTags || [],
              techTags: p.techTags || p.stack || [],
              link: p.link || "",
              caseStudyLink: p.caseStudyLink || (p.name?.toLowerCase().includes("appointory") ? "/work/appointory" : p.name?.toLowerCase().includes("vrix") ? "/work/vrix" : ""),
              review: p.review || "",
              rating: p.rating || 5,
              type: p.type || p.category || "",
              category: p.category || p.type || "",
              featureLink: p.featureLink || "",
              featureText: p.featureText || "",
              isFeatured: p.isFeatured || false
            }))
          : (localMockDb.projects || []),
        caseStudies: caseStudies.length > 0
          ? caseStudies.map((cs, idx) => ({
              id: cs.id || cs._id?.toString() || `cs-${idx + 1}`,
              num: cs.num || `0${idx + 1}`,
              name: cs.name || "",
              category: cs.category || cs.type || "",
              role: cs.role || "",
              impact: cs.impact || "",
              problem: cs.problem || cs.summary || "",
              broke: cs.broke || "",
              result: cs.result || "",
              summary: cs.summary || cs.description || "",
              description: cs.description || cs.summary || "",
              stack: Array.isArray(cs.stack) ? cs.stack : (Array.isArray(cs.techTags) ? cs.techTags : []),
              techTags: Array.isArray(cs.techTags) ? cs.techTags : (Array.isArray(cs.stack) ? cs.stack : []),
              link: cs.link || "",
              caseStudyLink: cs.caseStudyLink || (cs.name?.toLowerCase().includes("appointory") ? "/work/appointory" : cs.name?.toLowerCase().includes("vrix") ? "/work/vrix" : ""),
              review: cs.review || "",
              rating: cs.rating !== undefined ? Number(cs.rating) : 5
            }))
          : (localMockDb.caseStudies || []),
        founders: founders.length > 0
          ? founders.map(f => {
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
                badge: f.badge || "",
                tagline: f.tagline || "",
                currently: f.currently || "",
                image: f.image || "",
                imageX: f.imageX !== undefined ? Number(f.imageX) : 50,
                imageY: f.imageY !== undefined ? Number(f.imageY) : 50,
                linkedin: f.linkedin || "",
                portfolio: f.portfolio || "",
                instagram: f.instagram || "",
                github: f.github || "",
                youtube: f.youtube || "",
                facebook: f.facebook || "",
                twitter: f.twitter || "",
                customLinkUrl: f.customLinkUrl || "",
                customLinkName: f.customLinkName || "",
                customLinkIcon: f.customLinkIcon || "",
                customLinks,
                order: f.order !== undefined ? Number(f.order) : 1
              };
            })
          : localMockDb.founders
      };
    }
  } catch (error) {
    console.error("Failed to pre-fetch page data on server:", error);
  }

  return <ClientHome initialData={JSON.parse(JSON.stringify(initialData))} />;
}
