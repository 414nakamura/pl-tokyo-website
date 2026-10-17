"use client";

import { SiteLink as Link } from "@/components/SiteLink";
import { useCallback, useEffect, useRef, useState } from "react";
import { CategoryAmazonLink, type CategoryOutbound } from "@/components/CategoryAmazonLink";
import { CategoryCardBody } from "@/components/CategoryCard";
import { Icon } from "@/components/Icon";
import { ProductGrid } from "@/components/ProductGrid";
import { track } from "@/lib/analytics";
import type { SiteImage } from "@/lib/images";
import type { Category, ResolvedProduct } from "@/types";

/**
 * 買い忘れカテゴリ＋その場絞り込み
 * - カテゴリを1タップ → ページ遷移せず、すぐ下に該当商品を表示してスクロール
 * - JSが動かない環境では、通常のリンクとしてカテゴリページ（/sale/category/{id}/）へ移動
 * - 選ばれたカテゴリの商品カードだけをその場で描画（全カテゴリ分のHTMLを事前に持たないので軽い）
 */
export function CategoryExplorer({
  categories,
  productsByCategory,
  images,
  links,
}: {
  categories: Category[];
  productsByCategory: Record<string, ResolvedProduct[]>;
  images: Record<string, SiteImage | null>;
  links: Record<string, CategoryOutbound | null>;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const select = useCallback(
    (id: string, pagePosition: string, source: string) => {
      setSelected(id);
      track("category_click", { category: id, page_position: pagePosition, source });
      requestAnimationFrame(() => {
        panelRef.current?.scrollIntoView({ block: "start" });
        panelRef.current?.focus({ preventScroll: true });
      });
    },
    [],
  );

  // FV のクイックチップなど、他の場所からの選択（data-category-select）
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-category-select]");
      if (!el) return;
      const id = el.dataset.categorySelect;
      if (!id || !productsByCategory[id]) return;
      e.preventDefault();
      select(id, el.dataset.categoryPosition ?? "external", "chip");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [productsByCategory, select]);

  const current = categories.find((c) => c.id === selected);

  return (
    <>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
        {categories.map((c, i) => {
          const isSel = c.id === selected;
          return (
            <li key={c.id}>
              <Link
                href={`/category/${c.id}/`}
                aria-controls="category-panel"
                aria-current={isSel ? "true" : undefined}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                  e.preventDefault();
                  select(c.id, `categories:${i + 1}`, "grid");
                }}
                className="block h-full text-left transition active:scale-[0.98]"
              >
                <CategoryCardBody category={c} image={images[c.id] ?? null} selected={isSel} />
              </Link>
            </li>
          );
        })}
      </ul>

      <div
        id="category-panel"
        ref={panelRef}
        tabIndex={-1}
        aria-live="polite"
        className="scroll-mt-16 outline-none"
      >
        {current ? (
          <div className="mt-7 border-t border-ink/15 pt-5">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h3 className="text-[20px] font-bold">
                {current.name}
                <span className="ml-2 text-[12px] font-normal text-muted">{productsByCategory[current.id]?.length ?? 0}件</span>
              </h3>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-muted"
                aria-label="カテゴリの表示を閉じる"
              >
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>
            <ProductGrid
              key={current.id}
              products={productsByCategory[current.id] ?? []}
              section={`category_${current.id}`}
              initialCount={4}
              variant="row"
            />
            {links[current.id] ? (
              <div className="mt-4">
                <CategoryAmazonLink categoryId={current.id} link={links[current.id]!} section={`category_${current.id}`} />
              </div>
            ) : null}
            <div className="mt-4 flex justify-center">
              <Link
                href={`/category/${current.id}/`}
                className="inline-flex min-h-11 items-center gap-1 px-3 text-[13px] font-bold text-accent"
              >
                {current.name}の一覧ページへ
                <Icon name="arrow-right" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
