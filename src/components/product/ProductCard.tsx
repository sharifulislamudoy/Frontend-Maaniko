"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Heart, ShoppingCart, Star } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { useShop } from "@/context/ShopContext";
import type { ProductCardProps } from "@/types/product";

export default function ProductCard({ product }: ProductCardProps) {
  const { language, localize, t } = useLanguage();
  const { addToCart, isInWishlist, toggleWishlist } = useShop();

  const [cartStatus, setCartStatus] = useState<"idle" | "added">("idle");
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const productName = localize(product.name);
  const productDescription = localize(product.description);
  const productCategory = localize(product.category);

  const productHref = product.href ?? `/products/${product.slug}`;

  const primaryImage = product.images[0] ?? "";
  const secondaryImage = product.images[1] ?? primaryImage;

  const isAvailable = product.stock > 0;
  const wished = isInWishlist(product.id);

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
    <article className="group/card relative isolate flex h-full flex-col overflow-hidden rounded-[20px] border border-[#dce3ec] bg-white shadow-[0_12px_34px_rgba(6,42,84,0.08)] transition duration-500 hover:-translate-y-1 hover:border-[#ef4277]/25 hover:shadow-[0_20px_48px_rgba(6,42,84,0.14)]">
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

        <div className="pointer-events-none absolute left-3 top-3 z-10 flex max-w-[calc(100%-64px)] flex-wrap items-start gap-2">
          {discountPercentage > 0 && (
            <span className="rounded-full bg-[#ef4277] px-2.5 py-1 text-[10px] font-extrabold text-white shadow-[0_8px_20px_rgba(239,66,119,0.3)]">
              -{numberFormatter.format(discountPercentage)}%
            </span>
          )}

          {product.badge && (
            <span className="rounded-full border border-white/70 bg-white/90 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#062a54] shadow-sm backdrop-blur-md">
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
          className={`absolute right-3 top-3 z-20 inline-flex size-10 items-center justify-center rounded-full border border-white/80 bg-white/90 shadow-[0_8px_22px_rgba(6,42,84,0.16)] backdrop-blur-md transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ef4277]/20 xl:translate-y-2 xl:opacity-0 xl:group-hover/card:translate-y-0 xl:group-hover/card:opacity-100 ${
            wished
              ? "text-[#ef4277]"
              : "text-[#062a54] hover:text-[#ef4277]"
          }`}
        >
          <Heart
            className={`size-5 transition-transform active:scale-75 ${
              wished ? "fill-current" : ""
            }`}
            strokeWidth={1.9}
          />
        </button>

        <div className="absolute bottom-0 z-20 w-full translate-y-0 opacity-100 transition-all duration-500 ease-out xl:translate-y-[calc(100%+20px)] xl:opacity-0 xl:group-hover/card:translate-y-0 xl:group-hover/card:opacity-100">
          <button
            type="button"
            disabled={!isAvailable}
            onClick={handleAddToCart}
            aria-label={
              isAvailable ? t("actions.addToCart") : t("product.outOfStock")
            }
            className={`group/cart relative flex h-9 md:h-11 w-full items-center justify-center overflow-hidden rounded-t-2xl px-4 text-xs font-extrabold shadow-[0_12px_30px_rgba(6,42,84,0.22)] transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#10a9e8]/25 sm:px-5 sm:text-sm ${
              isAvailable
                ? "bg-[#ef4277] text-white hover:bg-[#10a9e8] active:scale-[0.98]"
                : "cursor-not-allowed bg-slate-400 text-white"
            }`}
          >
            {cartStatus === "added" ? (
              <span className="flex items-center gap-2">
                <Check className="size-5" />
                {t("actions.addedToCart")}
              </span>
            ) : (
              <>
                <span
                  className={`flex items-center justify-center transition-all duration-300 ${
                    isAvailable
                      ? "xl:group-hover/cart:-translate-y-8 xl:group-hover/cart:opacity-0"
                      : ""
                  }`}
                >
                  {isAvailable
                    ? t("actions.addToCart")
                    : t("product.outOfStock")}
                </span>

                {isAvailable && (
                  <ShoppingCart className="pointer-events-none absolute size-6 translate-y-8 opacity-0 transition-all duration-300 xl:group-hover/cart:translate-y-0 xl:group-hover/cart:opacity-100" />
                )}
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col space-y-1 p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="truncate text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#10a9e8]">
            {productCategory}
          </p>

          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
              isAvailable
                ? "bg-[#10a9e8]/10 text-[#087eae]"
                : "bg-[#ef4277]/10 text-[#ef4277]"
            }`}
          >
            {isAvailable ? t("product.inStock") : t("product.outOfStock")}
          </span>
        </div>

        <div>
          <Link href={productHref}>
            <h2 className="line-clamp-2 text-base font-bold leading-[22px] text-[#062a54] transition-colors duration-300 hover:text-[#ef4277]">
              {productName}
            </h2>
          </Link>

          <p className="line-clamp-2 text-xs leading-5 text-slate-500">
            {productDescription}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 border-t border-[#dce3ec]/80 pt-2.5">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-lg font-black text-[#ef4277]">
              {priceFormatter.format(product.price)}
            </span>

            {product.compareAtPrice &&
              product.compareAtPrice > product.price && (
                <span className="text-[11px] font-semibold text-slate-400 line-through">
                  {priceFormatter.format(product.compareAtPrice)}
                </span>
              )}
          </div>

          {product.rating !== undefined && (
            <div className="flex shrink-0 items-center gap-1">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />

              <span className="text-xs font-extrabold text-[#062a54]">
                {product.rating.toFixed(1)}
              </span>

              <span className=" text-[10px] text-slate-400 sm:inline">
                ({numberFormatter.format(product.reviewCount ?? 0)})
              </span>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}