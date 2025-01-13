import { Box, Flex, Text, Button, Image, SimpleGrid, Heading } from "@chakra-ui/react";
import { RiDeleteBinLine } from "react-icons/ri";
import { CartItem } from "./_subpages/CategoriesSection";
import { useProduct } from "../hooks/useProduct";
import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useOrder } from "../hooks/useOrder";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const CartPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [cart, setCart] = useState<CartItem[]>(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [cart]);

  const { handleRemoveFromCart, clearAllCart } = useProduct();

  const updateCart = () => {
    const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(updatedCart);
  };

  const calculateTotals = () => {
    const subtotal = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return {
      subtotal,
      total: subtotal,
    };
  };

  useEffect(() => {
    window.addEventListener("cartUpdated", updateCart);
    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <Box p={[4, 6, 8]} mt={120}>
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
            Shopping Cart
        </Heading>
      </Flex>
    
      <Flex
        flexDirection={["column", "row"]}
        justifyContent="space-between"
        gap={8}
        mb={16}
      >
        {/* Product List Section */}
        <Box
          flex="2"
          bg="white"
          p={6}
          borderRadius="md"
          boxShadow="sm"
          position="relative"
        >
          <Flex
            bg={"#FBF5F5"}
            py={4}
            fontWeight="bold"
            mb={6}
            px={6}
            justifyContent="space-between"
            borderRadius="md"
          >
            <Text flex="2">Product</Text>
            <Text flex="1" textAlign="center">
              Price
            </Text>
            <Text flex="1" textAlign="center">
              Qty
            </Text>
            <Text flex="1" textAlign="center">
              Subtotal
            </Text>
            <Text flex="0.5"></Text>
          </Flex>
          <Box mb="60px">
            <Button
              onClick={clearAllCart}
              color="#FF5733"
              variant="ghost"
              position="absolute"
              right="0px"
              // float="right"
            >
              Clear All
            </Button>
          </Box>
          <Box>
            {cart.map((item) => (
              <Flex
                key={item.productId}
                alignItems="center"
                justifyContent="space-between"
                py={5}
                px={6}
                borderBottom="1px solid"
                borderColor="gray.100"
                _hover={{ bg: "gray.50" }}
              >
                <Flex alignItems="center" gap={4} flex="2">
                  <Image
                    src={item.image}
                    alt={item.productName}
                    boxSize="60px"
                    objectFit="cover"
                    borderRadius="md"
                  />
                  <Text fontWeight="medium">{item.productName}</Text>
                </Flex>
                <Text flex="1" textAlign="center">
                  N{item.price.toLocaleString()}
                </Text>
                <Text flex="1" textAlign="center">
                  {item.quantity}
                </Text>
                <Text flex="1" textAlign="center" fontWeight="semibold">
                  N{(item.price * item.quantity).toLocaleString()}
                </Text>
                <Flex flex="0.5" justifyContent="flex-end">
                  <Box
                    as="button"
                    color="red.500"
                    _hover={{ color: "red.600" }}
                    transition="all 0.2s"
                    onClick={() => {
                      handleRemoveFromCart(item.productId);
                      updateCart();
                    }}
                  >
                    <RiDeleteBinLine size={20} />
                  </Box>
                </Flex>
              </Flex>
            ))}
          </Box>
        </Box>

        <Box flex="1" p={6} height="400px" bg={"#FBF5F5"}>
          <Text fontWeight="bold" mb={4} color={"#FF5733"} fontSize={"30px"}>
            Cart Totals
          </Text>
          {(() => {
            const { subtotal, total } = calculateTotals();
            return (
              <>
                <Flex justifyContent="space-between" mb={2}>
                  <Text>Subtotal</Text>
                  <Text>N{subtotal?.toLocaleString()}</Text>
                </Flex>
                <Flex justifyContent="space-between" mb={4}>
                  <Text fontWeight="bold">Total</Text>
                  <Text fontWeight="bold">N{total?.toLocaleString()}</Text>
                </Flex>
              </>
            );
          })()}
          <Flex flexDirection="column" gap={4} mt="30px">
            <Button
              width="full"
              color="#FF5733"
              border="2px"
              borderColor="#FF5733"
              _hover={{ bg: "#FF5733", color: "#ffff" }}
              borderRadius="md"
              variant="outline"
              h="54px"
              onClick={() => { navigate("/product-list")}}
            >
              Continue Shopping
            </Button>
            <Button
              width="full"
              bg="#FF5733"
              color="#FFFF"
              _hover={{ bg: "#FF5733", color: "#ffff" }}
              borderRadius="md"
              variant="outline"
              h="54px"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </Button>
          </Flex>
        </Box>
      </Flex>

      {/* <RelatedProducts title="You may also like"  /> */}
    </Box>
  );
};

export default CartPage;
