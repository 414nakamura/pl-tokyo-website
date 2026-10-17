import { siteConfig } from "@/config/site";
import { getCategories, getCategoryOutbound } from "@/lib/products";

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
