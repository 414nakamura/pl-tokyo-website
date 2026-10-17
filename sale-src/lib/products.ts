import { experiments } from "@/config/saleConfig";
import { campaignProducts } from "@/data/campaignProducts";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { sections } from "@/data/sections";
import { buildAmazonUrl } from "@/lib/amazon";
import { getActiveCampaignId, getSiteMode } from "@/lib/site";
import type { CampaignProduct, Category, Product, ResolvedProduct, SceneSection } from "@/types";

/* =========================================================
 * 商品の選定ロジック
 * データが欠けていても（画像なし・URLなし・0件など）落ちないように作っています
 * ========================================================= */

const DEFAULT_PRIORITY = 50;

function campaignEntries(campaignId: string): Map<string, CampaignProduct> {
  const map = new Map<string, CampaignProduct>();
  for (const entry of campaignProducts) {
    if (entry.campaignId === campaignId) map.set(entry.productId, entry);
  }
  return map;
}

function resolve(product: Product, entry?: CampaignProduct): ResolvedProduct {
  const cat = categories.find((c) => c.id === product.category);
  return {
    categoryName: cat?.name ?? "その他",
    categoryIcon: cat?.icon ?? "box",
    ...product,
    tags: Array.isArray(product.tags) ? product.tags : [],
    target: Array.isArray(product.target) ? product.target : [],
    scenes: Array.isArray(product.scenes) ? product.scenes : [],
    priority: entry?.priority ?? product.basePriority ?? DEFAULT_PRIORITY,
    featured: entry?.featured ?? false,
    campaignComment: entry?.campaignComment,
    reason: entry?.recommendationReasonOverride || product.recommendationReason || "",
    outboundUrl: buildAmazonUrl(product.amazonUrl),
  };
}

/** ブラウザへ渡す商品データを軽くする（カード表示に不要な項目を除く） */
export function toCardData(p: ResolvedProduct): ResolvedProduct {
  const { description: _d, asin: _a, basePriority: _b, recommendationReason: _r, ...rest } = p;
  return rest as ResolvedProduct;
}

const byPriority = (a: ResolvedProduct, b: ResolvedProduct) => b.priority - a.priority;
const time = (iso?: string | null) => (iso ? new Date(iso).getTime() || 0 : 0);

/** 表示対象の全商品（非表示・キャンペーン非表示を除外、優先度順） */
export function getAllProducts(campaignId = getActiveCampaignId()): ResolvedProduct[] {
  const entries = campaignEntries(campaignId);
  return products
    .filter((p) => p && p.id && p.name && !p.hidden && !entries.get(p.id)?.hidden)
    .map((p) => resolve(p, entries.get(p.id)))
    .sort(byPriority);
}

/** 今日の注目（featured / section:"today"）。0件なら優先度上位で自動補完 */
export function getTodayProducts(campaignId = getActiveCampaignId()): ResolvedProduct[] {
  const all = getAllProducts(campaignId);
  const entries = campaignEntries(campaignId);
  let picked = all.filter((p) => p.featured || entries.get(p.id)?.section === "today");
  if (picked.length === 0) picked = all.slice(0, experiments.todayCount);
  if (experiments.todayOrder === "updated") {
    picked = [...picked].sort((a, b) => time(b.updatedAt) - time(a.updatedAt) || byPriority(a, b));
  }
  return picked.slice(0, Math.max(1, experiments.todayCount));
}

/**
 * 生活シーン別。すでに上のセクション（今日の注目など）に出た商品は後ろへ回し、
 * スクロールしても同じ商品ばかり並ばないようにする
 * @param alreadyShown 上のセクションで表示済みの商品ID（呼び出し側で更新していく）
 */
export function getSceneProducts(
  section: SceneSection,
  alreadyShown: Set<string> = new Set(getTodayProducts().map((p) => p.id)),
  campaignId = getActiveCampaignId(),
): ResolvedProduct[] {
  const entries = campaignEntries(campaignId);
  const list = getAllProducts(campaignId)
    .filter((p) => p.scenes.includes(section.id) || entries.get(p.id)?.section === section.id)
    .sort((a, b) => Number(alreadyShown.has(a.id)) - Number(alreadyShown.has(b.id)) || byPriority(a, b))
    .slice(0, section.maxCount ?? 8);
  // 最初に見える件数分だけ「表示済み」にする（もっと見るの中は重複してもよい）
  list.slice(0, section.initialCount).forEach((p) => alreadyShown.add(p.id));
  return list;
}

export function getCategoryProducts(categoryId: string, campaignId = getActiveCampaignId()): ResolvedProduct[] {
  return getAllProducts(campaignId).filter((p) => p.category === categoryId);
}

/** 新しく追加（addedAt が新しい順） */
export function getNewProducts(limit = 4, campaignId = getActiveCampaignId()): ResolvedProduct[] {
  return getAllProducts(campaignId)
    .filter((p) => p.addedAt)
    .sort((a, b) => time(b.addedAt) - time(a.addedAt) || byPriority(a, b))
    .slice(0, limit);
}

/** 最終更新日時（ページ上の「更新」表示用） */
export function getLatestUpdatedAt(campaignId = getActiveCampaignId()): string | null {
  const times = getAllProducts(campaignId)
    .map((p) => p.updatedAt)
    .filter((v): v is string => !!v && time(v) > 0)
    .sort((a, b) => time(b) - time(a));
  return times[0] ?? null;
}

function applyOrder<T extends { id: string; order: number }>(items: T[], order: string[]): T[] {
  const sorted = [...items].sort((a, b) => a.order - b.order);
  if (!order.length) return sorted;
  const idx = (id: string) => {
    const i = order.indexOf(id);
    return i === -1 ? Number.MAX_SAFE_INTEGER : i;
  };
  return sorted.sort((a, b) => idx(a.id) - idx(b.id) || a.order - b.order);
}

export function getCategories(): Category[] {
  return applyOrder(
    categories.filter((c) => c && c.id && !c.hidden),
    experiments.categoryOrder,
  );
}

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id && !c.hidden);
}

export function getSections(): SceneSection[] {
  return applyOrder(
    sections.filter((s) => s && s.id && !s.hidden),
    experiments.sectionOrder,
  );
}

/** カテゴリIDから名前（未登録のIDでも落ちない） */
export function categoryName(id: string): string {
  return getCategory(id)?.name ?? "その他";
}

/**
 * カテゴリ全体のAmazonリンク（セール中は saleAmazonUrl を優先、無ければ amazonUrl）
 * どちらも無い・Amazon以外のURLなら null（ボタンを出さない）
 */
export function getCategoryOutbound(c: Category, mode = getSiteMode()): { url: string; label: string; isSale: boolean } | null {
  const saleUrl = mode === "sale" ? buildAmazonUrl(c.saleAmazonUrl) : null;
  if (saleUrl) return { url: saleUrl, label: `${c.shortName ?? c.name}のセール会場をAmazonで見る`, isSale: true };
  const url = buildAmazonUrl(c.amazonUrl);
  if (url) return { url, label: `Amazonで${c.shortName ?? c.name}をもっと見る`, isSale: false };
  return null;
}
