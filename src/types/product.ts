import type { LocalizedValue } from "@/types/localization";

export type ProductIncludedItem = {
  id: string;
  name: LocalizedValue;
  image?: string;
};

export type ProductDetails = {
  includedItems: ProductIncludedItem[];
  whyEssential: LocalizedValue[];
  preferredFor: LocalizedValue[];
};

export type MaanikoProduct = {
  id: string;
  slug: string;
  href?: string;
  name: LocalizedValue;
  description: LocalizedValue;
  category: LocalizedValue;
  badge?: LocalizedValue;
  images: string[];
  price: number;
  compareAtPrice?: number;
  stock: number;
  rating?: number;
  reviewCount?: number;
  details?: ProductDetails;
};

export type ProductCardProps = {
  product: MaanikoProduct;
};

export type ProductDto = {
  id: string;
  slug: string;
  name: LocalizedValue;
  description: LocalizedValue;
  price: number;
  stock: number;
  image: string;
};
