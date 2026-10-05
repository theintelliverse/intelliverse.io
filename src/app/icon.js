import { ImageResponse } from "next/og";

export const size = {
  width: 48,
  height: 48,
};
export const contentType = "image/png";

/**
 * Standard Google Search Favicon (48x48)
 * Renders The Intelliverse circle-cluster mark
 */
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
          background: "#0B1530",
          borderRadius: "10px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Circle Cluster Discs */}
        <div
          style={{
            position: "absolute",
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            background: "#8B5CF6",
            top: "10px",
            left: "8px",
            opacity: 0.85,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            background: "#3D7BF7",
            top: "16px",
            left: "12px",
            opacity: 0.9,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: "#FDB347",
            top: "9px",
            left: "20px",
            opacity: 0.85,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            background: "#F43F5E",
            top: "18px",
            left: "18px",
            opacity: 0.85,
          }}
        />

        {/* Orbit Dots */}
        <div
          style={{
            position: "absolute",
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: "#F43F5E",
            top: "5px",
            left: "21px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: "#3D7BF7",
            top: "22px",
            right: "4px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: "#FDB347",
            bottom: "6px",
            left: "8px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "4px",
            height: "4px",
            borderRadius: "50%",
            background: "#FFFFFF",
            top: "21px",
            left: "21px",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
