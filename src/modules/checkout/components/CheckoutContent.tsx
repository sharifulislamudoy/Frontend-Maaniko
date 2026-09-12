"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  LoaderCircle,
  LockKeyhole,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";

import type { MaanikoProduct } from "@/modules/products/types/product";
import { useShop } from "@/modules/shop/context/ShopContext";
import {
  commerceApi,
  getSavedContact,
  saveCustomerIdentity,
  type OrderQuote,
} from "@/modules/commerce/lib/client";

type FormState = {
  name: string;
  phone: string;
  alternativePhone: string;
  email: string;
  address: string;
  area: string;
  city: string;
  note: string;
  deliveryType: 0 | 1;
  marketingConsent: boolean;
};

const emptyForm: FormState = {
  name: "",
  phone: "",
  alternativePhone: "",
  email: "",
  address: "",
  area: "",
  city: "",
  note: "",
  deliveryType: 0,
  marketingConsent: false,
};

export default function CheckoutContent({
  products,
}: {
  products: MaanikoProduct[];
}) {
  const searchParams = useSearchParams();
  const { cartItems, isHydrated, ensureCartSynced, clearCartAfterOrder } =
    useShop();

  const [form, setForm] = useState<FormState>(emptyForm);
  const [quote, setQuote] = useState<OrderQuote | null>(null);
  const [quoteError, setQuoteError] = useState("");
  const [quoteLoading, setQuoteLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState<any>(null);
  const [submitError, setSubmitError] = useState("");

  const isDirectCheckout = searchParams.get("mode") === "buy-now";
  const requestedId = searchParams.get("productId") ?? "";
  const requestedQuantity = Math.max(
    1,
    Number.parseInt(searchParams.get("quantity") ?? "1", 10) || 1,
  );

  const directProduct = isDirectCheckout
    ? products.find((product) => product.id === requestedId)
    : undefined;

  const directItem = useMemo(() => {
    if (!directProduct) return undefined;
    return directProduct.productType === "combo"
      ? {
          itemType: "COMBO" as const,
          comboId: directProduct.id,
          quantity: requestedQuantity,
        }
      : {
          itemType: "PRODUCT" as const,
          productId: directProduct.id,
          quantity: requestedQuantity,
        };
  }, [directProduct, requestedQuantity]);

  const quoteInput = useMemo(
    () =>
      isDirectCheckout
        ? { mode: "BUY_NOW" as const, item: directItem }
        : { mode: "CART" as const },
    [directItem, isDirectCheckout],
  );

  const money = useMemo(
    () =>
      new Intl.NumberFormat("bn-BD", {
        style: "currency",
        currency: "BDT",
        currencyDisplay: "narrowSymbol",
        maximumFractionDigits: 0,
      }),
    [],
  );

  useEffect(() => {
    const saved = getSavedContact();
    setForm((current) => ({
      ...current,
      name: saved.name || current.name,
      phone: saved.phone || current.phone,
    }));
  }, []);

  useEffect(() => {
    if (!isDirectCheckout && !isHydrated) return;

    let cancelled = false;

    async function loadQuote() {
      setQuoteLoading(true);
      setQuoteError("");
      try {
        if (!isDirectCheckout) await ensureCartSynced();

        await commerceApi
          .track({
            type: "CHECKOUT_STARTED",
            path: "/checkout",
            metadata: {
              mode: isDirectCheckout ? "BUY_NOW" : "CART",
              localCartCount: cartItems.length,
            },
          })
          .catch(() => undefined);

        const nextQuote = await commerceApi.quoteOrder(quoteInput);
        if (!cancelled) setQuote(nextQuote);
      } catch (error) {
        if (!cancelled) {
          setQuote(null);
          setQuoteError(
            error instanceof Error
              ? error.message
              : "অর্ডারের মূল্য যাচাই করা যায়নি",
          );
        }
      } finally {
        if (!cancelled) setQuoteLoading(false);
      }
    }

    void loadQuote();
    return () => {
      cancelled = true;
    };
  }, [
    cartItems.length,
    ensureCartSynced,
    isDirectCheckout,
    isHydrated,
    quoteInput,
  ]);

  useEffect(() => {
    const hasAnyDraft = Object.entries(form).some(
      ([key, value]) =>
        key !== "marketingConsent" &&
        typeof value === "string" &&
        value.trim().length > 0,
    );
    if (!hasAnyDraft) return;

    const timer = window.setTimeout(() => {
      void commerceApi
        .saveCheckoutDraft({
          name: form.name,
          phone: form.phone,
          email: form.email,
          address: form.address,
          area: form.area,
          city: form.city,
          note: form.note,
        })
        .then((result) => saveCustomerIdentity(result))
        .catch(() => undefined);
    }, 700);

    return () => window.clearTimeout(timer);
  }, [form]);

  function change<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  async function fieldBlur(field: keyof FormState) {
    if (field === "marketingConsent") return;
    try {
      const result = await commerceApi.saveCheckoutDraft({
        name: form.name,
        phone: form.phone,
        email: form.email,
        address: form.address,
        area: form.area,
        city: form.city,
        note: form.note,
        completedField: field,
      });
      saveCustomerIdentity(result);
    } catch {
      // A draft failure should never block checkout typing.
    }
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setSubmitError("");

    try {
      if (!isDirectCheckout) await ensureCartSynced();

      const result = await commerceApi.createOrder({
        ...quoteInput,
        customer: form,
      });

      saveCustomerIdentity(result);
      if (!isDirectCheckout) clearCartAfterOrder();
      setOrderResult(result.order);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "অর্ডার সম্পন্ন করা যায়নি",
      );
      try {
        setQuote(await commerceApi.quoteOrder(quoteInput));
      } catch {
        // Keep the original submit error.
      }
    } finally {
      setSubmitting(false);
    }
  }

  if (!isDirectCheckout && !isHydrated) {
    return (
      <div className="grid min-h-[65vh] place-items-center bg-[#fff9fb]">
        <LoaderCircle className="size-8 animate-spin text-[#FC5689]" />
      </div>
    );
  }

  if (orderResult) {
    return (
      <section className="grid min-h-[72vh] place-items-center bg-[#fff9fb] px-4 py-12">
        <div className="w-full max-w-lg rounded-[28px] border border-emerald-100 bg-white p-7 text-center shadow-xl">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-500 text-white">
            <CheckCircle2 className="size-8" />
          </span>
          <h1 className="mt-5 text-2xl font-black text-[#062a54]">
            অর্ডার সফলভাবে গ্রহণ করা হয়েছে
          </h1>
          <p className="mt-2 text-sm text-slate-500">আপনার Order ID:</p>
          <p className="mt-1 text-lg font-black text-[#FC5689]">
            {orderResult.orderNumber}
          </p>
          <p className="mt-3 text-sm text-slate-500">
            বর্তমান status: <strong>{orderResult.status}</strong>
          </p>
          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            <Link
              href="/my-account"
              className="flex h-11 items-center justify-center rounded-xl bg-[#062a54] text-sm font-black text-white"
            >
              অর্ডার Status দেখুন
            </Link>
            <Link
              href="/shop"
              className="flex h-11 items-center justify-center rounded-xl bg-[#FC5689] text-sm font-black text-white"
            >
              আরও পণ্য দেখুন
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (quoteLoading) {
    return (
      <div className="grid min-h-[65vh] place-items-center bg-[#fff9fb]">
        <div className="text-center">
          <LoaderCircle className="mx-auto size-8 animate-spin text-[#FC5689]" />
          <p className="mt-3 text-sm font-bold text-slate-500">
            Backend থেকে current price ও stock যাচাই হচ্ছে...
          </p>
        </div>
      </div>
    );
  }

  if (!quote) {
    return (
      <section className="grid min-h-[70vh] place-items-center bg-[#fff9fb] px-4">
        <div className="max-w-md rounded-2xl bg-white p-6 text-center shadow">
          <ShoppingBag className="mx-auto size-10 text-[#FC5689]" />
          <h1 className="mt-4 text-lg font-black text-[#062a54]">
            চেকআউট করা যাচ্ছে না
          </h1>
          <p className="mt-2 text-sm text-red-600">{quoteError}</p>
          <Link
            href="/shop"
            className="mt-5 inline-flex h-11 items-center rounded-xl bg-[#FC5689] px-5 text-sm font-black text-white"
          >
            শপে ফিরে যান
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#fff9fb] py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-xs font-black text-[#FC5689]">
            {isDirectCheckout ? "সরাসরি অর্ডার" : "কার্ট চেকআউট"}
          </p>
          <h1 className="mt-1 text-2xl font-black text-[#062a54] md:text-3xl">
            অর্ডার সম্পন্ন করুন
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-500">
            নিচের total backend থেকে বর্তমান price, stock এবং customized
            Solution Box configuration যাচাই করে হিসাব করা হয়েছে।
          </p>
        </div>

        <form
          onSubmit={submit}
          className="grid items-start gap-6 lg:grid-cols-[1fr_420px]"
        >
          <div className="rounded-[24px] bg-white p-5 shadow-[0_8px_24px_rgba(6,42,84,.045)] md:p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-[#062a54]">
                ডেলিভারি তথ্য
              </h2>
              <LockKeyhole className="size-5 text-emerald-500" />
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field
                label="পুরো নাম"
                value={form.name}
                onChange={(value) => change("name", value)}
                onBlur={() => void fieldBlur("name")}
                required
              />
              <Field
                label="ফোন নম্বর"
                value={form.phone}
                onChange={(value) => change("phone", value)}
                onBlur={() => void fieldBlur("phone")}
                inputMode="tel"
                required
                hint="এই নাম+নম্বর দিয়ে পরে অন্য ডিভাইস থেকেও order/cart history ফিরিয়ে আনতে পারবেন।"
              />
              <Field
                label="বিকল্প ফোন নম্বর (ঐচ্ছিক)"
                value={form.alternativePhone}
                onChange={(value) => change("alternativePhone", value)}
                onBlur={() => undefined}
                inputMode="tel"
                hint="মূল নম্বরে যোগাযোগ না হলে কুরিয়ার এই নম্বরে কল করবে।"
              />
              <Field
                label="ইমেইল (ঐচ্ছিক)"
                value={form.email}
                onChange={(value) => change("email", value)}
                onBlur={() => void fieldBlur("email")}
                type="email"
              />
              <Field
                label="এলাকা"
                value={form.area}
                onChange={(value) => change("area", value)}
                onBlur={() => void fieldBlur("area")}
              />
              <Field
                label="শহর"
                value={form.city}
                onChange={(value) => change("city", value)}
                onBlur={() => void fieldBlur("city")}
              />
              <label className="block text-sm font-bold text-[#062a54]">
                ডেলিভারি ধরন
                <select
                  value={form.deliveryType}
                  onChange={(event) =>
                    change(
                      "deliveryType",
                      Number(event.target.value) === 1 ? 1 : 0,
                    )
                  }
                  className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 outline-none focus:border-[#FC5689]"
                >
                  <option value={0}>বাসায় ডেলিভারি</option>
                  <option value={1}>Steadfast Hub থেকে সংগ্রহ</option>
                </select>
              </label>
            </div>

            <label className="mt-4 block text-sm font-bold text-[#062a54]">
              সম্পূর্ণ ডেলিভারি ঠিকানা
              <textarea
                required
                value={form.address}
                onChange={(event) => change("address", event.target.value)}
                onBlur={() => void fieldBlur("address")}
                rows={3}
                maxLength={250}
                className="mt-1.5 w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-[#FC5689]"
              />
              <span className="mt-1 block text-[11px] font-medium text-slate-400">
                বাড়ি/ফ্ল্যাট, রোড, থানা ও জেলার তথ্য দিন—সর্বোচ্চ ২৫০ অক্ষর।
              </span>
            </label>

            <label className="mt-4 block text-sm font-bold text-[#062a54]">
              অর্ডার নোট (ঐচ্ছিক)
              <textarea
                value={form.note}
                onChange={(event) => change("note", event.target.value)}
                onBlur={() => void fieldBlur("note")}
                rows={2}
                className="mt-1.5 w-full rounded-xl border border-slate-200 p-3 outline-none focus:border-[#FC5689]"
              />
            </label>

            <label className="mt-4 flex items-start gap-2 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-500">
              <input
                type="checkbox"
                checked={form.marketingConsent}
                onChange={(event) =>
                  change("marketingConsent", event.target.checked)
                }
                className="mt-1"
              />
              Maaniko-এর অফার ও নতুন পণ্যের খবর WhatsApp-এ পেতে চাই। এই consent
              optional; অর্ডারের জন্য প্রয়োজন নেই।
            </label>
          </div>

          <aside className="rounded-[24px] bg-white p-5 shadow-[0_8px_24px_rgba(6,42,84,.045)] lg:sticky lg:top-24">
            <h2 className="text-lg font-black text-[#062a54]">অর্ডার সারাংশ</h2>

            <div className="mt-4 space-y-3">
              {quote.items.map((item) => (
                <div
                  key={item.clientKey}
                  className="rounded-xl bg-slate-50 p-3 ring-1 ring-[#edf1f5]"
                >
                  <div className="flex gap-3">
                    <img
                      src={item.image ?? ""}
                      alt=""
                      className="size-14 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-xs font-black text-[#062a54]">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.quantity} × {money.format(item.unitPrice)}
                      </p>
                      <p className="mt-1 text-sm font-black text-[#FC5689]">
                        {money.format(item.lineTotal)}
                      </p>
                    </div>
                  </div>

                  {item.customConfig?.length ? (
                    <details className="mt-2 border-t border-[#eef1f5] pt-2">
                      <summary className="cursor-pointer text-[11px] font-bold text-[#03A7FD]">
                        Customized Box-এর items
                      </summary>
                      <div className="mt-2 space-y-1">
                        {item.customConfig.map((component) => (
                          <div
                            key={component.productId}
                            className="flex justify-between gap-2 text-[11px] text-slate-500"
                          >
                            <span>{component.name}</span>
                            <strong>× {component.quantity}</strong>
                          </div>
                        ))}
                      </div>
                    </details>
                  ) : null}
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-2 border-t border-[#eef1f5] pt-4 text-sm">
              <div className="flex justify-between text-slate-500">
                <span>পণ্যের মূল্য</span>
                <span>{money.format(quote.subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>ডেলিভারি</span>
                <span>
                  {quote.deliveryCharge === 0
                    ? "ফ্রি"
                    : money.format(quote.deliveryCharge)}
                </span>
              </div>
              <div className="flex justify-between border-t border-[#eef1f5] pt-3 text-lg font-black text-[#062a54]">
                <span>সর্বমোট</span>
                <span>{money.format(quote.total)}</span>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-xl bg-emerald-50 p-3 text-xs font-bold leading-5 text-emerald-700">
              <Truck className="mt-0.5 size-4 shrink-0" />
              Cash on Delivery — অর্ডার submit-এর সময় backend আবার stock
              atomically যাচাই করবে।
            </div>

            {submitError ? (
              <p className="mt-3 rounded-xl bg-red-50 p-3 text-xs font-bold text-red-600">
                {submitError}
              </p>
            ) : null}

            <button
              disabled={submitting}
              className="mt-4 flex h-12 w-full items-center justify-center rounded-xl bg-[#FC5689] text-sm font-black text-white disabled:opacity-60"
            >
              {submitting ? "অর্ডার তৈরি হচ্ছে..." : "অর্ডার নিশ্চিত করুন"}
            </button>
          </aside>
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  onBlur,
  required,
  type = "text",
  inputMode,
  hint,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  required?: boolean;
  type?: string;
  inputMode?: "text" | "tel" | "email" | "numeric";
  hint?: string;
}) {
  return (
    <label className="block text-sm font-bold text-[#062a54]">
      {label}
      <input
        required={required}
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
        className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 px-3 outline-none focus:border-[#FC5689]"
      />
      {hint ? (
        <span className="mt-1 block text-[11px] font-medium leading-4 text-slate-400">
          {hint}
        </span>
      ) : null}
    </label>
  );
}
