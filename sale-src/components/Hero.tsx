import { saleConfig } from "@/config/saleConfig";
import { companyConfig, disclosure, siteConfig } from "@/config/site";
import { Icon } from "@/components/Icon";
import { GenreBar } from "@/components/GenreBar";
import { buildAmazonUrl } from "@/lib/amazon";
import { assetPath, getSalePeriodLabel } from "@/lib/site";
import type { SiteImage } from "@/lib/images";
import type { GenreNavItem } from "@/lib/nav";
import type { HeroVariant, SiteMode } from "@/types";

/** 写真と読めるHTMLのコピーで構成する、スマホ対応のファーストビュー。 */
export function Hero({ mode, copy, image, imageAlt, banner, bannerAlt = "", genreItems }: {
  mode: SiteMode;
  copy: HeroVariant & { variant: string };
  image: SiteImage | null;
  imageAlt: string;
  banner?: (SiteImage & { small: string }) | null;
  bannerAlt?: string;
  genreItems: GenreNavItem[];
}) {
  const period = getSalePeriodLabel();
  const photo = banner ?? image;
  const alt = banner ? bannerAlt : imageAlt;
  const outbound = mode === "sale" ? buildAmazonUrl(banner ? saleConfig.heroBanner.link : saleConfig.heroImageLink) : null;
  const newTab = siteConfig.amazonOpensInNewTab;
  return (
    <section aria-labelledby="hero-title">
      <div className="bg-paper-warm">
        <div className={`mx-auto max-w-7xl ${photo ? "sm:grid sm:grid-cols-2" : ""}`}>
          <div className="flex flex-col justify-center px-5 pb-6 pt-8 sm:px-8 sm:py-12 lg:px-12">
            <p className="text-[12px] font-bold text-accent">
              {mode === "sale" ? `${saleConfig.saleName}の買い物ガイド${period ? `　${period}` : ""}` : "いつもの買い物チェックに"}
            </p>
            <h1 id="hero-title" className="mt-3 text-[36px] font-bold leading-[1.4] tracking-[0.01em] [text-wrap:balance] [word-break:keep-all] [overflow-wrap:anywhere] lg:text-[48px]">
              {copy.title}
            </h1>
            <p className="mt-4 max-w-xl text-[14px] leading-[1.9] text-ink-soft sm:text-[15px]">{copy.subtitle}</p>
            <a href="#today" data-track="hero_cta_click"
              data-track-params={JSON.stringify({ cta_text: copy.cta, page_position: "hero:cta" })}
              className="mt-5 inline-flex min-h-13 items-center justify-center gap-2 self-start rounded-full bg-cta px-6 text-[14px] font-bold text-white transition hover:bg-cta-strong active:scale-[0.98]">
              {copy.cta}<Icon name="arrow-down" className="h-4 w-4" strokeWidth={2.2} />
            </a>
            <p className="mt-4 text-[11px] leading-relaxed text-muted">
              <span className="mr-1 rounded border border-line px-1 font-bold">{disclosure.prLabel}</span>
              {companyConfig.name}が運営する買い物ガイドです。
            </p>
          </div>
          {photo ? (
            <div className="flex min-w-0 flex-col">
              <img src={assetPath(photo.src)}
                srcSet={banner ? `${assetPath(banner.small)} 800w, ${assetPath(photo.src)} ${photo.width}w` : undefined}
                sizes="(min-width: 1280px) 640px, (min-width: 640px) 50vw, 100vw"
                alt={alt} width={photo.width} height={photo.height} fetchPriority="high"
                className="block aspect-[16/9] w-full object-cover object-right sm:aspect-auto sm:min-h-80 sm:flex-1" />
              {outbound ? (
                <a href={outbound} rel="sponsored nofollow noopener" target={newTab ? "_blank" : undefined}
                  data-track="amazon_click"
                  data-track-params={JSON.stringify({ link_type: banner ? "hero_banner" : "hero_image", section: "hero", page_position: "hero:link" })}
                  className="flex min-h-12 items-center justify-between gap-3 border-t border-line bg-card px-5 py-3 text-[13px] font-bold text-accent hover:bg-accent-soft">
                  {saleConfig.heroImageLinkLabel}<Icon name="external" className="h-4 w-4 shrink-0" strokeWidth={2.2} />
                  {newTab ? <span className="sr-only">（新しいタブで開きます）</span> : null}
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      {genreItems.length ? <GenreBar items={genreItems} newTab={newTab} /> : null}
    </section>
  );
}
