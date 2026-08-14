"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import SolutionBoxCard from "@/components/solution-box/SolutionBoxCard";
import { solutionBoxes } from "@/data/solutionBoxes";

export default function SolutionBoxSlider() {
  return (
    <div
      role="region"
      aria-label="Maaniko solution boxes"
      className="w-full overflow-hidden"
    >
      <Swiper
        slidesPerView="auto"
        slidesPerGroup={1}
        spaceBetween={0}
        grabCursor
        watchOverflow
        threshold={5}
        className="pb-1 [&_.swiper-wrapper]:items-stretch"
      >
        {solutionBoxes.map((box) => (
          <SwiperSlide
            key={box.id}
            className="
              !mr-3
              !h-auto
              !w-[calc((100%_-_12px)/2)]
              last:!mr-0

              md:!mr-4
              md:!w-[calc((100%_-_32px)/3)]
              md:last:!mr-0

              lg:!mr-5
              lg:!w-[calc((100%_-_60px)/4)]
              lg:last:!mr-0
            "
          >
            <SolutionBoxCard box={box} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}