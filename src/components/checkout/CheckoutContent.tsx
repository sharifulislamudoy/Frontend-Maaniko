"use client";

/* eslint-disable @next/next/no-img-element */

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  LockKeyhole,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useSearchParams } from "next/navigation";

import { useLanguage } from "@/context/LanguageContext";
import { useShop } from "@/context/ShopContext";
import { fakeProducts } from "@/data/fakeProducts";
import type { CartItem } from "@/types/shop";

const FREE_DELIVERY_MINIMUM = 2000;
const DELIVERY_CHARGE = 120;

const checkoutCopy = {
  bn: {
    checkout: "চেকআউট",
    directPurchase: "সরাসরি কেনাকাটা",
    cartCheckout: "কার্ট চেকআউট",
    directDescription:
      "শুধু নির্বাচিত পণ্যটি অর্ডার হবে। আপনার কার্ট অপরিবর্তিত থাকবে।",
    cartDescription: "কার্টের পণ্যগুলো যাচাই করে ডেলিভারি তথ্য দিন।",
    back: "কেনাকাটায় ফিরে যান",
    deliveryInformation: "ডেলিভারি তথ্য",
    fullName: "পুরো নাম",
    fullNamePlaceholder: "আপনার পুরো নাম",
    phone: "ফোন নম্বর",
    email: "ইমেইল ঠিকানা",
    optional: "ঐচ্ছিক",
    address: "সম্পূর্ণ ডেলিভারি ঠিকানা",
    addressPlaceholder: "বাসা, রোড, এলাকা ও নিকটস্থ পরিচিত স্থান",
    area: "এলাকা",
    areaPlaceholder: "আপনার এলাকা",
    city: "শহর",
    note: "অর্ডার নোট",
    notePlaceholder: "ডেলিভারি সম্পর্কিত বিশেষ নির্দেশনা",
    cashOnDelivery: "ক্যাশ অন ডেলিভারি",
    cashOnDeliveryDescription: "পণ্য পাওয়ার পরে কুরিয়ারকে মূল্য পরিশোধ করুন।",
    orderSummary: "অর্ডার সারাংশ",
    item: "টি পণ্য",
    quantity: "পরিমাণ",
    subtotal: "পণ্যের মূল্য",
    delivery: "ডেলিভারি",
    free: "ফ্রি",
    total: "সর্বমোট",
    confirmOrder: "অর্ডার নিশ্চিত করুন",
    securityNote:
      "অর্ডার তৈরির আগে backend থেকে পণ্যের মূল্য ও স্টক পুনরায় যাচাই করতে হবে।",
    loading: "কার্ট লোড হচ্ছে",
    emptyTitle: "চেকআউট করার মতো কোনো পণ্য নেই",
    emptyDirect: "পণ্যটি পাওয়া যায়নি, স্টক শেষ অথবা checkout link-টি সঠিক নয়।",
    emptyCart: "আপনার কার্ট বর্তমানে খালি।",
    browseProducts: "পণ্য দেখুন",
    readyTitle: "অর্ডারের তথ্য প্রস্তুত হয়েছে",
    readyDescription:
      "Direct checkout flow সম্পূর্ণ হয়েছে। অর্ডার save ও process করতে marked handler-টি NestJS order API-এর সঙ্গে connect করুন।",
    continueShopping: "কেনাকাটা চালিয়ে যান",
  },
  en: {
    checkout: "Checkout",
    directPurchase: "Direct purchase",
    cartCheckout: "Cart checkout",
    directDescription:
      "Only the selected product will be ordered. Your cart stays unchanged.",
    cartDescription:
      "Review the products in your cart and enter the delivery information.",
    back: "Back to shopping",
    deliveryInformation: "Delivery information",
    fullName: "Full name",
    fullNamePlaceholder: "Your full name",
    phone: "Phone number",
    email: "Email address",
    optional: "optional",
    address: "Full delivery address",
    addressPlaceholder: "House, road, area and nearby landmark",
    area: "Area",
    areaPlaceholder: "Your area",
    city: "City",
    note: "Order note",
    notePlaceholder: "Special delivery instructions",
    cashOnDelivery: "Cash on delivery",
    cashOnDeliveryDescription: "Pay the courier after receiving your order.",
    orderSummary: "Order summary",
    item: "items",
    quantity: "Quantity",
    subtotal: "Subtotal",
    delivery: "Delivery",
    free: "Free",
    total: "Total",
    confirmOrder: "Confirm order",
    securityNote:
      "Product price and stock must be revalidated by the backend before creating the order.",
    loading: "Loading cart",
    emptyTitle: "Nothing to checkout",
    emptyDirect:
      "This product is unavailable, out of stock or the checkout link is invalid.",
    emptyCart: "Your cart is currently empty.",
    browseProducts: "Browse products",
    readyTitle: "Order details are ready",
    readyDescription:
      "The direct checkout flow is complete. Connect the marked handler to your NestJS order API to save and process the order.",
    continueShopping: "Continue shopping",
  },
} as const;

export default function CheckoutContent() {
  const searchParams = useSearchParams();
  const { language, localize } = useLanguage();
  const { cartItems, isHydrated } = useShop();
  const [orderPrepared, setOrderPrepared] = useState(false);
  const copy = checkoutCopy[language];

  const isDirectCheckout = searchParams.get("mode") === "buy-now";
  const productId = searchParams.get("productId") ?? "";
  const requestedQuantity = Number.parseInt(
    searchParams.get("quantity") ?? "1",
    10,
  );

  const directProduct = isDirectCheckout
    ? fakeProducts.find((product) => product.id === productId)
    : undefined;

  const checkoutItems = useMemo<CartItem[]>(() => {
    if (!isDirectCheckout) return cartItems;
    if (!directProduct || directProduct.stock <= 0) return [];

    const safeQuantity = Math.min(
      directProduct.stock,
      Number.isFinite(requestedQuantity) && requestedQuantity > 0
        ? requestedQuantity
        : 1,
    );

    return [{ product: directProduct, quantity: safeQuantity }];
  }, [cartItems, directProduct, isDirectCheckout, requestedQuantity]);

  const itemCount = checkoutItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const subtotal = checkoutItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  const deliveryCharge =
    subtotal >= FREE_DELIVERY_MINIMUM ? 0 : DELIVERY_CHARGE;
  const total = subtotal + deliveryCharge;

  const priceFormatter = useMemo(
    () =>
      new Intl.NumberFormat(language === "bn" ? "bn-BD" : "en-BD", {
        style: "currency",
        currency: "BDT",
        currencyDisplay: "narrowSymbol",
        maximumFractionDigits: 0,
      }),
    [language],
  );

  const numberFormatter = useMemo(
    () => new Intl.NumberFormat(language === "bn" ? "bn-BD" : "en-BD"),
    [language],
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const orderPayload = {
      checkoutMode: isDirectCheckout ? "BUY_NOW" : "CART",
      customer: {
        name: String(formData.get("name") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        email: String(formData.get("email") ?? ""),
        address: String(formData.get("address") ?? ""),
        area: String(formData.get("area") ?? ""),
        city: String(formData.get("city") ?? ""),
        note: String(formData.get("note") ?? ""),
      },
      paymentMethod: "CASH_ON_DELIVERY",
      items: checkoutItems.map(({ product, quantity }) => ({
        productId: product.id,
        quantity,
      })),
    };

    // Send orderPayload to the NestJS order endpoint here.
    // The backend must load current prices and stock using productId.
    console.info("Maaniko order payload", orderPayload);

    setOrderPrepared(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!isDirectCheckout && !isHydrated) {
    return (
      <section
        aria-label={copy.loading}
        className="grid min-h-[60vh] place-items-center bg-[#fff9fb] px-4"
      >
        <div className="size-9 animate-spin rounded-full border-2 border-[#dce3ec] border-t-[#FC5689]" />
      </section>
    );
  }

  if (orderPrepared) {
    return (
      <section className="grid min-h-[70vh] place-items-center bg-[#fff9fb] px-4 py-16">
        <div className="w-full max-w-lg rounded-[28px] border border-[#FC5689]/20 bg-white p-7 text-center shadow-[0_24px_70px_rgba(6,42,84,0.12)] sm:p-10">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-[#FC5689] text-white">
            <CheckCircle2 size={32} aria-hidden="true" />
          </span>
          <h1 className="mt-6 text-2xl font-black text-[#062a54] sm:text-3xl">
            {copy.readyTitle}
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            {copy.readyDescription}
          </p>
          <Link
            href="/"
            className="mt-7 inline-flex h-12 items-center justify-center rounded-xl bg-[#FC5689] px-7 text-sm font-extrabold text-white transition-colors hover:bg-[#03A7FD]"
          >
            {copy.continueShopping}
          </Link>
        </div>
      </section>
    );
  }

  if (checkoutItems.length === 0) {
    return (
      <section className="grid min-h-[70vh] place-items-center bg-[#fff9fb] px-4 py-16">
        <div className="w-full max-w-lg rounded-[28px] border border-[#dce3ec] bg-white p-7 text-center shadow-[0_18px_55px_rgba(6,42,84,0.08)] sm:p-10">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-[#fff4f6] text-[#FC5689]">
            <ShoppingBag size={29} aria-hidden="true" />
          </span>
          <h1 className="mt-6 text-2xl font-black text-[#062a54]">
            {copy.emptyTitle}
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">
            {isDirectCheckout ? copy.emptyDirect : copy.emptyCart}
          </p>
          <Link
            href="/"
            className="mt-7 inline-flex h-12 items-center justify-center rounded-xl bg-[#FC5689] px-7 text-sm font-extrabold text-white transition-colors hover:bg-[#03A7FD]"
          >
            {copy.browseProducts}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#fff9fb] py-7 sm:py-10 lg:py-14">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition-colors hover:text-[#FC5689]"
        >
          <ArrowLeft size={17} aria-hidden="true" />
          {copy.back}
        </Link>

        <div className="mt-5">
          <p
            className={`text-[10px] font-extrabold uppercase text-[#03A7FD] ${
              language === "en" ? "tracking-[0.2em]" : "tracking-normal"
            }`}
          >
            {isDirectCheckout ? copy.directPurchase : copy.cartCheckout}
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-[#062a54] sm:text-4xl">
            {copy.checkout}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            {isDirectCheckout
              ? copy.directDescription
              : copy.cartDescription}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-10"
        >
          <div className="rounded-[26px] border border-[#dce3ec] bg-white p-5 shadow-[0_16px_45px_rgba(6,42,84,0.07)] sm:p-7">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-black text-[#062a54]">
                {copy.deliveryInformation}
              </h2>
              <LockKeyhole
                size={19}
                className="text-[#FC5689]"
                aria-hidden="true"
              />
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-xs font-bold text-[#062a54]">
                {copy.fullName}
                <input
                  name="name"
                  required
                  autoComplete="name"
                  className="h-12 rounded-xl border border-[#dce3ec] bg-white px-4 text-sm text-[#062a54] outline-none transition placeholder:text-slate-400 focus:border-[#FC5689] focus:ring-4 focus:ring-[#FC5689]/10"
                  placeholder={copy.fullNamePlaceholder}
                />
              </label>

              <label className="grid gap-2 text-xs font-bold text-[#062a54]">
                {copy.phone}
                <input
                  name="phone"
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  pattern="01[3-9][0-9]{8}"
                  className="h-12 rounded-xl border border-[#dce3ec] bg-white px-4 text-sm text-[#062a54] outline-none transition placeholder:text-slate-400 focus:border-[#FC5689] focus:ring-4 focus:ring-[#FC5689]/10"
                  placeholder="01XXXXXXXXX"
                />
              </label>

              <label className="grid gap-2 text-xs font-bold text-[#062a54] sm:col-span-2">
                <span>
                  {copy.email}{" "}
                  <span className="font-normal text-slate-400">
                    ({copy.optional})
                  </span>
                </span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  className="h-12 rounded-xl border border-[#dce3ec] bg-white px-4 text-sm text-[#062a54] outline-none transition placeholder:text-slate-400 focus:border-[#FC5689] focus:ring-4 focus:ring-[#FC5689]/10"
                  placeholder="you@example.com"
                />
              </label>

              <label className="grid gap-2 text-xs font-bold text-[#062a54] sm:col-span-2">
                {copy.address}
                <textarea
                  name="address"
                  required
                  autoComplete="street-address"
                  rows={3}
                  className="resize-none rounded-xl border border-[#dce3ec] bg-white px-4 py-3 text-sm text-[#062a54] outline-none transition placeholder:text-slate-400 focus:border-[#FC5689] focus:ring-4 focus:ring-[#FC5689]/10"
                  placeholder={copy.addressPlaceholder}
                />
              </label>

              <label className="grid gap-2 text-xs font-bold text-[#062a54]">
                {copy.area}
                <input
                  name="area"
                  required
                  className="h-12 rounded-xl border border-[#dce3ec] bg-white px-4 text-sm text-[#062a54] outline-none transition placeholder:text-slate-400 focus:border-[#FC5689] focus:ring-4 focus:ring-[#FC5689]/10"
                  placeholder={copy.areaPlaceholder}
                />
              </label>

              <label className="grid gap-2 text-xs font-bold text-[#062a54]">
                {copy.city}
                <input
                  name="city"
                  required
                  autoComplete="address-level2"
                  className="h-12 rounded-xl border border-[#dce3ec] bg-white px-4 text-sm text-[#062a54] outline-none transition placeholder:text-slate-400 focus:border-[#FC5689] focus:ring-4 focus:ring-[#FC5689]/10"
                  placeholder="Dhaka"
                />
              </label>

              <label className="grid gap-2 text-xs font-bold text-[#062a54] sm:col-span-2">
                <span>
                  {copy.note}{" "}
                  <span className="font-normal text-slate-400">
                    ({copy.optional})
                  </span>
                </span>
                <textarea
                  name="note"
                  rows={3}
                  className="resize-none rounded-xl border border-[#dce3ec] bg-white px-4 py-3 text-sm text-[#062a54] outline-none transition placeholder:text-slate-400 focus:border-[#FC5689] focus:ring-4 focus:ring-[#FC5689]/10"
                  placeholder={copy.notePlaceholder}
                />
              </label>
            </div>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#03A7FD]/20 bg-[#03A7FD]/[0.055] p-4">
              <Truck
                size={19}
                className="mt-0.5 shrink-0 text-[#03A7FD]"
                aria-hidden="true"
              />
              <div>
                <p className="text-sm font-black text-[#062a54]">
                  {copy.cashOnDelivery}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {copy.cashOnDeliveryDescription}
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-[26px] border border-[#dce3ec] bg-white p-5 shadow-[0_16px_45px_rgba(6,42,84,0.08)] sm:p-6 lg:sticky lg:top-24">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-black text-[#062a54]">
                {copy.orderSummary}
              </h2>
              <span className="rounded-full bg-[#fff4f6] px-2.5 py-1 text-[10px] font-extrabold text-[#FC5689]">
                {numberFormatter.format(itemCount)} {copy.item}
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {checkoutItems.map(({ product, quantity }) => (
                <article
                  key={product.id}
                  className="grid grid-cols-[68px_1fr] gap-3 rounded-2xl border border-[#dce3ec] bg-white p-3"
                >
                  <div className="aspect-square overflow-hidden rounded-xl bg-[#fff4f6]">
                    <img
                      src={product.images[0] ?? ""}
                      alt={localize(product.name)}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="line-clamp-2 text-sm font-extrabold leading-5 text-[#062a54]">
                      {localize(product.name)}
                    </h3>
                    <div className="mt-2 flex items-center justify-between gap-2 text-xs">
                      <span className="font-bold text-slate-500">
                        {copy.quantity}: {numberFormatter.format(quantity)}
                      </span>
                      <span className="font-black text-[#FC5689]">
                        {priceFormatter.format(product.price * quantity)}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <dl className="mt-5 space-y-3 border-t border-[#dce3ec] pt-5 text-sm">
              <div className="flex items-center justify-between gap-3 text-slate-500">
                <dt>{copy.subtotal}</dt>
                <dd className="font-bold text-[#062a54]">
                  {priceFormatter.format(subtotal)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3 text-slate-500">
                <dt>{copy.delivery}</dt>
                <dd className="font-bold text-[#062a54]">
                  {deliveryCharge === 0
                    ? copy.free
                    : priceFormatter.format(deliveryCharge)}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-3 border-t border-[#dce3ec] pt-4">
                <dt className="font-black text-[#062a54]">{copy.total}</dt>
                <dd className="text-xl font-black text-[#FC5689]">
                  {priceFormatter.format(total)}
                </dd>
              </div>
            </dl>

            <button
              type="submit"
              className="mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-[#FC5689] px-6 text-sm font-extrabold text-white shadow-[0_12px_28px_rgba(239,66,119,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#03A7FD]"
            >
              {copy.confirmOrder}
              <CheckCircle2 size={18} aria-hidden="true" />
            </button>

            <p className="mt-3 text-center text-[10px] leading-4 text-slate-400">
              {copy.securityNote}
            </p>
          </aside>
        </form>
      </div>
    </section>
  );
}