import Image from "next/image";
import { Icon } from "@/components/Icon";
import { assetPath } from "@/lib/site";

/**
 * 商品画像（白背景の商品写真を想定）。画像が無い場合はカテゴリアイコン
 * width/height を固定してレイアウトシフトを防ぐ
 * TODO: Amazon最新規約を確認してから実装（Amazon画像はAPI/SiteStripeのURLをそのまま表示し、保存・加工しない）
 */
export function ProductImage({
  src,
  alt,
  icon,
  size,
  priority = false,
  fit = "contain",
  className = "",
}: {
  src?: string;
  alt: string;
  icon: string;
  /** 表示サイズ（px）。fill=true のときは親要素いっぱい */
  size: number | "fill";
  priority?: boolean;
  fit?: "contain" | "cover";
  className?: string;
}) {
  const box = size === "fill" ? { width: "100%", height: "100%" } : { width: size, height: size };
  const px = size === "fill" ? 480 : size;
  return (
    <div className={`relative shrink-0 overflow-hidden bg-white ${className}`} style={box}>
      {src ? (
        <Image
          src={assetPath(src)}
          alt={alt}
          width={px}
          height={px}
          sizes={size === "fill" ? "(max-width: 640px) 100vw, 480px" : `${px}px`}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          className={fit === "cover" ? "h-full w-full object-cover" : "h-full w-full object-contain p-2"}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-paper-tint text-accent/70" aria-hidden="true">
          <Icon name={icon} className="h-2/5 w-2/5" strokeWidth={1.3} />
        </div>
      )}
    </div>
  );
}
