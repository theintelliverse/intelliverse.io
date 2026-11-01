import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const alt = "The Intelliverse | Innovtion Create & Grow";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  let logoDataUrl = "";
  try {
    const logoFilePath = path.join(process.cwd(), "public", "the-intelliverse-logo.jpg");
    if (fs.existsSync(logoFilePath)) {
      const buffer = fs.readFileSync(logoFilePath);
      logoDataUrl = `data:image/jpeg;base64,${buffer.toString("base64")}`;
    }
  } catch (e) {
    console.error("OG image logo read error:", e);
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#060914",
          padding: "60px 75px",
          position: "relative",
          fontFamily: "system-ui, -apple-system, sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Subtle Brand Background Blobs */}
        <div
          style={{
            position: "absolute",
            top: "-50px",
            right: "50px",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(61, 123, 247, 0.35) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-60px",
            right: "150px",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.30) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "-50px",
            width: "450px",
            height: "450px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(61, 123, 247, 0.20) 0%, transparent 70%)",
          }}
        />

        {/* Left Column: Narrative & Details */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            maxWidth: "680px",
            zIndex: 10,
          }}
        >
          {/* Top Pill */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 18px",
              borderRadius: "999px",
              border: "1px solid rgba(228, 218, 195, 0.2)",
              backgroundColor: "rgba(18, 32, 72, 0.8)",
              width: "fit-content",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#FDB347",
              }}
            />
            <span
              style={{
                color: "#F8F2E4",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              ENGINEERING STUDIO · AHMEDABAD, INDIA
            </span>
          </div>

          {/* Central Title */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <h1
              style={{
                fontSize: "48px",
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: "-0.03em",
                color: "#F8F2E4",
                margin: 0,
              }}
            >
              Software, Web &amp; IT Services,
              <br />
              <span style={{ color: "#3D7BF7" }}>Built Like a Craft.</span>
            </h1>
            <p
              style={{
                fontSize: "19px",
                lineHeight: 1.45,
                color: "#CBD5E1",
                margin: 0,
              }}
            >
              Architecting resilient custom SaaS platforms, modern Next.js 15 web systems, and high-throughput cloud infrastructure.
            </p>
          </div>

          {/* Tech Badges */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {["Next.js 15", "TypeScript", "SaaS Architecture", "Cloud & DevOps", "Applied AI"].map(
              (tag, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    padding: "7px 14px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(15, 27, 60, 0.8)",
                    border: "1px solid rgba(228, 218, 195, 0.16)",
                    color: "#F8F2E4",
                  }}
                >
                  {tag}
                </span>
              )
            )}
          </div>

          {/* Bottom Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              paddingTop: "16px",
              borderTop: "1px solid rgba(228, 218, 195, 0.14)",
            }}
          >
            <div
              style={{
                padding: "8px 18px",
                borderRadius: "12px",
                backgroundColor: "rgba(30, 58, 138, 0.8)",
                border: "1px solid #3D7BF7",
                color: "#60A5FA",
                fontSize: "18px",
                fontWeight: 700,
              }}
            >
              theintelliverse.tech ↗
            </div>
            <span
              style={{
                fontSize: "13px",
                color: "#94A3B8",
                fontWeight: 600,
              }}
            >
              Founders: Dhruvil Thummar · Rudra Kankotiya · Jal Anghan
            </span>
          </div>
        </div>

        {/* Right Column: Pristine Card with Official Logo */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "16px",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: "350px",
              height: "420px",
              backgroundColor: "#FFFFFF",
              borderRadius: "32px",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.7)",
              border: "2px solid rgba(255, 255, 255, 0.9)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "24px",
            }}
          >
            {logoDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoDataUrl}
                alt="The Intelliverse"
                width="290"
                height="290"
                style={{
                  objectFit: "contain",
                }}
              />
            ) : (
              <div
                style={{
                  width: "280px",
                  height: "280px",
                  backgroundColor: "#2F63E0",
                  borderRadius: "20px",
                }}
              />
            )}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                paddingTop: "12px",
                borderTop: "1px solid #E5E7EB",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#10B981",
                }}
              />
              <span
                style={{
                  color: "#4B5563",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                }}
              >
                OFFICIAL BRAND IDENTITY · 2026
              </span>
            </div>
          </div>

          <div
            style={{
              padding: "8px 20px",
              borderRadius: "999px",
              backgroundColor: "rgba(15, 27, 60, 0.9)",
              border: "1px solid rgba(61, 123, 247, 0.5)",
              color: "#93C5FD",
              fontSize: "13px",
              fontWeight: 700,
            }}
          >
            Sub-second LCP · 100% Code Ownership
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
