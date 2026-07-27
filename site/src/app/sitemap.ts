import type { MetadataRoute } from "next";

const SITE_URL = "https://phronesis.ai";

/**
 * Marketing site — the homepage's in-page anchors as separate entries so
 * search engines can deep-link to sections that function as distinct
 * topical destinations (assessment lenses, wellness modules, evaluation
 * lifecycle), plus standalone routes like /seven-fires.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const anchors = ["", "#assess", "#wellness", "#capacity", "#evaluate", "#copilot", "#faq"];
  const anchorEntries: MetadataRoute.Sitemap = anchors.map((anchor) => ({
    url: `${SITE_URL}/${anchor}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: anchor === "" ? 1 : 0.7,
  }));
  return [
    ...anchorEntries,
    {
      url: `${SITE_URL}/seven-fires`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
