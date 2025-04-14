import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useOrder } from "../../hooks/useOrder";
import LoadingSpinner from "../../../features/helpers/LoadingSpinner";
import PaginationControls from "../../../features/helpers/Pagination";
import { useVendor } from "../../hooks/useVendor";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const VendorOrder = () => {
  const [activeStatus, setActiveStatus] = useState("BOOKED");
  const navigate = useNavigate();
  const {
    ordersVendor,
    isFetchingOrders,
    ordersVendorPagination,
    handlePageChange,
  } = useOrder();
  const { vendorOverviewData } = useVendor();
  const orderData = ordersVendor?.data?.data;
  const vendorId = vendorOverviewData?.data?.user?._id;
  const filteredOrders = orderData?.filter(
    (order: any) => order.status === activeStatus
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // console.log(orderData,"ORDER-DATA")

  const handleProductClick = (orderId: string) => {
    navigate(`/vendor-orders/${orderId}`);
  };

  const renderStatusAndAction = (status: string, orderId: string) => {
    // console.log(orderId,"orderId.")
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
              color="white"
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
              colorScheme="red"
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
            <Text color="red.500" fontSize="18px" fontWeight="semibold">
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
      h="100vh"
      textAlign="center"
      mt={{ base: 4, md: 10 }}
    >
      <Flex
        align="center"
        justify="center"
        position="relative"
        bg="#FFF2ED"
        p={{ base: 4, md: 6 }}
        mt={{ base: 10, md: 20 }}
        mb={{ base: 4, md: 6 }}
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
          Orders
        </Heading>
      </Flex>

      <Flex justifyContent="left">
        <Flex
          justifyContent="center"
          gap={{ base: 2, md: 4 }}
          mb={{ base: 4, md: 8 }}
          maxW="100%"
          mx="auto"
          flexWrap="wrap"
        >
          {["BOOKED", "PICKED_UP", "DELIVERED", "CANCELLED", "FAILED"].map(
            (buttonStatus) => (
              <Button
                key={buttonStatus}
                bg={activeStatus === buttonStatus ? "#FF5733" : "#F4F6F9"}
                color={activeStatus === buttonStatus ? "white" : "black"}
                borderRadius="full"
                size={{ base: "sm", md: "md" }}
                onClick={() => setActiveStatus(buttonStatus)}
                m={{ base: 1, md: 0 }}
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
        <Flex justifyContent="center" px={{ base: 2, md: 4 }} overflowX="auto">
          <Table
            variant="simple"
            w="100%"
            maxW={{ base: "100%", md: "850px" }}
            textAlign="left"
            size={{ base: "sm", md: "md" }}
          >
            <Thead>
              <Tr>
                <Th fontSize={{ base: "xs", md: "md" }}>Order ID</Th>
                <Th fontSize={{ base: "xs", md: "md" }}>Order Date</Th>
                <Th fontSize={{ base: "xs", md: "md" }}>Products</Th>
                <Th fontSize={{ base: "xs", md: "md" }}>Status</Th>
                <Th fontSize={{ base: "xs", md: "md" }} textAlign="center">
                  Action
                </Th>
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
                      <Td fontSize={{ base: "xs", md: "md" }}>
                        {order?.tracking_id}
                      </Td>
                      <Td fontSize={{ base: "xs", md: "md" }}>
                        {new Date(order?.createdAt).toLocaleDateString()}
                      </Td>
                      <Td fontSize={{ base: "xs", md: "md" }}>
                        {
                          order?.items?.filter(
                            (item: any) => item.vendor === vendorId
                          )?.length
                        }
                      </Td>
                      <Td fontSize={{ base: "xs", md: "md" }}>{statusText}</Td>
                      <Td
                        fontSize={{ base: "xs", md: "md" }}
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
                    fontSize={{ base: "xs", md: "md" }}
                  >
                    No data for the selected status.
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Flex>
      )}
      <Box px={{ base: 4, md: 24 }} pt={{ base: 4, md: 8 }}>
        <PaginationControls
          currentPage={ordersVendorPagination.currentPage}
          totalPages={ordersVendorPagination.totalPages}
          onPageChange={handlePageChange}
          hasNextPage={ordersVendorPagination.hasNextPage}
        />
      </Box>
    </Box>
  );
};

export default VendorOrder;
