"use client";

/* eslint-disable @next/next/no-img-element */

import { useMemo } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import type { SolutionBoxCardProps } from "@/types/solution-box";

export default function SolutionBoxCard({
  box,
}: SolutionBoxCardProps) {
  const { language, localize, t } = useLanguage();

  const boxName = localize(box.name);
  const boxSubtitle = localize(box.subtitle);

  const primaryImage = box.images[0] ?? "";
  const secondaryImage = box.images[1] ?? primaryImage;

  const accessibilityLabel = `${t("solutionBox.explore")} ${boxName}`;

  const priceFormatter = useMemo(
    () =>
      new Intl.NumberFormat(
        language === "bn" ? "bn-BD" : "en-BD",
        {
          style: "currency",
          currency: "BDT",
          currencyDisplay: "narrowSymbol",
          maximumFractionDigits: 0,
        },
      ),
    [language],
  );

  const numberFormatter = useMemo(
    () =>
      new Intl.NumberFormat(
        language === "bn" ? "bn-BD" : "en-BD",
      ),
    [language],
  );

  const discountPercentage = useMemo(() => {
    if (
      !box.compareAtPrice ||
      box.compareAtPrice <= box.price
    ) {
      return 0;
    }

    return Math.round(
      ((box.compareAtPrice - box.price) /
        box.compareAtPrice) *
        100,
    );
  }, [box.compareAtPrice, box.price]);

  return (
    <article className="group/card relative isolate flex h-full flex-col overflow-hidden rounded-[20px] border border-[#dce3ec] bg-white shadow-[0_12px_34px_rgba(6,42,84,0.08)] transition duration-500 hover:-translate-y-1 hover:border-[#ef4277]/25 hover:shadow-[0_20px_48px_rgba(6,42,84,0.14)]">
      {/* Image section */}
      <div className="relative aspect-[20/21] shrink-0 overflow-hidden bg-[#fff4f6]">
        <Link
          href={box.href}
          aria-label={accessibilityLabel}
          className="absolute inset-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#ef4277]/30"
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
            <span className="inline-flex rounded-full bg-[#ef4277] px-2 py-1 text-[9px] font-extrabold text-white shadow-[0_8px_20px_rgba(239,66,119,0.3)] sm:px-2.5 sm:text-[10px]">
              -{numberFormatter.format(discountPercentage)}%
            </span>
          </div>
        )}

        {/* See more button */}
        <div className="absolute inset-x-0 bottom-0 z-20 translate-y-0 opacity-100 transition-all duration-300 ease-out xl:translate-y-full xl:opacity-0 xl:group-hover/card:translate-y-0 xl:group-hover/card:opacity-100 xl:group-focus-within/card:translate-y-0 xl:group-focus-within/card:opacity-100">
          <Link
            href={box.href}
            aria-label={accessibilityLabel}
            className="group/button relative flex h-9 w-full items-center justify-center overflow-hidden rounded-t-2xl bg-[#ef4277] px-2 text-[11px] font-extrabold text-white shadow-[0_12px_30px_rgba(6,42,84,0.22)] transition-all duration-300 hover:bg-[#10a9e8] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-white/60 active:scale-[0.98] sm:px-4 sm:text-sm md:h-11"
          >
            <span className="transition-all duration-300 xl:group-hover/button:-translate-y-8 xl:group-hover/button:opacity-0 xl:group-focus-visible/button:-translate-y-8 xl:group-focus-visible/button:opacity-0">
              {t("solutionBox.seeMore")}
            </span>

            <Eye
              aria-hidden="true"
              strokeWidth={2}
              className="pointer-events-none absolute size-5 translate-y-8 opacity-0 transition-all duration-300 xl:group-hover/button:translate-y-0 xl:group-hover/button:opacity-100 xl:group-focus-visible/button:translate-y-0 xl:group-focus-visible/button:opacity-100"
            />
          </Link>
        </div>
      </div>

      {/* Content section */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <Link
          href={box.href}
          aria-label={accessibilityLabel}
          className="group/title focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ef4277]/40"
        >
          <h3 className="line-clamp-2 text-sm font-bold leading-5 text-[#062a54] transition-colors duration-300 group-hover/title:text-[#ef4277] sm:text-base sm:leading-6">
            {boxName}
          </h3>
        </Link>

        <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
          {boxSubtitle}
        </p>

        <div className="mt-auto flex flex-wrap items-baseline gap-2 border-t border-[#dce3ec]/80 pt-2.5">
          <span className="text-base font-black text-[#ef4277] sm:text-lg">
            {priceFormatter.format(box.price)}
          </span>

          {box.compareAtPrice > box.price && (
            <span className="text-[11px] font-semibold text-slate-400 line-through">
              {priceFormatter.format(box.compareAtPrice)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}