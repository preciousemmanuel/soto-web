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
import { useNavigate, useParams } from "react-router-dom";
import { useOrder } from "../../hooks/useOrder";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { useSingleVendorOrder } = useOrder();
  const { data: oneOrder, isPending } = useSingleVendorOrder(orderId as string);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!oneOrder || !oneOrder?.data) {
    return <LoadingSpinner />;
  }

  const {
    data: { status },
  } = oneOrder ?? {};

  return (
    <Box
      p={{ base: 4, sm: 6, md: 8 }}
      h="100%"
      fontFamily="Poppins"
      mt={{ base: 16, sm: 20, md: 24, lg: 28, xl: 100 }}
    >
      <Flex
        align="center"
        justify="center"
        position="relative"
        bg="#FFF2ED"
        p={{ base: 3, sm: 4, md: 5, lg: 6 }}
        mt={{ base: 2, sm: 3, md: 4, lg: 6, xl: 10 }}
        mb={{ base: 3, sm: 4, md: 5, lg: 6 }}
      >
        <Button
          position="absolute"
          left={{ base: 1, sm: 2, md: 4, lg: 6 }}
          onClick={() => navigate(-1)}
          leftIcon={<ChevronLeftIcon />}
          variant="ghost"
          color="#FF5753"
          size={{ base: "xs", sm: "sm", md: "md" }}
        >
          Back
        </Button>
        <Heading
          size={{ base: "sm", sm: "md", md: "lg" }}
          fontFamily="Poppins"
          color="#FF5753"
        >
          Order Details
        </Heading>
      </Flex>
      {isPending ? (
        <LoadingSpinner />
      ) : (
        <Box 
          p={{ base: 2, sm: 3, md: 4, lg: 6, xl: 8 }} 
          bg="white" 
          maxW={{ base: "100%", sm: "90%", md: "95%", lg: "1000px" }} 
          mx="auto"
        >
          <HStack
            spacing={{ base: 2, sm: 3, md: 4, lg: 6, xl: 8 }}
            align="stretch"
            direction={{ base: "column", md: "row" }}
          >
            <Box
              flex={1}
              bg="orange.50"
              p={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }}
              borderRadius="md"
            >
              <HStack justify="space-between" w="full">
                <Text fontSize={{ base: "xs", sm: "sm", md: "md" }} fontWeight="medium">
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
                  px={{ base: 1, sm: 2, md: 3, lg: 4 }}
                  py={1}
                  borderRadius="md"
                  fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
                >
                  {status.replace("_", " ")}
                </Badge>
              </HStack>

              <VStack align="start" spacing={1} mt={{ base: 2, sm: 3, md: 4 }}>
                <Text fontSize={{ base: "xs", sm: "sm", md: "md" }} fontWeight="semibold">
                  General Info
                </Text>
                <Box
                  p={{ base: 1, sm: 2, md: 3, lg: 4 }}
                  bg="white"
                  borderRadius="md"
                  boxShadow="sm"
                  w="full"
                >
                  <HStack justify="space-between" w="full">
                    <Text fontSize={{ base: "2xs", sm: "xs", md: "sm" }} color="gray.600">
                      Order ID
                    </Text>
                    <Text fontSize={{ base: "2xs", sm: "xs", md: "sm" }} fontWeight="bold">
                      {oneOrder?.data?.tracking_id}
                    </Text>
                  </HStack>
                  <Divider my={{ base: 1, sm: 2, md: 3, lg: 4 }} />
                  <HStack justify="space-between" w="full">
                    <Text fontSize={{ base: "2xs", sm: "xs", md: "sm" }} color="gray.600">
                      Order date
                    </Text>
                    <Text fontSize={{ base: "2xs", sm: "xs", md: "sm" }}>
                      {new Date(oneOrder?.data?.createdAt).toLocaleString()}
                    </Text>
                  </HStack>
                </Box>
              </VStack>

              <HStack justify="space-between" w="full" py={{ base: 2, sm: 3, md: 4 }}>
                <Text fontSize={{ base: "xs", sm: "sm", md: "md" }} fontWeight="semibold">
                  Payment Status
                </Text>
                <Badge
                  colorScheme="green"
                  px={{ base: 1, sm: 2, md: 3, lg: 4 }}
                  py={1}
                  borderRadius="md"
                  fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
                >
                  {oneOrder?.data?.payment_type}
                </Badge>
              </HStack>

              <Box
                p={{ base: 1, sm: 2, md: 3, lg: 4 }}
                bg="white"
                borderRadius="md"
                boxShadow="sm"
                w="full"
              >
                <VStack align="start" spacing={1}>
                  <HStack justify="space-between" w="full">
                    <Text fontSize={{ base: "2xs", sm: "xs", md: "sm" }} color="gray.600">
                      Total Amount
                    </Text>
                    <Text
                      fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
                      fontWeight="bold"
                      color="red.500"
                    >
                      ₦{oneOrder?.data?.grand_total}
                    </Text>
                  </HStack>
                </VStack>
              </Box>
            </Box>
            <Flex direction="column" flex={1} h="100%">
              <Box bg="orange.50" p={{ base: 2, sm: 3, md: 4, lg: 5, xl: 6 }} borderRadius="md">
                <Text
                  fontSize={{ base: "xs", sm: "sm", md: "md" }}
                  fontWeight="semibold"
                  mb={{ base: 1, sm: 2, md: 3, lg: 4 }}
                >
                  Product List
                </Text>

                <VStack spacing={{ base: 1, sm: 2, md: 3, lg: 4 }} align="stretch">
                  {oneOrder?.data?.items?.map((item: any) => (
                    <Box
                      key={item?._id}
                      p={{ base: 1, sm: 2, md: 3, lg: 4 }}
                      bg="white"
                      borderRadius="md"
                      boxShadow="sm"
                    >
                      <HStack spacing={{ base: 1, sm: 2, md: 3, lg: 4 }}>
                        <Image
                          src={item?.images[0]}
                          alt={item?.product_name}
                          boxSize={{ base: "30px", sm: "35px", md: "40px", lg: "45px", xl: "50px" }}
                          objectFit="cover"
                          borderRadius="md"
                        />
                        <VStack align="start" spacing={0}>
                          <Text
                            fontSize={{ base: "2xs", sm: "xs", md: "sm" }}
                            fontWeight="bold"
                          >
                            {item?.product_name}
                          </Text>
                          <Text
                            fontSize={{ base: "3xs", sm: "2xs", md: "xs" }}
                            color="gray.600"
                          >
                            Size: {item?.description}
                          </Text>
                          <Text
                            fontSize={{ base: "3xs", sm: "2xs", md: "xs" }}
                            color="gray.600"
                          >
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
