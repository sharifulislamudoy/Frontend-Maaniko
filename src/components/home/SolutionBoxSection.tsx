"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import SolutionBoxCard from "../solution-box/SolutionBoxCard";
import { useLanguage } from "@/context/LanguageContext";
import { solutionBoxes } from "../../data/solutionBoxes";

export default function SolutionBoxSection() {
  const { language, t } = useLanguage();

  return (
    <section
      aria-labelledby="solution-box-title"
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
              {t("solutionBox.eyebrow")}
            </p>

            <h2
              id="solution-box-title"
              className="text-2xl font-black tracking-tight text-[#062a54] sm:text-3xl"
            >
              {t("solutionBox.title")}
            </h2>
          </div>

          <Link
            href="/solution-box"
            aria-label={t("solutionBox.viewAll")}
            className="grid size-10 shrink-0 place-items-center rounded-full border border-[#dce3ec] bg-white text-[#062a54] shadow-sm transition-all duration-300 hover:border-[#ef4277] hover:bg-[#ef4277] hover:text-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#ef4277]/20 active:scale-95 sm:size-11"
          >
            <ArrowRight className="size-5" strokeWidth={2.2} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-5 xl:grid-cols-4">
          {solutionBoxes.slice(0, 4).map((box, index) => (
            <div
              key={box.id}
              className={
                index === 2
                  ? "hidden md:block"
                  : index === 3
                    ? "hidden xl:block"
                    : "block"
              }
            >
              <SolutionBoxCard box={box} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
