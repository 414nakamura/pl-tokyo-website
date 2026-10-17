import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { companyConfig, siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "運営会社",
  description: `${siteConfig.siteName}の運営会社情報です。`,
  path: "/company/",
});

export default function CompanyPage() {
  const rows: [string, string][] = [
    ["メディア名", siteConfig.siteName],
    ["運営会社", `${companyConfig.name}（${companyConfig.nameEn}）`],
    ["代表者", companyConfig.representative],
    ["所在地", companyConfig.address],
    ["事業内容", companyConfig.business.join("／")],
    ["お問い合わせ", companyConfig.contactEmail || companyConfig.contactNote],
  ].filter(([, v]) => !!v) as [string, string][];
  return (
    <LegalPage title="運営会社">
      <p>{companyConfig.mediaDescription}</p>
      <dl className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[7.5em_1fr] gap-3 px-4 py-3 text-[14px]">
            <dt className="font-bold text-ink">{k}</dt>
            <dd className="break-words">{v}</dd>
          </div>
        ))}
      </dl>
    </LegalPage>
  );
}
