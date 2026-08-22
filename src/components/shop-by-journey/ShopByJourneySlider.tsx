"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import ShopByJourneyIconCard from "@/components/shop-by-journey/ShopByJourneyCard";
import { useLanguage } from "@/context/LanguageContext";
import { shopByJourneyItems } from "@/data/shopByJourney";

export default function ShopByJourneySlider() {
  const { language, t } = useLanguage();

  const previousLabel =
    language === "bn" ? "আগের ক্যাটাগরি দেখুন" : "View previous category";

  const nextLabel =
    language === "bn" ? "পরের ক্যাটাগরি দেখুন" : "View next category";

  return (
    <div
      role="region"
      aria-label={t("shopByJourney.title")}
      className="relative w-full"
    >
      <button
        type="button"
        aria-label={previousLabel}
        className="
          shop-by-journey-prev
          absolute left-0 top-1/2 z-20 flex size-8
          -translate-y-1/2 items-center justify-center rounded-full
          border border-[#E2E8F0] bg-white text-[#062A54]
          shadow-[0_5px_18px_rgba(6,42,84,0.12)]
          transition-all duration-300
          hover:border-[#FC5689] hover:bg-[#FC5689] hover:text-white
          focus-visible:outline-none focus-visible:ring-4
          focus-visible:ring-[#FC5689]/20
          active:scale-90
          [&.swiper-button-disabled]:pointer-events-none
          [&.swiper-button-disabled]:opacity-30
          md:size-10
        "
      >
        <ChevronLeft
          aria-hidden="true"
          strokeWidth={2.2}
          className="size-5 md:size-6"
        />
      </button>

      <div className="px-9 md:px-12">
        <Swiper
          modules={[Navigation]}
          slidesPerView="auto"
          slidesPerGroup={1}
          spaceBetween={10}
          grabCursor
          watchOverflow
          centerInsufficientSlides
          rewind
          threshold={5}
          navigation={{
            prevEl: ".shop-by-journey-prev",
            nextEl: ".shop-by-journey-next",
          }}
          breakpoints={{
            768: {
              spaceBetween: 14,
            },
            1024: {
              spaceBetween: 16,
            },
          }}
          className="
            w-full pb-2
            [&_.swiper-wrapper]:items-stretch
          "
        >
          {shopByJourneyItems.map((item) => (
            <SwiperSlide
              key={item.id}
              className="
                !h-auto !w-[106px]
                md:!w-[138px]
                lg:!w-[165px]
              "
            >
              <ShopByJourneyIconCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <button
        type="button"
        aria-label={nextLabel}
        className="
          shop-by-journey-next
          absolute right-0 top-1/2 z-20 flex size-8
          -translate-y-1/2 items-center justify-center rounded-full
          border border-[#E2E8F0] bg-white text-[#062A54]
          shadow-[0_5px_18px_rgba(6,42,84,0.12)]
          transition-all duration-300
          hover:border-[#FC5689] hover:bg-[#FC5689] hover:text-white
          focus-visible:outline-none focus-visible:ring-4
          focus-visible:ring-[#FC5689]/20
          active:scale-90
          [&.swiper-button-disabled]:pointer-events-none
          [&.swiper-button-disabled]:opacity-30
          md:size-10
        "
      >
        <ChevronRight
          aria-hidden="true"
          strokeWidth={2.2}
          className="size-5 md:size-6"
        />
      </button>
    </div>
  );
}