import type { AnchorHTMLAttributes, ReactNode } from "react";
import type { GenreNavItem } from "@/lib/nav";

/**
 * ジャンルへのリンク（ナビ・ボタン共通）
 * Amazonへ移動する場合は rel="sponsored" と計測（amazon_click / link_type=genre_nav）を付ける
 */
export function GenreLink({
  item,
  position,
  children,
  newTab = true,
  ...rest
}: {
  item: GenreNavItem;
  /** 計測用の表示位置（例：global_nav / hero_genre / sticky_genre / menu） */
  position: string;
  children: ReactNode;
  newTab?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  if (!item.external) {
    return (
      <a
        href={item.href}
        data-track="category_click"
        data-track-params={JSON.stringify({ category: item.id, page_position: position, source: "genre_nav" })}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <a
      href={item.href}
      rel="sponsored nofollow noopener"
      target={newTab ? "_blank" : undefined}
      data-track="amazon_click"
      data-track-params={JSON.stringify({
        category: item.id,
        section: position,
        page_position: `${position}:${item.id}`,
        link_type: item.isSale ? "genre_nav_sale_page" : "genre_nav",
      })}
      {...rest}
    >
      {children}
      {newTab ? <span className="sr-only">（Amazonのページを新しいタブで開きます）</span> : null}
    </a>
  );
}
