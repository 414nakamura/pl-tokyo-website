// ビルド結果（out/）を、企業サイトのリポジトリの sale/ フォルダへ反映する
//   npm run deploy
// このフォルダ（sale-src/）が pl-tokyo-website リポジトリの中にある前提。
// sale/ 以外のファイルには一切触れない。反映後に GitHub Desktop などでコミット＆プッシュすれば公開される。
import { cpSync, existsSync, readFileSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const site = resolve("..");
const cname = resolve(site, "CNAME");
if (!existsSync(cname) || !readFileSync(cname, "utf8").includes("pl-tokyo.com")) {
  console.error("✖ 親フォルダが pl-tokyo-website リポジトリではありません。反映を中止しました。");
  process.exit(1);
}
if (!existsSync("out/index.html")) {
  console.error("✖ out/ がありません。先に next build を実行してください。");
  process.exit(1);
}
const target = resolve(site, "sale");
rmSync(target, { recursive: true, force: true });
cpSync("out", target, { recursive: true });
if (!existsSync(resolve(site, ".nojekyll"))) {
  console.warn("⚠ リポジトリ直下に .nojekyll がありません。_next フォルダが公開されないので作成してください。");
}
console.log("✓ ../sale/ に反映しました。コミットしてプッシュすると https://pl-tokyo.com/sale/ に公開されます。");
