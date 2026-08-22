import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ComboDetailsView from "@/components/solution-box/ComboDetailsView";
import {
  getSolutionBoxBySlug,
  solutionBoxes,
} from "@/data/solutionBoxes";

type SolutionBoxDetailsPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return solutionBoxes.map((box) => ({ slug: box.slug }));
}

export async function generateMetadata({
  params,
}: SolutionBoxDetailsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const box = getSolutionBoxBySlug(slug);

  if (!box) return { title: "Maaniko Solution Box" };

  return {
    title: box.name.en ?? box.name.bn ?? "Maaniko Solution Box",
    description: box.description.en ?? box.description.bn ?? undefined,
    openGraph: {
      title: box.name.en ?? box.name.bn ?? "Maaniko Solution Box",
      description: box.description.en ?? box.description.bn ?? undefined,
      images: box.images[0] ? [{ url: box.images[0] }] : undefined,
    },
  };
}

export default async function SolutionBoxDetailsPage({
  params,
}: SolutionBoxDetailsPageProps) {
  const { slug } = await params;
  const box = getSolutionBoxBySlug(slug);

  if (!box) notFound();

  const relatedBoxes = solutionBoxes.filter((item) => item.id !== box.id);

  return <ComboDetailsView box={box} relatedBoxes={relatedBoxes} />;
}