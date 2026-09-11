import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductDetailsView from "@/modules/products/components/ProductDetailsView";
import ProductLeadActions from "@/modules/commerce/components/ProductLeadActions";
import EntityViewTracker from "@/modules/commerce/components/EntityViewTracker";
import DeliveryEstimateWidget from "@/modules/commerce/components/DeliveryEstimateWidget";
import { getProduct, getProducts, safeCatalog } from "@/shared/lib/api/catalog";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await safeCatalog(getProducts(), []);
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await safeCatalog(getProduct(slug), null);

  if (!product) {
    return {
      title: "পণ্য",
      description: "Maaniko পণ্যের বিস্তারিত তথ্য",
    };
  }

  const title = product.name ?? product.name ?? "পণ্য";
  const description = product.description ?? product.description ?? undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: product.images?.[0] ? [{ url: product.images[0] }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;

  const [product, products] = await Promise.all([
    safeCatalog(getProduct(slug), null),
    safeCatalog(getProducts(), []),
  ]);

  if (!product) notFound();

  const relatedProducts = products
    .filter((item) => item.slug !== product.slug)
    .sort((first, second) => {
      const firstMatches = first.category === product.category ? 1 : 0;
      const secondMatches = second.category === product.category ? 1 : 0;
      return secondMatches - firstMatches;
    })
    .slice(0, 6);

  return (
    <>
      <EntityViewTracker entityType="PRODUCT" entityId={product.id} />
      <ProductDetailsView product={product} relatedProducts={relatedProducts} />
      <ProductLeadActions product={product} />
      <DeliveryEstimateWidget productId={product.id} />
    </>
  );
}
