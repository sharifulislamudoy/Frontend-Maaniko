import ComboPackSection from "@/components/home/ComboPackSection";
import HeroSlider from "@/components/home/HeroSlider";
import PopularProductsSection from "@/components/home/PopularProductsSection";
import WhyMaanikoSection from "@/components/home/WhyMaanikoSection";

export default function HomePage() {
  return (
    <div className="overflow-hidden bg-white">
      <HeroSlider />
      <ComboPackSection />
      <PopularProductsSection />
      <WhyMaanikoSection />
    </div>
  );
}