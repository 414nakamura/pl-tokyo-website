import type { Metadata } from "next";
import Image from "next/image";
import { SiteLink as Link } from "@/components/SiteLink";
import { notFound } from "next/navigation";
import { Icon } from "@/components/Icon";
import { JsonLd } from "@/components/JsonLd";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryAmazonLink } from "@/components/CategoryAmazonLink";
import { getCategories, getCategory, getCategoryOutbound, getCategoryProducts, toCardData } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";
import { siteImage } from "@/lib/images";
import { absoluteUrl, assetPath } from "@/lib/site";

/** カテゴリページ（/sale/category/{id}/）。categories.ts にカテゴリを足すと自動で生成される */
export const dynamicParams = false;

export function generateStaticParams() {
  return getCategories().map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const c = getCategory(id);
  if (!c) return {};
  return pageMetadata({
    title: `${c.name}の買い忘れチェック`,
    description: `${c.description} 生活の中で必要な${c.name}を、おすすめ理由つきでまとめています。`,
    path: `/category/${c.id}/`,
  });
}

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = getCategory(id);
  if (!category) notFound();
  const items = getCategoryProducts(category.id);
  const others = getCategories().filter((c) => c.id !== category.id);
  const catImage = siteImage(category.image);
  const outbound = getCategoryOutbound(category);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "トップ", item: absoluteUrl("/") },
            { "@type": "ListItem", position: 2, name: category.name, item: absoluteUrl(`/category/${category.id}/`) },
          ],
        }}
      />
      <div className="mx-auto max-w-5xl px-4 pb-12 pt-5">
        <nav aria-label="パンくず" className="text-[12px] text-muted">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link href="/" className="inline-flex min-h-11 items-center underline-offset-4 hover:underline">
                トップ
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{category.name}</li>
          </ol>
        </nav>

        {catImage ? (
          <Image
            src={assetPath(catImage.src)}
            alt=""
            width={catImage.width}
            height={catImage.height}
            sizes="(max-width: 1024px) 100vw, 1024px"
            priority
            className="-mx-4 mt-4 aspect-[2/1] w-[calc(100%+2rem)] max-w-none object-cover sm:mx-0 sm:w-full sm:rounded-[var(--radius-card)]"
          />
        ) : null}
        <header className="mt-5 flex items-start gap-3">
          <div>
            <h1 className="text-[28px] font-bold leading-tight">{category.name}</h1>
            <p className="mt-1 text-[14px] text-muted">{category.description}</p>
          </div>
        </header>

        <div className="mt-6">
          <ProductGrid products={items.map(toCardData)} section={`category_page_${category.id}`} initialCount={6} variant="row" priorityImages={2} />
        </div>

        {outbound ? (
          <div className="mt-6">
            <CategoryAmazonLink categoryId={category.id} link={outbound} section={`category_page_${category.id}`} />
          </div>
        ) : null}

        <section aria-labelledby="other-cats" className="mt-12">
          <h2 id="other-cats" className="text-[19px] font-bold">
            ほかのカテゴリもチェック
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {others.map((c) => (
              <li key={c.id}>
                <Link
                  href={`/category/${c.id}/`}
                  data-track="category_click"
                  data-track-params={JSON.stringify({ category: c.id, page_position: `category_page_others`, source: "category_page" })}
                  className="flex min-h-10 items-center gap-1.5 rounded-full border border-line bg-card px-3.5 text-[13px] font-bold text-ink-soft"
                >
                  <Icon name={c.icon} className="h-4 w-4 text-accent" />
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
