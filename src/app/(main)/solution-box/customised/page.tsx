import type { Metadata } from "next";

import CustomSolutionBoxBuilder from "@/modules/solution-boxes/components/CustomSolutionBoxBuilder";
import { getCombo, getProducts, safeCatalog } from "@/shared/lib/api/catalog";

export const metadata: Metadata = {
  title: "নিজের মতো Solution Box সাজান",
  description: "প্রয়োজন অনুযায়ী Maaniko পণ্য বেছে নিজের Solution Box তৈরি করুন।",
};

export default async function CustomisedSolutionBoxPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  const [products, sourceBox] = await Promise.all([
    safeCatalog(getProducts(), []),
    from ? safeCatalog(getCombo(from), null) : Promise.resolve(null),
  ]);

  return <CustomSolutionBoxBuilder products={products} sourceBox={sourceBox} />;
}
