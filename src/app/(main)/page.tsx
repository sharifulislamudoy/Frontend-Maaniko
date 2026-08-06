import HeroSlider from "@/components/home/HeroSlider";
import PopularProductsSection from "@/components/home/PopularProductsSection";

export default function HomePage() {
  return (
    <div className="overflow-hidden bg-white">
      <HeroSlider />
      <PopularProductsSection />
    </div>
  );
}