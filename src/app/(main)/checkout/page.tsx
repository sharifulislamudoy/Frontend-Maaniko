import { Suspense } from "react";

import CheckoutContent from "@/modules/checkout/components/CheckoutContent";
import { solutionBoxToProduct } from "@/modules/solution-boxes/lib/solutionBox";
import { getCombos, getProducts, safeCatalog } from "@/shared/lib/api/catalog";

export const metadata = {
  title: "চেকআউট",
  description: "আপনার Maaniko অর্ডার সম্পন্ন করুন।",
};

export default async function CheckoutPage() {
  const [products, boxes] = await Promise.all([
    safeCatalog(getProducts(), []),
    safeCatalog(getCombos(), []),
  ]);

  const purchasableProducts = [...products, ...boxes.map(solutionBoxToProduct)];

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fff9fb]" />}>
      <CheckoutContent products={purchasableProducts} />
    </Suspense>
  );
}
