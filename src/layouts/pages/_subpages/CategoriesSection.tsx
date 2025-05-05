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
import { useAuth } from "../../hooks/useAuth";

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
  showWishlist?: boolean;
  showAddToCart?: boolean;
  showRating?: boolean;
  showBorder?: boolean;
  showStatus?: boolean;
  showUnitPrice?: boolean;
}> = ({
  product,
  onAddToCart,
  showWishlist = true,
  showAddToCart = true,
  showRating = true,
  showBorder = false,
  showStatus = false,
  showUnitPrice = true,
}) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = React.useState(false);
  const { addToWishlist } = useProduct();
  const { isAuthenticated } = useAuth();
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
    navigate(
      isAuthenticated
        ? `/products/${product._id}`
        : `/vendor-product/${product._id}`
    );
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
      border={showBorder ? "1px solid #E0E0E0" : "none"}
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

        {showStatus && (
          <Box
            bg={
              product?.status === "APPROVED"
                ? "green"
                : product?.status === "PENDING"
                ? "#FFC900"
                : "red"
            }
            color="white"
            h="26px"
            w="90px"
            position="absolute"
            top={2}
            right={2}
            borderRadius="full"
            fontSize="12px"
            fontWeight="bold"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {product?.status}
          </Box>
        )}

        <Box w="full" h={{ base: "160px", md: "200px", lg: "240px" }}>
          <Image
            src={product.images?.[0]}
            alt={product.product_name}
            w="100%"
            h="100%"
            objectFit={{ base: "contain", md: "contain" }}
          />
        </Box>

        {product.is_discounted && showUnitPrice
          ? product.unit_price
          : product.raw_price && (
              <Badge
                position="absolute"
                top={!isAuthenticated ? "10" : "4"}
                right={!isAuthenticated ? "10" : "4"}
                bg="red"
                color="white"
                rounded="full"
              >
                {product.discount_price !== undefined &&
                product.unit_price !== undefined &&
                product.raw_price !== undefined
                  ? Math.round(
                      (((showUnitPrice
                        ? product.unit_price
                        : product.raw_price) -
                        product.discount_price) /
                        (showUnitPrice
                          ? product.unit_price
                          : product.raw_price)) *
                        100
                    ) === 0
                    ? null
                    : `${Math.round(
                        (((showUnitPrice
                          ? product.unit_price
                          : product.raw_price) -
                          product.discount_price) /
                          (showUnitPrice
                            ? product.unit_price
                            : product.raw_price)) *
                          100
                      )}% off`
                  : null}
              </Badge>
            )}
      </Flex>

      <Box fontFamily="poppins" display="flex" flexDirection="column" flex="1">
        <Flex justify="space-between" align="start">
          <Box>
            <Text fontSize="sm" mb={1}>
              {product.product_name ? product.product_name.slice(0, 16) : ''}
              {product.product_name && product.product_name.length > 16 ? '...' : ''}
            </Text>
            <HStack spacing={2} mb={1}>
              {showUnitPrice && product.unit_price !== undefined ? (
                <Text fontWeight="500">₦{product.unit_price}</Text>
              ) : (
                <Text fontWeight="500">₦{product.raw_price}</Text>
              )}
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
          {showWishlist && (
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
          )}
        </Flex>
        {showRating && (
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
        )}
        {showAddToCart && (
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
        )}
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
      <Flex
        justify="space-between"
        align="center"
        mb={6}
        direction={{ base: "column", md: "row" }}
        alignItems={{ base: "flex-start", md: "center" }}
      >
        <Box mb={{ base: 4, md: 0 }}>
          <Heading
            fontSize={{ base: "24px", md: "30px" }}
            mb={2}
            textAlign={{ base: "center", md: "left" }}
          >
            Best Selling
          </Heading>
          <Text
            color="gray.600"
            fontSize={{ base: "16px", md: "20px" }}
            mb={4}
            textAlign={{ base: "center", md: "left" }}
          >
            You have a choice to shop based on categories
          </Text>
        </Box>
        <Flex
          gap={5}
          flexDirection="row" 
          alignItems="center"
          mt={{ base: 4, md: 0 }}
        >
          <Button
            onClick={toggleSortOrder}
            color="#FF5733"
            variant="ghost"
            width={{ base: "100%", md: "auto" }}
          >
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
            width={{ base: "100%", md: "auto" }}
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
        alignItems="stretch"
      >
        {sortedProducts?.slice(0, 20)?.map((product: Product) => (
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
