import { SiteLink as Link } from "@/components/SiteLink";

/** 運営会社・ポリシー系ページの共通レイアウト */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-14 pt-5">
      <nav aria-label="パンくず" className="text-[12px] text-muted">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/" className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
              トップ
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page">{title}</li>
        </ol>
      </nav>
      <h1 className="mt-4 text-[26px] font-bold tracking-tight">{title}</h1>
      {updated ? <p className="mt-1 text-[12px] text-muted">最終更新日：{updated}</p> : null}
      <div className="mt-6 space-y-6 text-[14.5px] leading-[1.9] text-ink-soft [&_h2]:mb-2 [&_h2]:text-[17px] [&_h2]:font-bold [&_h2]:text-ink [&_li]:ml-5 [&_li]:list-disc [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4">
        {children}
      </div>
    </div>
  );
}
