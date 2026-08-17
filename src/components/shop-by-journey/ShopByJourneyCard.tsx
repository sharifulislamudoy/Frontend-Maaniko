"use client";

/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { Eye } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import type { ShopByJourneyCardProps } from "@/types/shop-by-journey";

export default function ShopByJourneyCard({
  item,
}: ShopByJourneyCardProps) {
  const { localize, t } = useLanguage();

  const itemName = localize(item.name);
  const [primaryImage, secondaryImage] = item.images;

  const accessibilityLabel = `${t("shopByJourney.explore")} ${itemName}`;

  return (
    <article className="group/card relative isolate flex aspect-square w-full flex-col overflow-hidden rounded-2xl border border-[#dce3ec] bg-white shadow-[0_8px_24px_rgba(6,42,84,0.08)] transition duration-500 hover:-translate-y-1 hover:border-[#FC5689]/25 hover:shadow-[0_18px_40px_rgba(6,42,84,0.14)] ">
      {/* Image section */}
      <div className="relative min-h-0 flex-1 overflow-hidden bg-[#fff4f6]">
        <Link
          href={item.href}
          aria-label={accessibilityLabel}
          className="absolute inset-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#FC5689]/30"
        >
          <img
            src={primaryImage}
            alt={itemName}
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

          <div className="absolute inset-0 bg-gradient-to-t from-[#062a54]/25 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100 group-focus-within/card:opacity-100" />
        </Link>

        {/* See more hover button */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 translate-y-full opacity-0 transition-all duration-500 ease-out group-hover/card:pointer-events-auto group-hover/card:translate-y-0 group-hover/card:opacity-100 group-focus-within/card:pointer-events-auto group-focus-within/card:translate-y-0 group-focus-within/card:opacity-100">
          <Link
            href={item.href}
            aria-label={accessibilityLabel}
            className="group/button relative flex h-8 w-full items-center justify-center overflow-hidden rounded-t-xl bg-[#FC5689] px-2 text-[10px] font-extrabold text-white shadow-[0_10px_25px_rgba(6,42,84,0.22)] transition-all duration-300 hover:bg-[#03A7FD] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-white/60 active:scale-[0.98] h-9 "
          >
            <span className="transition-all duration-300 group-hover/button:-translate-y-8 group-hover/button:opacity-0 group-focus-visible/button:-translate-y-8 group-focus-visible/button:opacity-0 text-[14px]">
              {t("shopByJourney.seeMore")}
            </span>

            <Eye
              aria-hidden="true"
              strokeWidth={2}
              className="pointer-events-none absolute size-4 translate-y-8 opacity-0 transition-all duration-300 group-hover/button:translate-y-0 group-hover/button:opacity-100 group-focus-visible/button:translate-y-0 group-focus-visible/button:opacity-100 sm:size-5"
            />
          </Link>
        </div>
      </div>

      {/* Title section */}
      <div className="flex h-8 md:h-10  shrink-0 items-center justify-center px-2 text-center ">
        <Link
          href={item.href}
          aria-label={accessibilityLabel}
          className="group/title flex h-full w-full items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FC5689]/40"
        >
          <h3 className="line-clamp-2 text-[11px] font-bold leading-[1.3] text-[#062a54] transition-colors duration-300 group-hover/title:text-[#FC5689] sm:text-sm sm:leading-5 lg:text-base lg:leading-6">
            {itemName}
          </h3>
        </Link>
      </div>
    </article>
  );
}