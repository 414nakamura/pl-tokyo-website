import type { Metadata, Viewport } from "next";
import "@fontsource/line-seed-jp/400.css";
import "@fontsource/line-seed-jp/700.css";
import "./globals.css";
import { AnalyticsScripts } from "@/components/AnalyticsScripts";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Tracking } from "@/components/Tracking";
import { saleConfig } from "@/config/saleConfig";
import { siteConfig } from "@/config/site";
import { absoluteUrl, assetPath, getActiveCampaignId, getHeroCopy, getOgImage, getSiteMode } from "@/lib/site";

const mode = getSiteMode();
const hero = getHeroCopy(mode);
const defaultTitle =
  mode === "sale"
    ? `買いたかったもの、忘れてない？｜${saleConfig.saleShortName}の${siteConfig.siteName}`
    : `買い忘れているもの、ありませんか？｜${siteConfig.siteName}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: { default: defaultTitle, template: `%s｜${siteConfig.siteName}` },
  description: saleConfig.metaDescription,
  applicationName: siteConfig.siteName,
  alternates: { canonical: absoluteUrl("/") },
  robots: siteConfig.noindex ? { index: false, follow: false } : { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.siteName,
    title: defaultTitle,
    description: saleConfig.metaDescription,
    url: absoluteUrl("/"),
    images: [{ url: absoluteUrl(getOgImage(mode)), width: 1200, height: 630, alt: siteConfig.siteName }],
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description: saleConfig.metaDescription },
  icons: { icon: assetPath("/favicon.svg") },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f9f8f6",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          本文へスキップ
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <Tracking
          context={{
            campaign_id: getActiveCampaignId(mode),
            site_mode: mode,
            hero_variant: hero.variant,
          }}
        />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
