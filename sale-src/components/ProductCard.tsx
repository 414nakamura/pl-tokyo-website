import { AmazonLink } from "@/components/AmazonLink";
import { ProductImage } from "@/components/ProductImage";
import { siteConfig } from "@/config/site";
import { formatJstDateTime, formatYen } from "@/lib/format";
import { targetText } from "@/lib/labels";
import type { ResolvedProduct } from "@/types";

export type CardVariant = "feature" | "row" | "compact";

/**
 * 商品カード
 * 読む順番：画像 → 商品名 → どんな人に → おすすめ理由 → 価格はAmazonで → ボタン
 * カード全体はリンクにしない（誤タップ防止）。遷移はボタンのみ
 *   feature : 大きい写真つき（今日の注目の1件目）
 *   row     : 標準（サムネイル＋本文）
 *   compact : 下の方のセクション用（理由を2行に省略）
 */
export function ProductCard({
  product,
  section,
  position,
  variant = "row",
  index,
  priorityImage = false,
}: {
  product: ResolvedProduct;
  section: string;
  position: number;
  variant?: CardVariant;
  /** 番号を表示する場合（今日の注目） */
  index?: number;
  priorityImage?: boolean;
}) {
  const who = targetText(product.target);
  const updated = product.showUpdatedAt ? formatJstDateTime(product.updatedAt) : null;

  // 価格は API 取得（priceSource: "api"）かつ取得日時がある場合のみ表示。手入力の価格は表示しない
  // TODO: Amazon最新規約を確認してから実装（価格表示の更新頻度・表示文言）
  const priceFetched = formatJstDateTime(product.priceFetchedAt);
  const price = product.priceSource === "api" && priceFetched ? formatYen(product.currentPrice ?? product.price) : null;

  const viewParams = {
    product_id: product.id,
    category: product.category,
    section,
    position,
    page_position: `${section}:${position}`,
  };

  const imageNote =
    product.image && product.imageFit === "cover" ? (
      <p className="mt-2 text-[11px] text-muted">※画像はイメージです。実際の商品はAmazonでご確認ください。</p>
    ) : null;

  // デッドクリック対策：商品画像と商品名もボタンと同じAmazonページへ（押した時だけ遷移）
  const newTab = siteConfig.amazonOpensInNewTab;
  const outLink = (kind: "image" | "title", children: React.ReactNode, className = "") =>
    product.outboundUrl ? (
      <a
        href={product.outboundUrl}
        rel="sponsored nofollow noopener"
        target={newTab ? "_blank" : undefined}
        data-track="amazon_click"
        data-track-params={JSON.stringify({ ...viewParams, product_name: product.name.slice(0, 80), link_type: kind })}
        className={className}
        {...(kind === "image" ? { tabIndex: -1, "aria-hidden": true } : {})}
      >
        {children}
      </a>
    ) : (
      children
    );

  const meta = (
    <p className="flex flex-wrap items-baseline gap-x-2 text-[11.5px] leading-5 text-muted">
      {index ? <span className="text-[13px] font-bold text-ink">{String(index).padStart(2, "0")}</span> : null}
      <span>{product.categoryName}</span>
      {product.campaignComment ? <span className="rounded-full bg-accent-soft px-2 text-[11px] font-bold text-accent">{product.campaignComment}</span> : null}
    </p>
  );

  const priceNote = (
    <p className="whitespace-nowrap text-[11.5px] leading-snug text-muted">
      {price ? (
        <>
          <span className="text-[15px] font-bold text-ink">{price}</span>
          <span className="ml-1">（{priceFetched}時点）</span>
        </>
      ) : (
        "最新価格はAmazonで確認"
      )}
      {updated ? <span className="block">更新 {updated}</span> : null}
    </p>
  );

  if (variant === "feature") {
    return (
      <article
        className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-card"
        data-track-view={JSON.stringify(viewParams)}
        aria-label={product.name}
      >
        <div className={`relative w-full border-b border-line ${product.imageFit === "cover" ? "aspect-square" : "aspect-[4/3]"}`}>
          {outLink(
            "image",
            <ProductImage src={product.image} alt={product.imageAlt || product.name} icon={product.categoryIcon} size="fill" priority={priorityImage} fit={product.imageFit} />,
            "block h-full w-full",
          )}
        </div>
        <div className="p-4 pb-5">
          {meta}
          <h3 className="mt-1 text-[18px] font-bold leading-snug">{outLink("title", product.name, "underline-offset-4 active:underline")}</h3>
          {who ? <p className="mt-1 text-[12.5px] text-muted">{who}に</p> : null}
          {product.reason ? <p className="mt-3 text-[14px] leading-[1.85] text-ink-soft">{product.reason}</p> : null}
          {imageNote}
          <div className="mt-4">{priceNote}</div>
          <div className="mt-2.5">
            <AmazonLink product={product} section={section} position={position} variant="block" />
          </div>
        </div>
      </article>
    );
  }

  const compact = variant === "compact";
  return (
    <article
      className="h-full rounded-[var(--radius-card)] border border-line bg-card p-3.5"
      data-track-view={JSON.stringify(viewParams)}
      aria-label={product.name}
    >
      <div className="flex gap-3">
        {outLink(
          "image",
          <ProductImage
            src={product.image}
            alt={product.imageAlt || product.name}
            icon={product.categoryIcon}
            size={compact ? 72 : 88}
            priority={priorityImage}
            fit={product.imageFit}
            className="rounded-[10px] border border-line"
          />,
          "shrink-0 self-start",
        )}
        <div className="min-w-0 flex-1">
          {meta}
          <h3 className="mt-0.5 line-clamp-3 text-[15px] font-bold leading-snug">
            {outLink("title", product.name, "underline-offset-4 active:underline")}
          </h3>
          {who ? <p className="mt-1 text-[12px] leading-snug text-muted">{who}に</p> : null}
        </div>
      </div>
      {product.reason ? (
        <p className={`mt-2.5 text-[13.5px] leading-[1.8] text-ink-soft ${compact ? "line-clamp-2" : ""}`}>{product.reason}</p>
      ) : null}
      {imageNote}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
        {priceNote}
        <AmazonLink product={product} section={section} position={position} variant="pill" />
      </div>
    </article>
  );
}
