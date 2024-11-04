import {
  Box,
  Button,
  Flex,
  Text,
  Image,
  Icon,
  Link,
  Heading,
  Img,
} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules"; // import Pagination from modules
import { Autoplay } from "swiper/modules"; // import Autoplay from modules

import { Link as RouterLink } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import Best from "../../assets/best.png";
import Quick from "../../assets/quick.png";
import Slide1 from "../../assets/chair.png";
import Slide2 from "../../assets/headset.png";
import Slide3 from "../../assets/pod.png";
import Watch from "../../assets/watch.png";
import Shoe from "../../assets/shoe.png";
import Pot from "../../assets/pot.png";
import Laptop from "../../assets/laptop.png";
import Bag from "../../assets/bag.png";
import Chancebg from "../../assets/chancebg.png";
import Chanc from "../../assets/chance.png";

const image = [Watch, Shoe, Watch, Shoe, Watch];
const BestSeller = [Pot, Laptop, Bag, Pot, Laptop, Bag, Pot, Laptop];

import { useEffect, useState } from "react";

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(Best);

  // Array for Swiper images
  const swiperImages = [Slide1, Slide2, Slide3];

  // Toggle between images
  useEffect(() => {
    const images = [Best, Quick];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % images.length; // alternate between images
      setCurrentImage(images[index]);
    }, 3000); // change every 3 seconds

    return () => clearInterval(interval); // clean up interval on unmount
  }, []);

  return (
    <Flex
      bg="black"
      color="white"
      px={10}
      py={14}
      mt={20}
      direction={{ base: "column", md: "row" }}
      align="center"
    >
      {/* Text Box */}
      <Box flex="1" pr={{ md: 8 }}>
        <Heading size="2xl" mb={4} textAlign={{ base: "center", md: "left" }}>
          {/* Display the current image */}
          <Image src={currentImage} width="470px" />
        </Heading>
        <Text
          mb={4}
          textAlign={{ base: "center", md: "left" }}
          fontSize={"24px"}
        >
          Browse our exclusive collection of products <br /> from top sellers
          with durability and scalability.
        </Text>
        <Button
          as={RouterLink}
          to="/custom-order"
          colorScheme="orange"
          size="lg"
          rounded={"full"}
          height={"60px"}
          width={"250px"}
        >
          Custom Order
        </Button>
      </Box>

      {/* Swiper Box */}
      <Box flex="1">
        <Swiper
          direction="vertical"
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          modules={[Pagination, Autoplay]}
          style={{
            height: "400px",
            borderRadius: "8px",
          }}
        >
          {swiperImages.map((image, index) => (
            <SwiperSlide key={index}>
              <Image src={image} alt={`Slide ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Flex>
  );
};

const StatsSection = () => (
  <Flex
    bg="white"
    py={12}
    justify="space-around"
    wrap="wrap"
    textAlign="center"
  >
    {[
      { text: "1000+", subtext: "Durable Products" },
      { text: "99%", subtext: "Customer Satisfaction Rate" },
      { text: "24/7", subtext: "Shopping Convenience" },
      { text: "50K+", subtext: "Customer Reviews" },
    ].map((item, index) => (
      <Box
        key={index}
        p={6}
        boxShadow="lg"
        borderRadius="md"
        bg="white"
        mb={6}
        width="270px"
      >
        <Heading
          color="black"
          size="lg"
          fontFamily="Poppins"
          fontWeight={"600"}
        >
          {item.text}
        </Heading>
        <Text mt={2} color="gray" fontFamily="Poppins">
          {item.subtext}
        </Text>
      </Box>
    ))}
  </Flex>
);

const CategoriesSection = () => (
  <Box py={12} bg="gray.50">
    <Flex justify="space-between" align="center" px={8}>
      <Box>
        <Heading size="lg" fontFamily={"Poppins"}>
          Popular Categories
        </Heading>
        <Text py={4} color={"gray"}>
          You have a choice to shop based on categories
        </Text>
      </Box>
      <Link as={RouterLink} to="/categories" color="orange.400">
        View More <Icon as={FaChevronRight} />
      </Link>
    </Flex>

    <Swiper
      spaceBetween={16}
      slidesPerView={5}
      autoplay={{ delay: 2500 }}
      modules={[Autoplay]}
      style={{ padding: "20px" }}
    >
      {image.map((img, i) => (
        <SwiperSlide key={i}>
          <Box
            w="100%"
            h="300px"
            bg="gray.300"
            borderRadius="lg"
            overflow="hidden"
          >
            <Image src={img} w="100%" h="100%" />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  </Box>
);

const PopularProductsSection = () => (
  <Box py={12} bg="white">
    <Flex justify="space-between" align="center" px={8}>
      <Box>
        <Heading size="lg" fontFamily={"Poppins"}>
          Best Selling
        </Heading>
        <Text py={4} color={"gray"}>
          You have a choice to shop based on categories
        </Text>
      </Box>
      <Link as={RouterLink} to="" color="orange.400">
        View More <Icon as={FaChevronRight} />
      </Link>
    </Flex>
    <Swiper
      spaceBetween={16}
      slidesPerView={5}
      autoplay={{ delay: 2500 }}
      modules={[Autoplay]}
    >
      {BestSeller.map((best, i) => (
        <SwiperSlide key={i}>
          <Box w="100%" h="350px" bg="gray.300" borderRadius="lg">
            <Image src={best} w="100%" h="100%" />
          </Box>
        </SwiperSlide>
      ))}
    </Swiper>
  </Box>
);

const TestimonialsSection = () => (
  <Box py={12} bg="gray.50">
    <Heading textAlign="center" size="lg" mb={6}>
      Client Testimonials
    </Heading>
    <Swiper
      autoplay={{ delay: 4000 }}
      pagination={{ clickable: true }}
      modules={[Pagination, Autoplay]}
    >
      {[...Array(3)].map((_, i) => (
        <SwiperSlide key={i}>
          <Flex direction={{ base: "column", md: "row" }} align="center">
            <Image
              src={`/path/to/testimonial${i + 1}.jpg`}
              boxSize="150px"
              borderRadius="full"
              mb={{ base: 4, md: 0 }}
            />
            <Text color="gray.700" p={4} textAlign="center">
              {/* Testimonial text here */}
            </Text>
          </Flex>
        </SwiperSlide>
      ))}
    </Swiper>
  </Box>
);

const Chance = () => {
  const swiperImages = [Slide1, Slide2, Slide3];

  return (
    <Flex
      px={14}
      py={14}
      mt={20}
      bgImage={Chancebg}
      bgRepeat={"no-repeat"}
      bgSize={"cover"}
      direction={{ base: "column", md: "row" }}
      align="center"
      ml={10}
    >
      {/* Text Box */}
      <Box flex="1" pr={{ md: 8 }}>
        <Img src={Chanc} />
      </Box>

      {/* Swiper Box */}
      <Box flex="1">
        <Swiper
          direction="vertical"
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          modules={[Pagination, Autoplay]}
          style={{
            height: "400px",
            borderRadius: "8px",
          }}
        >
          {swiperImages.map((image, index) => (
            <SwiperSlide key={index}>
              <Image src={image} alt={`Slide ${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Flex>
  );
};

const HomePage = () => (
  <Box>
    <HeroSection />
    <StatsSection />
    <CategoriesSection />
    <PopularProductsSection />
    <Chance />
    <TestimonialsSection />
  
  </Box>
);

export default HomePage;
