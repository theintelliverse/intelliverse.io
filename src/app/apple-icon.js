import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

/**
 * Apple Touch Icon (180x180)
 * Renders The Intelliverse circle-cluster mark
 */
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
          background: "#0B1530",
          borderRadius: "40px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Circle Cluster Discs */}
        <div
          style={{
            position: "absolute",
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            background: "#8B5CF6",
            top: "38px",
            left: "30px",
            opacity: 0.85,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "84px",
            height: "84px",
            borderRadius: "50%",
            background: "#3D7BF7",
            top: "60px",
            left: "45px",
            opacity: 0.9,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "76px",
            height: "76px",
            borderRadius: "50%",
            background: "#FDB347",
            top: "34px",
            left: "75px",
            opacity: 0.85,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "68px",
            height: "68px",
            borderRadius: "50%",
            background: "#F43F5E",
            top: "68px",
            left: "68px",
            opacity: 0.85,
          }}
        />

        {/* Orbit Dots */}
        <div
          style={{
            position: "absolute",
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            background: "#F43F5E",
            top: "20px",
            left: "78px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "18px",
            height: "18px",
            borderRadius: "50%",
            background: "#3D7BF7",
            top: "84px",
            right: "16px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "15px",
            height: "15px",
            borderRadius: "50%",
            background: "#FDB347",
            bottom: "24px",
            left: "30px",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            background: "#FFFFFF",
            top: "80px",
            left: "80px",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
