import type { Metadata } from "next";

import ProblemSolutionSection from "@/modules/problem-solutions/components/ProblemSolutionSection";
import { getProducts, safeCatalog } from "@/shared/lib/api/catalog";

export const metadata: Metadata = {
  title: "সমস্যা ও সমাধান",
  description:
    "গর্ভাবস্থা থেকে মাতৃত্বের প্রতিটি ধাপে সহায়তার জন্য বাছাই করা Maaniko পণ্যগুলো দেখুন।",
};

export default async function ProblemSolutionPage() {
  const products = await safeCatalog(getProducts(), []);
  return (
    <main className="flex-1 bg-white">
      <ProblemSolutionSection products={products} />
    </main>
  );
}
