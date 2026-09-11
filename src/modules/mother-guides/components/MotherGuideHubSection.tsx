"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";

import { useSiteText } from "@/modules/site-content/context/SiteTextContext";
import MotherGuideCard from "@/modules/mother-guides/components/MotherGuideCard";
import { motherGuideRecords } from "@/modules/mother-guides/data/motherGuides";

import "swiper/css";

export default function MotherGuideHubSection() {
  const { locale } = useSiteText();

  const copy = {
    titleStart: "মায়েদের জন্য",
    titleAccent: "দরকারি গাইড",
    subtitle: "সঠিক তথ্য, যত্ন ও প্রস্তুতিতে আমরা আছি আপনার পাশে",
    viewAll: "সব গাইড দেখুন",
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
          {motherGuideRecords.map((guide, index) => (
            <SwiperSlide key={guide.id} className="!h-auto">
              <MotherGuideCard guide={guide} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-8 flex justify-center md:mt-10">
          <Link
            href="/mother-guides"
            className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-full border-2 border-[#f8d8e3] bg-white px-6 py-2.5 text-sm font-extrabold text-[#f15b8a] transition-all duration-300 hover:border-[#f15b8a] hover:bg-[#f15b8a] hover:text-white hover:shadow-[0_10px_24px_rgba(241,91,138,0.18)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#f15b8a]/20 active:scale-[0.98] md:min-h-12 md:px-8 md:text-base"
          >
            <span>{copy.viewAll}</span>

            <ArrowRight
              aria-hidden="true"
              strokeWidth={2.3}
              className="size-5 transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
