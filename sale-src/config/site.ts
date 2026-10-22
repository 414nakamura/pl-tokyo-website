/* =========================================================
 * サイト共通設定（名称・URL・運営会社・開示文）
 * ========================================================= */
export const siteConfig = {
  /** サイト名（Amazon公式と誤認されない独自名称。いつでも変更可） */
  siteName: "買い忘れCHECK",
  /** サイト名の横に出す小さな説明 */
  /**
   * サイト名の横に出す一言（PC・幅の広いスマホで表示）
   * ※ Amazonの商標はサイト名・ロゴ周りに入れない（アソシエイト規約）。本文での「Amazonセール」表記は可
   * 候補：「ジャンル別 セール買い物ノート」「セールの前に、買い物メモ。」「暮らしの買い足し、セールでまとめて。」
   */
  siteTagline: "ジャンル別 セール買い物ノート",
  /** 本番ドメイン（末尾スラッシュなし） */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://pl-tokyo.com",
  /** 公開ディレクトリ（next.config.ts の basePath と一致） */
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "/sale",
  locale: "ja_JP",
  /** ステージング等で true（noindex） */
  noindex: process.env.NEXT_PUBLIC_NOINDEX === "true",
  /**
   * グローバルナビ・ジャンルボタンのリンク先
   *   "amazon"   : categories.ts の Amazonリンク（セール中はセール会場）へ直接
   *   "category" : サイト内のカテゴリページ（/sale/category/{id}/）
   */
  genreNavTarget: "amazon" as "amazon" | "category",
  /**
   * グローバルナビ・ハンバーガーメニューの最後に追加するリンク
   * saleOnly: true はセール期間中だけ表示（セール会場ページはセール終了で使えなくなるため）
   * アソシエイトID（tag）が無いURLには自動で kaiwasure-check-22（買い忘れCHECK専用ID）が付く
   */
  navExtraLinks: [
    {
      id: "sale-top",
      label: "その他",
      fullLabel: "その他",
      note: "Amazonセールトップ",
      icon: "sparkle",
      url: "https://www.amazon.co.jp/primeappreciation?ref_=nav_cs_td_pbdd_dt_cr",
      saleOnly: true,
    },
  ],
  /** Amazonリンクを新しいタブで開くか（開く場合はボタンにその旨を表示） */
  amazonOpensInNewTab: true,
  /** Amazonアソシエイト トラッキングID（環境変数で設定） */
  amazonAssociateTag: process.env.NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG || "kaiwasure-check-22",
};

/** 運営会社情報（/sale/company/ に表示）。TODO: 正式情報に差し替え */
export const companyConfig = {
  name: "株式会社PUNCHLINE TOKYO",
  nameEn: "PUNCHLINE TOKYO Inc.",
  // 空欄の項目は運営会社ページに表示されません
  representative: "",
  address: "〒107-0061 東京都港区北青山3-3-1 アールキューブ青山3階",
  contactEmail: "",
  /** お問い合わせ先（文字で表示。企業サイトへの回遊導線にしないためリンクにはしない） */
  contactNote: "お問い合わせフォーム（pl-tokyo.com/contact/）よりご連絡ください。",
  business: [
    "Webサイト制作",
    "デジタルマーケティング・インターネット広告",
    "キャッシュレス決済導入支援",
    "営業支援・コンサルティング",
  ],
  mediaDescription:
    "買い忘れCHECKは、株式会社PUNCHLINE TOKYOが運営する買い物支援メディアです。セールをきっかけに、生活の中で必要なものを思い出してもらうことを目的に、商品を生活シーン別に紹介しています。",
};

/**
 * アフィリエイト開示文
 * TODO: Amazon最新規約を確認してから実装（アソシエイト・プログラム運営規約の開示文言を公開前に再確認）
 */
export const disclosure = {
  /** ページ上部に出す短いPR表記（景品表示法のステルスマーケティング規制対応） */
  prLabel: "PR",
  prText: "本サイトはアフィリエイト広告（Amazonアソシエイト）を利用しています。",
  /** Amazonアソシエイトの必須開示文 */
  amazonAssociate: `Amazonのアソシエイトとして、${"株式会社PUNCHLINE TOKYO"}は適格販売により収入を得ています。`,
  notOfficial:
    "当サイトはAmazon.co.jpの公式サイトではありません。Amazon、Amazon.co.jpおよびそれらのロゴはAmazon.com, Inc.またはその関連会社の商標です。",
  price:
    "商品の価格・在庫・セール対象かどうかは変動します。最新の情報は必ずAmazonの商品ページでご確認ください。",
};

/** 横スクロールの商品一覧の案内 */
export const carouselLabels = {
  scroll: "SCROLL",
  next: "次の商品へ横スクロール",
  instructions: "左右にスワイプ、または横スクロールして商品をご覧ください。SCROLLボタンでも次の商品へ進めます。",
};
