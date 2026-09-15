import type { SiteText } from "@/modules/site-content/types/site-text";
import type { MaanikoProduct } from "@/modules/products/types/product";

export type SolutionBoxItem = {
  productId: string;
  quantity: number;
  variant?: SiteText;
  product?: MaanikoProduct;
};

export type SolutionBoxGuideStep = {
  id: string;
  title: SiteText;
  description: SiteText;
};

export type SolutionBoxReview = {
  id: string;
  customerName: string;
  rating: number;
  review: SiteText;
};

export type SolutionBoxFaq = {
  id: string;
  question: SiteText;
  answer: SiteText;
};

export type SolutionBox = {
  id: string;
  slug: string;
  name: SiteText;
  subtitle: SiteText;
  description: SiteText;
  images: string[];

  items: SolutionBoxItem[];

  // Discounted/selling price
  price: number;

  // Regular price
  compareAtPrice: number;

  stock: number;

  rating: number;
  reviewCount: number;

  journeyStage: SiteText;
  whyThisBox: SiteText[];
  preferredFor: SiteText[];
  usageGuide: SolutionBoxGuideStep[];
  selectionReasons: SiteText[];
  packaging: SiteText[];
  reviews: SolutionBoxReview[];
  faqs: SolutionBoxFaq[];

  href: string;
  sku?: string;
  status?: "DRAFT" | "ACTIVE" | "ARCHIVED";
};

export type SolutionBoxCardProps = {
  box: SolutionBox;
};
