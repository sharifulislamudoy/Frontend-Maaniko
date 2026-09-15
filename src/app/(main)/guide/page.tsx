import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getGuideBanners, getGuideHub, getGuides } from "@/modules/guides/api";
import GuideDirectory from "@/modules/guides/components/GuideDirectory";

export const dynamic = "force-dynamic";
type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};
const first = (value: string | string[] | undefined) =>
  Array.isArray(value) ? (value[0] ?? "") : (value ?? "");

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { page } = await getGuideHub();
    return {
      title: page?.title ?? "মা ও শিশুর গাইড",
      description: page?.description,
      alternates: { canonical: "/guide" },
    };
  } catch {
    return { title: "মা ও শিশুর গাইড" };
  }
}

export default async function GuidePage({ searchParams }: Props) {
  const params = await searchParams;
  const topic = first(params.topic);
  if (/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(topic)) {
    const aliases: Record<string, string> = {
      "baby-fever-warning": "baby-fever-warning-signs",
      "feeding-start-guide": "complementary-feeding",
    };
    redirect(`/guide/${aliases[topic] ?? topic}`);
  }
  const q = first(params.q).trim().slice(0, 120);
  const rawCategory = first(params.category);
  const category =
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(rawCategory) && rawCategory.length <= 100
      ? rawCategory
      : "";
  const sort = first(params.sort) === "newest" ? "newest" : "popular";
  const page = Math.min(
    100000,
    Math.max(1, Number.parseInt(first(params.page), 10) || 1),
  );
  const search = new URLSearchParams({ page: String(page), limit: "8", sort });
  if (q) search.set("q", q);
  if (category) search.set("category", category);
  const [hub, banners, result] = await Promise.all([
    getGuideHub(),
    getGuideBanners(),
    getGuides(search.toString()),
  ]);
  return (
    <GuideDirectory
      hub={hub}
      banners={banners}
      result={result}
      query={{ q, category, sort }}
    />
  );
}
