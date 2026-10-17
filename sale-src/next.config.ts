import type { NextConfig } from "next";

/**
 * 公開URL: https://pl-tokyo.com/sale/
 * - basePath "/sale" で全ての内部リンク・アセットが /sale/ 配下になる
 * - output "export" で out/ に静的HTMLを書き出し、既存サーバーの /sale/ ディレクトリへ置くだけで公開できる
 *   （既存の企業サイトのファイル・設定には一切触れない）
 * - Vercel等のNode環境で動かす場合は NEXT_OUTPUT=standalone を指定
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/sale";
const isExport = (process.env.NEXT_OUTPUT ?? "export") === "export";

const nextConfig: NextConfig = {
  basePath,
  trailingSlash: true,
  ...(isExport ? { output: "export" as const } : {}),
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // 静的書き出しでは画像最適化サーバーが使えないため unoptimized。
    // Amazonの商品画像は加工・キャッシュせずにそのまま表示する必要があるため、どちらの環境でもこの設定を推奨。
    // TODO: Amazon最新規約を確認してから実装（Creators API の画像URL利用条件）
    unoptimized: true,
  },
};

export default nextConfig;
