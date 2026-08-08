"use client";

import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Heart,
  Headphones,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useLanguage } from "@/context/LanguageContext";
import type { LocalizedValue } from "@/types/localization";

import "swiper/css";

type MaanikoFeature = {
  id: string;
  title: LocalizedValue;
  description: LocalizedValue;
  icon: LucideIcon;
  iconColor: string;
  iconBackground: string;
};

const MAANIKO_FEATURES: MaanikoFeature[] = [
  {
    id: "carefully-selected",
    title: {
      bn: "প্রয়োজনীয় বাছাইকৃত",
      en: "Carefully Selected",
    },
    description: {
      bn: "শিশু ও মায়ের জন্য বিশ্বস্ত পণ্য",
      en: "Trusted products for mother and baby",
    },
    icon: BadgeCheck,
    iconColor: "text-[#ef4277]",
    iconBackground: "bg-[#ffe5ed]",
  },
  {
    id: "premium-quality",
    title: {
      bn: "প্রিমিয়াম কোয়ালিটি",
      en: "Premium Quality",
    },
    description: {
      bn: "নিরাপদ, টেকসই ও উচ্চ মানের",
      en: "Safe, durable and high-quality products",
    },
    icon: ShieldCheck,
    iconColor: "text-[#ef4277]",
    iconBackground: "bg-[#ffe5ed]",
  },
  {
    id: "fast-delivery",
    title: {
      bn: "দ্রুত ডেলিভারি",
      en: "Fast Delivery",
    },
    description: {
      bn: "সারা বাংলাদেশে দ্রুত ডেলিভারি",
      en: "Quick delivery across Bangladesh",
    },
    icon: Truck,
    iconColor: "text-[#ef4277]",
    iconBackground: "bg-[#ffe5ed]",
  },
  {
    id: "lovely-packaging",
    title: {
      bn: "ভালোবাসার প্যাকেজিং",
      en: "Packed with Love",
    },
    description: {
      bn: "প্রতিটি অর্ডারে থাকে স্পেশাল টাচ",
      en: "A special touch with every order",
    },
    icon: Heart,
    iconColor: "text-[#ef4277]",
    iconBackground: "bg-[#ffe5ed]",
  },
  {
    id: "customer-care",
    title: {
      bn: "সহায়ক কাস্টমার কেয়ার",
      en: "Helpful Customer Care",
    },
    description: {
      bn: "যেকোনো সমস্যা সমাধানে আমরা আছি",
      en: "We are here to solve any problem",
    },
    icon: Headphones,
    iconColor: "text-[#10a9e8]",
    iconBackground: "bg-[#dff5ff]",
  },
];

export default function WhyMaanikoSection() {
  const { localize } = useLanguage();

  const sectionTitle = localize({
    bn: "কেন মানিকো?",
    en: "Why Maaniko?",
  });

  return (
    <section className="bg-white py-8">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[26px] border border-[#f6dce4] bg-gradient-to-r from-[#fff9fa] via-[#fff4f6] to-[#f8fbff] px-4 py-7 shadow-[0_12px_35px_rgba(6,42,84,0.05)] sm:px-6 sm:py-8 lg:px-8">
          <h2 className="text-center text-2xl font-black tracking-tight text-[#ef4277] sm:text-3xl">
            {sectionTitle}
          </h2>

          {/* Mobile and tablet autoplay slider */}
          <div
            role="region"
            aria-label={sectionTitle}
            className="mt-6 overflow-hidden lg:hidden"
          >
            <Swiper
              modules={[Autoplay]}
              slidesPerView="auto"
              spaceBetween={14}
              speed={750}
              loop={MAANIKO_FEATURES.length > 2}
              grabCursor
              watchOverflow
              observer
              observeParents
              resizeObserver
              autoplay={{
                delay: 3200,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              className="why-maaniko-swiper"
            >
              {MAANIKO_FEATURES.map((feature) => {
                const Icon = feature.icon;

                return (
                  <SwiperSlide
                    key={feature.id}
                    className="!h-auto !w-[84%] sm:!w-[46%]"
                  >
                    <article className="flex h-full min-h-[190px] flex-col items-center justify-center rounded-2xl border border-white/80 bg-white/75 px-5 py-6 text-center shadow-[0_8px_24px_rgba(6,42,84,0.06)]">
                      <span
                        className={`flex size-12 items-center justify-center rounded-full ${feature.iconBackground}`}
                      >
                        <Icon
                          aria-hidden="true"
                          className={`size-6 ${feature.iconColor}`}
                          strokeWidth={2}
                        />
                      </span>

                      <h3 className="mt-4 text-base font-black text-[#252a35]">
                        {localize(feature.title)}
                      </h3>

                      <p className="mt-1.5 max-w-[220px] text-sm font-medium leading-6 text-slate-500">
                        {localize(feature.description)}
                      </p>
                    </article>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          {/* Desktop fixed layout */}
          <div className="mt-8 hidden grid-cols-5 divide-x divide-[#edccd6] lg:grid">
            {MAANIKO_FEATURES.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.id}
                  className="flex min-w-0 flex-col items-center px-5 text-center"
                >
                  <span
                    className={`flex size-12 items-center justify-center rounded-full ${feature.iconBackground}`}
                  >
                    <Icon
                      aria-hidden="true"
                      className={`size-6 ${feature.iconColor}`}
                      strokeWidth={2}
                    />
                  </span>

                  <h3 className="mt-4 text-base font-black leading-6 text-[#252a35]">
                    {localize(feature.title)}
                  </h3>

                  <p className="mt-1.5 max-w-[210px] text-sm font-medium leading-6 text-slate-500">
                    {localize(feature.description)}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}