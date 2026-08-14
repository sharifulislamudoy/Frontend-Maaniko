import type { LocalizedValue } from "@/types/localization";

export type CareGuideItem = {
  id: string;
  slug: string;
  title: LocalizedValue;
  images: [string, string];
  href: string;
};

export type CareGuideCardProps = {
  guide: CareGuideItem;
};