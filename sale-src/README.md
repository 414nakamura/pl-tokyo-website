# AmazonセールCVエンジン（買い忘れCHECK）

株式会社PUNCHLINE TOKYO が運営する、Amazonセール期間中の買い物支援メディアです。
公開URL：**https://pl-tokyo.com/sale/**

- コンセプト：「セールだから買う」ではなく **「買うもの、忘れてない？」**
- 最重要KPI：**Amazonアウトバウンドクリック率（amazon_click ÷ page_view）**
- 運用：`config/` と `data/` のファイルを書き換えるだけ（記事作成は不要）
- 設計の詳細：[`docs/DESIGN.md`](docs/DESIGN.md)

---

## ⚠ 公開前に必ず確認すること

1. **有料広告からの誘導について（最重要）**
   2026年4月20日のAmazonアソシエイト規約改定で、「Amazonにリンクしている有料広告・ブースト広告を通じて誘導された購入」は**不適格販売（紹介料の対象外）**になりました。
   Instagram広告 → 本サイト → Amazon という導線がこれに当たるかは、公開情報からは判断できませんでした。**広告配信の前に、Amazonアソシエイトのサポートへ書面で確認してください。**
   本サイトは指示どおり、流入元によってリンクや表示を変える仕組みを**持っていません**。
2. **サンプル商品の差し替え**：`data/products.ts` の商品は全て `【サンプル】` です。`npm run check:data` で残っていないか確認できます。
3. **運営会社情報**：`config/site.ts` の `companyConfig`（代表者・所在地・連絡先）を正式な内容に差し替えてください。
4. **規約の再確認**：コード内の `// TODO: Amazon最新規約を確認してから実装` を検索し、開示文・価格表示・画像の扱いを公開時点の規約で確認してください。
5. **プライバシーポリシー**：`app/privacy/page.tsx` の内容を法務確認してください。

---

## 目次

1. [フォルダ構成](#1-フォルダ構成)
2. [初回セットアップ](#2-初回セットアップ)
3. [商品を追加する](#3-商品を追加する)
4. [商品を削除する・隠す](#4-商品を削除する隠す)
5. [商品の優先順位・注目商品を変える](#5-商品の優先順位注目商品を変える)
5.5 [写真を入れる・差し替える](#55-写真を入れる差し替える)
6. [セールを切り替える](#6-セールを切り替える)
7. [ブラックフライデーへの切替例](#7-ブラックフライデーへの切替例)
8. [セール終了後（通常モード）](#8-セール終了後通常モード)
9. [A/Bテスト](#9-abテスト)
10. [GA4 の導入](#10-ga4-の導入)
11. [Meta Pixel の導入](#11-meta-pixel-の導入)
12. [KPIの確認方法](#12-kpiの確認方法)
13. [改善PDCA](#13-改善pdca)
14. [デプロイ手順](#14-デプロイ手順)
15. [公開前チェックリスト](#15-公開前チェックリスト)
16. [よくある質問・トラブル](#16-よくある質問トラブル)

---

## 1. フォルダ構成

```
config/                  ← セール・サイト・計測の設定（運用で触る）
  saleConfig.ts            セール名・期間・Heroコピー・CTA・campaignId・A/Bテスト
  site.ts                  サイト名・URL・運営会社情報・開示文
  trackingConfig.ts        計測イベント・スクロール閾値
data/                    ← 商品データ（運用で触る）
  products.ts              商品マスター
  campaignProducts.ts      キャンペーンごとの「出し方」（注目・優先度）
  categories.ts            カテゴリ
  sections.ts              生活シーン別セクション
app/                     ← ページ（通常は触らない）
  page.tsx                 トップ /sale/
  category/[id]/page.tsx   カテゴリページ /sale/category/{id}/
  company/ privacy/ affiliate-policy/
  sitemap.ts               /sale/sitemap.xml
components/              ← 画面部品（通常は触らない）
lib/                     ← ロジック（通常は触らない）
  analytics.ts             イベント送信（GA4 / Meta / dataLayer）を集約
  utm.ts                   流入元パラメータの取得・保存（分析専用）
  products.ts              商品の選定・並び替え
  amazon.ts                Amazonリンクの組み立て
  priceProvider.ts         将来の価格自動取得（Creators API）の差し込み口
  consent.ts               将来のCookie同意管理の差し込み口
public/og/               ← SNS共有画像（OGP）
scripts/                 ← データチェック・OGP画像生成・プレビュー
docs/DESIGN.md           ← 設計書
```

## 2. 初回セットアップ

必要なもの：Node.js 20 以上

```bash
npm install
cp .env.example .env.local     # 必要な値を記入
npm run dev                    # 開発用 → http://localhost:3000/sale/
npm run check:data             # 商品データのチェック
npm run preview                # 本番と同じ形でビルド＆確認 → http://localhost:3000/sale/
```

`.env.local` の主な項目：

| 変数 | 内容 |
|---|---|
| `NEXT_PUBLIC_GA4_ID` | GA4 測定ID（例 `G-XXXXXXX`）。空ならGA4は読み込まない |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID。空ならPixelは読み込まない |
| `NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG` | アソシエイトのトラッキングID（例 `xxxx-22`）。全Amazonリンクに `tag=` が自動で付く |
| `NEXT_PUBLIC_NOINDEX` | ステージング・テスト環境では `true`（検索エンジンに載らない） |
| `NEXT_PUBLIC_DEBUG_TRACKING` | `true` でブラウザのコンソールに計測イベントを表示（確認用） |

---

## 3. 商品を追加する

**手順（非エンジニア向け）**

1. **`data/products.ts` に商品を追加**
   ファイル冒頭の【テンプレート】をコピーし、配列の最後（`];` の直前）に貼り付けて書き換えます。

   ```ts
   {
     id: "product_101",                              // 一意のID。後から変えない
     name: "〇〇 トイレットペーパー 12ロール×6パック",
     category: "daily",                              // categories.ts の id
     scenes: ["daily-refill", "bulk"],               // 出したいセクション（sections.ts の id）
     target: ["family", "daily-use"],                // こんな人向け
     tags: ["まとめ買い", "日用品"],
     recommendationReason:
       "毎日使う消耗品なので、ストックが減っている家庭はセール時に確認しておきたい商品です。",
     image: "",                                      // Amazonの画像URL（SiteStripe等）。空ならアイコン表示
     amazonUrl: "https://www.amazon.co.jp/dp/B0XXXXXXXX",
     updatedAt: "2026-11-27T10:00:00+09:00",
     showUpdatedAt: true,                            // 「更新：11月27日 10:00」を表示
     addedAt: "2026-11-27",
     basePriority: 60,
   },
   ```

2. **（強く出したい場合）`data/campaignProducts.ts` に設定を追加**

   ```ts
   {
     campaignId: "amazon_sale_2026_10",   // 今のセールの campaignId
     productId: "product_101",
     priority: 95,                        // 大きいほど上
     featured: true,                      // 「今日の注目」に出す
     section: "today",
     campaignComment: "まとめ買い向き",   // カード上の小さなラベル
   },
   ```
   ここに書かなくても、`scenes` に指定したセクションとカテゴリには自動で表示されます。

3. **カテゴリ・セクションの指定を確認**
   - `category`：絞り込みとカテゴリページに使われます
   - `scenes`：トップページの「毎日使うものを補充するなら」等に使われます

4. **優先順位を指定**：`basePriority`（通常時）／`priority`（キャンペーン時）。0〜100目安。

5. **公開確認**
   ```bash
   npm run check:data    # エラーが無いか
   npm run preview       # 見た目を確認
   ```
   問題なければ [デプロイ](#14-デプロイ手順)。

**おすすめ理由の書き方**
- ✕「人気商品です」「売れています」「最安」
- ○ 生活との接点を書く：「ペットフードは定期的に購入するため、次回購入予定が近い場合は価格を確認しておく価値があります。」

**⚠ 価格は手入力しない**：`price` / `currentPrice` / `discount` は空のままにしてください。手入力するとチェックでエラーになり、画面にも表示されません（「最新価格はAmazonで確認」と表示されます）。

## 4. 商品を削除する・隠す

| やりたいこと | 方法 |
|---|---|
| 一時的に全体から隠す | `products.ts` の該当商品に `hidden: true` |
| 今回のセールだけ隠す | `campaignProducts.ts` の該当行に `hidden: true` |
| 完全に削除する | `products.ts` からブロックごと削除し、`campaignProducts.ts` の同じ `productId` の行も削除 |

削除後は `npm run check:data` で、存在しないIDを参照していないか確認してください。
（計測データとの対応を保つため、**IDの使い回しはしない**でください）

## 5. 商品の優先順位・注目商品を変える

- **並び順**：`campaignProducts.ts` の `priority` を変更（大きいほど上）。キャンペーン設定が無い商品は `products.ts` の `basePriority`。
- **今日の注目に出す／外す**：`featured: true / false`
- **今日の注目の件数・並び**：`config/saleConfig.ts` の `experiments.todayCount`（4〜8）、`todayOrder`（`"priority"` or `"updated"`）
- **カテゴリの並び**：`categories.ts` の `order`、または `experiments.categoryOrder: ["daily", "food", ...]`
- **セクションの並び・件数**：`sections.ts` の `order` / `initialCount` / `maxCount`
- **更新日時**：`updatedAt` を更新し、表示したい商品だけ `showUpdatedAt: true`

※ 今日の注目が0件の場合は、優先度の高い商品が自動で表示されます（空欄にはなりません）。

## 5.5 写真を入れる・差し替える

サイトの雰囲気をつくる写真は20枚です（Hero 1・カテゴリ10・シーン見出し9）。
生活シーン9箇所の写真は、全幅の見出し背景として不透明度15%で表示します。写真だけの縦長ブロックを置かず、見出しのすぐ下から商品を探せる構成です。高さは見出しと説明文の量に応じて変わります。
ChatGPT等で作る場合のプロンプトは [`docs/IMAGE_PROMPTS.md`](docs/IMAGE_PROMPTS.md) にあります。

1. 元画像（PNG/JPEG）を `images-src/` に入れる（ファイル名は `hero.png`、`cat-daily.png`、`scene-pet.png` など、プロンプト一覧のとおり）
2. 変換する
   ```bash
   npm run images
   ```
   → `public/images/hero/`、`categories/`、`scenes/` にWeb用の軽いWebPが作られます
3. `npm run preview` で確認

- 写真が無い枠は、自動で「写真なし」のレイアウトになります（崩れません）。`npm run check:data` で足りない写真が一覧で出ます
- 写真の場所は `config/saleConfig.ts`（heroImage）、`data/categories.ts`・`data/sections.ts`（image）で変更できます
- セールごとにHeroだけ変えたい場合：`images-src/hero-bf.png` → `npm run images` → `heroImage: "/images/hero/hero-bf.webp"`
- SNS共有画像は Hero写真から自動で作れます：`node scripts/generate-og.mjs "見出し" "サブコピー" 名前`
- **商品カードの画像には使わないでください。** 商品画像は Amazon が提供する画像URL（SiteStripe等）を `products.ts` の `image` に入れます

## 6. セールを切り替える

コード本体の変更は不要です。

1. `config/saleConfig.ts` の `saleConfig` を書き換える
   - `saleName` / `saleShortName` / `startDate` / `endDate` / `campaignId` / `heroTitle` / `heroSubtitle` / `mainCTA`
   - 必要に応じて `ogImage`（SNS共有画像）
2. `data/campaignProducts.ts` に、新しい `campaignId` の行を追加（注目商品・優先度）
3. `npm run check:data` → `npm run preview` で確認 → デプロイ

**OGP画像（SNS共有画像）を作る場合**
```bash
node scripts/generate-og.mjs "ブラックフライデー、何買う？" "今チェックしておきたいものをまとめました。" black-friday-2026
# → public/og/black-friday-2026.png
```
`saleConfig.ogImage` を `"/og/black-friday-2026.png"` に変更。

## 7. ブラックフライデーへの切替例

**① `config/saleConfig.ts`**
```ts
export const saleConfig = {
  saleName: "Amazonブラックフライデー",
  saleShortName: "ブラックフライデー",
  startDate: "2026-11-XX",     // 実際の日付に
  endDate: "2026-12-XX",
  heroTitle: "ブラックフライデー、何買う？",
  heroSubtitle: "今チェックしておきたいものをまとめました。",
  mainCTA: "商品を見る",
  campaignId: "black_friday_2026",
  active: true,
  themeType: "default" as "default",
  ogImage: "/og/black-friday-2026.png",
  metaDescription: "ブラックフライデーで今チェックしておきたい日用品・食品・家電などを生活シーン別にまとめました。",
};
```

**② `data/campaignProducts.ts` に追加**
```ts
/* ===== 2026 ブラックフライデー ===== */
{ campaignId: "black_friday_2026", productId: "sample_041", priority: 100, featured: true, section: "today", campaignComment: "セール時に見たい家電" },
{ campaignId: "black_friday_2026", productId: "sample_085", priority: 98,  featured: true, section: "today", campaignComment: "在宅ワークに" },
{ campaignId: "black_friday_2026", productId: "sample_001", priority: 96,  featured: true, section: "today", campaignComment: "まとめ買い向き" },
// ...
```
前回（感謝祭）の行は消さずに残しておけます（campaignId が違うので表示されません）。

**③ 広告URLのパラメータも新しいキャンペーン名に**
```
https://pl-tokyo.com/sale/?utm_source=instagram&utm_medium=paid_social&utm_campaign=black_friday_2026&utm_content=gadget_A&creative_id=story_010
```

## 8. セール終了後（通常モード）

サイトは閉じません。以下のどちらかで「通常モード」になります。

- `saleConfig.active = false` にする
- `endDate` を過ぎてから再ビルドする（静的サイトのため、**期間による切替はビルドした時点で判定**されます。セール開始日・終了日にはビルド＆デプロイを行ってください）

通常モードでは、Heroが「買い忘れているもの、ありませんか？」等（`evergreenConfig`）に変わり、`campaignId: "evergreen"` の商品設定が使われます。

## 9. A/Bテスト

`config/saleConfig.ts` の `experiments` で切り替えます。

| 対象 | 設定 | 例 |
|---|---|---|
| Heroコピー | `heroVariant` | `"A"`：Amazonセール、何買う？／`"B"`：買うもの、忘れてない？／`"C"`：今チェックしておきたいAmazonセール商品／`"D"`：そういえば、買おうと思っていたものありませんか？／`null`：saleConfig の文言 |
| 商品ボタン文言 | `amazonCtaLabel` | `"Amazonで確認する"` / `"価格・詳細を見る"` |
| 今日の注目の順番 | `todayOrder` | `"priority"` / `"updated"` |
| 今日の注目の件数 | `todayCount` | 4〜8 |
| カテゴリ順 | `categoryOrder` | `["daily","baby","food"]` |
| セクション順 | `sectionOrder` | `["family-kids","daily-refill"]` |

**進め方（MVP）**：期間で切り替える（例：セール前半はA、後半はB）。全イベントに `hero_variant` が記録されるので、GA4で `hero_variant` 別に Amazon CTR を比較します。
※流入元（広告）によって表示を変えることはしません。広告ごとに着地先を変えたい場合は `/sale/category/baby/` などのカテゴリページを広告のURLに使ってください。

---

## 10. GA4 の導入

1. GA4でプロパティとWebデータストリーム（`https://pl-tokyo.com`）を作成し、測定ID（`G-...`）を取得
2. `.env.local`（またはビルド環境の環境変数）に設定
   ```
   NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
   ```
3. 再ビルド・デプロイ
4. **カスタムディメンションを登録**（GA4管理 → カスタム定義 → カスタムディメンションを作成、範囲：イベント）

   | ディメンション名 | イベントパラメータ |
   |---|---|
   | campaign_id | `campaign_id` |
   | creative_id | `creative_id` |
   | category | `category` |
   | product_id | `product_id` |
   | product_name | `product_name` |
   | section | `section` |
   | page_position | `page_position` |
   | hero_variant | `hero_variant` |
   | site_mode | `site_mode` |
   | utm_content | `utm_content` |

   ※ utm_source / utm_medium / utm_campaign は、GA4標準の「セッションの参照元/メディア/キャンペーン」でも確認できます。
   `position` はカスタム指標（数値）として登録すると平均表示位置も見られます。

5. **キーイベント（コンバージョン）設定**：GA4管理 → イベント → `amazon_click` をキーイベントに指定

6. **動作確認**：URLに `?utm_source=test&creative_id=test_001` を付けて開き、GA4の「リアルタイム」または「DebugView」で `page_view` / `amazon_click` が届くか確認。
   ローカルでは `NEXT_PUBLIC_DEBUG_TRACKING=true` にすると、ブラウザのコンソールに送信内容が表示されます。

**イベント一覧**

| イベント | いつ | 主なパラメータ |
|---|---|---|
| `page_view` | ページ表示 | page_path, page_title |
| `scroll_25` / `scroll_50` / `scroll_75` | スクロール到達（各1回） | page_path |
| `hero_cta_click` | FVのボタン | cta_text |
| `category_click` | カテゴリカード・チップ | category, page_position, source |
| `product_view` | 商品カードが50%以上見えた（各1回） | product_id, category, section, position, page_position |
| `amazon_click` | Amazonボタン | product_id, product_name, category, section, position, page_position |

全イベント共通：`campaign_id, site_mode, hero_variant, utm_source, utm_medium, utm_campaign, utm_content, creative_id, referrer_host, first_utm_source, first_creative_id`

## 11. Meta Pixel の導入

1. Metaイベントマネージャでピクセルを作成し、IDを取得
2. 環境変数に設定
   ```
   NEXT_PUBLIC_META_PIXEL_ID=123456789012345
   ```
3. 再ビルド・デプロイ
4. 送信されるイベント（`config/trackingConfig.ts` の `metaEventMap` で変更可）

   | サイト内イベント | Metaイベント |
   |---|---|
   | page_view | PageView（標準） |
   | amazon_click | AmazonClick（カスタム） |
   | category_click | CategoryClick（カスタム） |
   | hero_cta_click | HeroCtaClick（カスタム） |
   | product_view | ProductView（カスタム） |

5. 広告の最適化に使う場合は、イベントマネージャで `AmazonClick` からカスタムコンバージョンを作成
6. 確認：Chrome拡張「Meta Pixel Helper」またはイベントマネージャの「テストイベント」

未設定の場合は何も読み込まれず、サイトは通常どおり動きます。

**Cookie同意（将来）**：同意管理ツールを入れる場合は `lib/consent.ts` の `hasAnalyticsConsent()` を同意状態に連動させるだけで、全イベント送信が止まる／再開する構造です。

---

## 12. KPIの確認方法

| KPI | 計算式 | 見る場所（GA4） |
|---|---|---|
| **Amazon Outbound CTR**（Primary） | amazon_click ÷ page_view | レポート → エンゲージメント → イベント |
| Category CTR | category_click ÷ page_view | 同上 |
| Product CTR | amazon_click ÷ product_view | 同上 |
| Engagement | scroll_50・scroll_75 ÷ page_view | 同上 |

**分析単位：utm_campaign × creative_id × category × product_id × amazon_click**

GA4 → 探索 → 自由形式 で以下を作成：
- 行：`creative_id` → `category` → `product_id`
- 値：イベント数
- フィルタ：イベント名 = `amazon_click`
- 比較用にもう1つ、イベント名 = `page_view` のタブを作り、creative_id ごとの CTR を出す

よく使う切り口：

| 知りたいこと | 行 | フィルタ |
|---|---|---|
| どの広告クリエイティブが効いたか | creative_id | amazon_click / page_view |
| どのカテゴリが押されたか | category | category_click |
| どの商品がクリックされたか | product_id | amazon_click |
| 上の位置ほどCTRが高いか | page_position | amazon_click と product_view |
| Hero文言の比較 | hero_variant | amazon_click / page_view |
| セールごとの比較 | campaign_id | amazon_click |

データを長く残す場合は、GA4 → BigQuery エクスポート（無料枠あり）を有効にすると、セールをまたいだ分析がしやすくなります。

## 13. 改善PDCA

毎回のセール終了後に、30分程度で以下を確認します。

| 観点 | 確認すること | 次回への反映 |
|---|---|---|
| 広告 | creative_id ごとの Amazon CTR | 高CTRの訴求（例：子育て・買い忘れ）で広告を作る |
| LP | どのカテゴリが最も押されたか | `categoryOrder` で上に出す／チップに出す |
| 商品 | amazon_click の多い商品 | 次回 `featured: true` ＆ `priority` を上げる |
| セクション | page_position 別の Product CTR | 上位の枠に高CTR商品を置く。CTRが低いセクションは `initialCount` を減らす or 非表示 |
| Hero | hero_variant 別の CTR | 勝った文言を次回のデフォルトに |

記録用テンプレート（スプレッドシート等に1セール1行）：
`campaign_id ／ 期間 ／ page_view ／ amazon_click ／ CTR ／ 上位creative_id ／ 上位カテゴリ ／ 上位商品 ／ 次回やること`

---

## 14. デプロイ手順

### 現在の公開方法

pl-tokyo.com は **GitHub Pages**（リポジトリ `414nakamura/pl-tokyo-website`、main ブランチ）で公開されています。
このソースは同じリポジトリの `sale-src/` にあり、ビルド結果が `sale/` に入ります（既存の企業サイトのファイルは変更しません）。

更新手順：
1. `cd sale-src && npm install`（初回のみ）
2. `npm run check:data` → `npm run deploy`（ビルドして `../sale/` を置き換え）
3. GitHub Desktop で `sale-src/` と `sale/` の変更をまとめて Commit → Push（1〜2分で https://pl-tokyo.com/sale/ に反映）

※ リポジトリ直下の `.nojekyll`（空ファイル）は消さないでください。Next.js の `_next` フォルダを公開するために必要です。
※ AIエージェント（Codex / Claude）で編集する場合は `AGENTS.md` のルールに従ってください。

### （参考）その他の公開方法

### 方式A：静的ファイルを既存サーバーの /sale/ に置く（推奨・既定）

pl-tokyo.com は既存の企業サイトが動いているため、**`/sale/` ディレクトリを追加するだけ**で公開できる静的書き出しを既定にしています。既存のファイル・ナビ・CSS・設定には一切触れません。

```bash
# 1. 本番用の環境変数を設定（.env.production.local など）
NEXT_PUBLIC_SITE_URL=https://pl-tokyo.com
NEXT_PUBLIC_BASE_PATH=/sale
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXXXX
NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG=xxxx-22
NEXT_PUBLIC_NOINDEX=false

# 2. チェック＆ビルド
npm run check:data
npm run build          # → out/ フォルダが作られる

# 3. 確認
npm run start          # http://localhost:3000/sale/
```

4. **`out/` フォルダの中身**を、サーバーのドキュメントルート直下の **`sale/`** フォルダへアップロード（FTP / SFTP / サーバーのファイルマネージャ）
   ```
   public_html/          ← 既存の企業サイト（触らない）
   ├── index.html
   ├── images/ ...
   └── sale/             ← 新規作成。out/ の中身をここへ
       ├── index.html
       ├── _next/
       ├── category/
       ├── company/ ...
   ```
5. 更新時は `sale/` フォルダの中身だけを入れ替えます（古い `_next/` は削除して入れ替えてOK）

> 404ページを /sale/ 用にしたい場合は、サーバーが対応していれば `sale/.htaccess` に `ErrorDocument 404 /sale/404.html` を追加（`sale/` フォルダ内だけに作用し、既存サイトには影響しません）。

### 方式B：Vercel 等で動かし、pl-tokyo.com/sale/ に割り当てる

pl-tokyo.com がリバースプロキシ（Vercel / Cloudflare 等）で `/sale/*` を別アプリへ転送できる場合：
- 環境変数 `NEXT_OUTPUT=standalone` を設定してデプロイ
- 既存サイト側で `/sale/:path*` → このアプリへの rewrite を設定（既存のナビゲーションは変更しない）

### ステージング（テスト環境）

`NEXT_PUBLIC_NOINDEX=true` でビルドすると、全ページが `noindex, nofollow` になります。

### SEO（公開後）

- Google Search Console で `https://pl-tokyo.com/sale/sitemap.xml` を送信
- `robots.txt` は既存サイトのルートにあるため、本プロジェクトでは**変更しません**（必要なら既存の robots.txt に `Sitemap: https://pl-tokyo.com/sale/sitemap.xml` を1行追加するだけでOK。任意）
- canonical は各ページ `https://pl-tokyo.com/sale/...` に自動設定されます

## 15. 公開前チェックリスト

- [ ] `https://pl-tokyo.com/` 既存の企業サイトが正常に表示される
- [ ] `https://pl-tokyo.com/sale/` が正常に表示される（スマホ実機でも確認）
- [ ] 既存の企業サイトに `/sale/` へのリンクを**追加していない**
- [ ] `/sale/` 内に企業サイトTOP（`https://pl-tokyo.com/`）へのリンクが**無い**
- [ ] `npm run check:data` でエラー0件、サンプル商品0件
- [ ] アソシエイトIDが全Amazonリンクに付いている（ボタンのリンク先URLに `tag=` があるか）
- [ ] 「Amazonで確認する」を押した時だけAmazonが開く
- [ ] フッター・アフィリエイトポリシーに開示文が表示されている
- [ ] 運営会社ページの情報が正式なものになっている
- [ ] GA4 リアルタイムで page_view / amazon_click が届く
- [ ] canonical / OGP 画像が正しい（[OGP確認ツール](https://www.opengraph.xyz/) 等）
- [ ] 有料広告経由の扱いを Amazon アソシエイトに確認済み

## 16. よくある質問・トラブル

**Q. 画像が表示されない**
`image` が空の場合はカテゴリアイコンが表示されます（仕様）。Amazonの画像URLは SiteStripe や Creators API で取得したものを使い、画像のダウンロード・加工はしないでください。

**Q. 「リンク準備中」と表示される**
`amazonUrl` が空、またはAmazon以外のURL（`https://www.amazon.co.jp/`・`amzn.asia`・`amzn.to` 以外）です。

**Q. セクションが表示されない**
そのセクションに該当する商品が0件だと、セクションごと非表示になります（仕様）。

**Q. 価格を表示したい**
PA-API 5.0 は非推奨となり、後継は Creators API です。導入する場合は `lib/priceProvider.ts` で取得し、`priceSource: "api"` と `priceFetchedAt` を設定すると、取得日時つきで表示されます。手入力の価格は表示されません。

**Q. 商品詳細ページ（/sale/item/xxx/）を作りたい**
`app/item/[id]/page.tsx` を追加し、`generateStaticParams` で `products` のIDを返せば作成できます（カテゴリページと同じ構造）。`/sale/` 配下で完結します。

**Q. 楽天・Yahoo!ショッピングにも対応したい**
`Product` に `links: { rakuten?: string; yahoo?: string }` を追加し、`lib/amazon.ts` と同様の組み立て関数を作る想定です。

---

運営：株式会社PUNCHLINE TOKYO
