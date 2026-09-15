"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, ExternalLink, Info } from "lucide-react";

import { useSiteText } from "@/modules/site-content/context/SiteTextContext";
import type { MotherGuideRecord } from "@/modules/mother-guides/data/motherGuides";

type MotherGuideDetailsViewProps = {
  guide: MotherGuideRecord;
};

export default function MotherGuideDetailsView({
  guide,
}: MotherGuideDetailsViewProps) {
  const { locale, text } = useSiteText();

  const copy = {
    back: "সব গাইড",
    quickGuide: "সংক্ষিপ্ত গাইড",
    important: "গুরুত্বপূর্ণ কথা",
    source: "বিশ্বস্ত তথ্যসূত্র",
    disclaimer:
      "এই গাইড সাধারণ তথ্যের জন্য। এটি চিকিৎসকের পরামর্শের বিকল্প নয়।",
  };

  return (
    <main className="bg-[#fffdfd] py-7 md:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-5xl px-4 md:px-6 lg:px-8">
        <Link
          href="/mother-guides"
          className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-[#667181] transition-colors hover:text-[#f15b8a] md:mb-7"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          <span>{copy.back}</span>
        </Link>

        <article className="overflow-hidden rounded-[24px] border border-[#eceff3] bg-white shadow-[0_12px_38px_rgba(6,42,84,0.07)]">
          <div className="relative aspect-[16/8] overflow-hidden bg-[#f8f3f1] md:aspect-[16/7]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={guide.image}
              alt={text(guide.imageAlt)}
              className="h-full w-full object-cover object-center"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#071a32]/45 via-transparent to-transparent" />
          </div>

          <div className="p-5 md:p-8 lg:p-9">
            <span className="inline-flex rounded-full bg-[#fff0f5] px-3 py-1.5 text-xs font-black text-[#f15b8a]">
              {copy.quickGuide}
            </span>

            <h1 className="mt-4 text-[24px] font-black leading-[1.3] tracking-tight text-[#071a32] md:text-4xl">
              {text(guide.title)}
            </h1>

            <p className="mt-3 max-w-3xl text-sm font-medium leading-7 text-[#647080] md:text-base md:leading-8">
              {text(guide.description)}
            </p>

            <div className="mt-6 rounded-2xl border border-[#f6dfe7] bg-[#fff8fa] p-4 md:p-5">
              <p className="text-sm font-semibold leading-7 text-[#354256] md:text-[15px]">
                {text(guide.summary)}
              </p>
            </div>

            <div className="mt-7 grid gap-4 md:grid-cols-2 md:gap-5">
              {guide.content.map((block, blockIndex) => (
                <section
                  key={`${guide.id}-block-${blockIndex}`}
                  className="rounded-2xl border border-[#e9edf2] bg-white p-5"
                >
                  <h2 className="text-lg font-black text-[#10253e]">
                    {text(block.title)}
                  </h2>

                  <ul className="mt-4 space-y-3">
                    {block.points.map((point, pointIndex) => (
                      <li
                        key={`${guide.id}-${blockIndex}-${pointIndex}`}
                        className="flex items-start gap-3"
                      >
                        <CheckCircle2
                          aria-hidden="true"
                          className="mt-0.5 size-[18px] shrink-0 text-[#26a8e0]"
                          strokeWidth={2.2}
                        />

                        <span className="text-[13px] font-medium leading-6 text-[#566274] md:text-sm">
                          {text(point)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>

            <div className="mt-5 flex items-start gap-3 rounded-2xl border border-[#fee4b6] bg-[#fffaf0] p-4 md:p-5">
              <Info
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-[#e99a23]"
              />

              <div>
                <h2 className="text-sm font-black text-[#7a4b09]">
                  {copy.important}
                </h2>

                <p className="mt-1 text-[13px] font-medium leading-6 text-[#785d32] md:text-sm">
                  {text(guide.importantNote)}
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-[#edf0f3] pt-5 md:flex-row md:items-center md:justify-between">
              <p className="max-w-xl text-xs font-medium leading-5 text-[#78818e]">
                {copy.disclaimer}
              </p>

              <a
                href={guide.source.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-fit items-center gap-2 text-sm font-extrabold text-[#f15b8a] transition-colors hover:text-[#d94678]"
              >
                <span>{copy.source}</span>
                <ExternalLink aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}
