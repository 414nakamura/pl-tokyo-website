import { siteConfig } from "@/config/site";
import { buildAmazonUrl } from "@/lib/amazon";
import { getCategories, getCategoryOutbound } from "@/lib/products";
import { getSiteMode } from "@/lib/site";

/** グローバルナビ・ジャンルボタン用の項目（categories.ts から自動生成） */
export type GenreNavItem = {
  id: string;
  label: string;
  fullLabel: string;
  icon: string;
  href: string;
  /** true = Amazonへ移動（外部リンク） */
  external: boolean;
  isSale: boolean;
  /** メニューで名前の下に出す補足（例：Amazonセールトップ） */
  note?: string;
};

export function getGenreNavItems(): GenreNavItem[] {
  return getCategories().map((c) => {
    const out = siteConfig.genreNavTarget === "amazon" ? getCategoryOutbound(c) : null;
    return {
      id: c.id,
      label: c.shortName ?? c.name,
      fullLabel: c.name,
      icon: typeof c.icon === "string" ? c.icon : "box",
      href: out ? out.url : `${siteConfig.basePath}/category/${c.id}/`,
      external: !!out,
      isSale: !!out?.isSale,
    };
  });
}

/** グローバルナビ・メニュー用：ジャンル＋追加リンク（その他・セールトップなど） */
export function getGlobalNavItems(): GenreNavItem[] {
  const mode = getSiteMode();
  const extra: GenreNavItem[] = [];
  for (const l of siteConfig.navExtraLinks) {
    if (l.saleOnly && mode !== "sale") continue;
    const url = buildAmazonUrl(l.url);
    if (!url) continue;
    extra.push({ id: l.id, label: l.label, fullLabel: l.fullLabel, icon: l.icon, href: url, external: true, isSale: !!l.saleOnly, note: l.note });
  }
  return [...getGenreNavItems(), ...extra];
}
