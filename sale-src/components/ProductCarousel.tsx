"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { ProductCard, type CardVariant } from "@/components/ProductCard";
import type { ResolvedProduct } from "@/types";

const modulo = (value: number, length: number) => ((value % length) + length) % length;

/** 全幅の手動スクロール。両端の同じ並びへ移動して、左右に循環させる。 */
export function ProductCarousel({ products, section, variant, numbered, priorityImages, labelledBy }: {
  products: ResolvedProduct[];
  section: string;
  variant: CardVariant;
  numbered: boolean;
  priorityImages: number;
  labelledBy?: string;
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const [sideCopies, setSideCopies] = useState(2);
  const progressRef = useRef(0);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || !products.length) return;
    let cycle = 0;
    let origin = 0;
    let ready = false;
    const measure = () => {
      const items = list.children;
      const first = items[0] as HTMLElement;
      const next = items[products.length] as HTMLElement;
      const middle = items[sideCopies * products.length] as HTMLElement;
      if (!first || !next || !middle) return;
      cycle = next.getBoundingClientRect().left - first.getBoundingClientRect().left;
      if (cycle <= 0) return;
      // 小さい商品数・広い画面でも、左右に十分な繰り返しを用意する。
      const required = Math.max(2, Math.ceil(list.clientWidth / cycle) + 1);
      if (required !== sideCopies) {
        setSideCopies(required);
        return;
      }
      const inset = Math.max(16, (list.clientWidth - 1024) / 2 + 16);
      origin = middle.getBoundingClientRect().left - first.getBoundingClientRect().left - inset;
      list.scrollLeft = origin + progressRef.current * cycle;
      ready = true;
    };
    const onScroll = () => {
      if (!ready || cycle <= 0) return;
      const offset = modulo(list.scrollLeft - origin, cycle);
      // 小数ピクセルの丸めで「ほぼ0」が「ほぼ1周」にならないようにする。
      progressRef.current = offset < 1 || cycle - offset < 1 ? 0 : offset / cycle;
      // 端へ近づいた時だけ同じ絵柄の中央の並びへ戻す。自動送りは行わない。
      const rightEdge = list.scrollWidth - list.clientWidth - cycle;
      if (list.scrollLeft < cycle || list.scrollLeft > rightEdge) {
        list.scrollLeft = origin + progressRef.current * cycle;
      }
    };
    // 複製はポインターで操作できるが、Tab移動と読み上げには元の商品だけを使う。
    list.querySelectorAll<HTMLElement>("[data-carousel-copy] a, [data-carousel-copy] button").forEach((el) => {
      el.tabIndex = -1;
    });
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(list);
    list.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      resize.disconnect();
      list.removeEventListener("scroll", onScroll);
    };
  }, [products.length, sideCopies]);

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2"
      style={{ "--product-row-inset": "max(1rem, calc((100vw - 64rem) / 2 + 1rem))" } as CSSProperties}>
      <ul ref={listRef} aria-labelledby={labelledBy} tabIndex={0}
        className="no-scrollbar relative flex w-full items-stretch gap-3 overflow-x-auto overscroll-x-contain py-1 [scroll-padding-left:var(--product-row-inset)]">
        {Array.from({ length: sideCopies * 2 + 1 }, (_, copy) => products.map((product, index) => {
          const original = copy === sideCopies;
          return (
            <li key={`${copy}:${product.id}`} aria-hidden={original ? undefined : true}
              data-carousel-copy={original ? undefined : ""}
              data-carousel-product={product.id}
              className="relative w-[calc((100vw_-_2rem)*0.84)] max-w-80 shrink-0 sm:w-80">
              <ProductCard product={product} section={section} position={index + 1} variant={variant}
                index={numbered ? index + 1 : undefined} priorityImage={original && index < priorityImages} />
            </li>
          );
        }))}
      </ul>
    </div>
  );
}
