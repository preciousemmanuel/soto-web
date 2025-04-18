import React, { useState } from "react";
import {
  Box,
  Grid,
  Heading,
  Text,
  Image,
  Button,
  HStack,
  Flex,
  IconButton,
  Badge,
} from "@chakra-ui/react";
import { ArrowForwardIcon, StarIcon } from "@chakra-ui/icons";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Product, useProduct } from "../../hooks/useProduct";
import { useNavigate } from "react-router-dom";

export interface CartItem {
  productId: string;
  productName: string;
  price: number;
  image: string;
  quantity: number;
  discount: any;
}

export const ProductCard: React.FC<{
  product: Product;
  onAddToCart: (productId: string) => void;
}> = ({ product, onAddToCart }) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const { addToWishlist } = useProduct();
  // console.log(product, "PRODUCT");

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (isWishlisted) {
        // await removeFromWishlist?.(product._id ?? "");
      } else {
        await addToWishlist?.(product._id ?? "");
      }
      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  const handleProductClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }
    navigate(`/products/${product._id}`);
  };
  return (
    <Box
      borderRadius="lg"
      overflow="hidden"
      p={4}
      transition="all 0.2s ease-in-out"
      _hover={{
        shadow: "lg",
        transform: "scale(1.01)",
      }}
      cursor="pointer"
      onClick={handleProductClick}
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Flex
        direction="column"
        align="center"
        position="relative"
        w="full"
        mb={4}
      >
        <Badge
          position="absolute"
          top="4"
          left="4"
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

        <Box w="full">
          <Image
            src={product.images?.[0]}
            alt={product.product_name}
            w="full"
            h="160px"
            objectFit="contain"
          />
        </Box>

        {product.is_discounted &&
          product.unit_price &&
          product.discount_price && (
            <Badge
              position="absolute"
              top="4"
              right="4"
              bg="red"
              color="white"
              rounded="full"
            >
              {Math.round(
                ((product.unit_price - product.discount_price) /
                  product.unit_price) *
                  100
              )}
              % off
            </Badge>
          )}
      </Flex>

      <Box fontFamily="poppins" display="flex" flexDirection="column" flex="1">
        <Flex justify="space-between" align="start">
          <Box>
            <Text fontSize="sm" mb={1}>
              {product.product_name}
            </Text>
            <HStack spacing={2} mb={2}>
              <Text fontWeight="500">₦{product.unit_price}</Text>
              {product.is_discounted && product.discount_price && (
                <Text
                  fontSize="sm"
                  color="gray.500"
                  textDecoration="line-through"
                >
                  ₦{product.discount_price}
                </Text>
              )}
            </HStack>
          </Box>
          <IconButton
            aria-label="Add to wishlist"
            icon={
              isWishlisted ? (
                <FaHeart fill="#FF5733" fontSize={20} />
              ) : (
                <FaRegHeart fill="gray" fontSize={20} />
              )
            }
            size="md"
            rounded="full"
            onClick={handleWishlistClick}
            colorScheme="gray"
            isDisabled={
              product?.product_quantity ? product.product_quantity < 0 : true
            }
          />
        </Flex>
        <HStack spacing={24} my={4}>
          <Box>
            {Array(5)
              .fill("")
              .map((_, i) => (
                <StarIcon
                  key={i}
                  color={i < 5 ? "#FF8A00" : "gray.200"}
                  fontSize="sm"
                />
              ))}
          </Box>
        </HStack>
        <Button
          color="#FF5733"
          borderWidth={1}
          borderColor="#FF5733"
          variant="outline"
          size="md"
          width="full"
          // isDisabled={
          //   product?.product_quantity ? product.product_quantity < 0 : true
          // }
          h="40px"
          onClick={() => onAddToCart(product._id ?? "")}
          _hover={{
            background: "#FF5733",
            color: "white",
          }}
        >
          Add to Cart
        </Button>
      </Box>
    </Box>
  );
};

const BestSelling: React.FC = () => {
  const { products, handleAddToCart } = useProduct();
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  // console.log(products,"best product")
  const sortedProducts = [...products].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "newest" ? "oldest" : "newest"));
  };
  return (
    <Box py={8} px={{ base: 6, md: 16 }}>
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Heading fontSize="30px" mb={2}>
            Best Selling
          </Heading>
          <Text color="gray.600" fontSize="20px" mb={4}>
            You have a choice to shop based on categories
          </Text>
        </Box>
        <Flex gap={5}>
          <Button onClick={toggleSortOrder} color="#FF5733" variant="ghost">
            {sortOrder === "newest" ? "Newest" : "Oldest"}
          </Button>
          <Button
            onClick={() => navigate("/product-list")}
            rightIcon={
              <Box as="span" fontSize="lg">
                <ArrowForwardIcon />
              </Box>
            }
            variant="link"
            color="#FF5733"
          >
            View more
          </Button>
        </Flex>
      </Flex>

      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        {sortedProducts?.slice(0, 8).map((product: Product) => (
          <ProductCard
            key={product._id}
            product={product}
            onAddToCart={() => handleAddToCart(product._id ?? "", product)}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default BestSelling;
