import type { LocalizedValue } from "@/types/localization";

export type ComboPackTheme = "pink" | "blue" | "amber";

export type ComboPack = {
  id: string;
  slug: string;
  name: LocalizedValue;
  subtitle: LocalizedValue;
  imageUrl: string;
  benefits: LocalizedValue[];
  theme: ComboPackTheme;
};

export type ComboPackCardProps = {
  pack: ComboPack;
  position: number;
};