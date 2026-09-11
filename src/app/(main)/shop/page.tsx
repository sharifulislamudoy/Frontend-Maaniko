import type { Metadata } from "next";

import ShopPageContent from "@/modules/shop/components/ShopPageContent";
import {
  getBanners,
  getJourneys,
  getProducts,
  safeCatalog,
} from "@/shared/lib/api/catalog";

export const metadata: Metadata = {
  title: "শপ",
  description:
    "গর্ভাবস্থা, নবজাতক, ফিডিং, গোসল, প্রসব-পরবর্তী যত্ন ও নিরাপত্তার প্রয়োজনীয় পণ্য কিনুন।",
};

type ShopPageProps = {
  searchParams: Promise<{
    journey?: string | string[];
  }>;
};

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const params = await searchParams;
  const initialJourney = Array.isArray(params.journey)
    ? params.journey[0]
    : params.journey;

  const [products, banners, journeys] = await Promise.all([
    safeCatalog(getProducts(), []),
    safeCatalog(getBanners("SHOP_HERO"), []),
    safeCatalog(getJourneys(), []),
  ]);

  return (
    <ShopPageContent
      initialJourney={initialJourney}
      products={products}
      banners={banners.map((banner) => ({
        id: banner.id,
        desktopImage: banner.imageUrl,
        mobileImage: banner.mobileImageUrl ?? banner.imageUrl,
        eyebrow: banner.eyebrow ?? "",
        title: banner.title ?? "",
        description: banner.description ?? "",
        buttonLabel: banner.buttonLabel ?? "",
        buttonHref: banner.productLink ?? "#shop-products",
        tone: banner.tone === "blue" ? "blue" : "pink",
      }))}
      journeys={journeys}
    />
  );
}
