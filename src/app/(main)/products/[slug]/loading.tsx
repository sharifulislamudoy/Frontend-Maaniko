function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-xl bg-slate-200/80 ${className}`} />
  );
}

export default function ProductDetailsLoading() {
  return (
    <main className="min-h-screen bg-[#fff9fb] pb-24 pt-2 md:pt-5 lg:pb-0">
      <div className="mx-auto w-full max-w-7xl space-y-3 overflow-hidden px-2 md:space-y-5 md:px-4 lg:px-6">
        <div className="rounded-xl border border-[#dce3ec] bg-white px-3 py-2 md:rounded-2xl md:px-4 md:py-3">
          <SkeletonBlock className="h-3.5 w-48 max-w-full md:h-4 md:w-56" />
        </div>

        <div className="grid items-start gap-3 md:gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
          <div className="flex flex-col rounded-2xl border border-[#dce3ec] bg-white p-2 md:p-4 lg:h-full">
            <SkeletonBlock className="aspect-square w-full rounded-xl md:rounded-2xl" />
            <div className="mt-2 flex justify-start gap-2 md:mt-4 lg:mt-auto lg:justify-center lg:pt-4">
              {Array.from({ length: 4 }, (_, index) => (
                <SkeletonBlock
                  key={index}
                  className="aspect-square w-16 shrink-0 md:w-20 lg:w-24"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col rounded-2xl border border-[#dce3ec] bg-white p-3 md:p-5 lg:h-full">
            <SkeletonBlock className="h-5 w-20 rounded-full md:h-6" />
            <SkeletonBlock className="mt-3 h-7 w-4/5 md:mt-5 md:h-9" />
            <SkeletonBlock className="mt-3 h-3.5 w-full md:mt-4 md:h-4" />
            <SkeletonBlock className="mt-2 h-3.5 w-3/4 md:h-4" />
            <SkeletonBlock className="mt-4 h-8 w-44 md:mt-6 md:h-10 md:w-52" />
            <SkeletonBlock className="mt-3 h-4 w-40 md:mt-4 md:h-5 md:w-44" />

            <div className="mt-4 grid grid-cols-2 gap-2 md:mt-6 md:gap-3">
              {Array.from({ length: 2 }, (_, index) => (
                <SkeletonBlock key={index} className="h-14 md:h-[68px]" />
              ))}
            </div>

            <div className="mt-3 border-t border-[#dce3ec] pt-3 md:mt-4 md:pt-4">
              <SkeletonBlock className="h-4 w-36" />
              <div className="mt-2 grid gap-x-4 gap-y-1.5 md:grid-cols-2">
                {Array.from({ length: 4 }, (_, index) => (
                  <SkeletonBlock key={index} className="h-4" />
                ))}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 md:mt-5 lg:mt-auto">
              {Array.from({ length: 3 }, (_, index) => (
                <SkeletonBlock key={index} className="h-12 md:h-[52px]" />
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#dce3ec] bg-white p-1.5 md:p-2">
          <div className="flex gap-1.5 overflow-hidden md:gap-2">
            {Array.from({ length: 3 }, (_, index) => (
              <SkeletonBlock
                key={index}
                className="h-9 w-24 shrink-0 md:h-11 md:w-28 lg:flex-1 lg:basis-0"
              />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#dce3ec] bg-white p-4 md:p-7">
          <SkeletonBlock className="h-6 w-44 md:h-8 md:w-52" />
          <div className="mt-4 grid gap-2 md:mt-5 md:grid-cols-2 md:gap-3">
            {Array.from({ length: 4 }, (_, index) => (
              <SkeletonBlock key={index} className="h-14 md:h-16" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}