import type { MetadataRoute } from "next";
import { getCategories } from "@/lib/products";
import { absoluteUrl } from "@/lib/site";

/**
 * /sale/sitemap.xml を生成（既存の企業サイトの sitemap には触れない）
 * Google Search Console で https://pl-tokyo.com/sale/sitemap.xml を送信してください
 */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "daily", priority: 1 },
    ...getCategories().map((c) => ({
      url: absoluteUrl(`/category/${c.id}/`),
      lastModified: now,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    { url: absoluteUrl("/company/"), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/privacy/"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/affiliate-policy/"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
