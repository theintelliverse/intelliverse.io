import fs from "fs";
import path from "path";
import crypto from "crypto";

/**
 * Google Page Indexing CLI Script
 * Submits all canonical site pages directly to Google Indexing API.
 * 
 * Usage:
 *   node scripts/google-index.mjs
 *   node scripts/google-index.mjs --url=https://intelliverse.io/blog/what-is-the-intelliverse
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://intelliverse.io";

const CANONICAL_URLS = [
  `${BASE_URL}`,
  `${BASE_URL}/software-development-company-ahmedabad`,
  `${BASE_URL}/services/web-development`,
  `${BASE_URL}/services/software-engineering`,
  `${BASE_URL}/services/it-architecture-support`,
  `${BASE_URL}/services/ai-data-robotics-iot`,
  `${BASE_URL}/work/appointory`,
  `${BASE_URL}/work/vrix`,
  `${BASE_URL}/about`,
  `${BASE_URL}/contact`,
  `${BASE_URL}/faq`,
  `${BASE_URL}/blog`,
  `${BASE_URL}/blog/what-is-the-intelliverse`,
  `${BASE_URL}/blog/how-much-does-custom-software-cost-in-india`,
  `${BASE_URL}/blog/web-app-vs-mobile-app-how-to-choose`,
  `${BASE_URL}/blog/how-to-digitise-a-clinic-appointment-queue`,
];

function loadEnv() {
  const envPath = path.resolve(".env.local");
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        let val = trimmed.slice(idx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

function createGoogleJwt(clientEmail, privateKey) {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/indexing",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const base64UrlEncode = (obj) =>
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

async function getAccessToken(clientEmail, privateKey) {
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

async function main() {
  loadEnv();

  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  console.log("=== Google Page Indexing Automation ===");
  console.log(`Site base URL: ${BASE_URL}`);
  console.log(`Total canonical URLs to index: ${CANONICAL_URLS.length}`);

  if (!clientEmail || !privateKey) {
    console.log("\n[STATUS: CREDENTIALS NEEDED]");
    console.log("Google Service Account credentials not found in environment.");
    console.log("To activate automated Google Search submissions:");
    console.log(" 1. Go to Google Cloud Console -> Create or select project.");
    console.log(" 2. Enable 'Web Search Indexing API'.");
    console.log(" 3. Create a Service Account -> Create JSON key.");
    console.log(" 4. In Google Search Console, add the service account email as an Owner.");
    console.log(" 5. Add to .env.local:");
    console.log('    GOOGLE_CLIENT_EMAIL="your-service-account@project.iam.gserviceaccount.com"');
    console.log('    GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----"');
    console.log("\nPrepared URLs ready for instant submission:");
    CANONICAL_URLS.forEach((u, i) => console.log(` [${i + 1}] ${u}`));
    return;
  }

  console.log(`Authenticating service account: ${clientEmail}`);
  try {
    const accessToken = await getAccessToken(clientEmail, privateKey);
    console.log("OAuth2 access token obtained successfully.");

    let successCount = 0;
    for (const [idx, url] of CANONICAL_URLS.entries()) {
      process.stdout.write(`[${idx + 1}/${CANONICAL_URLS.length}] Submitting ${url} ... `);
      try {
        const res = await fetch("https://indexing.googleapis.com/v1/urlNotifications:publish", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            url,
            type: "URL_UPDATED",
          }),
        });

        if (res.ok) {
          console.log("OK (200)");
          successCount++;
        } else {
          const body = await res.text();
          console.log(`FAILED (${res.status}): ${body}`);
        }
      } catch (err) {
        console.log(`ERROR: ${err.message}`);
      }
    }

    console.log(`\nCompleted: ${successCount}/${CANONICAL_URLS.length} URLs submitted to Google Search.`);
  } catch (err) {
    console.error(`Authentication / submission error: ${err.message}`);
  }
}

main();
