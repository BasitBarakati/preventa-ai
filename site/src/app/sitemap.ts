import type { MetadataRoute } from "next";
import { allPublicPaths, brand } from "@/lib/site-content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return allPublicPaths.map((path) => ({
    url: `${brand.url}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path.split("/").length <= 2 ? 0.8 : 0.65,
  }));
}
