"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  Check,
  Eye,
  Frown,
  ShoppingCart,
  Smile,
  Star,
} from "lucide-react";

import { useSiteText } from "@/modules/site-content/context/SiteTextContext";
import { useShop } from "@/modules/shop/context/ShopContext";
import type { ProblemSolutionItem } from "@/modules/problem-solutions/data/problemSolutions";
import type { MaanikoProduct } from "@/modules/products/types/product";

type ProblemSolutionCardProps = {
  item: ProblemSolutionItem & { product: MaanikoProduct };
};

export default function ProblemSolutionCard({
  item,
}: ProblemSolutionCardProps) {
  const { locale, text } = useSiteText();
  const { addToCart } = useShop();

  const [isAdded, setIsAdded] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { product } = item;
  const productHref = product.href ?? `/products/${product.slug}`;
  const solutionImage = product.images[0] ?? item.problemImage;
  const isAvailable = product.stock > 0;

  const priceFormatter = useMemo(
    () =>
      new Intl.NumberFormat("bn-BD", {
        style: "currency",
        currency: "BDT",
        currencyDisplay: "narrowSymbol",
        maximumFractionDigits: 0,
      }),
    [locale],
  );

  useEffect(() => {
    return () => {
      if (resetTimer.current) {
        clearTimeout(resetTimer.current);
      }
    };
  }, []);

  function handleAddToCart() {
    if (!isAvailable) return;

    addToCart(product);
    setIsAdded(true);

    if (resetTimer.current) {
      clearTimeout(resetTimer.current);
    }

    resetTimer.current = setTimeout(() => {
      setIsAdded(false);
    }, 1400);
  }

  return (
    <article className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[22px] border border-[#f3dfe6] bg-white shadow-[0_14px_45px_rgba(6,42,84,0.09)] transition-all duration-500 hover:-translate-y-1 hover:border-[#FC5689]/40 hover:shadow-[0_24px_55px_rgba(6,42,84,0.14)]">
      <div className="relative min-h-[190px] overflow-hidden bg-[#fff8fa]">
        <img
          src={item.problemImage}
          alt={text(item.problemTitle)}
          loading="lazy"
          className="absolute inset-y-0 right-0 h-full w-[52%] object-cover transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#fff8fa] from-45% via-[#fff8fa]/90 via-62% to-transparent" />

        <div className="relative z-10 flex h-full min-h-[190px] max-w-[68%] flex-col p-4 md:p-5">
          <div className="mb-3 flex items-center gap-2 text-[#FC5689]">
            <span className="grid size-7 place-items-center rounded-full border border-[#FC5689]/30 bg-white">
              <Frown className="size-4" strokeWidth={1.9} />
            </span>

            <span className="text-xs font-extrabold">{"সমস্যা"}</span>
          </div>

          <h3 className="text-lg font-black leading-snug text-[#062a54]">
            {text(item.problemTitle)}
          </h3>

          <p className="mt-2 line-clamp-3 text-xs leading-5 text-slate-600">
            {text(item.problemDescription)}
          </p>
        </div>
      </div>

      <div className="relative z-20 h-0">
        <span className="absolute left-1/2 top-0 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white bg-[#FC5689] text-white shadow-[0_7px_18px_rgba(252,86,137,0.3)]">
          <ArrowDown className="size-4" strokeWidth={2.5} />
        </span>
      </div>

      <div className="relative min-h-[215px] flex-1 overflow-hidden border-t border-[#f5e5eb] bg-white">
        <img
          src={solutionImage}
          alt={text(product.name)}
          loading="lazy"
          className="absolute bottom-2 right-1 h-[72%] w-[51%] object-contain transition-transform duration-700 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-white from-48% via-white/95 via-65% to-transparent" />

        <div className="relative z-10 flex min-h-[215px] max-w-[70%] flex-col p-4 pt-6 md:p-5 md:pt-7">
          <div className="mb-3 flex items-center gap-2 text-[#03A7FD]">
            <span className="grid size-7 place-items-center rounded-full border border-[#03A7FD]/30 bg-[#f4fbff]">
              <Smile className="size-4" strokeWidth={1.9} />
            </span>

            <span className="text-xs font-extrabold">{"সমাধান"}</span>
          </div>

          <h3 className="text-base font-black leading-snug text-[#062a54]">
            {text(item.solutionTitle)}
          </h3>

          <p className="mt-2 line-clamp-3 text-[11px] leading-[18px] text-slate-600">
            {text(item.solutionDescription)}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-3">
            <span className="text-base font-black text-[#FC5689]">
              {priceFormatter.format(product.price)}
            </span>

            {product.compareAtPrice &&
              product.compareAtPrice > product.price && (
                <span className="text-[10px] font-semibold text-slate-400 line-through">
                  {priceFormatter.format(product.compareAtPrice)}
                </span>
              )}

            {product.rating !== undefined && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-[#062a54]">
                <Star className="size-3 fill-amber-400 text-amber-400" />
                {product.rating.toFixed(1)}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_52px] gap-2 border-t border-[#f0e6e9] bg-white p-3">
        <Link
          href={productHref}
          aria-label={text(product.name)}
          className="group/button flex h-11 items-center justify-center gap-2 rounded-xl bg-[#FC5689] px-3 text-xs font-extrabold text-white shadow-[0_9px_22px_rgba(252,86,137,0.24)] transition-all duration-300 hover:bg-[#03A7FD] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FC5689]/20 active:scale-[0.98]"
        >
          <span>{"পণ্যটি দেখুন"}</span>

          <Eye className="size-4 transition-transform duration-300 group-hover/button:scale-110" />
        </Link>

        <button
          type="button"
          disabled={!isAvailable}
          onClick={handleAddToCart}
          aria-label={"কার্টে যোগ করুন"}
          className={`grid h-11 w-[52px] place-items-center rounded-xl border transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#03A7FD]/20 ${
            !isAvailable
              ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
              : isAdded
                ? "border-[#03A7FD] bg-[#edf9ff] text-[#03A7FD]"
                : "border-[#dce3ec] bg-white text-[#062a54] hover:border-[#03A7FD] hover:text-[#03A7FD]"
          }`}
        >
          {isAdded ? (
            <Check className="size-5" strokeWidth={2.6} />
          ) : (
            <ShoppingCart className="size-5" strokeWidth={2} />
          )}
        </button>
      </div>
    </article>
  );
}
