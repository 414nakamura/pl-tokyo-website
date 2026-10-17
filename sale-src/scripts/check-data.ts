// 商品データのチェック：npm run check:data
// 公開前に実行して、エラー（✖）が0件であることを確認してください
import { campaignProducts } from "../data/campaignProducts.ts";
import { categories } from "../data/categories.ts";
import { products } from "../data/products.ts";
import { sections } from "../data/sections.ts";
import { existsSync } from "node:fs";
import { saleConfig, evergreenConfig } from "../config/saleConfig.ts";

const errors: string[] = [];
const warns: string[] = [];
const catIds = new Set(categories.map((c) => c.id));
const sceneIds = new Set(sections.map((s) => s.id));
const productIds = new Set<string>();

for (const p of products) {
  const label = `${p.id}（${p.name}）`;
  if (productIds.has(p.id)) errors.push(`IDが重複しています：${p.id}`);
  productIds.add(p.id);
  if (!catIds.has(p.category)) errors.push(`${label}：categories.ts に無いカテゴリ "${p.category}"`);
  for (const s of p.scenes ?? []) if (!sceneIds.has(s)) errors.push(`${label}：sections.ts に無いシーン "${s}"`);
  if (!p.recommendationReason) warns.push(`${label}：おすすめ理由が空です`);
  if (!p.amazonUrl) warns.push(`${label}：amazonUrl が空です（「リンク準備中」と表示されます）`);
  else if (!/^https:\/\/(www\.)?amazon\.co\.jp\/|^https:\/\/amzn\.(asia|to)\//.test(p.amazonUrl))
    errors.push(`${label}：amazonUrl がAmazonのURLではありません`);
  if ((p.price != null || p.currentPrice != null || p.discount != null) && p.priceSource !== "api")
    errors.push(`${label}：価格が手入力されています（API取得以外の価格は表示できません）`);
  if (p.isSample) warns.push(`${label}：サンプル商品です（本番前に差し替え）`);
}
for (const c of categories) {
  for (const [key, url] of [["amazonUrl", c.amazonUrl], ["saleAmazonUrl", c.saleAmazonUrl]] as const) {
    if (!url) continue;
    if (!/^https:\/\/(www\.)?amazon\.co\.jp\//.test(url)) errors.push(`カテゴリ ${c.name}：${key} がAmazonのURLではありません`);
    else if (!/[?&]tag=/.test(url)) warns.push(`カテゴリ ${c.name}：${key} にアソシエイトID（tag=）がありません（自動で付与されます）`);
  }
  if (c.saleAmazonUrl) warns.push(`カテゴリ ${c.name}：セール会場リンク（saleAmazonUrl）はセール終了後に差し替えてください`);
}
for (const c of campaignProducts) {
  if (!productIds.has(c.productId)) errors.push(`campaignProducts：存在しない商品ID "${c.productId}"（${c.campaignId}）`);
  if (c.section && c.section !== "today" && !sceneIds.has(c.section))
    errors.push(`campaignProducts：存在しないセクション "${c.section}"（${c.productId}）`);
}

// 画像ファイルの有無（無くても表示は崩れないが、写真なしになる）
const imgPaths: [string, string | undefined][] = [
  ["Hero（セール）", saleConfig.heroImage],
  ["Hero（通常）", evergreenConfig.heroImage],
  ...categories.map((c) => [`カテゴリ ${c.name}`, c.image] as [string, string | undefined]),
  ...sections.map((s) => [`セクション ${s.title}`, s.image] as [string, string | undefined]),
];
for (const [label, path] of imgPaths) {
  if (path && !existsSync(`public${path}`)) warns.push(`${label}：画像 ${path} がありません（写真なしで表示されます）`);
}

const samples = products.filter((p) => p.isSample).length;
console.log(`商品 ${products.length}件（うちサンプル ${samples}件）／カテゴリ ${categories.length}件／キャンペーン設定 ${campaignProducts.length}件`);
warns.forEach((w) => console.log("⚠ " + w));
errors.forEach((e) => console.log("✖ " + e));
console.log(errors.length ? `\nエラー ${errors.length}件。修正してください。` : "\nエラーはありません。");
process.exit(errors.length ? 1 : 0);
