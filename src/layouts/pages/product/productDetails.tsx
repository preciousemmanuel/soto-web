import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  HStack,
  VStack,
  Button,
  Select,
  SimpleGrid,
  Badge,
  Flex,
  Link,
  Icon,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";

interface ProductUser {
  FirstName: string;
  LastName: string;
  Email?: string;
}

interface ProductReview {
  comment: string;
  rating: number;
  product: string;
  user?: ProductUser;
}

interface ProductData {
  _id: string;
  product_name: string;
  description: string;
  category: any;
  images: string[];
  vendor: string;
  unit_price: number;
  raw_price: number;
  product_quantity: number;
  height: number;
  width: number;
  weight: number;
  is_discounted: boolean;
  in_stock: boolean;
  is_verified: boolean;
  is_deleted: boolean;
  total_quantity_sold: number;
  rating: number;
  status?: any;
}

interface ProductDetails {
  product?: ProductData;
  reviews?: ProductReview[];
  total_reviews?: number;
  sizes?: string[];
  colors?: string[];
  showOthers?: boolean;
  showColor?: boolean;
  showPrice?: boolean;
  // onAddToCart: (product:any) => void;
}

const ProductDetails: React.FC<ProductDetails> = ({
  product,
  sizes,
  colors,
  total_reviews,
  showOthers = true,
  showColor = true,
  showPrice = true,
}) => {
  const [quantity, setQuantity] = useState(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingItem = cartItems.find(
      (item: any) => item.productId === product?._id
    );
    return existingItem ? existingItem.quantity : 1;
  });
  const navigate = useNavigate();
  const { updateCart } = useProduct();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(product?.unit_price || 0);

  const formattedRawPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(product?.raw_price || 0);

  useEffect(() => {
    if (product?.product_quantity && product.product_quantity > 0) {
      updateCart(product, quantity);
    }
  }, [quantity, product, updateCart]);
  // console.log(quantity, "QUANTITY");

  return (
    <VStack align="start" spacing={{ base: 3, md: 5 }}>
      <Box>
        <Text
          fontSize={{ base: "28px", sm: "36px", md: "44px" }}
          fontWeight="bold"
        >
          {product?.product_name}
        </Text>
      {showPrice ? (
        <Text fontSize={{ base: "20px", md: "25px" }} color="#FF5733">
          {formattedPrice}
        </Text>
      ) : (
        <Text fontSize={{ base: "20px", md: "25px" }} color="#FF5733">
          {formattedRawPrice}
        </Text>
      )}
        <HStack spacing={1}>
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < (product?.rating || 0) ? "#FF8A00" : "gray.200"}
                fontSize={{ base: "14px", md: "16px" }}
              />
            ))}
          <Text fontSize={{ base: "xs", sm: "sm" }} ml={2}>
            ({total_reviews} Customer Reviews)
          </Text>
        </HStack>
      </Box>

      <Text fontSize={{ base: "sm", md: "md" }}>{product?.description}</Text>

      <Badge
        colorScheme={
          product?.product_quantity && product.product_quantity > 0
            ? "green"
            : "red"
        }
      >
        {product?.product_quantity && product.product_quantity > 0
          ? ""
          : "Out of Stock"}
      </Badge>

      {product?.status && (
        <Box
          bg={
            product?.status === "APPROVED"
              ? "green"
              : product?.status === "PENDING"
              ? "#FFC900"
              : "red"
          }
          color="white"
          h={{ base: "22px", md: "26px" }}
          w={{ base: "80px", md: "90px" }}
          borderRadius="full"
          fontSize={{ base: "10px", md: "12px" }}
          fontWeight="bold"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {product?.status}
        </Box>
      )}
      {showOthers && (
        <>
          {showColor && (
            <>
              <Box>
                <Text
                  fontWeight="bold"
                  mb={2}
                  fontSize={{ base: "sm", md: "md" }}
                >
                  Size
                </Text>
                <HStack spacing={{ base: 2, md: 3 }}>
                  {sizes?.map((size) => (
                    <Button
                      key={size}
                      size={{ base: "xs", sm: "sm" }}
                      variant={selectedSize === size ? "solid" : "outline"}
                      colorScheme="orange"
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </HStack>
              </Box>

              <Box>
                <Text
                  fontWeight="bold"
                  mb={2}
                  fontSize={{ base: "sm", md: "md" }}
                >
                  Color
                </Text>
                <HStack spacing={{ base: 2, md: 3 }}>
                  {colors?.map((color) => (
                    <Box
                      key={color}
                      boxSize={{ base: "25px", md: "30px" }}
                      borderRadius="full"
                      bg={color}
                      border={
                        selectedColor === color
                          ? "2px solid black"
                          : "1px solid gray"
                      }
                      cursor="pointer"
                      onClick={() => setSelectedColor(color)}
                    />
                  ))}
                </HStack>
              </Box>
            </>
          )}
          <Flex direction="row" gap={{ base: 2, md: 4 }} w="100%">
            <Box
              border="1px solid black"
              bg="transparent"
              borderRadius="5px"
              w={{ base: "100%", md: "170px" }}
              h={{ base: "40px", md: "50px" }}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              px={4}
              mb={{ base: 2, md: 0 }}
            >
              <Button
                onClick={() =>
                  setQuantity((prev: any) => Math.max(prev - 1, 1))
                }
                isDisabled={
                  quantity <= 1 ||
                  (product?.product_quantity !== undefined &&
                    product.product_quantity < 0)
                }
                variant="ghost"
                size={{ base: "xs", sm: "sm" }}
              >
                -
              </Button>
              <Text fontSize={{ base: "sm", md: "md" }}>{quantity}</Text>
              <Button
                onClick={() =>
                  setQuantity((prev: any) =>
                    Math.min(prev + 1, product?.product_quantity || 0)
                  )
                }
                isDisabled={
                  !product?.product_quantity ||
                  product.product_quantity <= 0 ||
                  quantity >= product.product_quantity
                }
                variant="ghost"
                size={{ base: "xs", sm: "sm" }}
              >
                +
              </Button>
            </Box>
            <Button
              bg="#FF5733"
              color="white"
              w={{ base: "100%", md: "170px" }}
              h={{ base: "40px", md: "50px" }}
              fontSize={{ base: "sm", md: "md" }}
              isDisabled={
                product?.product_quantity ? product.product_quantity < 0 : true
              }
              _hover={{ bg: "#FF5733" }}
              onClick={() => navigate("/cart")}
            >
              Buy Now
            </Button>
          </Flex>
          <Box
            mt={{ base: 4, md: 6 }}
            p={{ base: 2, md: 4 }}
            borderTop="1px"
            borderColor="gray.200"
          >
            <HStack spacing={{ base: 2, md: 4 }} mb={2}>
              <Text
                fontWeight="normal"
                color="gray.600"
                fontSize={{ base: "sm", md: "md" }}
              >
                Category:
              </Text>
              <Text fontSize={{ base: "sm", md: "md" }}>
                {product?.category}
              </Text>
            </HStack>

            <HStack spacing={{ base: 2, md: 4 }}>
              <Text
                fontWeight="normal"
                color="gray.600"
                fontSize={{ base: "sm", md: "md" }}
              >
                Share:
              </Text>
              <HStack spacing={2}>
                <Link href="#" isExternal>
                  <Icon as={FaFacebook} boxSize={{ base: 4, md: 5 }} />
                </Link>
                <Link href="#" isExternal>
                  <Icon as={FaLinkedin} boxSize={{ base: 4, md: 5 }} />
                </Link>
                <Link href="#" isExternal>
                  <Icon as={FaTwitter} boxSize={{ base: 4, md: 5 }} />
                </Link>
              </HStack>
            </HStack>
          </Box>
        </>
      )}
    </VStack>
  );
};

export default ProductDetails;
