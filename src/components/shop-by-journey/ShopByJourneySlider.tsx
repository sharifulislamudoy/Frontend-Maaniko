"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import ShopByJourneyCard from "@/components/shop-by-journey/ShopByJourneyCard";
import { shopByJourneyItems } from "@/data/shopByJourney";

import "swiper/css";

export default function ShopByJourneySlider() {
  return (
    <div
      role="region"
      aria-label="Shop by journey"
      className="w-full overflow-hidden"
    >
      <Swiper
        slidesPerView={3}
        slidesPerGroup={1}
        spaceBetween={8}
        grabCursor
        watchOverflow
        threshold={5}
        breakpoints={{
          768: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        className="pb-1"
      >
        {shopByJourneyItems.map((item) => (
          <SwiperSlide key={item.id} className="!h-auto">
            <ShopByJourneyCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}