import { Flex, Box, Image as Img, Heading, Text } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";
import { Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import Chancebg from "../../../assets/chancebg.png";

import Slide1 from "../../../assets/slide1.png";
import Slide2 from "../../../assets/slide2.png";
import Slide3 from "../../../assets/slide3.png";

const Chance = () => {
  const swiperImages = [Slide1, Slide2, Slide3];

  return (
    <Flex
      py={{ base: 8, md: 14 }}
      mt={{ base: 10, md: 20 }}
      bgImage={Chancebg}
      bgRepeat="no-repeat"
      bgSize="cover"
      mx={{ base: 10, md: 16 }}
    >
      {/* Text Box */}
      <Box flex="1" p={{ base: 2, md: 20 }} mb={{ base: 8, md: 0 }}>
        <Heading fontSize="40px" mb={2}>
          One last chance
        </Heading>
        <Text color="gray.600" fontSize="24px" mb={2}>
          Save up to
        </Text>
        <Heading fontSize="120px" color="#FF5733" mb={2}>
          30%
        </Heading>
      </Box>

      {/* Swiper Box */}
      <Box flex="1" w="100%" overflow="hidden">
        <Swiper
          effect="fade"
          autoplay={{ delay: 3000 }}
          modules={[Pagination, Autoplay, EffectFade]}
          style={{
            height: "400px",
            borderRadius: "8px",
            maxWidth: "100%",
          }}
        >
          {swiperImages.map((image, index) => (
            <SwiperSlide key={index}>
              <Img
                src={image}
                alt={`Slide ${index + 1}`}
                objectFit="contain"
                maxH="100%"
                maxW="100%"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Flex>
  );
};

export default Chance;
