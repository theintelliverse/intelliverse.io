import { ImageResponse } from "next/og";

export const alt = "The Intelliverse - Engineering the Digital Future";
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
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#05020c",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.2), transparent 45%), radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.2), transparent 45%)",
          position: "relative",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          overflow: "hidden",
        }}
      >
        {/* Subtle Tech Grid Pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            opacity: 0.35,
          }}
        />

        {/* Central Glassmorphic Card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "50px 70px",
            borderRadius: "32px",
            background: "rgba(15, 23, 42, 0.75)",
            border: "1px solid rgba(56, 189, 248, 0.35)",
            boxShadow:
              "0 20px 60px rgba(0, 0, 0, 0.7), inset 0 0 40px rgba(56, 189, 248, 0.12)",
            textAlign: "center",
            maxWidth: "88%",
          }}
        >
          {/* Brand Monogram Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "8px 24px",
              borderRadius: "9999px",
              background: "rgba(56, 189, 248, 0.12)",
              border: "1px solid rgba(56, 189, 248, 0.35)",
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                background: "#38bdf8",
                boxShadow: "0 0 12px #38bdf8",
              }}
            />
            <span
              style={{
                color: "#38bdf8",
                fontSize: "18px",
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
              }}
            >
              The Intelliverse
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "68px",
              fontWeight: 900,
              color: "#ffffff",
              margin: 0,
              letterSpacing: "-1.5px",
              lineHeight: 1.1,
              background: "linear-gradient(135deg, #ffffff 0%, #93c5fd 50%, #38bdf8 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              textFillColor: "transparent",
            }}
          >
            Intelliverse.io
          </h1>

          {/* Bold Tagline */}
          <p
            style={{
              fontSize: "32px",
              fontWeight: 600,
              color: "#cbd5e1",
              marginTop: "18px",
              marginBottom: 0,
              letterSpacing: "-0.5px",
            }}
          >
            Engineering the Digital Future
          </p>

          {/* Subtext Capability Pills */}
          <div
            style={{
              display: "flex",
              gap: "14px",
              marginTop: "36px",
            }}
          >
            {["Next.js 16", "3D WebGL", "Native Mobile Apps", "Enterprise SaaS"].map(
              (pill, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "10px",
                    background: "rgba(255, 255, 255, 0.06)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    color: "#94a3b8",
                    fontSize: "15px",
                    fontWeight: 600,
                  }}
                >
                  {pill}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
