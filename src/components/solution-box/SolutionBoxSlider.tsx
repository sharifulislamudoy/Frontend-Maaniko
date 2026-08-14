"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import SolutionBoxCard from "@/components/solution-box/SolutionBoxCard";
import { solutionBoxes } from "@/data/solutionBoxes";

import "swiper/css";

export default function SolutionBoxSlider() {
  return (
    <div
      role="region"
      aria-label="Maaniko solution boxes"
      className="w-full overflow-hidden"
    >
      <Swiper
        slidesPerView={2}
        slidesPerGroup={1}
        spaceBetween={12}
        grabCursor
        watchOverflow
        threshold={5}
        breakpoints={{
          768: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        className="pb-1 [&_.swiper-wrapper]:items-stretch"
      >
        {solutionBoxes.map((box) => (
          <SwiperSlide key={box.id} className="!h-auto">
            <SolutionBoxCard box={box} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}