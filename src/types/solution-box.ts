import type { LocalizedValue } from "@/types/localization";

export type SolutionBoxItem = {
  productId: string;
  quantity: number;
  variant?: LocalizedValue;
};

export type SolutionBoxGuideStep = {
  id: string;
  title: LocalizedValue;
  description: LocalizedValue;
};

export type SolutionBoxReview = {
  id: string;
  customerName: string;
  rating: number;
  review: LocalizedValue;
};

export type SolutionBoxFaq = {
  id: string;
  question: LocalizedValue;
  answer: LocalizedValue;
};

export type SolutionBox = {
  id: string;
  slug: string;
  name: LocalizedValue;
  subtitle: LocalizedValue;
  description: LocalizedValue;
  images: string[];

  items: SolutionBoxItem[];

  // Discounted/selling price
  price: number;

  // Regular price
  compareAtPrice: number;

  stock: number;

  rating: number;
  reviewCount: number;

  journeyStage: LocalizedValue;
  whyThisBox: LocalizedValue[];
  preferredFor: LocalizedValue[];
  usageGuide: SolutionBoxGuideStep[];
  selectionReasons: LocalizedValue[];
  packaging: LocalizedValue[];
  reviews: SolutionBoxReview[];
  faqs: SolutionBoxFaq[];

  href: string;
};

export type SolutionBoxCardProps = {
  box: SolutionBox;
};
