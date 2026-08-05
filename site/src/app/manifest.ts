import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PREVENTA AI",
    short_name: "PREVENTA AI",
    description: "Responsible AI for public health transformation.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7fafc",
    theme_color: "#031026",
    orientation: "portrait-primary",
    categories: ["health", "education", "productivity"],
    icons: [
      { src: "/brand/preventa-ai-icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/preventa-ai-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
