"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import SolutionBoxSlider from "@/components/solution-box/SolutionBoxSlider";
import { useLanguage } from "@/context/LanguageContext";

export default function SolutionBoxSection() {
  const { t } = useLanguage();

  return (
    <section
      aria-labelledby="solution-box-title"
      className="overflow-hidden bg-white py-3 md:py-8"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between gap-3 sm:mb-6 sm:gap-5">
          <div className="min-w-0">
            <h2
              id="solution-box-title"
              className="text-lg font-black tracking-tight text-[#062a54] sm:text-3xl md:text-3xl"
            >
              {t("solutionBox.title")}
            </h2>
          </div>

          <div className="flex shrink-0 flex-col items-end gap-2">
            <Link
              href="/solution-box"
              aria-label={t("solutionBox.viewAll")}
              className="group flex items-center gap-1.5 rounded-full border border-[#dce3ec] bg-white px-3 py-1 text-xs font-extrabold text-[#062a54] shadow-sm transition-all duration-300 hover:border-[#FF7897] hover:bg-[#FF7897] hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FF7897]/20 active:scale-95 sm:gap-2 sm:px-4 sm:text-sm"
            >
              <span>{t("solutionBox.seeMore")}</span>

              <ArrowRight
                aria-hidden="true"
                strokeWidth={2.2}
                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        <SolutionBoxSlider />
      </div>
    </section>
  );
}