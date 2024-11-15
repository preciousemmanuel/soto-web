

import { Box, Text, SimpleGrid, VStack } from "@chakra-ui/react";

const VendorInsight = () => {
  return (
    <Box p={6} minHeight="100vh" mt={32}>
      {/* Title */}
      <Text fontSize="33px" fontWeight="500" mb={6}>
        Sales Analytics
      </Text>

      {/* Analytics Boxes */}
      <SimpleGrid columns={[1, 2]} spacing={6}>
        {/* Total Revenue Box */}
        <Box bg="#E7FAF1" p={6} borderRadius="md" boxShadow="md" maxW="527px" w="100%">
          <VStack align="start" spacing={2}>
            <Text fontSize="35px" fontWeight="500">610k</Text>
            <Text fontSize="lg" fontWeight="500" color="green.500" p={2}>Total Revenue</Text>
            <Text fontSize="md" color="">+5% from last month</Text>
          </VStack>
        </Box>

        {/* Total Sales Box */}
        <Box bg="#FDF3E3" p={6} borderRadius="md" boxShadow="md" maxW="527px" w="100%">
          <VStack align="start" spacing={2}>
            <Text fontSize="35px" fontWeight="500">508k</Text>
            <Text fontSize="2xl" fontWeight="500" color="#FF5733">Total sales</Text>
            <Text fontSize="md" color="">+5% from last month</Text>
          </VStack>
        </Box>

        {/* Best Selling Products Box */}
        <Box bg="#FCF5F5" p={6} borderRadius="md" boxShadow="md" maxW="527px" w="100%">
          <VStack align="start" spacing={2}>
            <Text fontSize="35px" fontWeight="500">420k</Text>
            <Text fontSize="lg" fontWeight="500" color="#B84040">Best Selling Products</Text>
            <Text fontSize="md">Product A, Product B, Product C</Text>
          </VStack>
        </Box>

        {/* Buyer Demography Box */}
        <Box bg="#E7F0F9" p={6} borderRadius="md" boxShadow="md" maxW="527px" w="100%">
          <VStack align="start" spacing={2}>
            <Text fontSize="35px" fontWeight="500">6.7k</Text>
            <Text fontSize="lg" fontWeight="500" color="#4388DE">Buyer Demography</Text>
            <Text fontSize="md">18-25: 40%, 26-35: 35%, 36-45: 15%, 46+: 10%</Text>
          </VStack>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default VendorInsight;
