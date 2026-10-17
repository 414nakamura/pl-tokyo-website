import { CategoryExplorer } from "@/components/CategoryExplorer";
import { SectionHeading } from "@/components/SectionHeading";
import { siteImage, type SiteImage } from "@/lib/images";
import type { CategoryOutbound } from "@/components/CategoryAmazonLink";
import { getCategoryOutbound, getCategoryProducts, toCardData } from "@/lib/products";
import type { Category, ResolvedProduct } from "@/types";

/** 「そういえば、買う予定だったものありませんか？」セクション */
export function CategoryGrid({ categories }: { categories: Category[] }) {
  if (!categories.length) return null;
  // 絞り込み用の商品データ（HTMLを事前に全部描画するより軽い）
  const productsByCategory: Record<string, ResolvedProduct[]> = {};
  const images: Record<string, SiteImage | null> = {};
  const links: Record<string, CategoryOutbound | null> = {};
  for (const c of categories) {
    links[c.id] = getCategoryOutbound(c);
    images[c.id] = siteImage(c.image);
    productsByCategory[c.id] = getCategoryProducts(c.id).map(toCardData);
  }
  return (
    <section id="categories" aria-labelledby="categories-title" className="scroll-mt-12 bg-paper-tint">
      <div className="mx-auto max-w-5xl px-4 pb-12 pt-10">
        <SectionHeading
          id="categories-title"
          kicker="カテゴリから探す"
          title={"そういえば、\n買う予定だったもの\nありませんか？"}
          lead="気になるところをタップすると、すぐ下に商品が出てきます。"
          size="lg"
        />
        <CategoryExplorer categories={categories} productsByCategory={productsByCategory} images={images} links={links} />
      </div>
    </section>
  );
}
