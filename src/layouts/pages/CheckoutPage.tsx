import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Input,
  Textarea,
  Stack,
  Radio,
  RadioGroup,
  Button,
  HStack,
  Divider,
  Image,
  Flex,
  FormControl,
  FormLabel,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { CartItem } from "./_subpages/CategoriesSection";
import { useOrder } from "../hooks/useOrder";
import { useAuth } from "../hooks/useAuth";

const CheckoutPage = () => {
  const {
    addNewOrderMutation,
    isAddingOrder,
    addOrderSuccess,
    generatePaymentLinkMutation,
    newOrderResponse,
    isGeneratingPaymentLink,
    generateShippingRateMutation,
    shippingRate,
    isShippingRateLink,
    shippingRateSuccess,
  } = useOrder();
  const { user } = useAuth();
  // const [couponCode, setCouponCode] = useState<string>("");
  // console.log(shippingRate, "shipping rate");
  const [cart] = useState<CartItem[]>(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  const generatePayment = () => {
    generatePaymentLinkMutation({
      amount: newOrderResponse?.data?.grand_total,
      narration: "ORDER",
      narration_id: newOrderResponse?.data?._id,
      platform: "web",
    });
  };

  const calculateSubtotal = (shippingRate: number) =>
    cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    ) + shippingRate;

  const groupedCart = cart.reduce<CartItem[]>((acc, product) => {
    const existingProduct = acc.find(
      (item: CartItem) => item?.productId === product.productId
    );
    if (existingProduct) {
      existingProduct.quantity += product.quantity;
    } else {
      acc.push({ ...product });
    }
    return acc;
  }, []);

  const handleShippingRate = async () => {
    const items = cart.map((product) => ({
      product_id: product.productId,
      quantity: product.quantity,
    }));

    const createShippingRate = {
      items,
    };
    try {
      await generateShippingRateMutation(createShippingRate);
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  useEffect(() => {
    // handleShippingRate();
    console.log("Hellooooo");
  }, []);

  const handleCheckout = async () => {
    const items = cart.map((product) => ({
      product_id: product.productId,
      quantity: product.quantity,
    }));

    const orderData = {
      items,
      address: user?.ShippingAddress?.full_address,
      payment_type: "INSTANT",
    };

    try {
      await generateShippingRateMutation({ items });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await addNewOrderMutation(orderData);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <Box py="120px">
      <Text
        textAlign="center"
        bg={"#FFF2ED"}
        pt={4}
        pb={4}
        fontSize="2xl"
        fontWeight="bold"
        mb={8}
      >
        Checkout
      </Text>
      <Box display="flex" p={6} justifyContent="space-between" gap={6} px={40}>
        <Box w="50%">
          <Box
            as="div"
            bg="#F9F9F9"
            borderRadius="15px"
            p={3}
            mb={6}
            display="flex"
            justifyContent="space-between"
          >
            <Text>
              <Text fontSize="xl" fontWeight="medium">
                Shipping Address
              </Text>
              <Text fontSize="sm" w="60%">
                {user?.ShippingAddress?.full_address}
              </Text>
            </Text>
            <Text
              color="white"
              bg="#FF5733"
              fontSize="sm"
              h="30px"
              w="30px"
              p={2}
              borderRadius={"full"}
              mt={1}
              cursor="pointer"
            >
              <FaPencilAlt />
            </Text>
          </Box>

          <Box
            as="div"
            bg="#F9F9F9"
            borderRadius="15px"
            p={3}
            display="flex"
            justifyContent="space-between"
          >
            <Text>
              <Text fontSize="xl" fontWeight="medium">
                Contact Information
              </Text>
              <Text fontSize="sm">{user?.PhoneNumber}</Text>
            </Text>
            <Text
              color="white"
              bg="#FF5733"
              fontSize="sm"
              h="30px"
              w="30px"
              p={2}
              borderRadius={"full"}
              mt={1}
              cursor="pointer"
            >
              <FaPencilAlt />
            </Text>
          </Box>

          <Box>
            {/* <FormControl mt={8}>
              <FormLabel>Coupon Code</FormLabel>
              <Input
                placeholder="Coupon Code"
                height="52px"
                bg="#F8EDEA80"
                outline="none"
                borderRadius="xl"
                fontSize="sm"
                width="100%"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </FormControl> */}
            {!addOrderSuccess ? (
              <Button
                color="white"
                bg="#FF5733"
                borderRadius="full"
                mt={6}
                w="full"
                h="55px"
                size="lg"
                loadingText="Creating order..."
                isLoading={isAddingOrder || isShippingRateLink}
                onClick={handleCheckout}
              >
                Create Order
              </Button>
            ) : (
              <Button
                color="white"
                bg="#FF5733"
                borderRadius="full"
                mt={6}
                w="full"
                h="55px"
                size="lg"
                loadingText="Making payment..."
                isLoading={isGeneratingPaymentLink}
                onClick={generatePayment}
              >
                Pay now
              </Button>
            )}
          </Box>
        </Box>

        <Box w="50%" p={4}>
          <Box mb={6}>
            <Flex justifyContent="space-between" mb={4}>
              <Text fontSize="xl" fontWeight="semibold">
                Product
              </Text>
              <Text fontSize="xl" fontWeight="semibold">
                Subtotal
              </Text>
            </Flex>

            {groupedCart.map((product: CartItem) => (
              <Flex
                key={product.productId}
                justifyContent="space-between"
                mb={2}
              >
                <Text fontSize="14px" color="#9F9F9F">
                  {product.productName} x {product.quantity}
                </Text>
                <Text>
                  ₦{(product.price * product.quantity).toLocaleString()}
                </Text>
              </Flex>
            ))}

            <Flex justifyContent="space-between" mt={4}>
              <Text>Shipping Rate</Text>
              <Text>{isShippingRateLink ? <Spinner /> : shippingRate}</Text>
            </Flex>

            <Flex justifyContent="space-between" mt={4}>
              <Text>Subtotal</Text>
              <Text>₦{calculateSubtotal(shippingRate).toLocaleString()}</Text>
            </Flex>

            <Flex justifyContent="space-between" mt={2}>
              <Text fontWeight="medium">Total Amount</Text>
              <Text>₦{calculateSubtotal(shippingRate).toLocaleString()}</Text>
            </Flex>
          </Box>

          {/* <Box p={2}>
            <Box mb={6}>
              <Text fontSize="lg" fontWeight="semibold" mb={4}>
                Payment Options
              </Text>
              <RadioGroup flexDirection="column" gap={6}>
                <Flex justifyContent="space-between" mb={2}>
                  <HStack>
                    <Image src={card} />
                    <Text fontWeight="normal" color="#9F9F9F" fontSize="md">
                      Credit card
                    </Text>
                  </HStack>
                  <Radio
                    value="credit-card"
                    size="lg"
                    _checked={{
                      bg: "#FF5733",
                    }}
                  ></Radio>
                </Flex>
                <Text fontSize="sm" color="#9F9F9F" mb={6}>
                  Make your payment directly into our bank account. Please use
                  your Order ID as the payment reference. Your order will not be
                  shipped until the funds have cleared.
                </Text>

                <Flex justifyContent="space-between" mb={6}>
                  <HStack>
                    <Image src={paystack} />
                    <Text fontWeight="normal" color="#9F9F9F" fontSize="md">
                      PayStack
                    </Text>
                  </HStack>
                  <Radio
                    value="paystack"
                    size="lg"
                    _checked={{
                      bg: "#FF5733",
                    }}
                  ></Radio>
                </Flex>

                <Flex justifyContent="space-between" mb={6}>
                  <HStack>
                    <Image src={paypal} />
                    <Text fontWeight="normal" color="#9F9F9F" fontSize="md">
                      Paypal
                    </Text>
                  </HStack>
                  <Radio
                    value="paypal"
                    size="lg"
                    _checked={{
                      bg: "#FF5733",
                    }}
                  ></Radio>
                </Flex>

                <Box
                  as="button"
                  w="100%"
                  border="1px dashed gray"
                  p={3}
                  borderRadius="md"
                  textAlign="center"
                >
                  <HStack justify="center">
                    <AddIcon boxSize={3} />
                    <Text fontSize="sm" color="gray.600">
                      Add card
                    </Text>
                  </HStack>
                </Box>
              </RadioGroup>
              <Box my="4">
                <Text fontSize="sm">
                  Your personal data will be used to support your experience
                  throughout this website, to manage access to your account, and
                  for other purposes described in our privacy policy.
                </Text>
              </Box>
            </Box>

            <Divider my={4} />

            <Box mb={6}>
              <Text fontSize="lg" fontWeight="bold" mb={4}>
                Shipping Options
              </Text>
              <ShippingOptions />
            </Box>

            <Text fontSize="sm" color="gray.600" mt={4}>
              Delivered on or before Saturday, 16 October 2024
            </Text>

            <Button
              color="white"
              bg="#FF5733"
              borderRadius="full"
              mt={6}
              w="full"
              h="55px"
              size="lg"
            >
              Pay now
            </Button>
          </Box> */}
        </Box>
      </Box>
      {/* <PaymentMethod /> */}
    </Box>
  );
};

export default CheckoutPage;
