"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import CareGuideSlider from "@/components/care-guide/CareGuideSlider";
import { useLanguage } from "@/context/LanguageContext";

export default function CareGuideSection() {
  const { language, t } = useLanguage();

  return (
    <section
      aria-labelledby="care-guide-title"
      className="overflow-hidden bg-white py-3 md:py-8"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between gap-3 sm:mb-6 sm:gap-5">
          <div className="min-w-0">
            <h2
              id="care-guide-title"
              className={`text-lg font-black text-[#062a54] sm:text-3xl md:text-3xl ${
                language === "en"
                  ? "tracking-normal"
                  : "tracking-normal"
              }`}
            >
              {t("careGuide.title")}
            </h2>
          </div>

          <Link
            href="/guide"
            aria-label={t("careGuide.viewAll")}
            className="group flex shrink-0 items-center gap-1.5 rounded-full border border-[#dce3ec] bg-white px-3 py-1 text-xs font-extrabold text-[#062a54] shadow-sm transition-all duration-300 hover:border-[#FC5689] hover:bg-[#FC5689] hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FC5689]/20 active:scale-95 sm:gap-2 sm:px-4 sm:text-sm"
          >
            <span>{t("careGuide.seeMore")}</span>

            <ArrowRight
              aria-hidden="true"
              strokeWidth={2.2}
              className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <CareGuideSlider />
      </div>
    </section>
  );
}