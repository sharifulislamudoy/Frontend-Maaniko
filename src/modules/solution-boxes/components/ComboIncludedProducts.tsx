"use client";

/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useId, useMemo, useState } from "react";
import {
  ChevronDown,
  CircleHelp,
  ExternalLink,
  PackageCheck,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

import ProductDetailsModal from "@/modules/products/components/ProductDetailsModal";
import ProductHowItWorksModal from "@/modules/products/components/ProductHowItWorksModal";
import type { MaanikoProduct } from "@/modules/products/types/product";
import { useSiteText } from "@/modules/site-content/context/SiteTextContext";
import type { ResolvedSolutionBoxItem } from "@/modules/solution-boxes/lib/solutionBox";

type ComboIncludedProductsProps = {
  items: ResolvedSolutionBoxItem[];
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
    opacity: 0.22,
    y: -8,
    scale: 0.975,
    filter: "blur(1.4px)",
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

export default function ComboIncludedProducts({
  items,
}: ComboIncludedProductsProps) {
  const { text } = useSiteText();
  const [isExpanded, setIsExpanded] = useState(false);
  const [initialCount, setInitialCount] = useState(2);
  const [selectedProduct, setSelectedProduct] = useState<MaanikoProduct | null>(
    null,
  );
  const [howItWorksProduct, setHowItWorksProduct] =
    useState<MaanikoProduct | null>(null);
  const expandableContentId = useId();

  useEffect(() => {
    function updateInitialCount() {
      setInitialCount(getInitialProductCount());
    }

    updateInitialCount();
    window.addEventListener("resize", updateInitialCount);
    return () => window.removeEventListener("resize", updateInitialCount);
  }, []);

  const number = useMemo(() => new Intl.NumberFormat("bn-BD"), []);
  const totalQuantity = useMemo(
    () => items.reduce((total, item) => total + item.relation.quantity, 0),
    [items],
  );

  const initialItems = items.slice(0, initialCount);
  const expandableItems = items.slice(initialCount);

  const openDetails = useCallback((product: MaanikoProduct) => {
    setHowItWorksProduct(null);
    setSelectedProduct(product);
  }, []);

  function openHowItWorks(product: MaanikoProduct) {
    setSelectedProduct(null);
    setHowItWorksProduct(product);
  }

  function ProductItem({ item }: { item: ResolvedSolutionBoxItem }) {
    const { relation, product } = item;
    const productName = text(product.name);

    return (
      <article className="group grid min-h-[108px] min-w-0 grid-cols-[72px_minmax(0,1fr)] gap-3 rounded-2xl bg-[#fbfcfe] p-3 shadow-[0_8px_22px_rgba(6,42,84,0.045)] transition duration-300 hover:bg-white hover:shadow-[0_12px_30px_rgba(6,42,84,0.08)] md:min-h-[128px] md:grid-cols-[92px_minmax(0,1fr)] md:p-4">
        <button
          type="button"
          onClick={() => openDetails(product)}
          aria-label={`পণ্যের বিস্তারিত: ${productName}`}
          className="aspect-square size-[72px] overflow-hidden rounded-xl bg-[#fff4f6] outline-none focus-visible:ring-4 focus-visible:ring-[#FC5689]/20 md:size-[92px]"
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
            className="min-w-0 text-left text-[#062a54] outline-none transition-colors hover:text-[#FC5689] focus-visible:text-[#FC5689]"
          >
            <span className="line-clamp-2 font-heading text-sm font-bold leading-[19px] md:text-base md:leading-6">
              {productName}
            </span>
          </button>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-black text-[#062a54] shadow-[inset_0_0_0_1px_#e8edf3]">
              পরিমাণ: {number.format(relation.quantity)}
            </span>
            {relation.variant ? (
              <span className="rounded-full bg-[#03A7FD]/10 px-2.5 py-1 text-[10px] font-bold text-[#0278ad]">
                {text(relation.variant)}
              </span>
            ) : null}
          </div>

          <div className="mt-auto flex items-center justify-between gap-2 pt-2">
            <button
              type="button"
              onClick={() => openDetails(product)}
              className="inline-flex min-w-0 items-center gap-1 text-[#4d9cff] outline-none transition-colors hover:text-[#FC5689]"
            >
              <span className="truncate text-[10px] font-bold md:text-[11px]">
                পণ্যের বিস্তারিত
              </span>
              <ExternalLink className="size-3 shrink-0" strokeWidth={2.2} />
            </button>

            <button
              type="button"
              onClick={() => openHowItWorks(product)}
              className="inline-flex shrink-0 items-center gap-1 text-[#FC5689] outline-none transition-colors hover:text-[#df3f72]"
            >
              <CircleHelp className="size-3 shrink-0" strokeWidth={2.2} />
              <span className="text-[10px] font-bold md:text-[11px]">
                কীভাবে কাজ করে
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
        <div className="flex min-w-0 items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#fff4f6] text-[#FC5689] md:size-12 md:rounded-2xl">
            <PackageCheck className="size-5 md:size-6" strokeWidth={2} />
          </span>

          <div className="min-w-0">
            <h2
              id="combo-included-title"
              className="font-heading text-lg font-bold leading-6 text-[#062a54] md:text-2xl md:leading-8"
            >
              আপনি ঠিক যা পাচ্ছেন
            </h2>
            <p className="mt-1 text-xs font-black text-[#FC5689] md:text-sm">
              এই Box-এ থাকছে {number.format(totalQuantity)}টি পণ্য
            </p>
            <p className="mt-1 max-w-3xl text-[11px] leading-[18px] text-slate-500 md:text-sm md:leading-6">
              এই Solution Box-এর পণ্য ও quantity নির্দিষ্ট। নিজের প্রয়োজনমতো
              পরিবর্তন করতে “নিজের মতো Solution Box সাজান” বাটন ব্যবহার করুন।
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-2.5 md:mt-6 md:grid-cols-2 md:gap-3">
          {initialItems.map((item) => (
            <ProductItem key={item.relation.productId} item={item} />
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
                  {isExpanded ? "কম দেখুন" : "আরো দেখুন"}
                </span>
                <motion.span
                  aria-hidden="true"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ChevronDown className="size-4" strokeWidth={2.4} />
                </motion.span>
              </button>
            </div>
          </>
        ) : null}
      </section>

      <ProductDetailsModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
      <ProductHowItWorksModal
        product={howItWorksProduct}
        onClose={() => setHowItWorksProduct(null)}
        onViewDetails={openDetails}
      />
    </>
  );
}
