"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { LoaderCircle, Mail } from "lucide-react";
import { toast } from "sonner";

import { useSiteText } from "@/modules/site-content/context/SiteTextContext";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NEWSLETTER_STORAGE_KEY = "maaniko-newsletter-subscribers";

/*
 * প্রতিটি নতুন subscription notification এই Gmail-এ যাবে।
 */
const SUBSCRIPTION_NOTIFICATION_EMAIL = "surifroton301@gmail.com";

function getSavedEmails(): string[] {
  const savedValue = window.localStorage.getItem(NEWSLETTER_STORAGE_KEY);

  if (!savedValue) {
    return [];
  }

  try {
    const parsedValue: unknown = JSON.parse(savedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return parsedValue.filter(
      (value): value is string => typeof value === "string",
    );
  } catch {
    return [];
  }
}

function saveSubscribedEmail(email: string) {
  const savedEmails = getSavedEmails();

  window.localStorage.setItem(
    NEWSLETTER_STORAGE_KEY,
    JSON.stringify([...savedEmails, email]),
  );
}

export default function NewsletterSection() {
  const { text } = useSiteText();

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!EMAIL_PATTERN.test(normalizedEmail)) {
      toast.error(text("সঠিক ইমেইল ঠিকানা লিখুন"));
      return;
    }

    const savedEmails = getSavedEmails();

    const isAlreadySubscribed = savedEmails.some(
      (savedEmail) => savedEmail.toLowerCase() === normalizedEmail,
    );

    if (isAlreadySubscribed) {
      toast.info(text("এই ইমেইলটি ইতোমধ্যে সাবস্ক্রাইব করা আছে"));
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("Subscriber Email", normalizedEmail);
      formData.append("email", normalizedEmail);
      formData.append("_replyto", normalizedEmail);

      formData.append(
        "Subscription Source",
        "Maaniko Website Homepage Newsletter",
      );

      formData.append(
        "Subscription Time",
        new Date().toLocaleString("bn-BD", {
          dateStyle: "medium",
          timeStyle: "long",
          timeZone: "Asia/Dhaka",
        }),
      );

      formData.append(
        "Message",
        `A new customer subscribed to the Maaniko newsletter using ${normalizedEmail}.`,
      );

      formData.append(
        "_subject",
        `New Maaniko Newsletter Subscription — ${normalizedEmail}`,
      );

      formData.append("_template", "table");
      formData.append("_captcha", "false");
      formData.append("_honey", "");

      const response = await fetch(
        `https://formsubmit.co/ajax/${SUBSCRIPTION_NOTIFICATION_EMAIL}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error("Subscription email could not be sent");
      }

      saveSubscribedEmail(normalizedEmail);
      setEmail("");

      toast.success(text("সফলভাবে সাবস্ক্রাইব করেছেন!"), {
        description: normalizedEmail,
      });
    } catch {
      toast.error(
        text("সাবস্ক্রাইব করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।"),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const sectionLabel = text("মানিকো নিউজলেটার সাবস্ক্রিপশন");

  return (
    <section aria-label={sectionLabel} className="bg-white py-3 md:py-8">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[24px] border border-[#ffe0e9] bg-[linear-gradient(110deg,#fff5f7_0%,#fff0f4_52%,#fff5f7_100%)] px-4 py-5 shadow-[0_12px_35px_rgba(252,86,137,0.08)] md:rounded-[30px] md:px-8 md:py-7 lg:px-10">
          {/* Decorative background shapes */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-12 -top-16 size-40 rounded-full bg-white/50 blur-sm"
          />

          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-20 right-[32%] size-48 rounded-full bg-[#ffdbe6]/30 blur-2xl"
          />

          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-16 -top-20 size-52 rounded-full bg-white/45 blur-xl"
          />

          <div className="relative z-10 grid min-w-0 items-center gap-5 md:grid-cols-[minmax(0,0.85fr)_minmax(400px,1.15fr)] md:gap-7 lg:gap-10">
            {/* Heading area */}
            <div className="flex min-w-0 items-center gap-4 md:gap-5">
              <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-white text-[#ef4277] shadow-[0_8px_24px_rgba(239,66,119,0.14)] ring-1 ring-[#ffe2ea] md:size-[78px]">
                <Mail
                  aria-hidden="true"
                  strokeWidth={1.8}
                  className="size-8 md:size-10"
                />
              </div>

              <div className="min-w-0">
                <h2 className="text-lg font-bold leading-[1.45] text-[#062a54] md:text-xl lg:text-2xl">
                  <span className="block">
                    {text("নতুন অফার ও টিপস পেতে")}
                  </span>

                  <span className="block">{text("আমাদের সাথে থাকুন")}</span>
                </h2>
              </div>
            </div>

            {/* Subscription form */}
            <form
              noValidate
              onSubmit={handleSubmit}
              className="flex w-full min-w-0 max-w-full flex-col gap-2 overflow-hidden rounded-[20px] bg-white p-1.5 shadow-[0_7px_24px_rgba(6,42,84,0.07)] md:flex-row md:gap-0 md:rounded-full"
            >
              <label htmlFor="newsletter-email" className="sr-only">
                {text("আপনার ইমেইল ঠিকানা")}
              </label>

              <input
                id="newsletter-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={email}
                disabled={isSubmitting}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={text("আপনার ইমেইল দিন")}
                className="min-h-12 w-full min-w-0 max-w-full rounded-[15px] bg-white px-4 text-sm font-medium text-[#062a54] outline-none placeholder:text-[#8290a1] focus:ring-2 focus:ring-[#FC5689]/25 disabled:cursor-not-allowed disabled:opacity-70 md:min-h-14 md:flex-1 md:rounded-full md:px-6 md:text-base"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex min-h-12 w-full max-w-full shrink-0 items-center justify-center gap-2 rounded-[15px] bg-[#ef4277] px-6 text-sm font-bold text-white shadow-[0_7px_18px_rgba(239,66,119,0.24)] transition duration-300 hover:bg-[#dc3268] hover:shadow-[0_9px_24px_rgba(239,66,119,0.32)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#FC5689]/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 md:min-h-14 md:w-auto md:min-w-[170px] md:rounded-full md:text-base"
              >
                {isSubmitting && (
                  <LoaderCircle
                    aria-hidden="true"
                    className="size-5 animate-spin"
                  />
                )}

                <span>
                  {isSubmitting
                    ? text("অপেক্ষা করুন...")
                    : text("সাবস্ক্রাইব করুন")}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
