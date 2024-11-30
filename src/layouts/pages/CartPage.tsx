import { Box, Flex, Text, Button, Image, SimpleGrid } from "@chakra-ui/react";
import { RiDeleteBinLine } from "react-icons/ri";
import { CartItem } from "./_subpages/CategoriesSection";
import RelatedProducts from "./product/relatedProduct";
import { useProduct } from "../hooks/useProduct";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  const { handleRemoveFromCart } = useProduct();
  // console.log(cart, "cart");
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
    <Box bg="" p={[4, 6, 8]} mt={120}>
      {/* Shopping Cart Header */}
      <Text
        textAlign="center"
        bg={"#FFF2ED"}
        pt={4}
        pb={4}
        fontSize="2xl"
        fontWeight="bold"
        mb={8}
      >
        Shopping Cart
      </Text>

      <Flex
        flexDirection={["column", "row"]}
        justifyContent="space-between"
        gap={8}
        mb={16}
      >
        {/* Product List Section */}
        <Box flex="2" bg="white" p={6} borderRadius="md" boxShadow="sm">
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
                  <Text>N{subtotal.toLocaleString()}</Text>
                </Flex>
                <Flex justifyContent="space-between" mb={4}>
                  <Text fontWeight="bold">Total</Text>
                  <Text fontWeight="bold">N{total.toLocaleString()}</Text>
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

      <RelatedProducts title="You may also like" />
    </Box>
  );
};

export default CartPage;
