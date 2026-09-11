import type { SiteText } from "@/modules/site-content/types/site-text";

export type ShopByJourneyItem = {
  id: string;
  slug: string;
  name: SiteText;
  images: [string, string];
  href: string;
};

export type ShopByJourneyCardProps = {
  item: ShopByJourneyItem;
};
