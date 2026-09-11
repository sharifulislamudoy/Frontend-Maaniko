import type { Metadata } from "next";
import { notFound } from "next/navigation";

import MotherGuideDetailsView from "@/modules/mother-guides/components/MotherGuideDetailsView";
import {
  findMotherGuide,
  motherGuideRecords,
} from "@/modules/mother-guides/data/motherGuides";

type MotherGuidePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return motherGuideRecords.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: MotherGuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = findMotherGuide(slug);

  if (!guide) return { title: "মায়ের যত্নের গাইড | Maaniko" };

  return {
    title: `${guide.title ?? guide.title} | Maaniko`,
    description: guide.description ?? guide.description,
  };
}

export default async function MotherGuidePage({
  params,
}: MotherGuidePageProps) {
  const { slug } = await params;
  const guide = findMotherGuide(slug);

  if (!guide) notFound();

  return <MotherGuideDetailsView guide={guide} />;
}
