"use client";

import CareGuideSlider from "@/modules/care-guides/components/CareGuideSlider";

export default function CareGuideSection() {
  return (
    <section
      aria-labelledby="care-guide-title"
      className="overflow-hidden bg-white py-6 md:py-9 lg:py-12"
    >
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        {/* Heading and subheading */}
        <div className="mx-auto mb-7 max-w-4xl text-center md:mb-10 lg:mb-12">
          <h2
            id="care-guide-title"
            className="text-[21px] leading-[1.3] font-black tracking-normal text-[#07183d] md:text-[35px] md:leading-[1.25] lg:text-[42px]"
          >
            {
              <>
                মা ও শিশুর যত্নে{" "}
                <span className="text-[#db5b8f]">প্রয়োজনীয় গাইড</span>
              </>
            }
          </h2>

          <p className="mt-3 text-[13px] leading-6 font-medium text-[#687086] md:mt-4 md:text-base lg:text-lg">
            {"সঠিক যত্নে সহজ ও বিশ্বস্ত নির্দেশনা"}
          </p>
        </div>

        {/* Existing guide slider */}
        <CareGuideSlider />

      </div>
    </section>
  );
}
