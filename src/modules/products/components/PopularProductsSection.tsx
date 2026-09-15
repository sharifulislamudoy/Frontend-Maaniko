"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import ProductCard from "@/modules/products/components/ProductCard";
import ProductCardSkeleton from "@/modules/products/components/ProductCardSkeleton";
import type { MaanikoProduct } from "@/modules/products/types/product";
import ViewAllCard from "@/shared/components/ViewAllCard";

import "swiper/css";

type PopularProductsSectionProps = {
  products?: MaanikoProduct[];
  isLoading?: boolean;
};

const SKELETON_ITEMS = Array.from(
  { length: 5 },
  (_, index) => `product-skeleton-${index}`,
);

const SLIDE_CLASS_NAME = `
  !mr-3
  !h-auto
  !w-[calc(66.666667%_-_8px)]

  md:!mr-4
  md:!w-[calc(40%_-_12.8px)]

  lg:!mr-5
  lg:!w-[calc(28.571429%_-_17.142857px)]
`;

export default function PopularProductsSection({
  products = [],
  isLoading = false,
}: PopularProductsSectionProps) {
  const visibleProducts = products.slice(0, 6);

  if (!isLoading && products.length === 0) {
    return null;
  }

  return (
    <section
      aria-labelledby="popular-products-title"
      className="overflow-hidden bg-white py-6 md:py-9 lg:py-12"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Heading and subheading */}
        <div className="mx-auto mb-7 max-w-4xl text-center md:mb-10 lg:mb-12">
          <h2
            id="popular-products-title"
            className="text-[21px] leading-[1.3] font-black tracking-tight text-[#07183d] md:text-[35px] md:leading-[1.25] lg:text-[42px]"
          >
            {
              <>
                মায়েদের সবচেয়ে পছন্দের{" "}
                <span className="text-[#db5b8f]">পণ্যগুলো</span>
              </>
            }
          </h2>

          <p className="mt-3 text-[13px] leading-6 font-medium text-[#687086] md:mt-4 md:text-base lg:text-lg">
            {"মা ও শিশুর বিশ্বস্ত পছন্দ"}
          </p>
        </div>

        {/* Products slider */}
        <Swiper
          slidesPerView="auto"
          slidesPerGroup={1}
          spaceBetween={0}
          grabCursor={!isLoading && visibleProducts.length > 1}
          watchOverflow
          resistance
          resistanceRatio={0.65}
          observer
          observeParents
          resizeObserver
          className="popular-products-swiper [&_.swiper-slide]:!h-auto [&_.swiper-wrapper]:items-stretch"
        >
          {isLoading
            ? SKELETON_ITEMS.map((item) => (
                <SwiperSlide key={item} className={SLIDE_CLASS_NAME}>
                  <div className="h-full py-1">
                    <ProductCardSkeleton />
                  </div>
                </SwiperSlide>
              ))
            : visibleProducts.map((product) => (
                <SwiperSlide key={product.id} className={SLIDE_CLASS_NAME}>
                  <div className="h-full py-1">
                    <ProductCard product={product} />
                  </div>
                </SwiperSlide>
              ))}
          {!isLoading && (
            <SwiperSlide className={SLIDE_CLASS_NAME}>
              <div className="h-full py-1">
                <ViewAllCard href="/shop" ariaLabel="সব পণ্য দেখুন" />
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </section>
  );
}
