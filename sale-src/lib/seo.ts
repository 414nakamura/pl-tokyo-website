import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { absoluteUrl, getOgImage } from "@/lib/site";

/**
 * 各ページのメタ情報（canonical / OGP / Twitter）をまとめて作る
 * canonical は必ず https://pl-tokyo.com/sale/... になる（企業サイトTOPにはしない）
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const url = absoluteUrl(path);
  const image = { url: absoluteUrl(getOgImage()), width: 1200, height: 630, alt: siteConfig.siteName };
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.siteName,
      title: `${title}｜${siteConfig.siteName}`,
      description,
      url,
      images: [image],
    },
    twitter: { card: "summary_large_image", title: `${title}｜${siteConfig.siteName}`, description, images: [image.url] },
  };
}
