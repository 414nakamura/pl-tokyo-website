import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { companyConfig, siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "プライバシーポリシー",
  description: `${siteConfig.siteName}のプライバシーポリシーです。`,
  path: "/privacy/",
});

// TODO: 公開前に法務確認（個人情報保護法・電気通信事業法の外部送信規律への対応内容）
export default function PrivacyPage() {
  return (
    <LegalPage title="プライバシーポリシー" updated="2026年10月17日">
      <p>
        {companyConfig.name}（以下「当社」）は、当社が運営する「{siteConfig.siteName}」（以下「本サイト」）における利用者情報の取り扱いについて、以下のとおり定めます。
      </p>
      <section>
        <h2>1. 取得する情報</h2>
        <ul>
          <li>閲覧したページ、閲覧日時、ブラウザ・端末の種類、参照元などのアクセス情報</li>
          <li>広告・SNS等からの流入元を示すURLパラメータ（utm_source、utm_medium、utm_campaign、utm_content、creative_id）</li>
          <li>本サイト内でのスクロール、カテゴリ選択、商品の表示、外部サイトへのリンククリック等の操作情報</li>
        </ul>
        <p>本サイトでは、氏名・メールアドレス等の個人を直接特定できる情報の入力は求めていません。</p>
      </section>
      <section>
        <h2>2. 利用目的</h2>
        <ul>
          <li>本サイトの利用状況の把握、表示内容・使いやすさの改善</li>
          <li>広告の効果測定、および広告配信の最適化</li>
          <li>不正利用の防止、障害対応</li>
        </ul>
      </section>
      <section>
        <h2>3. Cookie・外部送信について</h2>
        <p>本サイトでは、以下の事業者のサービスを利用しており、Cookie等を通じて利用者の情報がこれらの事業者に送信される場合があります。</p>
        <ul>
          <li>
            Google アナリティクス（Google LLC）：アクセス解析のため。詳細は
            <a href="https://policies.google.com/technologies/partner-sites?hl=ja" target="_blank" rel="noopener noreferrer">
              Googleのポリシー
            </a>
            をご確認ください。
          </li>
          <li>
            Meta ピクセル（Meta Platforms, Inc.）：広告の効果測定・配信最適化のため。詳細は
            <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer">
              Metaのプライバシーポリシー
            </a>
            をご確認ください。
          </li>
          <li>Amazonアソシエイト（アマゾンジャパン合同会社）：紹介料の計測のため（Amazonへ移動した際に、Amazon側でCookieが利用されます）。</li>
        </ul>
        <p>Cookieはブラウザの設定により無効にできます。また、流入元パラメータは利用者のブラウザ内（セッションストレージ等）に一時的に保存されます。</p>
      </section>
      <section>
        <h2>4. 第三者提供</h2>
        <p>法令に基づく場合を除き、取得した情報を本人の同意なく第三者に提供することはありません。</p>
      </section>
      <section>
        <h2>5. 改定</h2>
        <p>本ポリシーは、必要に応じて改定することがあります。改定後の内容は本ページに掲載した時点から効力を生じます。</p>
      </section>
      <section>
        <h2>6. お問い合わせ</h2>
        <p>
          {companyConfig.name}　{companyConfig.contactEmail || companyConfig.contactNote}
        </p>
      </section>
    </LegalPage>
  );
}
