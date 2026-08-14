import type { LocalizedValue } from "@/types/localization";

export type SolutionBox = {
  id: string;
  slug: string;
  name: LocalizedValue;
  subtitle: LocalizedValue;
  images: [string, string];
  price: number;
  href: string;
};

export type SolutionBoxCardProps = {
  box: SolutionBox;
};
