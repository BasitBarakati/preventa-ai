import type { MetadataRoute } from "next";

const SITE_URL = "https://phronesis.ai";

/**
 * Single-page marketing site — one canonical URL plus its in-page anchors
 * as separate entries so search engines can deep-link to sections that
 * function as distinct topical destinations (assessment lenses, wellness
 * modules, pricing).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const anchors = ["", "#assess", "#wellness", "#capacity", "#evaluate", "#copilot", "#pricing", "#faq"];
  return anchors.map((anchor) => ({
    url: `${SITE_URL}/${anchor}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: anchor === "" ? 1 : 0.7,
  }));
}
