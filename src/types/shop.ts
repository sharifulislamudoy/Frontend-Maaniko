import type { ReactNode } from "react";
import type { MaanikoProduct } from "@/types/product";

export type CartItem = {
  product: MaanikoProduct;
  quantity: number;
};

export type ShopProviderProps = {
  children: ReactNode;
};

export type ShopContextValue = {
  cartItems: CartItem[];
  wishlistItems: MaanikoProduct[];
  cartCount: number;
  wishlistCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  isHydrated: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (product: MaanikoProduct, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: MaanikoProduct) => void;
  removeFromWishlist: (productId: string) => void;
};
