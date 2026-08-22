"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Check, Eye, Heart, ShoppingCart } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { useShop } from "@/context/ShopContext";
import { solutionBoxToProduct } from "@/data/solutionBoxes";
import type { SolutionBoxCardProps } from "@/types/solution-box";

type CartStatus = "idle" | "added";

export default function SolutionBoxCard({ box }: SolutionBoxCardProps) {
  const { language, localize, t } = useLanguage();
  const { addToCart, isInWishlist, toggleWishlist } = useShop();
  const [cartStatus, setCartStatus] = useState<CartStatus>("idle");
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const product = useMemo(() => solutionBoxToProduct(box), [box]);
  const boxName = localize(box.name);
  const boxSubtitle = localize(box.subtitle);
  const primaryImage = box.images[0] ?? "";
  const secondaryImage = box.images[1] ?? primaryImage;
  const detailsHref = `/solution-box/${encodeURIComponent(box.slug)}`;
  const accessibilityLabel = `${t("solutionBox.explore")} ${boxName}`;
  const wished = isInWishlist(box.id);
  const isAvailable = box.stock > 0;

  const priceFormatter = useMemo(
    () =>
      new Intl.NumberFormat(language === "bn" ? "bn-BD" : "en-BD", {
        style: "currency",
        currency: "BDT",
        currencyDisplay: "narrowSymbol",
        maximumFractionDigits: 0,
      }),
    [language],
  );

  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(language === "bn" ? "bn-BD" : "en-BD"),
    [language],
  );

  const discountPercentage = useMemo(() => {
    if (!box.compareAtPrice || box.compareAtPrice <= box.price) {
      return 0;
    }

    return Math.round(
      ((box.compareAtPrice - box.price) / box.compareAtPrice) * 100,
    );
  }, [box.compareAtPrice, box.price]);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  function handleAddToCart() {
    if (!isAvailable) return;

    addToCart(product);
    setCartStatus("added");

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = setTimeout(() => {
      setCartStatus("idle");
    }, 1500);
  }

  return (
    <article className="group/card relative isolate flex h-full flex-col overflow-hidden rounded-[20px] border border-[#dce3ec] bg-white shadow-[0_12px_34px_rgba(6,42,84,0.08)] transition duration-500 hover:-translate-y-1 hover:border-[#FC5689]/25 hover:shadow-[0_20px_48px_rgba(6,42,84,0.14)]">
      <div className="relative aspect-[20/21] shrink-0 overflow-hidden bg-[#fff4f6]">
        <Link
          href={detailsHref}
          aria-label={accessibilityLabel}
          className="absolute inset-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#FC5689]/30"
        >
          <img
            src={primaryImage}
            alt={boxName}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover/card:scale-[1.05] group-hover/card:opacity-0 group-focus-within/card:scale-[1.05] group-focus-within/card:opacity-0"
          />

          <img
            src={secondaryImage}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full scale-[1.06] object-cover opacity-0 transition-all duration-700 ease-out group-hover/card:scale-100 group-hover/card:opacity-100 group-focus-within/card:scale-100 group-focus-within/card:opacity-100"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#062a54]/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 group-focus-within/card:opacity-100" />
        </Link>

        {discountPercentage > 0 && (
          <div className="pointer-events-none absolute left-2 top-2 z-10 sm:left-3 sm:top-3">
            <span className="inline-flex rounded-full bg-[#FC5689] px-2 py-1 text-[9px] font-extrabold text-white shadow-[0_8px_20px_rgba(239,66,119,0.3)] sm:px-2.5 sm:text-[10px]">
              -{numberFormatter.format(discountPercentage)}%
            </span>
          </div>
        )}

        <button
          type="button"
          aria-label={
            wished
              ? t("wishlist.removeFromWishlist")
              : t("wishlist.addToWishlist")
          }
          aria-pressed={wished}
          onClick={() => toggleWishlist(product)}
          className={`absolute right-2 top-2 z-20 inline-flex size-9 items-center justify-center rounded-full border border-white/80 bg-white/90 shadow-[0_8px_22px_rgba(6,42,84,0.16)] backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FC5689]/20 sm:right-3 sm:top-3 sm:size-10 lg:translate-y-2 lg:opacity-0 lg:group-hover/card:translate-y-0 lg:group-hover/card:opacity-100 lg:group-focus-within/card:translate-y-0 lg:group-focus-within/card:opacity-100 ${
            wished
              ? "text-[#FC5689]"
              : "text-[#062a54] hover:text-[#FC5689]"
          }`}
        >
          <Heart
            aria-hidden="true"
            className={`size-4 transition-transform active:scale-75 sm:size-5 ${
              wished ? "fill-current" : ""
            }`}
            strokeWidth={1.9}
          />
        </button>

        {/* Desktop only */}
        <div className="absolute inset-x-0 bottom-0 z-20 hidden translate-y-[calc(100%+20px)] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:block lg:group-hover/card:translate-y-0 lg:group-hover/card:opacity-100 lg:group-focus-within/card:translate-y-0 lg:group-focus-within/card:opacity-100">
          <Link
            href={detailsHref}
            aria-label={accessibilityLabel}
            className="group/button relative flex h-11 w-full items-center justify-center overflow-hidden rounded-t-2xl bg-[#FC5689] px-4 text-sm font-extrabold text-white shadow-[0_12px_30px_rgba(6,42,84,0.22)] transition-all duration-300 hover:bg-[#03A7FD] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-white/60 active:scale-[0.98]"
          >
            <span className="transition-all duration-300 group-hover/button:-translate-y-8 group-hover/button:opacity-0 group-focus-visible/button:-translate-y-8 group-focus-visible/button:opacity-0">
              {t("solutionBox.seeMore")}
            </span>

            <Eye
              aria-hidden="true"
              strokeWidth={2}
              className="pointer-events-none absolute size-5 translate-y-8 opacity-0 transition-all duration-300 group-hover/button:translate-y-0 group-hover/button:opacity-100 group-focus-visible/button:translate-y-0 group-focus-visible/button:opacity-100"
            />
          </Link>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <Link
          href={detailsHref}
          aria-label={accessibilityLabel}
          className="group/title focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FC5689]/40"
        >
          <h3 className="line-clamp-2 text-sm font-bold leading-5 text-[#062a54] transition-colors duration-300 group-hover/title:text-[#FC5689] sm:text-base sm:leading-6">
            {boxName}
          </h3>
        </Link>

        <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
          {boxSubtitle}
        </p>

        <div className="mt-auto flex items-end justify-between gap-2 border-t border-[#dce3ec]/80 pt-2.5">
          <div className="flex min-w-0 flex-wrap items-baseline gap-2">
            <span className="text-base font-black text-[#FC5689] sm:text-lg">
              {priceFormatter.format(box.price)}
            </span>

            {box.compareAtPrice > box.price && (
              <span className="text-[11px] font-semibold text-slate-400 line-through">
                {priceFormatter.format(box.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Desktop cart button */}
          <button
            type="button"
            disabled={!isAvailable}
            onClick={handleAddToCart}
            title={t("actions.addToCart")}
            aria-label={
              isAvailable
                ? cartStatus === "added"
                  ? t("actions.addedToCart")
                  : t("actions.addToCart")
                : t("product.outOfStock")
            }
            className={`hidden size-9 shrink-0 place-items-center rounded-xl border transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FC5689]/20 lg:grid ${
              isAvailable
                ? cartStatus === "added"
                  ? "border-[#FC5689] bg-[#fff4f6] text-[#FC5689]"
                  : "border-[#dce3ec] bg-white text-[#062a54] hover:border-[#FC5689] hover:text-[#FC5689]"
                : "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
            }`}
          >
            {cartStatus === "added" ? (
              <Check
                aria-hidden="true"
                className="size-4"
                strokeWidth={2.6}
              />
            ) : (
              <ShoppingCart
                aria-hidden="true"
                className="size-4"
                strokeWidth={2.1}
              />
            )}
          </button>
        </div>

        {/* Mobile and tablet only */}
        <div className="mt-3 grid grid-cols-[minmax(0,1fr)_40px] gap-2 sm:grid-cols-[minmax(0,1fr)_44px] lg:hidden">
          <Link
            href={detailsHref}
            aria-label={accessibilityLabel}
            className="flex h-10 min-w-0 items-center justify-center gap-2 rounded-xl bg-[#FC5689] px-3 text-[11px] font-extrabold text-white shadow-[0_10px_24px_rgba(239,66,119,0.18)] transition-all duration-300 hover:bg-[#03A7FD] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FC5689]/20 active:scale-[0.98] sm:h-11 sm:text-sm"
          >
            <span className="truncate">
              {t("solutionBox.seeMore")}
            </span>

            <Eye
              aria-hidden="true"
              strokeWidth={2}
              className="size-4 shrink-0"
            />
          </Link>

          <button
            type="button"
            disabled={!isAvailable}
            onClick={handleAddToCart}
            title={t("actions.addToCart")}
            aria-label={
              isAvailable
                ? cartStatus === "added"
                  ? t("actions.addedToCart")
                  : t("actions.addToCart")
                : t("product.outOfStock")
            }
            className={`grid h-10 w-10 place-items-center rounded-xl border transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FC5689]/20 sm:h-11 sm:w-11 ${
              isAvailable
                ? cartStatus === "added"
                  ? "border-[#FC5689] bg-[#fff4f6] text-[#FC5689]"
                  : "border-[#dce3ec] bg-white text-[#062a54] hover:border-[#FC5689] hover:text-[#FC5689]"
                : "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
            }`}
          >
            {cartStatus === "added" ? (
              <Check
                aria-hidden="true"
                className="size-4"
                strokeWidth={2.6}
              />
            ) : (
              <ShoppingCart
                aria-hidden="true"
                className="size-4"
                strokeWidth={2.1}
              />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}