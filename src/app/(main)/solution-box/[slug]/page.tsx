import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ComboDetailsView from "@/modules/solution-boxes/components/ComboDetailsView";
import SolutionBoxCustomizationProvider from "@/modules/solution-boxes/components/SolutionBoxCustomizationProvider";
import EntityViewTracker from "@/modules/commerce/components/EntityViewTracker";
import DeliveryEstimateWidget from "@/modules/commerce/components/DeliveryEstimateWidget";
import { getCombo, getCombos, safeCatalog } from "@/shared/lib/api/catalog";

type SolutionBoxDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const boxes = await safeCatalog(getCombos(), []);
  return boxes.map((box) => ({ slug: box.slug }));
}

export async function generateMetadata({
  params,
}: SolutionBoxDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const box = await safeCatalog(getCombo(slug), null);

  if (!box) {
    return {
      title: "Maaniko সল্যুশন বক্স",
      description: "Maaniko সল্যুশন বক্সের বিস্তারিত তথ্য",
    };
  }

  const title = box.name ?? box.name ?? "Maaniko সল্যুশন বক্স";
  const description = box.description ?? box.description ?? undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: box.images?.[0] ? [{ url: box.images[0] }] : undefined,
    },
  };
}

export default async function SolutionBoxDetailsPage({
  params,
}: SolutionBoxDetailsPageProps) {
  const { slug } = await params;

  const [box, boxes] = await Promise.all([
    safeCatalog(getCombo(slug), null),
    safeCatalog(getCombos(), []),
  ]);

  if (!box) notFound();

  const relatedBoxes = boxes.filter((item) => item.id !== box.id);

  return (
    <>
      <EntityViewTracker entityType="COMBO" entityId={box.id} />
      <SolutionBoxCustomizationProvider box={box}>
        <ComboDetailsView box={box} relatedBoxes={relatedBoxes} />
      </SolutionBoxCustomizationProvider>
      <DeliveryEstimateWidget comboId={box.id} />
    </>
  );
}
