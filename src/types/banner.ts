export type Banner = {
  id: string;
  imageUrl: string;
  productLink?: string | null;
  isPublished?: boolean;
  createdAt?: string;
};

export type BannerApiResponse = {
  success: boolean;
  banners: Banner[];
  message?: string;
};
