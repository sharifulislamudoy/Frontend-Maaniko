"use client";

/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from "react";
import { Heart } from "lucide-react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useLanguage } from "@/context/LanguageContext";
import { useShop } from "@/context/ShopContext";
import type { MaanikoProduct } from "@/types/product";

type ProductGalleryProps = {
  product: MaanikoProduct;
};

export default function ProductGallery({ product }: ProductGalleryProps) {
  const { language, localize, t } = useLanguage();
  const { isInWishlist, toggleWishlist } = useShop();
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const productName = localize(product.name);
  const wished = isInWishlist(product.id);
  const hasMultipleImages = product.images.length > 1;

  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(language === "bn" ? "bn-BD" : "en-BD"),
    [language],
  );

  const discountPercentage = useMemo(() => {
    if (!product.compareAtPrice || product.compareAtPrice <= product.price) {
      return 0;
    }

    return Math.round(
      ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100,
    );
  }, [product.compareAtPrice, product.price]);

  function selectImage(index: number) {
    setActiveIndex(index);

    if (!swiper) return;
    if (hasMultipleImages) swiper.slideToLoop(index);
    else swiper.slideTo(index);
  }

  return (
    <div className="grid min-w-0 gap-3 xl:grid-cols-[82px_minmax(0,1fr)] xl:gap-4">
      {hasMultipleImages && (
        <div className="order-2 hidden max-h-[620px] flex-col gap-3 overflow-y-auto xl:order-1 xl:flex">
          {product.images.map((image, index) => (
            <button
              key={`${product.id}-thumbnail-${index}`}
              type="button"
              onClick={() => selectImage(index)}
              aria-label={t("productDetails.selectImage", { count: index + 1 })}
              aria-current={activeIndex === index ? "true" : undefined}
              className={`relative aspect-square shrink-0 overflow-hidden rounded-2xl border-2 bg-[#fff4f6] p-1 transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FC5689]/20 ${
                activeIndex === index
                  ? "border-[#FC5689] shadow-[0_8px_24px_rgba(239,66,119,0.16)]"
                  : "border-transparent hover:border-[#FC5689]/35"
              }`}
            >
              <img
                src={image}
                alt=""
                aria-hidden="true"
                className="size-full rounded-xl object-cover"
              />
            </button>
          ))}
        </div>
      )}

      <div className="order-1 min-w-0 xl:order-2">
        <div className="relative overflow-hidden rounded-[24px] border border-[#f5dfe6] bg-[#fff4f6] shadow-[0_18px_50px_rgba(6,42,84,0.08)] sm:rounded-[30px]">
          <Swiper
            modules={[Autoplay]}
            onSwiper={setSwiper}
            onSlideChange={(instance) => setActiveIndex(instance.realIndex)}
            loop={hasMultipleImages}
            speed={550}
            grabCursor={hasMultipleImages}
            watchOverflow
            autoplay={
              hasMultipleImages
                ? {
                    delay: 2000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
                : false
            }
            aria-label={t("productDetails.galleryLabel")}
            className="product-details-gallery"
          >
            {product.images.map((image, index) => (
              <SwiperSlide key={`${product.id}-image-${index}`}>
                <div className="aspect-square w-full sm:aspect-[6/5] xl:aspect-square">
                  <img
                    src={image}
                    alt={`${productName} ${numberFormatter.format(index + 1)}`}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="size-full object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {discountPercentage > 0 && (
            <span className="absolute left-3 top-3 z-20 rounded-full bg-[#FC5689] px-3 py-1.5 text-xs font-black text-white shadow-[0_10px_28px_rgba(239,66,119,0.32)] sm:left-5 sm:top-5 sm:px-4 sm:py-2 sm:text-sm">
              {numberFormatter.format(discountPercentage)}% {t("productDetails.off")}
            </span>
          )}

          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            aria-label={
              wished
                ? t("wishlist.removeFromWishlist")
                : t("wishlist.addToWishlist")
            }
            aria-pressed={wished}
            className={`absolute right-3 top-3 z-20 grid size-11 place-items-center rounded-full border border-white/80 bg-white/95 shadow-[0_10px_30px_rgba(6,42,84,0.15)] backdrop-blur transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FC5689]/20 sm:right-5 sm:top-5 sm:size-12 ${
              wished ? "text-[#FC5689]" : "text-[#062a54] hover:text-[#FC5689]"
            }`}
          >
            <Heart
              aria-hidden="true"
              className={`size-5 sm:size-6 ${wished ? "fill-current" : ""}`}
              strokeWidth={1.9}
            />
          </button>

          {hasMultipleImages && (
            <div className="absolute inset-x-0 bottom-4 z-20 flex justify-center gap-2 xl:hidden">
              {product.images.map((_, index) => (
                <button
                  key={`${product.id}-dot-${index}`}
                  type="button"
                  onClick={() => selectImage(index)}
                  aria-label={t("productDetails.selectImage", { count: index + 1 })}
                  className={`h-1.5 rounded-full transition-all ${
                    activeIndex === index
                      ? "w-7 bg-[#FC5689]"
                      : "w-2 bg-[#062a54]/20"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {hasMultipleImages && (
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 xl:hidden">
            {product.images.map((image, index) => (
              <button
                key={`${product.id}-mobile-thumbnail-${index}`}
                type="button"
                onClick={() => selectImage(index)}
                aria-label={t("productDetails.selectImage", { count: index + 1 })}
                className={`relative size-16 shrink-0 overflow-hidden rounded-xl border-2 bg-[#fff4f6] p-0.5 transition-all sm:size-[72px] ${
                  activeIndex === index
                    ? "border-[#FC5689]"
                    : "border-transparent"
                }`}
              >
                <img
                  src={image}
                  alt=""
                  aria-hidden="true"
                  className="size-full rounded-lg object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
