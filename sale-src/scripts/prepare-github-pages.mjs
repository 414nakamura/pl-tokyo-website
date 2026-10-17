// GitHub Pages（pl-tokyo.com）公開用のファイルを作る
//   npm run deploy:prepare → deploy/sale/ ができる
// これを pl-tokyo-website リポジトリの sale/ フォルダにそのままコピーして push すれば公開される
//
// 注意：Next.js は "_next" フォルダを使うため、リポジトリ直下に空の .nojekyll ファイルが必要
//      （GitHub Pages の Jekyll は「_」で始まるフォルダを公開しないため）。
//      既存サイトは素のHTMLのみで Jekyll の機能を使っていないので、表示への影響はない。
import { cpSync, existsSync, rmSync } from "node:fs";

const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "/sale";
rmSync("deploy", { recursive: true, force: true });
cpSync("out", "deploy" + base, { recursive: true });
if (!existsSync(`deploy${base}/index.html`)) process.exit(1);
console.log(`✓ deploy${base} を作成しました`);
