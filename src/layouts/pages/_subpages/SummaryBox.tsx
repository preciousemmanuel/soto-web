import { SimpleGrid, Box, Text } from "@chakra-ui/react";

interface SummaryBoxesProps {
  total_in_stock: number;
  total_products: number;
  total_sold: number;
}

const SummaryBoxes: React.FC<SummaryBoxesProps> = ({
  total_in_stock,
  total_products,
  total_sold,
}) => {
  return (
    <SimpleGrid columns={[1, 3]} spacing={6} mb={6}>
      <Box
        bg="#FFF0ED"
        p={4}
        borderRadius="md"
        textAlign="center"
        height={"163px"}
      >
        <Text fontSize="26px" fontWeight="500" mt={6}>
          Total Products
        </Text>
        <Text fontSize="2xl" fontWeight="bold">
          {total_products}
        </Text>
      </Box>
      <Box bg="#60DD9833" p={4} borderRadius="md" textAlign="center">
        <Text fontSize="26px" fontWeight="500" mt={6}>
          Total Sold
        </Text>
        <Text fontSize="2xl" fontWeight="bold">
          {total_sold}
        </Text>
      </Box>
      <Box bg="#F2F1F3" p={4} borderRadius="md" textAlign="center">
        <Text fontSize="26px" fontWeight="500" mt={6}>
          Total in Stock
        </Text>
        <Text fontSize="2xl" fontWeight="bold">
          {total_in_stock}
        </Text>
      </Box>
    </SimpleGrid>
  );
};

export default SummaryBoxes;
