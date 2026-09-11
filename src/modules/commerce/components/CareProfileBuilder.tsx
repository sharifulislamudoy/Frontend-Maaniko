"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";

import type { MaanikoProduct } from "@/modules/products/types/product";

import {
  commerceApi,
  getCustomerToken,
  getSavedContact,
  saveCustomerIdentity,
} from "@/modules/commerce/lib/client";

const INTERESTS = [
  "Feeding",
  "Sleeping",
  "Bath & Care",
  "Travel",
  "Safety",
  "Mother Care",
];

export default function CareProfileBuilder({
  products,
}: {
  products: MaanikoProduct[];
}) {
  const journeys = useMemo(() => {
    const map = new Map<string, string>();

    for (const product of products) {
      for (const journey of product.journeys ?? []) {
        const slug = journey.slug?.trim();

        if (!slug) continue;

        const name = journey.name?.trim() || journey.name?.trim() || slug;

        map.set(slug, name);
      }
    }

    return Array.from(map, ([slug, name]) => ({
      slug,
      name,
    }));
  }, [products]);

  const [journey, setJourney] = useState(journeys[0]?.slug ?? "");

  const [interests, setInterests] = useState<string[]>([]);

  const [budgetMax, setBudgetMax] = useState(4000);

  const saved = getSavedContact();

  const [name, setName] = useState(saved.name ?? "");
  const [phone, setPhone] = useState(saved.phone ?? "");

  const [marketing, setMarketing] = useState(false);

  const [message, setMessage] = useState("");

  const [saving, setSaving] = useState(false);

  const recommendations = useMemo(
    () =>
      products
        .filter((product) => {
          const matchesJourney =
            !journey || product.journeys?.some((item) => item.slug === journey);

          const matchesBudget = product.price <= budgetMax;

          return Boolean(matchesJourney && matchesBudget);
        })
        .slice(0, 8),
    [budgetMax, journey, products],
  );

  function toggleInterest(value: string) {
    setInterests((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    );
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      let token = getCustomerToken();

      if (!token) {
        const cleanName = name.trim();
        const cleanPhone = phone.trim();

        if (!cleanName) {
          throw new Error("আপনার নাম লিখুন।");
        }

        if (!cleanPhone) {
          throw new Error("আপনার ফোন নম্বর লিখুন।");
        }

        const result = await commerceApi.captureContact({
          name: cleanName,
          phone: cleanPhone,
          marketingConsent: marketing,
          source: "care_profile",
        });

        saveCustomerIdentity(result);

        token = result.customerToken;
      }

      if (!token) {
        throw new Error("Customer profile তৈরি করা যায়নি।");
      }

      await commerceApi.updateCareProfile({
        journeySlug: journey || undefined,
        interests,
        budgetMin: 0,
        budgetMax,
      });

      setMessage("Care Profile সেভ হয়েছে। পরের visit-এও এটি ব্যবহার করা যাবে।");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Care Profile সেভ করা যায়নি",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#fff9fb] py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="rounded-[28px] bg-gradient-to-br from-[#FC5689]/10 to-[#03A7FD]/10 p-5 md:p-8">
          <Sparkles className="size-7 text-[#FC5689]" />

          <h1 className="mt-3 text-2xl font-black text-[#062a54] md:text-3xl">
            আপনার Maaniko Care List
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            আগে আপনার journey ও budget বাছুন। Recommendation দেখার জন্য phone
            লাগবে না; result পছন্দ হলে পরে profile সেভ করতে পারবেন।
          </p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[360px_1fr]">
          <form
            onSubmit={save}
            className="rounded-[24px] bg-white p-5 shadow-[0_8px_24px_rgba(6,42,84,.045)]"
          >
            <label className="text-sm font-black text-[#062a54]">
              আপনার Journey
              <select
                value={journey}
                onChange={(event) => setJourney(event.target.value)}
                className="mt-2 h-11 w-full rounded-xl bg-slate-50 px-3 ring-1 ring-[#e8edf3]"
              >
                {journeys.length === 0 ? (
                  <option value="">Journey পাওয়া যায়নি</option>
                ) : null}

                {journeys.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>

            <div className="mt-5">
              <p className="text-sm font-black text-[#062a54]">
                কোন বিষয়ে সাহায্য চান?
              </p>

              <div className="mt-2 flex flex-wrap gap-2">
                {INTERESTS.map((interest) => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`rounded-full px-3 py-2 text-xs font-black transition-colors ${
                      interests.includes(interest)
                        ? "bg-[#FC5689] text-white"
                        : "bg-slate-100 text-slate-600 hover:bg-[#fff0f5] hover:text-[#FC5689]"
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <label className="mt-5 block text-sm font-black text-[#062a54]">
              সর্বোচ্চ Budget: ৳{budgetMax}
              <input
                type="range"
                min={500}
                max={10000}
                step={500}
                value={budgetMax}
                onChange={(event) => setBudgetMax(Number(event.target.value))}
                className="mt-3 w-full accent-[#FC5689]"
              />
            </label>

            <div className="mt-6 border-t border-[#eef1f5] pt-5">
              <p className="text-sm font-black text-[#062a54]">
                Resultটি profile হিসেবে সেভ করুন
              </p>

              <p className="mt-1 text-[11px] leading-4 text-slate-400">
                একই নাম ও ফোন ব্যবহার করে অন্য device থেকেও আপনার order/cart
                history restore করতে পারবেন।
              </p>

              <input
                required={!getCustomerToken()}
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="আপনার নাম"
                autoComplete="name"
                className="mt-3 h-10 w-full rounded-xl bg-slate-50 px-3 text-sm outline-none ring-1 ring-[#e8edf3] transition focus:ring-2 focus:ring-[#FC5689]/30"
              />

              <input
                required={!getCustomerToken()}
                inputMode="tel"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="01XXXXXXXXX"
                autoComplete="tel"
                className="mt-2 h-10 w-full rounded-xl bg-slate-50 px-3 text-sm outline-none ring-1 ring-[#e8edf3] transition focus:ring-2 focus:ring-[#FC5689]/30"
              />

              <label className="mt-3 flex gap-2 text-[11px] leading-4 text-slate-500">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(event) => setMarketing(event.target.checked)}
                  className="mt-0.5 accent-[#FC5689]"
                />

                <span>Maaniko-এর offer/update WhatsApp-এ পেতে চাই।</span>
              </label>

              <button
                type="submit"
                disabled={saving}
                className="mt-4 h-11 w-full rounded-xl bg-[#FC5689] text-sm font-black text-white transition hover:bg-[#e94b7d] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "সেভ হচ্ছে..." : "আমার Care Profile সেভ করুন"}
              </button>

              {message ? (
                <p className="mt-3 rounded-xl bg-slate-50 p-3 text-xs font-bold leading-5 text-[#062a54]">
                  {message}
                </p>
              ) : null}
            </div>
          </form>

          <section>
            <div className="flex items-end justify-between gap-3">
              <div>
                <p className="text-xs font-black text-[#FC5689]">
                  আপনার জন্য পাওয়া গেছে
                </p>

                <h2 className="mt-1 text-xl font-black text-[#062a54]">
                  {recommendations.length} টি প্রাসঙ্গিক পণ্য
                </h2>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
              {recommendations.map((product) => {
                const href =
                  product.href?.trim() || `/products/${product.slug}`;

                const productName =
                  product.name?.trim() ||
                  product.name?.trim() ||
                  "Maaniko Product";

                return (
                  <Link
                    key={product.id}
                    href={href}
                    className="overflow-hidden rounded-2xl bg-white shadow-[0_6px_20px_rgba(6,42,84,.045)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(6,42,84,.08)]"
                  >
                    <img
                      src={product.images?.[0] ?? ""}
                      alt={productName}
                      className="aspect-square w-full object-cover"
                    />

                    <div className="p-3">
                      <p className="line-clamp-2 text-xs font-black text-[#062a54]">
                        {productName}
                      </p>

                      <p className="mt-1 text-sm font-black text-[#FC5689]">
                        ৳{Math.round(product.price)}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {recommendations.length === 0 ? (
              <div className="mt-4 rounded-2xl bg-white p-6 text-center shadow-[0_6px_20px_rgba(6,42,84,.04)]">
                <p className="text-sm font-bold text-slate-500">
                  এই Journey ও Budget অনুযায়ী কোনো পণ্য পাওয়া যায়নি।
                </p>
              </div>
            ) : null}
          </section>
        </div>
      </div>
    </main>
  );
}
