"use client";

/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useId, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  CircleHelp,
  ExternalLink,
  Minus,
  PackageCheck,
  PackagePlus,
  Plus,
  RotateCcw,
  Search,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { toast } from "sonner";

import { commerceApi } from "@/modules/commerce/lib/client";
import ProductDetailsModal from "@/modules/products/components/ProductDetailsModal";
import ProductHowItWorksModal from "@/modules/products/components/ProductHowItWorksModal";
import type { MaanikoProduct } from "@/modules/products/types/product";
import { useShop } from "@/modules/shop/context/ShopContext";
import { useSiteText } from "@/modules/site-content/context/SiteTextContext";
import type { SolutionBox } from "@/modules/solution-boxes/types/solutionBox";

type Quote = {
  line: { unitPrice: number };
  retailTotal: number;
  minimumSubtotal: number;
  discountPercent: number;
  appliedDiscountPercent: number;
  discountEligible: boolean;
  amountNeeded: number;
  canonicalConfig: Array<{ productId: string; quantity: number }>;
};

type SelectedProduct = {
  product: MaanikoProduct;
  quantity: number;
  variant?: string | null;
};

const containerVariants: Variants = {
  collapsed: {
    height: 106,
    transition: {
      height: { duration: 0.46, ease: [0.4, 0, 0.2, 1] },
      staggerChildren: 0.04,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
  expanded: {
    height: "auto",
    transition: {
      height: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
      delayChildren: 0.08,
      staggerChildren: 0.075,
      when: "beforeChildren",
    },
  },
};

const itemVariants: Variants = {
  collapsed: {
    opacity: 0.2,
    y: -8,
    scale: 0.975,
    filter: "blur(1.6px)",
    transition: { duration: 0.22, ease: "easeIn" },
  },
  expanded: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
  },
};

function getInitialProductCount() {
  if (typeof window === "undefined") return 2;
  if (window.matchMedia("(min-width: 1024px)").matches) return 4;
  if (window.matchMedia("(min-width: 768px)").matches) return 3;
  return 2;
}

export default function CustomSolutionBoxBuilder({
  products,
  sourceBox,
}: {
  products: MaanikoProduct[];
  sourceBox: SolutionBox | null;
}) {
  const router = useRouter();
  const { text } = useSiteText();
  const { addCustomComboToCart } = useShop();
  const expandableContentId = useId();

  const defaults = useMemo(
    () =>
      new Map(
        (sourceBox?.items ?? []).map((item) => [item.productId, item.quantity]),
      ),
    [sourceBox],
  );

  const [selected, setSelected] = useState<Map<string, number>>(
    () => new Map(defaults),
  );
  const [query, setQuery] = useState("");
  const [quote, setQuote] = useState<Quote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [initialCount, setInitialCount] = useState(2);
  const [detailsProduct, setDetailsProduct] = useState<MaanikoProduct | null>(
    null,
  );
  const [howProduct, setHowProduct] = useState<MaanikoProduct | null>(null);

  const productMap = useMemo(
    () => new Map(products.map((product) => [product.id, product])),
    [products],
  );

  const variantMap = useMemo(
    () =>
      new Map(
        (sourceBox?.items ?? []).map((item) => [item.productId, item.variant]),
      ),
    [sourceBox],
  );

  const config = useMemo(
    () =>
      [...selected.entries()]
        .filter(([, quantity]) => quantity > 0)
        .map(([productId, quantity]) => ({ productId, quantity })),
    [selected],
  );

  const selectedProducts = useMemo<SelectedProduct[]>(
    () =>
      config.flatMap((item) => {
        const product = productMap.get(item.productId);
        return product
          ? [
            {
              product,
              quantity: item.quantity,
              variant: variantMap.get(item.productId),
            },
          ]
          : [];
      }),
    [config, productMap, variantMap],
  );

  const filteredProducts = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return products;

    return products.filter((product) =>
      [
        text(product.name),
        text(product.description),
        text(product.category),
        product.sku,
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    );
  }, [products, query, text]);

  const number = useMemo(() => new Intl.NumberFormat("bn-BD"), []);
  const money = useMemo(
    () =>
      new Intl.NumberFormat("bn-BD", {
        style: "currency",
        currency: "BDT",
        currencyDisplay: "narrowSymbol",
        maximumFractionDigits: 0,
      }),
    [],
  );

  const totalQuantity = useMemo(
    () => config.reduce((total, item) => total + item.quantity, 0),
    [config],
  );

  const initialItems = selectedProducts.slice(0, initialCount);
  const expandableItems = selectedProducts.slice(initialCount);

  useEffect(() => {
    function updateInitialCount() {
      setInitialCount(getInitialProductCount());
    }

    updateInitialCount();
    window.addEventListener("resize", updateInitialCount);
    return () => window.removeEventListener("resize", updateInitialCount);
  }, []);

  useEffect(() => {
    if (!summaryOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setSummaryOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [summaryOpen]);

  useEffect(() => {
    if (!config.length) {
      const timer = window.setTimeout(() => {
        setQuote(null);
        setError("");
        setQuoteLoading(false);
      }, 0);
      return () => window.clearTimeout(timer);
    }

    let cancelled = false;
    const timer = window.setTimeout(async () => {
      setQuoteLoading(true);
      setError("");

      try {
        const result = await commerceApi.quoteCustomCombo({
          customConfig: config,
          quantity: 1,
        });
        if (!cancelled) setQuote(result as Quote);
      } catch (reason) {
        if (!cancelled) {
          setQuote(null);
          setError(
            reason instanceof Error ? reason.message : "মূল্য হিসাব করা যায়নি",
          );
        }
      } finally {
        if (!cancelled) setQuoteLoading(false);
      }
    }, 250);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [config]);

  function setQuantity(productId: string, quantity: number) {
    setSelected((current) => {
      const next = new Map(current);
      const safeQuantity = Math.max(0, Math.min(20, Math.floor(quantity)));

      if (safeQuantity === 0) next.delete(productId);
      else next.set(productId, safeQuantity);

      return next;
    });
  }

  const openDetails = useCallback((product: MaanikoProduct) => {
    setHowProduct(null);
    setDetailsProduct(product);
  }, []);

  function openHowItWorks(product: MaanikoProduct) {
    setDetailsProduct(null);
    setHowProduct(product);
  }

  async function addBox(goToCheckout: boolean) {
    if (!quote) return;

    setActionLoading(true);
    setError("");

    try {
      const comboItems = quote.canonicalConfig.flatMap((item) => {
        const product = productMap.get(item.productId);
        return product
          ? [
            {
              productId: product.id,
              slug: product.slug,
              href: `/products/${product.slug}`,
              name: product.name,
              image: product.images[0] ?? "",
              quantity: item.quantity,
            },
          ]
          : [];
      });

      const customProduct: MaanikoProduct = {
        id: "custom-solution-box",
        slug: "customised",
        href: "/solution-box/customised",
        name: "নিজের মতো সাজানো Solution Box",
        description: "আপনার পছন্দের পণ্য দিয়ে তৈরি Solution Box",
        category: "মানিকো সল্যুশন বক্স",
        images: comboItems
          .map((item) => item.image)
          .filter(Boolean)
          .slice(0, 2),
        price: quote.line.unitPrice,
        stock: 99,
        productType: "combo",
        sku: "CUSTOM-SOLUTION-BOX",
        comboItems,
      };

      await addCustomComboToCart(
        customProduct,
        quote.canonicalConfig,
        quote.line.unitPrice,
      );
      toast.success("Custom Solution Box কার্টে যোগ হয়েছে");

      if (goToCheckout) router.push("/checkout");
    } catch (reason) {
      setError(
        reason instanceof Error ? reason.message : "কার্টে যোগ করা যায়নি",
      );
    } finally {
      setActionLoading(false);
    }
  }

  function SelectedProductCard({ item }: { item: SelectedProduct }) {
    const { product, quantity, variant } = item;
    const productName = text(product.name);

    return (
      <article className="group grid min-w-0 grid-cols-[56px_minmax(0,1fr)_32px] items-center gap-3 rounded-2xl border border-slate-100 bg-[#fbfcfe] p-2.5 transition hover:border-[#f3dce4] hover:bg-white">
        <button
          type="button"
          onClick={() => openDetails(product)}
          aria-label={`পণ্যের বিস্তারিত: ${productName}`}
          className="size-14 overflow-hidden rounded-xl bg-[#fff4f6] outline-none focus-visible:ring-4 focus-visible:ring-[#FC5689]/20"
        >
          <img
            src={product.images[0] ?? ""}
            alt={productName}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </button>

        <div className="min-w-0">
          <button
            type="button"
            onClick={() => openDetails(product)}
            className="block min-w-0 max-w-full text-left text-[#062a54] outline-none transition-colors hover:text-[#FC5689]"
          >
            <span className="block truncate text-xs font-black leading-5">
              {productName}
            </span>
          </button>

          <div className="mt-1.5 flex min-w-0 items-center gap-2">
            <div className="inline-flex h-8 shrink-0 items-center rounded-lg bg-white shadow-[inset_0_0_0_1px_#e5eaf0]">
              <button
                type="button"
                onClick={() => setQuantity(product.id, quantity - 1)}
                className="grid h-full w-8 place-items-center rounded-l-lg transition hover:bg-[#fff4f6]"
                aria-label="Quantity কমান"
              >
                <Minus className="size-3" />
              </button>
              <span className="min-w-6 text-center text-[11px] font-black">
                {number.format(quantity)}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(product.id, quantity + 1)}
                className="grid h-full w-8 place-items-center rounded-r-lg transition hover:bg-[#fff4f6]"
                aria-label="Quantity বাড়ান"
              >
                <Plus className="size-3" />
              </button>
            </div>

            {variant ? (
              <span className="min-w-0 truncate rounded-full bg-[#03A7FD]/10 px-2 py-1 text-[9px] font-bold text-[#0278ad]">
                {text(variant)}
              </span>
            ) : null}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setQuantity(product.id, 0)}
          className="grid size-8 place-items-center rounded-full bg-red-50 text-red-500 transition hover:bg-red-100"
          aria-label={`${productName} বাদ দিন`}
        >
          <Trash2 className="size-3.5" />
        </button>
      </article>
    );
  }

  function CatalogProductCard({ product }: { product: MaanikoProduct }) {
    const quantity = selected.get(product.id) ?? 0;
    const productName = text(product.name);

    return (
      <article
        className={`group grid min-h-[108px] min-w-0 grid-cols-[72px_minmax(0,1fr)] gap-3 rounded-2xl border p-3 transition duration-300 md:min-h-[128px] md:grid-cols-[92px_minmax(0,1fr)] md:p-4 ${quantity
          ? "border-[#f4bfd0] bg-[#fff8fb] shadow-[0_8px_24px_rgba(252,86,137,0.08)]"
          : "border-[#edf0f4] bg-[#fbfcfe] hover:border-[#eadde2] hover:bg-white hover:shadow-[0_12px_30px_rgba(6,42,84,0.07)]"
          }`}
      >
        <button
          type="button"
          onClick={() => openDetails(product)}
          aria-label={`পণ্যের বিস্তারিত: ${productName}`}
          className="size-[72px] overflow-hidden rounded-xl bg-[#fff4f6] outline-none focus-visible:ring-4 focus-visible:ring-[#FC5689]/20 md:size-[92px]"
        >
          <img
            src={product.images[0] ?? ""}
            alt={productName}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </button>

        <div className="flex min-w-0 flex-col">
          <button
            type="button"
            onClick={() => openDetails(product)}
            className="min-w-0 text-left text-[#062a54] outline-none transition-colors hover:text-[#FC5689]"
          >
            <span className="line-clamp-2 font-heading text-sm font-bold leading-[19px] md:text-base md:leading-6">
              {productName}
            </span>
          </button>

          <div className="mt-1.5 flex flex items-center gap-2 justify-between">
            <div>            <span className="text-xs font-black text-[#FC5689] md:text-sm">
              {money.format(product.price)}
            </span>
              {quantity ? (
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-black text-emerald-600">
                  <Check className="mr-0.5 inline size-3" /> যোগ হয়েছে
                </span>
              ) : null}
            </div>
            <div className="mt-2 flex items-center gap-2">
              {quantity ? (
                <div className="inline-flex h-8 items-center rounded-xl bg-white shadow-[inset_0_0_0_1px_#e8edf3]">
                  <button
                    type="button"
                    onClick={() => setQuantity(product.id, quantity - 1)}
                    className="grid h-full w-8 place-items-center rounded-l-xl hover:bg-[#fff4f6]"
                    aria-label="Quantity কমান"
                  >
                    <Minus className="size-3" />
                  </button>
                  <span className="min-w-7 text-center text-[11px] font-black">
                    {number.format(quantity)}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(product.id, quantity + 1)}
                    className="grid h-full w-8 place-items-center rounded-r-xl hover:bg-[#fff4f6]"
                    aria-label="Quantity বাড়ান"
                  >
                    <Plus className="size-3" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={product.stock <= 0}
                  onClick={() => setQuantity(product.id, 1)}
                  className="inline-flex h-6 items-center gap-1 rounded-xl bg-[#FC5689] px-3   text-white shadow-[0_6px_16px_rgba(252,86,137,0.2)] transition hover:bg-[#e94778] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                >
                  <Plus className="size-3" /> <p className="text-xs">যোগ করুন</p>
                </button>
              )}
            </div>
          </div>


          <div className="mt-auto flex items-center justify-between gap-2 pt-2">
            <button
              type="button"
              onClick={() => openDetails(product)}
              className="inline-flex items-center gap-1  text-[#4d9cff]"
            >
              <p className="text-xs font-bold">বিস্তারিত</p> <ExternalLink className="size-3" />
            </button>
            <button
              type="button"
              onClick={() => openHowItWorks(product)}
              className="inline-flex items-center gap-1  text-[#FC5689]"
            >
              <CircleHelp className="size-3" /> <p className="text-xs font-bold">কীভাবে কাজ করে</p>
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff9fb] pb-[164px] pt-4 text-[#062a54] md:pb-[172px] md:pt-8 lg:pb-[100px] xl:pb-8">
      <div className="mx-auto w-full max-w-[1440px] space-y-4 px-4 md:space-y-6 md:px-6 lg:px-8">
        <Link
          href="/solution-box"
          className="inline-flex items-center gap-2 text-sm font-black text-[#FC5689]"
        >
          <ArrowLeft className="size-4" /> Solution Box-এ ফিরুন
        </Link>

        <div className="grid items-start gap-4 md:gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
          <section className="hidden overflow-hidden rounded-[24px] border border-[#f0e4e8] bg-white shadow-[0_18px_50px_rgba(6,42,84,0.09)] lg:sticky lg:top-24 lg:order-2 lg:flex lg:max-h-[calc(100vh-7rem)] lg:flex-col">
            <div className="shrink-0 border-b border-slate-100 bg-gradient-to-br from-white to-[#fff8fb] p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#fff0f5] text-[#FC5689]">
                    <PackageCheck className="size-5" />
                  </span>
                  <div className="min-w-0">
                    <h1 className="truncate font-heading text-lg font-bold leading-6">
                      আপনার Solution Box
                    </h1>
                    <p className="mt-0.5 text-[11px] font-bold text-[#FC5689]">
                      {number.format(totalQuantity)}টি পণ্য যোগ করা হয়েছে
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelected(new Map(defaults))}
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-slate-500 shadow-sm ring-1 ring-slate-200 transition hover:text-[#FC5689]"
                  aria-label="আগের অবস্থায় নিন"
                  title="আগের অবস্থায় নিন"
                >
                  <RotateCcw className="size-4" />
                </button>
              </div>

              <p className="mt-3 rounded-xl bg-white/80 px-3 py-2 text-[10px] leading-4 text-slate-500 ring-1 ring-slate-100">
                {sourceBox
                  ? `“${text(sourceBox.name)}”-এর পণ্য দিয়ে শুরু হয়েছে।`
                  : "নিচের তালিকা থেকে প্রয়োজনীয় পণ্য যোগ করুন।"}
              </p>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-3">
              {selectedProducts.length ? (
                <>
                  <div className="grid grid-cols-1 gap-2">
                    {initialItems.map((item) => (
                      <SelectedProductCard key={item.product.id} item={item} />
                    ))}
                  </div>

                  {expandableItems.length ? (
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
                        <div className="mt-2 grid grid-cols-1 gap-2">
                          {expandableItems.map((item) => (
                            <motion.div
                              key={item.product.id}
                              variants={itemVariants}
                            >
                              <SelectedProductCard item={item} />
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      <div
                        className={`relative z-10 flex justify-center transition-[margin,padding,background] duration-500 ${isExpanded
                          ? "mt-1"
                          : "-mt-16 bg-gradient-to-t from-white via-white/95 to-transparent pt-14"
                          }`}
                      >
                        <button
                          type="button"
                          aria-expanded={isExpanded}
                          aria-controls={expandableContentId}
                          onClick={() => setIsExpanded((current) => !current)}
                          className="inline-flex min-h-11 items-center gap-1.5 rounded-full px-5 text-sm font-bold text-[#FC5689]"
                        >
                          {isExpanded ? "কম দেখুন" : "আরো দেখুন"}
                          <motion.span
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.34 }}
                          >
                            <ChevronDown className="size-4" />
                          </motion.span>
                        </button>
                      </div>
                    </>
                  ) : null}
                </>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-7 text-center">
                  <PackagePlus className="mx-auto size-9 text-slate-300" />
                  <p className="mt-2 text-sm font-bold text-slate-500">
                    এখনো কোনো পণ্য যোগ করা হয়নি
                  </p>
                </div>
              )}
            </div>

            <div className="shrink-0 border-t border-slate-100 bg-white p-4">
              <div className="rounded-2xl bg-gradient-to-br from-[#fff4f8] to-[#f1faff] p-3.5 ring-1 ring-[#f1e1e7]">
                <p className="text-[10px] font-bold text-slate-500">সর্বমোট</p>
                <p className="mt-0.5 text-2xl font-black text-[#FC5689]">
                  {quoteLoading && !quote
                    ? "হিসাব হচ্ছে..."
                    : quote
                      ? money.format(quote.line.unitPrice)
                      : "—"}
                </p>

                {quote ? (
                  <>
                    <p className="mt-1 text-[10px] text-slate-500">
                      আলাদা পণ্যের মূল্য: {money.format(quote.retailTotal)}
                    </p>
                    {!quote.discountEligible ? (
                      <p className="mt-1.5 text-[10px] font-bold leading-4 text-amber-700">
                        আরো {money.format(quote.amountNeeded)} যোগ করলে{" "}
                        {number.format(quote.discountPercent)}% discount পাবেন।
                      </p>
                    ) : (
                      <p className="mt-1.5 text-[10px] font-bold leading-4 text-emerald-600">
                        {number.format(quote.appliedDiscountPercent)}% combo
                        discount প্রয়োগ হয়েছে।
                      </p>
                    )}
                  </>
                ) : null}

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={!quote || quoteLoading || actionLoading}
                    onClick={() => void addBox(false)}
                    className="inline-flex h-11 items-center justify-center gap-1.5 rounded-xl bg-white px-2 text-[10px] font-black text-[#0278ad] ring-1 ring-[#03A7FD]/20 disabled:opacity-40"
                  >
                    <ShoppingCart className="size-3.5" /> কার্টে রাখুন
                  </button>
                  <button
                    type="button"
                    disabled={!quote || quoteLoading || actionLoading}
                    onClick={() => void addBox(true)}
                    className="h-11 rounded-xl bg-[#FC5689] px-3 text-[11px] font-black text-white shadow-[0_8px_20px_rgba(252,86,137,0.24)] disabled:opacity-40"
                  >
                    অর্ডার করুন
                  </button>
                </div>
              </div>

              {error ? (
                <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-600">
                  {error}
                </p>
              ) : null}
            </div>
          </section>

          <section className="rounded-[24px] bg-white p-3 shadow-[0_12px_38px_rgba(6,42,84,0.06)] md:rounded-[28px] md:p-6 lg:order-1 lg:p-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-heading text-lg font-bold md:text-2xl">
                  সব পণ্য
                </h2>
                <p className="mt-1 text-xs text-slate-500 md:text-sm">
                  পণ্যের বিস্তারিত এবং কীভাবে কাজ করে—দুইটি modal-ই দেখা যাবে।
                </p>
              </div>
              <label className="relative block w-full sm:max-w-sm">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="পণ্য খুঁজুন..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-[#FC5689] focus:ring-4 focus:ring-[#FC5689]/10"
                />
              </label>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-3 xl:grid-cols-2">
              {filteredProducts.map((product) => (
                <CatalogProductCard key={product.id} product={product} />
              ))}
            </div>

            {!filteredProducts.length ? (
              <p className="mt-5 rounded-2xl bg-slate-50 p-8 text-center text-sm text-slate-500">
                কোনো পণ্য পাওয়া যায়নি।
              </p>
            ) : null}
          </section>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-[calc(72px+env(safe-area-inset-bottom))] z-[80] border-t border-[#f0dce4] bg-white/95 px-3 py-2 shadow-[0_-10px_30px_rgba(6,42,84,0.1)] backdrop-blur-xl md:bottom-[calc(76px+env(safe-area-inset-bottom))] lg:hidden">
        <div className="mx-auto flex max-w-2xl items-center gap-2">
          <button
            type="button"
            onClick={() => setSummaryOpen(true)}
            className="flex h-14 min-w-0 flex-1 items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-[#fff4f7] to-[#f4fbff] px-4 text-left ring-1 ring-[#f3dce4]"
            aria-label="নির্বাচিত পণ্য ও মূল্যের summary খুলুন"
          >
            <span className="min-w-0">
              <span className="block truncate text-[10px] font-bold text-slate-500">
                {number.format(totalQuantity)}টি পণ্য • আপনার Box
              </span>
              <span className="mt-0.5 block text-base font-black text-[#FC5689]">
                {quoteLoading && !quote
                  ? "হিসাব হচ্ছে..."
                  : quote
                    ? money.format(quote.line.unitPrice)
                    : "—"}
              </span>
            </span>
            <ChevronUp className="size-5 shrink-0 text-[#062a54]" />
          </button>

          <button
            type="button"
            disabled={!quote || quoteLoading || actionLoading}
            onClick={() => void addBox(true)}
            className="h-14 shrink-0 rounded-2xl bg-[#FC5689] px-4 text-xs font-black text-white shadow-[0_8px_22px_rgba(252,86,137,0.3)] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
          >
            অর্ডার করুন
          </button>
        </div>
      </div>

      <AnimatePresence>
        {summaryOpen ? (
          <motion.div
            className="fixed inset-0 z-[120] flex items-end bg-[#03182e]/55 backdrop-blur-[2px] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSummaryOpen(false);
            }}
          >
            <motion.section
              role="dialog"
              aria-modal="true"
              aria-label="Custom Solution Box summary"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              onMouseDown={(event) => event.stopPropagation()}
              className="flex max-h-[88dvh] w-full flex-col overflow-hidden rounded-t-[28px] bg-white shadow-[0_-24px_70px_rgba(0,0,0,0.25)]"
            >
              <div className="mx-auto mt-2.5 h-1.5 w-12 shrink-0 rounded-full bg-slate-200" />

              <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 px-4 py-3">
                <div className="min-w-0">
                  <h2 className="font-heading text-lg font-bold">
                    আপনার Solution Box
                  </h2>
                  <p className="text-[11px] font-bold text-[#FC5689]">
                    {number.format(totalQuantity)}টি পণ্য যোগ করা হয়েছে
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelected(new Map(defaults))}
                    className="grid size-9 place-items-center rounded-full bg-slate-100 text-[#062a54]"
                    aria-label="আগের অবস্থায় নিন"
                  >
                    <RotateCcw className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSummaryOpen(false)}
                    className="grid size-9 place-items-center rounded-full bg-[#fff4f6] text-[#FC5689]"
                    aria-label="Summary বন্ধ করুন"
                  >
                    <X className="size-4" />
                  </button>
                </div>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3">
                {selectedProducts.length ? (
                  <div className="space-y-2.5">
                    {selectedProducts.map((item) => (
                      <SelectedProductCard key={item.product.id} item={item} />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                    <PackagePlus className="mx-auto size-9 text-slate-300" />
                    <p className="mt-2 text-sm font-bold text-slate-500">
                      এখনো কোনো পণ্য যোগ করা হয়নি
                    </p>
                  </div>
                )}
              </div>

              <div className="shrink-0 border-t border-slate-100 bg-white px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-bold text-slate-500">
                      আপনার Box-এর বর্তমান মূল্য
                    </p>
                    <p className="text-2xl font-black text-[#FC5689]">
                      {quoteLoading && !quote
                        ? "হিসাব হচ্ছে..."
                        : quote
                          ? money.format(quote.line.unitPrice)
                          : "—"}
                    </p>
                  </div>
                  {quote ? (
                    <p
                      className={`max-w-[48%] text-right text-[10px] font-bold leading-4 ${quote.discountEligible
                        ? "text-emerald-600"
                        : "text-amber-700"
                        }`}
                    >
                      {quote.discountEligible
                        ? `${number.format(quote.appliedDiscountPercent)}% combo discount প্রয়োগ হয়েছে`
                        : `আরো ${money.format(quote.amountNeeded)} যোগ করলে ${number.format(quote.discountPercent)}% discount`}
                    </p>
                  ) : null}
                </div>

                {error ? (
                  <p className="mt-2 rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-600">
                    {error}
                  </p>
                ) : null}

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    disabled={!quote || quoteLoading || actionLoading}
                    onClick={() => void addBox(false)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#03A7FD]/10 px-3 text-[11px] font-black text-[#0278ad] disabled:opacity-40"
                  >
                    <ShoppingCart className="size-4" /> পুরো Box কার্টে রাখুন
                  </button>
                  <button
                    type="button"
                    disabled={!quote || quoteLoading || actionLoading}
                    onClick={() => void addBox(true)}
                    className="h-11 rounded-xl bg-[#FC5689] px-3 text-[11px] font-black text-white disabled:opacity-40"
                  >
                    এখনই অর্ডার করুন
                  </button>
                </div>
              </div>
            </motion.section>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <ProductDetailsModal
        product={detailsProduct}
        onClose={() => setDetailsProduct(null)}
      />
      <ProductHowItWorksModal
        product={howProduct}
        onClose={() => setHowProduct(null)}
        onViewDetails={openDetails}
      />
    </main>
  );
}
