import type { HeroVariant } from "@/types";

/* =========================================================
 * セール設定 —— セールが変わったら、基本的にこのファイルだけ変更
 * ---------------------------------------------------------
 * ・日付は "YYYY-MM-DD" 形式（日本時間）。空欄なら期間チェックなし
 * ・active が false、または期間外のときは自動で「通常モード」になる
 * ・静的サイトのため、期間による切替は「ビルドした時点」で判定されます
 *   → セール開始・終了のタイミングで再ビルド（README「セール切替方法」参照）
 * ========================================================= */
export const saleConfig = {
  /** 正式なセール名（Heroのピル・title に使用） */
  saleName: "Amazonセール",
  /** 短い名前 */
  saleShortName: "Amazonセール",
  /** 開始日・終了日（例 "2026-10-17"） */
  startDate: "",
  endDate: "",
  /** Heroコピー */
  heroTitle: "買いたかったもの、忘れてない？",
  heroSubtitle: "Amazonセールで、今チェックしておきたいものをまとめました。",
  /** FVのボタン文言（サイト内の商品へスクロールします。Amazonには飛びません） */
  mainCTA: "今チェックしたいものを見る",
  /** キャンペーンID（campaignProducts.ts と計測の campaign_id に使用） */
  campaignId: "amazon_sale_2026_10",
  /** セール中なら true。false で通常モード */
  active: true,
  /** 将来のテーマ切替用（現在は "default" のみ） */
  themeType: "default" as "default",
  /** FVの写真（public/ からのパス・横長3:2）。セールごとに差し替え可。無ければ写真なしで表示 */
  heroImage: "/images/hero/hero.webp",
  heroImageAlt: "玄関に届いた段ボールと、日用品のストック",
  /**
   * FVの写真を押したときのAmazonリンク（空欄なら写真はリンクにしない）
   * 写真の下に「Amazonで◯◯を見る」と表示し、押すとAmazonへ移動することが分かるようにしている
   */
  heroImageLink:
    "https://www.amazon.co.jp?&linkCode=ll2&tag=punchlinetoky-22&linkId=9ab0768de5094257077d5799700e4dac&ref_=as_li_ss_tl",
  heroImageLinkLabel: "Amazonで商品を探す",
  /**
   * セール用の写真（横長・文字なし）。設定してファイルがあればHero写真として使用。コピーとボタンはHTMLで表示
   * スマホ用の軽い版（同名 + "-800"）も npm run images で自動作成される
   * ⚠ Amazonのロゴ・primeロゴ・スマイルマーク、実在ブランドのロゴやパッケージが入った画像は使わない（アソシエイト規約）
   */
  heroBanner: {
    image: "/images/hero/hero-shopping-v2.webp",
    alt: "自然光の入る部屋に置いた、日用品と食品のストック",
    link: "https://www.amazon.co.jp?&linkCode=ll2&tag=punchlinetoky-22&linkId=9ab0768de5094257077d5799700e4dac&ref_=as_li_ss_tl",
  },
  /** SNS共有画像（public/og/ に置いたファイル名）。セールごとに差し替え可 */
  ogImage: "/og/shopping-guide-v2.png",
  /** ページの説明文（検索結果・SNS共有に表示） */
  metaDescription:
    "日用品・食品・ベビー用品・家電など、Amazonセールで今チェックしておきたいものを生活シーン別にまとめた買い物ガイドです。",
};

/* =========================================================
 * 通常モード（セール期間外）の設定
 * サイトは閉じずに「常設の買い物メディア」として動き続けます
 * ========================================================= */
export const evergreenConfig = {
  heroTitle: "買い忘れているもの、ありませんか？",
  heroSubtitle: "次のAmazonセールまでに、買うものをチェック。日用品・食品・家電などをまとめています。",
  mainCTA: "チェックしたいものを見る",
  /** 通常期間用のキャンペーンID（campaignProducts.ts で使用） */
  campaignId: "evergreen",
  heroImage: "/images/hero/hero.webp",
  heroImageAlt: "玄関に届いた段ボールと、日用品のストック",
  ogImage: "/og/default.png",
};

/* =========================================================
 * A/Bテスト（MVP：configで切り替えるだけ）
 * ========================================================= */
export const heroVariants: Record<string, HeroVariant> = {
  A: {
    title: "Amazonセール、何買う？",
    subtitle: "日用品・食品・家電など、今チェックしておきたいものをまとめています。",
    cta: "今チェックしたいものを見る",
  },
  B: {
    title: "買うもの、忘れてない？",
    subtitle: "Amazonセールで、今チェックしておきたいものをまとめました。",
    cta: "今チェックしたいものを見る",
  },
  C: {
    title: "今チェックしておきたいAmazonセール商品",
    subtitle: "毎日使うもの・まとめ買い・家電まで、生活シーン別にまとめました。",
    cta: "商品を見る",
  },
  D: {
    title: "そういえば、買おうと思っていたものありませんか？",
    subtitle: "Amazonセールのついでに、買い忘れをチェック。",
    cta: "買い忘れをチェックする",
  },
};

export const experiments = {
  /**
   * Heroのバリアント。null なら saleConfig.heroTitle / heroSubtitle / mainCTA をそのまま使用
   * "A"〜"D" を指定すると heroVariants の文言に切り替わる（セール中のみ）
   * 計測イベントには hero_variant として記録される
   */
  heroVariant: null as string | null,
  /** 商品カードのボタン文言（"Amazonで確認する" / "価格・詳細を見る"） */
  amazonCtaLabel: "Amazonで確認する",
  /** 「今日の注目」の並び順：priority（優先度順） / updated（更新が新しい順） */
  todayOrder: "priority" as "priority" | "updated",
  /** 「今日の注目」の表示件数（4〜8推奨） */
  todayCount: 6,
  /** カテゴリの並び順をIDで指定（空配列なら categories.ts の order 順） */
  categoryOrder: [] as string[],
  /** 生活シーンセクションの並び順をIDで指定（空配列なら sections.ts の order 順） */
  sectionOrder: [] as string[],
};
