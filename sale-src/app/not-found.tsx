import { SiteLink as Link } from "@/components/SiteLink";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="text-[13px] font-bold text-accent">404</p>
      <h1 className="mt-2 text-[22px] font-bold">ページが見つかりませんでした</h1>
      <p className="mt-2 text-[14px] text-muted">URLが変わったか、ページが削除された可能性があります。</p>
      <Link href="/" className="mt-6 inline-flex min-h-12 items-center rounded-full bg-cta px-6 text-[15px] font-bold text-white">
        トップへ戻る
      </Link>
    </div>
  );
}
