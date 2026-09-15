"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Headphones,
  HeartHandshake,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";

import { useSiteText } from "@/modules/site-content/context/SiteTextContext";
import type {
  WhyMaanikoFeature,
  WhyMaanikoIconName,
} from "@/modules/why-maaniko/data/whyMaaniko";

type WhyMaanikoDetailsViewProps = {
  feature: WhyMaanikoFeature;
};

const ICONS: Record<WhyMaanikoIconName, LucideIcon> = {
  journey: HeartHandshake,
  shield: ShieldCheck,
  support: Headphones,
  delivery: Truck,
};

export default function WhyMaanikoDetailsView({
  feature,
}: WhyMaanikoDetailsViewProps) {
  const { text } = useSiteText();

  const Icon = ICONS[feature.icon];

  const backText = text("কেন Maaniko আলাদা");

  const benefitsText = text("Maaniko সুবিধা");

  const exploreText = text("Journey অনুযায়ী পণ্য দেখুন");

  const problemSolutionText = text("সমস্যা অনুযায়ী সমাধান দেখুন");

  const ctaTitle = text("আপনার journey-কে আরও সহজ করুন");

  const ctaDescription = text(
    "আপনার বর্তমান প্রয়োজন অনুযায়ী সাজানো পণ্য ও সমাধান খুঁজে নিন Maaniko-তে।",
  );

  return (
    <div className="bg-[#fffdfd]">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[#f6e5eb] bg-[linear-gradient(135deg,#fff9fb_0%,#ffffff_55%,#fff4f7_100%)]">
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-24 size-[320px] rounded-full bg-[#FC5689]/[0.055] blur-3xl"
        />

        <div
          aria-hidden="true"
          className="absolute -bottom-32 -left-20 size-[300px] rounded-full bg-[#03A7FD]/[0.035] blur-3xl"
        />

        <div className="relative mx-auto w-full max-w-7xl px-4 py-7 md:px-6 md:py-10 lg:px-8 lg:py-14">
          {/* Breadcrumb */}
          <div className="mb-7 md:mb-9">
            <Link
              href="/#why-maaniko-different"
              className="
                inline-flex items-center gap-2
                text-[13px] font-bold text-[#6c7480]
                transition-colors hover:text-[#FC5689]
                md:text-sm
              "
            >
              <ArrowLeft className="size-4" strokeWidth={2} />

              {backText}
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:gap-16">
            {/* Hero content */}
            <div>
              <div
                className="
                  inline-flex items-center rounded-full
                  border border-[#f5dbe4]
                  bg-white px-3 py-1.5
                  text-[11px] font-black uppercase
                  tracking-[0.09em] text-[#FC5689]
                  shadow-sm
                  md:text-xs
                "
              >
                {text(feature.eyebrow)}
              </div>

              <h1
                className="
                  mt-5 max-w-3xl
                  text-[26px] font-black leading-[1.3]
                  tracking-tight text-[#062a54]
                  md:text-[38px]
                  lg:text-[46px] lg:leading-[1.2]
                "
              >
                {text(feature.heroTitle)}
              </h1>

              <p
                className="
                  mt-5 max-w-3xl
                  text-[14px] font-medium leading-7
                  text-[#67717f]
                  md:text-[16px] md:leading-8
                  lg:text-[17px]
                "
              >
                {text(feature.heroDescription)}
              </p>
            </div>

            {/* Hero icon */}
            <div className="flex justify-center lg:justify-end">
              <div
                className="
                  relative flex size-[210px] items-center
                  justify-center rounded-[36px]
                  border border-[#f4e1e7]
                  bg-white
                  shadow-[0_18px_55px_rgba(6,42,84,0.08)]
                  md:size-[260px]
                  lg:size-[290px]
                "
              >
                <div
                  className="
                    absolute inset-5 rounded-[28px]
                    bg-[radial-gradient(circle_at_center,#fff4f7_0%,#fffafb_70%)]
                  "
                />

                <div
                  className="
                    relative flex size-[108px]
                    items-center justify-center
                    rounded-full bg-[#fff1f5]
                    md:size-[130px]
                    lg:size-[145px]
                  "
                >
                  <Icon
                    aria-hidden="true"
                    strokeWidth={1.45}
                    className="size-14 text-[#EE7397] md:size-16 lg:size-[74px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main details */}
      <section className="py-10 md:py-14 lg:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            {/* Intro */}
            <div>
              <span className="text-xs font-black uppercase tracking-[0.12em] text-[#FC5689]">
                {benefitsText}
              </span>

              <h2
                className="
                  mt-3 text-[22px] font-black
                  leading-[1.4] text-[#062a54]
                  md:text-[29px]
                  lg:text-[32px]
                "
              >
                {text(feature.overviewTitle)}
              </h2>

              <div className="mt-4 h-[3px] w-12 rounded-full bg-[#FC5689]" />

              <p
                className="
                  mt-5 text-[14px] font-medium
                  leading-7 text-[#687280]
                  md:text-[15px] md:leading-8
                "
              >
                {text(feature.overview)}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h2
                className="
                  text-[20px] font-black text-[#062a54]
                  md:text-[24px]
                "
              >
                {text(feature.highlightTitle)}
              </h2>

              <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                {feature.highlights.map((highlight, index) => (
                  <div
                    key={`${feature.slug}-highlight-${index}`}
                    className="
                      flex items-start gap-3 rounded-[16px]
                      border border-[#edf0f4]
                      bg-white p-4
                      shadow-[0_5px_18px_rgba(6,42,84,0.035)]
                      md:p-5
                    "
                  >
                    <span
                      className="
                        mt-0.5 flex size-7 shrink-0
                        items-center justify-center
                        rounded-full bg-[#fff0f4]
                        text-[#FC5689]
                      "
                    >
                      <Check className="size-4" strokeWidth={2.6} />
                    </span>

                    <p
                      className="
                        text-[13px] font-semibold
                        leading-6 text-[#475366]
                        md:text-sm
                      "
                    >
                      {text(highlight)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-[#f3e7eb] bg-white py-10 md:py-14 lg:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="text-center">
            <h2
              className="
                text-[22px] font-black text-[#062a54]
                md:text-[29px]
                lg:text-[32px]
              "
            >
              {text(feature.processTitle)}
            </h2>

            <div className="mx-auto mt-3 h-[3px] w-12 rounded-full bg-[#FC5689]" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:mt-10 md:grid-cols-3 md:gap-5">
            {feature.steps.map((step, index) => (
              <article
                key={`${feature.slug}-step-${index}`}
                className="
                  relative rounded-[18px]
                  border border-[#edf0f3]
                  bg-[#fffdfd] p-5
                  md:p-6
                  lg:p-7
                "
              >
                <div
                  className="
                    flex size-9 items-center
                    justify-center rounded-full
                    bg-[#FC5689]
                    text-sm font-black text-white
                  "
                >
                  {index + 1}
                </div>

                <h3
                  className="
                    mt-5 text-[17px] font-black
                    leading-6 text-[#13283f]
                    md:text-[18px]
                  "
                >
                  {text(step.title)}
                </h3>

                <p
                  className="
                    mt-2 text-[13px] font-medium
                    leading-6 text-[#707987]
                    md:text-sm
                  "
                >
                  {text(step.description)}
                </p>

                {index < feature.steps.length - 1 && (
                  <ArrowRight
                    aria-hidden="true"
                    className="
                      absolute -right-[18px] top-1/2 z-10
                      hidden size-6 -translate-y-1/2
                      text-[#efb4c5]
                      md:block
                    "
                    strokeWidth={1.7}
                  />
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 md:py-14 lg:py-16">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
          <div
            className="
              relative overflow-hidden rounded-[22px]
              border border-[#f3dfe6]
              bg-[linear-gradient(135deg,#fff6f8_0%,#ffffff_52%,#f7fbff_100%)]
              px-5 py-8
              md:px-8 md:py-10
              lg:flex lg:items-center lg:justify-between lg:px-10
            "
          >
            <div
              aria-hidden="true"
              className="absolute -right-12 -top-20 size-[200px] rounded-full bg-[#FC5689]/[0.06] blur-3xl"
            />

            <div className="relative max-w-2xl">
              <div className="flex size-11 items-center justify-center rounded-full bg-[#fff0f4]">
                <ShoppingBag
                  className="size-5 text-[#FC5689]"
                  strokeWidth={1.8}
                />
              </div>

              <h2
                className="
                  mt-4 text-[20px] font-black
                  text-[#062a54]
                  md:text-[27px]
                "
              >
                {ctaTitle}
              </h2>

              <p
                className="
                  mt-2 text-[13px] font-medium
                  leading-6 text-[#687280]
                  md:text-[15px]
                "
              >
                {ctaDescription}
              </p>
            </div>

            <div className="relative mt-6 flex flex-col gap-3 md:flex-row lg:mt-0 lg:shrink-0">
              <Link
                href="/shop-by-journey"
                className="
                  inline-flex min-h-11 items-center
                  justify-center gap-2 rounded-full
                  bg-[#FC5689] px-5
                  text-[13px] font-black text-white
                  transition-colors hover:bg-[#ea4778]
                  md:px-6 md:text-sm
                "
              >
                {exploreText}

                <ArrowRight className="size-4" strokeWidth={2.2} />
              </Link>

              <Link
                href="/problem-solution"
                className="
                  inline-flex min-h-11 items-center
                  justify-center gap-2 rounded-full
                  border border-[#dce3ec]
                  bg-white px-5
                  text-[13px] font-black text-[#062a54]
                  transition-colors
                  hover:border-[#f2b6c8]
                  hover:text-[#FC5689]
                  md:px-6 md:text-sm
                "
              >
                {problemSolutionText}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
