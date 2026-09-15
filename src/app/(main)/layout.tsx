import { ShopProvider } from "@/modules/shop/context/ShopContext";
import Footer from "@/shared/components/layout/Footer";
import Navbar from "@/shared/components/layout/Navbar";
import type { MainLayoutProps } from "@/shared/types/layout";

/*
 * Vercel server function slow API response-এর জন্য
 * সর্বোচ্চ 60 seconds পর্যন্ত অপেক্ষা করতে পারবে।
 */
export const maxDuration = 60;

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <ShopProvider>
      <div className="flex min-h-dvh flex-col bg-white pb-[72px] text-maaniko-navy md:pb-[76px] xl:pb-0">
        <Navbar />

        <main className="flex min-h-0 flex-1 flex-col">{children}</main>

        <Footer />
      </div>
    </ShopProvider>
  );
}
