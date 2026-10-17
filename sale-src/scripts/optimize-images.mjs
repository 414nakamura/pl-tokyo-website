// ChatGPT等で作った画像（PNG/JPEG）を、Web用のWebPに変換して所定の場所へ置く
//   1. images-src/ に画像を入れる（ファイル名は docs/IMAGE_PROMPTS.md のとおり）
//   2. npm run images
//   → public/images/hero/ , categories/ , scenes/ に .webp が作られる
import { mkdirSync, readdirSync } from "node:fs";
import { basename, extname, join } from "node:path";
import sharp from "sharp";

const SRC = "images-src";
const rules = [
  { test: /^hero/, dir: "hero", width: 1672, quality: 80 },
  { test: /^cat-/, dir: "categories", width: 720, quality: 76, square: true },
  { test: /^scene-/, dir: "scenes", width: 1200, quality: 70 },
  { test: /^item-/, dir: "products", width: 640, quality: 74, square: true },
];

let count = 0;
for (const file of readdirSync(SRC)) {
  if (!/\.(png|jpe?g|webp)$/i.test(file)) continue;
  const name = basename(file, extname(file));
  const rule = rules.find((r) => r.test.test(name));
  if (!rule) {
    console.log(`スキップ（名前が対象外）: ${file}`);
    continue;
  }
  const outDir = join("public/images", rule.dir);
  mkdirSync(outDir, { recursive: true });
  let img = sharp(join(SRC, file)).rotate();
  img = rule.square
    ? img.resize(rule.width, rule.width, { fit: "cover" })
    : img.resize({ width: rule.width, withoutEnlargement: true });
  const out = join(outDir, `${name}.webp`);
  const info = await img.webp({ quality: rule.quality }).toFile(out);
  console.log(`✓ ${out}（${info.width}×${info.height}, ${Math.round(info.size / 1024)}KB）`);
  // Hero はスマホ用の軽い版（幅800px）も作る（name-800.webp）
  if (rule.dir === "hero") {
    const small = join(outDir, `${name}-800.webp`);
    const si = await sharp(join(SRC, file)).rotate().resize({ width: 800, withoutEnlargement: true }).webp({ quality: rule.quality }).toFile(small);
    console.log(`✓ ${small}（${si.width}×${si.height}, ${Math.round(si.size / 1024)}KB）`);
  }
  count++;
}
console.log(count ? `\n${count}枚を変換しました。` : "images-src/ に画像がありません。");
