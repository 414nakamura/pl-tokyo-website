/* =========================================================
 * 計測設定
 * ========================================================= */
export const trackingConfig = {
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID ?? "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "",
  /** true でコンソールにイベントを表示 */
  debug: process.env.NEXT_PUBLIC_DEBUG_TRACKING === "true",
  /** 取得するURLパラメータ（分析専用。表示やリンクの分岐には使わない） */
  attributionParams: ["utm_source", "utm_medium", "utm_campaign", "utm_content", "creative_id"] as const,
  /** スクロール深度（%） */
  scrollThresholds: [25, 50, 75] as const,
  /** 商品カードが何割見えたら product_view とするか */
  productViewThreshold: 0.5,
  /** Meta Pixel に送るイベント（キーはサイト内のイベント名） */
  metaEventMap: {
    page_view: { standard: "PageView" },
    amazon_click: { custom: "AmazonClick" },
    category_click: { custom: "CategoryClick" },
    hero_cta_click: { custom: "HeroCtaClick" },
    product_view: { custom: "ProductView" },
  } as Record<string, { standard?: string; custom?: string }>,
};

export type TrackEventName =
  | "page_view"
  | "scroll_25"
  | "scroll_50"
  | "scroll_75"
  | "hero_cta_click"
  | "category_click"
  | "product_view"
  | "amazon_click";
