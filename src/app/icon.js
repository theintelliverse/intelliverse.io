import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#05020c",
          borderRadius: "8px",
          border: "1px solid rgba(56, 189, 248, 0.6)",
          boxShadow: "0 0 12px rgba(56, 189, 248, 0.4)",
        }}
      >
        <span
          style={{
            fontSize: "18px",
            fontWeight: 900,
            background: "linear-gradient(135deg, #ffffff 0%, #38bdf8 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontFamily: "system-ui, sans-serif",
            letterSpacing: "-1px",
          }}
        >
          IV
        </span>
      </div>
    ),
    {
      ...size,
    }
  );
}
