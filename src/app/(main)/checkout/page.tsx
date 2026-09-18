import { Suspense } from "react";

import CheckoutContent from "@/modules/checkout/components/CheckoutContent";

export const metadata = {
  title: "চেকআউট",
  description: "আপনার Maaniko অর্ডার সম্পন্ন করুন।",
};

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fff9fb]" />}>
      <CheckoutContent />
    </Suspense>
  );
}
