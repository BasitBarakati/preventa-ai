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

test("required platform routes are represented in the content registry", async () => {
  const content = await readFile(new URL("src/lib/site-content.ts", root), "utf8");
  for (const route of [
    "/platform/situation-assessment",
    "/situation-assessment/individual-and-family",
    "/situation-assessment/community",
    "/situation-assessment/organization",
    "/indigenous-health",
    "/research/sandbox",
    "/courses/ai-in-epidemiology",
    "/dashboards-and-data",
    "/ai-assistant",
    "/governance-and-ethics",
    "/privacy",
    "/accessibility",
    "/ai-transparency",
  ]) {
    const slug = route.split("/").at(-1);
    const explicit = content.includes(`path: "${route}"`);
    const generated = content.includes(`["${slug}"`);
    assert.ok(explicit || generated, `${route} is missing`);
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
