import type { Category } from "@/types";

/* =========================================================
 * カテゴリ
 * ---------------------------------------------------------
 * 追加するときは、下の配列に1ブロック追加するだけ。
 *   id         : 英小文字（URL /sale/category/{id}/ になる）
 *   icon       : daily / food / baby / beauty / electronics / kitchen /
 *                pet / fashion / pc / emergency / box / sparkle から選ぶ
 *   order      : 並び順（小さいほど先）
 *   image      : 正方形の画像（public/images/categories/）。無ければアイコン表示
 *   amazonUrl  : カテゴリ全体のAmazonリンク（常設。アソシエイトのリンク作成ツールで作ったURL）
 *   saleAmazonUrl : セール中だけ使うリンク（セール会場ページ）。セール中はこちらが優先
 * ========================================================= */
export const categories: Category[] = [
  {
    id: "daily",
    // プライム感謝祭のセール会場ページ（セール終了後は次のセールのURLに差し替え）
    saleAmazonUrl: "https://www.amazon.co.jp/primeappreciation/3?_encoding=UTF8&pd_rd_w=4l5z8&content-id=amzn1.sym.7f0a6c74-a826-4bd4-b2da-40166d7b85f5&pf_rd_p=7f0a6c74-a826-4bd4-b2da-40166d7b85f5&pf_rd_r=8FQPF183RFAF4XHX6QP8&pd_rd_wg=SLvvb&pd_rd_r=449fd6af-1c07-4d74-a9ec-fb27f5497184&linkCode=ll2&tag=punchlinetoky-22&linkId=0bab3670feddb31cc599075e18e7e3d2&ref_=as_li_ss_tl",
    image: "/images/categories/cat-daily.webp",
    name: "日用品",
    description: "洗剤・ティッシュなど、毎日使うものをチェック。",
    icon: "daily",
    order: 10,
    showInQuickChips: true,
  },
  {
    id: "food",
    // プライム感謝祭のセール会場ページ（セール終了後は次のセールのURLに差し替え）
    saleAmazonUrl: "https://www.amazon.co.jp/primeappreciation/4?_encoding=UTF8&pd_rd_w=4l5z8&content-id=amzn1.sym.7f0a6c74-a826-4bd4-b2da-40166d7b85f5&pf_rd_p=7f0a6c74-a826-4bd4-b2da-40166d7b85f5&pf_rd_r=8FQPF183RFAF4XHX6QP8&pd_rd_wg=SLvvb&pd_rd_r=449fd6af-1c07-4d74-a9ec-fb27f5497184&linkCode=ll2&tag=punchlinetoky-22&linkId=54810a7acedafb451280057875cedb60&ref_=as_li_ss_tl",
    image: "/images/categories/cat-food.webp",
    name: "食品・飲料",
    shortName: "食品",
    description: "水・コーヒー・食品ストックなど、まとめ買い候補をチェック。",
    icon: "food",
    order: 20,
    showInQuickChips: true,
  },
  {
    id: "baby",
    amazonUrl: "https://www.amazon.co.jp/b?node=344845011&linkCode=ll2&tag=punchlinetoky-22&linkId=590fc1d0302cbc8e8e0a9f6005a7a916&ref_=as_li_ss_tl",
    image: "/images/categories/cat-baby.webp",
    name: "ベビー・キッズ",
    shortName: "ベビー",
    description: "おむつ・おしりふきなど、減りが早いものを確認。",
    icon: "baby",
    order: 30,
    showInQuickChips: true,
  },
  {
    id: "beauty",
    amazonUrl: "https://www.amazon.co.jp/b?node=52374051&linkCode=ll2&tag=punchlinetoky-22&linkId=7a66464170813ad166437a033ba90bcb&ref_=as_li_ss_tl",
    image: "/images/categories/cat-beauty.webp",
    name: "美容・ヘルスケア",
    shortName: "美容",
    description: "スキンケア・オーラルケアなど、いつもの消耗品に。",
    icon: "beauty",
    order: 40,
  },
  {
    id: "electronics",
    amazonUrl: "https://www.amazon.co.jp/%E7%94%9F%E6%B4%BB%E5%AE%B6%E9%9B%BB/b?ie=UTF8&node=124048011&linkCode=ll2&tag=punchlinetoky-22&linkId=5d42fca60630bd57b69bd51f81d266fe&ref_=as_li_ss_tl",
    image: "/images/categories/cat-electronics.webp",
    name: "家電",
    description: "買い替えを考えていた家電を、この機会に比較。",
    icon: "electronics",
    order: 50,
    showInQuickChips: true,
  },
  {
    id: "kitchen",
    amazonUrl: "https://www.amazon.co.jp/b?node=3828871&linkCode=ll2&tag=punchlinetoky-22&linkId=37bf11e76e1f05cd1cbfc3fb8547ef8a&ref_=as_li_ss_tl",
    image: "/images/categories/cat-kitchen.webp",
    name: "キッチン",
    description: "保存容器・調理道具など、地味に困っていたものを。",
    icon: "kitchen",
    order: 60,
  },
  {
    id: "pet",
    amazonUrl: "https://www.amazon.co.jp/b?node=2127212051&linkCode=ll2&tag=punchlinetoky-22&linkId=5b2ace0f3857eb790e410cda98dc8537&ref_=as_li_ss_tl",
    image: "/images/categories/cat-pet.webp",
    name: "ペット",
    description: "フード・トイレ用品など、定期的に買うものを確認。",
    icon: "pet",
    order: 70,
    showInQuickChips: true,
  },
  {
    id: "fashion",
    amazonUrl: "https://www.amazon.co.jp/b?node=2229202051&linkCode=ll2&tag=punchlinetoky-22&linkId=de40c91feb4f580e72686ae128e22838&ref_=as_li_ss_tl",
    image: "/images/categories/cat-fashion.webp",
    name: "ファッション",
    description: "肌着・靴下など、消耗する定番アイテムの補充に。",
    icon: "fashion",
    order: 80,
  },
  {
    id: "pc",
    amazonUrl: "https://www.amazon.co.jp/b?node=2127209051&linkCode=ll2&tag=punchlinetoky-22&linkId=6418e1bda4615db8b157ac2fc440bd59&ref_=as_li_ss_tl",
    image: "/images/categories/cat-pc.webp",
    name: "仕事・PC周辺",
    shortName: "PC周辺",
    description: "充電器・ケーブル・デスク用品で作業環境を整える。",
    icon: "pc",
    order: 90,
    showInQuickChips: true,
  },
  {
    id: "emergency",
    amazonUrl: "https://www.amazon.co.jp/s?k=%E9%98%B2%E7%81%BD&i=pbdd&__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=YD1U6EJ13CH7&sprefix=%E9%98%B2%E7%81%BD%2Cpbdd%2C243&linkCode=ll2&tag=punchlinetoky-22&linkId=379beb17d426c0df32275d555e506cd7&ref_=as_li_ss_tl",
    image: "/images/categories/cat-emergency.webp",
    name: "防災・備蓄",
    shortName: "防災",
    description: "水・非常食・電源など、備えの見直しに。",
    icon: "emergency",
    order: 100,
    showInQuickChips: true,
  },
];
