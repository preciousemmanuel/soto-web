import React, { useEffect, useRef, useState } from "react";
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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { FaClipboard } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useOrder } from "../hooks/useOrder";
import LoadingSpinner from "../../features/helpers/LoadingSpinner";
import { ChevronLeftIcon, CloseIcon } from "@chakra-ui/icons";
import PaymentMethod from "./product/paymentMethod";

const OrderDetailPage = () => {
  const navigate = useNavigate();
  const { orderId } = useParams<{ orderId: string }>();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => setIsOpen(false);
  const { useSingleOrder } = useOrder();
  const { data: oneOrder, isPending } = useSingleOrder(orderId as string);
  const [paymentMethod, setPaymentMethod] = useState("");
  // console.log(oneOrder,"oneOrder")

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const generatePayment = () => {
  //   generatePaymentLinkMutation({
  //     amount: oneOrder?.data?.grand_total,
  //     narration: "ORDER",
  //     narration_id: oneOrder?.data?._id,
  //     platform: "web",
  //   });
  // };

  if (!oneOrder || !oneOrder.data) {
    return <LoadingSpinner />;
  }

  const {
    data: { status, tracking_id },
  } = oneOrder ?? {};

  const trackingSteps = [
    { label: "Order Pending", active: status === "PENDING" },
    { label: "Order Booked", active: status === "BOOKED" },
    {
      label: "Order Shipped",
      active: status === "SHIPPED" || status === "PICKED_UP",
    },
    { label: "Order Delivered", active: status === "DELIVERED" },
    ...(status === "CANCELLED"
      ? [{ label: "Order Cancelled", active: true }]
      : []),
    ...(status === "FAILED" ? [{ label: "Order Failed", active: true }] : []),
  ];

  return (
    <Box p={8} h="100%" fontFamily="Poppins" mt={100}>
      <Flex
        align="center"
        justify="center"
        position="relative"
        bg="#FFF2ED"
        p={{ base: 4, md: 6 }}
        mt={{ base: 6, md: 10 }}
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
          Order Details
        </Heading>
      </Flex>
      <Flex
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        w="100%"
        gap={{ base: 6, md: 8 }}
      >
        {isPending ? (
          <LoadingSpinner />
        ) : (
          <Box
            p={{ base: 4, md: 8 }}
            bg="white"
            w={{ base: "100%", md: "70%" }}
          >
            <HStack spacing={{ base: 4, md: 8 }} align="stretch">
              <Box
                flex={1}
                bg="orange.50"
                p={{ base: 4, md: 6 }}
                borderRadius="md"
              >
                <HStack justify="space-between" w="full">
                  <Text fontSize={{ base: "sm", md: "md" }} fontWeight="medium">
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

                <VStack align="start" spacing={2} mt={{ base: 3, md: 4 }}>
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="semibold"
                  >
                    General Info
                  </Text>
                  <Box
                    p={{ base: 2, md: 4 }}
                    bg="white"
                    borderRadius="md"
                    boxShadow="sm"
                    w="full"
                  >
                    <HStack justify="space-between" w="full">
                      <Text
                        fontSize={{ base: "xs", md: "sm" }}
                        color="gray.600"
                      >
                        Order ID
                      </Text>
                      <Text
                        fontSize={{ base: "xs", md: "sm" }}
                        fontWeight="bold"
                      >
                        {oneOrder.data?.tracking_id}
                      </Text>
                    </HStack>
                    <Divider my={{ base: 2, md: 4 }} />
                    <HStack justify="space-between" w="full">
                      <Text
                        fontSize={{ base: "xs", md: "sm" }}
                        color="gray.600"
                      >
                        Order date
                      </Text>
                      <Text fontSize={{ base: "xs", md: "sm" }}>
                        {new Date(oneOrder.data.createdAt).toLocaleString()}
                      </Text>
                    </HStack>
                  </Box>
                </VStack>

                <HStack
                  justify="space-between"
                  w="full"
                  py={{ base: 3, md: 4 }}
                >
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="semibold"
                  >
                    Payment Status
                  </Text>
                  <Badge colorScheme="green" px={4} py={1} borderRadius="md">
                    {oneOrder.data.payment_type}
                  </Badge>
                </HStack>

                <Box
                  p={{ base: 2, md: 4 }}
                  bg="white"
                  borderRadius="md"
                  boxShadow="sm"
                  w="full"
                >
                  <VStack align="start" spacing={2}>
                    <HStack justify="space-between" w="full">
                      <Text
                        fontSize={{ base: "xs", md: "sm" }}
                        color="gray.600"
                      >
                        Total Amount
                      </Text>
                      <Text
                        fontSize={{ base: "xs", md: "sm" }}
                        fontWeight="bold"
                        color="red.500"
                      >
                        ₦{oneOrder.data.grand_total}
                      </Text>
                    </HStack>
                    <HStack
                      justify="space-between"
                      w="full"
                      pt={{ base: 1, md: 2 }}
                    >
                      <Text
                        fontSize={{ base: "xs", md: "sm" }}
                        color="gray.600"
                      >
                        Buyer
                      </Text>
                      <Text fontSize={{ base: "xs", md: "sm" }}>
                        {oneOrder.data.user.FirstName}{" "}
                        {oneOrder.data.user.LastName}
                      </Text>
                    </HStack>
                  </VStack>
                </Box>
              </Box>
              <Flex direction="column" flex={1} h="100%">
                <Box bg="orange.50" p={{ base: 4, md: 6 }} borderRadius="md">
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    fontWeight="semibold"
                    mb={{ base: 2, md: 4 }}
                  >
                    Product List
                  </Text>

                  <VStack spacing={{ base: 2, md: 4 }} align="stretch">
                    {oneOrder.data.items.map((item: any) => (
                      <Box
                        key={item._id}
                        p={{ base: 2, md: 4 }}
                        bg="white"
                        borderRadius="md"
                        boxShadow="sm"
                      >
                        <HStack spacing={{ base: 2, md: 4 }}>
                          <Image
                            src={item.images[0]}
                            alt={item.product_name}
                            boxSize={{ base: "40px", md: "50px" }}
                            objectFit="cover"
                            borderRadius="md"
                          />
                          <VStack align="start">
                            <Text
                              fontSize={{ base: "xs", md: "sm" }}
                              fontWeight="bold"
                            >
                              {item.product_name}
                            </Text>
                            <Text
                              fontSize={{ base: "2xs", md: "xs" }}
                              color="gray.600"
                            >
                              Size: {item.description}
                            </Text>
                            <Text
                              fontSize={{ base: "2xs", md: "xs" }}
                              color="gray.600"
                            >
                              Qty: {item.quantity}
                            </Text>
                          </VStack>
                        </HStack>
                      </Box>
                    ))}
                  </VStack>
                </Box>

                {oneOrder.data.status === "PENDING" ? (
                  <Button
                    onClick={() => setIsOpen(true)}
                    mt={{ base: 4, md: 6 }}
                    color="white"
                    bg="#FF5753"
                    size={{ base: "md", md: "lg" }}
                    w="full"
                    borderRadius="md"
                  >
                    Proceed to make payment
                  </Button>
                ) : (
                  <Button
                    onClick={() => navigate(`/raise-dispute/${orderId}`)}
                    mt={{ base: 4, md: 6 }}
                    color="white"
                    bg="#FF5753"
                    size={{ base: "md", md: "lg" }}
                    w="full"
                    borderRadius="md"
                  >
                    Raise Dispute
                  </Button>
                )}
              </Flex>
            </HStack>
          </Box>
        )}
        <Box w={{ base: "100%", md: "400px" }}>
          <Heading
            size={{ base: "xl", md: "28px" }}
            color="gray.600"
            fontWeight="semibold"
            mb={{ base: 4, md: 6 }}
          >
            Track Order
          </Heading>
          <HStack
            justify="space-between"
            bg="gray.100"
            p={{ base: 4, md: 6 }}
            borderRadius="xl"
            mb={{ base: 4, md: 6 }}
          >
            <Text fontWeight="semibold" fontSize={{ base: "sm", md: "md" }}>
              Tracked ID: {tracking_id}
            </Text>
            <Icon
              as={FaClipboard}
              boxSize={{ base: 5, md: 6 }}
              cursor="pointer"
              color="#FF5753"
            />
          </HStack>

          <VStack align="stretch" width="100%" mt={{ base: 4, md: 8 }}>
            {trackingSteps?.map((step, index) => (
              <Flex key={index} align="center" justify="flex-start" w="100%">
                <Box>
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
                <Text
                  ml={4}
                  fontSize="lg"
                  color={step.active ? "#FF5753" : "gray.600"}
                >
                  {step.label}
                </Text>
              </Flex>
            ))}
          </VStack>
        </Box>
      </Flex>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          <CloseIcon />
        </AlertDialogHeader>
        <AlertDialogOverlay />
        <AlertDialogContent mt="220px" h="50%" w="100%">
          <AlertDialogBody
            py="20px"
            fontSize="18px"
            fontWeight="medium"
            textAlign="center"
          >
            <PaymentMethod
              setPaymentMethod={setPaymentMethod}
              paymentMethod={paymentMethod}
              amount={oneOrder?.data?.grand_total}
            />
          </AlertDialogBody>
          {/* <AlertDialogFooter>
            
          </AlertDialogFooter> */}
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
};

export default OrderDetailPage;
