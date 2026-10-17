import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { imageSize } from "image-size";

/**
 * public/ 配下の画像を、ビルド時に存在確認＋サイズ取得する（サーバー専用）
 * - ファイルが無ければ null（画面側はプレースホルダー表示 or 非表示になり、崩れない）
 * - width / height を返すので、レイアウトシフト（CLS）が起きない
 */
export type SiteImage = { src: string; width: number; height: number };

const cache = new Map<string, SiteImage | null>();

export function siteImage(path: string | undefined | null): SiteImage | null {
  if (!path) return null;
  if (cache.has(path)) return cache.get(path)!;
  let result: SiteImage | null = null;
  try {
    const file = join(process.cwd(), "public", path.replace(/^\//, ""));
    if (existsSync(file)) {
      const dim = imageSize(readFileSync(file));
      if (dim.width && dim.height) result = { src: path, width: dim.width, height: dim.height };
    }
  } catch {
    result = null;
  }
  cache.set(path, result);
  return result;
}
