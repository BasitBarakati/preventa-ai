import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const source = process.argv[2];
if (!source) throw new Error("Usage: node scripts/generate-brand-assets-v2.mjs <official-logo.jpg>");

const outputDir = path.resolve("public/brand");
await fs.mkdir(outputDir, { recursive: true });

// sharp's built-in .trim() left a large band of near-white JPEG-compression
// noise at the bottom of this particular source (reported height ~1017 vs a
// manually verified content height of ~806) — precise enough to break layout
// wherever the logo is composited or scaled by aspect ratio. Scanning rows
// directly for genuinely non-white content, rather than trusting trim's
// threshold heuristic, is the fix.
const rgbaSource = sharp(source).ensureAlpha();
const { data, info } = await rgbaSource.raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;

function rowIsWhite(y) {
  let nonWhite = 0, total = 0;
  for (let x = 0; x < width; x += 2) {
    const i = (y * width + x) * channels;
    total += 1;
    if (data[i] < 250 || data[i + 1] < 250 || data[i + 2] < 250) nonWhite += 1;
  }
  return nonWhite / total < 0.008;
}
function colIsWhite(x) {
  let nonWhite = 0, total = 0;
  for (let y = 0; y < height; y += 2) {
    const i = (y * width + x) * channels;
    total += 1;
    if (data[i] < 250 || data[i + 1] < 250 || data[i + 2] < 250) nonWhite += 1;
  }
  return nonWhite / total < 0.008;
}

let top = 0; while (top < height && rowIsWhite(top)) top += 1;
let bottom = height - 1; while (bottom > top && rowIsWhite(bottom)) bottom -= 1;
let left = 0; while (left < width && colIsWhite(left)) left += 1;
let right = width - 1; while (right > left && colIsWhite(right)) right -= 1;

const pad = 6;
top = Math.max(0, top - pad); left = Math.max(0, left - pad);
bottom = Math.min(height - 1, bottom + pad); right = Math.min(width - 1, right + pad);
console.log("content bounds:", { top, bottom, left, right });

const trimmedBuffer = await sharp(source)
  .extract({ left, top, width: right - left + 1, height: bottom - top + 1 })
  .png()
  .toBuffer();
const trimmedMeta = await sharp(trimmedBuffer).metadata();
console.log("trimmed full logo:", trimmedMeta.width, "x", trimmedMeta.height);
await fs.writeFile(path.join(outputDir, "preventa-ai-logo.png"), trimmedBuffer);

// Split icon (top) from wordmark (bottom): find the first fully-white band
// after the icon's likely lower bound within the freshly trimmed image.
const trimmedRaw = await sharp(trimmedBuffer).raw().ensureAlpha().toBuffer({ resolveWithObject: true });
const tw = trimmedRaw.info.width, th = trimmedRaw.info.height, tc = trimmedRaw.info.channels;
function trimmedRowWhite(y) {
  let nonWhite = 0;
  for (let x = 0; x < tw; x += 2) {
    const i = (y * tw + x) * tc;
    if (trimmedRaw.data[i] < 250 || trimmedRaw.data[i + 1] < 250 || trimmedRaw.data[i + 2] < 250) nonWhite += 1;
  }
  return nonWhite / (tw / 2) < 0.008;
}
let splitRow = Math.round(th * 0.62);
for (let y = Math.round(th * 0.45); y < Math.round(th * 0.85); y += 1) {
  if (trimmedRowWhite(y) && trimmedRowWhite(y + 3) && trimmedRowWhite(y + 6)) { splitRow = y; break; }
}
console.log("icon/wordmark split row:", splitRow, "of", th);

// Crop the icon region, then re-trim ITS bounds precisely the same way.
const iconRaw = { data: trimmedRaw.data, width: tw, height: splitRow, channels: tc };
function iconColWhite(x) {
  let nonWhite = 0;
  for (let y = 0; y < iconRaw.height; y += 2) {
    const i = (y * tw + x) * tc;
    if (iconRaw.data[i] < 250 || iconRaw.data[i + 1] < 250 || iconRaw.data[i + 2] < 250) nonWhite += 1;
  }
  return nonWhite / (iconRaw.height / 2) < 0.008;
}
let iLeft = 0; while (iLeft < tw && iconColWhite(iLeft)) iLeft += 1;
let iRight = tw - 1; while (iRight > iLeft && iconColWhite(iRight)) iRight -= 1;
let iBottom = splitRow - 1; while (iBottom > 0 && trimmedRowWhite(iBottom)) iBottom -= 1;
iLeft = Math.max(0, iLeft - pad); iRight = Math.min(tw - 1, iRight + pad); iBottom = Math.min(splitRow - 1, iBottom + pad);

const iconBuffer = await sharp(trimmedBuffer)
  .extract({ left: iLeft, top: 0, width: iRight - iLeft + 1, height: iBottom + 1 })
  .png()
  .toBuffer();
const iconMeta = await sharp(iconBuffer).metadata();
console.log("icon-only:", iconMeta.width, "x", iconMeta.height);

const side = Math.max(iconMeta.width, iconMeta.height);
const squared = await sharp(iconBuffer)
  .extend({
    top: Math.floor((side - iconMeta.height) / 2), bottom: Math.ceil((side - iconMeta.height) / 2),
    left: Math.floor((side - iconMeta.width) / 2), right: Math.ceil((side - iconMeta.width) / 2),
    background: "#ffffff",
  })
  .png()
  .toBuffer();
await fs.writeFile(path.join(outputDir, "preventa-ai-symbol.png"), squared);

for (const size of [32, 192, 512]) {
  await sharp(squared)
    .resize(size, size, { fit: "contain", background: "#ffffff" })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(outputDir, `preventa-ai-icon-${size}.png`));
}

console.log(`Generated PREVENTA AI assets in ${outputDir}`);
