import { ImageResponse } from "next/og";

export const alt = "The Intelliverse — Software, Web & IT Services in Ahmedabad";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#0B1530", // brand --night
          padding: "60px 80px",
          position: "relative",
          fontFamily: "system-ui, -apple-system, sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Subtle Brand Background Blobs */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            right: "-100px",
            width: "550px",
            height: "550px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(61, 123, 247, 0.35) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            left: "20%",
            width: "450px",
            height: "450px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(253, 179, 71, 0.20) 0%, transparent 70%)",
          }}
        />

        {/* Top Header Row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "#2F63E0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#F8F2E4",
                fontSize: "24px",
                fontWeight: 800,
                border: "1px solid rgba(228, 218, 195, 0.3)",
              }}
            >
              i
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#F8F2E4",
                }}
              >
                The Intelliverse
              </span>
              <span
                style={{
                  fontSize: "12px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#FDB347",
                }}
              >
                Ahmedabad, Gujarat · India
              </span>
            </div>
          </div>

          <div
            style={{
              padding: "8px 18px",
              borderRadius: "999px",
              border: "1px solid rgba(228, 218, 195, 0.2)",
              backgroundColor: "rgba(18, 30, 68, 0.6)",
              color: "#F8F2E4",
              fontSize: "13px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Engineering Studio
          </div>
        </div>

        {/* Central Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            zIndex: 10,
            maxWidth: "960px",
          }}
        >
          <h1
            style={{
              fontSize: "56px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "#F8F2E4",
              margin: 0,
            }}
          >
            Software, Web &amp; IT Services, Built Like a Craft.
          </h1>
          <p
            style={{
              fontSize: "22px",
              lineHeight: 1.5,
              color: "rgba(248, 242, 228, 0.8)",
              margin: 0,
            }}
          >
            Full-Stack Next.js 15 Web Systems · Custom SaaS Engineering · Cloud Infrastructure &amp; DevOps
          </p>
        </div>

        {/* Bottom Footer Tags */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingTop: "24px",
            borderTop: "1px solid rgba(228, 218, 195, 0.16)",
            zIndex: 10,
          }}
        >
          <div style={{ display: "flex", gap: "16px" }}>
            {["Next.js 15", "TypeScript", "SaaS Architecture", "AWS & Cloudflare", "Ahmedabad"].map(
              (tag, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: "13px",
                    letterSpacing: "0.06em",
                    padding: "6px 14px",
                    borderRadius: "8px",
                    backgroundColor: "rgba(18, 30, 68, 0.8)",
                    border: "1px solid rgba(228, 218, 195, 0.14)",
                    color: "rgba(248, 242, 228, 0.85)",
                  }}
                >
                  {tag}
                </span>
              )
            )}
          </div>
          <span
            style={{
              fontSize: "15px",
              color: "#3D7BF7",
              fontWeight: 600,
            }}
          >
            intelliverse.io
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
