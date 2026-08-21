"use client";

import { Star, UserRound } from "lucide-react";
import { A11y, Autoplay, Keyboard, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useLanguage } from "@/context/LanguageContext";

import "swiper/css";
import "swiper/css/pagination";

type CustomerReview = {
  id: number;
  name: string;
  review: string;
  language: "bn" | "en";
};

const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 1,
    name: "Nusrat Jahan",
    language: "bn",
    review:
      "প্রথমবার মা হওয়ার পর কোন পণ্যটি নিরাপদ হবে তা নিয়ে খুব চিন্তায় ছিলাম। মানিকোর বাছাই করা পণ্য ও পরিষ্কার ব্যবহারবিধি আমাকে অনেক নিশ্চিন্ত করেছে।",
  },
  {
    id: 2,
    name: "Farzana Ahmed",
    language: "bn",
    review:
      "অর্ডার করার পর খুব দ্রুত পণ্য হাতে পেয়েছি। প্যাকেজিং সুন্দর ছিল এবং শিশুর জন্য প্রতিটি জিনিস খুব যত্ন নিয়ে বাছাই করা মনে হয়েছে।",
  },
  {
    id: 3,
    name: "Sarah Khan",
    language: "en",
    review:
      "Everything arrived neatly packed and exactly as described. It is comforting to find carefully selected products for both mothers and babies in one place.",
  },
  {
    id: 4,
    name: "Rafia Islam",
    language: "en",
    review:
      "The product quality was excellent and delivery was faster than expected. Their customer support also answered all my questions with great care.",
  },
  {
    id: 5,
    name: "Tasnim Rahman",
    language: "en",
    review:
      "As a new mother, I really appreciate the clear product information and thoughtful selection. Shopping for my baby now feels much easier and safer.",
  },
  {
    id: 6,
    name: "Samira Hossain",
    language: "bn",
    review:
      "মায়ের প্রয়োজন বুঝে এক জায়গায় এত দরকারি পণ্য পাওয়া সত্যিই স্বস্তির। কোনো প্রশ্ন করলে সহায়তা দলও খুব সুন্দরভাবে বুঝিয়ে দেয়।",
  },
  {
    id: 7,
    name: "Tania Akter",
    language: "bn",
    review:
      "পণ্যের মান নিয়ে আমি খুব সন্তুষ্ট। ব্যবহারবিধি সহজ হওয়ায় নতুন মা হিসেবেও কোনো ঝামেলা হয়নি এবং আবারও এখান থেকেই কিনব।",
  },
  {
    id: 8,
    name: "Jannatul Ferdous",
    language: "en",
    review:
      "Prothom bar order korei khub bhalo experience hoyeche. Product quality, packaging ar delivery shob kichui amar expectation er cheye bhalo chilo.",
  },
  {
    id: 9,
    name: "Mahira Chowdhury",
    language: "en",
    review:
      "Baby er jonno product choose kora niye onek confused chilam. Maaniko theke details dekhe easily choose korte perechi ar quality o khub bhalo.",
  },
  {
    id: 10,
    name: "Priyanka Saha",
    language: "en",
    review:
      "Customer support khub helpful chilo. Amar shob question patiently answer koreche ar order tao time moto safely peyechi.",
  },
];

export default function CustomerReviewsSection() {
  const { localize } = useLanguage();

  // Only the section title uses the website language toggle.
  // Review texts and customer names remain exactly as written above.
  const sectionTitle = localize({
    bn: "মায়েদের বাস্তব অভিজ্ঞতা",
    en: "Real Experiences from Mothers",
  });

  return (
    <section
      aria-labelledby="customer-reviews-title"
      className="bg-white py-6 md:py-7 lg:py-8"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mb-5 md:mb-6 lg:mb-7">
          <h2
            id="customer-reviews-title"
            className="text-xl font-black leading-tight tracking-tight text-[#062a54] md:text-2xl lg:text-[30px]"
          >
            {sectionTitle}
          </h2>

          <div className="mt-2 h-1 w-14 rounded-full bg-[#FC5689] md:w-16 lg:w-20" />
        </div>

        <div
          role="region"
          aria-label={sectionTitle}
          className="overflow-hidden"
        >
          <Swiper
            modules={[A11y, Autoplay, Keyboard, Pagination]}
            slidesPerView={1}
            slidesPerGroup={1}
            spaceBetween={14}
            speed={750}
            loop
            grabCursor
            watchOverflow
            threshold={5}
            observer
            observeParents
            resizeObserver
            keyboard={{
              enabled: true,
            }}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 18,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 22,
              },
            }}
            className="
              customer-reviews-swiper
              w-full
              [&_.swiper-wrapper]:items-stretch
              [&_.swiper-slide]:!h-auto

              [&_.swiper-pagination]:!relative
              [&_.swiper-pagination]:!bottom-auto
              [&_.swiper-pagination]:!mt-6
              md:[&_.swiper-pagination]:!mt-7
              lg:[&_.swiper-pagination]:!mt-8

              [&_.swiper-pagination-bullet]:!mx-1
              [&_.swiper-pagination-bullet]:!h-2
              [&_.swiper-pagination-bullet]:!w-2
              [&_.swiper-pagination-bullet]:!rounded-full
              [&_.swiper-pagination-bullet]:!bg-[#cbd5e1]
              [&_.swiper-pagination-bullet]:!opacity-100
              [&_.swiper-pagination-bullet]:!transition-all
              [&_.swiper-pagination-bullet]:!duration-300

              [&_.swiper-pagination-bullet-active]:!w-6
              [&_.swiper-pagination-bullet-active]:!bg-[#FC5689]
            "
          >
            {CUSTOMER_REVIEWS.map((review) => (
              <SwiperSlide key={review.id}>
                <article className="flex h-full min-h-[245px] flex-col rounded-2xl border border-[#e5e7eb] bg-white p-5 shadow-[0_8px_28px_rgba(6,42,84,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#FC5689]/40 hover:shadow-[0_14px_35px_rgba(6,42,84,0.10)] md:min-h-[270px] md:p-6 lg:min-h-[280px] lg:rounded-[20px]">
                  <header className="flex items-center gap-3 md:gap-4">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#f1f2f4] text-[#a7adb5] md:size-14">
                      <UserRound
                        aria-hidden="true"
                        strokeWidth={1.8}
                        className="size-7 md:size-8"
                      />
                    </div>

                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-extrabold text-[#252a35] md:text-base">
                        {review.name}
                      </h3>

                      <div
                        aria-label="5 out of 5 stars"
                        className="mt-1 flex items-center gap-0.5 text-[#ffab19]"
                      >
                        {Array.from({ length: 5 }, (_, index) => (
                          <Star
                            key={`${review.id}-star-${index}`}
                            aria-hidden="true"
                            className="size-4 fill-current md:size-[18px]"
                            strokeWidth={1.8}
                          />
                        ))}
                      </div>
                    </div>
                  </header>

                  <div className="my-5 h-px bg-[#eef0f3] md:my-6" />

                  <p
                    lang={review.language}
                    className="text-sm font-medium leading-7 text-[#3f4650] md:text-[15px] md:leading-7 lg:text-base lg:leading-8"
                  >
                    {review.review}
                  </p>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}