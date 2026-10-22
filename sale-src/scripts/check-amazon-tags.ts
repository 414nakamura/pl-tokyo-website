// Amazonアソシエイト トラッキングIDのチェック：npm run check:amazon
//   1. ソース（config/site.ts・data/products.ts・data/categories.ts）のタグが買い忘れCHECK専用IDか
//   2. ビルド結果（既定は out/。引数でフォルダ指定可：npm run check:amazon -- ../sale）の
//      全Amazonリンクにtagがちょうど1つ・専用IDで付いているか、Amazon以外の購入導線が無いか
// エラー（✖）が1件でもあれば終了コード1。next build の後に実行してください
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { siteConfig } from "../config/site.ts";
import { categories } from "../data/categories.ts";
import { products } from "../data/products.ts";

/** 買い忘れCHECK（/sale/）専用のトラッキングID。企業サイト用・他メディア用のIDは使わない */
const EXPECTED_TAG = "kaiwasure-check-22";
const AMAZON_HOSTS = ["www.amazon.co.jp", "amazon.co.jp"];
const SHORT_HOSTS = ["amzn.asia", "amzn.to"];
/** Amazon以外で href に出てよい外部ホスト（計測スクリプト・プライバシーポリシーの参照先。購入導線ではない） */
const NON_PURCHASE_HOSTS = [
  "pl-tokyo.com",
  "www.googletagmanager.com",
  "www.clarity.ms",
  "policies.google.com",
  "privacy.microsoft.com",
  "www.facebook.com",
];

const args = process.argv.slice(2);
const expected = args.find((a) => a.startsWith("--tag="))?.slice(6) ?? EXPECTED_TAG;
const listMode = args.includes("--list");
const outDir = args.find((a) => !a.startsWith("--")) ?? "out";
const errors: string[] = [];

function checkTag(where: string, raw: string, requireTag: boolean) {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    errors.push(`${where}：URLとして読めません ${raw}`);
    return;
  }
  if (SHORT_HOSTS.includes(url.hostname)) {
    errors.push(`${where}：短縮リンクはタグを確認できません ${raw}`);
    return;
  }
  if (!AMAZON_HOSTS.includes(url.hostname)) {
    errors.push(`${where}：許可していないAmazonドメインです ${raw}`);
    return;
  }
  const tags = url.searchParams.getAll("tag");
  if (tags.length === 0 && !requireTag) return;
  if (tags.length !== 1 || tags[0] !== expected)
    errors.push(`${where}：tag が ${tags.length ? tags.join(",") : "（なし）"} です（${expected} にしてください） ${raw}`);
}

// ---- 1. ソース ----
if (siteConfig.amazonAssociateTag !== expected)
  errors.push(`config/site.ts：amazonAssociateTag が ${siteConfig.amazonAssociateTag} です（環境変数 NEXT_PUBLIC_AMAZON_ASSOCIATE_TAG の古い値が残っていないか確認）`);
for (const l of siteConfig.navExtraLinks) checkTag(`config/site.ts navExtraLinks ${l.id}`, l.url, false);
for (const p of products) if (p.amazonUrl) checkTag(`data/products.ts ${p.id}`, p.amazonUrl, false);
for (const c of categories)
  for (const [key, url] of [["amazonUrl", c.amazonUrl], ["saleAmazonUrl", c.saleAmazonUrl]] as const)
    if (url) checkTag(`data/categories.ts ${c.id} ${key}`, url, false);

// ---- 2. ビルド結果 ----
if (!existsSync(join(outDir, "index.html"))) {
  console.log(`✖ ${outDir}/index.html がありません。先に next build を実行してください。`);
  process.exit(1);
}
const files: string[] = [];
(function walk(dir: string) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(html|txt|js|json|xml|rsc)$/.test(name)) files.push(p);
  }
})(outDir);

// HTML属性（&amp;）・RSCペイロード（\u0026・\/）のエスケープを戻してからURLを拾う
const decode = (s: string) => s.replace(/&amp;/g, "&").replace(/\\u0026/g, "&").replace(/\\\//g, "/");
const URL_RE = /https?:\/\/(?:www\.)?(?:amazon\.co\.jp|amzn\.asia|amzn\.to)(?:[/?][^\s"'<>\\]*)?/g;
// トラッキングIDらしき文字列（〜-22）。フォント名などIDでないものは除外
const ID_RE = /\b[a-z][a-z0-9-]*-22\b/g;
const NOT_IDS = ["line-seed-jp-22"];
let hrefs = 0; // HTMLの <a href>
let rscHrefs = 0; // RSCペイロードの "href"（クライアント描画時のリンク）
let dataUrls = 0; // RSCペイロードの商品データ（表示時に buildAmazonUrl() でtagが付く）
let bundled = false; // クライアントJSに専用IDが埋め込まれているか
const list: { file: string; kind: string; url: string }[] = [];
for (const f of files) {
  const rel = relative(outDir, f);
  const raw = readFileSync(f, "utf8");
  const text = decode(raw);
  for (const m of text.matchAll(URL_RE)) {
    const before = text.slice(Math.max(0, m.index - 8), m.index);
    const kind = f.endsWith(".html") && before.endsWith('href="') ? "href" : before.endsWith('"href":"') ? "rsc-href" : "data";
    if (kind === "href") hrefs++;
    else if (kind === "rsc-href") rscHrefs++;
    else dataUrls++;
    // リンクはtag必須。データはtagが無くてもよいが、あるなら専用IDのみ
    checkTag(`${rel}（${kind}）`, m[0], kind !== "data");
    list.push({ file: rel, kind, url: m[0] });
  }
  for (const m of text.matchAll(ID_RE))
    if (m[0] !== expected && !NOT_IDS.includes(m[0])) errors.push(`${rel}：別のトラッキングID ${m[0]} が含まれています`);
  if (f.endsWith(".js") && text.includes(`amazonAssociateTag:"${expected}"`)) bundled = true;
  if (!f.endsWith(".html")) continue;
  for (const a of raw.matchAll(/<a\s[^>]*>/g)) {
    const href = decode(a[0].match(/\shref="([^"]*)"/)?.[1] ?? "");
    if (!/^https?:\/\//.test(href)) continue;
    const host = new URL(href).hostname;
    const isPurchase = /data-track="amazon_click"|rel="[^"]*sponsored/.test(a[0]);
    if (AMAZON_HOSTS.includes(host) || SHORT_HOSTS.includes(host)) continue;
    if (isPurchase || !NON_PURCHASE_HOSTS.includes(host))
      errors.push(`${rel}：Amazon以外の外部リンク（購入導線の可能性）があります ${href}`);
  }
}
if (!bundled) errors.push(`クライアントJSに amazonAssociateTag:"${expected}" が見つかりません（ビルド時の環境変数を確認）`);

if (listMode) {
  console.log(JSON.stringify(list));
  process.exit(errors.length ? 1 : 0);
}
console.log(`期待するtag：${expected}`);
console.log(
  `ビルド結果 ${outDir}/：${files.length}ファイル／Amazon URL ${hrefs + rscHrefs + dataUrls}件` +
    `（<a href> ${hrefs}件・RSCのhref ${rscHrefs}件・商品データ ${dataUrls}件）`,
);
errors.slice(0, 50).forEach((e) => console.log("✖ " + e));
if (errors.length > 50) console.log(`…ほか ${errors.length - 50}件`);
console.log(errors.length ? `\nエラー ${errors.length}件。修正してください。` : "\nエラーはありません。");
process.exit(errors.length ? 1 : 0);
