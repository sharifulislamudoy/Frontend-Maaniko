function SkeletonBlock({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-slate-200/80 ${className}`} />;
}

export default function ProductDetailsLoading() {
  return (
    <main className="min-h-screen bg-[#fff9fb] pb-24 pt-4 sm:pt-6 xl:pb-0">
      <div className="mx-auto w-full max-w-7xl space-y-5 overflow-hidden px-3 sm:px-4 lg:px-6">
        <div className="rounded-2xl border border-[#dce3ec] bg-white px-4 py-3">
          <SkeletonBlock className="h-4 w-56 max-w-full" />
        </div>

        <div className="grid items-start gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-2xl border border-[#dce3ec] bg-white p-3 sm:p-4">
            <SkeletonBlock className="aspect-square w-full rounded-2xl" />
            <div className="mt-4 flex gap-2">
              {Array.from({ length: 5 }, (_, index) => (
                <SkeletonBlock key={index} className="size-16 shrink-0 sm:size-20" />
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#dce3ec] bg-white p-4 sm:p-5 lg:mt-6">
            <div className="flex gap-2">
              <SkeletonBlock className="h-6 w-20 rounded-full" />
              <SkeletonBlock className="h-6 w-16 rounded-full" />
            </div>
            <SkeletonBlock className="mt-5 h-9 w-4/5" />
            <SkeletonBlock className="mt-4 h-4 w-full" />
            <SkeletonBlock className="mt-2 h-4 w-3/4" />
            <SkeletonBlock className="mt-6 h-10 w-52" />
            <SkeletonBlock className="mt-4 h-5 w-44" />

            <div className="mt-6 grid grid-cols-2 gap-3">
              {Array.from({ length: 4 }, (_, index) => (
                <SkeletonBlock key={index} className="h-[68px]" />
              ))}
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <SkeletonBlock className="h-[52px]" />
              <SkeletonBlock className="h-[52px]" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#dce3ec] bg-white p-2">
          <div className="flex gap-2 overflow-hidden">
            {Array.from({ length: 5 }, (_, index) => (
              <SkeletonBlock key={index} className="h-11 w-28 shrink-0" />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#dce3ec] bg-white p-5 sm:p-7">
          <SkeletonBlock className="h-8 w-52" />
          <SkeletonBlock className="mt-5 h-4 w-full" />
          <SkeletonBlock className="mt-3 h-4 w-5/6" />
          <SkeletonBlock className="mt-3 h-4 w-2/3" />
        </div>
      </div>
    </main>
  );
}
