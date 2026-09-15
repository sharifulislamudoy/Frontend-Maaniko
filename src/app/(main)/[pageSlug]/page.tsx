import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ContentPageView from "@/modules/content-pages/components/ContentPageView";
import { getContentPage, safeCatalog } from "@/shared/lib/api/catalog";

export async function generateMetadata({ params }: { params: Promise<{ pageSlug: string }> }): Promise<Metadata> {
  const { pageSlug } = await params;
  const page = await safeCatalog(getContentPage(pageSlug), null);
  return page
    ? { title: page.title, description: page.summary ?? undefined }
    : { title: "পৃষ্ঠা পাওয়া যায়নি" };
}

export default async function CmsContentPage({ params }: { params: Promise<{ pageSlug: string }> }) {
  const { pageSlug } = await params;
  const page = await safeCatalog(getContentPage(pageSlug), null);
  if (!page) notFound();
  return <ContentPageView page={page} />;
}
