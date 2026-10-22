# AGENTS.md — AI（Codex / Claude など）向けの作業ルール

このリポジトリは、株式会社PUNCHLINE TOKYO が運営する Amazonセール買い物支援メディア
「買い忘れCHECK」（https://pl-tokyo.com/sale/）のソースコードです。
作業前に必ずこのファイルと README.md、docs/DESIGN.md を読んでください。

## 構成
- Next.js（App Router）+ TypeScript + Tailwind CSS v4、静的書き出し（`output: "export"`）
- 公開URLは `/sale/` 配下（`basePath: "/sale"`）。ルート `/` を前提にしたパスを書かない
- 内部リンクは `components/SiteLink.tsx`（basePath自動付与）を使う。`next/link` は使わない
  （GitHub Pages で `_` 始まりの遷移データが配信されないため）
- 運用データは `config/` と `data/` に集約。コンポーネントに文言・URLを直書きしない

## よく使うコマンド
```bash
npm install
npm run dev              # http://localhost:3000/sale/
npm run typecheck        # 型チェック（変更後は必ず通す）
npm run check:data       # 商品・カテゴリデータの検証（エラー0件にする）
npm run check:amazon     # ビルド後（out/）の全Amazonリンクが専用ID kaiwasure-check-22 か検証（エラー0件にする）
npm run images           # images-src/ の画像を public/images/ にWebP変換
npm run deploy:prepare   # 本番用ビルド → deploy/sale/ を作成
```

## 守ること（重要）
1. **Amazonへの遷移はユーザーが押したときだけ**。自動リダイレクト、カード全体のリンク化はしない
2. **Amazonのリンクは必ず `lib/amazon.ts` の `buildAmazonUrl()` を通す**（tag=kaiwasure-check-22 付与・ドメイン検証。買い忘れCHECK専用ID）
3. **価格・割引率を手入力しない**。`priceSource: "api"` 以外の価格は表示しない
4. **Amazonのロゴ・primeロゴ・スマイルマーク、実在ブランドのロゴは画像・UIに使わない**。サイト名・ロゴ周りに「Amazon」を入れない
5. **流入元（UTM・creative_id）で表示やリンクを変えない**。UTMは分析専用
6. 計測は `lib/analytics.ts` の `track()` に集約。クリック計測は `data-track` / `data-track-params` 属性で行う
7. 煽り表現（最安・激安・今すぐ買う・残りわずか・カウントダウン）を使わない
8. スマホ（360〜430px）で横スクロールが出ないこと、タップ領域は44px以上
9. フォントは LINE Seed JP に統一（`app/globals.css` の `--font-sans`）。別フォントを足さない
10. 色は `app/globals.css` の `@theme` トークンを使う（直接のカラーコード指定を増やさない）
11. 企業サイト（pl-tokyo.com の /sale/ 以外）のファイル・ナビ・robots.txt・sitemap.xml は変更しない

## 主なファイル
| 目的 | ファイル |
|---|---|
| セール名・Heroコピー・バナー・期間 | `config/saleConfig.ts` |
| サイト名・タグライン・運営会社・開示文・ナビのリンク先 | `config/site.ts` |
| 商品 | `data/products.ts` |
| キャンペーンごとの注目・優先度 | `data/campaignProducts.ts` |
| カテゴリ（ジャンル別Amazonリンク含む） | `data/categories.ts` |
| 生活シーン別セクション | `data/sections.ts` |
| トップページ構成 | `app/page.tsx` |
| ヘッダー／グローバルナビ／ハンバーガー | `components/SiteHeader.tsx` / `components/MobileMenu.tsx` |
| バナー下ジャンルボタン＋追従バー | `components/GenreBar.tsx` |
| 商品カード | `components/ProductCard.tsx` |

## リポジトリ内の位置と公開手順（GitHub Pages）
このソースは企業サイトのリポジトリ `414nakamura/pl-tokyo-website` の `sale-src/` フォルダにある。
本番は同じリポジトリの `sale/` フォルダ（ビルド結果）が https://pl-tokyo.com/sale/ として配信される。

```
pl-tokyo-website/
├── index.html, about/, cashless/ …   ← 企業サイト（触らない）
├── .nojekyll                          ← 消さない（_next を公開するため）
├── sale/                              ← ビルド結果（手で編集しない。npm run deploy で上書きされる）
└── sale-src/                          ← このソースコード（編集するのはここ）
```

1. `cd sale-src && npm install`（初回のみ）
2. `npm run typecheck && npm run check:data`
3. `npm run deploy` → ビルドして `../sale/` を丸ごと置き換える
4. `sale-src/` と `sale/` の変更をまとめてコミットし、main に push（1〜2分で反映）

## 同時編集のルール
- 作業は必ずブランチを切って行い、main へはレビュー後にマージする（例：`codex/xxx`、`claude/xxx`）
- 作業開始前に `git pull`。同じファイル（特に `data/products.ts`）を同時に編集しない
- コミットは小さく、メッセージに何を変えたかを書く
- `sale/`（ビルド結果）は手で編集しない。必ず `npm run deploy` で作り直す
- 公開（main への push）は、依頼者の指示があったときだけ行う
