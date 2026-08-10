"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeftRight, Heart, Sparkles } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import ComboPackCard from "@/components/combo-pack/ComboPackCard";
import { useLanguage } from "@/context/LanguageContext";
import { fakeComboPacks } from "@/data/fakeComboPacks";

export default function ComboPackSection() {
  const { localize, t } = useLanguage();
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  const swipeHintText = localize({
    bn: "আরও কম্বো প্যাক দেখতে পাশে সোয়াইপ করুন",
    en: "Swipe sideways to explore more combo packs",
  });

  return (
    <section className="bg-white md:py-8 py-3">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col items-center text-center sm:mb-8">
          <div className="flex items-center justify-center gap-3">
            <Sparkles
              className="size-5 text-[#ef4277] sm:size-6"
              strokeWidth={1.8}
            />

            <h2 className="text-2xl font-black tracking-tight text-[#252a35] sm:text-3xl">
              {t("comboPack.homeTitle")}
            </h2>

            <Heart
              className="size-5 fill-[#ef4277]/20 text-[#ef4277] sm:size-6"
              strokeWidth={1.8}
            />
          </div>

          <p className="mt-2 text-sm font-medium text-slate-500 sm:text-base">
            {t("comboPack.homeSubtitle")}
          </p>
        </div>

        <div
          role="region"
          aria-label={t("comboPack.sliderLabel")}
          className="overflow-hidden"
        >
          <Swiper
            slidesPerView={1}
            slidesPerGroup={1}
            spaceBetween={14}
            speed={650}
            grabCursor
            watchOverflow
            observer
            observeParents
            resizeObserver
            onSliderFirstMove={() => setShowSwipeHint(false)}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 14,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
            }}
            className="combo-pack-swiper [&_.swiper-slide]:!h-auto [&_.swiper-wrapper]:items-stretch"
          >
            {fakeComboPacks.map((pack, index) => (
              <SwiperSlide key={pack.id} className="!h-auto">
                <div className="h-full py-1">
                  <ComboPackCard pack={pack} position={index + 1} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Mobile and tablet swipe indicator */}
        <div className="mt-3 flex h-9 items-center justify-center">
          <div
            aria-hidden={!showSwipeHint}
            className={`inline-flex items-center gap-2 rounded-full border border-[#dce3ec] bg-white px-4 py-2 text-xs font-bold text-slate-500 shadow-[0_5px_18px_rgba(6,42,84,0.08)] transition-all duration-500 sm:text-sm ${
              showSwipeHint
                ? "translate-y-0 opacity-100"
                : "pointer-events-none translate-y-1 opacity-0"
            }`}
          >
            <ArrowLeftRight
              className="size-4 shrink-0 animate-pulse text-[#ef4277]"
              strokeWidth={2.2}
            />

            <span>{swipeHintText}</span>
          </div>
        </div>

        <Link
          href="/combo-pack"
          className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl border-2 border-[#ef4277]/35 bg-[#fffafb] px-5 text-sm font-extrabold text-[#ef4277] transition-all duration-300 hover:border-[#ef4277] hover:bg-[#ef4277] hover:text-white active:scale-[0.99] sm:h-14 sm:text-base lg:mt-6"
        >
          <span>{t("comboPack.viewAll")}</span>
          <Heart className="size-4 fill-current sm:size-5" />
        </Link>
      </div>
    </section>
  );
}