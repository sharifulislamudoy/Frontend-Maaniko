"use client";

import Link from "next/link";
import { SlidersHorizontal } from "lucide-react";
import SolutionBoxCard from "@/modules/solution-boxes/components/SolutionBoxCard";
import { useSiteText } from "@/modules/site-content/context/SiteTextContext";
import type { SolutionBox } from "@/modules/solution-boxes/types/solutionBox";

export default function SolutionBoxDirectory({
  boxes,
}: {
  boxes: SolutionBox[];
}) {
  const { t } = useSiteText();
  return (
    <section className="flex-1 bg-white py-8 sm:py-10 lg:py-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-col gap-5 sm:mb-9 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
          <p
            className={`mb-2 text-xs font-extrabold uppercase text-[#FC5689] ${"tracking-normal"}`}
          >
            {t("solutionBox.pageEyebrow")}
          </p>
          <h1 className="text-[26px] font-black tracking-tight text-[#062a54] sm:text-4xl">
            {t("solutionBox.pageTitle")}
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            {t("solutionBox.subtitle")}
          </p>
          </div>
          <Link
            href="/solution-box/customised"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#FC5689] px-5 text-sm font-black text-white shadow-[0_10px_26px_rgba(252,86,137,.22)] transition hover:bg-[#03A7FD]"
          >
            <SlidersHorizontal className="size-4" />
            নিজের মতো Solution Box সাজান
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-5 xl:grid-cols-4">
          {boxes.map((box) => (
            <div key={box.id} id={box.slug} className="scroll-mt-28">
              <SolutionBoxCard box={box} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
