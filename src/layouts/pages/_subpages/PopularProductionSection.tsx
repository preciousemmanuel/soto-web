import { Box, Flex, Heading, Text, Link, Icon, Image } from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";
import { Link as RouterLink } from "react-router-dom";
import Pot from "../../../assets/pot.png";
import Laptop from "../../../assets/laptop.png";
import Bag from "../../../assets/bag.png";

export const PopularProductsSection = () => {
  const BestSeller = [Pot, Laptop, Bag, Pot, Laptop, Bag, Pot, Laptop];
  return (
    <Box py={{ base: 8, md: 12 }} bg="white">
      {/* Header Section */}
      <Flex
        justify="space-between"
        align="center"
        px={{ base: 4, md: 8 }}
        direction={{ base: "column", md: "row" }}
        textAlign={{ base: "center", md: "left" }}
        mb={{ base: 6, md: 8 }}
      >
        <Box mb={{ base: 4, md: 0 }}>
          <Heading size={{ base: "md", md: "lg" }} fontFamily="Poppins">
            Best Selling
          </Heading>
          <Text py={2} color="gray.600" fontSize={{ base: "sm", md: "md" }}>
            You have a choice to shop based on categories
          </Text>
        </Box>
        <Link
          as={RouterLink}
          to=""
          color="orange.400"
          fontSize={{ base: "sm", md: "md" }}
        >
          View More <Icon as={FaChevronRight} />
        </Link>
      </Flex>

      {/* Swiper Section */}
      <Swiper
        spaceBetween={16}
        slidesPerView={1} // Starts with one slide
        breakpoints={{
          640: { slidesPerView: 2 }, // Two slides on screens 640px+
          768: { slidesPerView: 3 }, // Three slides on screens 768px+
          1024: { slidesPerView: 4 }, // Four slides on screens 1024px+
          1280: { slidesPerView: 5 }, // Five slides on screens 1280px+
        }}
        autoplay={{ delay: 2500 }}
        modules={[Autoplay]}
      >
        {BestSeller.map((best, i) => (
          <SwiperSlide key={i}>
            <Box
              w="100%"
              h={{ base: "200px", md: "300px", lg: "350px" }}
              bg="gray.300"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="md"
            >
              <Image src={best} w="100%" h="100%" objectFit="cover" />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
export default PopularProductsSection;