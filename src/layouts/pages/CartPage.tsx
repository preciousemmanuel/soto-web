import { Box, Flex, Text, Button, Image, SimpleGrid } from "@chakra-ui/react";
import { RiDeleteBinLine } from "react-icons/ri";

const CartPage = () => {
  return (
    <Box bg="" p={[4, 6, 8]}>
      {/* Shopping Cart Header */}
      <Text
        textAlign="center"
        bg={"#FFF2ED"}
        pt={4}
        pb={4}
        fontSize="2xl"
        fontWeight="bold"
        mb={8}
      >
        Shopping Cart
      </Text>

      <Flex
        flexDirection={["column", "row"]}
        justifyContent="space-between"
        gap={8}
        mb={16}
      >
        {/* Product List Section */}
        <Box flex="2" bg="transparent" p={6} borderRadius="md">
          <Flex
            bg={"#FBF5F5"}
            pt={4}
            pb={4}
            fontWeight="bold"
            mb={4}
            px={4}
            justifyContent="space-between"
          >
            <Text>Product</Text>
            <Text>Price</Text>
            <Text>Qty</Text>
            <Text>Subtotal</Text>
          </Flex>

          {/* Example Products */}
          {[1, 2, 3].map((item) => (
            <Flex
              key={item}
              alignItems="center"
              justifyContent="space-between"
              py={4}
              borderBottom="1px solid"
              borderColor="gray.200"
            >
              <Text>Product {item}</Text>
              <Text>$10.00</Text>
              <Text>1</Text>
              <Text>$10.00</Text>
              <Text color="red.500" cursor="pointer">
               <RiDeleteBinLine color="red"/>
              </Text>
            </Flex>
          ))}
        </Box>

        {/* Cart Totals Section */}
        <Box flex="1"  p={6} borderRadius="md" boxShadow="md" bg={"#FBF5F5"}>
          <Text fontWeight="bold" mb={4} color={"#FF5733"} fontSize={"20px"}>
            Cart Totals
          </Text>
          <Flex justifyContent="space-between" mb={2}>
            <Text>Subtotal</Text>
            <Text>$30.00</Text>
          </Flex>
          <Flex justifyContent="space-between" mb={4}>
            <Text fontWeight="bold">Total</Text>
            <Text fontWeight="bold">$30.00</Text>
          </Flex>
          <Button
            width="full"
            // bg="orange.400"
            color="#FF5733"
            // _hover={{ bg: "orange.500" }}
            borderRadius="md"
            variant="outline"
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Flex>

      {/* You May Also Like Section */}
      <Box mb={8}>
        <Text fontSize="lg" fontWeight="bold" mb={4} textAlign="left">
          You May Also Like
        </Text>

        {/* Product Suggestions */}
        <SimpleGrid columns={[2, 4]} spacing={4} mb={6} justifyItems="center">
          {[1, 2, 3, 4].map((item) => (
            <Box key={item} borderRadius="md" overflow="hidden">
              <Image
                src={`https://via.placeholder.com/150?text=Item+${item}`}
                alt={`Suggested Product ${item}`}
                borderRadius="md"
              />
            </Box>
          ))}
        </SimpleGrid>

        {/* Show More Button */}
        <Flex justifyContent="center">
          <Button
            variant="outline"
            color="orange.500"
            borderColor="orange.500"
            borderRadius="full"
            _hover={{ bg: "orange.100" }}
            size={"lg"}
          >
            Show More
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default CartPage;
