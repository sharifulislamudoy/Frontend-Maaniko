"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { MaanikoProduct } from "@/modules/products/types/product";
import { commerceApi } from "@/modules/commerce/lib/client";
import type {
  CartItem,
  CustomComboConfigItem,
  ShopContextValue,
  ShopProviderProps,
} from "@/modules/shop/types/shop";

const CART_STORAGE_KEY = "maaniko-cart";
const WISHLIST_STORAGE_KEY = "maaniko-wishlist";

const ShopContext = createContext<ShopContextValue | null>(null);

function readStorage<T>(key: string): T[] {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function itemType(product: MaanikoProduct): "PRODUCT" | "COMBO" {
  return product.productType === "combo" ? "COMBO" : "PRODUCT";
}

function regularClientKey(product: MaanikoProduct) {
  return `${itemType(product)}:${product.id}`;
}

function payloadForCartItem(item: CartItem) {
  const type = itemType(item.product);
  return {
    itemType: type,
    ...(type === "PRODUCT"
      ? { productId: item.product.id }
      : { comboId: item.product.id }),
    quantity: item.quantity,
    customConfig: item.customConfig ?? undefined,
  };
}

function serverCartToLocal(data: any): CartItem[] {
  if (!Array.isArray(data?.items)) return [];
  return data.items
    .filter((item: any) => item?.product?.id)
    .map((item: any) => ({
      product: item.product as MaanikoProduct,
      quantity: Number(item.quantity) || 1,
      clientKey:
        typeof item.clientKey === "string"
          ? item.clientKey
          : regularClientKey(item.product as MaanikoProduct),
      customConfig: Array.isArray(item.customConfig) ? item.customConfig : null,
      isCustomized: Boolean(item.isCustomized),
    }));
}

export function ShopProvider({ children }: ShopProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<MaanikoProduct[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const cartRef = useRef<CartItem[]>([]);

  useEffect(() => {
    cartRef.current = cartItems;
  }, [cartItems]);

  const syncOne = useCallback(async (item: CartItem) => {
    await commerceApi.putCartItem(item.clientKey, payloadForCartItem(item));
  }, []);

  const refreshCommerceState = useCallback(async () => {
    const [cartResult, wishlistResult] = await Promise.allSettled([
      commerceApi.getCart(),
      commerceApi.getWishlist(),
    ]);

    if (cartResult.status === "fulfilled") {
      setCartItems(serverCartToLocal(cartResult.value));
    }
    if (wishlistResult.status === "fulfilled") {
      setWishlistItems(
        Array.isArray(wishlistResult.value.items)
          ? (wishlistResult.value.items as MaanikoProduct[])
          : [],
      );
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      const localCart = readStorage<CartItem>(CART_STORAGE_KEY).map((item) => ({
        ...item,
        clientKey:
          item.clientKey || regularClientKey(item.product as MaanikoProduct),
      }));
      const localWishlist = readStorage<MaanikoProduct>(WISHLIST_STORAGE_KEY);

      setCartItems(localCart);
      setWishlistItems(localWishlist);

      try {
        const [serverCart, serverWishlist] = await Promise.all([
          commerceApi.getCart(),
          commerceApi.getWishlist(),
        ]);
        if (cancelled) return;

        const serverItems = serverCartToLocal(serverCart);
        if (serverItems.length > 0) {
          setCartItems(serverItems);
        } else if (localCart.length > 0) {
          await Promise.all(localCart.map(syncOne));
        }

        if (serverWishlist.items.length > 0) {
          setWishlistItems(serverWishlist.items as MaanikoProduct[]);
        } else if (localWishlist.length > 0) {
          await Promise.all(
            localWishlist.map((product) =>
              commerceApi.putWishlist(itemType(product), product.id),
            ),
          );
        }
      } catch {
        // localStorage remains the offline/failure fallback.
      } finally {
        if (!cancelled) setIsHydrated(true);
      }
    }

    void hydrate();
    return () => {
      cancelled = true;
    };
  }, [syncOne]);

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
  }, [wishlistItems, isHydrated]);

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

  const addToCart = useCallback(
    (product: MaanikoProduct, quantity = 1) => {
      if (product.stock <= 0) return;
      const key = regularClientKey(product);

      setCartItems((current) => {
        const existing = current.find((item) => item.clientKey === key);
        const safeDelta = Math.max(1, Math.floor(quantity));
        const nextQuantity = existing
          ? Math.min(existing.quantity + safeDelta, product.stock)
          : Math.min(safeDelta, product.stock);

        const nextItem: CartItem = existing
          ? { ...existing, quantity: nextQuantity }
          : {
              product,
              quantity: nextQuantity,
              clientKey: key,
              customConfig:
                product.productType === "combo"
                  ? product.comboItems?.map((item) => ({
                      productId: item.productId,
                      quantity: item.quantity,
                    }))
                  : null,
            };

        void syncOne(nextItem).catch(() => undefined);
        return existing
          ? current.map((item) => (item.clientKey === key ? nextItem : item))
          : [...current, nextItem];
      });
    },
    [syncOne],
  );

  const addCustomComboToCart = useCallback(
    async (
      product: MaanikoProduct,
      config: CustomComboConfigItem[],
      unitPrice: number,
    ) => {
      const key = `COMBO:${product.id}:CUSTOM`;
      const customizedProduct: MaanikoProduct = {
        ...product,
        price: unitPrice,
        comboItems: (product.comboItems ?? [])
          .map((item) => {
            const selected = config.find(
              (candidate) => candidate.productId === item.productId,
            );
            return selected ? { ...item, quantity: selected.quantity } : null;
          })
          .filter((item): item is NonNullable<typeof item> => Boolean(item)),
      };
      const nextItem: CartItem = {
        product: customizedProduct,
        quantity: 1,
        clientKey: key,
        customConfig: config,
        isCustomized: true,
      };

      const staleKeys = cartRef.current
        .filter(
          (item) => item.product.id === product.id && item.clientKey !== key,
        )
        .map((item) => item.clientKey);

      setCartItems((current) => [
        ...current
          .filter(
            (item) => item.product.id !== product.id || item.clientKey === key,
          )
          .filter((item) => item.clientKey !== key),
        nextItem,
      ]);

      await Promise.all(
        staleKeys.map((staleKey) =>
          commerceApi.deleteCartItem(staleKey).catch(() => undefined),
        ),
      );
      await syncOne(nextItem);
    },
    [syncOne],
  );

  const removeFromCart = useCallback((productId: string) => {
    setCartItems((current) => {
      const targets = current.filter((item) => item.product.id === productId);
      for (const target of targets) {
        void commerceApi
          .deleteCartItem(target.clientKey)
          .catch(() => undefined);
      }
      return current.filter((item) => item.product.id !== productId);
    });
  }, []);

  const updateCartQuantity = useCallback(
    (productId: string, quantity: number) => {
      setCartItems((current) => {
        const target = current.find((item) => item.product.id === productId);
        if (!target) return current;

        if (quantity <= 0) {
          void commerceApi
            .deleteCartItem(target.clientKey)
            .catch(() => undefined);
          return current.filter((item) => item.clientKey !== target.clientKey);
        }

        const safe = Math.min(
          Math.max(1, Math.floor(quantity)),
          target.product.stock,
        );
        const nextItem = { ...target, quantity: safe };
        void syncOne(nextItem).catch(() => undefined);
        return current.map((item) =>
          item.clientKey === target.clientKey ? nextItem : item,
        );
      });
    },
    [syncOne],
  );

  const ensureCartSynced = useCallback(async () => {
    await Promise.all(cartRef.current.map(syncOne));
  }, [syncOne]);

  const clearCartAfterOrder = useCallback(() => {
    setCartItems([]);
    window.localStorage.setItem(CART_STORAGE_KEY, "[]");
  }, []);

  const isInWishlist = useCallback(
    (productId: string) =>
      wishlistItems.some((product) => product.id === productId),
    [wishlistItems],
  );

  const toggleWishlist = useCallback((product: MaanikoProduct) => {
    setWishlistItems((current) => {
      const exists = current.some((item) => item.id === product.id);
      const type = itemType(product);

      if (exists) {
        void commerceApi
          .deleteWishlist(type, product.id)
          .catch(() => undefined);
        return current.filter((item) => item.id !== product.id);
      }

      void commerceApi.putWishlist(type, product.id).catch(() => undefined);
      return [...current, product];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlistItems((current) => {
      const target = current.find((item) => item.id === productId);
      if (target) {
        void commerceApi
          .deleteWishlist(itemType(target), productId)
          .catch(() => undefined);
      }
      return current.filter((item) => item.id !== productId);
    });
  }, []);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );
  const wishlistCount = wishlistItems.length;
  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
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
      addCustomComboToCart,
      removeFromCart,
      updateCartQuantity,
      ensureCartSynced,
      clearCartAfterOrder,
      isInWishlist,
      toggleWishlist,
      removeFromWishlist,
      refreshCommerceState,
    }),
    [
      addCustomComboToCart,
      addToCart,
      cartCount,
      cartItems,
      cartTotal,
      clearCartAfterOrder,
      closeCart,
      ensureCartSynced,
      isCartOpen,
      isHydrated,
      isInWishlist,
      openCart,
      refreshCommerceState,
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
  if (!context) throw new Error("useShop must be used inside ShopProvider");
  return context;
}
