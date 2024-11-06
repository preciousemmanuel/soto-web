import { Box, Heading, Image, Flex } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination } from "swiper/modules"; // import Pagination from modules
import { Autoplay } from "swiper/modules";
import { useEffect, useState } from "react";
import Bestdlv from "../../../assets/quickdlv.png"
import qualityprod from "../../../assets/qualityprod.png"
import bestprc from "../../../assets/bestprc.png"
import man1 from "../../../assets/man1.png";
import man2 from "../../../assets/man2.png";
import woman from "../../../assets/woman.png";

const TestimonialsSection = () => {
  const [currentImage, setCurrentImage] = useState(qualityprod);
  const Testimonials = [man1,man2,woman]

  useEffect(() => {
    const images = [bestprc, Bestdlv];
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % images.length;
      setCurrentImage(images[index]);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  return (
    <Box py={{ base: 10, md: 20 }} bg="gray.50">
      {/* Heading */}
      <Heading
        textAlign={{ base: "center", md: "left" }}
        px={{ base: 4, md: 8 }}
        fontFamily="Poppins"
        size={{ base: "md", md: "lg" }}
        mb={{ base: 4, md: 6 }}
      >
        Client Testimonials
      </Heading>

      {/* Swiper Component */}
      <Swiper
        autoplay={{ delay: 4000 }}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        style={{ padding: "0 16px" }}
      >
        {Testimonials.map((test, i) => (
          <SwiperSlide key={i}>
            <Flex
              direction={{ base: "column", md: "row" }}
              align="center"
              px={{ base: 4, md: 8 }}
              py={{ base: 6, md: 8 }}
              textAlign={{ base: "center", md: "left" }}
              gap={8}
            >
              {/* Testimonial Image */}
              <Image
                src={test}
                w={{ base: "", md: "" }}
                h={{ base: "", md: "" }}
                mb={{ base: 4, md: 0 }}
                mr={{ md: 4 }}
                objectFit="cover"
                borderRadius="md"
                boxShadow="md"
              />

              {/* Changing Image */}
              <Image
                src={currentImage}
                w={{ base: "", md: "" }}
                h={{ base: "", md: "" }}
                mt={{ base: 4, md: 0 }}
                ml={{ md: 4 }}
                objectFit="cover"
                borderRadius="md"
                // boxShadow="md"
              />
            </Flex>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default TestimonialsSection;
