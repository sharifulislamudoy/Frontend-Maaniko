"use client";
/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { BookOpen } from "lucide-react";

export default function GuideImage({
  src,
  alt,
  className = "",
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  if (!src || failedSrc === src)
    return (
      <div
        role="img"
        aria-label={alt}
        className={`grid place-items-center bg-[#fff1f5] text-[#ef4277] ${className}`}
      >
        <BookOpen className="size-12" />
      </div>
    );
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      className={className}
      onError={() => setFailedSrc(src)}
    />
  );
}
