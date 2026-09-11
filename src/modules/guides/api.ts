import "server-only";
import { cache } from "react";
import type { Banner } from "@/modules/home/types/banner";
import type { GuideDetail, GuideHub, GuideList } from "./types";

export class GuideApiError extends Error {
  constructor(public readonly status: number) {
    super(`Guide API failed (${status})`);
  }
}

async function get<T>(path: string): Promise<T> {
  const origin = (
    process.env.API_URL ??
    process.env.PUBLIC_API_URL ??
    "http://localhost:5000"
  ).replace(/\/+$/, "");
  const response = await fetch(`${origin}${path}`, {
    cache: "no-store",
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) throw new GuideApiError(response.status);
  return response.json() as Promise<T>;
}

export const getGuideHub = cache(() => get<GuideHub>("/guides/hub"));
export const getGuideBanners = cache(() =>
  get<Banner[]>("/banners?placement=GUIDE_HERO"),
);
export const getGuides = cache((query = "") =>
  get<GuideList>(`/guides${query ? `?${query}` : ""}`),
);
export const getGuide = cache((slug: string) =>
  get<GuideDetail>(`/guides/${encodeURIComponent(slug)}`),
);

export function guideHref(
  query: { q?: string; category?: string; sort?: string; page?: number } = {},
) {
  const params = new URLSearchParams();
  if (query.q) params.set("q", query.q);
  if (query.category) params.set("category", query.category);
  if (query.sort) params.set("sort", query.sort);
  if (query.page && query.page > 1) params.set("page", String(query.page));
  return `/guide${params.size ? `?${params}` : ""}#all-guides`;
}
