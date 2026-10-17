"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { GenreLink } from "@/components/GenreLink";
import { Icon } from "@/components/Icon";
import type { GenreNavItem } from "@/lib/nav";

/**
 * スマホ用ハンバーガーメニュー（ジャンル一覧＋サイト内リンク）
 * ヘッダー（backdrop-filter付き）の中だと fixed が効かないため、body直下に描画する
 */
export function MobileMenu({
  items,
  newTab,
  basePath,
}: {
  items: GenreNavItem[];
  newTab: boolean;
  basePath: string;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label="メニューを開く"
        className="flex h-11 w-11 items-center justify-center rounded-full text-ink md:hidden"
      >
        <Icon name="menu" className="h-6 w-6" strokeWidth={1.8} />
      </button>

      {open && typeof document !== "undefined" ? createPortal(
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="メニュー" className="fixed inset-0 z-50 md:hidden">
          <button type="button" aria-label="メニューを閉じる" className="absolute inset-0 bg-black/30" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 right-0 flex w-[84%] max-w-[340px] flex-col overflow-y-auto bg-paper shadow-xl">
            <div className="flex h-13 items-center justify-between border-b border-line px-4">
              <span className="text-[16px] font-bold">ジャンルから探す</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="メニューを閉じる"
                className="flex h-11 w-11 items-center justify-center rounded-full text-muted"
              >
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>
            <ul className="divide-y divide-line px-2">
              {items.map((item) => (
                <li key={item.id}>
                  <GenreLink
                    item={item}
                    position="menu"
                    newTab={newTab}
                    onClick={() => setOpen(false)}
                    className="flex min-h-13 items-center gap-3 px-2 text-[15px] font-bold text-ink"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                      <Icon name={item.icon} className="h-5 w-5" />
                    </span>
                    <span className="flex-1">
                      {item.fullLabel}
                      {item.note ? <span className="block text-[12px] font-normal text-muted">{item.note}</span> : null}
                    </span>
                    {item.external ? (
                      <Icon name="external" className="h-4 w-4 text-muted" />
                    ) : (
                      <Icon name="arrow-right" className="h-4 w-4 text-muted" />
                    )}
                  </GenreLink>
                </li>
              ))}
            </ul>
            <ul className="mt-4 border-t border-line px-4 py-3 text-[14px] text-ink-soft">
              {[
                ["今日の注目", `${basePath}/#today`],
                ["カテゴリから探す", `${basePath}/#categories`],
                ["運営会社", `${basePath}/company/`],
                ["アフィリエイトポリシー", `${basePath}/affiliate-policy/`],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} onClick={() => setOpen(false)} className="flex min-h-11 items-center">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            {items.some((i) => i.external) ? (
              <p className="px-4 pb-6 text-[11px] leading-relaxed text-muted">↗ のついた項目はAmazonのページが開きます。</p>
            ) : null}
          </div>
        </div>
      , document.body) : null}
    </>
  );
}
