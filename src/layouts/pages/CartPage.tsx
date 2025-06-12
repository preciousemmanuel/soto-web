import { Box, Flex, Text, Button, Image, Heading } from "@chakra-ui/react";
import { RiDeleteBinLine } from "react-icons/ri";
import { CartItem } from "./_subpages/CategoriesSection";
import { useProduct } from "../hooks/useProduct";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { useOrder } from "../hooks/useOrder";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const CartPage = () => {
  const navigate = useNavigate();
  // const location = useLocation();

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

  const discountedPrice = (product: CartItem) =>
    product.discount || product.price;

  const calculateTotals = () => {
    const subtotal = cart.reduce(
      (acc, item) => acc + discountedPrice(item) * item.quantity,
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
    <Box p={[4, 6, 8]} mt={[120, 120, 120]}>
      <Flex
        align="center"
        justify="center"
        position="relative"
        bg="#FFF2ED"
        p={[4, 5, 6]}
        mt={[6, 8, 10]}
        mb={[4, 5, 6]}
      >
        <Button
          position="absolute"
          left={[2, 4, 6]}
          onClick={() => navigate(-1)}
          leftIcon={<ChevronLeftIcon />}
          variant="ghost"
          color="#FF5753"
          size={["sm", "md", "md"]}
        >
          Back
        </Button>
        <Heading size={["md", "lg", "lg"]} fontFamily="Poppins" color="#FF5753">
          Shopping Cart
        </Heading>
      </Flex>

      <Flex
        flexDirection={["column", "column", "row"]}
        justifyContent="space-between"
        gap={[4, 6, 8]}
        mb={[8, 12, 16]}
      >
        {/* Product List Section */}
        <Box
          flex="2"
          bg="white"
          p={[4, 5, 6]}
          borderRadius="md"
          boxShadow="sm"
          position="relative"
        >
          <Flex
            bg={"#FBF5F5"}
            py={[2, 3, 4]}
            fontWeight="bold"
            mb={[4, 5, 6]}
            px={[4, 5, 6]}
            justifyContent="space-between"
            borderRadius="md"
            flexDirection={["column", "row", "row"]}
            gap={[2, 0, 0]}
          >
            <Text flex="2" mb={[2, 0, 0]}>
              Product
            </Text>
            <Text flex="1" textAlign={["left", "center", "center"]}>
              Price
            </Text>
            <Text flex="1" textAlign={["left", "center", "center"]}>
              Qty
            </Text>
            <Text flex="1" textAlign={["left", "center", "center"]}>
              Subtotal
            </Text>
            <Text flex="0.5"></Text>
          </Flex>
          <Box mb={["40px", "50px", "60px"]}>
            <Button
              onClick={clearAllCart}
              color="#FF5733"
              variant="ghost"
              position="absolute"
              right="0px"
              size={["sm", "md", "md"]}
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
                py={[3, 4, 5]}
                px={[2, 4, 6]}
                borderBottom="1px solid"
                borderColor="gray.100"
                _hover={{ bg: "gray.50" }}
                flexDirection={["column", "row", "row"]}
                gap={[2, 0, 0]}
              >
                <Flex alignItems="center" gap={[2, 3, 4]} flex="2">
                  <Image
                    src={item.image}
                    alt={item.productName}
                    boxSize={["40px", "50px", "60px"]}
                    objectFit="cover"
                    borderRadius="md"
                  />
                  <Text fontWeight="medium" fontSize={["sm", "md", "md"]}>
                    {item.productName}
                  </Text>
                </Flex>
                <Text
                  flex="1"
                  textAlign={["left", "center", "center"]}
                  fontSize={["sm", "md", "md"]}
                >
                  ₦{discountedPrice(item).toLocaleString()}
                </Text>
                <Text
                  flex="1"
                  textAlign={["left", "center", "center"]}
                  fontSize={["sm", "md", "md"]}
                >
                  {item.quantity}
                </Text>
                <Text
                  flex="1"
                  textAlign={["left", "center", "center"]}
                  fontWeight="semibold"
                  fontSize={["sm", "md", "md"]}
                >
                  ₦{(discountedPrice(item) * item.quantity)?.toLocaleString()}
                </Text>
                <Flex
                  flex="0.5"
                  justifyContent={["flex-start", "flex-end", "flex-end"]}
                >
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

        <Box
          flex="1"
          p={[4, 5, 6]}
          height={["auto", "350px", "400px"]}
          bg={"#FBF5F5"}
          mt={[4, 0, 0]}
        >
          <Text
            fontWeight="bold"
            mb={[2, 3, 4]}
            color={"#FF5733"}
            fontSize={["24px", "28px", "30px"]}
          >
            Cart Totals
          </Text>
          {(() => {
            const { subtotal, total } = calculateTotals();
            return (
              <>
                <Flex justifyContent="space-between" mb={[1, 1.5, 2]}>
                  <Text fontSize={["sm", "md", "md"]}>Subtotal</Text>
                  <Text fontSize={["sm", "md", "md"]}>
                    ₦{subtotal?.toLocaleString()}
                  </Text>
                </Flex>
                <Flex justifyContent="space-between" mb={[2, 3, 4]}>
                  <Text fontWeight="bold" fontSize={["sm", "md", "md"]}>
                    Total
                  </Text>
                  <Text fontWeight="bold" fontSize={["sm", "md", "md"]}>
                    ₦{total?.toLocaleString()}
                  </Text>
                </Flex>
              </>
            );
          })()}
          {cart.length > 0 && (
            <Flex
              flexDirection="column"
              gap={[2, 3, 4]}
              mt={["20px", "25px", "30px"]}
            >
              <Button
                width="full"
                color="#FF5733"
                border="2px"
                borderColor="#FF5733"
                _hover={{ bg: "#FF5733", color: "#ffff" }}
                borderRadius="md"
                variant="outline"
                h={["44px", "48px", "54px"]}
                fontSize={["sm", "md", "md"]}
                onClick={() => {
                  navigate("/product-list");
                }}
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
                h={["44px", "48px", "54px"]}
                fontSize={["sm", "md", "md"]}
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </Button>
            </Flex>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default CartPage;
