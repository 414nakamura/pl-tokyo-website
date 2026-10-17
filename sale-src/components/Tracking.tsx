"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackingConfig, type TrackEventName } from "@/config/trackingConfig";
import { setTrackingContext, track, type TrackParams } from "@/lib/analytics";
import { captureAttribution } from "@/lib/utm";

/**
 * 計測の司令塔（画面には何も表示しない）
 * - UTM / creative_id の取得・保存
 * - page_view / scroll_25・50・75
 * - product_view（カードが50%以上見えたら1回）
 * - data-track 属性が付いた要素のクリック（hero_cta_click / amazon_click）
 */
function parseParams(raw: string | undefined): TrackParams {
  if (!raw) return {};
  try {
    return JSON.parse(raw) as TrackParams;
  } catch {
    return {};
  }
}

export function Tracking({ context }: { context: TrackParams }) {
  const pathname = usePathname();

  // 共通コンテキスト＋UTM保存（初回のみ）
  useEffect(() => {
    setTrackingContext(context);
    captureAttribution();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // page_view・スクロール深度（ページごと）
  useEffect(() => {
    track("page_view", { page_title: document.title });

    const fired = new Set<number>();
    let ticking = false;
    const check = () => {
      ticking = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max <= 0 ? 100 : (window.scrollY / max) * 100;
      for (const t of trackingConfig.scrollThresholds) {
        if (pct >= t && !fired.has(t)) {
          fired.add(t);
          track(`scroll_${t}` as TrackEventName);
        }
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(check);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // product_view（IntersectionObserver）
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const seen = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          const params = parseParams(el.dataset.trackView);
          const key = `${params.product_id}|${params.section}`;
          if (!seen.has(key)) {
            seen.add(key);
            track("product_view", params);
          }
          io.unobserve(el);
        }
      },
      { threshold: trackingConfig.productViewThreshold },
    );
    const observeAll = (root: ParentNode) =>
      root.querySelectorAll<HTMLElement>("[data-track-view]").forEach((el) => io.observe(el));
    observeAll(document);
    // カテゴリ絞り込みなどで後から表示された商品カードも対象にする
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) {
        m.addedNodes.forEach((n) => {
          if (n instanceof HTMLElement) {
            if (n.matches("[data-track-view]")) io.observe(n);
            observeAll(n);
          }
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  // クリック計測（委譲）。遷移は止めない（preventDefault しない）
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      const name = el.dataset.track as TrackEventName | undefined;
      if (!name) return;
      track(name, parseParams(el.dataset.trackParams));
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
