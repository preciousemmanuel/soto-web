import { Flex, Box, Image as Img } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import Chancebg from "../../../assets/chancebg.png";
import Chanc from "../../../assets/chance.png";
import Slide1 from "../../../assets/chair.png";
import Slide2 from "../../../assets/headset.png";
import Slide3 from "../../../assets/pod.png";

const Chance = () => {
  const swiperImages = [Slide1, Slide2, Slide3];

  return (
    <Flex
      px={{ base: 0, md: 14 }}
      py={{ base: 8, md: 14 }}
      mt={{ base: 10, md: 20 }}
      bgImage={Chancebg}
      bgRepeat="no-repeat"
      bgSize="cover"
      direction={{ base: "column", md: "row" }}
      align="center"
      ml={{ base: 0, md: 10 }}
    >
      {/* Text Box */}
      <Box flex="1" pr={{ base: 2, md: 8 }} mb={{ base: 8, md: 0 }}>
        <Img src={Chanc} w={{ base: "", md: "100%" }} height={"220px"} mx="" />
      </Box>

      {/* Swiper Box */}
      <Box flex="1" w="100%">
        <Swiper
          direction="vertical"
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          modules={[Pagination, Autoplay]}
          style={{
            height: "300px",
            borderRadius: "8px",
          }}
        >
          {swiperImages.map((image, index) => (
            <SwiperSlide key={index}>
              <Img src={image} alt={`Slide ${index + 1}`} objectFit="cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Flex>
  );
};

export default Chance;
