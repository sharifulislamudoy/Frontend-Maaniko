import type { SiteText } from "@/modules/site-content/types/site-text";

export type CareGuideAccent = "pink" | "blue";

export type CareGuideIconName =
  | "pregnancy"
  | "bag"
  | "baby"
  | "breastfeeding"
  | "feeding"
  | "sleep"
  | "bath"
  | "diaper"
  | "fever"
  | "recovery";

export type CareGuideSection = {
  title: SiteText;
  points: SiteText[];
};

export type CareGuideSource = {
  label: string;
  url: string;
};

export type CareGuideItem = {
  id: string;
  slug: string;
  title: SiteText;
  images: [string, string];
  href: string;
  cardTitle?: string;
  description?: SiteText;
  imageAlt?: SiteText;
  accent?: CareGuideAccent;
  icon?: CareGuideIconName;
  summary?: SiteText;
  sections?: CareGuideSection[];
  note?: SiteText;
  source?: CareGuideSource;
};

export type DetailedCareGuideItem = CareGuideItem & {
  description: SiteText;
  imageAlt: SiteText;
  summary: SiteText;
  sections: CareGuideSection[];
  note: SiteText;
  source: CareGuideSource;
};

export type CareGuideCardProps = {
  guide: CareGuideItem;
};
