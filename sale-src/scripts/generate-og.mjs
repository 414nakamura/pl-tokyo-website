// OGP画像（1200×630）を生成：セールごとに差し替えたいときに使用
//   node scripts/generate-og.mjs "ブラックフライデー、何買う？" "今チェックしておきたいものをまとめました。" black-friday-2026
//   → public/og/black-friday-2026.png を作成し、config/saleConfig.ts の ogImage に "/og/black-friday-2026.png" を設定
// ※ Chromium が必要です（npx playwright install chromium）
import { existsSync, readFileSync } from "node:fs";
import { chromium } from "playwright-core";

const [title = "買うもの、忘れてない？", sub = "Amazonセールで、今チェックしておきたいものをまとめました。", name = "default"] =
  process.argv.slice(2);
// Hero写真があれば右側に敷く（public/images/hero/hero.webp）
const heroPath = process.env.OG_PHOTO || "public/images/hero/hero.webp";
const photo = existsSync(heroPath) ? `data:image/webp;base64,${readFileSync(heroPath).toString("base64")}` : null;
const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

const html = `<!doctype html><html lang="ja"><meta charset="utf-8"><style>
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#f7f3ec;color:#1c1c1e;position:relative;overflow:hidden;font-family:"Hiragino Sans","Noto Sans CJK JP",sans-serif}
.photo{position:absolute;top:0;right:0;bottom:0;width:${photo ? "560px" : "0"};background:url(${photo ?? ""}) center/cover}
.wrap{position:absolute;top:0;left:0;bottom:0;width:${photo ? "640px" : "1200px"};padding:72px 64px 60px 80px;display:flex;flex-direction:column;justify-content:space-between}
.brand{font-family:"Hiragino Mincho ProN","Noto Serif CJK JP",serif;font-size:30px;font-weight:600;letter-spacing:.04em}
h1{font-family:"Hiragino Mincho ProN","Noto Serif CJK JP",serif;font-size:${photo ? 68 : 84}px;line-height:1.3;font-weight:600;text-wrap:balance;word-break:keep-all}
p{font-size:26px;color:#3a3a3c;margin-top:22px;line-height:1.6}
.foot{font-size:20px;color:#6b6b70}
</style><body>${photo ? '<div class="photo"></div>' : ""}<div class="wrap">
<div class="brand">買い忘れCHECK</div>
<div><h1>${esc(title)}</h1><p>${esc(sub)}</p></div>
<div class="foot">運営：株式会社PUNCHLINE TOKYO　｜　PR</div></div></body></html>`;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.screenshot({ path: `public/og/${name}.png` });
await browser.close();
console.log(`public/og/${name}.png を作成しました`);
