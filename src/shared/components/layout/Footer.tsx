"use client";

import Link from "next/link";
import {
  CircleHelp,
  ClipboardList,
  Heart,
  MapPin,
  MessageCircle,
  RotateCcw,
  Truck,
} from "lucide-react";

import { useSiteText } from "@/modules/site-content/context/SiteTextContext";

type SocialIconProps = {
  className?: string;
};

/* -------------------------------------------------------------------------- */
/* Social icons                                                               */
/* -------------------------------------------------------------------------- */

function FacebookIcon({ className = "" }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M13.65 22v-9h3.02l.45-3.52h-3.47V7.23c0-1.02.28-1.72 1.74-1.72h1.86V2.36c-.32-.04-1.42-.14-2.7-.14-2.67 0-4.5 1.63-4.5 4.63v2.58H7.03V13h3.02v9h3.6Z" />
    </svg>
  );
}

function InstagramIcon({ className = "" }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />

      <circle cx="12" cy="12" r="4" />

      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon({ className = "" }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M22 12c0-2.15-.19-3.63-.42-4.45a2.7 2.7 0 0 0-1.9-1.9C18.78 5.4 16.33 5 12 5s-6.78.4-7.68.65a2.7 2.7 0 0 0-1.9 1.9C2.19 8.37 2 9.85 2 12s.19 3.63.42 4.45a2.7 2.7 0 0 0 1.9 1.9C5.22 18.6 7.67 19 12 19s6.78-.4 7.68-.65a2.7 2.7 0 0 0 1.9-1.9C21.81 15.63 22 14.15 22 12Zm-12.2 3.2V8.8l5.54 3.2-5.54 3.2Z" />
    </svg>
  );
}

function TikTokIcon({ className = "" }: SocialIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M14.2 2h3.02c.18 1.45.96 2.75 2.13 3.6A6.08 6.08 0 0 0 22 6.68v3.06a9.07 9.07 0 0 1-4.76-1.38v6.77A6.87 6.87 0 1 1 11.3 8.3v3.12a3.78 3.78 0 1 0 2.9 3.67V2Z" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Footer Brand Logo                                                          */
/* -------------------------------------------------------------------------- */

function FooterBrandLogo() {
  return (
    <Link
      href="/"
      aria-label="Maaniko হোম"
      className="relative mb-5 block h-[42px] w-[145px] shrink-0 overflow-hidden"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        preload="metadata"
        poster="/Logo.png"
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover object-center"
      >
        <source src="/video1.mp4" type="video/mp4" />
      </video>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Footer                                                                     */
/* -------------------------------------------------------------------------- */

export default function Footer() {
  const { text } = useSiteText();

  const supportLinks = [
    {
      label: text("হেল্প সেন্টার"),
      href: "/help-center",
      icon: CircleHelp,
    },
    {
      label: text("কীভাবে অর্ডার করবেন"),
      href: "/how-to-order",
      icon: ClipboardList,
    },
    {
      label: text("ডেলিভারি তথ্য"),
      href: "/shipping-policy",
      icon: Truck,
    },
    {
      label: text("রিটার্ন ও রিফান্ড"),
      href: "/return-refund-policy",
      icon: RotateCcw,
    },
    {
      label: text("অর্ডার ট্র্যাক করুন"),
      href: "/orders",
      icon: MapPin,
    },
    {
      label: text("যোগাযোগ করুন"),
      href: "/contact-us",
      icon: MessageCircle,
    },
  ];

  const guideLinks = [
    {
      label: text("প্রেগন্যান্সি গাইড"),
      href: "/guide?category=pregnancy#all-guides",
    },
    {
      label: text("নবজাতক চেকলিস্ট"),
      href: "/guide?category=newborn#all-guides",
    },
    {
      label: text("ফিডিং টিপস"),
      href: "/guide?category=baby-feeding#all-guides",
    },
    {
      label: text("বেবি কেয়ার ১০১"),
      href: "/guide?category=newborn#all-guides",
    },
    {
      label: text("ব্লগ ও আর্টিকেল"),
      href: "/guide#articles",
    },
  ];

  const policyLinks = [
    {
      label: text("প্রাইভেসি পলিসি"),
      href: "/privacy-policy",
    },
    {
      label: text("শর্তাবলি"),
      href: "/terms-and-conditions",
    },
    {
      label: text("রিটার্ন পলিসি"),
      href: "/return-refund-policy",
    },
    {
      label: text("শিপিং পলিসি"),
      href: "/shipping-policy",
    },
    {
      label: text("ক্যানসেলেশন পলিসি"),
      href: "/cancellation-policy",
    },
  ];

  const socialLinks = [
    {
      label: "Facebook",
      href: "#",
      icon: FacebookIcon,
    },
    {
      label: "Instagram",
      href: "#",
      icon: InstagramIcon,
    },
    {
      label: "YouTube",
      href: "#",
      icon: YoutubeIcon,
    },
    {
      label: "TikTok",
      href: "#",
      icon: TikTokIcon,
    },
  ];

  return (
    <footer className="mt-auto border-t border-[#eef1f5] bg-white">
      {/* Main footer */}
      <div className="mx-auto w-full max-w-7xl px-4 py-9 md:px-6 md:py-11 lg:py-12">
        <div className="grid grid-cols-1 gap-9 md:grid-cols-2 md:gap-x-12 md:gap-y-10 lg:grid-cols-[1.35fr_1fr_1fr_1fr] lg:gap-10">
          {/* Brand */}
          <div className="lg:pr-8">
            <FooterBrandLogo />

            <p className="mb-3 lg:ml-3 text-[13px] font-medium leading-6 text-[#536173] md:text-sm">
              {text("মায়ের পাশে, প্রতিটি ধাপে")}
            </p>

            <p className="max-w-[290px] lg:ml-3 text-[12px] leading-6 text-[#7c8795] md:text-[13px]">
              {text(
                "গর্ভাবস্থা থেকে নবজাতক পর্যন্ত মায়ের প্রতিটি মুহূর্তের সঙ্গী Maaniko.",
              )}
            </p>

            {/* Social */}
            <div className="mt-5 flex items-center gap-3 lg:ml-3">
              {socialLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    title={item.label}
                    className="flex size-9 items-center justify-center rounded-full border border-[#edf0f4] bg-white text-[#23364d] shadow-[0_2px_10px_rgba(6,42,84,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-maaniko-pink/30 hover:bg-maaniko-blush hover:text-maaniko-pink"
                  >
                    <Icon className="size-[16px]" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-[12px] font-bold uppercase tracking-[0.03em] text-[#17283d] md:text-[13px]">
              {text("সহায়তা")}
            </h3>

            <ul className="space-y-3">
              {supportLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group inline-flex items-center gap-2.5 text-[12px] leading-5 text-[#677383] transition-colors hover:text-maaniko-pink md:text-[13px]"
                    >
                      <Icon
                        aria-hidden="true"
                        strokeWidth={1.7}
                        className="size-[15px] shrink-0 text-[#85909d] transition-colors group-hover:text-maaniko-pink"
                      />

                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h3 className="mb-4 text-[12px] font-bold uppercase tracking-[0.03em] text-[#17283d] md:text-[13px]">
              {text("গাইড")}
            </h3>

            <ul className="space-y-3">
              {guideLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="inline-block text-[12px] leading-5 text-[#677383] transition-colors hover:text-maaniko-pink md:text-[13px]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="mb-4 text-[12px] font-bold uppercase tracking-[0.03em] text-[#17283d] md:text-[13px]">
              {text("নীতিমালা")}
            </h3>

            <ul className="space-y-3">
              {policyLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="inline-block text-[12px] leading-5 text-[#677383] transition-colors hover:text-maaniko-pink md:text-[13px]"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-[#edf0f3]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-4 py-5 md:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-8">
          {/* Copyright */}
          <p className="text-center text-[11px] leading-5 text-[#7c8795] lg:text-left">
            © 2026 Maaniko. {text("সর্বস্বত্ব সংরক্ষিত।")}
          </p>

          {/* Middle */}
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-[#6d7886]">
            <div className="flex items-center gap-1.5">
              <span>{text("ভালোবাসায় তৈরি")}</span>

              <Heart
                aria-hidden="true"
                className="size-4 fill-maaniko-pink text-maaniko-pink"
                strokeWidth={1.5}
              />

              <span>{text("মায়েদের জন্য")}</span>
            </div>

            <span
              aria-hidden="true"
              className="hidden h-4 w-px bg-[#dde2e8] md:block"
            />

            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="text-[15px] leading-none">
                🇧🇩
              </span>

              <span>{text("বাংলাদেশ")}</span>
            </div>
          </div>

          {/* Help */}
          <Link
            href="/contact-us"
            className="group mx-auto flex items-center gap-3 lg:mx-0 lg:justify-self-end"
          >
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#fff1f5] text-maaniko-pink transition-transform group-hover:scale-105">
              <MessageCircle className="size-[18px]" strokeWidth={1.8} />
            </span>

            <span className="text-left">
              <span className="block text-[11px] font-medium leading-5 text-[#657181] transition-colors group-hover:text-maaniko-pink">
                {text("কোনো সাহায্য লাগবে?")}
              </span>

              <span className="block text-[11px] leading-4 text-[#8a949f]">
                {text("আমরা আছি ২৪/৭")}
              </span>
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
