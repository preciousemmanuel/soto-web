import React, { useEffect } from "react";
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
  Divider,
  Badge,
} from "@chakra-ui/react";
import { FaClipboard } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useOrder } from "../hooks/useOrder";
import LoadingSpinner from "../../features/helpers/LoadingSpinner";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const OrderDetailPage = () => {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const { useSingleOrder } = useOrder();
  const { data: oneOrder, isPending } = useSingleOrder(orderId as string);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [orderId]);

  if (!oneOrder || !oneOrder.data) {
    return <LoadingSpinner />;
  }

  const {
    data: { status,tracking_id },
  } = oneOrder ?? {};

  const trackingSteps = [
    
    { label: "Order Booked", active: status === "BOOKED" },
    { label: "Order Shipped", active: status === "SHIPPED" || status === "PICKED_UP" },
    { label: "Order Delivered", active: status === "DELIVERED" },
    ...(status === "CANCELLED" ? [{ label: "Order Cancelled", active: true }] : []),
    ...(status === "FAILED" ? [{ label: "Order Failed", active: true }] : []),
  ];

  return (
    <Box p={8} h="100%" fontFamily="Poppins" mt={100}>
      <Flex 
        align="center" 
        justify="center" 
        position="relative"
        bg="#FFF2ED"
        p={6}
        mt={10}
        mb={6}
      >
        <Button
          position="absolute"
          left={6}
          onClick={() => navigate(-1)}
          leftIcon={<ChevronLeftIcon />}
          variant="ghost"
          color="#FF5753"
        >
          Back
        </Button>
        <Heading
          size="lg"
          fontFamily="Poppins"
          color="#FF5753"
        >
            Order Details
        </Heading>
      </Flex>
      <Flex direction="row" justifyContent="space-between" w="100%">
      {isPending ? (
        <LoadingSpinner />
      ) : (
        <Box p={8} bg="white" w="70%">
          <HStack spacing={8} align="stretch">
            <Box flex={1} bg="orange.50" p={6} borderRadius="md">
              <HStack justify="space-between" w="full">
                <Text fontSize="md" fontWeight="medium">
                  Delivery Status
                </Text>
                <Badge
                  colorScheme={
                    status === "PENDING"
                      ? "blue"
                      : status === "BOOKED"
                      ? "green"
                      : status === "CANCELLED"
                      ? "red"
                      : status === "DELIVERED"
                      ? "purple"
                      : status === "FAILED"
                      ? "red"
                      : status === "CUSTOM"
                      ? "teal"
                      : "yellow"
                  }
                  px={4}
                  py={1}
                  borderRadius="md"
                >
                  {status}
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
                      {oneOrder.data?.tracking_id}
                    </Text>
                  </HStack>
                  <Divider my={4} />
                  <HStack justify="space-between" w="full">
                    <Text fontSize="sm" color="gray.600">
                      Order date
                    </Text>
                    <Text fontSize="sm">
                      {new Date(oneOrder.data.createdAt).toLocaleString()}
                    </Text>
                  </HStack>
                </Box>
              </VStack>

              <HStack justify="space-between" w="full" py="16px">
                <Text fontSize="md" fontWeight="semibold">
                  Payment Status
                </Text>
                <Badge colorScheme="green" px={4} py={1} borderRadius="md">
                  {oneOrder.data.payment_type}
                </Badge>
              </HStack>

              <Box p={4} bg="white" borderRadius="md" boxShadow="sm" w="full">
                <VStack align="start" spacing={2}>
                  <HStack justify="space-between" w="full">
                    <Text fontSize="sm" color="gray.600">
                      Total Amount
                    </Text>
                    <Text fontSize="sm" fontWeight="bold" color="red.500">
                      ₦{oneOrder.data.grand_total}
                    </Text>
                  </HStack>
                  <HStack justify="space-between" w="full" pt="6px">
                    <Text fontSize="sm" color="gray.600">
                      Buyer
                    </Text>
                    <Text fontSize="sm">
                      {oneOrder.data.user.FirstName}{" "}
                      {oneOrder.data.user.LastName}
                    </Text>
                  </HStack>
                </VStack>
              </Box>
            </Box>
            <Flex direction="column" flex={1} h="100%">
              <Box bg="orange.50" p={6} borderRadius="md">
                <Text fontSize="md" fontWeight="semibold" mb={4}>
                  Product List
                </Text>

                <VStack spacing={4} align="stretch">
                  {oneOrder.data.items.map((item: any) => (
                    <Box
                      key={item._id}
                      p={4}
                      bg="white"
                      borderRadius="md"
                      boxShadow="sm"
                    >
                      <HStack spacing={4}>
                        <Image
                          src={item.images[0]}
                          alt={item.product_name}
                          boxSize="50px"
                          objectFit="cover"
                          borderRadius="md"
                        />
                        <VStack align="start">
                          <Text fontSize="sm" fontWeight="bold">
                            {item.product_name}
                          </Text>
                          <Text fontSize="xs" color="gray.600">
                            Size: {item.description}
                          </Text>
                          <Text fontSize="xs" color="gray.600">
                            Qty: {item.quantity}
                          </Text>
                        </VStack>
                      </HStack>
                    </Box>
                  ))}
                </VStack>
              </Box>
              <Button
                onClick={() => navigate(`/raise-dispute/${orderId}`)}
                mt={6}
                color="white"
                bg="#FF5753"
                size="lg"
                w="full"
                borderRadius="md"
              >
                Raise Dispute
              </Button>
            </Flex>
          </HStack>
        </Box>
      )}
      <Box w="400px">
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
      </Box>
      </Flex>
    </Box>
  );
};

export default OrderDetailPage;
