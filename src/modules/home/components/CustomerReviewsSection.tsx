"use client";

import type { ReactNode } from "react";

import {
  ChevronLeft,
  ChevronRight,
  Headphones,
  Heart,
  Quote,
  ShoppingBag,
  Star,
  UserRound,
} from "lucide-react";

import {
  A11y,
  Autoplay,
  Keyboard,
  Navigation,
  Pagination,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import { useSiteText } from "@/modules/site-content/context/SiteTextContext";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type ReviewAccent = "pink" | "blue";

type CustomerReview = {
  id: number;
  name: string;
  review: string;
  product: string;
  accent: ReviewAccent;
};

const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 1,
    name: "Samira Hossain",
    review:
      "মায়ের প্রয়োজন বুঝে এক জায়গায় এত দরকারি পণ্য পাওয়া সত্যিই স্বস্তির। কোনো প্রশ্ন করলে সহায়তা দলও খুব সুন্দরভাবে বুঝিয়ে দেয়।",
    product: "Newborn Essentials Box",
    accent: "pink",
  },
  {
    id: 2,
    name: "Tania Akter",
    review:
      "পণ্যের মান নিয়ে আমি খুব সন্তুষ্ট। ব্যবহারবিধি সহজ হওয়ায় নতুন মা হিসেবেও কোনো ঝামেলা হয়নি এবং আবারও এখান থেকেই কিনব।",
    product: "Maternity Support Belt",
    accent: "blue",
  },
  {
    id: 3,
    name: "Jannatul Ferdous",
    review:
      "প্রথমবার অর্ডার করেই খুব ভালো অভিজ্ঞতা হয়েছে। পণ্যের মান, প্যাকেজিং ও ডেলিভারি—সবকিছুই আমার প্রত্যাশার চেয়ে ভালো ছিল।",
    product: "Baby Care Kit",
    accent: "pink",
  },
  {
    id: 4,
    name: "Nusrat Jahan",
    review:
      "প্রথমবার মা হওয়ার পর কোন পণ্যটি নিরাপদ হবে তা নিয়ে খুব চিন্তায় ছিলাম। মানিকোর বাছাই করা পণ্য ও পরিষ্কার ব্যবহারবিধি আমাকে অনেক নিশ্চিন্ত করেছে।",
    product: "Pregnancy Care Box",
    accent: "blue",
  },
  {
    id: 5,
    name: "Farzana Ahmed",
    review:
      "অর্ডার করার পর খুব দ্রুত পণ্য হাতে পেয়েছি। প্যাকেজিং সুন্দর ছিল এবং শিশুর জন্য প্রতিটি জিনিস খুব যত্ন নিয়ে বাছাই করা মনে হয়েছে।",
    product: "Mom & Baby Combo",
    accent: "pink",
  },
  {
    id: 6,
    name: "Sarah Khan",
    review:
      "সবকিছু সুন্দরভাবে প্যাক করা ছিল এবং বর্ণনার সঙ্গে পুরোপুরি মিলেছে। মা ও শিশুর জন্য যত্নে বাছাই করা পণ্য এক জায়গায় পাওয়া সত্যিই স্বস্তির।",
    product: "New Mom Care Box",
    accent: "blue",
  },
  {
    id: 7,
    name: "Rafia Islam",
    review:
      "পণ্যের মান চমৎকার এবং ডেলিভারি প্রত্যাশার চেয়েও দ্রুত ছিল। সহায়তা দলও আমার সব প্রশ্নের উত্তর খুব যত্ন নিয়ে দিয়েছে।",
    product: "Postpartum Care Kit",
    accent: "pink",
  },
  {
    id: 8,
    name: "Tasnim Rahman",
    review:
      "নতুন মা হিসেবে পরিষ্কার পণ্যের তথ্য ও যত্নে বাছাই করা সংগ্রহটি আমার খুব ভালো লেগেছে। শিশুর জন্য কেনাকাটা এখন অনেক সহজ ও নিরাপদ মনে হয়।",
    product: "Mother Care Essentials",
    accent: "blue",
  },
  {
    id: 9,
    name: "Mahira Chowdhury",
    review:
      "শিশুর জন্য পণ্য বাছাই নিয়ে অনেক দ্বিধায় ছিলাম। মানিকোর বিস্তারিত তথ্য দেখে সহজেই বেছে নিতে পেরেছি, আর মানও খুব ভালো।",
    product: "Baby Daily Essentials",
    accent: "pink",
  },
  {
    id: 10,
    name: "Priyanka Saha",
    review:
      "ক্রেতা সহায়তা দল খুব সহযোগিতাপূর্ণ ছিল। আমার সব প্রশ্নের ধৈর্য ধরে উত্তর দিয়েছে এবং অর্ডারটিও সময়মতো নিরাপদে পেয়েছি।",
    product: "Complete Baby Care Box",
    accent: "blue",
  },
];

const ACCENT_STYLES = {
  pink: {
    avatar: "bg-[#fcecf2] text-[#dc6a91] ring-[#f8dce6]",
    quote: "text-[#e85786]",
    divider: "bg-[#f7dde6]",
    heart: "fill-[#f18aaa] text-[#f18aaa]",
    product: "bg-[#fff0f5] text-[#df5684] ring-[#f9dbe5]",
    productIcon:
      "bg-white text-[#e45d8a] shadow-[0_3px_10px_rgba(232,87,134,0.12)]",
    card: "border-[#f4e5ea] shadow-[0_10px_28px_rgba(211,92,132,0.07)] hover:shadow-[0_14px_34px_rgba(211,92,132,0.11)]",
  },

  blue: {
    avatar: "bg-[#edf4ff] text-[#6194ee] ring-[#dbe9ff]",
    quote: "text-[#6697ef]",
    divider: "bg-[#dce9fb]",
    heart: "fill-[#8ab7f4] text-[#8ab7f4]",
    product: "bg-[#eef5ff] text-[#6598ef] ring-[#dbe9ff]",
    productIcon:
      "bg-white text-[#6698ec] shadow-[0_3px_10px_rgba(102,152,236,0.12)]",
    card: "border-[#e0eafa] shadow-[0_10px_28px_rgba(88,137,218,0.07)] hover:shadow-[0_14px_34px_rgba(88,137,218,0.11)]",
  },
};

function CustomerAvatar({
  accent,
  name,
}: {
  accent: ReviewAccent;
  name: string;
}) {
  const styles = ACCENT_STYLES[accent];

  return (
    <div
      aria-label={`${name}-এর ছবি`}
      className={`
        relative flex size-[68px] shrink-0 items-center justify-center
        overflow-hidden rounded-full ring-[4px]
        md:size-[72px]
        lg:size-[76px]
        ${styles.avatar}
      `}
    >
      <div className="absolute inset-x-0 bottom-0 h-[38%] bg-black/[0.025]" />

      <UserRound
        aria-hidden="true"
        strokeWidth={1.4}
        className="relative z-10 size-9 md:size-10 lg:size-11"
      />
    </div>
  );
}

type StatItemProps = {
  icon: ReactNode;
  value: string;
  label: string;
  accent: ReviewAccent;
};

function StatItem({ icon, value, label, accent }: StatItemProps) {
  const isPink = accent === "pink";

  return (
    <div
      className="
        flex min-h-[78px] items-center justify-center gap-3
        px-3 py-3.5
        md:min-h-[86px] md:gap-3.5 md:px-4
        lg:min-h-[92px] lg:justify-start lg:px-5
      "
    >
      <div
        className={`
          flex size-10 shrink-0 items-center justify-center rounded-full
          md:size-11
          ${
            isPink
              ? "bg-[#fff0f5] text-[#e85c89]"
              : "bg-[#eef5ff] text-[#6496ed]"
          }
        `}
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p
          className={`
            whitespace-nowrap text-[18px] font-black leading-none
            md:text-xl
            lg:text-[22px]
            ${isPink ? "text-[#e85c89]" : "text-[#6496ed]"}
          `}
        >
          {value}
        </p>

        <p
          className="
            mt-1.5 text-[10px] font-medium leading-4 text-[#4c5361]
            md:text-xs
            lg:text-[13px]
          "
        >
          {label}
        </p>
      </div>
    </div>
  );
}

export default function CustomerReviewsSection() {
  const { text } = useSiteText();

  const texts = {
    badge: text("ভালোবাসা ও আস্থায়"),

    titlePink: text("মায়েদের"),

    titleRest: text("বাস্তব অভিজ্ঞতা"),

    subtitle: text(
      "হাজারো মায়ের আস্থা আর ভালোবাসায় Maaniko পরিবার প্রতিদিন বড় হয়ে উঠছে।",
    ),

    product: text("পণ্য:"),

    happyMoms: text("খুশি মা আমাদের সাথে"),

    successfulOrders: text("সফল অর্ডার সম্পন্ন"),

    averageRating: text("গড় রেটিং"),

    support: text("সহায়তা ও সার্ভিস"),

    previous: text("আগের রিভিউ"),

    next: text("পরের রিভিউ"),
  };

  return (
    <section
      aria-labelledby="customer-reviews-title"
      className="
        relative overflow-hidden
        bg-[linear-gradient(180deg,#fffdfd_0%,#fffafa_48%,#ffffff_100%)]
        py-8
        md:py-9
        lg:py-10
      "
    >
      {/* background decoration */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -left-20 top-[170px]
          size-[210px] rounded-full bg-[#fff0f5] blur-3xl
          md:size-[250px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute -right-24 top-[130px]
          size-[220px] rounded-full bg-[#f2f7ff] blur-3xl
          md:size-[270px]
        "
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-8">
        {/* =========================
            HEADING
        ========================== */}
        <div className="mx-auto mb-7 max-w-3xl text-center md:mb-8 lg:mb-9">
          <div
            className="
              mx-auto inline-flex items-center gap-1.5
              rounded-full bg-[#fff0f5]
              px-3 py-1.5
              text-xs font-bold text-[#dc5d86]
              md:px-8 md:text-sm
            "
          >
            <Heart
              aria-hidden="true"
              className="size-3.5 fill-current md:size-4"
            />

            <span>{texts.badge}</span>
          </div>

          <h2
            id="customer-reviews-title"
            className="
              mt-3 text-[23px] font-black leading-[1.25]
              tracking-tight text-[#092b56]
              md:text-[34px] md:leading-[1.2]
              lg:text-[40px]
            "
          >
            <span className="text-[#e45885]">{texts.titlePink}</span>{" "}
            {texts.titleRest}
          </h2>

          <p
            className="
              mx-auto mt-3 max-w-2xl
              text-sm font-medium leading-6 text-[#697080]
              md:text-[15px] md:leading-7
              lg:text-base
            "
          >
            {texts.subtitle}
          </p>
        </div>

        {/* =========================
            SLIDER
            No second max-w container.
            No second horizontal padding.
        ========================== */}
        <div className="relative w-full">
          {/* Previous Button */}
          <button
            type="button"
            aria-label={texts.previous}
            className="
              customer-review-prev

              absolute left-2 top-1/2 z-30
              flex size-9 -translate-y-1/2
              items-center justify-center
              rounded-full bg-[#e8618c]
              text-white
              shadow-[0_5px_16px_rgba(232,97,140,0.28)]
              transition-all duration-300

              hover:bg-[#dc517f]
              active:scale-95

              md:left-2.5 md:size-10

              lg:left-3 lg:size-11
            "
          >
            <ChevronLeft
              aria-hidden="true"
              className="size-[18px] md:size-5"
              strokeWidth={2.3}
            />
          </button>

          {/* Next Button */}
          <button
            type="button"
            aria-label={texts.next}
            className="
              customer-review-next

              absolute right-2 top-1/2 z-30
              flex size-9 -translate-y-1/2
              items-center justify-center
              rounded-full bg-[#e8618c]
              text-white
              shadow-[0_5px_16px_rgba(232,97,140,0.28)]
              transition-all duration-300

              hover:bg-[#dc517f]
              active:scale-95

              md:right-2.5 md:size-10

              lg:right-3 lg:size-11
            "
          >
            <ChevronRight
              aria-hidden="true"
              className="size-[18px] md:size-5"
              strokeWidth={2.3}
            />
          </button>

          <Swiper
            modules={[A11y, Autoplay, Keyboard, Navigation, Pagination]}
            slidesPerView={1}
            slidesPerGroup={1}
            spaceBetween={14}
            speed={700}
            loop
            grabCursor
            watchOverflow
            threshold={5}
            keyboard={{
              enabled: true,
            }}
            navigation={{
              prevEl: ".customer-review-prev",
              nextEl: ".customer-review-next",
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
              !overflow-hidden

              [&_.swiper-wrapper]:items-stretch
              [&_.swiper-slide]:!h-auto

              [&_.swiper-pagination]:!relative
              [&_.swiper-pagination]:!bottom-auto
              [&_.swiper-pagination]:!mt-6

              md:[&_.swiper-pagination]:!mt-7

              [&_.swiper-pagination-bullet]:!mx-1
              [&_.swiper-pagination-bullet]:!h-2
              [&_.swiper-pagination-bullet]:!w-2
              [&_.swiper-pagination-bullet]:!rounded-full
              [&_.swiper-pagination-bullet]:!bg-[#d8dde5]
              [&_.swiper-pagination-bullet]:!opacity-100
              [&_.swiper-pagination-bullet]:!transition-all
              [&_.swiper-pagination-bullet]:!duration-300

              [&_.swiper-pagination-bullet-active]:!w-6
              [&_.swiper-pagination-bullet-active]:!bg-[#e8618c]
            "
          >
            {CUSTOMER_REVIEWS.map((review) => {
              const styles = ACCENT_STYLES[review.accent];

              return (
                <SwiperSlide key={review.id}>
                  <article
                    className={`
                      relative flex h-full min-h-[330px] flex-col
                      overflow-hidden rounded-[22px]
                      border bg-white

                      px-5 pb-5 pt-5

                      transition-all duration-300
                      hover:-translate-y-0.5

                      md:min-h-[350px]
                      md:rounded-[24px]
                      md:px-5
                      md:pb-5
                      md:pt-6

                      lg:min-h-[365px]
                      lg:px-6
                      lg:pb-6
                      lg:pt-6

                      ${styles.card}
                    `}
                  >
                    {/* Quote */}
                    <Quote
                      aria-hidden="true"
                      className={`
                        absolute right-5 top-5
                        size-7 fill-current
                        md:size-8
                        ${styles.quote}
                      `}
                    />

                    {/* Avatar */}
                    <div className="flex justify-center">
                      <CustomerAvatar
                        accent={review.accent}
                        name={review.name}
                      />
                    </div>

                    {/* Customer Name */}
                    <h3
                      className="
                        mt-3 text-center
                        text-[15px] font-black
                        text-[#171c27]
                        md:text-base
                        lg:text-[17px]
                      "
                    >
                      {review.name}
                    </h3>

                    {/* Stars */}
                    <div
                      aria-label="৫-এর মধ্যে ৫ তারকা"
                      className="
                        mt-1.5 flex items-center
                        justify-center gap-0.5
                        text-[#f7bd19]
                      "
                    >
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star
                          key={`${review.id}-star-${index}`}
                          aria-hidden="true"
                          strokeWidth={1.5}
                          className="
                              size-[16px] fill-current
                              md:size-[17px]
                            "
                        />
                      ))}
                    </div>

                    {/* Divider */}
                    <div className="my-4 flex items-center">
                      <div className={`h-px flex-1 ${styles.divider}`} />

                      <Heart
                        aria-hidden="true"
                        className={`
                          mx-3 size-3
                          ${styles.heart}
                        `}
                      />

                      <div className={`h-px flex-1 ${styles.divider}`} />
                    </div>

                    {/* Review */}
                    <p
                      className="
                        flex-1 text-center
                        text-[13px]
                        font-medium
                        leading-[1.8]
                        text-[#515865]

                        md:text-sm
                        md:leading-[1.85]

                        lg:text-[15px]
                        lg:leading-[1.9]
                      "
                    >
                      {review.review}
                    </p>

                    {/* Product Pill */}
                    <div className="mt-4 flex justify-center">
                      <div
                        className={`
                          inline-flex max-w-full
                          items-center gap-2
                          rounded-full
                          px-2.5 py-1.5

                          text-[10px] font-bold
                          ring-1 ring-inset

                          md:px-3
                          md:py-2
                          md:text-xs

                          ${styles.product}
                        `}
                      >
                        <span
                          className={`
                            flex size-6 shrink-0
                            items-center justify-center
                            rounded-full

                            md:size-7

                            ${styles.productIcon}
                          `}
                        >
                          <ShoppingBag
                            aria-hidden="true"
                            className="size-3 md:size-3.5"
                            strokeWidth={2}
                          />
                        </span>

                        <span className="truncate">
                          <span className="font-extrabold">
                            {texts.product}
                          </span>{" "}
                          {review.product}
                        </span>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        {/* =========================
            STATISTICS
        ========================== */}
        <div
          className="
            mt-7 overflow-hidden
            rounded-[20px]
            border border-[#f2e8eb]
            bg-white
            shadow-[0_8px_28px_rgba(73,45,57,0.06)]

            md:mt-8
            md:rounded-[22px]

            lg:mt-9
          "
        >
          <div
            className="
              grid grid-cols-2
              divide-x divide-y divide-[#f0e8eb]

              md:grid-cols-4
              md:divide-y-0

              lg:grid-cols-5
            "
          >
            <StatItem
              value="10,000+"
              label={texts.happyMoms}
              accent="pink"
              icon={
                <Heart aria-hidden="true" className="size-5 fill-current" />
              }
            />

            <StatItem
              value="50,000+"
              label={texts.successfulOrders}
              accent="blue"
              icon={<ShoppingBag aria-hidden="true" className="size-5" />}
            />

            <StatItem
              value="4.9/5"
              label={texts.averageRating}
              accent="pink"
              icon={<Star aria-hidden="true" className="size-5 fill-current" />}
            />

            <StatItem
              value="24/7"
              label={texts.support}
              accent="blue"
              icon={<Headphones aria-hidden="true" className="size-5" />}
            />

            {/* Desktop decorative column */}
            <div
              aria-hidden="true"
              className="
                relative hidden min-h-[92px]
                items-center justify-center
                overflow-hidden
                lg:flex
              "
            >
              <Heart
                className="
                  absolute left-5 top-5 size-3.5
                  fill-[#f0a0b9] text-[#f0a0b9]
                "
              />

              <Heart
                className="
                  absolute right-6 top-4 size-3
                  fill-[#f4bed0] text-[#f4bed0]
                "
              />

              <Heart
                className="
                  absolute bottom-4 right-5 size-3.5
                  fill-[#f1a6bd] text-[#f1a6bd]
                "
              />

              <div
                className="
                  flex size-[60px] items-center
                  justify-center rounded-full
                  border-2 border-[#f3b7ca]
                  bg-[#fff8fa]
                  text-[#e386a6]
                "
              >
                <UserRound className="size-8" strokeWidth={1.35} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
