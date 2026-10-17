import Image from "next/image";
import { Icon } from "@/components/Icon";
import type { SiteImage } from "@/lib/images";
import { assetPath } from "@/lib/site";
import type { Category } from "@/types";

/** カテゴリタイルの中身（写真＋名前＋1行説明）。クリック処理は CategoryExplorer 側 */
export function CategoryCardBody({
  category,
  image,
  selected,
}: {
  category: Category;
  image: SiteImage | null;
  selected: boolean;
}) {
  return (
    <>
      <span
        className={`relative block aspect-square overflow-hidden rounded-[12px] bg-paper-warm ${
          selected ? "ring-2 ring-cta ring-offset-2 ring-offset-paper-tint" : ""
        }`}
      >
        {image ? (
          <Image
            src={assetPath(image.src)}
            alt=""
            width={image.width}
            height={image.height}
            sizes="(max-width: 640px) 50vw, 240px"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-accent/70" aria-hidden="true">
            <Icon name={category.icon} className="h-1/3 w-1/3" strokeWidth={1.3} />
          </span>
        )}
        {selected ? (
          <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-cta text-white" aria-hidden="true">
            <Icon name="check" className="h-4 w-4" strokeWidth={2.6} />
          </span>
        ) : null}
      </span>
      <span className="mt-2 block text-[15px] font-bold leading-tight">{category.name}</span>
      <span className="mt-1 block text-[11.5px] leading-snug text-muted">{category.description}</span>
    </>
  );
}
