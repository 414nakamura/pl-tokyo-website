/* =========================================================
 * 型定義：運用者は通常ここを編集する必要はありません
 * ========================================================= */

/** カテゴリID（data/categories.ts の id と一致させる） */
export type CategoryId = string;

/** 生活シーンID（data/sections.ts の id と一致させる） */
export type SceneId = string;

/** 誰向けか（カード上の「こんな人向け」表示に使う） */
export type TargetId =
  | "family"
  | "kids"
  | "single"
  | "couple"
  | "pet-dog"
  | "pet-cat"
  | "remote-work"
  | "daily-use"
  | "bulk"
  | "beauty"
  | "cooking"
  | "emergency"
  | "gadget";

export type PriceSource = "api" | "none";

export interface Product {
  /** 一意のID（英数字とアンダースコア）。一度決めたら変えない（計測データのキーになるため） */
  id: string;
  /** 商品名（カードに表示） */
  name: string;
  /** カテゴリID */
  category: CategoryId;
  /** 生活シーン（複数可）。ここに入れたセクションに自動で表示される */
  scenes: SceneId[];
  /** 誰向けか */
  target: TargetId[];
  /** タグ（カードに最大2つ表示） */
  tags: string[];
  /** 商品の簡単な説明（任意。カードには表示せず、カテゴリページ・構造化データで使用） */
  description?: string;
  /** なぜこれを見るべきか（1〜2文。生活との接点を書く） */
  recommendationReason: string;
  /**
   * 商品画像URL。Amazon画像は Creators API / SiteStripe が返すURLをそのまま使う（保存・加工しない）
   * 空なら自動でカテゴリアイコンのプレースホルダーを表示
   * TODO: Amazon最新規約を確認してから実装
   */
  image?: string;
  imageAlt?: string;
  /**
   * 画像の見せ方：contain（白背景の商品写真向け・余白あり）/ cover（生活写真・バナー向け・枠いっぱい）
   * cover の画像は自作のイメージ画像として扱い、カードに「画像はイメージです」と表示する
   */
  imageFit?: "contain" | "cover";
  /** Amazon商品URL（https://www.amazon.co.jp/dp/ASIN など）。空なら「リンク準備中」表示 */
  amazonUrl?: string;
  /** ASIN（任意。将来の価格自動取得用） */
  asin?: string;

  /* ---- 価格（API取得時のみ表示。手入力しないこと） ---- */
  /** 通常価格。手入力禁止：Creators API 等で自動取得した値のみ */
  price?: number | null;
  /** 現在価格。手入力禁止 */
  currentPrice?: number | null;
  /** 割引率。手入力禁止 */
  discount?: number | null;
  /** 価格の取得元。"api" 以外では価格を一切表示しない */
  priceSource?: PriceSource;
  /** 価格を取得した日時（ISO8601）。価格表示時に「◯時点」として必ず併記 */
  priceFetchedAt?: string | null;

  /* ---- 更新情報 ---- */
  /** 更新日時（ISO8601, 例 "2026-10-17T12:30:00+09:00"） */
  updatedAt?: string | null;
  /** true のときだけカードに「更新：10月17日 12:30」を表示 */
  showUpdatedAt?: boolean;
  /** 追加日（「新しく追加」セクションの並び順に使用） */
  addedAt?: string | null;

  /** キャンペーン設定が無いときの基本優先度（大きいほど上） */
  basePriority?: number;
  /** サンプル商品フラグ。本番公開前に必ず実商品へ差し替える */
  isSample?: boolean;
  /** true でサイト全体から非表示（削除せず一時的に隠す） */
  hidden?: boolean;
}

/** セクションの割り当て先 */
export type CampaignSection = "today" | SceneId;

export interface CampaignProduct {
  /** saleConfig.campaignId と一致させる */
  campaignId: string;
  productId: string;
  /** 優先度（大きいほど上。100 = 最優先） */
  priority: number;
  /** true で「今日の注目」に表示 */
  featured: boolean;
  /** 追加で表示したいセクション（"today" または sections.ts の id） */
  section?: CampaignSection;
  /** キャンペーン用の一言（カードの小さなラベルに表示。例：「今回のセールで注目」） */
  campaignComment?: string;
  /** このキャンペーンだけおすすめ理由を差し替えたいとき */
  recommendationReasonOverride?: string;
  /** true でこのキャンペーン中だけ非表示 */
  hidden?: boolean;
}

export type CategoryIcon =
  | "daily"
  | "food"
  | "baby"
  | "beauty"
  | "electronics"
  | "kitchen"
  | "pet"
  | "fashion"
  | "pc"
  | "emergency"
  | "box"
  | "sparkle";

export interface Category {
  id: CategoryId;
  name: string;
  /** 短い名前（チップ用。省略時は name） */
  shortName?: string;
  /** 1行説明（カードに表示） */
  description: string;
  /** アイコン（components/Icon.tsx の一覧から選ぶ。未知の値はデフォルトアイコン） */
  icon: CategoryIcon | string;
  /** 表示順（小さいほど先） */
  order: number;
  /** カテゴリ画像（public/ からのパス・正方形）。ファイルが無ければアイコン表示 */
  image?: string;
  /**
   * カテゴリ全体のAmazonリンク（常設。通常期間もセール中も使う）
   * 例：Amazonのカテゴリページ https://www.amazon.co.jp/b?node=...&tag=...
   */
  amazonUrl?: string;
  /**
   * セール中だけ使うAmazonリンク（セール会場ページなど）。セール中はこちらを優先
   * セールが終わったらリンク切れになることが多いので、次のセールで差し替える
   */
  saleAmazonUrl?: string;
  /** FV直下のクイックチップに出すか */
  showInQuickChips?: boolean;
  hidden?: boolean;
}

export interface SceneSection {
  id: SceneId;
  /** 見出し（例：「子育て家庭なら」） */
  title: string;
  /** 見出し下の短いリード */
  lead: string;
  /** 初期表示件数（残りは「もっと見る」） */
  initialCount: number;
  /** 最大件数 */
  maxCount?: number;
  /** 表示の大きさ（上位ほど lg） */
  size: "lg" | "md" | "sm";
  /** 見出し画像（public/ からのパス・横長3:2）。ファイルが無ければ画像なしで表示 */
  image?: string;
  imageAlt?: string;
  /** 背景トーン（交互に切り替えてスクロールを止める） */
  tone: "plain" | "warm" | "tint";
  order: number;
  hidden?: boolean;
}

/** 画面表示用に解決済みの商品 */
export interface ResolvedProduct extends Product {
  priority: number;
  featured: boolean;
  campaignComment?: string;
  /** キャンペーン上書き後のおすすめ理由 */
  reason: string;
  /** 遷移用URL（アソシエイトタグ付与済み）。無ければ null */
  outboundUrl: string | null;
  /** カテゴリ名・アイコン（カード表示用に解決済み） */
  categoryName: string;
  categoryIcon: string;
}

export type SiteMode = "sale" | "evergreen";

export interface HeroVariant {
  title: string;
  subtitle: string;
  cta: string;
}
