"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Heart, ShoppingCart, Star, Zap } from "lucide-react";
import { useRouter } from "next/navigation";

import { useLanguage } from "@/context/LanguageContext";
import { useShop } from "@/context/ShopContext";
import type { ProductCardProps } from "@/types/product";

type CartStatus = "idle" | "added";

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { language, localize, t } = useLanguage();
  const { addToCart, isInWishlist, toggleWishlist } = useShop();
  const [cartStatus, setCartStatus] = useState<CartStatus>("idle");
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const productName = localize(product.name);
  const productDescription = localize(product.description);
  const productCategory = localize(product.category);
  const productHref = product.href ?? `/products/${product.slug}`;
  const primaryImage = product.images[0] ?? "";
  const secondaryImage = product.images[1] ?? primaryImage;
  const isAvailable = product.stock > 0;
  const wished = isInWishlist(product.id);
  const buyNowLabel = language === "bn" ? "এখনই কিনুন" : "Buy now";

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
    if (!product.compareAtPrice || product.compareAtPrice <= product.price) {
      return 0;
    }

    return Math.round(
      ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100,
    );
  }, [product.compareAtPrice, product.price]);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  function handleAddToCart() {
    if (!isAvailable) return;

    addToCart(product);
    setCartStatus("added");

    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);

    resetTimerRef.current = setTimeout(() => {
      setCartStatus("idle");
    }, 1500);
  }

  function handleBuyNow() {
    if (!isAvailable) return;

    router.push(
      `/checkout?mode=buy-now&productId=${encodeURIComponent(product.id)}&quantity=1`,
    );
  }

  return (
    <article className="group/card relative isolate flex h-full min-w-0 flex-col overflow-hidden rounded-[20px] border border-[#dce3ec] bg-white shadow-[0_12px_34px_rgba(6,42,84,0.08)] transition duration-500 hover:-translate-y-1 hover:border-[#FF7897]/25 hover:shadow-[0_20px_48px_rgba(6,42,84,0.14)]">
      <div className="relative aspect-[20/21] shrink-0 overflow-hidden bg-[#fff4f6]">
        <Link
          href={productHref}
          aria-label={productName}
          className="absolute inset-0"
        >
          <img
            src={primaryImage}
            alt={productName}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out group-hover/card:scale-[1.05] group-hover/card:opacity-0"
          />

          <img
            src={secondaryImage}
            alt={`${productName} alternate view`}
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-[1.06] object-cover opacity-0 transition-all duration-700 ease-out group-hover/card:scale-100 group-hover/card:opacity-100"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#062a54]/20 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" />
        </Link>

        <div className="pointer-events-none absolute left-2 top-2 z-10 flex max-w-[calc(100%-56px)] flex-wrap items-start gap-1.5 sm:left-3 sm:top-3 sm:gap-2">
          {discountPercentage > 0 && (
            <span className="rounded-full bg-[#FF7897] px-2 py-1 text-[9px] font-extrabold text-white shadow-[0_8px_20px_rgba(239,66,119,0.3)] sm:px-2.5 sm:text-[10px]">
              -{numberFormatter.format(discountPercentage)}%
            </span>
          )}

          {product.badge && (
            <span
              className={`rounded-full border border-white/70 bg-white/90 px-2 py-1 text-[8px] font-extrabold uppercase text-[#062a54] shadow-sm backdrop-blur-md sm:px-2.5 sm:text-[9px] ${
                language === "en" ? "tracking-[0.1em]" : "tracking-normal"
              }`}
            >
              {localize(product.badge)}
            </span>
          )}
        </div>

        <button
          type="button"
          aria-label={
            wished
              ? t("wishlist.removeFromWishlist")
              : t("wishlist.addToWishlist")
          }
          aria-pressed={wished}
          onClick={() => toggleWishlist(product)}
          className={`absolute right-2 top-2 z-20 inline-flex size-9 items-center justify-center rounded-full border border-white/80 bg-white/90 shadow-[0_8px_22px_rgba(6,42,84,0.16)] backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF7897]/20 sm:right-3 sm:top-3 sm:size-10 ${
            wished
              ? "text-[#FF7897]"
              : "text-[#062a54] hover:text-[#FF7897]"
          }`}
        >
          <Heart
            className={`size-4 transition-transform active:scale-75 sm:size-5 ${
              wished ? "fill-current" : ""
            }`}
            strokeWidth={1.9}
          />
        </button>

        <div className="buy-now-overlay absolute inset-x-0 bottom-0 z-20">
          <button
            type="button"
            disabled={!isAvailable}
            onClick={handleBuyNow}
            aria-label={isAvailable ? buyNowLabel : t("product.outOfStock")}
            className={`group/buy relative flex h-9 w-full items-center justify-center overflow-hidden rounded-t-2xl px-2 text-[10px] font-extrabold shadow-[0_12px_30px_rgba(6,42,84,0.22)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#10a9e8]/25 sm:h-10 sm:px-4 sm:text-xs md:h-11 md:px-5 md:text-sm ${
              isAvailable
                ? "bg-[#FF7897] text-white hover:bg-[#10a9e8] active:scale-[0.98]"
                : "cursor-not-allowed bg-slate-400 text-white"
            }`}
          >
            <span className="flex items-center gap-1.5 transition-all duration-300 group-hover/buy:-translate-y-8 group-hover/buy:opacity-0 sm:gap-2">
              {isAvailable && <Zap className="size-4 fill-current sm:size-5" />}
              {isAvailable ? buyNowLabel : t("product.outOfStock")}
            </span>

            {isAvailable && (
              <Zap className="pointer-events-none absolute size-6 translate-y-8 fill-current opacity-0 transition-all duration-300 group-hover/buy:translate-y-0 group-hover/buy:opacity-100" />
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col space-y-1 p-2.5 sm:p-4">
        <div className="flex min-w-0 items-center justify-between gap-1.5 sm:gap-3">
          <p
            className={`min-w-0 flex-1 truncate text-[8px] font-extrabold uppercase text-[#10a9e8] sm:text-[10px] ${
              language === "en" ? "tracking-[0.14em]" : "tracking-normal"
            }`}
          >
            {productCategory}
          </p>

          <span
            className={`shrink-0 rounded-full px-1.5 py-1 text-[8px] font-bold sm:px-2.5 sm:text-[10px] ${
              isAvailable
                ? "bg-[#10a9e8]/10 text-[#087eae]"
                : "bg-[#FF7897]/10 text-[#FF7897]"
            }`}
          >
            {isAvailable ? t("product.inStock") : t("product.outOfStock")}
          </span>
        </div>

        <div className="min-w-0">
          <Link href={productHref}>
            <h2 className="line-clamp-2 text-sm font-bold leading-5 text-[#062a54] transition-colors duration-300 hover:text-[#FF7897] sm:text-base sm:leading-[22px]">
              {productName}
            </h2>
          </Link>

          <p className="line-clamp-2 text-[11px] leading-4 text-slate-500 sm:text-xs sm:leading-5">
            {productDescription}
          </p>
        </div>

        <div className="mt-auto border-t border-[#dce3ec]/80 pt-2.5">
          <div className="flex items-end justify-between gap-1.5 sm:gap-3">
            <div className="flex min-w-0 flex-wrap items-baseline gap-1 sm:gap-2">
              <span className="text-sm font-black text-[#FF7897] sm:text-base md:text-lg">
                {priceFormatter.format(product.price)}
              </span>

              {product.compareAtPrice &&
                product.compareAtPrice > product.price && (
                  <span className="text-[9px] font-semibold text-slate-400 line-through sm:text-[11px]">
                    {priceFormatter.format(product.compareAtPrice)}
                  </span>
                )}
            </div>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              {product.rating !== undefined && (
                <div className="flex items-center gap-0.5 sm:gap-1">
                  <Star className="size-3 fill-amber-400 text-amber-400 sm:size-3.5" />
                  <span className="text-[10px] font-extrabold text-[#062a54] sm:text-xs">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="hidden text-[7px] text-slate-400 sm:inline sm:text-[8px]">
                    ({numberFormatter.format(product.reviewCount ?? 0)})
                  </span>
                </div>
              )}

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
                className={`pointer-cart-action size-9 place-items-center rounded-xl border transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF7897]/20 ${
                  isAvailable
                    ? cartStatus === "added"
                      ? "border-[#FF7897] bg-[#fff4f6] text-[#FF7897]"
                      : "border-[#dce3ec] bg-white text-[#062a54] hover:border-[#FF7897] hover:text-[#FF7897]"
                    : "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
                }`}
              >
                {cartStatus === "added" ? (
                  <Check className="size-4" strokeWidth={2.6} />
                ) : (
                  <ShoppingCart className="size-4" strokeWidth={2.1} />
                )}
              </button>
            </div>
          </div>

          <div className="touch-actions mt-2.5 grid-cols-[minmax(0,1fr)_40px] gap-2 sm:grid-cols-[minmax(0,1fr)_44px]">
            <button
              type="button"
              disabled={!isAvailable}
              onClick={handleBuyNow}
              aria-label={isAvailable ? buyNowLabel : t("product.outOfStock")}
              className={`flex h-10 min-w-0 items-center justify-center gap-1.5 rounded-xl px-2 text-[11px] font-extrabold transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF7897]/20 sm:h-11 sm:gap-2 sm:px-4 sm:text-sm ${
                isAvailable
                  ? "bg-[#FF7897] text-white shadow-[0_10px_24px_rgba(239,66,119,0.2)] hover:bg-[#10a9e8] active:scale-[0.98]"
                  : "cursor-not-allowed bg-slate-400 text-white"
              }`}
            >
              {isAvailable && <Zap className="size-4 fill-current" />}
              <span className="truncate">
                {isAvailable ? buyNowLabel : t("product.outOfStock")}
              </span>
            </button>

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
              className={`grid h-10 w-10 place-items-center rounded-xl border transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF7897]/20 sm:h-11 sm:w-11 ${
                isAvailable
                  ? cartStatus === "added"
                    ? "border-[#FF7897] bg-[#fff4f6] text-[#FF7897]"
                    : "border-[#dce3ec] bg-white text-[#062a54] hover:border-[#FF7897] hover:text-[#FF7897]"
                  : "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400"
              }`}
            >
              {cartStatus === "added" ? (
                <Check className="size-4" strokeWidth={2.6} />
              ) : (
                <ShoppingCart className="size-4" strokeWidth={2.1} />
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .buy-now-overlay,
        .pointer-cart-action {
          display: none;
        }

        .touch-actions {
          display: grid;
        }

        @media (hover: hover) and (pointer: fine) {
          .buy-now-overlay {
            display: block;
            opacity: 0;
            transform: translateY(calc(100% + 20px));
            transition:
              opacity 500ms cubic-bezier(0.22, 1, 0.36, 1),
              transform 500ms cubic-bezier(0.22, 1, 0.36, 1);
          }

          article:hover .buy-now-overlay,
          .buy-now-overlay:focus-within {
            opacity: 1;
            transform: translateY(0);
          }

          .pointer-cart-action {
            display: grid;
          }

          .touch-actions {
            display: none;
          }
        }
      `}</style>
    </article>
  );
}