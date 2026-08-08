import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #030014 0%, #0f172a 100%)",
          borderRadius: "40px",
          padding: "16px",
          border: "2px solid rgba(56, 189, 248, 0.4)",
          boxShadow: "inset 0 0 30px rgba(56, 189, 248, 0.25)",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "28px",
            background: "rgba(56, 189, 248, 0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid rgba(56, 189, 248, 0.3)",
          }}
        >
          <span
            style={{
              fontSize: "82px",
              fontWeight: 900,
              background: "linear-gradient(135deg, #ffffff 0%, #60a5fa 50%, #38bdf8 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              fontFamily: "system-ui, sans-serif",
              letterSpacing: "-4px",
            }}
          >
            IV
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
