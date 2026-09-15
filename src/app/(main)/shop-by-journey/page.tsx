"use client";

import ShopByJourneyCard from "@/modules/journeys/components/ShopByJourneyCard";
import { useSiteText } from "@/modules/site-content/context/SiteTextContext";
import { shopByJourneyItems } from "@/modules/journeys/data/journeys";

export default function ShopByJourneyPage() {
  const { locale, t } = useSiteText();

  return (
    <section className="flex-1 bg-white py-8 sm:py-10 lg:py-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 max-w-2xl sm:mb-9">
          <p
            className={`mb-2 text-xs font-extrabold uppercase text-[#FC5689] ${"tracking-normal"}`}
          >
            {t("shopByJourney.eyebrow")}
          </p>

          <h1 className="text-[26px] font-black tracking-tight text-[#062a54] sm:text-4xl">
            {t("shopByJourney.title")}
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            {t("shopByJourney.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-5 xl:grid-cols-4">
          {shopByJourneyItems.map((item) => (
            <ShopByJourneyCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
