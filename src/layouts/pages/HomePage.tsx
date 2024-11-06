import { Box } from "@chakra-ui/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import HeroSection from "./_subpages/Herosection";
import StatsSection from "./_subpages/StatsSection";
import { CategoriesSection } from "./_subpages/CategoriesSection";
import { PopularProductsSection } from "./_subpages/PopularProductionSection";
import TestimonialsSection from "./_subpages/TestimonialSection";
import Chance from "./_subpages/ChanceSection";

const HomePage = () => {
  return (
    <Box mt={20}>
      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <PopularProductsSection />
      <Chance />
      <TestimonialsSection />
    </Box>
  );
};

export default HomePage;
