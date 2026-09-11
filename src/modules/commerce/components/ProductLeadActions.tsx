"use client";

import { useEffect, useState, type FormEvent } from "react";
import { BellRing, Headphones, PackageSearch, X } from "lucide-react";
import type { MaanikoProduct } from "@/modules/products/types/product";
import {
  commerceApi,
  getSavedContact,
  saveCustomerIdentity,
} from "@/modules/commerce/lib/client";

type LeadType = "PRICE_DROP" | "BACK_IN_STOCK" | "CARE_TEAM";

export default function ProductLeadActions({
  product,
}: {
  product: MaanikoProduct;
}) {
  const [type, setType] = useState<LeadType | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [marketing, setMarketing] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!type) return;
    const saved = getSavedContact();
    setName(saved.name);
    setPhone(saved.phone);
    setMessage("");
  }, [type]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!type) return;
    setLoading(true);
    setMessage("");

    try {
      const result = await commerceApi.createLead({
        type,
        name,
        phone,
        marketingConsent: marketing,
        ...(product.productType === "combo"
          ? { comboId: product.id }
          : { productId: product.id }),
        data: { source: "product_details" },
      });
      saveCustomerIdentity(result);
      setMessage(
        type === "CARE_TEAM"
          ? "Care Team request নেওয়া হয়েছে।"
          : "আপনার notification request সেভ হয়েছে।",
      );
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Request সেভ করা যায়নি");
    } finally {
      setLoading(false);
    }
  }

  const actions = [
    ...(product.stock > 0
      ? [
          {
            type: "PRICE_DROP" as const,
            icon: BellRing,
            title: "দাম কমলে জানান",
          },
        ]
      : [
          {
            type: "BACK_IN_STOCK" as const,
            icon: PackageSearch,
            title: "স্টক এলে জানান",
          },
        ]),
    {
      type: "CARE_TEAM" as const,
      icon: Headphones,
      title: "Care Team-এর সাহায্য নিন",
    },
  ];

  return (
    <>
      <section className="mx-auto w-full max-w-7xl px-4 pb-8 md:px-6 lg:px-8">
        <div className="grid gap-2 rounded-2xl bg-white p-3 shadow-[0_8px_24px_rgba(6,42,84,.045)] sm:grid-cols-2">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.type}
                type="button"
                onClick={() => setType(action.type)}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#fff7fa] px-4 py-3 text-xs font-black text-[#062a54] transition hover:bg-[#FC5689]/10"
              >
                <Icon className="size-4 text-[#FC5689]" />
                {action.title}
              </button>
            );
          })}
        </div>
      </section>

      {type ? (
        <div className="fixed inset-0 z-[140] grid place-items-end bg-[#062a54]/40 sm:place-items-center sm:p-4">
          <button
            className="absolute inset-0"
            onClick={() => setType(null)}
            aria-label="বন্ধ করুন"
          />
          <form
            onSubmit={submit}
            className="relative z-10 w-full max-w-md rounded-t-[26px] bg-white p-5 sm:rounded-[26px] sm:p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-black text-[#062a54]">
                  {type === "PRICE_DROP"
                    ? "দাম কমলে WhatsApp-এ জানান"
                    : type === "BACK_IN_STOCK"
                      ? "স্টক এলে WhatsApp-এ জানান"
                      : "Maaniko Care Team"}
                </h2>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {product.name}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setType(null)}
                className="grid size-9 place-items-center rounded-full bg-slate-100"
              >
                <X className="size-4" />
              </button>
            </div>

            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="আপনার নাম"
              className="mt-5 h-11 w-full rounded-xl bg-slate-50 px-3 outline-none ring-1 ring-[#e8edf3] focus:bg-white focus:ring-2 focus:ring-[#FC5689]/30"
            />
            <input
              required
              inputMode="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="01XXXXXXXXX"
              className="mt-3 h-11 w-full rounded-xl bg-slate-50 px-3 outline-none ring-1 ring-[#e8edf3] focus:bg-white focus:ring-2 focus:ring-[#FC5689]/30"
            />

            <p className="mt-1 text-[11px] text-slate-400">
              এই নম্বর শুধু আপনার চাওয়া update/support দিতে ব্যবহার হবে।
            </p>

            <label className="mt-3 flex items-start gap-2 text-xs leading-5 text-slate-500">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(event) => setMarketing(event.target.checked)}
                className="mt-1"
              />
              অফার ও নতুন পণ্যের খবর WhatsApp-এ পেতে চাই।
            </label>

            {message ? (
              <p className="mt-3 rounded-xl bg-slate-50 px-3 py-2 text-xs font-bold text-[#062a54]">
                {message}
              </p>
            ) : null}

            <button
              disabled={loading}
              className="mt-4 h-11 w-full rounded-xl bg-[#FC5689] text-sm font-black text-white disabled:opacity-50"
            >
              {loading ? "সেভ হচ্ছে..." : "Request সেভ করুন"}
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
