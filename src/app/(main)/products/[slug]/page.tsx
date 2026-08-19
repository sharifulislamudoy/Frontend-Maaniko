import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetailsView from "@/components/product/ProductDetailsView";
import { fakeProducts } from "@/data/fakeProducts";
import { productDetailsBySlug } from "@/data/productDetails";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Array.from(new Set(fakeProducts.map((product) => product.slug))).map(
    (slug) => ({ slug }),
  );
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = fakeProducts.find((item) => item.slug === slug);

  if (!product) return { title: "Product" };

  return {
    title: product.name.en ?? product.name.bn ?? "Product",
    description: product.description.en ?? product.description.bn ?? undefined,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const baseProduct = fakeProducts.find((item) => item.slug === slug);

  if (!baseProduct) notFound();

  const product = {
    ...baseProduct,
    details: productDetailsBySlug[baseProduct.slug],
  };

  const relatedProducts = [...fakeProducts]
    .filter((item) => item.slug !== product.slug)
    .sort((first, second) => {
      const firstMatches = first.category.en === product.category.en ? 1 : 0;
      const secondMatches = second.category.en === product.category.en ? 1 : 0;
      return secondMatches - firstMatches;
    })
    .slice(0, 6);

  return (
    <ProductDetailsView
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
