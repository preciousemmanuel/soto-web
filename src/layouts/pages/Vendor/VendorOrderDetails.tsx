import React, { useEffect } from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Badge,
  Divider,
  Button,
  Image,
  Heading,
  Flex,
} from "@chakra-ui/react";
import LoadingSpinner from "../../../features/helpers/LoadingSpinner";
import { useParams } from "react-router-dom";
import { useOrder } from "../../hooks/useOrder";

const OrderDetails = () => {
    const { orderId } = useParams<{ orderId: string }>();
  const { useSingleVendorOrder } = useOrder();
  const { data: oneOrder, isPending } = useSingleVendorOrder(orderId as string);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!oneOrder || !oneOrder?.data) {
    return <LoadingSpinner />;
  }

  

  const {
    data: {
      status,
    },
  } = oneOrder ?? {};

    
  return (
    <Box p={8} h="100vh" fontFamily="Poppins" mt={100}>
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
      Order Details
    </Heading>
    {isPending ? (
      <LoadingSpinner />
    ) : (
      <Box p={8} bg="white" maxW="1000px" mx="auto">
        <HStack spacing={8} align="stretch">
          <Box flex={1} bg="orange.50" p={6} borderRadius="md">
            <HStack justify="space-between" w="full">
              <Text fontSize="md" fontWeight="medium">
                Delivery Status
              </Text>
              <Badge
                colorScheme={
                  status === "PENDING" ? "blue" :
                  status === "BOOKED" ? "green" :
                  status === "CANCELLED" ? "red" :
                  status === "DELIVERED" ? "purple" :
                  status === "FAILED" ? "red" :
                  status === "CUSTOM" ? "teal" : "yellow"
                }
                px={4} py={1} borderRadius="md"
              >
                {status.replace("_", " ")}
              </Badge>
            </HStack>

            <VStack align="start" spacing={2} mt="16px">
              <Text fontSize="md" fontWeight="semibold">
                General Info
              </Text>
              <Box p={4} bg="white" borderRadius="md" boxShadow="sm" w="full">
                <HStack justify="space-between" w="full">
                  <Text fontSize="sm" color="gray.600">
                    Order ID
                  </Text>
                  <Text fontSize="sm" fontWeight="bold">
                    {oneOrder?.data?.tracking_id}
                  </Text>
                </HStack>
                <Divider my={4} />
                <HStack justify="space-between" w="full">
                  <Text fontSize="sm" color="gray.600">
                    Order date
                  </Text>
                  <Text fontSize="sm">
                    {new Date(oneOrder?.data?.createdAt).toLocaleString()}
                  </Text>
                </HStack>
              </Box>
            </VStack>

            <HStack justify="space-between" w="full" py="16px">
              <Text fontSize="md" fontWeight="semibold">
                Payment Status
              </Text>
              <Badge colorScheme="green" px={4} py={1} borderRadius="md">
                {oneOrder?.data?.payment_type}
              </Badge>
            </HStack>

            <Box p={4} bg="white" borderRadius="md" boxShadow="sm" w="full">
              <VStack align="start" spacing={2}>
                <HStack justify="space-between" w="full">
                  <Text fontSize="sm" color="gray.600">
                    Total Amount
                  </Text>
                  <Text fontSize="sm" fontWeight="bold" color="red.500">
                    ₦{oneOrder?.data?.grand_total}
                  </Text>
                </HStack>
              </VStack>
            </Box>
          </Box>
          <Flex direction="column" flex={1} h="100%">
            <Box bg="orange.50" p={6} borderRadius="md" >
              <Text fontSize="md" fontWeight="semibold" mb={4}>
                Product List
              </Text>

              <VStack spacing={4} align="stretch">
                {oneOrder?.data?.items?.map((item: any) => (
                  <Box
                    key={item?._id}
                    p={4}
                    bg="white"
                    borderRadius="md"
                    boxShadow="sm"
                  >
                    <HStack spacing={4}>
                      <Image
                        src={item?.images[0]}
                        alt={item?.product_name}
                        boxSize="50px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                      <VStack align="start">
                        <Text fontSize="sm" fontWeight="bold">
                          {item?.product_name}
                        </Text>
                        <Text fontSize="xs" color="gray.600">
                          Size: {item?.description}
                        </Text>
                        <Text fontSize="xs" color="gray.600">
                          Qty: {item?.quantity}
                        </Text>
                      </VStack>
                    </HStack>
                  </Box>
                ))}
              </VStack>
            </Box>
          </Flex>
        </HStack>
      </Box>
    )}
  </Box>
  );
};

export default OrderDetails;
