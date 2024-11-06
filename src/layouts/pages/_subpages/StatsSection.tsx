import { Box, Flex, Heading, Text } from "@chakra-ui/react";

const StatsSection = () => {
  
  return (
  <Flex
    bg="white"
    py={{ base: 8, md: 12 }}
    px={{ base: 4, md: 8, lg: 16 }}
    justify="center"
    align="center"
    wrap="wrap"
    gap={6} // Add space between items for responsiveness
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
        p={{ base: 4, md: 6 }}
        boxShadow="lg"
        borderRadius="md"
        bg="white"
        width={{ base: "100%", sm: "270px" }} // Full width on small screens, 270px on larger screens
        maxW="300px"
        mb={{ base: 4, md: 6 }}
      >
        <Heading
          color="black"
          size={{ base: "lg", md: "xl" }}
          fontFamily="Poppins"
          fontWeight="600"
        >
          {item.text}
        </Heading>
        <Text mt={2} color="gray.600" fontFamily="Poppins" fontSize={{ base: "md", md: "lg" }}>
          {item.subtext}
        </Text>
      </Box>
    ))}
  </Flex>
);
}

export default StatsSection;
