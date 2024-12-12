import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  HStack,
  Button,
  Icon,
  VStack,
} from "@chakra-ui/react";
import { FaClipboard } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useOrder } from "../hooks/useOrder";
import LoadingSpinner from "../../features/helpers/LoadingSpinner";

const OrderDetailPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { useSingleOrder } = useOrder();
  const {data:oneOrder,isPending} = useSingleOrder(orderId as string);

  if (!oneOrder || !oneOrder.data) {
    return <LoadingSpinner/>; 
  }

  const {
    items = [],
    tracking_id,
    total_amount,
    delivery_amount,
    grand_total,
    status,
    shipping_address,
    delivery_vendor,
  } = oneOrder.data;

  const trackingSteps = [
    { label: "Order Pending", active: status === "PENDING" },
    { label: "Order Booked", active: status === "BOOKED" },
    { label: "Order Cancelled", active: status === "CANCELLED" },
    { label: "Order Delivered", active: status === "DELIVERED" },
    { label: "Order Failed", active: status === "FAILED" },
  ];
  
  return (
    <Box p={8} minH="100vh" fontFamily="Poppins" mt={120}>
      <Heading
        size="lg"
        mb={6}
        mt={6}
        fontFamily="Poppins"
        bg="#FFF2ED"
        py={6}
        textAlign="center"
        color="#FF5753"
      >
        My Orders
      </Heading>
     {isPending ? <LoadingSpinner/> : <Flex justify="space-between" px={12} py={8} mx="auto">
        <Box flex="1" maxW="400px">
          {items?.length > 0 ? (
            items?.map((item:any) => (
              <Box key={item?.product_id} mb={10}>
                <Image
                  src={item?.images[0]}
                  alt={item.product_name}
                  borderRadius="xl"
                  mb={8}
                />
                <Heading size="2xl" fontWeight="bold" mb={4}>
                  {item?.product_name}
                </Heading>
                <Text fontSize="3xl" color="#FF5753" fontWeight="bold" mb={2}>
                  ₦{item?.unit_price.toLocaleString()}
                </Text>
                <Text color="gray.600" fontSize="lg" mb={8}>
                  {item?.description}
                </Text>
              </Box>
            ))
          ) : (
            <Text>No items found in this order.</Text>
          )}
        </Box>
  
        
        <Box flex="1" maxW="600px" ml={12}>
          <Heading size="28px" color="gray.600" fontWeight="semibold" mb={6}>
            Track Order
          </Heading>
          <HStack
            justify="space-between"
            bg="gray.100"
            p={6}
            borderRadius="xl"
            mb={6}
          >
            <Text fontWeight="semibold" fontSize="md">
              Tracked ID: {tracking_id}
            </Text>
            <Icon
              as={FaClipboard}
              boxSize={6}
              cursor="pointer"
              color="#FF5753"
            />
          </HStack>
  
         <Flex>
          <VStack align="stretch" width="100%" mt={8}>
            {trackingSteps?.map((step, index) => (
              <Flex key={index} align="center" justify="flex-start" w="100%">
                <Box >
                  <Box
                    w={4}
                    h={4}
                    borderRadius="full"
                    bg={step.active ? "#FF5753" : "gray.300"}
                    border="2px solid"
                    borderColor={step.active ? "#FF5753" : "gray.300"}
                  />
                  {index !== trackingSteps.length - 1 && (
                    <Box
                      w={2}
                      h="60px"
                      bg={step.active ? "#FF5753" : "gray.300"}
                      ml={1}
                      mt={-2}
                      mb={2}
                    />
                  )}
                </Box>
                <Text ml={4} fontSize="lg" color={step.active ? "#FF5753" : "gray.600"}>
                  {step.label}
                </Text>
              </Flex>
            ))}
          </VStack>
  
          <VStack align="stretch" spacing={4} mt={6}>
            <Text fontSize="lg" fontWeight="bold" color="#FF5753">
              Order Status: {status}
            </Text>
            <Text fontSize="md" color="gray.600">
              Shipping Address: {shipping_address}
            </Text>
            <Text fontSize="md" color="gray.600">
              Delivery Vendor: {delivery_vendor?.carrier_name} (
              {delivery_vendor?.carrier_rate_description})
            </Text>
            <Text fontSize="md" color="gray.600">
              Total Amount: ₦{total_amount.toLocaleString()}
            </Text>
            <Text fontSize="md" color="gray.600">
              Delivery Fee: ₦{delivery_amount.toLocaleString()}
            </Text>
            <Text fontSize="md" color="gray.600">
              Grand Total: ₦{grand_total.toLocaleString()}
            </Text>
          </VStack>
          </Flex>
        </Box>
      </Flex>}
    </Box>
  );
  
};

export default OrderDetailPage;

