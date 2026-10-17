import { experiments } from "@/config/saleConfig";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/Icon";
import type { ResolvedProduct } from "@/types";

/**
 * Amazonへのボタン（ユーザーが明示的に押した時だけ遷移）
 * - URLは lib/amazon.ts で組み立て済みの outboundUrl のみを使う
 * - クリック計測は Tracking.tsx がまとめて行う（data-track 属性）
 * - 自動遷移・カード全体のリンク化はしない
 */
export function AmazonLink({
  product,
  section,
  position,
  variant = "pill",
  label = experiments.amazonCtaLabel,
}: {
  product: ResolvedProduct;
  section: string;
  position: number;
  variant?: "block" | "pill";
  label?: string;
}) {
  const shape =
    variant === "block"
      ? "flex min-h-12 w-full justify-center px-5 text-[15px]"
      : "inline-flex min-h-11 shrink-0 px-4 text-[13.5px]";

  if (!product.outboundUrl) {
    return (
      <span className={`${shape} items-center rounded-full border border-dashed border-line text-muted`} aria-disabled="true">
        リンク準備中
      </span>
    );
  }

  const newTab = siteConfig.amazonOpensInNewTab;
  const params = {
    product_id: product.id,
    product_name: product.name.slice(0, 80),
    category: product.category,
    section,
    position,
    page_position: `${section}:${position}`,
    link_type: variant === "block" ? "cta_block" : "cta_pill",
    is_sample: product.isSample ? true : undefined,
  };

  return (
    <a
      href={product.outboundUrl}
      // sponsored：アフィリエイトリンクであることを検索エンジンに伝える
      rel="sponsored nofollow noopener"
      target={newTab ? "_blank" : undefined}
      data-track="amazon_click"
      data-track-params={JSON.stringify(params)}
      className={`${shape} items-center gap-1.5 rounded-full bg-cta font-bold text-white transition active:scale-[0.97] active:bg-cta-strong`}
    >
      {label}
      <Icon name="external" className="h-3.5 w-3.5 opacity-70" strokeWidth={2.2} />
      {newTab ? <span className="sr-only">（Amazonのページを新しいタブで開きます）</span> : null}
    </a>
  );
}
