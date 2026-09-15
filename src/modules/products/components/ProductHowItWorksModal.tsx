"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { ArrowDown, Eye, Frown, Smile, Star, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { useSiteText } from "@/modules/site-content/context/SiteTextContext";
import type { SiteText } from "@/modules/site-content/types/site-text";
import type { MaanikoProduct } from "@/modules/products/types/product";

type ProductHowItWorksModalProps = {
  product: MaanikoProduct | null;
  onClose: () => void;
  onViewDetails: (product: MaanikoProduct) => void;
};

type ProblemPreview = {
  title: SiteText;
  description: SiteText;
};

const problemPreviewByProductId: Record<string, ProblemPreview> = {
  "product-maternity-dress": {
    title: "গর্ভাবস্থায় পোশাকে অস্বস্তি?",
    description:
      "শরীরের পরিবর্তনের সঙ্গে আঁটসাঁট বা শক্ত কাপড় দৈনন্দিন কাজে অস্বস্তি বাড়াতে পারে।",
  },
  "product-feeding-maxi": {
    title: "ফিডিংয়ের সময় পোশাক নিয়ে ঝামেলা?",
    description:
      "সহজ access না থাকলে বাইরে বা ঘরে feeding অস্বস্তিকর ও সময়সাপেক্ষ হতে পারে।",
  },
  "product-diaper-bag": {
    title: "বেবির জিনিসপত্র এলোমেলো?",
    description:
      "ডায়াপার, বোতল ও কাপড় আলাদা করে না রাখলে প্রয়োজনের সময় দ্রুত খুঁজে পাওয়া কঠিন হয়।",
  },
  "product-nursing-pillow": {
    title: "ফিডিংয়ের সময় ভঙ্গিতে অস্বস্তি?",
    description:
      "দীর্ঘ সময় শিশুকে ধরে রাখলে হাত, কাঁধ ও পিঠে বাড়তি চাপ অনুভূত হতে পারে।",
  },
  "product-support-belt": {
    title: "পেট ও কোমরে অস্বস্তি?",
    description:
      "হাঁটা, দাঁড়ানো বা দৈনন্দিন কাজে পেটের নিচের অংশে বাড়তি সাপোর্ট প্রয়োজন হতে পারে।",
  },
  "product-nursing-pads": {
    title: "লিকেজ ও ভেজাভাবের দুশ্চিন্তা?",
    description:
      "নিয়মিত nursing-এর সময় পোশাকে ভেজাভাব অস্বস্তি ও বিব্রতকর পরিস্থিতি তৈরি করতে পারে।",
  },
  "product-hooded-towel": {
    title: "গোসলের পর শিশুকে শুকাতে কষ্ট?",
    description:
      "সাধারণ টাওয়েলে মাথা ও শরীর একসঙ্গে আরামদায়কভাবে ঢেকে রাখা কঠিন হতে পারে।",
  },
  "product-baby-wash": {
    title: "ক্লিনজারে শিশুর ত্বক শুষ্ক হচ্ছে?",
    description:
      "প্রতিদিনের গোসলে শিশুর উপযোগী মাইল্ড ক্লিনজার ব্যবহার করা জরুরি।",
  },
  "product-baby-moisturizer": {
    title: "গোসলের পর ত্বক শুষ্ক হয়ে যায়?",
    description:
      "গোসলের পর শিশুর কোমল ত্বকের স্বাভাবিক আর্দ্রতা ধরে রাখতে বাড়তি care প্রয়োজন হতে পারে।",
  },
  "product-feeding-bowl": {
    title: "খাওয়ানোর সময় বাটি নড়ে যায়?",
    description:
      "নড়বড়ে বাটি খাবার ছড়িয়ে দিতে পারে এবং self-feeding practice কঠিন করে তোলে।",
  },
  "product-spoon-set": {
    title: "শক্ত চামচে শিশুর অস্বস্তি?",
    description:
      "বড় বা শক্ত spoon শিশুর ছোট মুখ ও সংবেদনশীল মাড়ির জন্য অস্বস্তিকর হতে পারে।",
  },
  "product-silicone-bib": {
    title: "খাওয়ার সময় জামাকাপড় নোংরা?",
    description:
      "খাবার নিচে পড়ে গেলে বারবার পোশাক বদলানো ও পরিষ্কার করার ঝামেলা বাড়ে।",
  },
  "product-thermometer": {
    title: "শিশুর তাপমাত্রা নিয়ে দুশ্চিন্তা?",
    description:
      "শুধু হাত দিয়ে অনুমান না করে দ্রুত একটি পরিষ্কার reading পাওয়া প্রয়োজন।",
  },
  "product-nasal-aspirator": {
    title: "নাক বন্ধ থাকলে শিশুর অস্বস্তি?",
    description:
      "নাকের জমে থাকা মিউকাস শিশুর স্বাভাবিক শ্বাস ও feeding routine-এ অস্বস্তি তৈরি করতে পারে।",
  },
  "product-nail-care": {
    title: "শিশুর ছোট নখ কাটতে ভয় লাগে?",
    description:
      "বড়দের nail tool শিশুর ছোট নখের জন্য নিয়ন্ত্রণ করা কঠিন হতে পারে।",
  },
  "product-recovery-belt": {
    title: "প্রসবের পর নড়াচড়ায় সাপোর্ট দরকার?",
    description:
      "Recovery-এর সময় দৈনন্দিন ওঠা-বসা ও হাঁটাচলায় পেটের অংশে adjustable support সহায়ক হতে পারে।",
  },
  "product-maternity-pads": {
    title: "সাধারণ pad যথেষ্ট মনে হচ্ছে না?",
    description:
      "প্রসব-পরবর্তী সময়ে আরাম ও hygiene-এর জন্য বেশি absorbency প্রয়োজন হতে পারে।",
  },
  "product-swaddle": {
    title: "ঘুমের সময় শিশু বারবার চমকে ওঠে?",
    description:
      "নবজাতককে আরামদায়কভাবে জড়িয়ে রাখার জন্য হালকা ও breathable fabric প্রয়োজন।",
  },
  "product-fetal-doppler": {
    title: "ঘরে heartbeat শুনতে চান?",
    description:
      "সঠিক নির্দেশনা ছাড়া monitoring device ব্যবহার করলে reading বোঝা কঠিন হতে পারে।",
  },
  "product-palmers-stretch-mark-cream": {
    title: "ত্বকে শুষ্কতা ও টান অনুভব করছেন?",
    description:
      "গর্ভাবস্থায় পরিবর্তিত ত্বকে নিয়মিত moisturising care আরামদায়ক অনুভূতি দিতে পারে।",
  },
  "product-time-marker-water-bottle": {
    title: "দিনভর পানি খেতে ভুলে যান?",
    description:
      "ব্যস্ত routine-এ পর্যাপ্ত পানি পান করার সময় ও পরিমাণ track করা কঠিন হতে পারে।",
  },
  "product-soft-sleep-eye-mask": {
    title: "আলোতে বিশ্রাম নিতে কষ্ট?",
    description:
      "দিনের আলো বা ঘরের light ছোট ছোট বিশ্রামের সময় ঘুমে বাধা দিতে পারে।",
  },
  "product-pregnancy-document-organizer": {
    title: "রিপোর্ট ও প্রেসক্রিপশন এলোমেলো?",
    description:
      "ভিন্ন appointment-এর কাগজ একসঙ্গে থাকলে প্রয়োজনীয় document দ্রুত খুঁজে পাওয়া কঠিন হয়।",
  },
  "product-compression-socks": {
    title: "দীর্ঘক্ষণ দাঁড়ালে পায়ে ভারভাব?",
    description:
      "দৈনন্দিন চলাফেরা বা দীর্ঘক্ষণ দাঁড়িয়ে থাকলে পায়ে বাড়তি comfort ও graduated support প্রয়োজন হতে পারে।",
  },
};

export default function ProductHowItWorksModal({
  product,
  onClose,
  onViewDetails,
}: ProductHowItWorksModalProps) {
  const { locale, text } = useSiteText();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!product) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 0);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, product]);

  const priceFormatter = useMemo(
    () =>
      new Intl.NumberFormat("bn-BD", {
        maximumFractionDigits: 0,
      }),
    [locale],
  );

  if (typeof document === "undefined") return null;

  const preview = product
    ? (problemPreviewByProductId[product.id] ?? {
        title: "দৈনন্দিন care আরও সহজ করতে চান?",
        description:
          "সঠিক সময়ে প্রয়োজন অনুযায়ী তৈরি product ব্যবহার করলে routine আরও গোছানো ও আরামদায়ক হয়।",
      })
    : null;

  const copy = {
    modalTitle: "কীভাবে কাজ করে",
    problem: "সমস্যা",
    solution: "সমাধান",
    details: "পণ্যটি দেখুন",
    close: "কীভাবে কাজ করে modal বন্ধ করুন",
    regularPrice: "নিয়মিত মূল্য",
  };

  return createPortal(
    <AnimatePresence>
      {product && preview && (
        <motion.div
          className="fixed inset-0 z-[110] grid place-items-center overflow-y-auto bg-[#03182e]/65 p-3 backdrop-blur-[4px] md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-label={`${copy.modalTitle}: ${text(product.name)}`}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onMouseDown={(event) => event.stopPropagation()}
            className="relative my-auto w-full max-w-[430px] overflow-hidden rounded-[26px] border border-[#f3a7c0] bg-white shadow-[0_28px_90px_rgba(0,0,0,0.32)] md:rounded-[30px]"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label={copy.close}
              className="absolute right-3 top-3 z-30 grid size-9 place-items-center rounded-full border border-white/80 bg-white/90 text-[#062a54] shadow-md backdrop-blur transition hover:border-[#FC5689] hover:text-[#FC5689] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FC5689]/25"
            >
              <X className="size-4.5" aria-hidden="true" />
            </button>

            <div className="relative min-h-[235px] overflow-hidden bg-[#fff8fa] md:min-h-[255px]">
              <img
                src={product.images[1] ?? product.images[0] ?? ""}
                alt=""
                aria-hidden="true"
                className="absolute inset-y-0 right-0 h-full w-[62%] object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 via-[49%] to-white/10" />
              <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />

              <div className="relative z-10 flex min-h-[235px] w-[68%] flex-col justify-center px-5 py-7 md:min-h-[255px] md:px-7">
                <p className="inline-flex w-fit items-center gap-2 text-xs font-extrabold text-[#ea4e82] md:text-sm">
                  <span className="grid size-8 place-items-center rounded-full border border-[#ffb8cf] bg-white/90">
                    <Frown className="size-4" aria-hidden="true" />
                  </span>
                  {copy.problem}
                </p>

                <h2 className="mt-4 font-heading text-[22px] font-extrabold leading-[1.2] text-[#062a54] md:text-[26px]">
                  {text(preview.title)}
                </h2>

                <p className="mt-3 text-xs leading-5 text-slate-600 md:text-sm md:leading-6">
                  {text(preview.description)}
                </p>
              </div>
            </div>

            <div className="relative z-20 h-px bg-[#efdce3]">
              <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white bg-[#e05287] text-white shadow-[0_8px_22px_rgba(224,82,135,0.35)]">
                <ArrowDown
                  className="size-5"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
              </span>
            </div>

            <div className="relative min-h-[270px] overflow-hidden bg-white md:min-h-[285px]">
              <img
                src={product.images[0] ?? ""}
                alt={text(product.name)}
                className="absolute bottom-0 right-0 h-[76%] w-[58%] object-contain object-bottom-right"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 via-[52%] to-white/15" />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent" />

              <div className="relative z-10 flex min-h-[270px] w-[70%] flex-col px-5 pb-6 pt-8 md:min-h-[285px] md:px-7">
                <p className="inline-flex w-fit items-center gap-2 text-xs font-extrabold text-[#4d9cff] md:text-sm">
                  <span className="grid size-8 place-items-center rounded-full border border-[#b8d6ff] bg-white/90">
                    <Smile className="size-4" aria-hidden="true" />
                  </span>
                  {copy.solution}
                </p>

                <h3 className="mt-4 line-clamp-3 font-heading text-lg font-extrabold leading-[1.25] text-[#062a54] md:text-xl">
                  {text(product.name)}
                </h3>

                <p className="mt-2 line-clamp-3 text-[11px] leading-[18px] text-slate-600 md:text-xs md:leading-5">
                  {text(product.description)}
                </p>

                <div className="mt-auto flex flex-wrap items-end gap-x-2 gap-y-1 pt-4">
                  <span className="font-heading text-xl font-extrabold text-[#e05287]">
                    ৳{priceFormatter.format(product.price)}
                  </span>

                  {product.compareAtPrice &&
                  product.compareAtPrice > product.price ? (
                    <span
                      title={copy.regularPrice}
                      className="pb-0.5 text-xs font-semibold text-slate-400 line-through"
                    >
                      ৳{priceFormatter.format(product.compareAtPrice)}
                    </span>
                  ) : null}

                  {product.rating ? (
                    <span className="inline-flex items-center gap-1 pb-0.5 text-xs font-extrabold text-[#062a54]">
                      <Star
                        className="size-3.5 fill-[#f8c241] text-[#f8c241]"
                        aria-hidden="true"
                      />
                      {product.rating.toFixed(1)}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="border-t border-[#f0e0e6] bg-white p-3 md:p-4">
              <button
                type="button"
                onClick={() => onViewDetails(product)}
                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#df5285] px-5 text-sm font-extrabold text-white shadow-[0_10px_24px_rgba(223,82,133,0.22)] transition hover:bg-[#ce3e75] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FC5689]/25"
              >
                {copy.details}
                <Eye className="size-4" aria-hidden="true" />
              </button>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
