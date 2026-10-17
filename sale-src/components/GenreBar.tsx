"use client";

import { useEffect, useRef, useState } from "react";
import { GenreLink } from "@/components/GenreLink";
import { Icon } from "@/components/Icon";
import type { GenreNavItem } from "@/lib/nav";

/**
 * ジャンル別ボタン
 * - Heroバナー直下に一覧（スマホは5列×2段）
 * - その一覧が画面外に出たら、同じボタンを画面下部に追従表示（スマホのみ・横スクロール）
 */
export function GenreBar({ items, newTab }: { items: GenreNavItem[]; newTab: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        // 一覧より下にスクロールしたときだけ表示（ページ最上部に戻ったら隠す）
        setShowSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!items.length) return null;

  return (
    <>
      <div ref={ref} className="border-b border-line bg-card">
        <nav aria-label="ジャンル" className="mx-auto max-w-5xl px-2 py-3 sm:px-4">
          <ul className="grid grid-cols-5 gap-x-1 gap-y-2 sm:grid-cols-10">
            {items.map((item) => (
              <li key={item.id}>
                <GenreLink
                  item={item}
                  position="hero_genre"
                  newTab={newTab}
                  className="flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-xl px-0.5 text-center transition active:bg-accent-soft"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <span className="text-[11px] font-bold leading-tight text-ink-soft">{item.label}</span>
                </GenreLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* 追従バー（スマホのみ） */}
      <div
        aria-hidden={!showSticky}
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-card/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] backdrop-blur transition-transform duration-200 md:hidden ${
          showSticky ? "translate-y-0" : "pointer-events-none translate-y-full"
        }`}
      >
        <nav aria-label="ジャンル（追従）">
          <ul className="no-scrollbar flex gap-1.5 overflow-x-auto px-2 py-2">
            {items.map((item) => (
              <li key={item.id} className="shrink-0">
                <GenreLink
                  item={item}
                  position="sticky_genre"
                  newTab={newTab}
                  tabIndex={showSticky ? undefined : -1}
                  className="flex min-h-11 items-center gap-1.5 rounded-full bg-accent-soft px-3.5 text-[13px] font-bold text-accent"
                >
                  <Icon name={item.icon} className="h-4 w-4" />
                  {item.label}
                </GenreLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}
