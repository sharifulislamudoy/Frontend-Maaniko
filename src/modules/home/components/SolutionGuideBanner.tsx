import type { Banner } from "@/modules/home/types/banner";
import HeroSlider from "./HeroSlider";

export default function SolutionGuideBanner({
  banners,
}: {
  banners: Banner[];
}) {
  return (
    <HeroSlider
      banners={banners}
      ariaLabel="সমস্যার সহজ সমাধান গাইড"
      headingTag="h2"
    />
  );
}
