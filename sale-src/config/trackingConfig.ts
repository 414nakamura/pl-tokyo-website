/* =========================================================
 * 計測設定
 * ========================================================= */
export const trackingConfig = {
  /** GA4 測定ID（企業サイトと同じプロパティ。/sale/ はページパスで絞り込んで分析） */
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID || "G-XCETDXT170",
  /** Microsoft Clarity プロジェクトID（ヒートマップ・セッション録画・デッドクリック分析） */
  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID || "xirbqmt6z7",
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
