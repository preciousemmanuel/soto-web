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
    gap={12} // Add space between items for responsiveness
    textAlign="center"
  >
    {[
      { text: "OVER 1000+", subtext: "Durable Products" },
      { text: "99%", subtext: "Customer Satisfaction Rate" },
      { text: "24/7", subtext: "Shopping Convenience" },
      { text: "50K+", subtext: "Customer Reviews" },
    ].map((item, index) => (
      <Box
        key={index}
        p={{ base: 4, md: 6 }}
        border="1px"
        borderColor="gray.100"
        borderRadius="14px"
        bg="white"
        width={{ base: "100%", sm: "270px" }}
        maxW="300px"
        mb={{ base: 4, md: 6 }}
        textAlign="left"
      >
        <Heading
          color="black"
          // size={{ base: "md", md: "lg" }}
          fontSize={{base:"20px", md:"26px"}}
          fontFamily="Poppins"
          fontWeight="600"
          
        >
          {item.text}
        </Heading>
        <Text mt={2} color="gray.600" fontFamily="Poppins" fontSize={{ base: "14px", md: "16px" }}>
          {item.subtext}
        </Text>
      </Box>
    ))}
  </Flex>
);
}

export default StatsSection;
