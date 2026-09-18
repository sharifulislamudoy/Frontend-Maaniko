"use client";

import { BadgeCheck, Star } from "lucide-react";
import { useEffect, useState } from "react";

import {
  commerceApi,
  type VerifiedProductReview,
} from "@/modules/commerce/lib/client";

export default function ProductReviewsSection({
  productId,
  comboId,
  embedded = false,
}: {
  productId?: string;
  comboId?: string;
  embedded?: boolean;
}) {
  const [reviews, setReviews] = useState<VerifiedProductReview[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const request = productId
      ? commerceApi.getProductReviews(productId)
      : commerceApi.getComboReviews(comboId!);
    void request
      .then((result) => {
        if (!cancelled) setReviews(result.reviews);
      })
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) setLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [comboId, productId]);

  if (loaded && reviews.length === 0) return null;

  return (
    <section
      aria-labelledby="verified-reviews-title"
      className={
        embedded
          ? "mt-6 border-t border-[#dce3ec] pt-5"
          : "rounded-2xl border border-[#dce3ec] bg-white p-4 shadow-[0_12px_36px_rgba(6,42,84,0.05)] md:p-7"
      }
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2
            id="verified-reviews-title"
            className="font-baloo text-lg font-bold text-[#062a54] md:text-2xl"
          >
            {embedded
              ? "Delivered order থেকে নতুন অভিজ্ঞতা"
              : "যাচাইকৃত ক্রেতাদের অভিজ্ঞতা"}
          </h2>
          <p className="mt-0.5 text-xs text-slate-400">
            শুধু delivered order থেকে পাওয়া review
          </p>
        </div>
        <BadgeCheck className="size-7 shrink-0 text-emerald-500" />
      </div>

      {!loaded ? (
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {[0, 1].map((item) => (
            <div
              key={item}
              className="h-28 animate-pulse rounded-2xl bg-slate-100"
            />
          ))}
        </div>
      ) : (
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="rounded-2xl border border-slate-100 bg-[#fffafb] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-bold text-[#062a54]">
                    {review.customerName}
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-400">
                    {new Intl.DateTimeFormat("bn-BD", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }).format(new Date(review.createdAt))}
                  </p>
                </div>
                <div className="flex gap-0.5" aria-label={`${review.rating} star`}>
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      className={`size-3.5 ${
                        index < review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-slate-100 text-slate-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              {review.comment ? (
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {review.comment}
                </p>
              ) : (
                <p className="mt-3 text-xs text-slate-400">
                  Rating দিয়েছেন, লিখিত মতামত দেননি।
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
