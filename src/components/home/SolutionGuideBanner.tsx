"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

export default function SolutionGuideBanner() {
  const { t } = useLanguage();

  return (
    <section
      aria-labelledby="solution-guide-title"
      className="w-full overflow-hidden bg-[#fff0f3]"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-3 px-4 pt-6 sm:px-6 sm:pt-8 md:min-h-[230px] md:grid-cols-[minmax(0,1.1fr)_minmax(300px,0.9fr)] md:gap-8 md:py-0 lg:min-h-[260px] lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] lg:px-8">
        <div className="relative z-10 max-w-2xl pb-2 md:py-8 lg:py-10">
          <h2
            id="solution-guide-title"
            className="text-xl font-black leading-tight text-[#062a54] sm:text-2xl md:text-3xl lg:text-[2rem]"
          >
            {t("solutionGuide.title")}
          </h2>

          <p className="mt-2 max-w-xl text-sm font-medium leading-6 text-[#36506e] sm:text-base sm:leading-7">
            {t("solutionGuide.description")}
          </p>

          <Link
            href="/solution-box"
            aria-label={t("solutionGuide.buttonLabel")}
            className="group mt-4 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#ef4277] px-5 py-2.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(239,66,119,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#df3268] hover:shadow-[0_14px_30px_rgba(239,66,119,0.3)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ef4277]/25 active:translate-y-0 sm:px-6 sm:text-base"
          >
            <span>{t("solutionGuide.button")}</span>

            <ArrowRight
              aria-hidden="true"
              strokeWidth={2.25}
              className="size-4.5 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="relative mx-auto h-[190px] w-full max-w-[430px] self-end sm:h-[240px] md:h-full md:min-h-[230px] md:max-w-none lg:min-h-[260px]">
          <Image
            src="/image.png"
            alt={t("solutionGuide.imageAlt")}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 45vw, 520px"
            className="object-contain object-bottom"
          />
        </div>
      </div>
    </section>
  );
}