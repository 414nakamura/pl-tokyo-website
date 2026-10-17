# AmazonセールCVエンジン 設計書

運営：株式会社PUNCHLINE TOKYO　／　公開先：`https://pl-tokyo.com/sale/`
作成日：2026-10-17　／　対象：MVP v1.0

---

## 0. 実装前に確認した規約・前提（重要）

| 項目 | 確認結果 | 設計への反映 |
|---|---|---|
| 有料広告経由の購入 | 2026/4/20改定で「Amazonにリンクしている有料広告又はブースト広告を通じて誘導されたお客様による購入」は不適格販売。自サイト経由が含まれるかは公開情報では判断不可 | 指示どおり**流入元による分岐は一切実装しない**。広告出稿前にアソシエイト事務局へ書面確認することを強く推奨（README冒頭にも記載） |
| PA-API 5.0 | 非推奨化。後継は **Creators API**（PA-API呼び出しは403） | 価格自動取得は将来 Creators API で実装する前提。`lib/priceProvider.ts` の差し込み口のみ用意 |
| 価格表示 | API等で取得した価格・在庫を表示する場合は**近接して日時スタンプ**が必要 | 価格は `priceSource: "api"` かつ `priceFetchedAt` がある時だけ「◯月◯日 ◯:◯◯時点」付きで表示。それ以外は常に「最新価格はAmazonで確認」。**手入力価格・割引率は表示しない** |
| 商標 | Amazonロゴ・商標を自サイトの名称・ロゴに使うのは避ける | サイト名は独自名称「買い忘れCHECK」（config化）。Amazonロゴは不使用。本文中の「Amazonで確認する」等の記述のみ |
| ステマ規制（景品表示法） | 広告であることの明示が必要 | 全ページ上部に「PR」表記＋フッターにアソシエイト開示文 |
| 商品画像 | Amazonの画像はAPI/SiteStripe経由のURLを使用し、保存・加工しない | Amazon画像は最適化（再圧縮キャッシュ）をかけずにそのまま表示。`// TODO: Amazon最新規約を確認してから実装` を該当箇所に記載 |

> 規約上確信が持てない箇所は、コード内に `// TODO: Amazon最新規約を確認してから実装` を残しています。

---

## 1. サイト戦略

**「セールだから買う」ではなく「買うもの、忘れてない？」**

- ユーザーは「何か安いかな」程度のライトな意欲で来る。大量の割引情報で煽るより、**生活の中で元々買う予定だったもの**を思い出させる方が、Amazonで「確認してみよう」という能動的なクリックが起きやすい。
- 単発LPではなく**常設の買い物メディア**。セールは「今見る理由」として上乗せするだけで、サイトの価値（商品データ・おすすめ理由・クリックデータ）は毎回蓄積する。
- 運営は「商品データを1件追加するだけ」で回る。記事は書かない。

**なぜ：** 少人数運営で継続でき、セールのたびに「広告×訴求×カテゴリ×商品×クリック」のデータが溜まり、次回の精度が上がる構造が最もROIが高いため。

## 2. ユーザーフロー

```
Instagram広告 / SNS / 検索 / Direct
        ↓
   /sale/（FV：何のサイトか・メリット・次の行動が1画面で分かる）
        ↓  ①スクロール or ②「今チェックしたいものを見る」
   今日の注目（4〜8件）  ──────────────→ Amazonで確認する（1タップ）
        ↓
   買い忘れカテゴリ（2列グリッド）
        ↓ 1タップ（ページ遷移なし・その場で絞り込み）
   カテゴリの商品（4件＋もっと見る）  ───→ Amazonで確認する
        ↓
   生活シーン別セクション（毎日使う／まとめ買い／子育て…）
```

- 商品到達：**0タップ（スクロールのみ）〜最大2タップ**。
- 診断・フォーム・モーダルは一切挟まない。
- Amazon遷移は**CTAボタンの明示的なタップのみ**。カード全体リンク化・自動遷移はしない。

## 3. ページ構成

| URL | 役割 | MVP |
|---|---|---|
| `/sale/` | トップ（主導線） | ✅ |
| `/sale/category/{id}/` | カテゴリ別一覧（SEO・広告の着地先にも使える） | ✅ |
| `/sale/company/` | 運営会社 | ✅ |
| `/sale/privacy/` | プライバシーポリシー | ✅ |
| `/sale/affiliate-policy/` | アフィリエイトポリシー | ✅ |
| `/sale/item/{id}/` | 商品詳細 | 将来（データ構造は対応済み） |
| `/sale/terms/` | 利用規約 | 将来（追加可能） |

トップページのセクション順（重要商品を上部に集中）：

1. Hero（FV）
2. 今日の注目（キャンペーンで featured 指定）
3. 買い忘れカテゴリ（絞り込み）
4. 毎日使うものを補充するなら
5. まとめ買い派なら
6. 子育て家庭なら
7. 食品・飲料をストックするなら
8. 犬・猫がいる家庭なら
9. 仕事環境を整えるなら
10. 防災用品を見直すなら
11. 3,000円以下で買いやすい
12. セール時に検討したい高単価アイテム
13. 新しく追加
14. Amazonリンクについて（短い説明）
15. 運営者・開示 → Footer

セクションの長さは `data/sections.ts` の `initialCount`（2〜6）と `size`（`lg` / `md` / `sm`）で強弱を付ける。上位セクションほど大きく、下位は小さく。

## 4. モバイルワイヤーフレーム（375〜430px）

```
┌──────────────────────────┐
│ 買い忘れCHECK        PR  │ ← 細い固定ヘッダー（48px）
├──────────────────────────┤
│ ● Amazonセール 開催中       │ ← セール中のみの小さなピル
│                            │
│ 買うもの、                  │ ← 34–40px 太字
│ 忘れてない？               │
│                            │
│ Amazonセールで、今チェック   │
│ しておきたいものをまとめました │
│                            │
│ [ 今チェックしたいものを見る ↓ ]│ ← サイト内スクロール（Amazonへは飛ばない）
│                            │
│ 日用品 食品 ベビー 家電 ペット→ │ ← クイックチップ（横スクロール・カテゴリ絞り込みへ）
├──────────────────────────┤
│ 今日の注目     更新 10/17   │
│ ┌────────┐ ┌────────┐       │
│ │ 画像    │ │ 画像    │       │ ← 2列カード（4〜8件）
│ │ 商品名  │ │ 商品名  │       │
│ │ こんな人│ │ こんな人│       │
│ │ 理由1文 │ │ 理由1文 │       │
│ │[Amazonで確認する]│          │
│ └────────┘ └────────┘       │
├──────────────────────────┤
│ そういえば、買う予定だった     │
│ ものありませんか？             │
│ ┌─────┐┌─────┐            │
│ │🧴日用品││🥤食品 │            │ ← 2列グリッド・タップでその場に絞り込み表示
│ └─────┘└─────┘            │
│ ▼ 選んだカテゴリの商品（4件＋もっと見る）│
├──────────────────────────┤
│ 毎日使うものを補充するなら     │ ← 背景色を交互に切替
│ [横長カード] × 4 ＋ もっと見る │
│ …                          │
├──────────────────────────┤
│ 運営：株式会社PUNCHLINE TOKYO │
│ 運営会社｜プライバシー｜アフィリエイト│
└──────────────────────────┘
```

## 5. UI方針

- **生成り（#F7F3EC）× チャコール文字（#1C1C1E）× アクセント1色（深い緑 #2F6B5A）**。Amazonの黒×オレンジ配色は避ける。
- **写真が主役の雑誌風レイアウト**：Hero・カテゴリ・シーン見出しに生活の場面の写真（計20枚、`docs/IMAGE_PROMPTS.md`）。写真が無い枠は自動で写真なしレイアウトになる。
- 「AIっぽさ」を避けるため、英字の小見出し・全部同じ形のカード・影の強いカード・全幅の黒ボタンの連続をやめ、見出しは明朝体、カードは細い罫線、ボタンは本文横の小さめのピル型に。今日の注目は番号付き、1件目は商品画像がある場合だけ大きく見せる。
- 見出しは端末内蔵の明朝体（iPhone：ヒラギノ明朝／Android：Noto Serif CJK／Windows：游明朝）、本文は端末内蔵のゴシック。Webフォントは読み込まず、表示速度とレイアウトシフトを優先。
- CTAはチャコール地に白文字、高さ44px以上、角丸。視認性は高いが煽らない。
- アニメーションはタップ時のフィードバック程度。点滅・カウントダウン・赤黄の多用はしない。
- 禁止表現（「最安」「激安」「今すぐ買う」「残りわずか」等）は使わない。CTAは「Amazonで確認する」／「価格・詳細を見る」。

## 6. コンポーネント構成

| コンポーネント | 種別 | 役割 |
|---|---|---|
| `SiteHeader` | Server | サイト名・PR表記（企業サイトへのリンクなし） |
| `Hero` | Server | FV。saleConfig＋A/Bバリアントから文言を出す |
| `QuickChips` | Server | FV下の横スクロールカテゴリチップ（`#categories` へ） |
| `FeaturedProducts` | Server | 今日の注目 |
| `CategoryExplorer` | **Client** | カテゴリグリッド＋その場絞り込み（パネルはServerで描画済みのものを表示切替するだけ） |
| `CategoryCard` | Server | カテゴリカード |
| `ProductSection` | Server | 生活シーン別セクション |
| `ShowMore` | **Client** | 「もっと見る」開閉のみ |
| `ProductCard` | Server | 商品カード（計測用 data 属性を付与） |
| `AmazonLink` | Server | `lib/amazon.ts` で組み立てたURLのみ出力。クリック計測は委譲 |
| `Tracking` | **Client** | UTM保存、page_view、スクロール深度、product_view（IntersectionObserver）、クリック委譲計測 |
| `AnalyticsScripts` | Server | GA4／Meta Pixel タグ（環境変数がある時だけ出力） |
| `SiteFooter` | Server | 運営表記・ポリシー・開示文 |

**なぜ：** Client Component は「UTM取得・計測・絞り込み・もっと見る」の4つだけ。商品カードは全てサーバー描画のHTMLなので、JSが遅れても商品とCTAはすぐ見えて押せる（CVRと表示速度の両立）。

## 7. データ構造

運用者が触るのは `config/` と `data/` だけ。

```
config/site.ts            サイト名・ドメイン・basePath・運営会社情報・開示文
config/saleConfig.ts      セール名・期間・Hero文言・CTA・campaignId・active・A/B
config/trackingConfig.ts  計測イベント名・スクロール閾値・デバッグ
data/categories.ts        カテゴリ（id・名前・説明・アイコン・表示順）
data/sections.ts          生活シーン別セクション（タイトル・リード・件数・背景）
data/products.ts          商品マスター（キャンペーンに依存しない情報）
data/campaignProducts.ts  キャンペーンごとの「どれを・どこに・どの順で強く出すか」
```

**商品（Product）**：`id, name, category, scenes[], target[], tags[], description, recommendationReason, image, amazonUrl, asin, price, currentPrice, discount, priceSource, priceFetchedAt, updatedAt, showUpdatedAt, addedAt, basePriority, isSample, hidden`

**キャンペーン設定（CampaignProduct）**：`campaignId, productId, priority, featured, section, campaignComment, recommendationReasonOverride`

- 同じ商品をプライムデー／ブラックフライデー／通常期で使い回せる（商品と「出し方」を分離）。
- キャンペーン設定が無い商品も、`basePriority` で各シーンセクションに自動表示される。
- 画像なし・URLなし・価格なし・更新日なし・該当0件・featured 0件でもUIが壊れない（プレースホルダー／「リンク準備中」／セクション非表示／注目は優先度上位で自動補完）。

## 8. トラッキング設計

### 取得パラメータ（流入時）
`utm_source, utm_medium, utm_campaign, utm_content, creative_id`
→ sessionStorage に保存（タブ内のページ移動でも保持）。初回流入（first touch）も localStorage に別保存。**表示・リンクの分岐には一切使わない**。

### イベント
| イベント | 発火条件 | 主な付与パラメータ |
|---|---|---|
| `page_view` | ページ表示 | page_path, hero_variant |
| `scroll_25/50/75` | 到達時1回 | page_path |
| `hero_cta_click` | FVのCTA | hero_variant, cta_text |
| `category_click` | カテゴリカード／チップ | category, page_position |
| `product_view` | カード50%以上表示が1回 | product_id, category, section, position |
| `amazon_click` | Amazon CTAタップ | product_id, product_name, category, section, position, page_position, link_type |

全イベント共通：`campaign_id, creative_id, utm_source, utm_medium, utm_campaign, utm_content, hero_variant, site_mode(sale/evergreen)`

`page_position` は `"{section}:{順位}"`（例：`today:1`、`daily-refill:3`）。

### 送信先
`lib/analytics.ts` の `track()` 1か所に集約 → GA4（gtag）／Meta Pixel（fbq trackCustom）／dataLayer（GTM用）へ配信。IDが未設定なら何もしない（サイトは正常動作）。同意管理は `lib/consent.ts` の `hasAnalyticsConsent()` を差し替えるだけでCMPを追加できる。

## 9. CVR改善ポイント

1. **FVで「何のサイトか」と「次の行動」を1画面で完結**：見出し＋サブ＋1CTAのみ。説明文は下部へ。
2. **FV直下に商品**：スクロール1回で「今日の注目」が見え、0タップでAmazon CTAに到達。
3. **カテゴリは1タップでその場に展開**：ページ遷移を挟まず離脱を防ぐ。
4. **カードの情報順序を固定**：画像 → 商品名 → こんな人向け → おすすめ理由 → 価格はAmazonで確認 → CTA。「自分ごと化 → 確認したい」の順に読ませる。
5. **CTAは1カード1つ**：ボタンを増やさず、押す理由（おすすめ理由）をカード内に置く。
6. **表示数を絞る**：各セクション4件前後＋もっと見る。選択疲れを防ぐ。
7. **位置データを取る**：page_position で「上部ほどCTRが高いか」を検証し、次回の並び順を決める。
8. **A/B**：Hero文言・CTA文言・注目の並び順・カテゴリ順を config で切替。イベントに `hero_variant` を付けて比較。

## 10. MVP範囲

**実装済み**：Hero／今日の注目／買い忘れカテゴリ＋絞り込み／商品カード／Amazonアウトバウンド／UTM取得／イベント計測基盤（GA4・Meta・dataLayer）／saleConfig／products・campaignProducts・categories・sections／セール終了（通常）モード／スマホ最適化／運営者情報／アフィリエイト表記／各シーンセクション／更新日表示切替／カテゴリページ／SEO（title・description・OGP・canonical・sitemap・JSON-LD・noindex切替）

**意図的にやらないこと**：診断／流入元によるリンク・表示分岐／アフィリエイト可否判定／価格の手入力表示／カウントダウン／管理画面

**将来拡張の差し込み口**：`lib/priceProvider.ts`（Creators API）、`/item/[id]`、`lib/consent.ts`（CMP）、楽天・Yahoo!（`Product.links` 拡張）、CMS化（`data/*.ts` を API 取得に置き換え）

---

## 11. 主要セクションの設計理由とKPI

| セクション | なぜこの位置か | 改善するKPI | なぜAmazonクリックにつながるか |
|---|---|---|---|
| Hero | 広告から来た直後に「何のサイトか・見る価値」を3秒で理解させる | hero_cta_click / scroll_25 | 「自分に関係ありそう」と感じた人だけが下へ進むため、以降のCTRが上がる |
| 今日の注目 | FV直下。スクロール1回で商品を見せる | product_view / amazon_click | 最も確度の高い商品を最も見られる位置に置く（位置CTRが最大の枠） |
| 買い忘れカテゴリ | 注目が刺さらなかった人の受け皿。2番目の入口 | category_click（Category CTR） | 1タップで自分の生活領域に絞れるので「そういえば必要だった」が起きる |
| 生活シーン別 | カテゴリより文脈（誰に・何のために）で並べる | product_view / scroll_50 | 「子育て家庭なら」等で自分ごと化し、理由付きのCTAを押しやすくする |
| 3,000円以下／高単価 | 予算軸で迷っている人向けに下部へ | amazon_click | 価格帯で絞ることで検討の心理負荷を下げる |
| 新しく追加 | 再訪ユーザー向けの更新性 | 再訪時 product_view | 「前回から何が増えたか」が分かると再訪の理由になる |
| Amazonリンクについて／運営者 | 下部（商品閲覧を邪魔しない） | 離脱率（間接） | 企業運営・PR明示で信頼感を出し、クリックの不安を減らす |

## 12. A/Bテスト設計（MVP）

`config/saleConfig.ts` の `experiments` で切替：

| 対象 | 設定キー | 値 |
|---|---|---|
| Heroコピー | `heroVariant` | `"A"`〜`"D"`（`heroVariants` に定義） |
| CTA文言 | `heroVariants[x].cta` / `amazonCtaLabel` | 文字列 |
| 今日の注目の順序 | `todayOrder` | `"priority"` / `"updated"` |
| カテゴリ順 | `categoryOrder` | カテゴリIDの配列（空なら categories.ts の順） |
| 注目の件数 | `todayCount` | 4〜8 |

運用：期間（例：セール前半／後半）で切り替え、GA4で `hero_variant` 別に `amazon_click ÷ page_view` を比較。将来的に広告クリエイティブ単位で出し分ける場合は `creative_id` を使わず、別URL（カテゴリページ等）を広告ごとに用意する方針（流入元で表示を変えないという原則を守るため）。
