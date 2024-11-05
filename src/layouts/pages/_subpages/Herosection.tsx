import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules"; // import Pagination from modules
import { Autoplay } from "swiper/modules";


// Import your images
import Best from "../../../assets/best.png";
import Quick from "../../../assets/quick.png";
import Slide1 from "../../../assets/chair.png";
import Slide2 from "../../../assets/headset.png";
import Slide3 from "../../../assets/pod.png";




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
      px={{ base: 6, md: 10, lg: 16 }}
      py={{ base: 10, md: 14, lg: 20 }}
      mt={{ base: 10, md: 20 }}
      direction={{ base: "column", md: "row" }}
      align="center"
      wrap="wrap"
    >
      {/* Text Box */}
      <Box flex="1" pr={{ md: 8 }} mb={{ base: 8, md: 0 }}>
        <Image src={currentImage} width={{ base: "100%", md: "470px" }} mb={4} />
        
        <Text
          mb={4}
          textAlign={{ base: "center", md: "left" }}
          fontSize={{ base: "18px", md: "20px", lg: "24px" }}
        >
          Browse our exclusive collection of products <br /> from top sellers
          with durability and scalability.
        </Text>
        
        <Button
          as={RouterLink}
          to="/custom-order"
          bg="#FF5733"
          size="lg"
          rounded="full"
          height={{ base: "50px", md: "60px" }}
          width={{ base: "200px", md: "250px" }}
          color="white"
          _hover={{ bg: "#FF4500" }}
        >
          Custom Order
        </Button>
      </Box>

      {/* Swiper Box */}
      <Box flex="1" maxW={{ base: "100%", md: "450px" }}>
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
              <Image src={image} alt={`Slide ${index + 1}`} width="100%" />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Flex>
  );
};

export default HeroSection;
