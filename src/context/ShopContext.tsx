"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { MaanikoProduct } from "@/types/product";
import type {
  CartItem,
  ShopContextValue,
  ShopProviderProps,
} from "@/types/shop";

const CART_STORAGE_KEY = "maaniko-cart";
const WISHLIST_STORAGE_KEY = "maaniko-wishlist";

const ShopContext = createContext<ShopContextValue | null>(null);

function readStorage<T>(key: string): T[] {
  try {
    const storedValue = window.localStorage.getItem(key);
    if (!storedValue) return [];

    const parsedValue: unknown = JSON.parse(storedValue);
    return Array.isArray(parsedValue) ? (parsedValue as T[]) : [];
  } catch {
    return [];
  }
}

export function ShopProvider({ children }: ShopProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<MaanikoProduct[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setCartItems(readStorage<CartItem>(CART_STORAGE_KEY));
    setWishlistItems(readStorage<MaanikoProduct>(WISHLIST_STORAGE_KEY));
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(
      WISHLIST_STORAGE_KEY,
      JSON.stringify(wishlistItems),
    );
  }, [isHydrated, wishlistItems]);

  useEffect(() => {
    function syncAcrossTabs(event: StorageEvent) {
      if (event.key === CART_STORAGE_KEY) {
        setCartItems(readStorage<CartItem>(CART_STORAGE_KEY));
      }

      if (event.key === WISHLIST_STORAGE_KEY) {
        setWishlistItems(readStorage<MaanikoProduct>(WISHLIST_STORAGE_KEY));
      }
    }

    window.addEventListener("storage", syncAcrossTabs);
    return () => window.removeEventListener("storage", syncAcrossTabs);
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const addToCart = useCallback((product: MaanikoProduct, quantity = 1) => {
    if (product.stock <= 0) return;

    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id,
      );

      if (!existingItem) {
        return [
          ...currentItems,
          { product, quantity: Math.min(Math.max(quantity, 1), product.stock) },
        ];
      }

      return currentItems.map((item) =>
        item.product.id === product.id
          ? {
              ...item,
              quantity: Math.min(
                item.quantity + Math.max(quantity, 1),
                product.stock,
              ),
            }
          : item,
      );
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId),
    );
  }, []);

  const updateCartQuantity = useCallback(
    (productId: string, quantity: number) => {
      setCartItems((currentItems) =>
        currentItems
          .map((item) =>
            item.product.id === productId
              ? {
                  ...item,
                  quantity: Math.min(quantity, item.product.stock),
                }
              : item,
          )
          .filter((item) => item.quantity > 0),
      );
    },
    [],
  );

  const isInWishlist = useCallback(
    (productId: string) =>
      wishlistItems.some((product) => product.id === productId),
    [wishlistItems],
  );

  const toggleWishlist = useCallback((product: MaanikoProduct) => {
    setWishlistItems((currentItems) => {
      const exists = currentItems.some((item) => item.id === product.id);
      return exists
        ? currentItems.filter((item) => item.id !== product.id)
        : [...currentItems, product];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  }, []);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const wishlistCount = wishlistItems.length;

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      ),
    [cartItems],
  );

  const value = useMemo<ShopContextValue>(
    () => ({
      cartItems,
      wishlistItems,
      cartCount,
      wishlistCount,
      cartTotal,
      isCartOpen,
      isHydrated,
      openCart,
      closeCart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      isInWishlist,
      toggleWishlist,
      removeFromWishlist,
    }),
    [
      addToCart,
      cartCount,
      cartItems,
      cartTotal,
      closeCart,
      isCartOpen,
      isHydrated,
      isInWishlist,
      openCart,
      removeFromCart,
      removeFromWishlist,
      toggleWishlist,
      updateCartQuantity,
      wishlistCount,
      wishlistItems,
    ],
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);

  if (!context) {
    throw new Error("useShop must be used inside ShopProvider");
  }

  return context;
}
