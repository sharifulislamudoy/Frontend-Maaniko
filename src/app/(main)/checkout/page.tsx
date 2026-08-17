import { Suspense } from "react";

import CheckoutContent from "@/components/checkout/CheckoutContent";

export const metadata = {
  title: "Checkout",
  description: "Complete your Maaniko order.",
};

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fff9fb]" />}>
      <CheckoutContent />
    </Suspense>
  );
}