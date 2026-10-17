"use client";

import { useState } from "react";
import { ProductCard, type CardVariant } from "@/components/ProductCard";
import type { ResolvedProduct } from "@/types";

const GRID = "grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3";

/**
 * 商品一覧。grid は initialCount 件＋「もっと見る」、horizontal は全件を横1列で表示
 * HTMLはサーバーで事前描画されます（SEO・表示速度はそのまま）。
 * Client Component にしているのは「もっと見る」の開閉のためと、
 * 商品データだけをブラウザに渡すことでページ容量を小さくするためです。
 */
export function ProductGrid({
  products,
  section,
  initialCount,
  variant = "row",
  numbered = false,
  featureFirst = false,
  priorityImages = 0,
  layout = "grid",
  labelledBy,
}: {
  products: ResolvedProduct[];
  section: string;
  initialCount: number;
  variant?: CardVariant;
  /** 01, 02… と番号を振る */
  numbered?: boolean;
  /** 1件目だけ大きく見せる */
  featureFirst?: boolean;
  priorityImages?: number;
  /** horizontal は全件を1列に並べ、一覧内だけを横スクロールする */
  layout?: "grid" | "horizontal";
  labelledBy?: string;
}) {
  const [open, setOpen] = useState(false);
  if (!products.length) {
    return (
      <p className="rounded-[var(--radius-card)] border border-line bg-card px-4 py-6 text-center text-sm text-muted">
        現在、表示できる商品を準備中です。
      </p>
    );
  }
  const rest = products.length - initialCount;
  // 1件目を大きく見せるのは、商品画像がある場合だけ（画像なしで大きくすると間延びするため）
  const horizontal = layout === "horizontal";
  const feature = !horizontal && featureFirst && !!products[0]?.image;
  return (
    <>
      <ul
        aria-labelledby={labelledBy}
        tabIndex={horizontal ? 0 : undefined}
        className={horizontal
          ? "relative flex snap-x snap-proximity items-stretch gap-3 overflow-x-auto overscroll-x-contain pb-3 [scrollbar-width:thin] [scrollbar-color:var(--color-line)_transparent]"
          : GRID}
      >
        {products.map((p, i) => (
          <li key={p.id} hidden={!horizontal && !open && i >= initialCount}
            className={horizontal ? "relative w-[84%] max-w-80 shrink-0 snap-start sm:w-80" : feature && i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
            <ProductCard
              product={p}
              section={section}
              position={i + 1}
              variant={feature && i === 0 ? "feature" : variant}
              index={numbered ? i + 1 : undefined}
              priorityImage={i < priorityImages}
            />
          </li>
        ))}
      </ul>
      {!horizontal && rest > 0 && !open ? (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="min-h-11 rounded-full border border-ink/20 bg-transparent px-6 text-[13.5px] font-bold text-ink transition active:scale-[0.98]"
          >
            ほかに{rest}件を見る
          </button>
        </div>
      ) : null}
    </>
  );
}
