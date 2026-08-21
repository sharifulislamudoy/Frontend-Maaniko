"use client";

import Link from "next/link";
import { ArrowRight, MoveHorizontal } from "lucide-react";

import ShopByJourneySlider from "@/components/shop-by-journey/ShopByJourneySlider";
import { useLanguage } from "@/context/LanguageContext";

export default function ShopByJourneySection() {
  const { language, t } = useLanguage();

  return (
    <section
      aria-labelledby="shop-by-journey-title"
      className="overflow-hidden bg-white py-3 md:py-8"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex justify-between gap-3 sm:mb-6 items-center sm:gap-5">
          <div className="min-w-0">

            <h2
              id="shop-by-journey-title"
              className="text-lg md:text-3xl font-black tracking-tight text-[#062a54] sm:text-3xl"
            >
              {t("shopByJourney.title")}
            </h2>

            <div className="mt-2 h-1 w-14 rounded-full bg-[#FC5689] md:w-16 lg:w-20" />
          </div>

          <div className="flex shrink-0 flex-col items-end gap-2">
            <Link
              href="/shop-by-journey"
              aria-label={t("shopByJourney.viewAll")}
              className="group flex items-center gap-1.5 rounded-full border border-[#dce3ec] bg-white px-3 py-1 text-xs font-extrabold text-[#062a54] shadow-sm transition-all duration-300 hover:border-[#FC5689] hover:bg-[#FC5689] hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FC5689]/20 active:scale-95 sm:gap-2 sm:px-4 sm:text-sm"
            >
              <span>{t("shopByJourney.seeMore")}</span>

              <ArrowRight
                aria-hidden="true"
                strokeWidth={2.2}
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

          </div>
        </div>

        <ShopByJourneySlider />
      </div>
    </section>
  );
}