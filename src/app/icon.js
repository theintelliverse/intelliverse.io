import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const size = {
  width: 48,
  height: 48,
};
export const contentType = "image/png";

/**
 * Standard Google Search Favicon (48x48)
 * Renders The Intelliverse official logo
 */
export default function Icon() {
  let logoDataUrl = "";
  try {
    const logoFilePath = path.join(process.cwd(), "public", "icon.png");
    if (fs.existsSync(logoFilePath)) {
      const buffer = fs.readFileSync(logoFilePath);
      logoDataUrl = `data:image/png;base64,${buffer.toString("base64")}`;
    }
  } catch (e) {
    console.error("Icon read error:", e);
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
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        {logoDataUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={logoDataUrl}
            alt="The Intelliverse Icon"
            width="48"
            height="48"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "#2F63E0",
              color: "#FFFFFF",
              fontSize: "24px",
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
