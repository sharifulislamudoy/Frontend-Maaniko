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
    iconColor: "text-[#FC5689]",
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
    iconColor: "text-[#FC5689]",
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
    iconColor: "text-[#FC5689]",
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
    iconColor: "text-[#FC5689]",
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
    iconColor: "text-[#03A7FD]",
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
    <section
      aria-labelledby="why-maaniko-title"
      className="bg-white py-3 md:py-8"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[26px] border border-[#f6dce4] bg-gradient-to-r from-[#fff9fa] via-[#fff4f6] to-[#f8fbff] px-3 py-7 shadow-[0_12px_35px_rgba(6,42,84,0.05)] sm:px-6 sm:py-8 lg:px-8">
          <h2
            id="why-maaniko-title"
            className="text-center text-2xl font-black tracking-tight text-[#FC5689] sm:text-3xl"
          >
            {sectionTitle}
          </h2>

          {/* Small: 2 cards, medium: 3 cards */}
          <div
            role="region"
            aria-label={sectionTitle}
            className="mt-6 overflow-hidden lg:hidden"
          >
            <Swiper
              modules={[Autoplay]}
              slidesPerView={2}
              slidesPerGroup={1}
              spaceBetween={10}
              speed={750}
              loop={MAANIKO_FEATURES.length > 3}
              grabCursor
              watchOverflow
              threshold={5}
              observer
              observeParents
              resizeObserver
              autoplay={{
                delay: 3200,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 14,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 16,
                },
              }}
              className="why-maaniko-swiper [&_.swiper-wrapper]:items-stretch"
            >
              {MAANIKO_FEATURES.map((feature) => {
                const Icon = feature.icon;

                return (
                  <SwiperSlide key={feature.id} className="!h-auto">
                    <article className="flex h-full min-h-[190px] flex-col items-center justify-center rounded-2xl border border-white/80 bg-white/75 px-2 py-5 text-center shadow-[0_8px_24px_rgba(6,42,84,0.06)] sm:px-4 sm:py-6">
                      <span
                        className={`flex size-11 shrink-0 items-center justify-center rounded-full sm:size-12 ${feature.iconBackground}`}
                      >
                        <Icon
                          aria-hidden="true"
                          className={`size-5 sm:size-6 ${feature.iconColor}`}
                          strokeWidth={2}
                        />
                      </span>

                      <h3 className="mt-3 text-sm font-black leading-5 text-[#252a35] sm:mt-4 sm:text-base sm:leading-6">
                        {localize(feature.title)}
                      </h3>

                      <p className="mt-1.5 line-clamp-3 text-xs font-medium leading-5 text-slate-500 sm:text-sm sm:leading-6">
                        {localize(feature.description)}
                      </p>
                    </article>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          {/* Large device: all 5 cards */}
          <div className="mt-8 hidden grid-cols-5 divide-x divide-[#edccd6] lg:grid">
            {MAANIKO_FEATURES.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.id}
                  className="flex min-w-0 flex-col items-center px-5 text-center"
                >
                  <span
                    className={`flex size-12 shrink-0 items-center justify-center rounded-full ${feature.iconBackground}`}
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