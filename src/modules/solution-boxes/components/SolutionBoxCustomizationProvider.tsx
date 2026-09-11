"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import { commerceApi } from "@/modules/commerce/lib/client";
import { useShop } from "@/modules/shop/context/ShopContext";
import { solutionBoxToProduct } from "@/modules/solution-boxes/lib/solutionBox";
import type { SolutionBox } from "@/modules/solution-boxes/types/solutionBox";
import type { CustomComboConfigItem } from "@/modules/shop/types/shop";

type ComboQuote = {
  line: {
    unitPrice: number;
    lineTotal: number;
  };
  retailTotal: number;
  originalBoxRetailTotal: number;
  discountPercent: number;
  isCustomized: boolean;
  canonicalConfig: CustomComboConfigItem[];
};

type SolutionBoxCustomizationContextValue = {
  box: SolutionBox;
  config: CustomComboConfigItem[];
  quote: ComboQuote | null;
  quoteLoading: boolean;
  actionLoading: boolean;
  error: string;
  isCustomized: boolean;
  quantityFor: (productId: string) => number;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  restoreItem: (productId: string) => void;
  reset: () => void;
  addCurrentBoxToCart: () => Promise<void>;
  orderCurrentBoxNow: () => Promise<void>;
};

const SolutionBoxCustomizationContext =
  createContext<SolutionBoxCustomizationContextValue | null>(null);

function normalizeConfig(config: CustomComboConfigItem[]) {
  return config
    .filter((item) => item.quantity > 0)
    .map((item) => ({
      productId: item.productId,
      quantity: Math.max(1, Math.min(20, Math.floor(item.quantity))),
    }))
    .sort((a, b) => a.productId.localeCompare(b.productId));
}

function sameConfig(
  first: CustomComboConfigItem[],
  second: CustomComboConfigItem[],
) {
  const a = normalizeConfig(first);
  const b = normalizeConfig(second);

  if (a.length !== b.length) return false;

  return a.every(
    (item, index) =>
      item.productId === b[index]?.productId &&
      item.quantity === b[index]?.quantity,
  );
}

export default function SolutionBoxCustomizationProvider({
  box,
  children,
}: {
  box: SolutionBox;
  children: ReactNode;
}) {
  const router = useRouter();
  const { addToCart, addCustomComboToCart } = useShop();

  const defaults = useMemo<CustomComboConfigItem[]>(
    () =>
      box.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    [box.items],
  );

  const [config, setConfig] = useState<CustomComboConfigItem[]>(defaults);
  const [quote, setQuote] = useState<ComboQuote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setConfig(defaults);
  }, [defaults]);

  useEffect(() => {
    const selected = normalizeConfig(config);

    if (selected.length === 0) {
      setQuote(null);
      setQuoteLoading(false);
      setError("Solution Box সম্পূর্ণ খালি রাখা যাবে না");
      return;
    }

    let cancelled = false;
    setQuoteLoading(true);
    setError("");

    const timer = window.setTimeout(async () => {
      try {
        const result = await commerceApi.quoteCombo(box.id, {
          customConfig: selected,
          quantity: 1,
        });

        if (!cancelled) {
          setQuote(result as ComboQuote);
        }
      } catch (err) {
        if (!cancelled) {
          setQuote(null);
          setError(
            err instanceof Error ? err.message : "Box-এর মূল্য হিসাব করা যায়নি",
          );
        }
      } finally {
        if (!cancelled) setQuoteLoading(false);
      }
    }, 220);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [box.id, config]);

  const quantityFor = useCallback(
    (productId: string) =>
      config.find((item) => item.productId === productId)?.quantity ?? 0,
    [config],
  );

  const setQuantity = useCallback((productId: string, quantity: number) => {
    const safeQuantity = Math.max(0, Math.min(20, Math.floor(quantity)));

    setConfig((current) =>
      current.map((item) =>
        item.productId === productId
          ? { ...item, quantity: safeQuantity }
          : item,
      ),
    );
  }, []);

  const removeItem = useCallback(
    (productId: string) => setQuantity(productId, 0),
    [setQuantity],
  );

  const restoreItem = useCallback(
    (productId: string) => {
      const defaultQuantity =
        defaults.find((item) => item.productId === productId)?.quantity ?? 1;
      setQuantity(productId, Math.max(1, defaultQuantity));
    },
    [defaults, setQuantity],
  );

  const reset = useCallback(() => {
    setConfig(defaults);
    setError("");
  }, [defaults]);

  const isCustomized = useMemo(
    () => !sameConfig(config, defaults),
    [config, defaults],
  );

  const persistCurrentBox = useCallback(async () => {
    if (!quote) {
      throw new Error("Box-এর price এখনো প্রস্তুত হয়নি");
    }

    const product = solutionBoxToProduct(box);

    if (isCustomized) {
      await addCustomComboToCart(
        product,
        quote.canonicalConfig,
        quote.line.unitPrice,
      );
      return;
    }

    addToCart(product, 1);
  }, [addCustomComboToCart, addToCart, box, isCustomized, quote]);

  const addCurrentBoxToCart = useCallback(async () => {
    setActionLoading(true);
    setError("");
    try {
      await persistCurrentBox();
    } catch (err) {
      setError(err instanceof Error ? err.message : "কার্টে যোগ করা যায়নি");
      throw err;
    } finally {
      setActionLoading(false);
    }
  }, [persistCurrentBox]);

  const orderCurrentBoxNow = useCallback(async () => {
    setActionLoading(true);
    setError("");
    try {
      await persistCurrentBox();
      router.push("/checkout");
    } catch (err) {
      setError(err instanceof Error ? err.message : "অর্ডার শুরু করা যায়নি");
    } finally {
      setActionLoading(false);
    }
  }, [persistCurrentBox, router]);

  const value = useMemo<SolutionBoxCustomizationContextValue>(
    () => ({
      box,
      config,
      quote,
      quoteLoading,
      actionLoading,
      error,
      isCustomized,
      quantityFor,
      setQuantity,
      removeItem,
      restoreItem,
      reset,
      addCurrentBoxToCart,
      orderCurrentBoxNow,
    }),
    [
      actionLoading,
      addCurrentBoxToCart,
      box,
      config,
      error,
      isCustomized,
      orderCurrentBoxNow,
      quantityFor,
      quote,
      quoteLoading,
      removeItem,
      reset,
      restoreItem,
      setQuantity,
    ],
  );

  return (
    <SolutionBoxCustomizationContext.Provider value={value}>
      {children}
    </SolutionBoxCustomizationContext.Provider>
  );
}

export function useSolutionBoxCustomization() {
  const context = useContext(SolutionBoxCustomizationContext);

  if (!context) {
    throw new Error(
      "useSolutionBoxCustomization must be used inside SolutionBoxCustomizationProvider",
    );
  }

  return context;
}
