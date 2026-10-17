import { siteConfig } from "@/config/site";
import { Icon } from "@/components/Icon";

export type CategoryOutbound = { url: string; label: string; isSale: boolean };

/**
 * カテゴリ全体のAmazonページへのボタン（例：「日用品のセール会場をAmazonで見る」）
 * URLは data/categories.ts の amazonUrl / saleAmazonUrl（lib/products.ts で解決済み）
 * 押した時だけ遷移。計測は Tracking.tsx が amazon_click として記録（link_type で商品リンクと区別）
 */
export function CategoryAmazonLink({
  categoryId,
  link,
  section,
}: {
  categoryId: string;
  link: CategoryOutbound;
  section: string;
}) {
  const newTab = siteConfig.amazonOpensInNewTab;
  const params = {
    category: categoryId,
    section,
    page_position: `${section}:category_link`,
    link_type: link.isSale ? "category_sale_page" : "category_page",
  };
  return (
    <a
      href={link.url}
      rel="sponsored nofollow noopener"
      target={newTab ? "_blank" : undefined}
      data-track="amazon_click"
      data-track-params={JSON.stringify(params)}
      className="flex min-h-12 w-full items-center justify-center gap-1.5 rounded-full border-[1.5px] border-cta bg-card px-5 text-[14.5px] font-bold text-cta transition active:scale-[0.98]"
    >
      {link.label}
      <Icon name="external" className="h-3.5 w-3.5 opacity-70" strokeWidth={2.2} />
      {newTab ? <span className="sr-only">（Amazonのページを新しいタブで開きます）</span> : null}
    </a>
  );
}
