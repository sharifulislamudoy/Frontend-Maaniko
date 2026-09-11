"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function GuideError({ reset }: { reset: () => void }) {
  const router = useRouter();
  return (
    <div className="mx-auto max-w-xl px-5 py-16 text-center text-[#062a54]">
      <h2 className="text-2xl font-bold">গাইড লোড করা যায়নি</h2>
      <p className="my-4">
        সংযোগে সাময়িক সমস্যা হয়েছে। একটু পরে আবার চেষ্টা করুন।
      </p>
      <button
        onClick={() => {
          router.refresh();
          reset();
        }}
        className="rounded-xl bg-[#ef4277] px-5 py-3 font-semibold text-white"
      >
        আবার চেষ্টা করুন
      </button>
      <Link href="/" className="ml-4 underline">
        হোমে ফিরুন
      </Link>
    </div>
  );
}
