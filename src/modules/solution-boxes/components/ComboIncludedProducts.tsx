"use client";

/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useId, useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  CircleHelp,
  ExternalLink,
  Minus,
  PackageCheck,
  Plus,
  RotateCcw,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { toast } from "sonner";

import ProductDetailsModal from "@/modules/products/components/ProductDetailsModal";
import ProductHowItWorksModal from "@/modules/products/components/ProductHowItWorksModal";
import { useSiteText } from "@/modules/site-content/context/SiteTextContext";
import type { ResolvedSolutionBoxItem } from "@/modules/solution-boxes/lib/solutionBox";
import type { MaanikoProduct } from "@/modules/products/types/product";
import { useSolutionBoxCustomization } from "@/modules/solution-boxes/components/SolutionBoxCustomizationProvider";

type ComboIncludedProductsProps = {
  items: ResolvedSolutionBoxItem[];
};

const containerVariants: Variants = {
  collapsed: {
    height: 106,
    transition: {
      height: {
        duration: 0.46,
        ease: [0.4, 0, 0.2, 1],
      },
      staggerChildren: 0.04,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
  expanded: {
    height: "auto",
    transition: {
      height: {
        duration: 0.62,
        ease: [0.22, 1, 0.36, 1],
      },
      delayChildren: 0.08,
      staggerChildren: 0.075,
      when: "beforeChildren",
    },
  },
};

const itemVariants: Variants = {
  collapsed: {
    opacity: 0.22,
    y: -8,
    scale: 0.975,
    filter: "blur(1.4px)",
    transition: {
      duration: 0.22,
      ease: "easeIn",
    },
  },
  expanded: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.36,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function getInitialProductCount() {
  if (typeof window === "undefined") return 2;
  if (window.matchMedia("(min-width: 1024px)").matches) return 4;
  if (window.matchMedia("(min-width: 768px)").matches) return 3;
  return 2;
}

export default function ComboIncludedProducts({
  items,
}: ComboIncludedProductsProps) {
  const { locale, text } = useSiteText();
  const {
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
  } = useSolutionBoxCustomization();

  const [isExpanded, setIsExpanded] = useState(false);
  const [initialCount, setInitialCount] = useState(2);
  const [selectedProduct, setSelectedProduct] = useState<MaanikoProduct | null>(
    null,
  );
  const [howItWorksProduct, setHowItWorksProduct] =
    useState<MaanikoProduct | null>(null);
  const expandableContentId = useId();

  const closeProductModal = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  const closeHowItWorksModal = useCallback(() => {
    setHowItWorksProduct(null);
  }, []);

  const openDetailsFromHowItWorks = useCallback((product: MaanikoProduct) => {
    setHowItWorksProduct(null);
    setSelectedProduct(product);
  }, []);

  useEffect(() => {
    function updateInitialCount() {
      setInitialCount(getInitialProductCount());
    }

    updateInitialCount();
    window.addEventListener("resize", updateInitialCount);

    return () => {
      window.removeEventListener("resize", updateInitialCount);
    };
  }, []);

  const quantityFormatter = useMemo(
    () => new Intl.NumberFormat("bn-BD"),
    [locale],
  );

  const money = useMemo(
    () =>
      new Intl.NumberFormat("bn-BD", {
        style: "currency",
        currency: "BDT",
        currencyDisplay: "narrowSymbol",
        maximumFractionDigits: 0,
      }),
    [locale],
  );

  const selectedItems = useMemo(
    () => items.filter((item) => quantityFor(item.relation.productId) > 0),
    [items, quantityFor],
  );

  const removedItems = useMemo(
    () => items.filter((item) => quantityFor(item.relation.productId) === 0),
    [items, quantityFor],
  );

  const totalProductQuantity = useMemo(
    () =>
      items.reduce(
        (total, item) => total + quantityFor(item.relation.productId),
        0,
      ),
    [items, quantityFor],
  );

  const initiallyVisibleItems = selectedItems.slice(0, initialCount);
  const expandableItems = selectedItems.slice(initialCount);
  const hasExpandableItems = expandableItems.length > 0;

  const copy = {
    title: "আপনি ঠিক যা পাচ্ছেন",
    summary: `এই Box-এ এখন থাকছে ${quantityFormatter.format(
      totalProductQuantity,
    )}টি পণ্য`,
    description:
      "এখান থেকেই quantity বাড়ান/কমিয়ে নিন বা প্রয়োজন নেই এমন product বাদ দিন। এতে database-এর product delete হবে না—শুধু আপনার এই Box-এর selection বদলাবে।",
    details: "পণ্যের বিস্তারিত",
    howItWorks: "কীভাবে কাজ করে",
    showMore: "আরো দেখুন",
    showLess: "কম দেখুন",
    removed: "বাদ দেওয়া পণ্য",
    addBack: "আবার যোগ করুন",
    reset: "আগের অবস্থায় নিন",
    finalPrice: "আপনার Box-এর বর্তমান মূল্য",
    retailValue: "আলাদা product value",
    customized: "আপনার মতো সাজানো",
    defaultBox: "মূল Box",
    addToCart: "কার্টে রাখুন",
    orderNow: "এখনই অর্ডার করুন",
    added: "কার্টে যোগ হয়েছে",
  };

  async function handleAddToCart() {
    try {
      await addCurrentBoxToCart();
      toast.success(copy.added);
    } catch {
      // Provider already exposes the useful error text.
    }
  }

  function ProductItem({ item }: { item: ResolvedSolutionBoxItem }) {
    const { relation, product } = item;
    const productName = text(product.name);
    const productImage = product.images[0] ?? "";
    const quantity = quantityFor(relation.productId);

    function openProductModal() {
      setHowItWorksProduct(null);
      setSelectedProduct(product);
    }

    function openHowItWorksModal() {
      setSelectedProduct(null);
      setHowItWorksProduct(product);
    }

    return (
      <article className="group grid min-h-[108px] min-w-0 grid-cols-[72px_minmax(0,1fr)] gap-3 rounded-2xl bg-[#fbfcfe] p-3 shadow-[0_8px_22px_rgba(6,42,84,0.045)] transition duration-300 hover:bg-white hover:shadow-[0_12px_30px_rgba(6,42,84,0.08)] md:min-h-[128px] md:grid-cols-[92px_minmax(0,1fr)] md:p-4">
        <button
          type="button"
          onClick={openProductModal}
          aria-label={`${copy.details}: ${productName}`}
          className="aspect-square size-[72px] overflow-hidden rounded-xl bg-[#fff4f6] outline-none focus-visible:ring-4 focus-visible:ring-[#FC5689]/20 md:size-[92px]"
        >
          <img
            src={productImage}
            alt={productName}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </button>

        <div className="flex min-w-0 flex-col">
          <div className="flex min-w-0 items-start justify-between gap-2">
            <button
              type="button"
              onClick={openProductModal}
              className="min-w-0 text-left text-[#062a54] outline-none transition-colors hover:text-[#FC5689] focus-visible:text-[#FC5689]"
            >
              <span className="line-clamp-2 font-heading text-sm font-bold leading-[19px] md:text-base md:leading-6">
                {productName}
              </span>
            </button>

            <button
              type="button"
              onClick={() => removeItem(relation.productId)}
              className="grid size-8 shrink-0 place-items-center rounded-full bg-red-50 text-red-500 transition hover:bg-red-100"
              aria-label={`${productName} বাদ দিন`}
            >
              <Trash2 className="size-3.5" />
            </button>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <div className="inline-flex h-9 items-center rounded-xl bg-white shadow-[inset_0_0_0_1px_#e8edf3]">
              <button
                type="button"
                onClick={() => setQuantity(relation.productId, quantity - 1)}
                className="grid h-full w-9 place-items-center rounded-l-xl text-[#062a54] transition hover:bg-[#fff4f6]"
                aria-label="Quantity কমান"
              >
                <Minus className="size-3.5" />
              </button>
              <span className="min-w-8 text-center text-xs font-black text-[#062a54]">
                {quantityFormatter.format(quantity)}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(relation.productId, quantity + 1)}
                className="grid h-full w-9 place-items-center rounded-r-xl text-[#062a54] transition hover:bg-[#fff4f6]"
                aria-label="Quantity বাড়ান"
              >
                <Plus className="size-3.5" />
              </button>
            </div>

            {relation.variant ? (
              <span className="rounded-full bg-[#03A7FD]/10 px-2.5 py-1 text-[10px] font-bold text-[#0278ad]">
                {text(relation.variant)}
              </span>
            ) : null}
          </div>

          <div className="mt-auto flex items-center justify-between gap-2 pt-2">
            <button
              type="button"
              onClick={openProductModal}
              className="inline-flex min-w-0 items-center gap-1 text-[#4d9cff] outline-none transition-colors hover:text-[#FC5689]"
            >
              <span className="truncate text-[10px] font-bold md:text-[11px]">
                {copy.details}
              </span>
              <ExternalLink className="size-3 shrink-0" strokeWidth={2.2} />
            </button>

            <button
              type="button"
              onClick={openHowItWorksModal}
              className="inline-flex shrink-0 items-center gap-1 text-[#FC5689] outline-none transition-colors hover:text-[#df3f72]"
            >
              <CircleHelp className="size-3 shrink-0" strokeWidth={2.2} />
              <span className="text-[10px] font-bold md:text-[11px]">
                {copy.howItWorks}
              </span>
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <>
      <section
        aria-labelledby="combo-included-title"
        className="overflow-hidden rounded-[24px] bg-white p-3 shadow-[0_12px_38px_rgba(6,42,84,0.06)] md:rounded-[28px] md:p-6 lg:p-7"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#fff4f6] text-[#FC5689] md:size-12 md:rounded-2xl">
              <PackageCheck className="size-5 md:size-6" strokeWidth={2} />
            </span>

            <div className="min-w-0">
              <h2
                id="combo-included-title"
                className="font-heading text-lg font-bold leading-6 text-[#062a54] md:text-2xl md:leading-8"
              >
                {copy.title}
              </h2>
              <p className="mt-1 text-xs font-black text-[#FC5689] md:text-sm">
                {copy.summary}
              </p>
              <p className="mt-1 max-w-3xl text-[11px] leading-[18px] text-slate-500 md:text-sm md:leading-6">
                {copy.description}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={reset}
            disabled={!isCustomized || actionLoading}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-100 px-4 text-xs font-black text-[#062a54] transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RotateCcw className="size-4" />
            {copy.reset}
          </button>
        </div>

        {selectedItems.length > 0 ? (
          <>
            <div className="mt-4 grid grid-cols-1 gap-2.5 md:mt-6 md:grid-cols-2 md:gap-3">
              {initiallyVisibleItems.map((item) => (
                <ProductItem key={item.relation.productId} item={item} />
              ))}
            </div>

            {hasExpandableItems ? (
              <>
                <motion.div
                  id={expandableContentId}
                  aria-hidden={!isExpanded}
                  initial="collapsed"
                  animate={isExpanded ? "expanded" : "collapsed"}
                  variants={containerVariants}
                  className={
                    isExpanded
                      ? "overflow-hidden"
                      : "pointer-events-none overflow-hidden"
                  }
                  style={{
                    WebkitMaskImage: isExpanded
                      ? "none"
                      : "linear-gradient(to bottom, #000 0%, rgba(0,0,0,.56) 48%, transparent 100%)",
                    maskImage: isExpanded
                      ? "none"
                      : "linear-gradient(to bottom, #000 0%, rgba(0,0,0,.56) 48%, transparent 100%)",
                  }}
                >
                  <div className="mt-2.5 grid grid-cols-1 gap-2.5 md:mt-3 md:grid-cols-2 md:gap-3">
                    {expandableItems.map((item) => (
                      <motion.div
                        key={item.relation.productId}
                        variants={itemVariants}
                      >
                        <ProductItem item={item} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <div
                  className={`relative z-10 flex justify-center transition-[margin,padding,background] duration-500 ${
                    isExpanded
                      ? "mt-1"
                      : "-mt-16 bg-gradient-to-t from-white via-white/95 to-transparent pt-14"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isExpanded}
                    aria-controls={expandableContentId}
                    onClick={() => setIsExpanded((current) => !current)}
                    className="group inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-5 text-[#FC5689] outline-none transition-colors hover:text-[#e94276] focus-visible:ring-2 focus-visible:ring-[#FC5689]/30"
                  >
                    <span className="text-sm font-bold">
                      {isExpanded ? copy.showLess : copy.showMore}
                    </span>
                    <motion.span
                      aria-hidden="true"
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{
                        duration: 0.34,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <ChevronDown className="size-4" strokeWidth={2.4} />
                    </motion.span>
                  </button>
                </div>
              </>
            ) : null}
          </>
        ) : (
          <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-600">
            Solution Box সম্পূর্ণ খালি রাখা যাবে না। নিচের বাদ দেওয়া product
            থেকে অন্তত একটি আবার যোগ করুন।
          </div>
        )}

        {removedItems.length > 0 ? (
          <div className="mt-5 rounded-2xl bg-slate-50 p-3 md:p-4">
            <p className="text-xs font-black text-[#062a54]">
              {copy.removed} ({quantityFormatter.format(removedItems.length)})
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {removedItems.map(({ relation, product }) => (
                <button
                  key={relation.productId}
                  type="button"
                  onClick={() => restoreItem(relation.productId)}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-black text-[#062a54] shadow-[0_5px_16px_rgba(6,42,84,0.06)] transition hover:bg-[#fff4f6]"
                >
                  <Plus className="size-3.5 text-[#FC5689]" />
                  <span className="max-w-[200px] truncate">
                    {text(product.name)}
                  </span>
                  <span className="text-[#FC5689]">{copy.addBack}</span>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-5 rounded-2xl bg-gradient-to-br from-[#fff7fa] to-[#f5fbff] p-4 md:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs font-bold text-slate-500">
                  {copy.finalPrice}
                </p>
                <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-black text-[#FC5689] shadow-[0_3px_10px_rgba(6,42,84,0.05)]">
                  {isCustomized ? copy.customized : copy.defaultBox}
                </span>
              </div>

              <p className="mt-1 text-2xl font-black text-[#FC5689] md:text-3xl">
                {quoteLoading && !quote
                  ? "হিসাব হচ্ছে..."
                  : quote
                    ? money.format(quote.line.unitPrice)
                    : "—"}
              </p>

              {quote ? (
                <p className="mt-1 text-[11px] text-slate-500 md:text-xs">
                  {copy.retailValue}: {money.format(quote.retailTotal)} • Box
                  discount অনুযায়ী final price হিসাব হয়েছে
                </p>
              ) : null}
            </div>

            <div className="flex w-full gap-2 lg:w-auto">
              <button
                type="button"
                disabled={quoteLoading || actionLoading || !quote}
                onClick={() => void handleAddToCart()}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#03A7FD]/10 px-4 text-xs font-black text-[#0278ad] transition hover:bg-[#03A7FD]/15 disabled:cursor-not-allowed disabled:opacity-50 lg:flex-none"
              >
                {actionLoading ? (
                  <span className="size-4 animate-spin rounded-full border-2 border-[#03A7FD]/30 border-t-[#03A7FD]" />
                ) : (
                  <ShoppingCart className="size-4" />
                )}
                {copy.addToCart}
              </button>

              <button
                type="button"
                disabled={quoteLoading || actionLoading || !quote}
                onClick={() => void orderCurrentBoxNow()}
                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#FC5689] px-5 text-xs font-black text-white shadow-[0_8px_20px_rgba(252,86,137,0.22)] transition hover:bg-[#e94778] disabled:cursor-not-allowed disabled:opacity-50 lg:flex-none"
              >
                <Check className="size-4" />
                {copy.orderNow}
              </button>
            </div>
          </div>

          {error ? (
            <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs font-bold leading-5 text-red-600">
              {error}
            </p>
          ) : null}
        </div>
      </section>

      <ProductDetailsModal
        product={selectedProduct}
        onClose={closeProductModal}
      />

      <ProductHowItWorksModal
        product={howItWorksProduct}
        onClose={closeHowItWorksModal}
        onViewDetails={openDetailsFromHowItWorks}
      />
    </>
  );
}
