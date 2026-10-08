import fs from "fs";
import path from "path";

async function main() {
  const publicDir = path.resolve("public");
  
  try {
    console.log("Fetching dynamic assets from local Next.js server...");
    
    // 1. Fetch Icon (48x48 PNG)
    const iconRes = await fetch("http://localhost:3000/icon");
    if (iconRes.ok) {
      const iconBuf = Buffer.from(await iconRes.arrayBuffer());
      fs.writeFileSync(path.join(publicDir, "icon.png"), iconBuf);
      fs.writeFileSync(path.join(publicDir, "favicon-48x48.png"), iconBuf);
      
      // Also save as favicon.ico (modern browsers accept PNG data inside .ico)
      // To ensure valid ICO header wrapping 1 PNG image:
      // ICONDIR (6 bytes): 0, 1 (type=ico), 1 (count=1)
      // ICONDIRENTRY (16 bytes): width, height, colors, reserved, planes, bpp, bytesize, offset
      const width = 48;
      const height = 48;
      const size = iconBuf.length;
      const offset = 6 + 16; // 22 bytes
      
      const icoHeader = Buffer.alloc(22);
      icoHeader.writeUInt16LE(0, 0); // reserved
      icoHeader.writeUInt16LE(1, 2); // ICO type
      icoHeader.writeUInt16LE(1, 4); // 1 image
      
      icoHeader.writeUInt8(width, 6); // width
      icoHeader.writeUInt8(height, 7); // height
      icoHeader.writeUInt8(0, 8); // color palette
      icoHeader.writeUInt8(0, 9); // reserved
      icoHeader.writeUInt16LE(1, 10); // color planes
      icoHeader.writeUInt16LE(32, 12); // bits per pixel
      icoHeader.writeUInt32LE(size, 14); // image size in bytes
      icoHeader.writeUInt32LE(offset, 18); // offset to image data
      
      const icoFile = Buffer.concat([icoHeader, iconBuf]);
      fs.writeFileSync(path.join(publicDir, "favicon.ico"), icoFile);
      console.log("✓ Successfully generated public/favicon.ico and public/icon.png");
    }

    // 2. Fetch Apple Touch Icon (180x180 PNG)
    const appleRes = await fetch("http://localhost:3000/apple-icon");
    if (appleRes.ok) {
      const appleBuf = Buffer.from(await appleRes.arrayBuffer());
      fs.writeFileSync(path.join(publicDir, "apple-touch-icon.png"), appleBuf);
      fs.writeFileSync(path.join(publicDir, "apple-icon.png"), appleBuf);
      console.log("✓ Successfully generated public/apple-touch-icon.png");
    }

    // 3. Fetch OpenGraph Image (1200x630 PNG)
    const ogRes = await fetch("http://localhost:3000/opengraph-image");
    if (ogRes.ok) {
      const ogBuf = Buffer.from(await ogRes.arrayBuffer());
      fs.writeFileSync(path.join(publicDir, "og-image.png"), ogBuf);
      console.log("✓ Successfully generated public/og-image.png (1200x630)");
    }
  } catch (err) {
    console.error("Asset generation error:", err);
  }
}

main();
