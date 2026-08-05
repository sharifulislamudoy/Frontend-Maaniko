import Navbar from "@/components/navbar/Navbar";
import { ShopProvider } from "@/context/ShopContext";
import type { MainLayoutProps } from "@/types/layout";

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <ShopProvider>
      <div className="flex min-h-dvh flex-col bg-white text-maaniko-navy">
        <Navbar />
        <main className="flex min-h-0 flex-1 flex-col pb-[72px] sm:pb-[76px] xl:pb-0">
          {children}
        </main>
      </div>
    </ShopProvider>
  );
}
