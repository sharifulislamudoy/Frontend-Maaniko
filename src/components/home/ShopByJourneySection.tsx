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
        <div className="mb-5 flex items-start justify-between gap-3 sm:mb-6 sm:items-center sm:gap-5">
          <div className="min-w-0">
            <p
              className={`mb-2 text-xs font-extrabold uppercase text-[#ef4277] ${
                language === "en"
                  ? "tracking-[0.2em]"
                  : "tracking-normal"
              }`}
            >
              {t("shopByJourney.eyebrow")}
            </p>

            <h2
              id="shop-by-journey-title"
              className="text-2xl font-black tracking-tight text-[#062a54] sm:text-3xl"
            >
              {t("shopByJourney.title")}
            </h2>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-2">
            <Link
              href="/shop-by-journey"
              aria-label={t("shopByJourney.viewAll")}
              className="group flex items-center gap-1.5 rounded-full border border-[#dce3ec] bg-white px-3 py-2 text-xs font-extrabold text-[#062a54] shadow-sm transition-all duration-300 hover:border-[#ef4277] hover:bg-[#ef4277] hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ef4277]/20 active:scale-95 sm:gap-2 sm:px-4 sm:text-sm"
            >
              <span>{t("shopByJourney.seeMore")}</span>

              <ArrowRight
                aria-hidden="true"
                strokeWidth={2.2}
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <div className="flex items-center gap-1.5 text-[10px] font-semibold text-slate-400 sm:text-xs lg:hidden">
              <MoveHorizontal
                aria-hidden="true"
                strokeWidth={2}
                className="size-4 motion-safe:animate-pulse"
              />

              <span>{t("shopByJourney.swipeHint")}</span>
            </div>
          </div>
        </div>

        <ShopByJourneySlider />
      </div>
    </section>
  );
}