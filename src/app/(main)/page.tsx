"use client";

import ProductCard from "@/components/product/ProductCard";
import HeroSlider from "@/components/home/HeroSlider";
import { useLanguage } from "@/context/LanguageContext";
import { fakeProducts } from "@/data/fakeProducts";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="bg-white">
      <HeroSlider />

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mb-7">
          <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.2em] text-[#ef4277]">
            {t("home.collection")}
          </p>
          <h1 className="text-2xl font-black tracking-tight text-[#062a54] sm:text-3xl">
            {t("home.popularProducts")}
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-5 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {fakeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
