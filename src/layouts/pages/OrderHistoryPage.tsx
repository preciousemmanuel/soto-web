import { useState } from "react";
import {
  Box,
  Heading,
  Button,
  SimpleGrid,
  Text,
  VStack,
  Flex,
  Stack,
} from "@chakra-ui/react";

function OrderHistoryPage() {
  const [activeStatus, setActiveStatus] = useState("Active");

  // Sample product data (you can replace with real data)
  const products = [
    { id: 1, name: "Product A", qty: 1 },
    { id: 2, name: "Product B", qty: 2 },
    { id: 3, name: "Product C", qty: 1 },
    { id: 4, name: "Product D", qty: 3 },
  ];

  // Function to render status and action buttons based on the selected status
  const renderStatusAndAction = () => {
    switch (activeStatus) {
      case "Active":
        return {
          status: <Text color="orange.500" fontSize="13px">Active</Text>,
          action: (
            <Button colorScheme="orange" size="sm" onClick={() => alert("Track Order")}>
              Track
            </Button>
          ),
        };
      case "Custom":
        return {
          status: <Text color="green.500" fontSize="13px">In Progress</Text>,
          action: (
            <Button variant="outline" colorScheme="green" size="sm">
              Review
            </Button>
          ),
        };
      case "Delivered":
        return {
          status: <Text color="green.500" fontSize="13px">Delivered</Text>,
          action: (
            <Button colorScheme="green" variant="outline" size="sm">
              View
            </Button>
          ),
        };
      case "Canceled":
        return {
          status: <Text color="red.500" fontSize="13px">Canceled</Text>,
          action: (
            <Button colorScheme="red" size="sm" onClick={() => alert("Delete Order")}>
              Delete
            </Button>
          ),
        };
      default:
        return {};
    }
  };

  // Get the current status and action details based on the active status
  const { status, action } = renderStatusAndAction();

  return (
    <Box p={4} bg="#FBF5F5" minH="100vh" textAlign="center" mt={120}>
      {/* Page Title */}
      <Heading
        size="lg"
        mb={6}
        mt={6}
        fontFamily="Poppins"
        bg="#FFF2ED"
        px={4}
        py={6}
        color="#FF5753"
      >
        My Orders
      </Heading>

      {/* Order Status Buttons */}
      <SimpleGrid
        columns={[2, 2, 4]}
        spacing={4}
        mb={8}
        maxW="850px"
        mx="auto"
        py={8}
      >
        {["Active", "Custom", "Delivered", "Canceled"].map((status) => (
          <Button
            key={status}
            colorScheme={activeStatus === status ? "orange" : "gray"}
            color={activeStatus === status ? "white" : "black"}
            borderRadius="full"
            size="md"
            onClick={() => setActiveStatus(status)}
          >
            {status}
          </Button>
        ))}
      </SimpleGrid>

      {/* Headings for Order Details */}
      <Flex justifyContent="center">
        <SimpleGrid
          columns={[2, 2, 6]}
          spacing={4}
          maxW="850px"
          textAlign="center"
          fontWeight="bold"
          mb={4}
        >
          <Text>Products</Text>
          <Text>Product ID</Text>
          <Text display={{ base: "none", md: "block" }}>Status</Text>
          <Text display={{ base: "none", md: "block" }}>Del. Type</Text>
          <Text display={{ base: "none", md: "block" }}>Qty</Text>
          <Text>Action</Text>
        </SimpleGrid>
      </Flex>

      {/* Order Details Rows */}
      <VStack spacing={4} maxW="850px" mx="auto">
        {products.map((product) => (
          <SimpleGrid
            columns={[2, 2, 6]}
            spacing={4}
            key={product.id}
            textAlign="center"
          >
            <Text>{product.name}</Text>
            <Text>{product.id}</Text>
            <Text display={{ base: "none", md: "block" }}>{status}</Text>
            <Text display={{ base: "none", md: "block" }}>Standard</Text>
            <Text display={{ base: "none", md: "block" }}>{product.qty}</Text>
            {action}
          </SimpleGrid>
        ))}
      </VStack>
    </Box>
  );
}

export default OrderHistoryPage;
