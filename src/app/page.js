import { getDb, localMockDb, defaultTestimonials } from "@/lib/db";
import ClientHome from "./ClientHome";

// Incremental Static Regeneration (ISR): Cache page data, revalidating in background every 10 seconds.
export const revalidate = 10;

export default async function Home() {
  let initialData = {
    hero: { ...localMockDb.hero },
    about: { ...localMockDb.about },
    contact: { ...localMockDb.contact },
    stats: { ...localMockDb.stats },
    estimator: { ...localMockDb.estimator },
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
        testimonials: (testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials).map(t => ({ text: t.text || t.quote, author: t.author })),
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
              summary: cs.summary || cs.description || "",
              description: cs.description || cs.summary || "",
              stack: Array.isArray(cs.stack) ? cs.stack : (Array.isArray(cs.techTags) ? cs.techTags : []),
              techTags: Array.isArray(cs.techTags) ? cs.techTags : (Array.isArray(cs.stack) ? cs.stack : []),
              link: cs.link || "",
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
                tagline: f.tagline || "",
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

  return <ClientHome initialData={initialData} />;
}
