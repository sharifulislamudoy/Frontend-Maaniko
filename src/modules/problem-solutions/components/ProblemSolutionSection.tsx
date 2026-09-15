"use client";

import {
  Headphones,
  Heart,
  Leaf,
  PackageCheck,
  RotateCcw,
  ShieldCheck,
  Star,
  UsersRound,
} from "lucide-react";

import ProblemSolutionCard from "@/modules/problem-solutions/components/ProblemSolutionCard";
import { useSiteText } from "@/modules/site-content/context/SiteTextContext";
import { problemSolutions } from "@/modules/problem-solutions/data/problemSolutions";
import type { MaanikoProduct } from "@/modules/products/types/product";

export default function ProblemSolutionSection({
  products,
}: {
  products: MaanikoProduct[];
}) {
  const { locale } = useSiteText();

  const trustItems = [
    { icon: ShieldCheck, text: "বিশ্বস্ত ও নিরাপদ" },
    { icon: Leaf, text: "মায়েদের ভালোবাসায় বাছাইকৃত" },
    { icon: PackageCheck, text: "প্রিমিয়াম কোয়ালিটি" },
    { icon: Headphones, text: "দ্রুত ও নির্ভরযোগ্য সাপোর্ট" },
  ];

  return (
    <section
      aria-labelledby="problem-solution-title"
      className="relative overflow-hidden bg-[#fffafa] py-8 md:py-12 lg:py-16"
    >
      <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[900px] -translate-x-1/2 rounded-full bg-[#FC5689]/[0.035] blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#FC5689]/15 bg-white px-4 py-2 text-[11px] font-extrabold text-[#FC5689] shadow-sm md:text-xs">
            <Heart className="size-4 fill-[#FC5689]" />

            <span>{"মায়েদের আসল সমস্যার সহজ সমাধান"}</span>
          </div>

          <h1
            id="problem-solution-title"
            className="text-[25px] font-black leading-tight tracking-tight text-[#062a54] md:text-4xl lg:text-5xl"
          >
            {
              <>
                আপনার সমস্যা,{" "}
                <span className="text-[#FC5689]">আমাদের সমাধান</span>
              </>
            }
          </h1>

          <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-slate-600 md:text-base md:leading-7">
            {
              "মাতৃত্বের প্রতিটি পর্যায়ে আপনার আরামের কথা ভেবে বেছে নেওয়া প্রয়োজনীয় সমাধানগুলো"
            }
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-2xl border border-[#f1e3e8] bg-white shadow-[0_10px_35px_rgba(6,42,84,0.05)] md:mt-8 lg:grid-cols-4">
          {trustItems.map(({ icon: Icon, text }, index) => (
            <div
              key={text}
              className={`flex min-h-[68px] items-center justify-center gap-2.5 px-3 py-3 text-center ${
                index % 2 !== 0 ? "border-l border-[#f1e3e8]" : ""
              } ${
                index >= 2 ? "border-t border-[#f1e3e8] lg:border-t-0" : ""
              } ${index > 0 ? "lg:border-l lg:border-[#f1e3e8]" : ""}`}
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#fff2f6] text-[#FC5689]">
                <Icon className="size-4" strokeWidth={1.9} />
              </span>

              <span className="text-[10px] font-bold leading-4 text-[#294764] md:text-xs">
                {text}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:mt-7 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
          {problemSolutions.map((item) => {
            const product = products.find(
              (candidate) => candidate.id === item.productId,
            );
            return product ? (
              <ProblemSolutionCard key={item.id} item={{ ...item, product }} />
            ) : null;
          })}
        </div>

        <div className="mt-8 overflow-hidden rounded-[22px] border border-[#f1e3e8] bg-white shadow-[0_14px_38px_rgba(6,42,84,0.06)] md:mt-10">
          <div className="grid grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
            <div className="col-span-2 flex min-h-[110px] items-center gap-4 border-b border-[#f1e3e8] px-5 py-5 lg:col-span-1 lg:border-b-0 lg:border-r">
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-[#fff0f5] text-[#FC5689]">
                <UsersRound className="size-7" strokeWidth={1.8} />
              </span>

              <div>
                <p className="text-lg font-black leading-snug text-[#062a54]">
                  {"মায়েদের বিশ্বাস,"}

                  <br />

                  {"আমাদের সবচেয়ে বড় প্রাপ্তি"}
                </p>

                <p className="mt-1 text-xs font-semibold text-slate-500">
                  {"১০,০০০+ সন্তুষ্ট মা আমাদের সাথে"}
                </p>
              </div>
            </div>

            <StatItem icon={Star} value="4.9/5" label={"গ্রাহকদের রেটিং"} />

            <StatItem
              icon={ShieldCheck}
              value="100%"
              label={"নিরাপদ ও অরিজিনাল"}
            />

            <StatItem
              icon={RotateCcw}
              value={"৭ দিন"}
              label={"সহজ রিটার্ন সুবিধা"}
            />

            <StatItem icon={Headphones} value="24/7" label={"সাপোর্ট"} />
          </div>
        </div>
      </div>
    </section>
  );
}

type StatItemProps = {
  icon: typeof Star;
  value: string;
  label: string;
};

function StatItem({ icon: Icon, value, label }: StatItemProps) {
  return (
    <div className="flex min-h-[108px] flex-col items-center justify-center border-l border-t border-[#f1e3e8] px-3 py-4 text-center lg:border-t-0">
      <Icon className="mb-2 size-6 text-[#FC5689]" strokeWidth={1.9} />

      <strong className="text-xl font-black text-[#062a54]">{value}</strong>

      <span className="mt-1 text-[11px] font-semibold leading-4 text-slate-500">
        {label}
      </span>
    </div>
  );
}
