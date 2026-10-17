import { SiteLink as Link } from "@/components/SiteLink";
import { siteConfig } from "@/config/site";

/** Amazonリンクについての短い説明（信頼性の担保。下部に配置） */
export function AboutLinks() {
  return (
    <section aria-labelledby="about-links" className="mx-auto max-w-5xl px-4 py-10">
      <div className="border-t border-ink/15 pt-6">
        <h2 id="about-links" className="text-[19px] font-bold">
          Amazonへのリンクについて
        </h2>
        <ul className="mt-3 space-y-2 text-[13.5px] leading-relaxed text-ink-soft">
          <li>・「Amazonで確認する」を押した時だけ、Amazonの商品ページ{siteConfig.amazonOpensInNewTab ? "が新しいタブで開きます" : "へ移動します"}。</li>
          <li>・価格・在庫・セール対象かどうかは変わることがあるため、当サイトでは価格を断定せず、Amazonでの確認をおすすめしています。</li>
          <li>・商品リンクにはアフィリエイトを含みます。紹介料はサイト運営に使われ、購入価格が上がることはありません。</li>
        </ul>
        <p className="mt-4 text-[13px]">
          <Link href="/affiliate-policy/" className="inline-flex min-h-11 items-center font-bold text-accent underline underline-offset-4">
            アフィリエイトポリシーを見る
          </Link>
        </p>
      </div>
    </section>
  );
}
