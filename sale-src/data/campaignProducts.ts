import type { CampaignProduct } from "@/types";

/* =========================================================
 * キャンペーンごとの「出し方」設定
 * ---------------------------------------------------------
 * 商品そのもの（products.ts）と、「今回どの商品を強く出すか」を分けています。
 * 同じ商品を、プライムデー／ブラックフライデー／通常期間で使い回せます。
 *
 *   campaignId  : config/saleConfig.ts の campaignId（通常期間は "evergreen"）
 *   productId   : products.ts の id
 *   priority    : 優先度（大きいほど上。100が最優先）
 *   featured    : true で「今日の注目」に表示
 *   section     : 追加で出したいセクション（"today" または sections.ts の id）
 *   campaignComment : カード上の小さなラベル（例：「今回のセールで注目」）
 *   recommendationReasonOverride : このキャンペーンだけおすすめ理由を変えたいとき
 *   hidden      : true でこのキャンペーン中だけ非表示
 *
 * ここに書いていない商品も、products.ts の basePriority 順で各セクションに表示されます。
 * ========================================================= */
export const campaignProducts: CampaignProduct[] = [
  /* ===== 2026年10月 Amazonセール ===== */
  {
    campaignId: "amazon_sale_2026_10",
    productId: "sample_001",
    priority: 100,
    featured: true,
    section: "today",
    campaignComment: "今回のセールで注目",
  },
  {
    campaignId: "amazon_sale_2026_10",
    productId: "sample_011",
    priority: 98,
    featured: true,
    section: "today",
    campaignComment: "まとめ買い向き",
  },
  {
    campaignId: "amazon_sale_2026_10",
    productId: "sample_021",
    priority: 96,
    featured: true,
    section: "today",
    campaignComment: "子育て家庭向け",
  },
  {
    campaignId: "amazon_sale_2026_10",
    productId: "sample_061",
    priority: 94,
    featured: true,
    section: "today",
    campaignComment: "ペットのいる家庭に",
  },
  {
    campaignId: "amazon_sale_2026_10",
    productId: "sample_081",
    priority: 92,
    featured: true,
    section: "today",
    campaignComment: "3,000円前後",
  },
  {
    campaignId: "amazon_sale_2026_10",
    productId: "sample_041",
    priority: 90,
    featured: true,
    section: "today",
    campaignComment: "セール時に見たい家電",
    recommendationReasonOverride:
      "前から気になっていた人は、セール中に機能と価格を比較しておく価値がある家電。毎日の掃除の手間を減らしたい家庭向けです。",
  },
  {
    campaignId: "amazon_sale_2026_10",
    productId: "sample_091",
    priority: 88,
    featured: true,
    section: "today",
    campaignComment: "防災の見直しに",
  },

  /* ===== 通常期間（saleConfig.active=false のとき） ===== */
  { campaignId: "evergreen", productId: "sample_001", priority: 100, featured: true, section: "today" },
  { campaignId: "evergreen", productId: "sample_011", priority: 95, featured: true, section: "today" },
  { campaignId: "evergreen", productId: "sample_021", priority: 90, featured: true, section: "today" },
  { campaignId: "evergreen", productId: "sample_062", priority: 85, featured: true, section: "today" },
  { campaignId: "evergreen", productId: "sample_012", priority: 80, featured: true, section: "today" },
  { campaignId: "evergreen", productId: "sample_091", priority: 75, featured: true, section: "today" },
];
