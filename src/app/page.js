import { clientPromise, localMockDb } from "@/lib/db";
import ClientHome from "./ClientHome";

// Incremental Static Regeneration (ISR): Cache page data, revalidating in background every 10 seconds.
export const revalidate = 10;

export default async function Home() {
  let initialData = {
    hero: { ...localMockDb.hero },
    about: { ...localMockDb.about },
    stats: { projects: 0, satisfaction: 100, clients: 0 },
    testimonials: [],
    projects: []
  };

  try {
    if (clientPromise) {
      const client = await clientPromise;
      const db = client.db("intelliverse");
      
      const content = await db.collection("content").findOne({});
      const testimonials = await db.collection("testimonials").find({}).toArray();
      const projects = await db.collection("projects").find({}).toArray();
      
      initialData = {
        hero: { subtitle: content?.hero?.subtitle || localMockDb.hero.subtitle },
        about: { p1: content?.about?.p1 || localMockDb.about.p1 },
        stats: content?.stats || {
          projects: projects.length,
          satisfaction: projects.length > 0
            ? Math.round((projects.reduce((sum, p) => sum + (Number(p.rating) || 5), 0) / (projects.length * 5)) * 100)
            : 100,
          clients: testimonials.length
        },
        testimonials: testimonials.map(t => ({ text: t.text, author: t.author })),
        projects: projects.map(p => ({
          name: p.name,
          description: p.description,
          link: p.link,
          review: p.review,
          rating: p.rating,
          type: p.type || "",
          featureLink: p.featureLink || "",
          featureText: p.featureText || ""
        }))
      };
    }
  } catch (error) {
    console.error("Failed to pre-fetch page data on server:", error);
  }

  return <ClientHome initialData={initialData} />;
}
