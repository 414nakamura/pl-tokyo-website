import Script from "next/script";
import { trackingConfig } from "@/config/trackingConfig";

/**
 * GA4 / Meta Pixel の外部スクリプト読み込み
 * - 環境変数（NEXT_PUBLIC_GA4_ID / NEXT_PUBLIC_META_PIXEL_ID）が無ければ何も出力しない
 * - 初期化（gtag config / fbq init）とイベント送信は lib/analytics.ts に集約
 * - page_view は Tracking.tsx から送る（UTM等を付けるため自動送信はOFF）
 *
 * Cookie同意（CMP）を導入する場合：lib/consent.ts が false の間はここも読み込まないよう分岐を追加
 */
export function AnalyticsScripts() {
  const { ga4Id, metaPixelId } = trackingConfig;
  return (
    <>
      {ga4Id ? (
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
      ) : null}
      {metaPixelId ? <Script src="https://connect.facebook.net/en_US/fbevents.js" strategy="afterInteractive" /> : null}
    </>
  );
}
