import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { siteConfig } from "@/content/site";
import { BLOG_POSTS } from "@/content/blog";

/**
 * Google Indexing API Route
 * Allows real-time publishing of URL notifications directly to Google Search.
 *
 * Requirements for live Google API requests:
 * - GOOGLE_CLIENT_EMAIL: Service account email (e.g. indexing-bot@project.iam.gserviceaccount.com)
 * - GOOGLE_PRIVATE_KEY: RSA private key PEM
 * - The service account must be added as an Owner of the property in Google Search Console.
 */

function getGoogleCredentials() {
  let clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
    try {
      const parsed = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
      clientEmail = parsed.client_email;
      privateKey = parsed.private_key;
    } catch {
      // Ignore JSON parse failure
    }
  }

  return { clientEmail, privateKey };
}

function createGoogleJwt(clientEmail: string, privateKey: string): string {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/indexing",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const base64UrlEncode = (obj: object) =>
    Buffer.from(JSON.stringify(obj))
      .toString("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

  const unsignedToken = `${base64UrlEncode(header)}.${base64UrlEncode(payload)}`;
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(unsignedToken);
  sign.end();

  const formattedKey = privateKey.replace(/\\n/g, "\n");
  const signature = sign
    .sign(formattedKey, "base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${unsignedToken}.${signature}`;
}

async function getAccessToken(clientEmail: string, privateKey: string): Promise<string> {
  const jwt = createGoogleJwt(clientEmail, privateKey);
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Google OAuth2 Token failed (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  return data.access_token;
}

function getAllCanonicalUrls(): string[] {
  const baseUrl = (siteConfig.url || "https://intelliverse.io").replace(/\/+$/, "");
  return [
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
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");
  const { clientEmail, privateKey } = getGoogleCredentials();

  const isConfigured = Boolean(clientEmail && privateKey);

  // If a URL is requested and service account is available, check Google Search metadata
  if (targetUrl && isConfigured && clientEmail && privateKey) {
    try {
      const token = await getAccessToken(clientEmail, privateKey);
      const googleRes = await fetch(
        `https://indexing.googleapis.com/v1/urlNotifications/metadata?url=${encodeURIComponent(
          targetUrl
        )}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const metadata = await googleRes.json();
      return NextResponse.json({
        configured: true,
        url: targetUrl,
        status: googleRes.status,
        metadata,
      });
    } catch (err: any) {
      return NextResponse.json(
        { configured: true, url: targetUrl, error: err.message },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({
    status: isConfigured ? "ready" : "credentials_required",
    configured: isConfigured,
    clientEmail: clientEmail ? `${clientEmail.slice(0, 4)}...${clientEmail.slice(-10)}` : null,
    canonicalUrlsCount: getAllCanonicalUrls().length,
    verificationMeta: {
      siteUrl: siteConfig.url,
      googleSiteVerification:
        process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
        "_bBKjibzbtCllmNG_idI9G98RKmAUWOYhREw9eoQXQY",
      verificationFiles: [
        "/google_bBKjibzbtCllmNG_idI9G98RKmAUWOYhREw9eoQXQY.html",
        "/googleVokGQwH0xmoTvEfJqEn5787EY10aWuIuYa6tKNazEBw.html",
      ],
    },
    setupInstructions: isConfigured
      ? "Google Indexing API service account is configured and active."
      : "To activate direct Google Indexing API submissions: 1. Enable 'Web Search Indexing API' in Google Cloud Console. 2. Create a Service Account and download private key. 3. Add Service Account email as Owner in Google Search Console. 4. Set GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY in .env.local.",
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { clientEmail, privateKey } = getGoogleCredentials();

    let targetUrls: string[] = [];
    if (body.url) {
      targetUrls = [body.url];
    } else if (Array.isArray(body.urls) && body.urls.length > 0) {
      targetUrls = body.urls;
    } else {
      targetUrls = getAllCanonicalUrls();
    }

    const notificationType = body.type || "URL_UPDATED"; // URL_UPDATED or URL_DELETED

    if (!clientEmail || !privateKey) {
      return NextResponse.json({
        success: false,
        configured: false,
        message:
          "Google Indexing API service account credentials not configured in environment.",
        urlsToSubmit: targetUrls,
        instructions: {
          step1: "Create Google Cloud Service Account with Indexing API enabled",
          step2: "Add service account email as Owner in Google Search Console",
          step3: "Set GOOGLE_CLIENT_EMAIL and GOOGLE_PRIVATE_KEY in .env.local",
        },
      });
    }

    const accessToken = await getAccessToken(clientEmail, privateKey);

    // Submit batch URLs to Google Indexing API
    const results = [];
    for (const url of targetUrls) {
      try {
        const googleRes = await fetch(
          "https://indexing.googleapis.com/v1/urlNotifications:publish",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              url,
              type: notificationType,
            }),
          }
        );

        const responseData = await googleRes.json().catch(() => ({}));
        results.push({
          url,
          status: googleRes.status,
          success: googleRes.ok,
          data: responseData,
        });
      } catch (err: any) {
        results.push({
          url,
          status: 500,
          success: false,
          error: err.message,
        });
      }
    }

    const successCount = results.filter((r) => r.success).length;

    return NextResponse.json({
      success: successCount > 0,
      totalSubmitted: targetUrls.length,
      successCount,
      type: notificationType,
      timestamp: new Date().toISOString(),
      results,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to publish indexing notifications" },
      { status: 500 }
    );
  }
}
