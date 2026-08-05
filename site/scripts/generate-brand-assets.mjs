import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const source = process.argv[2];

if (!source) {
  throw new Error("Usage: node scripts/generate-brand-assets.mjs <official-logo.png>");
}

const outputDir = path.resolve("public/brand");
await fs.mkdir(outputDir, { recursive: true });

const official = sharp(source);
const metadata = await official.metadata();

if (metadata.width !== 1024 || metadata.height !== 1536) {
  throw new Error("Unexpected source dimensions. Refusing to transform an unverified logo file.");
}

// Only surrounding white canvas is removed. Brand geometry, colour, and
// proportions remain unchanged in every derivative.
const fullLogo = await sharp(source)
  .trim({ background: "#ffffff", threshold: 8 })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toBuffer();

await fs.writeFile(path.join(outputDir, "preventa-ai-logo.png"), fullLogo);
await sharp(source)
  .extract({ left: 345, top: 445, width: 340, height: 370 })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(path.join(outputDir, "preventa-ai-symbol.png"));

for (const size of [32, 192, 512]) {
  await sharp(path.join(outputDir, "preventa-ai-symbol.png"))
    .resize(size, size, { fit: "contain", background: "#ffffff" })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(outputDir, `preventa-ai-icon-${size}.png`));
}

const socialText = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#020b1d"/>
        <stop offset="0.62" stop-color="#071a3a"/>
        <stop offset="1" stop-color="#0a3150"/>
      </linearGradient>
      <radialGradient id="glow" cx="0.8" cy="0.2" r="0.7">
        <stop offset="0" stop-color="#17a6a1" stop-opacity=".28"/>
        <stop offset="1" stop-color="#17a6a1" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="630" rx="0" fill="url(#bg)"/>
    <rect width="1200" height="630" fill="url(#glow)"/>
    <text x="88" y="405" fill="#f8fbff" font-family="Arial, sans-serif" font-size="54" font-weight="650" letter-spacing="-1.5">Responsible AI for public health.</text>
    <text x="88" y="464" fill="#bed0e2" font-family="Arial, sans-serif" font-size="27">From public health intelligence to practical action.</text>
    <path d="M88 520 H1112" stroke="#ffffff" stroke-opacity=".14"/>
    <text x="88" y="560" fill="#63d6cf" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="2.8">ASSESS  ·  UNDERSTAND  ·  ACT</text>
  </svg>`);

const logoForSocial = await sharp(fullLogo)
  .resize({ width: 290, withoutEnlargement: true })
  .extend({ top: 26, bottom: 26, left: 34, right: 34, background: "#ffffff" })
  .png()
  .toBuffer();

await sharp(socialText)
  .composite([{ input: logoForSocial, left: 88, top: 64 }])
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(path.join(outputDir, "preventa-ai-social-preview.png"));

console.log(`Generated PREVENTA AI assets in ${outputDir}`);
