import type { ReactNode } from "react";
import type { MaanikoProduct } from "@/modules/products/types/product";

export type CustomComboConfigItem = {
  productId: string;
  quantity: number;
};

export type CartItem = {
  product: MaanikoProduct;
  quantity: number;
  clientKey: string;
  customConfig?: CustomComboConfigItem[] | null;
  isCustomized?: boolean;
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
  addCustomComboToCart: (
    product: MaanikoProduct,
    config: CustomComboConfigItem[],
    unitPrice: number,
  ) => Promise<void>;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  ensureCartSynced: () => Promise<void>;
  clearCartAfterOrder: () => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: MaanikoProduct) => void;
  removeFromWishlist: (productId: string) => void;
  refreshCommerceState: () => Promise<void>;
};
