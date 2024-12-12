import {
  Box,
  Image,
  Badge,
  Text,
  Stack,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { Product, useProduct } from "../hooks/useProduct";
import { useNavigate } from "react-router-dom";
// import { useEffect } from "react";

interface ProductCardProps {
  product: Product;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const isOutOfStock = !product.in_stock;
  const isOnSale =
    product?.is_discounted &&
    product?.discount_price &&
    product?.unit_price &&
    product?.discount_price < product?.unit_price;
  const navigate = useNavigate();
  const handleProductClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }
    navigate(`/products/${product?._id}`);
  };

  return (
    <Box p={4} w="300px">
      <Box
        borderRadius="sm"
        overflow="hidden"
        py={2}
        h="220px"
        w="280px"
        cursor="pointer"
        backgroundColor="#F5F5F5"
        onClick={handleProductClick}
      >
        <Box position="relative" height="150px">
          <Image
            src={product.images?.[0]}
            alt={product.product_name}
            height="150px"
            width="100%"
            objectFit="contain"
          />
          {isOutOfStock && (
            <Box
              bg="#FF5733"
              color="white"
              h="26px"
              w="90px"
              position="absolute"
              top={2}
              left={2}
              borderRadius={3}
              fontSize="12px"
              fontWeight="bold"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              Out of stock
            </Box>
          )}
        </Box>
        <Box
          bg="#FBDED3"
          height="44px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt={4}
        >
          <Text fontSize="16px" fontWeight="bold" color="#FF5733">
            {product.product_quantity} Available
          </Text>
        </Box>
      </Box>
      <Stack mt={4} spacing={2}>
        <Text fontWeight="normal" fontSize="lg">
          {product.product_name}
        </Text>

        <Flex gap={4} alignItems="center">
          <Text color={isOnSale ? "#FF5733" : "#FF5733"} fontWeight="normal">
            ₦{isOnSale ? product.discount_price : product.unit_price}
          </Text>
          {isOnSale && (
            <Text as="s" color="#FF5743" fontSize="sm">
              ₦{product.unit_price}
            </Text>
          )}
        </Flex>
      </Stack>
    </Box>
  );
};

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../../features/helpers/LoadingSpinner";
import PaginationControls from "../../features/helpers/Pagination";

export default function CategoryProductPage() {
  const [searchParams] = useSearchParams();
  const {
    productsByCategory,
    isProductsByCategory,
    setSelectedCategoryId,
    refetchProductsByCategory,
    selectedCategoryId,
    productsByCategoryPagination,
    handlePageChange,
  } = useProduct();

  const products = productsByCategory?.data?.data;

  useEffect(() => {
    const categoryId = searchParams.get("category");
    if (categoryId && categoryId !== selectedCategoryId) {
      setSelectedCategoryId(categoryId);
      setTimeout(() => {
        refetchProductsByCategory();
      }, 0);
    }
  }, [
    searchParams,
    setSelectedCategoryId,
    selectedCategoryId,
    refetchProductsByCategory,
  ]);

  if (isProductsByCategory) {
    return <LoadingSpinner />;
  }

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
        Product List
      </Text>
      <Box py={8} px="140px">
        {!products || products?.length === 0 ? (
          <Text textAlign="center">No products found for this category.</Text>
        ) : (
          <SimpleGrid columns={[1, 2, 3]} spacing={0.5}>
            {products?.map((product: Product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        )}
        <PaginationControls
          currentPage={productsByCategoryPagination.currentPage}
          totalPages={productsByCategoryPagination.totalPages}
          onPageChange={handlePageChange}
          hasNextPage={productsByCategoryPagination.hasNextPage}
        />
      </Box>
    </Box>
  );
}
