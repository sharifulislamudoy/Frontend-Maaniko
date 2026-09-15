"use client";

import { useSiteText } from "@/modules/site-content/context/SiteTextContext";
import MotherGuideCard from "@/modules/mother-guides/components/MotherGuideCard";
import { motherGuideRecords } from "@/modules/mother-guides/data/motherGuides";

export default function MotherGuideDirectory() {
  const { locale } = useSiteText();

  const copy = {
    eyebrow: "Maaniko Knowledge Hub",
    title: "মা ও শিশুর সকল গাইড",
    description:
      "গর্ভাবস্থা থেকে postpartum recovery ও শিশুর দৈনন্দিন যত্ন পর্যন্ত সংক্ষিপ্ত ও প্রয়োজনীয় গাইড।",
  };

  return (
    <main className="bg-white py-10 md:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        <header className="mx-auto mb-9 max-w-3xl text-center md:mb-12">
          <span className="text-xs font-black uppercase tracking-[0.12em] text-[#f15b8a]">
            {copy.eyebrow}
          </span>
          <h1 className="mt-3 text-[25px] font-black leading-tight text-[#071a32] md:text-4xl lg:text-[42px]">
            {copy.title}
          </h1>
          <p className="mt-3 text-sm font-medium leading-7 text-[#647080] md:text-base">
            {copy.description}
          </p>
        </header>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {motherGuideRecords.map((guide, index) => (
            <MotherGuideCard key={guide.id} guide={guide} index={index} />
          ))}
        </div>
      </div>
    </main>
  );
}
