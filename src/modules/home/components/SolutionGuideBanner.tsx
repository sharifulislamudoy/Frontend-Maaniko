"use client";

import { useSiteText } from "@/modules/site-content/context/SiteTextContext";
import Link from "next/link";

export default function SolutionGuideBanner() {
  const { t } = useSiteText();

  return (
    <section
      aria-label={t("solutionGuide.imageAlt")}
      className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 "
    >
      <Link href="/problem-solution">
        {/* eslint-disable-next-line @next/next/no-img-element -- preserve the current banner rendering */}
        <img
          src="/Banner.png"
          alt={t("solutionGuide.imageAlt")}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full object-contain"
        />
      </Link>
    </section>
  );
}
