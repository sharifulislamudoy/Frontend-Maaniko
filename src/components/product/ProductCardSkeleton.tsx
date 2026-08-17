export default function ProductCardSkeleton() {
  return (
    <div className="flex h-full min-w-0 flex-col overflow-hidden rounded-[20px] border border-[#dce3ec] bg-white shadow-[0_12px_34px_rgba(6,42,84,0.08)]">
      <div className="aspect-[20/21] shrink-0 animate-pulse bg-[radial-gradient(circle_at_top,#ffffff,#fff4f6_55%,rgba(16,169,232,0.12))]" />

      <div className="flex flex-1 flex-col space-y-2 p-2.5 sm:space-y-2.5 sm:p-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <div className="h-3 w-16 animate-pulse rounded-full bg-[#03A7FD]/15 sm:w-24" />
          <div className="h-5 w-12 animate-pulse rounded-full bg-[#03A7FD]/10 sm:w-16" />
        </div>

        <div className="h-5 w-full animate-pulse rounded-md bg-[#062a54]/10" />
        <div className="h-5 w-3/5 animate-pulse rounded-md bg-[#062a54]/10" />

        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-3 w-4/5 animate-pulse rounded bg-slate-100" />
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 border-t border-[#dce3ec]/80 pt-2.5">
          <div className="h-5 w-16 animate-pulse rounded-md bg-[#FC5689]/15 sm:h-6 sm:w-24" />
          <div className="h-4 w-10 animate-pulse rounded-md bg-amber-100 sm:w-14" />
        </div>
      </div>
    </div>
  );
}