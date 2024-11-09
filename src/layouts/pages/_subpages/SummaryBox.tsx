// SummaryBoxes.js

import { SimpleGrid, Box, Text } from "@chakra-ui/react";

const SummaryBoxes = ({ totalProducts, totalSold, totalInStock }) => {
  return (
    <SimpleGrid columns={[1, 3]} spacing={6} mb={6}>
      <Box bg="#FFF0ED" p={4} borderRadius="md" textAlign="center" height={"163px"}>
        <Text fontSize="26px" fontWeight="500" mt={6} >Total Products</Text>
        <Text fontSize="2xl" fontWeight="bold">{totalProducts}</Text>
      </Box>
      <Box bg="#60DD9833" p={4} borderRadius="md" textAlign="center">
        <Text fontSize="26px" fontWeight="500" mt={6}>Total Sold</Text>
        <Text fontSize="2xl" fontWeight="bold">{totalSold}</Text>
      </Box>
      <Box bg="#F2F1F3" p={4} borderRadius="md" textAlign="center">
        <Text fontSize="26px" fontWeight="500" mt={6}>Total in Stock</Text>
        <Text fontSize="2xl" fontWeight="bold">{totalInStock}</Text>
      </Box>
    </SimpleGrid>
  );
};

export default SummaryBoxes;
