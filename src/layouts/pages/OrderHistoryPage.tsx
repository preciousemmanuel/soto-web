import { useState } from "react";
import {
  Box,
  Heading,
  Button,
  SimpleGrid,
  Text,
  VStack,
  Flex,
  Grid,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { useOrder } from "../hooks/useOrder";
import LoadingSpinner from "../../features/helpers/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import PaginationControls from "../../features/helpers/Pagination";

function OrderHistoryPage() {
  const [activeStatus, setActiveStatus] = useState("BOOKED");
  const navigate = useNavigate();
  const { orders, isFetchingOrders, ordersPagination, handlePageChange } =
    useOrder();
  const orderData = orders?.data?.data;
  const filteredOrders = orderData?.filter(
    (order: any) => order.status === activeStatus
  );
  //  console.log(orders,"orders")
  const handleProductClick = (orderId: string) => {
    navigate(`/my-orders/${orderId}`);
  };

  const renderStatusAndAction = (status: string, orderId: string) => {
    switch (status) {
      case "PENDING":
        return {
          status: (
            <Text color="yellow.500" fontSize="18px" fontWeight="semibold">
              PENDING
            </Text>
          ),
          action: (
            <Button
              colorScheme="yellow"
              size="sm"
              onClick={() => alert("Pending Order")}
            >
              Pending
            </Button>
          ),
        };
      case "BOOKED":
        return {
          status: (
            <Text color="#28AD07" fontSize="18px" fontWeight="semibold">
              BOOKED
            </Text>
          ),
          action: (
            <Button
              color={"white"}
              bg="#FF5733"
              size="sm"
              onClick={() => handleProductClick(orderId)}
            >
              Track
            </Button>
          ),
        };
      case "SHIPPED":
        return {
          status: (
            <Text color="#28AD07" fontSize="18px" fontWeight="semibold">
              SHIPPED
            </Text>
          ),
          action: (
            <Button
              color="white"
              bg="#FF5733"
              size="sm"
              // onClick={() => handleProductClick(productId)}
            >
              View
            </Button>
          ),
        };
      case "DELIVERED":
        return {
          status: (
            <Text color="green.500" fontSize="18px" fontWeight="semibold">
              DELIVERED
            </Text>
          ),
          action: (
            <Button colorScheme="green" variant="outline" size="sm">
              View Details
            </Button>
          ),
        };
      case "CANCELLED":
        return {
          status: (
            <Text color="red.500" fontSize="18px" fontWeight="semibold">
              CANCELLED
            </Text>
          ),
          action: (
            <Button
              colorScheme="red"
              size="sm"
              onClick={() => alert("Cancelled Order")}
            >
              Delete
            </Button>
          ),
        };
      case "FAILED":
        return {
          status: (
            <Text color="red.500" fontSize="18px" fontWeight="semibold">
              FAILED
            </Text>
          ),
          action: (
            <Button
              colorScheme="red"
              variant="outline"
              size="sm"
              onClick={() => alert("Failed Order")}
            >
              Retry
            </Button>
          ),
        };
      default:
        return {};
    }
  };

  return (
    <Box p={4} minH="100vh" textAlign="center" mt={120} my={20}>
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

      <Flex justifyContent={"left"} alignItems={"left"}>
      <Flex
          justifyContent="center"
          gap={4}
          mb={8}
          maxW="100%"
          mx="auto"
        >
          {[
            "PENDING",
            "BOOKED",
            "SHIPPED",
            "DELIVERED",
            "CANCELLED",
            "FAILED",
          ].map((buttonStatus) => (
            <Button
              key={buttonStatus}
              bg={activeStatus === buttonStatus ? "#FF5733" : "#F4F6F9"}
              color={activeStatus === buttonStatus ? "white" : "black"}
              borderRadius="full"
              size="md"
              onClick={() => setActiveStatus(buttonStatus)}
            >
              {buttonStatus}
            </Button>
          ))}
       </Flex>
      </Flex>
      {isFetchingOrders ? (
        <LoadingSpinner />
      ) : (
        <Flex justifyContent="center" px={4}>
          <Table
            variant="simple"
            w="100%"
            maxW="850px"
            textAlign="left"
            fontWeight="normal"
          >
            <Thead>
              <Tr>
                <Th>Products</Th>
                <Th>Tracking ID</Th>
                <Th>Status</Th>
                <Th>Qty.</Th>
                <Th textAlign="center">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* Order Details */}
              {filteredOrders?.length > 0 ? (
                filteredOrders?.flatMap((order: any) =>
                  order?.items?.map((product: any) => {
                    const { status, action } = renderStatusAndAction(
                      order?.status,
                      order?._id
                    );
                    return (
                      <Tr key={product.product_id}>
                        <Td>{product?.product_name}</Td>
                        <Td>{order?.tracking_id}</Td>
                        <Td>{status}</Td>
                        <Td>{product?.quantity}</Td>
                        <Td textAlign="center">{action}</Td>
                      </Tr>
                    );
                  })
                )
              ) : (
                <Tr>
                  <Td colSpan={6} textAlign="center" color="gray.500" mt={4}>
                    No data for the selected status.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Flex>
      )}
      <Box px={24} pt={8}>
        <PaginationControls
          currentPage={ordersPagination.currentPage}
          totalPages={ordersPagination.totalPages}
          onPageChange={handlePageChange}
          hasNextPage={ordersPagination.hasNextPage}
        />
      </Box>
    </Box>
  );
}

export default OrderHistoryPage;
