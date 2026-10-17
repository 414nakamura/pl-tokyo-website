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
 * 生活シーン別セクション。写真は全幅の見出し背景に薄く敷き、独立した高さを持たせない
 * 商品0件ならセクションごと出さない
 */
export function ProductSection({ section, products }: { section: SceneSection; products: ResolvedProduct[] }) {
  if (!products.length) return null;
  const image = siteImage(section.image);
  const pad = section.size === "lg" ? "pb-12" : "pb-10";
  return (
    <section aria-labelledby={`sec-${section.id}`} className={toneClass[section.tone] ?? "bg-paper"}>
      <div className="relative isolate overflow-hidden border-y border-line/60">
        {image ? (
          <Image
            src={assetPath(image.src)}
            alt=""
            aria-hidden="true"
            width={image.width}
            height={image.height}
            sizes="100vw"
            loading="lazy"
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-15"
          />
        ) : null}
        <div className="mx-auto max-w-5xl px-4 py-6 sm:py-8 [&>div]:mb-0">
          <SectionHeading id={`sec-${section.id}`} title={section.title} lead={section.lead} size={section.size} />
        </div>
      </div>
      <div className={`mx-auto max-w-5xl px-4 pt-5 ${pad}`}>
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
