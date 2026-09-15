export type Banner = {
  id: string;

  /** Desktop banner image. */
  imageUrl: string;

  /** Mobile এবং tablet image। না থাকলে desktop image ব্যবহৃত হবে। */
  mobileImageUrl?: string | null;

  productLink?: string | null;
  isPublished?: boolean;
  createdAt?: string;
  placement?:
    | "HOME_HERO"
    | "SHOP_HERO"
    | "GUIDE_HERO"
    | "SOLUTION_GUIDE";
  desktopImage?: string;
  mobileImage?: string | null;
  eyebrow?: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
  buttonHref?: string | null;
  tone?: string | null;
};
