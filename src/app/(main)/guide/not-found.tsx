import Link from "next/link";

export default function GuideNotFound() {
  return (
    <div className="px-5 py-16 text-center text-[#062a54]">
      <h1 className="text-2xl font-bold">গাইডটি পাওয়া যায়নি</h1>
      <p className="my-3">
        লিংকটি বদলে যেতে পারে অথবা গাইডটি এখন প্রকাশিত নেই।
      </p>
      <Link
        href="/guide"
        className="inline-block rounded-xl bg-[#079fe8] px-5 py-3 font-semibold text-white"
      >
        সব গাইড দেখুন
      </Link>
    </div>
  );
}
