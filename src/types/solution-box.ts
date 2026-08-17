import type { LocalizedValue } from "@/types/localization";

export type SolutionBox = {
  id: string;
  slug: string;
  name: LocalizedValue;
  subtitle: LocalizedValue;
  images: [string, string];

  // Discounted/selling price
  price: number;

  // Regular price
  compareAtPrice: number;

  stock: number;

  href: string;
};

export type SolutionBoxCardProps = {
  box: SolutionBox;
};