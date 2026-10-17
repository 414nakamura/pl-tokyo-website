import { GenreLink } from "@/components/GenreLink";
import { MobileMenu } from "@/components/MobileMenu";
import { SiteLink as Link } from "@/components/SiteLink";
import { disclosure, siteConfig } from "@/config/site";
import { getGenreNavItems } from "@/lib/nav";

/**
 * /sale/ 専用ヘッダー（企業サイトのヘッダー・ナビは使わない）
 * - PC：ロゴの下にジャンル別のグローバルナビ
 * - スマホ：ハンバーガーメニュー
 * ロゴは /sale/ トップへ（企業サイトTOPへはリンクしない）
 */
export function SiteHeader() {
  const items = getGenreNavItems();
  const newTab = siteConfig.amazonOpensInNewTab;
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <div className="mx-auto flex h-13 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex min-h-11 min-w-0 items-center gap-2 whitespace-nowrap" aria-label={`${siteConfig.siteName} トップ`}>
          <span className="text-[17px] font-bold tracking-wide">{siteConfig.siteName}</span>
          <span className="hidden text-[12px] text-muted min-[440px]:inline">{siteConfig.siteTagline}</span>
        </Link>
        <div className="flex shrink-0 items-center whitespace-nowrap">
          <Link
            href="/affiliate-policy/"
            className="flex min-h-11 min-w-11 items-center justify-center"
            title={disclosure.prText}
            aria-label={`${disclosure.prLabel}：${disclosure.prText}`}
          >
            <span className="rounded border border-line px-1.5 text-[11px] font-bold leading-5 text-muted">{disclosure.prLabel}</span>
          </Link>
          <MobileMenu items={items} newTab={newTab} basePath={siteConfig.basePath} />
        </div>
      </div>

      {/* PC用グローバルナビ */}
      <nav aria-label="グローバルナビ" className="hidden border-t border-line md:block">
        <ul className="mx-auto flex max-w-5xl items-center justify-between px-2">
          {items.map((item) => (
            <li key={item.id}>
              <GenreLink
                item={item}
                position="global_nav"
                newTab={newTab}
                className="flex min-h-11 items-center gap-1 px-2.5 text-[13px] font-bold text-ink-soft transition hover:text-accent"
              >
                {item.label}
              </GenreLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
