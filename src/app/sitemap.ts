import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://waoc.io", changeFrequency: "weekly", priority: 1 },
    { url: "https://waoc.io/zh", changeFrequency: "weekly", priority: 0.9 }
  ];
}
