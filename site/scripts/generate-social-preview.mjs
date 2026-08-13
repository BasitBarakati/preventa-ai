import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const outputDir = path.resolve("public/brand");
const fullLogo = await fs.readFile(path.join(outputDir, "preventa-ai-logo.png"));

const LOGO_LEFT = 88;
const LOGO_TOP = 56;
const LOGO_RESIZE_WIDTH = 260;
const LOGO_PAD = 18;
const TEXT_GAP = 46; // space between the logo box's bottom edge and the headline's cap-height top

const logoMeta = await sharp(fullLogo).metadata();
const logoHeight = Math.round((LOGO_RESIZE_WIDTH * logoMeta.height) / logoMeta.width);

const logoForSocial = await sharp(fullLogo)
  .resize({ width: LOGO_RESIZE_WIDTH, withoutEnlargement: true })
  .extend({ top: LOGO_PAD, bottom: LOGO_PAD, left: LOGO_PAD, right: LOGO_PAD, background: "#ffffff" })
  .png()
  .toBuffer();

const logoBoxBottom = LOGO_TOP + logoHeight + LOGO_PAD * 2;

const headlineY = logoBoxBottom + TEXT_GAP;
const subtitleY = headlineY + 46;
const lineY = subtitleY + 36;
const tagsY = lineY + 32;

const socialText = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#050f0c"/>
        <stop offset="0.62" stop-color="#0a2019"/>
        <stop offset="1" stop-color="#0d2f22"/>
      </linearGradient>
      <radialGradient id="glow" cx="0.8" cy="0.2" r="0.7">
        <stop offset="0" stop-color="#2dd4b0" stop-opacity=".26"/>
        <stop offset="1" stop-color="#2dd4b0" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#bg)"/>
    <rect width="1200" height="630" fill="url(#glow)"/>
    <text x="${LOGO_LEFT}" y="${headlineY}" fill="#f4fbf7" font-family="Arial, sans-serif" font-size="50" font-weight="650" letter-spacing="-1.5">Responsible AI for public health.</text>
    <text x="${LOGO_LEFT}" y="${subtitleY}" fill="#c3d9cd" font-family="Arial, sans-serif" font-size="25">From public health intelligence to practical action.</text>
    <path d="M${LOGO_LEFT} ${lineY} H1112" stroke="#ffffff" stroke-opacity=".14"/>
    <text x="${LOGO_LEFT}" y="${tagsY}" fill="#5fd8c2" font-family="Arial, sans-serif" font-size="18" font-weight="700" letter-spacing="2.8">ASSESS  ·  UNDERSTAND  ·  ACT</text>
  </svg>`);

await sharp(socialText)
  .composite([{ input: logoForSocial, left: LOGO_LEFT, top: LOGO_TOP }])
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(path.join(outputDir, "preventa-ai-social-preview.png"));

console.log("Generated social preview", { logoHeight, logoBoxBottom, headlineY, subtitleY, lineY, tagsY });
