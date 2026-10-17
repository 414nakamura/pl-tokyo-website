import Image from "next/image";
import { ProductGrid } from "@/components/ProductGrid";
import { SectionHeading } from "@/components/SectionHeading";
import { siteImage } from "@/lib/images";
import { toCardData } from "@/lib/products";
import { assetPath } from "@/lib/site";
import type { ResolvedProduct, SceneSection } from "@/types";

const toneClass: Record<SceneSection["tone"], string> = {
  plain: "bg-paper",
  warm: "bg-paper-warm",
  tint: "bg-paper-tint",
};

/**
 * 生活シーン別セクション。写真（sections.ts の image）があれば見出しの上に大きく表示
 * 商品0件ならセクションごと出さない
 */
export function ProductSection({ section, products }: { section: SceneSection; products: ResolvedProduct[] }) {
  if (!products.length) return null;
  const image = siteImage(section.image);
  const pad = section.size === "lg" ? "pb-12" : "pb-10";
  return (
    <section aria-labelledby={`sec-${section.id}`} className={toneClass[section.tone] ?? "bg-paper"}>
      {image ? (
        <div className="mx-auto max-w-5xl sm:px-4 sm:pt-10">
          <Image
            src={assetPath(image.src)}
            alt={section.imageAlt ?? ""}
            width={image.width}
            height={image.height}
            sizes="(max-width: 1024px) 100vw, 1024px"
            loading="lazy"
            className={`w-full object-cover sm:rounded-[var(--radius-card)] aspect-[3/2]`}
          />
        </div>
      ) : null}
      <div className={`mx-auto max-w-5xl px-4 ${image ? "pt-6" : "pt-10"} ${pad}`}>
        <SectionHeading id={`sec-${section.id}`} title={section.title} lead={section.lead} size={section.size} />
        <ProductGrid
          products={products.map(toCardData)}
          section={section.id}
          initialCount={Math.max(1, section.initialCount)}
          variant={section.size === "lg" ? "row" : "compact"}
        />
      </div>
    </section>
  );
}
