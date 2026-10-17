"use client";

import { useId, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { ProductCard, type CardVariant } from "@/components/ProductCard";
import { carouselLabels } from "@/config/site";
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
  const hintId = useId();
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
      <div className="mx-auto flex max-w-5xl justify-end px-4">
        <p id={hintId} className="sr-only">{carouselLabels.instructions}</p>
        <button type="button" aria-label={carouselLabels.next} onClick={() => {
          const list = listRef.current;
          if (!list) return;
          const step = (list.children[1] as HTMLElement)?.offsetLeft - (list.children[0] as HTMLElement)?.offsetLeft;
          list.scrollBy({ left: step || list.clientWidth * 0.84,
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
        }} className="group mb-2 inline-flex min-h-11 items-center gap-3 border-b border-ink/25 px-1 text-ink-soft transition-colors hover:border-accent hover:text-accent motion-reduce:transition-none">
          <span className="text-[10px] font-bold tracking-[0.2em]">{carouselLabels.scroll}</span>
          <svg aria-hidden="true" viewBox="0 0 52 16" className="h-4 w-13 transition-transform group-hover:translate-x-1 motion-reduce:transition-none" fill="none">
            <path d="M1 11H49L40 2" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <ul ref={listRef} aria-labelledby={labelledBy} aria-describedby={hintId} tabIndex={0}
        className="no-scrollbar relative grid w-full grid-flow-col auto-cols-[min(20rem,calc((100vw_-_2rem)*0.84))] grid-rows-[repeat(7,auto)] gap-x-3 overflow-x-auto overscroll-x-contain py-1 [scroll-padding-left:var(--product-row-inset)] sm:auto-cols-[20rem]">
        {Array.from({ length: sideCopies * 2 + 1 }, (_, copy) => products.map((product, index) => {
          const original = copy === sideCopies;
          return (
            <li key={`${copy}:${product.id}`} aria-hidden={original ? undefined : true}
              data-carousel-copy={original ? undefined : ""}
              data-carousel-product={product.id}
              className="relative row-span-7 grid grid-rows-subgrid">
              <ProductCard product={product} section={section} position={index + 1} variant={variant}
                index={numbered ? index + 1 : undefined} priorityImage={original && index < priorityImages} />
            </li>
          );
        }))}
      </ul>
    </div>
  );
}
