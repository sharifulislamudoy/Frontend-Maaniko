"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function SolutionGuideBanner() {
  const { t } = useLanguage();

  return (
    <section
      aria-label={t("solutionGuide.imageAlt")}
      className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 "
    >
      <img
        src="/Banner.png"
        alt={t("solutionGuide.imageAlt")}
        loading="lazy"
        decoding="async"
        className="block h-auto w-full object-contain"
      />
    </section>
  );
}