"use client";

import { useEffect, useMemo, useState } from "react";
import { Minus, Plus, RotateCcw, ShoppingCart, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import type { SolutionBox } from "@/modules/solution-boxes/types/solutionBox";
import { solutionBoxToProduct } from "@/modules/solution-boxes/lib/solutionBox";
import { commerceApi } from "@/modules/commerce/lib/client";
import { useShop } from "@/modules/shop/context/ShopContext";

export default function SolutionBoxCustomizer({ box }: { box: SolutionBox }) {
  const router = useRouter();
  const { addCustomComboToCart } = useShop();
  const defaults = useMemo(
    () =>
      box.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    [box.items],
  );
  const [config, setConfig] = useState(defaults);
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    const timer = window.setTimeout(async () => {
      setLoading(true);
      setError("");
      try {
        setQuote(
          await commerceApi.quoteCombo(box.id, {
            customConfig: config,
            quantity: 1,
          }),
        );
      } catch (err) {
        setQuote(null);
        setError(err instanceof Error ? err.message : "Price হিসাব করা যায়নি");
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => window.clearTimeout(timer);
  }, [box.id, config]);

  function setQuantity(productId: string, quantity: number) {
    setConfig((current) =>
      current.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.max(0, Math.min(20, quantity)) }
          : item,
      ),
    );
  }

  async function add(goCheckout: boolean) {
    if (!quote?.line?.unitPrice) return;
    setLoading(true);
    setError("");
    try {
      const product = solutionBoxToProduct(box);
      await addCustomComboToCart(
        product,
        quote.canonicalConfig,
        quote.line.unitPrice,
      );
      if (goCheckout) router.push("/checkout");
    } catch (err) {
      setError(err instanceof Error ? err.message : "কার্টে যোগ করা যায়নি");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-4 pt-2 md:px-6 lg:px-8">
      <div className="rounded-[24px] border border-[#FC5689]/20 bg-gradient-to-br from-[#fff8fb] to-[#f4fbff] p-4 shadow-[0_18px_55px_rgba(6,42,84,.07)] md:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider text-[#FC5689]">
              Customize your solution
            </p>
            <h2 className="mt-1 text-xl font-black text-[#062a54] md:text-2xl">
              নিজের প্রয়োজন অনুযায়ী Box সাজান
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Quantity বাড়ান/কমিয়ে দিন অথবা প্রয়োজন নেই এমন item remove করুন।
            </p>
          </div>
          <button
            type="button"
            onClick={() => setConfig(defaults)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border bg-white px-4 text-xs font-black text-[#062a54]"
          >
            <RotateCcw className="size-4" /> Reset
          </button>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {box.items.map((relation) => {
            const item = config.find(
              (candidate) => candidate.productId === relation.productId,
            );
            const quantity = item?.quantity ?? 0;
            const product = relation.product;

            return (
              <article
                key={relation.productId}
                className={`flex gap-3 rounded-2xl border bg-white p-3 ${
                  quantity === 0 ? "opacity-55" : ""
                }`}
              >
                <img
                  src={product?.images?.[0] ?? ""}
                  alt=""
                  className="h-20 w-20 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <h3 className="line-clamp-2 text-sm font-black text-[#062a54]">
                    {product?.name ?? relation.productId}
                  </h3>
                  <p className="mt-1 text-xs font-bold text-[#FC5689]">
                    {money.format(product?.price ?? 0)} / item
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    {quantity > 0 ? (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity(relation.productId, quantity - 1)
                          }
                          className="grid size-8 place-items-center rounded-lg border"
                        >
                          <Minus className="size-3.5" />
                        </button>
                        <span className="w-7 text-center text-sm font-black">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity(relation.productId, quantity + 1)
                          }
                          className="grid size-8 place-items-center rounded-lg border"
                        >
                          <Plus className="size-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setQuantity(relation.productId, 0)}
                          className="ml-1 grid size-8 place-items-center rounded-lg bg-red-50 text-red-500"
                          aria-label="Remove item"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setQuantity(relation.productId, 1)}
                        className="inline-flex h-8 items-center gap-1 rounded-lg bg-[#03A7FD]/10 px-3 text-xs font-black text-[#0278ad]"
                      >
                        <Plus className="size-3.5" /> আবার যোগ করুন
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-5 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold text-slate-400">
                Customized Box-এর final price
              </p>
              <p className="mt-1 text-2xl font-black text-[#FC5689]">
                {loading && !quote
                  ? "হিসাব হচ্ছে..."
                  : quote
                    ? money.format(quote.line.unitPrice)
                    : "—"}
              </p>
              {quote ? (
                <p className="mt-1 text-xs text-slate-500">
                  আলাদা product value {money.format(quote.retailTotal)} • Box
                  discount ratio apply করা হয়েছে
                </p>
              ) : null}
            </div>
            <div className="flex w-full gap-2 sm:w-auto">
              <button
                type="button"
                disabled={loading || !quote}
                onClick={() => void add(false)}
                className="h-11 flex-1 rounded-xl border border-[#FC5689] px-4 text-xs font-black text-[#FC5689] disabled:opacity-50 sm:flex-none"
              >
                <ShoppingCart className="mr-1 inline size-4" />
                কার্টে রাখুন
              </button>
              <button
                type="button"
                disabled={loading || !quote}
                onClick={() => void add(true)}
                className="h-11 flex-1 rounded-xl bg-[#FC5689] px-5 text-xs font-black text-white disabled:opacity-50 sm:flex-none"
              >
                এখনই অর্ডার
              </button>
            </div>
          </div>
          {error ? (
            <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-600">
              {error}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
