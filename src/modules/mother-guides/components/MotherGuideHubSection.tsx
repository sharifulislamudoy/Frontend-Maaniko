"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import MotherGuideCard from "@/modules/mother-guides/components/MotherGuideCard";
import { motherGuideRecords } from "@/modules/mother-guides/data/motherGuides";
import ViewAllCard from "@/shared/components/ViewAllCard";

import "swiper/css";

export default function MotherGuideHubSection() {
  const visibleGuides = motherGuideRecords.slice(0, 6);

  const copy = {
    titleStart: "মায়েদের জন্য",
    titleAccent: "দরকারি গাইড",
    subtitle: "সঠিক তথ্য, যত্ন ও প্রস্তুতিতে আমরা আছি আপনার পাশে",
    sliderLabel: "মায়েদের জন্য দরকারি গাইডসমূহ",
  };

  return (
    <section
      aria-labelledby="mother-guide-hub-title"
      className="overflow-hidden bg-white py-10 md:py-14 lg:py-16"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-3xl text-center md:mb-10 lg:mb-12">
          <h2
            id="mother-guide-hub-title"
            className="text-[24px] font-black leading-[1.3] tracking-tight text-[#071a32] md:text-4xl md:leading-[1.25] lg:text-[42px]"
          >
            <span>{copy.titleStart} </span>
            <span className="text-[#f15b8a]">{copy.titleAccent}</span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm font-medium leading-6 text-[#596273] md:mt-4 md:text-lg">
            {copy.subtitle}
          </p>
        </div>

        <Swiper
          slidesPerView={1.12}
          spaceBetween={14}
          grabCursor
          watchOverflow
          resistance
          resistanceRatio={0.65}
          threshold={5}
          breakpoints={{
            768: {
              slidesPerView: 2,
              spaceBetween: 18,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 22,
            },
          }}
          aria-label={copy.sliderLabel}
          className="mother-guide-swiper !overflow-visible [&_.swiper-slide]:!h-auto [&_.swiper-wrapper]:items-stretch lg:!overflow-hidden"
        >
          {visibleGuides.map((guide, index) => (
            <SwiperSlide key={guide.id} className="!h-auto">
              <MotherGuideCard guide={guide} index={index} />
            </SwiperSlide>
          ))}
          <SwiperSlide className="!h-auto">
            <ViewAllCard href="/mother-guides" ariaLabel="মায়েদের সব গাইড দেখুন" />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
