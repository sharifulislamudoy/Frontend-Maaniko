import ComboPackSection from "@/components/home/ComboPackSection";
import HeroSlider from "@/components/home/HeroSlider";
import PopularProductsSection from "@/components/home/PopularProductsSection";
import ShopByJourneySection from "@/components/home/ShopByJourneySection";
import WhyMaanikoSection from "@/components/home/WhyMaanikoSection";

export default function HomePage() {
  return (
    <div className="overflow-hidden bg-white">
      <HeroSlider />
      <ShopByJourneySection />
      <ComboPackSection />
      <PopularProductsSection />
      <WhyMaanikoSection />
    </div>
  );
}
