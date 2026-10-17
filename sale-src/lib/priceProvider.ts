import type { Product } from "@/types";

/**
 * 価格取得の差し込み口（将来：Amazon Creators API）
 *
 * PA-API 5.0 は非推奨となり、後継の Creators API への移行が必要です。
 * 実装する場合は、ビルド時にこの関数で価格を取得し、
 * priceSource: "api" と priceFetchedAt（取得日時）を必ずセットしてください。
 * 価格を表示する場合は、取得日時をそばに併記する必要があります（ProductCard で自動表示）。
 *
 * TODO: Amazon最新規約を確認してから実装（Creators API の利用条件・キャッシュ期間・表示要件）
 */
export async function enrichPrices(products: Product[]): Promise<Product[]> {
  return products;
}
