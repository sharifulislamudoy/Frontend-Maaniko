"use client";

import ShopByJourneySlider from "@/modules/journeys/components/ShopByJourneySlider";

export default function JourneySliderSection() {
  return (
    <section
      aria-labelledby="shop-by-journey-title"
      className="overflow-hidden bg-white py-6 md:py-9 lg:py-12"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Heading and subheading */}
        <div className="mx-auto mb-7 max-w-4xl text-center md:mb-10 lg:mb-12">
          <h2
            id="shop-by-journey-title"
            className="text-[21px] leading-[1.3] font-black tracking-tight text-[#07183d] md:text-[35px] md:leading-[1.25] lg:text-[42px]"
          >
            {
              <>
                আপনার যাত্রা অনুযায়ী{" "}
                <span className="text-[#db5b8f]">শপ করুন</span>
              </>
            }
          </h2>

          <p className="mt-3 text-[13px] leading-6 font-medium text-[#687086] md:mt-4 md:text-base lg:text-lg">
            {"প্রতিটি ধাপের জন্য সঠিক পণ্য খুঁজুন"}
          </p>
        </div>

        {/* Existing journey slider */}
        <ShopByJourneySlider />

      </div>
    </section>
  );
}
