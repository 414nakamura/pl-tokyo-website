import { evergreenConfig, experiments, heroVariants, saleConfig } from "@/config/saleConfig";
import { siteConfig } from "@/config/site";
import type { HeroVariant, SiteMode } from "@/types";

/** 日本時間の "YYYY-MM-DD" を Date に（startは0:00、endは23:59:59） */
function jstDate(ymd: string, endOfDay = false): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(ymd)) return null;
  return new Date(`${ymd}T${endOfDay ? "23:59:59" : "00:00:00"}+09:00`);
}

/**
 * 現在のモードを判定（静的サイトではビルド時点で判定）
 * active=true かつ期間内（期間未設定なら常に期間内）→ sale、それ以外 → evergreen
 */
export function getSiteMode(now: Date = new Date()): SiteMode {
  if (!saleConfig.active) return "evergreen";
  const start = saleConfig.startDate ? jstDate(saleConfig.startDate) : null;
  const end = saleConfig.endDate ? jstDate(saleConfig.endDate, true) : null;
  if (start && now < start) return "evergreen";
  if (end && now > end) return "evergreen";
  return "sale";
}

export function getActiveCampaignId(mode: SiteMode = getSiteMode()): string {
  return mode === "sale" ? saleConfig.campaignId : evergreenConfig.campaignId;
}

/** Heroの文言（A/Bバリアント適用後） */
export function getHeroCopy(mode: SiteMode = getSiteMode()): HeroVariant & { variant: string } {
  if (mode === "evergreen") {
    return {
      title: evergreenConfig.heroTitle,
      subtitle: evergreenConfig.heroSubtitle,
      cta: evergreenConfig.mainCTA,
      variant: "evergreen",
    };
  }
  const key = experiments.heroVariant;
  if (key && heroVariants[key]) return { ...heroVariants[key], variant: key };
  return { title: saleConfig.heroTitle, subtitle: saleConfig.heroSubtitle, cta: saleConfig.mainCTA, variant: "default" };
}

/** セール期間の表示用文字列（例：10月17日〜10月20日） */
export function getSalePeriodLabel(): string | null {
  const fmt = (ymd: string) => {
    const d = jstDate(ymd);
    return d ? `${Number(ymd.slice(5, 7))}月${Number(ymd.slice(8, 10))}日` : null;
  };
  const s = saleConfig.startDate ? fmt(saleConfig.startDate) : null;
  const e = saleConfig.endDate ? fmt(saleConfig.endDate) : null;
  if (s && e) return `${s}〜${e}`;
  if (e) return `${e}まで`;
  return null;
}

export function getHeroImage(mode: SiteMode = getSiteMode()): { src: string; alt: string } {
  return mode === "sale"
    ? { src: saleConfig.heroImage, alt: saleConfig.heroImageAlt }
    : { src: evergreenConfig.heroImage, alt: evergreenConfig.heroImageAlt };
}

export function getOgImage(mode: SiteMode = getSiteMode()): string {
  return mode === "sale" ? saleConfig.ogImage : evergreenConfig.ogImage;
}

/** /sale/ 配下の絶対URL（canonical・OGP・sitemap用）。path は "/" や "/category/daily/" */
export function absoluteUrl(path = "/"): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.siteUrl}${siteConfig.basePath}${p}`;
}

/**
 * public/ 配下のファイルのURL（basePath付き）
 * next/image や <img> に文字列で渡す場合、basePath は自動で付かないためこれを使う
 */
export function assetPath(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.basePath}${p}`;
}
