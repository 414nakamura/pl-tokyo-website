import type { AnchorHTMLAttributes } from "react";
import { siteConfig } from "@/config/site";

/**
 * /sale/ 内のリンク（通常の <a>。basePath を自動で付ける）
 * GitHub Pages では「_」で始まるファイル（Next.js の画面遷移用データ）が公開されないため、
 * next/link のクライアント遷移を使わず、通常のページ遷移にしている（静的サイトなので体感差はほぼない）
 */
export function SiteLink({ href, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const full = href.startsWith("/") ? `${siteConfig.basePath}${href}` : href;
  return <a href={full} {...rest} />;
}
