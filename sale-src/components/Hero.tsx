import { saleConfig } from "@/config/saleConfig";
import { companyConfig, disclosure } from "@/config/site";
import { Icon } from "@/components/Icon";
import type { SiteImage } from "@/lib/images";
import { buildAmazonUrl } from "@/lib/amazon";
import { assetPath, getSalePeriodLabel } from "@/lib/site";
import { siteConfig } from "@/config/site";
import type { HeroVariant, SiteMode } from "@/types";
import { GenreBar } from "@/components/GenreBar";
import type { GenreNavItem } from "@/lib/nav";

/**
 * ファーストビュー
 * 1画面で「Amazonセール関連・何のサイトか・見るメリット・次の行動」を伝える
 * 写真（config の heroImage）があれば見出しの下に大きく表示。無ければ文字だけで成立する
 * CTAはサイト内（#today）へスクロール。Amazonへは飛ばさない
 */
export function Hero({
  mode,
  copy,
  image,
  imageAlt,
  banner,
  bannerAlt = "",
  genreItems,
}: {
  mode: SiteMode;
  copy: HeroVariant & { variant: string };
  image: SiteImage | null;
  imageAlt: string;
  /** セール用バナー（横幅100%で一番上に表示）。small はスマホ用の軽い版 */
  banner?: (SiteImage & { small: string }) | null;
  bannerAlt?: string;
  /** ジャンル別ボタン（バナー直下＋スクロール時は画面下に追従） */
  genreItems: GenreNavItem[];
}) {
  const period = getSalePeriodLabel();
  // 写真のリンク（セール中のみ）。押すとAmazonへ移動することを写真の下に明記する
  const imageLink = mode === "sale" ? buildAmazonUrl(saleConfig.heroImageLink) : null;
  const newTab = siteConfig.amazonOpensInNewTab;
  const bannerLink = mode === "sale" && banner ? buildAmazonUrl(saleConfig.heroBanner?.link) : null;
  // バナーがあるときは写真を出さない（大きな画像が2枚続かないように）
  if (bannerLink) image = null;
  return (
    <section aria-labelledby="hero-title">
      {banner && bannerLink ? (
        <a
          href={bannerLink}
          rel="sponsored nofollow noopener"
          target={newTab ? "_blank" : undefined}
          data-track="amazon_click"
          data-track-params={JSON.stringify({ link_type: "hero_banner", section: "hero", page_position: "hero:banner" })}
          className="block w-full transition active:opacity-90"
        >
          {/* 横幅100%。文字入りの画像なので切り抜かず、元の比率のまま表示 */}
          <img
            src={assetPath(banner.src)}
            srcSet={`${assetPath(banner.small)} 800w, ${assetPath(banner.src)} ${banner.width}w`}
            sizes="100vw"
            alt={bannerAlt}
            width={banner.width}
            height={banner.height}
            fetchPriority="high"
            className="block h-auto w-full"
          />
          {newTab ? <span className="sr-only">（Amazonのセール会場を新しいタブで開きます）</span> : null}
        </a>
      ) : null}
      {genreItems.length ? <GenreBar items={genreItems} newTab={newTab} /> : null}
      <div className="mx-auto max-w-5xl px-4 pt-5 sm:pt-10">
        <p className="text-[12px] font-bold text-accent">
          {mode === "sale" ? `${saleConfig.saleName} 開催中${period ? `　${period}` : ""}` : "いつもの買い物チェックに"}
        </p>
        <h1
          id="hero-title"
          className="mt-2 text-[34px] font-bold leading-[1.3] tracking-[0.01em] [text-wrap:balance] [word-break:keep-all] [overflow-wrap:anywhere] sm:text-[48px]"
        >
          {copy.title}
        </h1>
        <p className="mt-2.5 max-w-xl text-[14.5px] leading-[1.8] text-ink-soft sm:text-[16px]">{copy.subtitle}</p>
      </div>

      {image ? (
        <div className="mt-4 w-full">
          {imageLink ? (
            <a
              href={imageLink}
              rel="sponsored nofollow noopener"
              target={newTab ? "_blank" : undefined}
              data-track="amazon_click"
              data-track-params={JSON.stringify({ link_type: "hero_image", section: "hero", page_position: "hero:image" })}
              className="group block w-full"
            >
              <img
                src={assetPath(image.src)}
                alt={imageAlt}
                width={image.width}
                height={image.height}
                fetchPriority="high"
                className="block aspect-[3/2] w-full object-cover transition group-active:opacity-90"
              />
              <span className="flex min-h-11 items-center justify-between gap-2 bg-cta px-4 text-[13.5px] font-bold text-white">
                <span>{saleConfig.heroImageLinkLabel}</span>
                <Icon name="external" className="h-4 w-4 text-white/75" strokeWidth={2.2} />
                {newTab ? <span className="sr-only">（Amazonのページを新しいタブで開きます）</span> : null}
              </span>
            </a>
          ) : (
            <img
              src={assetPath(image.src)}
              alt={imageAlt}
              width={image.width}
              height={image.height}
              fetchPriority="high"
              className="block aspect-[3/2] w-full object-cover"
            />
          )}
        </div>
      ) : null}

      <div className="mx-auto max-w-5xl px-4 pb-8">
        <a
          href="#today"
          data-track="hero_cta_click"
          data-track-params={JSON.stringify({ cta_text: copy.cta, page_position: "hero:cta" })}
          className="mt-4 flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-cta px-6 text-[15.5px] font-bold text-white transition active:scale-[0.98] sm:inline-flex sm:w-auto"
        >
          {copy.cta}
          <Icon name="arrow-down" className="h-4 w-4" strokeWidth={2.2} />
        </a>


        <p className="mt-4 text-[11px] leading-relaxed text-muted">
          <span className="mr-1 rounded border border-line px-1 font-bold">{disclosure.prLabel}</span>
          {companyConfig.name}が運営する買い物ガイドです。商品リンクにはアフィリエイトを含みます。
        </p>
      </div>
    </section>
  );
}
