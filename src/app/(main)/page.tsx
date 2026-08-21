import CareGuideSection from "@/components/home/CareGuideSection";
import HeroSlider from "@/components/home/HeroSlider";
import PopularProductsSection from "@/components/home/PopularProductsSection";
import ShopByJourneySection from "@/components/home/ShopByJourneySection";
import SolutionBoxSection from "@/components/home/SolutionBoxSection";
import SolutionGuideBanner from "@/components/home/SolutionGuideBanner";
import WhyMaaniko from "@/components/home/WhyMaaniko";
import WhyMaanikoSection from "@/components/home/WhyMaanikoSection";

export default function HomePage() {
  return (
    <div className="overflow-hidden bg-white">
      <HeroSlider />
      <ShopByJourneySection />
      <SolutionBoxSection />
      <SolutionGuideBanner />
      <PopularProductsSection />
      <WhyMaaniko />
      <CareGuideSection />
      <WhyMaanikoSection />
    </div>
  );
}