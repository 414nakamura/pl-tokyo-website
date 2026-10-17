import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { formatJstDateTime } from "@/lib/format";
import { toCardData } from "@/lib/products";
import type { ResolvedProduct, SiteMode } from "@/types";

/** 今日の注目（FV直下。1件目を大きく、残りは番号つきのリストで） */
export function FeaturedProducts({
  products,
  latestUpdatedAt,
  mode,
}: {
  products: ResolvedProduct[];
  latestUpdatedAt: string | null;
  mode: SiteMode;
}) {
  if (!products.length) return null;
  const updated = formatJstDateTime(latestUpdatedAt);
  return (
    <section id="today" aria-labelledby="today-title" className="mx-auto max-w-5xl scroll-mt-14 border-t border-line px-4 pb-12 pt-8">
      <SectionHeading
        id="today-title"
        kicker={mode === "sale" ? "セール中に見ておきたい" : "いま見ておきたい"}
        title="今日の注目"
        meta={updated ? `${updated} 更新` : undefined}
        size="lg"
      />
      <ProductGrid
        products={products.map(toCardData)}
        section="today"
        initialCount={products.length}
        variant="row"
        numbered
        featureFirst
        priorityImages={1}
      />
    </section>
  );
}
