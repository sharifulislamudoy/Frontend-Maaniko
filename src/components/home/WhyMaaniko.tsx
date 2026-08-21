"use client";

import type { LucideIcon } from "lucide-react";
import {
    BookOpen,
    Headphones,
    Search,
    ShieldCheck,
} from "lucide-react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useLanguage } from "@/context/LanguageContext";
import type { LocalizedValue } from "@/types/localization";

import "swiper/css";

type MaanikoFeature = {
    id: string;
    label: LocalizedValue;
    icon: LucideIcon;
};

const MAANIKO_FEATURES: MaanikoFeature[] = [
    {
        id: "need-based-selection",
        label: {
            bn: "প্রয়োজন বুঝে বাছাই",
            en: "Selected for Your Needs",
        },
        icon: Search,
    },
    {
        id: "quality-checked",
        label: {
            bn: "প্রতিটি পণ্য কোয়ালিটি চেক",
            en: "Every Product Quality Checked",
        },
        icon: ShieldCheck,
    },
    {
        id: "bangla-instructions",
        label: {
            bn: "বাংলায় ব্যবহারবিধি",
            en: "Usage Guide in Bangla",
        },
        icon: BookOpen,
    },
    {
        id: "after-sales-support",
        label: {
            bn: "বিক্রির পরও সহায়তা",
            en: "After-Sales Support",
        },
        icon: Headphones,
    },
];

export default function WhyMaanikoSection() {
    const { localize } = useLanguage();

    const sectionTitle = localize({
        bn: "কেন Maaniko বেছে নেবেন?",
        en: "Why Choose Maaniko?",
    });

    return (
        <section
            aria-labelledby="why-maaniko-title"
            className="bg-white py-6 md:py-7 lg:py-8"
        >
            <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
                <div>
                    <h2
                        id="why-maaniko-title"
                        className="text-left text-xl font-black leading-tight tracking-tight text-[#062a54] md:text-2xl lg:text-[30px]"
                    >
                        {sectionTitle}
                    </h2>

                    <div className="mt-2 h-1 w-14 rounded-full bg-[#FC5689] md:w-16 lg:w-20" />
                </div>

                <div className="mt-5 overflow-hidden md:mt-6 lg:mt-7">
                    <Swiper
                        modules={[Autoplay]}
                        aria-label={sectionTitle}
                        slidesPerView={2}
                        slidesPerGroup={1}
                        spaceBetween={0}
                        speed={700}
                        rewind
                        grabCursor
                        watchOverflow
                        threshold={5}
                        observer
                        observeParents
                        resizeObserver
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        breakpoints={{
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 0,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 0,
                            },
                        }}
                        className="why-maaniko-swiper w-full [&_.swiper-slide]:!h-auto [&_.swiper-wrapper]:items-stretch"
                    >
                        {MAANIKO_FEATURES.map((feature, index) => {
                            const Icon = feature.icon;

                            return (
                                <SwiperSlide key={feature.id}>
                                    <article
                                        className={`flex h-full min-h-[118px] min-w-0 flex-col items-center justify-center px-3 py-5 text-center md:min-h-[125px] md:px-5 md:py-5 lg:min-h-[132px] lg:px-8 ${index > 0
                                            ? "border-l border-[#dce3ec]"
                                            : ""
                                            }`}
                                    >
                                        <Icon
                                            aria-hidden="true"
                                            strokeWidth={1.8}
                                            className="size-9 shrink-0 text-[#062a54] md:size-10 lg:size-11"
                                        />

                                        <p className="mt-3 max-w-[160px] text-sm font-semibold leading-5 text-[#303030] md:max-w-[185px] md:text-[15px] md:leading-6 lg:max-w-[210px] lg:text-base">
                                            {localize(feature.label)}
                                        </p>
                                    </article>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
            </div>
        </section>
    );
}