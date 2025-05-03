import { Box, Text, SimpleGrid, VStack } from "@chakra-ui/react";
import { useVendor } from "../../hooks/useVendor";

const VendorInsight = () => {
  const { salesAnalytics } = useVendor();
  const data = salesAnalytics?.data;

  return (
    <Box
      p={{ base: 4, md: 6 }}
      h="100%"
      mt={{ base: 6, md: 12, lg: 32 }}
      px={{ base: 4, md: 6, lg: 34 }}
    >
      <Text
        fontSize={{ base: "xl", md: "2xl", lg: "33px" }}
        fontWeight="500"
        my={{ base: "120px", md: "20px" }}
        mb={{ base: 4, md: 6 }}
      >
        Sales Analytics
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 6 }}>
        <Box
          bg="#E7FAF1"
          p={{ base: 4, md: 6 }}
          borderRadius="sm"
          maxW="527px"
          w="100%"
        >
          <VStack align="start" spacing={2}>
            <Text
              fontSize={{ base: "2xl", md: "3xl", lg: "35px" }}
              fontWeight="500"
            >
              {data?.revenue?.total}
            </Text>
            <Text
              fontSize={{ base: "md", lg: "lg" }}
              fontWeight="500"
              color="green.500"
              p={2}
            >
              Total Revenue
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }}>
              {data?.revenue?.percentage}% from last month
            </Text>
          </VStack>
        </Box>

        <Box
          bg="#FDF3E3"
          p={{ base: 4, md: 6 }}
          borderRadius="sm"
          maxW="527px"
          w="100%"
        >
          <VStack align="start" spacing={2}>
            <Text
              fontSize={{ base: "2xl", md: "3xl", lg: "35px" }}
              fontWeight="500"
            >
              {data?.sales?.total}
            </Text>
            <Text
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="500"
              color="#FF5733"
            >
              Total Sales
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }}>
              {data?.sales?.percentage}% from last month
            </Text>
          </VStack>
        </Box>

        <Box
          bg="#FCF5F5"
          p={{ base: 4, md: 6 }}
          borderRadius="sm"
          maxW="527px"
          w="100%"
        >
          <VStack align="start" spacing={2}>
            <Text
              fontSize={{ base: "2xl", md: "3xl", lg: "35px" }}
              fontWeight="500"
            >
              {data?.best_seller?.total}{" "}
            </Text>
            <Text
              fontSize={{ base: "md", lg: "lg" }}
              fontWeight="500"
              color="#B84040"
            >
              Best Selling Products
            </Text>
            <Text fontSize={{ base: "sm", md: "md" }}>
              {data?.best_seller?.total === 0
                ? "No products sold"
                : "Products available"}
            </Text>
          </VStack>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default VendorInsight;
