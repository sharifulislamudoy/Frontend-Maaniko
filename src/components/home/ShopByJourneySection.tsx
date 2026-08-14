"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import ShopByJourneyCard from "@/components/shop-by-journey/ShopByJourneyCard";
import { useLanguage } from "@/context/LanguageContext";
import { shopByJourneyItems } from "@/data/shopByJourney";

export default function ShopByJourneySection() {
  const { language, t } = useLanguage();

  return (
    <section
      aria-labelledby="shop-by-journey-title"
      className="bg-white py-3 md:py-8"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between gap-4 sm:mb-6">
          <div>
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

          <Link
            href="/shop-by-journey"
            aria-label={t("shopByJourney.viewAll")}
            className="grid size-10 shrink-0 place-items-center rounded-full border border-[#dce3ec] bg-white text-[#062a54] shadow-sm transition-all duration-300 hover:border-[#ef4277] hover:bg-[#ef4277] hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ef4277]/20 active:scale-95 sm:size-11"
          >
            <ArrowRight className="size-5" strokeWidth={2.2} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-5 xl:grid-cols-4">
          {shopByJourneyItems.slice(0, 4).map((item, index) => (
            <div
              key={item.id}
              className={
                index === 2
                  ? "hidden md:block"
                  : index === 3
                    ? "hidden xl:block"
                    : "block"
              }
            >
              <ShopByJourneyCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
