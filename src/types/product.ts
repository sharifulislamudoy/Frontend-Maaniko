import type { LocalizedValue } from "@/types/localization";

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
