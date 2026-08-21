"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

// Replace with Maaniko's WhatsApp number.
// Use country code and digits only. Example: 8801712345678
const MAANIKO_WHATSAPP_NUMBER = "8801995322033";

const BANGLADESH_PHONE_PATTERN = /^(?:\+?88)?01[3-9]\d{8}$/;
const CONFIGURED_WHATSAPP_PATTERN = /^8801[3-9]\d{8}$/;

function normalizeBangladeshPhone(value: string) {
    const digits = value.replace(/\D/g, "");

    if (digits.startsWith("880")) return digits;

    return `88${digits}`;
}

export default function WhatsAppGuideBanner() {
    const { localize } = useLanguage();

    const [phoneNumber, setPhoneNumber] = useState("");
    const [feedback, setFeedback] = useState("");

    const title = localize({
        bn: "নতুন গাইড ও বিশেষ অফার পেতে সঙ্গে থাকুন",
        en: "Stay connected for new guides and special offers",
    });

    const placeholder = localize({
        bn: "আপনার ফোন নম্বর দিন",
        en: "Enter your phone number",
    });

    const buttonLabel = localize({
        bn: "আপডেট পেতে চাই",
        en: "Get updates",
    });

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setFeedback("");

        const compactPhone = phoneNumber.replace(/[\s-]/g, "");

        if (!BANGLADESH_PHONE_PATTERN.test(compactPhone)) {
            setFeedback(
                localize({
                    bn: "সঠিক বাংলাদেশি ফোন নম্বর দিন (যেমন: 01712345678)",
                    en: "Enter a valid Bangladeshi phone number (for example: 01712345678)",
                }),
            );

            return;
        }

        if (!CONFIGURED_WHATSAPP_PATTERN.test(MAANIKO_WHATSAPP_NUMBER)) {
            setFeedback(
                localize({
                    bn: "প্রথমে কম্পোনেন্টে Maaniko-এর WhatsApp নম্বরটি সেট করুন।",
                    en: "Set Maaniko's WhatsApp number in this component first.",
                }),
            );

            return;
        }

        const normalizedPhone = normalizeBangladeshPhone(compactPhone);

        const message = localize({
            bn: `আমি Maaniko-এর নতুন গাইড ও বিশেষ অফারের আপডেট পেতে চাই।\nআমার ফোন নম্বর: ${normalizedPhone}`,
            en: `I would like to receive Maaniko's new guides and special offers.\nMy phone number: ${normalizedPhone}`,
        });

        const whatsappUrl =
            `https://wa.me/${MAANIKO_WHATSAPP_NUMBER}` +
            `?text=${encodeURIComponent(message)}`;

        const whatsappWindow = window.open(
            whatsappUrl,
            "_blank",
            "noopener,noreferrer",
        );

        if (!whatsappWindow) {
            window.location.href = whatsappUrl;
        }
    }

    return (
        <section
            aria-labelledby="whatsapp-guide-title"
            className="bg-white py-4 md:py-6 lg:py-8"
        >
            <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
                <div className="relative isolate min-h-[250px] overflow-hidden rounded-2xl border border-[#e3f0fb] bg-[linear-gradient(105deg,#f5fbff_0%,#eaf6ff_52%,#e7f5ff_100%)] px-4 py-6 shadow-[0_10px_30px_rgba(6,42,84,0.06)] md:min-h-[190px] md:rounded-[22px] md:px-7 md:py-6 lg:min-h-[200px] lg:rounded-[26px] lg:px-9 lg:py-7">
                    <span
                        aria-hidden="true"
                        className="absolute -left-8 -top-12 size-36 rounded-full bg-white/45 blur-2xl md:size-44 lg:size-52"
                    />

                    <span
                        aria-hidden="true"
                        className="absolute bottom-3 left-[48%] size-7 rounded-full border-[5px] border-white/25 md:size-10 lg:size-12"
                    />

                    <div className="absolute right-0 top-0 h-[120px] w-[120px] md:-bottom-8 md:top-auto md:h-[220px] md:w-[220px] lg:-bottom-12 lg:right-5 lg:h-[270px] lg:w-[270px]">
                        <Image
                            src="/whatsapp-guide-reference.png"
                            alt=""
                            width={839}
                            height={1023}
                            sizes="(max-width: 767px) 120px, (max-width: 1023px) 220px, 270px"
                            className="h-full w-full object-contain object-bottom"
                        />
                    </div>

                    <div className="relative z-10 w-full md:max-w-[68%] lg:max-w-[66%]">
                        <h2
                            id="whatsapp-guide-title"
                            className="max-w-[620px] text-[25px] font-black leading-[1.3] tracking-tight text-[#062a54] md:text-[28px] md:leading-[1.3] lg:text-[32px]"
                        >
                            {title}
                        </h2>

                        <form
                            onSubmit={handleSubmit}
                            noValidate
                            className="mt-5 flex w-full max-w-[720px] flex-col gap-2 md:mt-5 md:flex-row md:gap-0 lg:mt-6"
                        >
                            <label className="flex min-h-14 min-w-0 flex-1 items-center rounded-xl border border-[#d7e0eb] bg-white p-1 shadow-[0_4px_14px_rgba(6,42,84,0.08)] md:rounded-r-none lg:min-h-[60px]">
                                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-[#cfd8e3] bg-white shadow-sm lg:size-12">
                                    <MessageCircle
                                        aria-hidden="true"
                                        className="size-7 fill-[#25D366] text-[#25D366] lg:size-8"
                                        strokeWidth={2.2}
                                    />
                                </span>

                                <span className="sr-only">{placeholder}</span>

                                <input
                                    type="tel"
                                    inputMode="tel"
                                    autoComplete="tel"
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    placeholder={placeholder}
                                    aria-invalid={Boolean(feedback)}
                                    aria-describedby={
                                        feedback ? "whatsapp-guide-feedback" : undefined
                                    }
                                    onChange={(event) => {
                                        setPhoneNumber(event.target.value.slice(0, 18));

                                        if (feedback) {
                                            setFeedback("");
                                        }
                                    }}
                                    className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm font-medium text-[#1f2937] outline-none placeholder:text-[#8b919a] md:text-[15px] lg:px-4 lg:text-base"
                                />
                            </label>

                            <button
                                type="submit"
                                className="min-h-14 w-full rounded-xl bg-[linear-gradient(100deg,#6375d9_0%,#2489ed_100%)] px-5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(36,137,237,0.25)] transition duration-200 hover:brightness-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2489ed]/30 active:scale-[0.99] md:w-auto md:min-w-[180px] md:rounded-l-none md:text-[15px] lg:min-h-[60px] lg:min-w-[205px] lg:px-7 lg:text-base"
                            >
                                {buttonLabel}
                            </button>
                        </form>

                        {feedback ? (
                            <p
                                id="whatsapp-guide-feedback"
                                role="alert"
                                className="mt-2 text-xs font-semibold text-red-600 md:text-sm"
                            >
                                {feedback}
                            </p>
                        ) : null}
                    </div>
                </div>
            </div>
        </section>
    );
}