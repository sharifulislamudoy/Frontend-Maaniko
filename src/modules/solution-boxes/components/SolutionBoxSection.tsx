"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import SolutionBoxSlider from "@/modules/solution-boxes/components/SolutionBoxSlider";
import { useSiteText } from "@/modules/site-content/context/SiteTextContext";
import type { SolutionBox } from "@/modules/solution-boxes/types/solutionBox";

export default function SolutionBoxSection({
  boxes,
}: {
  boxes: SolutionBox[];
}) {
  const { locale, t } = useSiteText();

  return (
    <section
      aria-labelledby="solution-box-title"
      className="overflow-hidden bg-white py-6 md:py-9 lg:py-12"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Heading and subheading */}
        <div className="mx-auto mb-7 max-w-4xl text-center md:mb-10 lg:mb-12">
          <h2
            id="solution-box-title"
            className="text-[21px] leading-[1.3] font-black tracking-tight text-[#07183d] md:text-[35px] md:leading-[1.25] lg:text-[42px]"
          >
            {
              <>
                আপনার জন্য সাজানো{" "}
                <span className="text-[#db5b8f]">Maaniko Solution Box</span>
              </>
            }
          </h2>

          <p className="mt-3 text-[13px] leading-6 font-medium text-[#687086] md:mt-4 md:text-base lg:text-lg">
            {"মা ও শিশুর প্রয়োজনীয় সাজানো সমাধান"}
          </p>
        </div>

        {/* Existing slider */}
        <SolutionBoxSlider boxes={boxes} />

        {/* View details button below slider */}
        <div className="mt-6 flex justify-center md:mt-8">
          <Link
            href="/solution-box"
            aria-label={t("solutionBox.viewAll")}
            className="group flex items-center gap-2 rounded-full border border-[#efccda] bg-white px-5 py-2 text-sm font-extrabold text-[#db5b8f] shadow-sm transition-all duration-300 hover:border-[#FC5689] hover:bg-[#FC5689] hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FC5689]/20 active:scale-95 md:px-6 md:py-2.5 md:text-base"
          >
            <span>{t("solutionBox.seeMore")}</span>

            <ArrowRight
              aria-hidden="true"
              strokeWidth={2.2}
              className="size-4 transition-transform duration-300 group-hover:translate-x-1 md:size-5"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
