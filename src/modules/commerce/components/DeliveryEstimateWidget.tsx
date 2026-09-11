"use client";

import { MapPin, Truck } from "lucide-react";
import { useState } from "react";
import { commerceApi } from "@/modules/commerce/lib/client";

const DHAKA_AREAS = ["ঢাকা", "Dhaka"];

export default function DeliveryEstimateWidget({
  productId,
  comboId,
}: {
  productId?: string;
  comboId?: string;
}) {
  const [district, setDistrict] = useState("");
  const [estimate, setEstimate] = useState("");

  async function check() {
    if (!district.trim()) return;
    const dhaka = DHAKA_AREAS.some((name) =>
      district.toLowerCase().includes(name.toLowerCase()),
    );
    setEstimate(dhaka ? "সম্ভাব্য ১–২ কর্মদিবস" : "সম্ভাব্য ২–৪ কর্মদিবস");

    await commerceApi
      .createLead({
        type: "DELIVERY_ESTIMATE",
        productId,
        comboId,
        data: {
          district: district.slice(0, 80),
          estimate: dhaka ? "1-2_days" : "2-4_days",
        },
      })
      .catch(() => undefined);
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-8 md:px-6 lg:px-8">
      <div className="rounded-2xl bg-white shadow-[0_8px_24px_rgba(6,42,84,.045)] p-4 md:p-5">
        <div className="flex items-center gap-2">
          <Truck className="size-5 text-[#03A7FD]" />
          <h2 className="font-black text-[#062a54]">
            আপনার এলাকায় delivery কত দিনে?
          </h2>
        </div>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input
              value={district}
              onChange={(event) => setDistrict(event.target.value)}
              placeholder="জেলা/এলাকা লিখুন"
              className="h-11 w-full rounded-xl bg-slate-50 pl-9 pr-3 text-sm outline-none ring-1 ring-[#e8edf3] transition focus:bg-white focus:ring-2 focus:ring-[#03A7FD]/30"
            />
          </div>
          <button
            type="button"
            onClick={() => void check()}
            className="h-11 rounded-xl bg-[#03A7FD] px-5 text-xs font-black text-white"
          >
            Estimate দেখুন
          </button>
        </div>
        {estimate ? (
          <p className="mt-3 rounded-xl bg-sky-50 p-3 text-sm font-black text-sky-700">
            {estimate}
          </p>
        ) : null}
      </div>
    </section>
  );
}
