import { Box, Text, SimpleGrid, VStack } from "@chakra-ui/react";
import { useVendor } from "../../hooks/useVendor";

const VendorInsight = () => {
  const { salesAnalytics } = useVendor();
  const data = salesAnalytics?.data;

  return (
    <Box p={6} minHeight="100vh" mt={32} px={34}>
      <Text fontSize="33px" fontWeight="500" mb={6}>
        Sales Analytics
      </Text>

      <SimpleGrid columns={[1, 2]} spacing={6}>
        <Box bg="#E7FAF1" p={6} borderRadius="sm" maxW="527px" w="100%">
          <VStack align="start" spacing={2}>
            <Text fontSize="35px" fontWeight="500">
              {data?.revenue?.total}
            </Text>
            <Text fontSize="lg" fontWeight="500" color="green.500" p={2}>
              Total Revenue
            </Text>
            <Text fontSize="md" color="">
              {data?.revenue?.percentage}% from last month
            </Text>
          </VStack>
        </Box>

        <Box bg="#FDF3E3" p={6} borderRadius="sm" maxW="527px" w="100%">
          <VStack align="start" spacing={2}>
            <Text fontSize="35px" fontWeight="500">
              {data?.sales?.total}
            </Text>
            <Text fontSize="2xl" fontWeight="500" color="#FF5733">
              Total Sales
            </Text>
            <Text fontSize="md" color="">
              {data?.sales?.percentage}% from last month
            </Text>
          </VStack>
        </Box>

        <Box bg="#FCF5F5" p={6} borderRadius="sm" maxW="527px" w="100%">
          <VStack align="start" spacing={2}>
            <Text fontSize="35px" fontWeight="500">
              {data?.best_seller?.total}{" "}
            </Text>
            <Text fontSize="lg" fontWeight="500" color="#B84040">
              Best Selling Products
            </Text>
            <Text fontSize="md">
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
