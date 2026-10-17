import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { companyConfig, disclosure, siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "アフィリエイトポリシー",
  description: `${siteConfig.siteName}のアフィリエイトポリシー（広告表記）です。`,
  path: "/affiliate-policy/",
});

// TODO: Amazon最新規約を確認してから実装（開示文言・表示位置を公開前に再確認）
export default function AffiliatePolicyPage() {
  return (
    <LegalPage title="アフィリエイトポリシー" updated="2026年10月17日">
      <section>
        <h2>広告の表示について</h2>
        <p>{disclosure.prText}</p>
        <p className="rounded-2xl border border-line bg-card p-4 font-bold text-ink">{disclosure.amazonAssociate}</p>
      </section>
      <section>
        <h2>商品の選び方</h2>
        <p>
          本サイトは、セールをきっかけに「もともと買う予定だったもの」を思い出してもらうことを目的に、生活シーン（毎日使うもの、子育て家庭、ペットのいる家庭など）ごとに商品を紹介しています。掲載の順番は、季節・セールの内容・利用状況などをもとに{companyConfig.name}が編集方針に基づいて決めています。
        </p>
      </section>
      <section>
        <h2>価格・在庫について</h2>
        <p>{disclosure.price}</p>
        <p>本サイトでは、正確性を確認できない価格や割引率は表示していません。</p>
      </section>
      <section>
        <h2>Amazonとの関係について</h2>
        <p>{disclosure.notOfficial}</p>
        <p>「Amazonで確認する」ボタンを押した場合のみ、Amazonの商品ページへ移動します。自動でAmazonへ移動することはありません。</p>
      </section>
      <section>
        <h2>運営者</h2>
        <p>{companyConfig.name}</p>
      </section>
    </LegalPage>
  );
}
