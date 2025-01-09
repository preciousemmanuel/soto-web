import { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Button,
  Text,
  Flex,
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
  const {
    orders,
    isFetchingOrders,
    refetchOrders,
    ordersPagination,
    handlePageChange,
  } = useOrder();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    refetchOrders();
  }, []);

  const orderData = orders?.data?.data;
  const filteredOrders = orderData?.filter(
    (order: any) => order.status === activeStatus
  );

  const handleProductClick = (orderId: string) => {
    navigate(`/my-orders/${orderId}`);
  };

  const renderStatusAndAction = (status: string, orderId: string) => {
    switch (status) {
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
              View
            </Button>
          ),
        };
      case "PICKED_UP":
        return {
          status: (
            <Text color="#28AD07" fontSize="18px" fontWeight="semibold">
              PICKED UP
            </Text>
          ),
          action: (
            <Button
              color="white"
              bg="#FF5733"
              size="sm"
              onClick={() => handleProductClick(orderId)}
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
            <Button
              colorScheme="green"
              variant="outline"
              size="sm"
              onClick={() => handleProductClick(orderId)}
            >
              View
            </Button>
          ),
        };
      case "CANCELLED":
        return {
          status: (
            <Text
              color="red.500"
              fontSize="18px"
              fontWeight="semibold"
              onClick={() => handleProductClick(orderId)}
            >
              CANCELLED
            </Text>
          ),
          action: (
            <Button
              colorScheme="red"
              size="sm"
              onClick={() => handleProductClick(orderId)}
            >
              View
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
              onClick={() => handleProductClick(orderId)}
            >
              View
            </Button>
          ),
        };
      default:
        return {};
    }
  };

  return (
    <Box p={4} minH="100%" textAlign="center" mt={120} my={20}>
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
        <Flex justifyContent="center" gap={4} mb={8} maxW="100%" mx="auto">
          {["BOOKED", "PICKED_UP", "DELIVERED", "CANCELLED", "FAILED"].map(
            (buttonStatus) => (
              <Button
                key={buttonStatus}
                bg={activeStatus === buttonStatus ? "#FF5733" : "#F4F6F9"}
                color={activeStatus === buttonStatus ? "white" : "black"}
                borderRadius="full"
                size="md"
                onClick={() => setActiveStatus(buttonStatus)}
              >
                {buttonStatus.replace("_", " ")}
              </Button>
            )
          )}
        </Flex>
      </Flex>
      {isFetchingOrders ? (
        <LoadingSpinner />
      ) : (
        <Flex justifyContent="center" px={4}>
          <Table variant="simple" w="100%" maxW="850px" textAlign="left">
            <Thead>
              <Tr>
                <Th>Order ID</Th>
                <Th>Order Date</Th>
                <Th>Product</Th>
                <Th>Status</Th>
                <Th textAlign="center">Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredOrders?.length > 0 ? (
                filteredOrders?.map((order: any) => {
                  const { status } = order;
                  const { status: statusText, action } = renderStatusAndAction(
                    status,
                    order?._id
                  );
                  return (
                    <Tr key={order?._id}>
                      <Td>{order?.tracking_id}</Td>
                      <Td>{new Date(order?.createdAt).toLocaleDateString()}</Td>
                      <Td>{order?.items?.length}</Td>
                      <Td>{statusText}</Td>
                      <Td textAlign="center">{action}</Td>
                    </Tr>
                  );
                })
              ) : (
                <Tr>
                  <Td colSpan={5} textAlign="center" color="gray.500">
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
