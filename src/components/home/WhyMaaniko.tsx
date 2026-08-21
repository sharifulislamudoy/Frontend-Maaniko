"use client";

import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Headphones,
  Search,
  ShieldCheck,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import type { LocalizedValue } from "@/types/localization";

type MaanikoFeature = {
  id: string;
  label: LocalizedValue;
  icon: LucideIcon;
};

const MAANIKO_FEATURES: MaanikoFeature[] = [
  {
    id: "need-based-selection",
    label: {
      bn: "প্রয়োজন বুঝে বাছাই",
      en: "Selected for Your Needs",
    },
    icon: Search,
  },
  {
    id: "quality-checked",
    label: {
      bn: "প্রতিটি পণ্য কোয়ালিটি চেক",
      en: "Every Product Quality Checked",
    },
    icon: ShieldCheck,
  },
  {
    id: "bangla-instructions",
    label: {
      bn: "বাংলায় ব্যবহারবিধি",
      en: "Usage Guide in Bangla",
    },
    icon: BookOpen,
  },
  {
    id: "after-sales-support",
    label: {
      bn: "বিক্রির পরও সহায়তা",
      en: "After-Sales Support",
    },
    icon: Headphones,
  },
];

const FEATURE_DIVIDER_CLASSES = [
  "border-b border-[#dce3ec] md:border-b-0",
  "border-b border-l border-[#dce3ec] md:border-b-0",
  "md:border-l md:border-[#dce3ec]",
  "border-l border-[#dce3ec]",
];

export default function WhyMaanikoSection() {
  const { localize } = useLanguage();

  const sectionTitle = localize({
    bn: "কেন Maaniko বেছে নেবেন?",
    en: "Why Choose Maaniko?",
  });

  return (
    <section
      aria-labelledby="why-maaniko-title"
      className="bg-white py-6 md:py-7 lg:py-8"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        <h2
          id="why-maaniko-title"
          className="text-left text-xl font-black leading-tight tracking-tight text-[#062a54] md:text-2xl lg:text-[30px]"
        >
          {sectionTitle}
        </h2>

        <div
          role="list"
          aria-label={sectionTitle}
          className="mt-5 grid grid-cols-2 md:mt-6 md:grid-cols-4 lg:mt-7"
        >
          {MAANIKO_FEATURES.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <article
                key={feature.id}
                role="listitem"
                className={`flex min-h-[112px] min-w-0 flex-col items-center justify-center px-2 py-5 text-center md:min-h-[120px] md:px-4 md:py-4 lg:min-h-[128px] lg:px-8 ${FEATURE_DIVIDER_CLASSES[index]}`}
              >
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.8}
                  className="size-9 shrink-0 text-[#062a54] md:size-10 lg:size-11"
                />

                <p className="mt-3 max-w-[170px] text-sm font-semibold leading-5 text-[#303030] md:max-w-[190px] md:text-[15px] md:leading-6 lg:max-w-[210px] lg:text-base">
                  {localize(feature.label)}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}