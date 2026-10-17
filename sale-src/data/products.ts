import type { Product } from "@/types";

/* =========================================================
 * 商品マスター（キャンペーンに依存しない商品情報）
 * ---------------------------------------------------------
 * ■ 商品を追加する：下のテンプレートをコピーして配列の末尾に貼り付け、中身を書き換える
 * ■ 商品を一時的に隠す：hidden: true
 * ■ 商品を削除する：ブロックごと削除（campaignProducts.ts の同じIDの行も削除）
 *
 * 【テンプレート】
 * {
 *   id: "product_101",                       // 一意のID。後から変えない
 *   name: "商品名",
 *   category: "daily",                       // categories.ts の id
 *   scenes: ["daily-refill", "bulk"],        // sections.ts の id（複数可）
 *   target: ["family", "daily-use"],         // こんな人向け（types/index.ts の TargetId）
 *   tags: ["まとめ買い", "日用品"],           // カードには先頭2つまで表示
 *   description: "商品の簡単な説明",
 *   recommendationReason: "生活との接点を1〜2文で。",
 *   image: "",                               // Creators API / SiteStripe の画像URL。空ならアイコン表示
 *   imageAlt: "",
 *   amazonUrl: "https://www.amazon.co.jp/dp/XXXXXXXXXX",
 *   asin: "XXXXXXXXXX",
 *   updatedAt: "2026-10-17T12:30:00+09:00",
 *   showUpdatedAt: true,                     // カードに更新日時を出すか
 *   addedAt: "2026-10-17",
 *   basePriority: 50,
 * },
 *
 * ⚠ 価格（price / currentPrice / discount）は手入力しないでください。
 *    API取得に対応するまでは空のままで「最新価格はAmazonで確認」と表示されます。
 *
 * ⚠ 以下は全て【サンプル商品】です（isSample: true）。
 *    リンク先はAmazonの検索結果ページです。本番公開前に実商品へ差し替えてください。
 *    `npm run check:data` でサンプルが残っていないか確認できます。
 * ========================================================= */

const search = (keyword: string) => `https://www.amazon.co.jp/s?k=${encodeURIComponent(keyword)}`;

export const products: Product[] = [
  /* ---------- 日用品 ---------- */
  {
    id: "sample_001",
    name: "大容量トイレットペーパー まとめ買い",
    category: "daily",
    scenes: ["daily-refill", "bulk", "emergency"],
    target: ["family", "daily-use", "bulk"],
    tags: ["まとめ買い", "日用品"],
    recommendationReason:
      "毎日使う消耗品なので、ストックが減っている家庭はセール時に確認しておきたい商品です。かさばるので配送で受け取れるのも助かります。",
    image: "/images/products/item-toilet-paper.webp",
    imageAlt: "大容量トイレットペーパーのまとめ買いイメージ",
    imageFit: "cover",
    // セール対象の検索結果ページ（i=pbdd）。セール終了後は通常の検索・商品ページに差し替え
    amazonUrl:
      "https://www.amazon.co.jp/s?k=%E5%A4%A7%E5%AE%B9%E9%87%8F%E3%83%88%E3%82%A4%E3%83%AC%E3%83%83%E3%83%88%E3%83%9A%E3%83%BC%E3%83%91%E3%83%BC&i=pbdd&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=1M8ATDGUTSKNJ&sprefix=%E5%A4%A7%E5%AE%B9%E9%87%8F%E3%83%88%E3%82%A4%E3%83%AC%E3%83%83%E3%83%88%E3%83%9A%E3%83%BC%E3%81%B1%E3%83%BC%2Cpbdd%2C235&linkCode=ll2&tag=punchlinetoky-22&linkId=ae6bd698efa1c20131e8183b30e59950&ref_=as_li_ss_tl",
    updatedAt: "2026-10-17T18:00:00+09:00",
    showUpdatedAt: true,
    addedAt: "2026-10-10",
    basePriority: 90,
  },
  {
    id: "sample_002",
    name: "【サンプル】衣料用洗剤 詰め替え 大容量",
    category: "daily",
    scenes: ["daily-refill", "bulk"],
    target: ["family", "daily-use"],
    tags: ["詰め替え", "大容量"],
    recommendationReason:
      "洗濯の回数が多い家庭ほど減りが早いもの。いつも使っている銘柄の詰め替えがあるか、ついでに確認しておくと買い忘れを防げます。",
    amazonUrl: search("洗濯洗剤 詰め替え 大容量"),
    addedAt: "2026-10-10",
    basePriority: 85,
    isSample: true,
  },
  {
    id: "sample_003",
    name: "【サンプル】ボックスティッシュ 5箱×複数パック",
    category: "daily",
    scenes: ["daily-refill", "bulk", "under-3000"],
    target: ["family", "daily-use", "bulk"],
    tags: ["日用品", "3,000円以下"],
    recommendationReason:
      "花粉や風邪の季節に一気に減るので、残りが少ない家庭は今のうちに補充しておくと安心です。",
    amazonUrl: search("ボックスティッシュ まとめ買い"),
    addedAt: "2026-10-11",
    basePriority: 80,
    isSample: true,
  },
  {
    id: "sample_004",
    name: "【サンプル】食器用洗剤 詰め替え",
    category: "daily",
    scenes: ["daily-refill", "under-3000"],
    target: ["daily-use", "single", "family"],
    tags: ["詰め替え", "3,000円以下"],
    recommendationReason:
      "なくなってから気づきがちな消耗品の代表。詰め替えを1つストックしておくだけで、急な買い出しが減ります。",
    amazonUrl: search("食器用洗剤 詰め替え"),
    addedAt: "2026-10-11",
    basePriority: 70,
    isSample: true,
  },
  {
    id: "sample_005",
    name: "【サンプル】ゴミ袋 45L 大容量",
    category: "daily",
    scenes: ["daily-refill", "bulk", "under-3000"],
    target: ["family", "single", "daily-use"],
    tags: ["日用品", "3,000円以下"],
    recommendationReason:
      "使う量が決まっているので、まとめて買っても無駄になりにくいアイテム。自治体指定がない地域なら確認しておく価値があります。",
    amazonUrl: search("ゴミ袋 45L"),
    addedAt: "2026-10-12",
    basePriority: 60,
    isSample: true,
  },

  /* ---------- 食品・飲料 ---------- */
  {
    id: "sample_011",
    name: "ミネラルウォーター 2L",
    category: "food",
    scenes: ["daily-refill", "bulk", "food-stock", "emergency"],
    target: ["family", "bulk", "emergency"],
    tags: ["まとめ買い", "備蓄"],
    recommendationReason:
      "重くて持ち帰るのが大変な水は、通販向きの代表格。普段飲みと防災用の備蓄を兼ねて、ローリングストックしておくと安心です。",
    image: "/images/products/item-water.webp",
    imageAlt: "2Lミネラルウォーターのまとめ買いイメージ",
    imageFit: "cover",
    // セール対象の検索結果ページ（i=pbdd）。セール終了後は通常の検索・商品ページに差し替え
    amazonUrl:
      "https://www.amazon.co.jp/s?k=%E6%B0%B42L&i=pbdd&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=1QZDGLZ6T0T7L&sprefix=%E6%B0%B42l%2Cpbdd%2C259&linkCode=ll2&tag=punchlinetoky-22&linkId=e2f5a0ed57b0d42d7d8a92d79c2eda9a&ref_=as_li_ss_tl",
    updatedAt: "2026-10-17T18:00:00+09:00",
    showUpdatedAt: true,
    addedAt: "2026-10-10",
    basePriority: 88,
  },
  {
    id: "sample_012",
    name: "【サンプル】ドリップコーヒー 個包装 大容量",
    category: "food",
    scenes: ["daily-refill", "food-stock", "work"],
    target: ["remote-work", "daily-use", "couple"],
    tags: ["コーヒー", "在宅ワーク"],
    recommendationReason:
      "毎日飲む人なら、1杯あたりの単価が気になるもの。いつもの銘柄や好みの焙煎があるか、セール時に見比べておくと良いアイテムです。",
    amazonUrl: search("ドリップコーヒー 大容量"),
    addedAt: "2026-10-12",
    basePriority: 75,
    isSample: true,
  },
  {
    id: "sample_013",
    name: "【サンプル】炭酸水 500ml×ケース",
    category: "food",
    scenes: ["bulk", "food-stock"],
    target: ["single", "couple", "bulk"],
    tags: ["まとめ買い", "飲料"],
    recommendationReason:
      "毎日飲む習慣がある人は、ケースで持っておくと買い物の回数が減らせます。重い飲料は配送が便利です。",
    amazonUrl: search("炭酸水 500ml ケース"),
    addedAt: "2026-10-13",
    basePriority: 65,
    isSample: true,
  },
  {
    id: "sample_014",
    name: "【サンプル】パックごはん まとめ買い",
    category: "food",
    scenes: ["food-stock", "bulk", "emergency"],
    target: ["single", "family", "emergency"],
    tags: ["備蓄", "時短"],
    recommendationReason:
      "忙しい日の食事にも、非常時の備えにも使える食品。賞味期限が長めなので、ストックの入れ替えにも向いています。",
    amazonUrl: search("パックごはん まとめ買い"),
    addedAt: "2026-10-13",
    basePriority: 62,
    isSample: true,
  },
  {
    id: "sample_015",
    name: "【サンプル】お茶 ティーバッグ 大容量",
    category: "food",
    scenes: ["food-stock", "under-3000"],
    target: ["family", "daily-use"],
    tags: ["3,000円以下", "飲料"],
    recommendationReason:
      "麦茶や緑茶を家で作る家庭なら、大容量パックがあると買い足しの手間が減ります。",
    amazonUrl: search("麦茶 ティーバッグ 大容量"),
    addedAt: "2026-10-14",
    basePriority: 50,
    isSample: true,
  },

  /* ---------- ベビー・キッズ ---------- */
  {
    id: "sample_021",
    name: "子ども用 紙おむつ",
    category: "baby",
    scenes: ["family-kids", "bulk", "daily-refill"],
    target: ["kids", "family", "bulk"],
    tags: ["子育て", "まとめ買い"],
    recommendationReason:
      "子育て中は消費量が多く、サイズアウトのタイミングも気になるもの。今のサイズと次のサイズの在庫を、セールのついでに確認しておくと安心です。",
    image: "/images/products/item-diaper.webp",
    imageAlt: "紙おむつのまとめ買いイメージ",
    imageFit: "cover",
    // セール対象の検索結果ページ（i=pbdd）。セール終了後は通常の検索・商品ページに差し替え
    amazonUrl:
      "https://www.amazon.co.jp/s?k=%E3%81%8A%E3%82%80%E3%81%A4+%E5%AD%90%E4%BE%9B&i=pbdd&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=1LOKDTCHETYPV&sprefix=%E3%81%8A%E3%82%80%E3%81%A4+%E3%81%93%E3%81%A9%E3%82%82%2Cpbdd%2C278&linkCode=ll2&tag=punchlinetoky-22&linkId=23fb1204f79766e5d4e1613730c9611f&ref_=as_li_ss_tl",
    updatedAt: "2026-10-17T18:00:00+09:00",
    showUpdatedAt: true,
    addedAt: "2026-10-10",
    basePriority: 87,
  },
  {
    id: "sample_022",
    name: "【サンプル】おしりふき 詰め替え まとめ買い",
    category: "baby",
    scenes: ["family-kids", "bulk", "under-3000"],
    target: ["kids", "family"],
    tags: ["子育て", "3,000円以下"],
    recommendationReason:
      "おしり以外にも手や口まわり、テーブル拭きにも使うので、想像以上に早く減るアイテムです。",
    amazonUrl: search("おしりふき 詰め替え"),
    addedAt: "2026-10-11",
    basePriority: 78,
    isSample: true,
  },
  {
    id: "sample_023",
    name: "【サンプル】子ども用 歯ブラシ・仕上げみがきセット",
    category: "baby",
    scenes: ["family-kids", "under-3000"],
    target: ["kids", "family"],
    tags: ["子育て", "3,000円以下"],
    recommendationReason:
      "毛先が開いたら交換したい消耗品。家族分をまとめて買い替えるきっかけにちょうど良いものです。",
    amazonUrl: search("子ども 歯ブラシ"),
    addedAt: "2026-10-14",
    basePriority: 55,
    isSample: true,
  },
  {
    id: "sample_024",
    name: "【サンプル】除菌ウェットティッシュ 携帯用",
    category: "baby",
    scenes: ["family-kids", "under-3000", "emergency"],
    target: ["kids", "family", "emergency"],
    tags: ["衛生用品", "3,000円以下"],
    recommendationReason:
      "外出先・車内・防災バッグにも入れておきたい衛生用品。複数パックあると置き場所ごとに分けられて便利です。",
    amazonUrl: search("除菌 ウェットティッシュ 携帯"),
    addedAt: "2026-10-15",
    basePriority: 52,
    isSample: true,
  },

  /* ---------- 美容・ヘルスケア ---------- */
  {
    id: "sample_031",
    name: "【サンプル】シャンプー・コンディショナー 詰め替え",
    category: "beauty",
    scenes: ["daily-refill", "bulk"],
    target: ["daily-use", "family", "beauty"],
    tags: ["詰め替え", "日用品"],
    recommendationReason:
      "家族で使うと減りが早いので、いつものものを詰め替えで持っておくと安心です。",
    amazonUrl: search("シャンプー 詰め替え"),
    addedAt: "2026-10-12",
    basePriority: 58,
    isSample: true,
  },
  {
    id: "sample_032",
    name: "【サンプル】歯みがき粉・デンタルフロス セット",
    category: "beauty",
    scenes: ["daily-refill", "under-3000"],
    target: ["daily-use", "family"],
    tags: ["オーラルケア", "3,000円以下"],
    recommendationReason: "毎日必ず使うのに、買い忘れやすいもの。ついでに補充しておきたい定番です。",
    amazonUrl: search("歯みがき粉 フロス"),
    addedAt: "2026-10-14",
    basePriority: 48,
    isSample: true,
  },
  {
    id: "sample_033",
    name: "【サンプル】保湿ボディクリーム 大容量",
    category: "beauty",
    scenes: ["under-3000"],
    target: ["beauty", "family"],
    tags: ["乾燥対策", "3,000円以下"],
    recommendationReason:
      "これから乾燥する季節に、家族で使える大容量タイプがあると便利。今の残量を確認するきっかけに。",
    amazonUrl: search("ボディクリーム 大容量"),
    addedAt: "2026-10-16",
    basePriority: 45,
    isSample: true,
  },

  /* ---------- 家電 ---------- */
  {
    id: "sample_041",
    name: "ロボット掃除機",
    category: "electronics",
    scenes: ["big-ticket"],
    target: ["family", "remote-work", "couple"],
    tags: ["時短家電", "高単価"],
    recommendationReason:
      "前から気になっていた人は、セール時に機能と価格を比較しておく価値がある家電。毎日の掃除の手間を減らしたい家庭向けです。",
    image: "/images/products/item-robot-vacuum.webp",
    imageAlt: "リビングを掃除するロボット掃除機と充電ステーションのイメージ",
    imageFit: "cover",
    // セール対象の検索結果ページ（i=pbdd）。セール終了後は通常の検索・商品ページに差し替え
    amazonUrl:
      "https://www.amazon.co.jp/s?k=%E3%83%AD%E3%83%9C%E3%83%83%E3%83%88%E6%8E%83%E9%99%A4%E6%A9%9F&i=pbdd&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=2DORXRR57W3V3&sprefix=%E3%82%8D%E3%81%BC%E3%81%A3%E3%81%A8%E3%81%9D%E3%81%86%E3%81%98%E3%81%8D%2Cpbdd%2C225&linkCode=ll2&tag=punchlinetoky-22&linkId=335a7411d141c0bea0532503aa375b50&ref_=as_li_ss_tl",
    updatedAt: "2026-10-17T18:00:00+09:00",
    showUpdatedAt: true,
    addedAt: "2026-10-15",
    basePriority: 72,
  },
  {
    id: "sample_042",
    name: "【サンプル】電気ケトル",
    category: "electronics",
    scenes: ["work"],
    target: ["single", "remote-work", "couple"],
    tags: ["キッチン家電", "在宅ワーク"],
    recommendationReason:
      "コーヒーやお茶を1日に何度も淹れる人なら、毎日の小さな待ち時間が減ります。古くなっていたら買い替え候補に。",
    amazonUrl: search("電気ケトル"),
    addedAt: "2026-10-13",
    basePriority: 56,
    isSample: true,
  },
  {
    id: "sample_043",
    name: "【サンプル】布団乾燥機",
    category: "electronics",
    scenes: ["big-ticket", "family-kids"],
    target: ["family", "kids"],
    tags: ["季節家電", "高単価"],
    recommendationReason:
      "寒くなる前に検討したい季節家電。外に布団を干しにくい家庭や、子どもの寝具を清潔に保ちたい家庭向けです。",
    amazonUrl: search("布団乾燥機"),
    addedAt: "2026-10-16",
    basePriority: 54,
    isSample: true,
  },
  {
    id: "sample_044",
    name: "【サンプル】加湿器",
    category: "electronics",
    scenes: ["big-ticket"],
    target: ["family", "remote-work"],
    tags: ["季節家電", "乾燥対策"],
    recommendationReason:
      "乾燥する季節の前に準備しておきたい家電。使っているものが古い場合は、お手入れのしやすさで比較するのがおすすめです。",
    amazonUrl: search("加湿器"),
    addedAt: "2026-10-16",
    basePriority: 53,
    isSample: true,
  },

  /* ---------- キッチン ---------- */
  {
    id: "sample_051",
    name: "【サンプル】保存容器セット（電子レンジ対応）",
    category: "kitchen",
    scenes: ["under-3000", "food-stock"],
    target: ["cooking", "family", "single"],
    tags: ["作り置き", "3,000円以下"],
    recommendationReason:
      "作り置きや残り物の保存に。フタが割れた・数が足りないなど、地味に困っていた家庭は買い替えのきっかけに。",
    amazonUrl: search("保存容器 セット レンジ対応"),
    addedAt: "2026-10-14",
    basePriority: 47,
    isSample: true,
  },
  {
    id: "sample_052",
    name: "【サンプル】キッチンペーパー まとめ買い",
    category: "kitchen",
    scenes: ["daily-refill", "bulk"],
    target: ["cooking", "daily-use", "family"],
    tags: ["まとめ買い", "日用品"],
    recommendationReason: "料理をする家庭なら毎日使う消耗品。トイレットペーパーと一緒に在庫を確認しておくと安心です。",
    amazonUrl: search("キッチンペーパー まとめ買い"),
    addedAt: "2026-10-12",
    basePriority: 57,
    isSample: true,
  },

  /* ---------- ペット ---------- */
  {
    id: "sample_061",
    name: "ドッグフード",
    category: "pet",
    scenes: ["pet", "bulk"],
    target: ["pet-dog"],
    tags: ["犬", "まとめ買い"],
    recommendationReason:
      "ペットフードは定期的に購入するため、次回購入予定が近い場合は価格を確認しておく価値があります。いつもの銘柄・同じ種類かを必ず確認してください。",
    image: "/images/products/item-dog-food.webp",
    imageAlt: "ドッグフードと犬のイメージ",
    imageFit: "cover",
    // セール対象の検索結果ページ（i=pbdd）。セール終了後は通常の検索・商品ページに差し替え
    amazonUrl:
      "https://www.amazon.co.jp/s?k=%E3%83%89%E3%83%83%E3%82%B0%E3%83%95%E3%83%BC%E3%83%89&i=pbdd&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=1N06XL5H04L2R&sprefix=%E3%81%A9%E3%81%A3%E3%81%90%E3%81%B5%E3%83%BC%E3%81%A9%2Cpbdd%2C258&linkCode=ll2&tag=punchlinetoky-22&linkId=27808b6f9c3f9aa29db96162c2dc6664&ref_=as_li_ss_tl",
    updatedAt: "2026-10-17T18:00:00+09:00",
    showUpdatedAt: true,
    addedAt: "2026-10-10",
    basePriority: 82,
  },
  {
    id: "sample_062",
    name: "【サンプル】キャットフード ドライ まとめ買い",
    category: "pet",
    scenes: ["pet", "bulk"],
    target: ["pet-cat"],
    tags: ["猫", "まとめ買い"],
    recommendationReason:
      "猫は食べ慣れたフードを好むことが多いので、いつものものをまとめて確保しておくと安心です。",
    amazonUrl: search("キャットフード ドライ"),
    addedAt: "2026-10-10",
    basePriority: 81,
    isSample: true,
  },
  {
    id: "sample_063",
    name: "【サンプル】猫砂 まとめ買い",
    category: "pet",
    scenes: ["pet", "bulk", "daily-refill"],
    target: ["pet-cat", "bulk"],
    tags: ["猫", "トイレ用品"],
    recommendationReason: "重くてかさばる猫砂は、配送で受け取れるとかなりラク。残りが少なければ確認しておきたいものです。",
    amazonUrl: search("猫砂 まとめ買い"),
    addedAt: "2026-10-11",
    basePriority: 74,
    isSample: true,
  },
  {
    id: "sample_064",
    name: "【サンプル】ペットシーツ レギュラー 大容量",
    category: "pet",
    scenes: ["pet", "bulk"],
    target: ["pet-dog", "bulk"],
    tags: ["犬", "トイレ用品"],
    recommendationReason: "毎日交換する消耗品なので、ストックが切れる前にまとめて補充しておくと安心です。",
    amazonUrl: search("ペットシーツ レギュラー"),
    addedAt: "2026-10-12",
    basePriority: 68,
    isSample: true,
  },

  /* ---------- ファッション ---------- */
  {
    id: "sample_071",
    name: "【サンプル】靴下 まとめ買いセット",
    category: "fashion",
    scenes: ["under-3000"],
    target: ["family", "single"],
    tags: ["定番", "3,000円以下"],
    recommendationReason: "穴が空いた・数が減ったと気づいた人は、まとめて入れ替えると選ぶ手間が減ります。",
    amazonUrl: search("靴下 まとめ買い"),
    addedAt: "2026-10-15",
    basePriority: 40,
    isSample: true,
  },
  {
    id: "sample_072",
    name: "【サンプル】あったか肌着（インナー）",
    category: "fashion",
    scenes: ["under-3000"],
    target: ["family", "single"],
    tags: ["季節もの", "3,000円以下"],
    recommendationReason: "寒くなる前に、去年のものがヘタっていないか確認しておきたい季節の定番です。",
    amazonUrl: search("あったか インナー"),
    addedAt: "2026-10-16",
    basePriority: 42,
    isSample: true,
  },

  /* ---------- 仕事・PC周辺 ---------- */
  {
    id: "sample_081",
    name: "USB-C 急速充電器",
    category: "pc",
    scenes: ["work", "under-3000"],
    target: ["remote-work", "gadget", "single"],
    tags: ["在宅ワーク", "ガジェット"],
    recommendationReason:
      "スマホ・PC・イヤホンを1つでまとめて充電できると、コンセントまわりがすっきり。充電器が足りない家庭にも。",
    image: "/images/products/item-usb-c.webp",
    imageAlt: "USB-C急速充電のイメージ",
    imageFit: "cover",
    // セール対象の検索結果ページ（i=pbdd）。セール終了後は通常の検索・商品ページに差し替え
    amazonUrl:
      "https://www.amazon.co.jp/s?k=usb-c+%E6%80%A5%E9%80%9F%E5%85%85%E9%9B%BB&i=pbdd&crid=1QOVHUHIBWDH&sprefix=USB-C+%E6%80%A5%E9%80%9F%2Cpbdd%2C255&linkCode=ll2&tag=punchlinetoky-22&linkId=35227c54cfc17279f5a518e4ca73da1b&ref_=as_li_ss_tl",
    updatedAt: "2026-10-17T18:00:00+09:00",
    showUpdatedAt: true,
    addedAt: "2026-10-15",
    basePriority: 76,
  },
  {
    id: "sample_082",
    name: "【サンプル】USB-C ケーブル 2本セット",
    category: "pc",
    scenes: ["work", "under-3000"],
    target: ["remote-work", "gadget", "family"],
    tags: ["ガジェット", "3,000円以下"],
    recommendationReason: "断線しかけているケーブルがあれば、ついでに交換しておきたい消耗品。予備があると家族で取り合いになりません。",
    amazonUrl: search("USB-C ケーブル"),
    addedAt: "2026-10-15",
    basePriority: 60,
    isSample: true,
  },
  {
    id: "sample_083",
    name: "【サンプル】ノートPCスタンド",
    category: "pc",
    scenes: ["work"],
    target: ["remote-work"],
    tags: ["在宅ワーク", "デスク用品"],
    recommendationReason: "画面の高さを上げるだけで姿勢がラクに。在宅勤務で肩や首が気になっている人向けです。",
    amazonUrl: search("ノートパソコン スタンド"),
    addedAt: "2026-10-16",
    basePriority: 58,
    isSample: true,
  },
  {
    id: "sample_084",
    name: "【サンプル】ワイヤレスマウス",
    category: "pc",
    scenes: ["work", "under-3000"],
    target: ["remote-work", "gadget"],
    tags: ["在宅ワーク", "3,000円以下"],
    recommendationReason: "クリックの反応が悪くなってきたら替えどき。仕事用と家用で分けておくのもおすすめです。",
    amazonUrl: search("ワイヤレスマウス"),
    addedAt: "2026-10-16",
    basePriority: 50,
    isSample: true,
  },
  {
    id: "sample_085",
    name: "【サンプル】ノイズキャンセリングイヤホン",
    category: "pc",
    scenes: ["work", "big-ticket"],
    target: ["remote-work", "gadget", "single"],
    tags: ["ガジェット", "高単価"],
    recommendationReason: "在宅勤務の集中やオンライン会議に。気になっていた人は、セール時に機能と価格を比較しておきたいアイテムです。",
    amazonUrl: search("ノイズキャンセリング イヤホン"),
    addedAt: "2026-10-16",
    basePriority: 66,
    isSample: true,
  },

  /* ---------- 防災・備蓄 ---------- */
  {
    id: "sample_091",
    name: "【サンプル】モバイルバッテリー 大容量",
    category: "emergency",
    scenes: ["emergency", "work"],
    target: ["emergency", "gadget", "family"],
    tags: ["防災", "ガジェット"],
    recommendationReason:
      "停電時のスマホ充電に欠かせない備え。普段使いもできるので、防災用品の中でも最初に見直したいものです。",
    amazonUrl: search("モバイルバッテリー 大容量"),
    addedAt: "2026-10-12",
    basePriority: 70,
    isSample: true,
  },
  {
    id: "sample_092",
    name: "【サンプル】長期保存 非常食セット",
    category: "emergency",
    scenes: ["emergency", "food-stock"],
    target: ["emergency", "family"],
    tags: ["防災", "備蓄"],
    recommendationReason: "備蓄している非常食の賞味期限を確認するきっかけに。家族の人数×3日分が目安です。",
    amazonUrl: search("非常食 セット 長期保存"),
    addedAt: "2026-10-13",
    basePriority: 64,
    isSample: true,
  },
  {
    id: "sample_093",
    name: "【サンプル】LEDランタン",
    category: "emergency",
    scenes: ["emergency", "under-3000"],
    target: ["emergency", "family"],
    tags: ["防災", "3,000円以下"],
    recommendationReason: "停電時に部屋全体を照らせる明かりがあると安心。電池の残量チェックもあわせてどうぞ。",
    amazonUrl: search("LEDランタン 防災"),
    addedAt: "2026-10-14",
    basePriority: 55,
    isSample: true,
  },
  {
    id: "sample_094",
    name: "【サンプル】ポータブル電源",
    category: "emergency",
    scenes: ["emergency", "big-ticket"],
    target: ["emergency", "family", "gadget"],
    tags: ["防災", "高単価"],
    recommendationReason:
      "停電やアウトドアに備えたい家庭向けの高単価アイテム。容量と重さのバランスを、セール時にじっくり比較する価値があります。",
    amazonUrl: search("ポータブル電源"),
    addedAt: "2026-10-16",
    basePriority: 63,
    isSample: true,
  },
];
