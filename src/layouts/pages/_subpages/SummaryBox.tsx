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
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3 }}
      spacing={{ base: 4, md: 6 }}
      mb={{ base: 4, md: 6 }}
    >
      <Box
        bg="#FFF0ED"
        p={{ base: 3, md: 4 }}
        borderRadius="md"
        textAlign="center"
        height={{ base: "120px", md: "163px" }}
      >
        <Text
          fontSize={{ base: "xl", md: "26px" }}
          fontWeight="500"
          mt={{ base: 4, md: 6 }}
        >
          Total Products
        </Text>
        <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
          {total_products}
        </Text>
      </Box>
      <Box
        bg="#60DD9833"
        p={{ base: 3, md: 4 }}
        borderRadius="md"
        textAlign="center"
        height={{ base: "120px", md: "163px" }}
      >
        <Text
          fontSize={{ base: "xl", md: "26px" }}
          fontWeight="500"
          mt={{ base: 4, md: 6 }}
        >
          Total Sold
        </Text>
        <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
          {total_sold}
        </Text>
      </Box>
      <Box
        bg="#F2F1F3"
        p={{ base: 3, md: 4 }}
        borderRadius="md"
        textAlign="center"
        height={{ base: "120px", md: "163px" }}
      >
        <Text
          fontSize={{ base: "xl", md: "26px" }}
          fontWeight="500"
          mt={{ base: 4, md: 6 }}
        >
          Total in Stock
        </Text>
        <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
          {total_in_stock}
        </Text>
      </Box>
    </SimpleGrid>
  );
};

export default SummaryBoxes;
