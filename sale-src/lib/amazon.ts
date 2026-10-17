import { siteConfig } from "@/config/site";

/**
 * Amazonリンクの組み立て（コンポーネントにAmazonのURLを直接書かず、必ずここを通す）
 *
 * - 許可したAmazonドメイン以外のURLは無効（null）にする
 * - アソシエイトIDが設定されていれば tag= を付与
 * - 流入元（UTM等）による分岐は行わない。全ユーザーに同じリンクを出す
 *
 * TODO: Amazon最新規約を確認してから実装（リンク形式・短縮URLの扱い）
 */
const ALLOWED_HOSTS = ["www.amazon.co.jp", "amazon.co.jp", "amzn.asia", "amzn.to"];

export function buildAmazonUrl(rawUrl: string | undefined | null): string | null {
  if (!rawUrl) return null;
  let url: URL;
  try {
    url = new URL(rawUrl.trim());
  } catch {
    return null;
  }
  if (url.protocol !== "https:" || !ALLOWED_HOSTS.includes(url.hostname)) return null;

  const tag = siteConfig.amazonAssociateTag;
  const isShortLink = url.hostname === "amzn.asia" || url.hostname === "amzn.to";
  // 短縮リンクは作成時点でタグが含まれているため、そのまま使う
  if (tag && !isShortLink && !url.searchParams.has("tag")) {
    url.searchParams.set("tag", tag);
  }
  return url.toString();
}
