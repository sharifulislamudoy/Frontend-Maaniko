"use client";

import { Heart, Sparkles } from "lucide-react";

import ComboPackCard from "@/components/combo-pack/ComboPackCard";
import { useLanguage } from "@/context/LanguageContext";
import { fakeComboPacks } from "@/data/fakeComboPacks";

export default function ComboPackPage() {
  const { t } = useLanguage();

  return (
    <div className="flex-1 bg-white">
      <section className="border-b border-[#dce3ec] bg-gradient-to-b from-[#fff4f6] to-white">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-10 text-center sm:px-6 sm:py-14 lg:px-8 lg:py-16 xl:px-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#ef4277] sm:text-sm">
            {t("comboPack.pageEyebrow")}
          </p>

          <div className="mt-3 flex items-center justify-center gap-3">
            <Sparkles
              className="size-6 text-[#10a9e8]"
              strokeWidth={1.8}
            />

            <h1 className="text-3xl font-black tracking-tight text-[#062a54] sm:text-4xl lg:text-5xl">
              {t("comboPack.pageTitle")}
            </h1>

            <Heart
              className="size-6 fill-[#ef4277]/20 text-[#ef4277]"
              strokeWidth={1.8}
            />
          </div>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            {t("comboPack.pageSubtitle")}
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-14 xl:px-10">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {fakeComboPacks.map((pack, index) => (
            <div
              key={pack.id}
              id={pack.slug}
              className="scroll-mt-28"
            >
              <ComboPackCard pack={pack} position={index + 1} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}