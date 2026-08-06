"use client";

import { useEffect, useMemo, useState } from "react";
import Image, { type ImageLoaderProps } from "next/image";
import Link from "next/link";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { useLanguage } from "@/context/LanguageContext";
import type { Banner, BannerApiResponse } from "@/types/banner";

import styles from "./HeroSlider.module.css";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "");

const FALLBACK_BANNERS: Banner[] = [
  {
    id: "maaniko-default-hero-1",
    imageUrl:
      "https://i.ibb.co.com/RGtHRw4b/maaniko-responsive-hero-banner-borderless-2048x768.png",
    productLink: "/shop",
    isPublished: true,
  },
  {
    id: "maaniko-default-hero-2",
    imageUrl:
      "https://i.ibb.co.com/RGtHRw4b/maaniko-responsive-hero-banner-borderless-2048x768.png",
    productLink: "/shop",
    isPublished: true,
  },
];

function passThroughImageLoader({ src }: ImageLoaderProps) {
  return src;
}

function getBannerHref(productLink?: string | null) {
  const trimmedLink = productLink?.trim();

  if (!trimmedLink) {
    return "";
  }

  if (/^https?:\/\//i.test(trimmedLink) || trimmedLink.startsWith("/")) {
    return trimmedLink;
  }

  return `/products/${trimmedLink}`;
}

function isExternalUrl(url: string) {
  return /^https?:\/\//i.test(url);
}

function getBannerKey(banner: Banner, index: number) {
  return `${banner.id || "banner"}-${index}`;
}

function HeroBannerSkeleton() {
  return (
    <section aria-hidden="true" className="w-full bg-white pt-3 sm:pt-4 md:pt-6">
      <div className="relative aspect-[8/3] w-full overflow-hidden bg-[#fff4f6]">
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-[#fff4f6] via-white to-[#fff4f6]" />

        <div
          className={`${styles.shimmer} absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/70 to-transparent`}
        />
      </div>
    </section>
  );
}

export default function HeroSlider() {
  const { t } = useLanguage();

  const [banners, setBanners] = useState<Banner[]>(FALLBACK_BANNERS);
  const [isLoading, setIsLoading] = useState(Boolean(API_BASE_URL));

  useEffect(() => {
    if (!API_BASE_URL) {
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const timeoutId = window.setTimeout(() => {
      controller.abort();
    }, 8000);

    let isMounted = true;

    async function loadBanners() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/v1/banners/published`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
            },
            signal: controller.signal,
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error(`Banner request failed with ${response.status}`);
        }

        const data = (await response.json()) as BannerApiResponse;

        const publishedBanners = Array.isArray(data.banners)
          ? data.banners.filter(
              (banner) =>
                banner.isPublished !== false &&
                typeof banner.imageUrl === "string" &&
                banner.imageUrl.trim().length > 0,
            )
          : [];

        if (isMounted && data.success && publishedBanners.length > 0) {
          setBanners(publishedBanners);
        }
      } catch (error) {
        if (
          process.env.NODE_ENV === "development" &&
          error instanceof Error &&
          error.name !== "AbortError"
        ) {
          console.warn(
            "Banner API unavailable. Showing fallback banner.",
            error.message,
          );
        }
      } finally {
        window.clearTimeout(timeoutId);

        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadBanners();

    return () => {
      isMounted = false;
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, []);

  const validBanners = useMemo(() => {
    const filteredBanners = banners.filter(
      (banner) =>
        typeof banner.imageUrl === "string" &&
        banner.imageUrl.trim().length > 0,
    );

    return filteredBanners.length > 0 ? filteredBanners : FALLBACK_BANNERS;
  }, [banners]);

  if (isLoading) {
    return <HeroBannerSkeleton />;
  }

  const hasMultipleBanners = validBanners.length > 1;

  return (
    <section
      aria-label={t("hero.sectionLabel")}
      className="w-full bg-white"
    >
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        spaceBetween={0}
        loop={hasMultipleBanners}
        grabCursor={hasMultipleBanners}
        observer
        observeParents
        resizeObserver
        speed={900}
        autoplay={
          hasMultipleBanners
            ? {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        pagination={
          hasMultipleBanners
            ? {
                clickable: true,
              }
            : false
        }
        className={`${styles.slider} w-full overflow-hidden bg-[#fff4f6]`}
      >
        {validBanners.map((banner, index) => {
          const href = getBannerHref(banner.productLink);

          const image = (
            <div className="relative aspect-[8/3] w-full overflow-hidden bg-[#fff4f6]">
              <Image
                loader={passThroughImageLoader}
                src={banner.imageUrl}
                alt={`${t("hero.bannerAlt")} ${index + 1}`}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          );

          return (
            <SwiperSlide key={getBannerKey(banner, index)}>
              {href ? (
                isExternalUrl(href) ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t("hero.openBanner")} ${index + 1}`}
                    className="block w-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#ef4277]/35"
                  >
                    {image}
                  </a>
                ) : (
                  <Link
                    href={href}
                    aria-label={`${t("hero.openBanner")} ${index + 1}`}
                    className="block w-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-[#ef4277]/35"
                  >
                    {image}
                  </Link>
                )
              ) : (
                image
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}