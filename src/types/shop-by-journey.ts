import type { LocalizedValue } from "@/types/localization";

export type ShopByJourneyItem = {
  id: string;
  slug: string;
  name: LocalizedValue;
  images: [string, string];
  href: string;
};

export type ShopByJourneyCardProps = {
  item: ShopByJourneyItem;
};
