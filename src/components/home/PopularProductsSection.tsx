"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import ProductCard from "@/components/product/ProductCard";
import ProductCardSkeleton from "@/components/product/ProductCardSkeleton";
import { useLanguage } from "@/context/LanguageContext";
import { fakeProducts } from "@/data/fakeProducts";
import type { MaanikoProduct } from "@/types/product";

type PopularProductsSectionProps = {
  products?: MaanikoProduct[];
  isLoading?: boolean;
};

const SKELETON_ITEMS = Array.from(
  { length: 5 },
  (_, index) => `product-skeleton-${index}`,
);

export default function PopularProductsSection({
  products = fakeProducts,
  isLoading = false,
}: PopularProductsSectionProps) {
  const { language, t } = useLanguage();
  const swiperRef = useRef<SwiperType | null>(null);

  const displayedItemsCount = isLoading
    ? SKELETON_ITEMS.length
    : products.length;

  const canSlide = displayedItemsCount > 1;
  const canLoop = !isLoading && products.length >= 5;

  function handlePreviousSlide() {
    swiperRef.current?.slidePrev();
  }

  function handleNextSlide() {
    swiperRef.current?.slideNext();
  }

  if (!isLoading && products.length === 0) {
    return null;
  }

  return (
    <section className="bg-white md:py-8 py-3">
      {/* Hamburger button থেকে cart icon পর্যন্ত একই width */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#ef4277]">
              {t("home.collection")}
            </p>

            <h2 className="text-2xl font-black tracking-tight text-[#062a54]">
              {t("home.popularProducts")}
            </h2>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={handlePreviousSlide}
              disabled={!canSlide}
              aria-label={
                language === "bn"
                  ? "আগের পণ্য দেখুন"
                  : "View previous products"
              }
              className="grid size-10 place-items-center rounded-full border border-[#dce3ec] bg-white text-[#062a54] shadow-sm transition-all duration-300 hover:border-[#ef4277] hover:bg-[#ef4277] hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 sm:size-11"
            >
              <ChevronLeft className="size-5" strokeWidth={2.2} />
            </button>

            <button
              type="button"
              onClick={handleNextSlide}
              disabled={!canSlide}
              aria-label={
                language === "bn"
                  ? "পরের পণ্য দেখুন"
                  : "View next products"
              }
              className="grid size-10 place-items-center rounded-full border border-[#dce3ec] bg-white text-[#062a54] shadow-sm transition-all duration-300 hover:border-[#10a9e8] hover:bg-[#10a9e8] hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 sm:size-11"
            >
              <ChevronRight className="size-5" strokeWidth={2.2} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Autoplay]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView={1.5}
          slidesPerGroup={1}
          spaceBetween={14}
          speed={750}
          loop={canLoop}
          loopAdditionalSlides={2}
          grabCursor={canSlide}
          watchOverflow
          observer
          observeParents
          resizeObserver
          autoplay={
            canLoop
              ? {
                  delay: 3200,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                  stopOnLastSlide: false,
                }
              : false
          }
          breakpoints={{
            0: {
              slidesPerView: 1.5,
              spaceBetween: 14,
            },
            640: {
              slidesPerView: 2.5,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 20,
            },
          }}
          className="popular-products-swiper [&_.swiper-slide]:!h-auto [&_.swiper-wrapper]:items-stretch"
        >
          {isLoading
            ? SKELETON_ITEMS.map((item) => (
                <SwiperSlide key={item} className="!h-auto">
                  <div className="h-full py-1">
                    <ProductCardSkeleton />
                  </div>
                </SwiperSlide>
              ))
            : products.map((product) => (
                <SwiperSlide key={product.id} className="!h-auto">
                  <div className="h-full py-1">
                    <ProductCard product={product} />
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </section>
  );
}