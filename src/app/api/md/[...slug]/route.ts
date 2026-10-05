import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/content/site";
import { seoConfig } from "@/content/seo";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const resolvedParams = await params;
  const path = resolvedParams.slug.join("/");

  // Match key routes
  let content = "";

  if (path === "services/web-development" || path === "services/web-development.md") {
    const c = seoConfig.servicesWeb;
    content = `# ${c.h1}\n\n${c.heroAnswer}\n\n## Frequently Asked Questions\n` +
      (c.faqs || []).map((f) => `### ${f.question}\n${f.answer}\n`).join("\n");
  } else if (path === "services/software-engineering" || path === "services/software-engineering.md") {
    const c = seoConfig.servicesSoftware;
    content = `# ${c.h1}\n\n${c.heroAnswer}\n\n## Frequently Asked Questions\n` +
      (c.faqs || []).map((f) => `### ${f.question}\n${f.answer}\n`).join("\n");
  } else if (path === "faq" || path === "faq.md") {
    const c = seoConfig.faq;
    content = `# ${c.h1}\n\n${c.heroAnswer}\n\n## Core Questions & Answers\n` +
      (seoConfig.home.faqs || []).map((f) => `### ${f.question}\n${f.answer}\n`).join("\n");
  } else if (path === "software-development-company-ahmedabad" || path === "software-development-company-ahmedabad.md") {
    const c = seoConfig.locationAhmedabad;
    content = `# ${c.h1}\n\n${c.heroAnswer}\n\n## Local Questions & Answers\n` +
      (c.faqs || []).map((f) => `### ${f.question}\n${f.answer}\n`).join("\n");
  } else {
    content = `# ${siteConfig.name}\n\n${siteConfig.description}\n\nExplore full AI documentation at ${siteConfig.url}/llms.txt`;
  }

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
