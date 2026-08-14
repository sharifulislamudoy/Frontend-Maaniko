"use client";

import SolutionBoxCard from "../../../components/solution-box/SolutionBoxCard";
import { useLanguage } from "@/context/LanguageContext";
import { solutionBoxes } from "../../../data/solutionBoxes";

export default function SolutionBoxPage() {
  const { language, t } = useLanguage();

  return (
    <section className="flex-1 bg-white py-8 sm:py-10 lg:py-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-7 max-w-2xl sm:mb-9">
          <p
            className={`mb-2 text-xs font-extrabold uppercase text-[#FF7897] ${
              language === "en"
                ? "tracking-[0.2em]"
                : "tracking-normal"
            }`}
          >
            {t("solutionBox.pageEyebrow")}
          </p>

          <h1 className="text-3xl font-black tracking-tight text-[#062a54] sm:text-4xl">
            {t("solutionBox.pageTitle")}
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
            {t("solutionBox.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:gap-5 xl:grid-cols-4">
          {solutionBoxes.map((box) => (
            <div key={box.id} id={box.slug} className="scroll-mt-28">
              <SolutionBoxCard box={box} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
