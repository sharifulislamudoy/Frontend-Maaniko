import CareGuideSection from "@/modules/care-guides/components/CareGuideSection";
import CustomerReviewsSection from "@/modules/home/components/CustomerReviewsSection";
import HeroSlider from "@/modules/home/components/HeroSlider";
import HomeIntroLoader from "@/modules/home/components/HomeIntroLoader";
import NewsletterSection from "@/modules/home/components/NewsletterSection";
import SolutionGuideBanner from "@/modules/home/components/SolutionGuideBanner";
import WhatsAppGuideBanner from "@/modules/home/components/WhatsAppGuideBanner";
import FeaturedJourneysSection from "@/modules/journeys/components/FeaturedJourneysSection";
import JourneySliderSection from "@/modules/journeys/components/JourneySliderSection";
import MotherGuideHubSection from "@/modules/mother-guides/components/MotherGuideHubSection";
import PopularProductsSection from "@/modules/products/components/PopularProductsSection";
import SolutionBoxSection from "@/modules/solution-boxes/components/SolutionBoxSection";
import WhyMaanikoSection from "@/modules/why-maaniko/components/WhyMaanikoSection";

import styles from "./page.module.css";
import {
  getBanners,
  getCombos,
  getProducts,
  safeCatalog,
} from "@/shared/lib/api/catalog";

export default async function HomePage() {
  const [banners, products, boxes] = await Promise.all([
    safeCatalog(getBanners("HOME_HERO"), []),
    safeCatalog(getProducts(), []),
    safeCatalog(getCombos(), []),
  ]);
  return (
    <>
      <HomeIntroLoader />

      <main className={styles.home}>
        <HeroSlider banners={banners} />

        <JourneySliderSection />

        <SolutionBoxSection boxes={boxes} />

        <SolutionGuideBanner />

        <PopularProductsSection
          products={products.filter((product) => product.featured).slice(0, 12)}
        />

        <WhyMaanikoSection />

        <CustomerReviewsSection />

        <CareGuideSection />

        <MotherGuideHubSection />

        <WhatsAppGuideBanner />

        <FeaturedJourneysSection />

        <NewsletterSection />
      </main>
    </>
  );
}
