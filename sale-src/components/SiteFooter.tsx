import { SiteLink as Link } from "@/components/SiteLink";
import { companyConfig, disclosure, siteConfig } from "@/config/site";

/** /sale/ 専用フッター（企業サイトTOPへのリンクは置かない） */
export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer id="disclosure" className="border-t border-line bg-paper-warm">
      <div className="mx-auto max-w-5xl px-4 pb-24 pt-8 md:pb-10">
        <p className="text-[18px] font-bold">{siteConfig.siteName}</p>
        <p className="mt-1 text-[13px] text-muted">運営：{companyConfig.name}</p>

        <nav aria-label="運営情報" className="mt-5">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-bold text-ink-soft">
            <li>
              <Link href="/company/" className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
                運営会社
              </Link>
            </li>
            <li>
              <Link href="/privacy/" className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
                プライバシーポリシー
              </Link>
            </li>
            <li>
              <Link href="/affiliate-policy/" className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
                アフィリエイトポリシー
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-6 space-y-2 border-t border-line pt-5 text-[11.5px] leading-relaxed text-muted">
          <p>{disclosure.amazonAssociate}</p>
          <p>{disclosure.prText}</p>
          <p>{disclosure.price}</p>
          <p>{disclosure.notOfficial}</p>
        </div>
        <p className="mt-6 text-[11px] text-muted">© {year} PUNCHLINE TOKYO</p>
      </div>
    </footer>
  );
}
