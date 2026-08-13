import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("official brand assets exist and are non-empty", async () => {
  for (const file of [
    "public/brand/preventa-ai-logo.png",
    "public/brand/preventa-ai-symbol.png",
    "public/brand/preventa-ai-icon-32.png",
    "public/brand/preventa-ai-icon-192.png",
    "public/brand/preventa-ai-icon-512.png",
    "public/brand/preventa-ai-social-preview.png",
  ]) {
    const info = await stat(new URL(file, root));
    assert.ok(info.size > 1000, `${file} should contain a generated image`);
  }
});

test("required routes are represented in the content registry", async () => {
  // The homepage is a deliberate 3-section single page (hero, about,
  // programs); each program then links out to its own detail route, plus a
  // short list of legal/utility routes.
  const content = await readFile(new URL("src/lib/site-content.ts", root), "utf8");
  for (const route of ["/contact", "/privacy", "/terms", "/accessibility", "/ai-transparency"]) {
    assert.ok(content.includes(`path: "${route}"`), `${route} is missing`);
  }
});

test("every program has a real detail page", async () => {
  for (const route of ["situation-assessment", "health-and-wellness", "indigenous-health", "research", "courses"]) {
    const info = await stat(new URL(`src/app/${route}/page.tsx`, root));
    assert.ok(info.isFile(), `src/app/${route}/page.tsx should exist`);
  }
});

test("production source excludes the legacy brand", async () => {
  const legacyName = new RegExp(["phro", "nesis"].join(""), "i");
  const files = [
    "src/lib/site-content.ts",
    "src/app/layout.tsx",
    "src/components/HomePage.tsx",
    "src/components/Nav.tsx",
    "src/components/Footer.tsx",
    "src/db/schema.ts",
  ];
  for (const file of files) {
    const content = await readFile(new URL(file, root), "utf8");
    assert.equal(legacyName.test(content), false, `${file} contains the legacy brand`);
  }
});
