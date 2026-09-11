import { cache } from "react";

import type { Banner } from "@/modules/home/types/banner";
import type { MaanikoProduct } from "@/modules/products/types/product";
import type { SolutionBox } from "@/modules/solution-boxes/types/solutionBox";

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"
).replace(/\/$/, "");

async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    next: {
      revalidate: 60,
    },
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${path}`);
  }

  return response.json() as Promise<T>;
}

export type ShopJourney = {
  id: string;
  slug: string;
  number: string;

  name: string;
  description: string;

  icon:
    | "activity"
    | "baby"
    | "bath"
    | "heart"
    | "heartPulse"
    | "shield"
    | "utensils";

  color: string;
  softColor: string;
};

/*
 * React cache একই server request-এর মধ্যে
 * duplicate API request হওয়া বন্ধ করবে।
 */

export const getProducts = cache(() => apiGet<MaanikoProduct[]>("/products"));

export const getProduct = cache((slug: string) =>
  apiGet<MaanikoProduct>(`/products/${encodeURIComponent(slug)}`),
);

export const getCombos = cache(() => apiGet<SolutionBox[]>("/combos"));

export const getCombo = cache((slug: string) =>
  apiGet<SolutionBox>(`/combos/${encodeURIComponent(slug)}`),
);

export const getBanners = cache(
  (placement: "HOME_HERO" | "SHOP_HERO" | "GUIDE_HERO") =>
    apiGet<Banner[]>(`/banners?placement=${placement}`),
);

export const getJourneys = cache(() => apiGet<ShopJourney[]>("/journeys"));

export async function safeCatalog<T>(
  request: Promise<T>,
  fallback: T,
): Promise<T> {
  try {
    return await request;
  } catch (error) {
    console.error("Catalog API error:", error);
    return fallback;
  }
}
