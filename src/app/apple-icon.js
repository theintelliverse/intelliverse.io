import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

/**
 * Apple Touch Icon (180x180)
 * Renders The Intelliverse official logo
 */
export default function AppleIcon() {
  let logoDataUrl = "";
  try {
    const logoFilePath = path.join(process.cwd(), "public", "apple-touch-icon.png");
    if (fs.existsSync(logoFilePath)) {
      const buffer = fs.readFileSync(logoFilePath);
      logoDataUrl = `data:image/png;base64,${buffer.toString("base64")}`;
    }
  } catch (e) {
    console.error("Apple icon read error:", e);
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFFFFF",
          borderRadius: "36px",
          overflow: "hidden",
        }}
      >
        {logoDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoDataUrl}
            alt="The Intelliverse Apple Touch Icon"
            width="180"
            height="180"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#2F63E0",
              color: "#FFFFFF",
              fontSize: "80px",
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            i
          </div>
        )}
      </div>
    ),
    {
      ...size,
    }
  );
}
