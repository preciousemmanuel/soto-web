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
    <Box py="120px">
      <Flex
        align="center"
        justify="center"
        position="relative"
        bg="#FFF2ED"
        p={6}
        mt={14}
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
        <Heading size="lg" fontFamily="Poppins" color="#FF5753">
          Checkout
        </Heading>
      </Flex>

      <Box 
        display="flex" 
        flexDirection={{ base: "column", md: "row" }}
        p={{ base: 4, md: 6 }} 
        justifyContent="space-between" 
        gap={6} 
        px={{ base: 4, md: 20 }}
      >
        <Box w={{ base: "100%", md: "70%" }}>
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
              <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="medium">
                Shipping Address
              </Text>
              <Text fontSize="sm" w={{ base: "100%", md: "60%" }}>
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
              <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="medium">
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
            <FormControl mt={8}>
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
            </FormControl>
            
            <Button
              color="white"
              bg="#FF5733"
              borderRadius="full"
              mt={6}
              w="full"
              h="55px"
              size="lg"
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

        <Box w={{ base: "100%", md: "70%" }} p={{ base: 2, md: 4 }}>
          <Box mb={6}>
            <Flex justifyContent="space-between" mb={4}>
              <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="semibold">
                Product
              </Text>
              <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="semibold">
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
                  ₦
                  {(
                    discountedPrice(product) * product.quantity
                  )?.toLocaleString()}
                </Text>
              </Flex>
            ))}

            <Flex justifyContent="space-between" mt={4}>
              <Text>Shipping Rate</Text>
              <Text>{isShippingRateLink ? <Spinner /> : shippingRate}</Text>
            </Flex>
            <Flex justifyContent="space-between" mt={4}>
              <Text>Subtotal</Text>
              <Text>
                ₦
                {newOrderResponse?.data?.is_coupon_applied
                  ? newOrderResponse?.data?.grand_total
                  : calculateSubtotal(shippingRate)?.toLocaleString()}
              </Text>
            </Flex>

            <Flex justifyContent="space-between" mt={2}>
              <Text fontWeight="medium">Total Amount</Text>
              <Text>₦{calculateSubtotal(shippingRate)?.toLocaleString()}</Text>
            </Flex>
          </Box>

          <VStack spacing={4} p={{ base: 2, md: 5 }}>
            {coupons?.data?.data?.length === 0 ? (
              <Text fontSize={{ base: "md", lg: "lg" }} color="gray.500">
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
