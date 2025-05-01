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
import { ChevronLeftIcon } from "@chakra-ui/icons";

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
  // console.log(orders, "helloo");

  const orderData = orders?.data?.data;
  const filteredOrders = orderData?.filter(
    (order: any) => order.status === activeStatus
  );

  const handleProductClick = (orderId: string) => {
    navigate(`/my-orders/${orderId}`);
  };

  const renderStatusAndAction = (status: string, orderId: string) => {
    switch (status) {
      case "PENDING":
        return {
          status: (
            <Text color="#28AD07" fontSize="18px" fontWeight="semibold">
              PENDING
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
    <Box
      p={{ base: 2, md: 4 }}
      minH="100%"
      textAlign="center"
      mt={{ base: 100, md: 120 }}
      my={{ base: 10, md: 20 }}
    >
      <Flex
        align="center"
        justify="center"
        position="relative"
        bg="#FFF2ED"
        p={{ base: 4, md: 6 }}
        mt={{ base: 16, md: 20 }}
        mb={6}
      >
        <Button
          position="absolute"
          left={{ base: 2, md: 6 }}
          onClick={() => navigate(-1)}
          leftIcon={<ChevronLeftIcon />}
          variant="ghost"
          color="#FF5753"
          size={{ base: "sm", md: "md" }}
        >
          Back
        </Button>
        <Heading
          size={{ base: "md", md: "lg" }}
          fontFamily="Poppins"
          color="#FF5753"
        >
          My Orders
        </Heading>
      </Flex>

      <Flex justifyContent="center" alignItems="center">
        <Flex
          justifyContent="center"
          gap={{ base: 2, md: 4 }}
          mb={8}
          maxW="100%"
          mx="auto"
          flexWrap="wrap"
        >
          {[
            "BOOKED",
            "PENDING",
            "PICKED_UP",
            "DELIVERED",
            "CANCELLED",
            "FAILED",
          ].map((buttonStatus) => (
            <Button
              key={buttonStatus}
              bg={activeStatus === buttonStatus ? "#FF5733" : "#F4F6F9"}
              color={activeStatus === buttonStatus ? "white" : "black"}
              borderRadius="full"
              size={{ base: "sm", md: "md" }}
              onClick={() => setActiveStatus(buttonStatus)}
              m={{ base: "2px", md: 0 }}
            >
              {buttonStatus.replace("_", " ")}
            </Button>
          ))}
        </Flex>
      </Flex>
      {isFetchingOrders ? (
        <LoadingSpinner />
      ) : (
        <Flex justifyContent="center" px={{ base: 2, md: 4 }} overflowX="auto">
          <Box width="100%" maxW="850px" overflowX="auto">
            <Table
              variant="simple"
              w="100%"
              textAlign="center"
              size={{ base: "sm", md: "md" }}
              whiteSpace={{ base: "nowrap", md: "normal" }}
              mx="auto"
            >
              <Thead>
                <Tr>
                  <Th fontSize={{ base: "xs", md: "sm" }}>Order ID</Th>
                  <Th fontSize={{ base: "xs", md: "sm" }}>Order Date</Th>
                  <Th fontSize={{ base: "xs", md: "sm" }}>Product</Th>
                  <Th fontSize={{ base: "xs", md: "sm" }}>Status</Th>
                  <Th fontSize={{ base: "xs", md: "sm" }} textAlign="center">
                    Action
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredOrders?.length > 0 ? (
                  filteredOrders?.map((order: any) => {
                    const { status } = order;
                    const { status: statusText, action } =
                      renderStatusAndAction(status, order?._id);
                    return (
                      <Tr key={order?._id}>
                        <Td fontSize={{ base: "xs", md: "sm" }} textAlign="center">
                          {order?.tracking_id}
                        </Td>
                        <Td fontSize={{ base: "xs", md: "sm" }} textAlign="center">
                          {new Date(order?.createdAt).toLocaleDateString()}
                        </Td>
                        <Td fontSize={{ base: "xs", md: "sm" }} textAlign="center">
                          {order?.items?.length}
                        </Td>
                        <Td fontSize={{ base: "xs", md: "sm" }} textAlign="center">
                          {statusText}
                        </Td>
                        <Td
                          fontSize={{ base: "xs", md: "sm" }}
                          textAlign="center"
                        >
                          {action}
                        </Td>
                      </Tr>
                    );
                  })
                ) : (
                  <Tr>
                    <Td
                      colSpan={5}
                      textAlign="center"
                      color="gray.500"
                      fontSize={{ base: "xs", md: "sm" }}
                    >
                      No data for the selected status.
                    </Td>
                  </Tr>
                )}
              </Tbody>
            </Table>
          </Box>
        </Flex>
      )}
      <Box px={{ base: 2, md: 24 }} pt={8}>
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
