import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGuide, GuideApiError } from "@/modules/guides/api";
import GuideArticle from "@/modules/guides/components/GuideArticle";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };

async function load(slug: string) {
  try {
    return await getGuide(slug);
  } catch (error) {
    if (error instanceof GuideApiError && error.status === 404) notFound();
    throw error;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { guide } = await load(slug);
  return {
    title: guide.title,
    description: guide.excerpt,
    alternates: { canonical: `/guide/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      type: "article",
      images: [{ url: guide.coverImage, alt: guide.coverAlt }],
      publishedTime: guide.publishedAt ?? undefined,
      modifiedTime: guide.updatedAt,
    },
  };
}

export default async function GuideDetailPage({ params }: Props) {
  const { slug } = await params;
  return <GuideArticle data={await load(slug)} />;
}
