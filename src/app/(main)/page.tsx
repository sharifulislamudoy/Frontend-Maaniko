import ComboPackSection from "@/components/home/ComboPackSection";
import HeroSlider from "@/components/home/HeroSlider";
import PopularProductsSection from "@/components/home/PopularProductsSection";
import ShopByJourneySection from "@/components/home/ShopByJourneySection";
import SolutionBoxSection from "../../components/home/SolutionBoxSection";
import WhyMaanikoSection from "@/components/home/WhyMaanikoSection";

export default function HomePage() {
  return (
    <div className="overflow-hidden bg-white">
      <HeroSlider />
      <ShopByJourneySection />
      <SolutionBoxSection />
      <ComboPackSection />
      <PopularProductsSection />
      <WhyMaanikoSection />
    </div>
  );
}
