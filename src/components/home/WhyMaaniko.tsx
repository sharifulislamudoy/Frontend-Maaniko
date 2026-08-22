"use client";

import { useId, useState } from "react";
import { motion, type Variants } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  ChevronDown,
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

type FeatureCardProps = {
  feature: MaanikoFeature;
  className?: string;
};

type ExpandableFeatureGridProps = {
  initialCount: number;
  columnsClassName: string;
  getCardClassName: (index: number) => string;
  sectionTitle: string;
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

const expandableContainerVariants: Variants = {
  collapsed: {
    // Keep a small preview visible, like the reference video.
    height: 68,
    opacity: 1,
    transition: {
      height: { duration: 0.46, ease: [0.4, 0, 0.2, 1] },
      staggerChildren: 0.045,
      staggerDirection: -1,
      when: "afterChildren",
    },
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.58, ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.24, delay: 0.08 },
      delayChildren: 0.12,
      staggerChildren: 0.08,
      when: "beforeChildren",
    },
  },
};

const expandableItemVariants: Variants = {
  collapsed: {
    opacity: 0.24,
    y: -6,
    scale: 0.97,
    filter: "blur(1.2px)",
    transition: { duration: 0.24, ease: "easeIn" },
  },
  expanded: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] },
  },
};

function FeatureCard({ feature, className = "" }: FeatureCardProps) {
  const { localize } = useLanguage();
  const Icon = feature.icon;

  return (
    <article
      className={`flex min-h-[118px] min-w-0 flex-col items-center justify-center px-3 py-5 text-center md:min-h-[125px] md:px-5 ${className}`}
    >
      <Icon
        aria-hidden="true"
        strokeWidth={1.8}
        className="size-9 shrink-0 text-[#062a54] md:size-10 lg:size-11"
      />

      <p className="mt-3 max-w-[160px] text-sm font-semibold leading-5 text-[#303030] md:max-w-[185px] md:text-[15px] md:leading-6 lg:max-w-[210px] lg:text-base">
        {localize(feature.label)}
      </p>
    </article>
  );
}

function ExpandableFeatureGrid({
  initialCount,
  columnsClassName,
  getCardClassName,
  sectionTitle,
}: ExpandableFeatureGridProps) {
  const { localize } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const expandableContentId = useId();

  const initialFeatures = MAANIKO_FEATURES.slice(0, initialCount);
  const expandableFeatures = MAANIKO_FEATURES.slice(initialCount);

  const showMoreText = localize({ bn: "আরো দেখুন", en: "Show more" });
  const showLessText = localize({ bn: "কম দেখুন", en: "Show less" });

  return (
    <div role="region" aria-label={sectionTitle}>
      <div className={`grid ${columnsClassName}`}>
        {initialFeatures.map((feature, index) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
            className={getCardClassName(index)}
          />
        ))}
      </div>

      <motion.div
        id={expandableContentId}
        aria-hidden={!isExpanded}
        initial="collapsed"
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={expandableContainerVariants}
        className="overflow-hidden"
        style={{
          WebkitMaskImage: isExpanded
            ? "none"
            : "linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0.65) 48%, transparent 100%)",
          maskImage: isExpanded
            ? "none"
            : "linear-gradient(to bottom, #000 0%, rgba(0, 0, 0, 0.65) 48%, transparent 100%)",
        }}
      >
        <div className={`grid ${columnsClassName}`}>
          {expandableFeatures.map((feature, index) => (
            <motion.div key={feature.id} variants={expandableItemVariants}>
              <FeatureCard
                feature={feature}
                className={`border-t border-[#dce3ec] ${getCardClassName(index)}`}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div
        className={`relative z-10 flex justify-center transition-[margin,padding,background] duration-500 ${
          isExpanded
            ? "mt-1"
            : "-mt-14 bg-gradient-to-t from-white via-white/90 to-transparent pt-11"
        }`}
      >
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-controls={expandableContentId}
          onClick={() => setIsExpanded((currentValue) => !currentValue)}
          className="group inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full px-4 text-sm font-bold text-[#FC5689] outline-none transition-colors hover:text-[#e94276] focus-visible:ring-2 focus-visible:ring-[#FC5689] focus-visible:ring-offset-2 active:text-[#d93669] md:text-[15px]"
        >
          <span>{isExpanded ? showLessText : showMoreText}</span>

          <motion.span
            aria-hidden="true"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex"
          >
            <ChevronDown className="size-4" strokeWidth={2.4} />
          </motion.span>
        </button>
      </div>
    </div>
  );
}

export default function WhyMaaniko() {
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
        <div>
          <h2
            id="why-maaniko-title"
            className="text-left text-xl font-black leading-tight tracking-tight text-[#062a54] md:text-2xl lg:text-[30px]"
          >
            {sectionTitle}
          </h2>

          <div className="mt-2 h-1 w-14 rounded-full bg-[#FC5689] md:w-16 lg:w-20" />
        </div>

        {/* Mobile: one row first, then reveal the second row. */}
        <div className="mt-5 md:hidden">
          <ExpandableFeatureGrid
            initialCount={2}
            columnsClassName="grid-cols-2"
            getCardClassName={(index) =>
              index % 2 !== 0 ? "border-l border-[#dce3ec]" : ""
            }
            sectionTitle={sectionTitle}
          />
        </div>

        {/* Tablet: three items first, then reveal the final item. */}
        <div className="mt-6 hidden md:block lg:hidden">
          <ExpandableFeatureGrid
            initialCount={3}
            columnsClassName="grid-cols-3"
            getCardClassName={(index) =>
              index % 3 !== 0 ? "border-l border-[#dce3ec]" : ""
            }
            sectionTitle={sectionTitle}
          />
        </div>

        {/* Desktop: all items stay visible; no show-more control. */}
        <div
          role="region"
          aria-label={sectionTitle}
          className="mt-7 hidden grid-cols-4 lg:grid"
        >
          {MAANIKO_FEATURES.map((feature, index) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              className={`lg:min-h-[132px] lg:px-8 ${
                index > 0 ? "border-l border-[#dce3ec]" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}