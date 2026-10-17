/**
 * 計測の同意管理（Cookie Consent）の差し込み口
 *
 * MVPでは常に true（同意バナーなし）。
 * 将来CMP（同意管理ツール）を入れる場合は、ここで同意状態を返すように変更するだけで
 * 全イベント送信（lib/analytics.ts）に反映されます。
 * GA4の Consent Mode を使う場合は components/AnalyticsScripts.tsx の gtag('consent', ...) も合わせて設定。
 */
export function hasAnalyticsConsent(): boolean {
  return true;
}
