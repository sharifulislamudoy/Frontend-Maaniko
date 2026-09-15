import styles from "./HeroSlider.module.css";

export default function HeroBannerSkeleton() {
  return (
    <section
      aria-label="ব্যানার লোড হচ্ছে"
      aria-busy="true"
      className="bg-white pb-3 pt-3 md:pb-5 md:pt-5 lg:pb-6"
    >
      <div className="mx-auto w-full max-w-7xl px-3 md:px-6 lg:px-8">
        <div className="relative h-[57vw] min-h-[210px] max-h-[390px] overflow-hidden rounded-[24px] bg-[#f7edf0] shadow-[0_18px_50px_rgba(6,42,84,0.08)] md:h-[43vw] md:max-h-[430px] md:rounded-[30px] lg:h-[390px] xl:h-[410px] xl:max-h-[410px]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#fff4f6] via-[#f4f6f8] to-[#e9edf1]" />
          <div
            className={`${styles.shimmer} absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/65 to-transparent`}
          />

          <div className="absolute inset-y-0 left-0 flex w-[54%] items-center px-4 sm:px-7 md:w-[52%] md:px-10 lg:w-[48%] lg:px-14 xl:px-16">
            <div className="w-full max-w-[440px] space-y-3 md:space-y-4">
              <div className="h-2.5 w-1/3 rounded-full bg-white/80 md:h-3" />
              <div className="h-5 w-11/12 rounded-full bg-white/90 md:h-8" />
              <div className="h-5 w-3/4 rounded-full bg-white/90 md:h-8" />
              <div className="hidden h-3 w-full rounded-full bg-white/70 sm:block" />
              <div className="hidden h-3 w-4/5 rounded-full bg-white/70 sm:block" />
              <div className="h-8 w-24 rounded-lg bg-white/90 sm:h-10 sm:w-32 md:h-11 md:w-36" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
