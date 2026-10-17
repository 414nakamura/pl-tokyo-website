import { AboutLinks } from "@/components/AboutLinks";
import { CategoryGrid } from "@/components/CategoryGrid";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductSection } from "@/components/ProductSection";
import { SectionHeading } from "@/components/SectionHeading";
import { saleConfig } from "@/config/saleConfig";
import { companyConfig, siteConfig } from "@/config/site";
import {
  getCategories,
  getLatestUpdatedAt,
  getNewProducts,
  getSceneProducts,
  getSections,
  getTodayProducts,
  toCardData,
} from "@/lib/products";
import { siteImage } from "@/lib/images";
import { getGenreNavItems } from "@/lib/nav";
import { absoluteUrl, getHeroCopy, getHeroImage, getSiteMode } from "@/lib/site";

/**
 * トップページ（/sale/）
 * Hero → 今日の注目 → 買い忘れカテゴリ → 生活シーン別 → 新しく追加 → リンク説明
 * ページ構成を変えたいときは data/sections.ts と config/saleConfig.ts の experiments で調整
 */
export default function Home() {
  const mode = getSiteMode();
  const copy = getHeroCopy(mode);
  const heroImage = getHeroImage(mode);
  const bannerImg = mode === "sale" ? siteImage(saleConfig.heroBanner?.image) : null;
  const heroBanner = bannerImg ? { ...bannerImg, small: bannerImg.src.replace(/\.webp$/, "-800.webp") } : null;
  const categories = getCategories();
  const today = getTodayProducts();
  const newItems = getNewProducts(4);
  const shown = new Set(today.map((p) => p.id)); // 重複を減らすための表示済みID

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.siteName,
          url: absoluteUrl("/"),
          inLanguage: "ja",
          publisher: { "@type": "Organization", name: companyConfig.name },
        }}
      />
      <Hero
        mode={mode}
        copy={copy}
        image={siteImage(heroImage.src)}
        imageAlt={heroImage.alt}
        banner={heroBanner}
        bannerAlt={saleConfig.heroBanner?.alt}
        genreItems={getGenreNavItems()}
      />
      <FeaturedProducts products={today} latestUpdatedAt={getLatestUpdatedAt()} mode={mode} />
      <CategoryGrid categories={categories} />

      {getSections().map((section) => (
        <ProductSection key={section.id} section={section} products={getSceneProducts(section, shown)} />
      ))}

      {newItems.length ? (
        <section aria-labelledby="new-items" className="border-t border-line">
          <div className="mx-auto max-w-5xl px-4 py-9">
            <SectionHeading id="new-items" kicker="更新" title="最近追加したもの" size="sm" />
            <ProductGrid products={newItems.map(toCardData)} section="new" layout="horizontal" labelledBy="new-items" initialCount={2} variant="compact" />
          </div>
        </section>
      ) : null}

      <AboutLinks />
    </>
  );
}
