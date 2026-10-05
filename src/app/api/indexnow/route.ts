import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/content/site";

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
    const urlList: string[] = body.urlList || [
      `${siteConfig.url}/`,
      `${siteConfig.url}/blog`,
      `${siteConfig.url}/services/web-development`,
      `${siteConfig.url}/services/software-engineering`,
      `${siteConfig.url}/services/it-architecture-support`,
      `${siteConfig.url}/services/ai-data-robotics-iot`,
      `${siteConfig.url}/work/appointory`,
      `${siteConfig.url}/work/vrix`,
      `${siteConfig.url}/software-development-company-ahmedabad`,
      `${siteConfig.url}/faq`,
      `${siteConfig.url}/about`,
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
