import type { SiteText } from "@/modules/site-content/types/site-text";

export type ProductIncludedItem = {
  id: string;
  name: SiteText;
  image?: string;
};

export type ComboCartItemSummary = {
  productId: string;
  slug: string;
  href: string;
  name: SiteText;
  image: string;
  quantity: number;
  variant?: SiteText;
};

export type ProductDetails = {
  includedItems: ProductIncludedItem[];
  whyEssential: SiteText[];
  preferredFor: SiteText[];
};

export type MaanikoProduct = {
  id: string;
  slug: string;
  href?: string;
  name: SiteText;
  description: SiteText;
  category: SiteText;
  badge?: SiteText;
  images: string[];
  price: number;
  compareAtPrice?: number;
  stock: number;
  rating?: number;
  reviewCount?: number;
  details?: ProductDetails;
  productType?: "single" | "combo";
  comboItems?: ComboCartItemSummary[];
  sku?: string;
  status?: "DRAFT" | "ACTIVE" | "ARCHIVED";
  featured?: boolean;
  journeys?: { slug: string; name: SiteText }[];
  attributes?: {
    id: string;
    name: SiteText;
    values: { id: string; value: SiteText; colorHex?: string | null }[];
  }[];
};

export type ProductCardProps = {
  product: MaanikoProduct;
};

export type ProductDto = {
  id: string;
  slug: string;
  name: SiteText;
  description: SiteText;
  price: number;
  stock: number;
  image: string;
};
