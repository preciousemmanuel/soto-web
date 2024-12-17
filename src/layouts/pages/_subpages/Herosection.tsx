import React, { useState, useEffect } from "react";
import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  ResponsiveValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { motion, AnimatePresence, Variant } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import AuthImage from "../../../assets/what.png";
import { EffectFade } from "swiper/modules";
import "swiper/css/effect-fade";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import Slide1 from "../../../assets/slide1.png";
import Slide2 from "../../../assets/slide2.png";
import Slide3 from "../../../assets/slide3.png";

type HeroTitle = {
  text: string;
  color: string;
};

interface TitleSet {
  line1: {
    first: HeroTitle;
    second: HeroTitle;
  };
  line2: {
    first: HeroTitle;
    second: HeroTitle;
  };
}

const bestTitles: TitleSet = {
  line1: {
    first: { text: "BEST PRICE", color: "#FF5733" },
    second: { text: "ANYWHERE,", color: "#ffffff" },
  },
  line2: {
    first: { text: "BEST QUALITY", color: "#FF5733" },
    second: { text: "ANYTIME", color: "#ffffff" },
  },
};

const quickTitles: TitleSet = {
  line1: {
    first: { text: "QUICK DELIVERY", color: "#FF5733" },
    second: { text: "GUARANTEED ", color: "#ffffff" },
  },
  line2: {
    first: { text: "IN HOURS", color: "#ffffff" },
    second: { text: "", color: "#ffffff" },
  },
};

const swiperImages: any = [Slide1, Slide2, Slide3];

const titleVariants: Record<string, Variant> = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0,
      ease: "easeIn",
    },
  },
};

const HeroSection: React.FC = () => {
  const [currentTitles, setCurrentTitles] = useState<TitleSet>(bestTitles);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitles((prev) =>
        prev === bestTitles ? quickTitles : bestTitles
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const responsiveStyles: Record<string, ResponsiveValue<string | number>> = {
    px: { base: 6, md: 10, lg: 16 },
    py: { base: 10, md: 14, lg: 20 },
    mt: { base: 10, md: 20 },
    fontSize: { base: "18px", md: "20px", lg: "24px" },
  };

  return (
    <Flex
      bg="black"
      color="white"
      px={responsiveStyles.px}
      py={responsiveStyles.py}
      mt={responsiveStyles.mt}
      direction={{ base: "column", md: "row" }}
      align="center"
      wrap="wrap"
      position="relative"
    >
      <Box flex="1" pr={{ md: 8 }} mb={{ base: 8, md: 0 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={JSON.stringify(currentTitles)}
            variants={titleVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <Heading
              as="h1"
              size="3xl"
              mb={6}
              bgGradient="linear(to-r, #FF5733, #FF4500)"
              bgClip="text"
              fontWeight="bold"
              letterSpacing="3px"
            >
              <span style={{ color: currentTitles.line1?.first.color }}>
                {currentTitles.line1?.first.text}
              </span>{" "}
              <span style={{ color: currentTitles.line1?.second.color }}>
                {currentTitles.line1?.second.text}
              </span>
              <span style={{ color: currentTitles.line2?.first.color }}>
                {currentTitles.line2?.first.text}
              </span>{" "}
              <span style={{ color: currentTitles.line2?.second.color }}>
                {currentTitles.line2?.second.text}
              </span>
            </Heading>
          </motion.div>
        </AnimatePresence>

        <Text
          mb={4}
          textAlign={{ base: "center", md: "left" }}
          fontSize={responsiveStyles.fontSize}
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
      <Image
          // flex="1"
          src={AuthImage}
          bottom="-70px"
          right="0px"
          position="absolute"
          display={{ base: "none", md: "block" }}
        />
      <Box flex="1" maxW={{ base: "100%", md: "500px" }}>
        <Swiper
          effect="fade"
          fadeEffect={{ crossFade: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Pagination, Autoplay, EffectFade]}
          style={{
            height: "400px",
            borderRadius: "8px",
            maxWidth: "100%",
          }}
        >
          {swiperImages.map(
            (image: any, index: React.Key | null | undefined) => (
              <SwiperSlide key={index} style={{ background: "transparent" }}>
                <Image
                  src={image}
                  alt={`Slide ${typeof index === "number" ? index + 1 : ""}`}
                  objectFit="contain"
                  maxH="100%"
                  maxW="100%"
                  style={{ display: "block" }}
                />
              </SwiperSlide>
            )
          )}
        </Swiper>
      </Box>
      
    </Flex>
  );
};

export default HeroSection;
