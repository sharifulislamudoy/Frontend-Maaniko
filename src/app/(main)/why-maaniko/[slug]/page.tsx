import type { Metadata } from "next";
import { notFound } from "next/navigation";

import WhyMaanikoDetailsView from "@/modules/why-maaniko/components/WhyMaanikoDetailsView";
import {
  getWhyMaanikoFeatureBySlug,
  whyMaanikoFeatures,
} from "@/modules/why-maaniko/data/whyMaaniko";

type WhyMaanikoPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return whyMaanikoFeatures.map((feature) => ({
    slug: feature.slug,
  }));
}

export async function generateMetadata({
  params,
}: WhyMaanikoPageProps): Promise<Metadata> {
  const { slug } = await params;

  const feature = getWhyMaanikoFeatureBySlug(slug);

  if (!feature) {
    return {
      title: "কেন Maaniko",
    };
  }

  return {
    title: feature.title ?? feature.title ?? "কেন Maaniko",

    description:
      feature.shortDescription ?? feature.shortDescription ?? undefined,
  };
}

export default async function WhyMaanikoPage({ params }: WhyMaanikoPageProps) {
  const { slug } = await params;

  const feature = getWhyMaanikoFeatureBySlug(slug);

  if (!feature) {
    notFound();
  }

  return <WhyMaanikoDetailsView feature={feature} />;
}
