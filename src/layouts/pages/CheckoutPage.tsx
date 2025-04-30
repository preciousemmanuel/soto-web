import { ChevronLeftIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Input,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Spinner,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { CartItem } from "./_subpages/CategoriesSection";
import { useOrder } from "../hooks/useOrder";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { CouponCard } from "../../components/Coupons";
import PaymentMethod from "./product/paymentMethod";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const {
    addNewOrderMutation,
    isAddingOrder,
    addOrderSuccess,
    // generatePaymentLinkMutation,
    newOrderResponse,
    // isGeneratingPaymentLink,
    generateShippingRateMutation,
    shippingRate,
    isShippingRateLink,
    coupons,
    isFetchCoupons,
  } = useOrder();
  const { user } = useAuth();
  const [couponCode, setCouponCode] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const onClose = () => setIsOpen(false);
  // const cancelRef = useRef<HTMLButtonElement>(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [items, setItems] = useState([]);
  const [cart] = useState<CartItem[]>(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // console.log(coupons, "coupons");

  const discountedPrice = (product: CartItem) =>
    product.discount || product.price;
  const couponDiscount = newOrderResponse?.data?.is_coupon_applied
    ? newOrderResponse.data.amount
    : 0;
  const calculateSubtotal = (shippingRate: number) => {
    const subtotal = cart.reduce((total, product) => {
      return total + discountedPrice(product) * product.quantity;
    }, 0);
    return subtotal + shippingRate - couponDiscount;
  };

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

  // const handleShippingRate = async () => {

  //   const createShippingRate = {
  //     items,
  //   };
  //   try {
  //     await generateShippingRateMutation(createShippingRate);
  //   } catch (error) {
  //     console.error("Error creating order:", error);
  //   }
  // };
  useEffect(() => {
    const items: any = cart.map((product) => ({
      _id: product.productId,
      quantity: product.quantity,
    }));
    setItems(items);
  }, []);

  useEffect(() => {
    generateShippingRateMutation({ items });
  }, [items]);

  useEffect(() => {
    if (addOrderSuccess) {
      setIsOpen(true);
    }
  }, [addOrderSuccess]);

  const handleCheckout = async () => {
    const items = cart.map((product) => ({
      product_id: product.productId,
      quantity: product.quantity,
    }));

    const orderData: any = {
      items,
      address: user?.ShippingAddress?.full_address,
      payment_type: "INSTANT",
    };

    if (couponCode) {
      orderData.coupon_code = couponCode;
    }

    try {
      await addNewOrderMutation(orderData);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <Box py={{ base: "120px", md: "120px", lg: "120px" }}>
      <Flex
        align="center"
        justify="center"
        position="relative"
        bg="#FFF2ED"
        p={{ base: 4, md: 5, lg: 6 }}
        mt={{ base: 8, md: 12, lg: 14 }}
        mb={{ base: 4, md: 5, lg: 6 }}
      >
        <Button
          position="absolute"
          left={{ base: 2, md: 4, lg: 6 }}
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
          Checkout
        </Heading>
      </Flex>

      <Box
        display="flex"
        flexDirection={{ base: "column", md: "row" }}
        p={{ base: 2, md: 4, lg: 6 }}
        justifyContent="space-between"
        gap={{ base: 4, md: 5, lg: 6 }}
        px={{ base: 2, md: 6, lg: 20 }}
      >
        <Box w={{ base: "100%", md: "60%", lg: "70%" }}>
          <Box
            as="div"
            bg="#F9F9F9"
            borderRadius="15px"
            p={{ base: 2, md: 3 }}
            mb={{ base: 4, md: 5, lg: 6 }}
            display="flex"
            justifyContent="space-between"
          >
            <Text>
              <Text
                fontSize={{ base: "md", md: "lg", lg: "xl" }}
                fontWeight="medium"
              >
                Shipping Address
              </Text>
              <Text
                fontSize={{ base: "xs", md: "sm" }}
                w={{ base: "100%", md: "60%" }}
              >
                {user?.ShippingAddress?.full_address}
              </Text>
            </Text>
            <Text
              color="white"
              bg="#FF5733"
              fontSize={{ base: "sm", md: "sm" }}
              h={{ base: "30px", md: "30px" }}
              w={{ base: "30px", md: "30px" }}
              p={2}
              borderRadius="full"
              mt={1}
              cursor="pointer"
              onClick={() => navigate("/auth/shipping-address")}
            >
              <FaPencilAlt />
            </Text>
          </Box>

          <Box
            as="div"
            bg="#F9F9F9"
            borderRadius="15px"
            p={{ base: 2, md: 3 }}
            display="flex"
            justifyContent="space-between"
          >
            <Text>
              <Text
                fontSize={{ base: "md", md: "lg", lg: "xl" }}
                fontWeight="medium"
              >
                Contact Information
              </Text>
              <Text fontSize={{ base: "xs", md: "sm" }}>
                {user?.PhoneNumber}
              </Text>
            </Text>
            {/* <Text
              color="white"
              bg="#FF5733"
              fontSize={{ base: "xs", md: "sm" }}
              h={{ base: "30px", md: "30px" }}
              w={{ base: "30px", md: "30px" }}
              p={2}
              borderRadius="full"
              mt={1}
              cursor="pointer"
            >
              <FaPencilAlt />
            </Text> */}
          </Box>

          <Box>
            <FormControl mt={{ base: 4, md: 6, lg: 8 }}>
              <FormLabel fontSize={{ base: "sm", md: "md" }}>
                Coupon Code
              </FormLabel>
              <Input
                placeholder="Coupon Code"
                height={{ base: "40px", md: "48px", lg: "52px" }}
                bg="#F8EDEA80"
                outline="none"
                borderRadius="xl"
                fontSize={{ base: "xs", md: "sm" }}
                width="100%"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </FormControl>

            <Button
              color="white"
              bg="#FF5733"
              borderRadius="full"
              mt={{ base: 4, md: 5, lg: 6 }}
              w="full"
              h={{ base: "40px", md: "48px", lg: "55px" }}
              size={{ base: "sm", md: "md", lg: "lg" }}
              loadingText={
                isAddingOrder
                  ? "Creating order..."
                  : "Generating shipping rate..."
              }
              isLoading={isAddingOrder || isShippingRateLink}
              onClick={handleCheckout}
            >
              Create Order
            </Button>
          </Box>
        </Box>

        <Box
          w={{ base: "100%", md: "60%", lg: "70%" }}
          p={{ base: 1, md: 2, lg: 4 }}
        >
          <Box mb={{ base: 4, md: 5, lg: 6 }}>
            <Flex justifyContent="space-between" mb={{ base: 2, md: 3, lg: 4 }}>
              <Text
                fontSize={{ base: "md", md: "lg", lg: "xl" }}
                fontWeight="semibold"
              >
                Product
              </Text>
              <Text
                fontSize={{ base: "md", md: "lg", lg: "xl" }}
                fontWeight="semibold"
              >
                Subtotal
              </Text>
            </Flex>

            {groupedCart.map((product: CartItem) => (
              <Flex
                key={product.productId}
                justifyContent="space-between"
                mb={{ base: 1, md: 2 }}
              >
                <Text fontSize={{ base: "xs", md: "sm" }} color="#9F9F9F">
                  {product.productName} x {product.quantity}
                </Text>
                <Text fontSize={{ base: "xs", md: "sm" }}>
                  ₦
                  {(
                    discountedPrice(product) * product.quantity
                  )?.toLocaleString()}
                </Text>
              </Flex>
            ))}

            <Flex justifyContent="space-between" mt={{ base: 2, md: 3, lg: 4 }}>
              <Text fontSize={{ base: "xs", md: "sm" }}>Shipping Rate</Text>
              <Text fontSize={{ base: "xs", md: "sm" }}>
                {isShippingRateLink ? <Spinner /> : shippingRate}
              </Text>
            </Flex>
            <Flex justifyContent="space-between" mt={{ base: 2, md: 3, lg: 4 }}>
              <Text fontSize={{ base: "xs", md: "sm" }}>Subtotal</Text>
              <Text fontSize={{ base: "xs", md: "sm" }}>
                ₦
                {newOrderResponse?.data?.is_coupon_applied
                  ? newOrderResponse?.data?.grand_total
                  : calculateSubtotal(shippingRate)?.toLocaleString()}
              </Text>
            </Flex>

            <Flex justifyContent="space-between" mt={{ base: 1, md: 2 }}>
              <Text fontSize={{ base: "sm", md: "md" }} fontWeight="medium">
                Total Amount
              </Text>
              <Text fontSize={{ base: "sm", md: "md" }}>
                ₦{calculateSubtotal(shippingRate)?.toLocaleString()}
              </Text>
            </Flex>
          </Box>

          <VStack
            spacing={{ base: 2, md: 3, lg: 4 }}
            p={{ base: 1, md: 2, lg: 5 }}
          >
            {coupons?.data?.data?.length === 0 ? (
              <Text
                fontSize={{ base: "sm", md: "md", lg: "lg" }}
                color="gray.500"
              >
                No coupons available.
              </Text>
            ) : (
              coupons?.data?.data?.map(
                (
                  coupon: { name: any; code: any; expiry_date: any },
                  index: any
                ) => (
                  <CouponCard
                    key={index}
                    title={coupon.name}
                    code={coupon.code}
                    expiryDate={coupon.expiry_date}
                  />
                )
              )
            )}
          </VStack>
          {isOpen && (
            <PaymentMethod
              setPaymentMethod={setPaymentMethod}
              paymentMethod={paymentMethod}
              amount={newOrderResponse?.data?.grand_total}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default CheckoutPage;
