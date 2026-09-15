"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ViewAllCardProps = {
  href: string;
  ariaLabel: string;
  className?: string;
};

export default function ViewAllCard({
  href,
  ariaLabel,
  className = "",
}: ViewAllCardProps) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`group flex h-full min-h-0 w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-[#f5cad8] bg-[linear-gradient(145deg,#fff8fa_0%,#ffe9f0_52%,#ffdce7_100%)] px-4 py-6 text-center shadow-[0_8px_24px_rgba(219,91,143,0.10)] transition-all duration-300 hover:-translate-y-1 hover:border-[#db5b8f] hover:shadow-[0_14px_30px_rgba(219,91,143,0.18)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FC5689]/20 active:scale-[0.98] ${className}`}
    >
      <span className="text-lg font-black leading-tight text-[#07183d] md:text-xl">
        আরও দেখুন
      </span>

      <span className="mt-4 flex size-11 items-center justify-center rounded-full bg-[#db5b8f] text-white shadow-[0_8px_18px_rgba(219,91,143,0.28)] transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-105 md:size-12">
        <ArrowRight aria-hidden="true" className="size-5 md:size-6" strokeWidth={2.3} />
      </span>
    </Link>
  );
}
