import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/content/site";

import { BLOG_POSTS } from "@/content/blog";

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || "4a6d90a77df3498bb88fae1f727c7cf5";

/**
 * IndexNow API route
 * Pings Bing / Yandex / IndexNow endpoints when new content is published
 */
export async function GET() {
  return NextResponse.json({
    status: "active",
    host: new URL(siteConfig.url).host,
    keyLocation: `${siteConfig.url}/${INDEXNOW_KEY}.txt`,
    protocol: "IndexNow v1.0",
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const host = new URL(siteConfig.url).host;
    const baseUrl = siteConfig.url.replace(/\/+$/, "");

    const urlList: string[] = body.urlList || [
      `${baseUrl}`,
      `${baseUrl}/software-development-company-ahmedabad`,
      `${baseUrl}/services/web-development`,
      `${baseUrl}/services/software-engineering`,
      `${baseUrl}/services/it-architecture-support`,
      `${baseUrl}/services/ai-data-robotics-iot`,
      `${baseUrl}/work/appointory`,
      `${baseUrl}/work/vrix`,
      `${baseUrl}/about`,
      `${baseUrl}/contact`,
      `${baseUrl}/faq`,
      `${baseUrl}/blog`,
      ...BLOG_POSTS.map((post) => `${baseUrl}/blog/${post.slug}`),
    ];

    const payload = {
      host,
      key: INDEXNOW_KEY,
      keyLocation: `${siteConfig.url}/${INDEXNOW_KEY}.txt`,
      urlList,
    };

    // Ping IndexNow central API endpoint
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      submittedUrls: urlList.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "IndexNow ping failed" },
      { status: 500 }
    );
  }
}
