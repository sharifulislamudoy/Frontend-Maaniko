"use client";

import Link from "next/link";
import { CheckCircle2, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  commerceApi,
  saveCustomerIdentity,
} from "@/modules/commerce/lib/client";
import { useShop } from "@/modules/shop/context/ShopContext";

export default function CartRecoveryClient({ token }: { token: string }) {
  const { refreshCommerceState, openCart } = useShop();
  const [state, setState] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function recover() {
      try {
        const result = await commerceApi.recoverCart(token);
        if (cancelled) return;
        saveCustomerIdentity(result);
        await refreshCommerceState();
        setState("success");
        toast.success("আপনার আগের cart ফিরে এসেছে");
      } catch (error) {
        if (cancelled) return;
        setState("error");
        setMessage(
          error instanceof Error ? error.message : "Cart recovery করা যায়নি",
        );
      }
    }

    void recover();
    return () => {
      cancelled = true;
    };
  }, [refreshCommerceState, token]);

  return (
    <section className="grid min-h-[70vh] place-items-center bg-[#fff9fb] px-4">
      <div className="w-full max-w-md rounded-[26px] bg-white p-6 text-center shadow-[0_18px_50px_rgba(6,42,84,.1)]">
        {state === "loading" ? (
          <>
            <LoaderCircle className="mx-auto size-9 animate-spin text-[#FC5689]" />
            <h1 className="mt-4 text-lg font-black text-[#062a54]">
              আপনার cart ফিরিয়ে আনা হচ্ছে
            </h1>
          </>
        ) : null}

        {state === "success" ? (
          <>
            <CheckCircle2 className="mx-auto size-12 text-emerald-500" />
            <h1 className="mt-4 text-xl font-black text-[#062a54]">
              Cart সফলভাবে restore হয়েছে
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              আগের device-এর cart এই device-এ পাওয়া যাবে।
            </p>
            <button
              type="button"
              onClick={openCart}
              className="mt-5 h-11 rounded-xl bg-[#FC5689] px-5 text-sm font-black text-white"
            >
              Cart খুলুন
            </button>
          </>
        ) : null}

        {state === "error" ? (
          <>
            <h1 className="text-xl font-black text-[#062a54]">
              Recovery link কাজ করছে না
            </h1>
            <p className="mt-2 text-sm text-red-600">{message}</p>
            <Link
              href="/my-account"
              className="mt-5 inline-flex h-11 items-center rounded-xl bg-[#062a54] px-5 text-sm font-black text-white"
            >
              নাম ও ফোন দিয়ে খুঁজুন
            </Link>
          </>
        ) : null}
      </div>
    </section>
  );
}
