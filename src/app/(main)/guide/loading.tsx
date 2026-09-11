import HeroBannerSkeleton from "@/modules/home/components/HeroBannerSkeleton";

export default function GuideLoading() {
  return (
    <main role="status" aria-label="গাইড লোড হচ্ছে" className="min-h-screen bg-white">
      <span className="sr-only">গাইড লোড হচ্ছে…</span>
      <HeroBannerSkeleton />
      <div className="mx-auto max-w-7xl space-y-6 px-3 py-5 md:px-6 lg:px-8">
        <div className="h-20 animate-pulse rounded-2xl bg-slate-100 motion-reduce:animate-none" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }, (_, index) => (
            <div
              key={index}
              className="h-64 animate-pulse rounded-2xl bg-slate-100 motion-reduce:animate-none"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
