const ProductCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-[20px] border border-[#dce3ec] bg-white shadow-[0_12px_34px_rgba(6,42,84,0.08)]">
      <div className="aspect-[20/21] animate-pulse bg-[radial-gradient(circle_at_top,#ffffff,#fff4f6_55%,rgba(16,169,232,0.12))]" />

      <div className="space-y-2.5 p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="h-3 w-24 animate-pulse rounded-full bg-[#10a9e8]/15" />
          <div className="h-5 w-16 animate-pulse rounded-full bg-[#10a9e8]/10" />
        </div>
        <div className="h-5 w-full animate-pulse rounded-md bg-[#062a54]/10" />
        <div className="h-5 w-3/5 animate-pulse rounded-md bg-[#062a54]/10" />
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-3 w-4/5 animate-pulse rounded bg-slate-100" />
        </div>
        <div className="flex items-center justify-between border-t border-[#dce3ec]/80 pt-2.5">
          <div className="h-6 w-24 animate-pulse rounded-md bg-[#ef4277]/15" />
          <div className="h-4 w-14 animate-pulse rounded-md bg-amber-100" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
