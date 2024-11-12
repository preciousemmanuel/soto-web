// OrdersPage.js

import {
  Box,
  Text,
  Button,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";

// Dummy data for orders
const ordersData = [
  { id: 1, product: "Product A", productId: "PA123", status: "New order", delivery: "Express", qty: 2 },
  { id: 2, product: "Product B", productId: "PB456", status: "Awaiting pick up", delivery: "Standard", qty: 1 },
  { id: 3, product: "Product C", productId: "PC789", status: "Shipped", delivery: "Express", qty: 5 },
  { id: 4, product: "Product D", productId: "PD101", status: "Completed", delivery: "Standard", qty: 3 },
  { id: 5, product: "Product E", productId: "PE112", status: "Awaiting pick up", delivery: "Standard", qty: 4 },
];

const VendorOrder = () => {
  const [filteredStatus, setFilteredStatus] = useState("All");

  // Filter orders based on selected status
  const filteredOrders = filteredStatus === "All" 
    ? ordersData 
    : ordersData.filter(order => order.status === filteredStatus);

  return (
    <Box p={6} minHeight="100vh" mt={32}>
      {/* Title */}
      <Text fontSize="33px" fontWeight="500" bg={"#FFEFEB"} py={4} textAlign="center" mb={6} color="#FF5733">
        Orders
      </Text>

      {/* Filter Buttons */}
      <Stack direction="row" spacing={4} justify="center" mb={6} wrap="wrap">
        {["All", "New order", "Custom", "Awaiting pick up", "Shipped", "Completed"].map((status) => (
          <Button
            key={status}
            onClick={() => setFilteredStatus(status)}
            borderRadius="full"
            bg={status === filteredStatus ? "#FF5733" : "gray.200"}
            color={status === filteredStatus ? "white" : ""}
            size="lg"
            fontWeight={"500"}
          >
            {status}
          </Button>
        ))}
      </Stack>

      {/* Orders Table */}
      <Box bg="white" p={4} borderRadius="md" boxShadow="md" overflowX="auto">
        <Table variant="simple" size="md">
          <Thead>
            <Tr>
              <Th>Product</Th>
              <Th>Product ID</Th>
              <Th>Status</Th>
              <Th>Delivery</Th>
              <Th>Qty</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredOrders.map((order) => (
              <Tr key={order.id}>
                <Td>{order.product}</Td>
                <Td>{order.productId}</Td>
                <Td>{order.status}</Td>
                <Td>{order.delivery}</Td>
                <Td>{order.qty}</Td>
                <Td>
                  <Button size="sm" colorScheme="blue" variant="outline">
                    View
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default VendorOrder;
