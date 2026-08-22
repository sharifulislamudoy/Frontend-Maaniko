"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useId, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, ExternalLink, PackageCheck } from "lucide-react";
import { motion, type Variants } from "framer-motion";

import { useLanguage } from "@/context/LanguageContext";
import type { ResolvedSolutionBoxItem } from "@/data/solutionBoxes";

type ComboIncludedProductsProps = {
  items: ResolvedSolutionBoxItem[];
};

const containerVariants: Variants = {
  collapsed: {
    height: 104,
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
      delayChildren: 0.1,
      staggerChildren: 0.075,
      when: "beforeChildren",
    },
  },
};

const itemVariants: Variants = {
  collapsed: {
    opacity: 0.23,
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

function getInitialCount() {
  if (typeof window === "undefined") return 2;
  if (window.matchMedia("(min-width: 1024px)").matches) return 4;
  if (window.matchMedia("(min-width: 768px)").matches) return 3;
  return 2;
}

export default function ComboIncludedProducts({
  items,
}: ComboIncludedProductsProps) {
  const { language, localize } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [initialCount, setInitialCount] = useState(2);
  const contentId = useId();

  useEffect(() => {
    const updateCount = () => setInitialCount(getInitialCount());
    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  const quantityFormatter = useMemo(
    () => new Intl.NumberFormat(language === "bn" ? "bn-BD" : "en-BD"),
    [language],
  );

  const visibleItems = items.slice(0, initialCount);
  const expandableItems = items.slice(initialCount);
  const hasExpandableItems = expandableItems.length > 0;

  const copy = language === "bn"
    ? {
        eyebrow: "আপনি ঠিক যা পাচ্ছেন",
        title: `এই Box-এ থাকছে ${quantityFormatter.format(items.reduce((total, item) => total + item.relation.quantity, 0))}টি পণ্য`,
        description: "প্রতিটি product-এর ছবি, quantity ও details page নিচে দেওয়া আছে।",
        details: "পণ্যের বিস্তারিত",
        showMore: "আরো দেখুন",
        showLess: "কম দেখুন",
        quantity: "পরিমাণ",
      }
    : {
        eyebrow: "Exactly what you receive",
        title: `${quantityFormatter.format(items.reduce((total, item) => total + item.relation.quantity, 0))} products inside this box`,
        description: "Every product image, quantity and working details-page link is listed below.",
        details: "Product details",
        showMore: "Show more",
        showLess: "Show less",
        quantity: "Quantity",
      };

  function ProductItem({ item }: { item: ResolvedSolutionBoxItem }) {
    const { relation, product } = item;
    const href = `/products/${product.slug}`;

    return (
      <article className="group grid min-w-0 grid-cols-[76px_minmax(0,1fr)] gap-3 rounded-2xl border border-[#dce3ec] bg-white p-3 shadow-[0_8px_24px_rgba(6,42,84,0.045)] transition duration-300 hover:border-[#FC5689]/35 hover:shadow-[0_12px_30px_rgba(6,42,84,0.08)] md:grid-cols-[88px_minmax(0,1fr)] md:p-4">
        <Link
          href={href}
          className="aspect-square overflow-hidden rounded-xl bg-[#fff4f6] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FC5689]/20"
        >
          <img
            src={product.images[0] ?? ""}
            alt={localize(product.name)}
            className="size-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>

        <div className="flex min-w-0 flex-col">
          <div className="flex items-start justify-between gap-2">
            <Link
              href={href}
              className="line-clamp-2 text-sm font-black leading-5 text-[#062a54] transition hover:text-[#FC5689] md:text-base md:leading-6"
            >
              {localize(product.name)}
            </Link>

            <span className="shrink-0 rounded-full bg-[#fff4f6] px-2 py-1 text-[10px] font-black text-[#FC5689] md:text-xs">
              × {quantityFormatter.format(relation.quantity)}
            </span>
          </div>

          <p className="mt-1 text-[10px] font-semibold text-slate-400 md:text-xs">
            {copy.quantity}: {quantityFormatter.format(relation.quantity)}
            {relation.variant ? ` • ${localize(relation.variant)}` : ""}
          </p>

          <Link
            href={href}
            className="mt-auto inline-flex w-fit items-center gap-1 pt-2 text-[11px] font-extrabold text-[#03A7FD] transition hover:text-[#FC5689] md:text-xs"
          >
            {copy.details}
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <section
      aria-labelledby="combo-included-title"
      className="rounded-[22px] border border-[#dce3ec] bg-white p-3 shadow-[0_12px_36px_rgba(6,42,84,0.055)] md:rounded-[26px] md:p-6 lg:p-7"
    >
      <div className="flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#fff4f6] text-[#FC5689] md:size-12">
          <PackageCheck className="size-5 md:size-6" aria-hidden="true" />
        </span>
        <div>
          <p className="text-[10px] font-black uppercase text-[#FC5689] md:text-xs">
            {copy.eyebrow}
          </p>
          <h2
            id="combo-included-title"
            className="mt-1 text-lg font-black text-[#062a54] md:text-2xl"
          >
            {copy.title}
          </h2>
          <p className="mt-1 text-xs leading-5 text-slate-500 md:text-sm md:leading-6">
            {copy.description}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-2.5 md:mt-6 md:grid-cols-2 md:gap-3">
        {visibleItems.map((item) => (
          <ProductItem key={item.relation.productId} item={item} />
        ))}
      </div>

      {hasExpandableItems && (
        <>
          <motion.div
            id={contentId}
            aria-hidden={!isExpanded}
            initial="collapsed"
            animate={isExpanded ? "expanded" : "collapsed"}
            variants={containerVariants}
            className={`overflow-hidden ${isExpanded ? "pointer-events-auto" : "pointer-events-none"}`}
            style={{
              WebkitMaskImage: isExpanded
                ? "none"
                : "linear-gradient(to bottom, #000 0%, rgba(0,0,0,.58) 48%, transparent 100%)",
              maskImage: isExpanded
                ? "none"
                : "linear-gradient(to bottom, #000 0%, rgba(0,0,0,.58) 48%, transparent 100%)",
            }}
          >
            <div className="mt-2.5 grid gap-2.5 md:mt-3 md:grid-cols-2 md:gap-3">
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
              aria-controls={contentId}
              onClick={() => setIsExpanded((current) => !current)}
              className="group inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-5 text-sm font-black text-[#FC5689] outline-none transition hover:text-[#e94276] focus-visible:ring-2 focus-visible:ring-[#FC5689] focus-visible:ring-offset-2"
            >
              {isExpanded ? copy.showLess : copy.showMore}
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
      )}
    </section>
  );
}
