import {
  Box,
  Image,
  Badge,
  Text,
  Stack,
  Flex,
  SimpleGrid,
  Button,
  Heading,
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

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const isOutOfStock = product.product_quantity !== undefined && product.product_quantity < 0;
//   const isOnSale =
//     product?.is_discounted &&
//     product?.discount_price &&
//     product?.unit_price &&
//     product?.discount_price < product?.unit_price;
//   const navigate = useNavigate();
//   const handleProductClick = (e: React.MouseEvent) => {
//     if ((e.target as HTMLElement).closest("button")) {
//       return;
//     }
//     navigate(`/products/${product?._id}`);
//   };

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <Box p={4} w="300px">

//       <Box
//         borderRadius="sm"
//         overflow="hidden"
//         py={2}
//         h="220px"
//         w="280px"
//         cursor="pointer"
//         backgroundColor="#F5F5F5"
//         onClick={handleProductClick}
//       >
//         <Box position="relative" height="150px">
//           <Image
//             src={product.images?.[0]}
//             alt={product.product_name}
//             height="150px"
//             width="100%"
//             objectFit="contain"
//           />
//           {isOutOfStock && (
//             <Box
//               bg="#FF5733"
//               color="white"
//               h="26px"
//               w="90px"
//               position="absolute"
//               top={2}
//               left={2}
//               borderRadius={3}
//               fontSize="12px"
//               fontWeight="bold"
//               display="flex"
//               alignItems="center"
//               justifyContent="center"
//             >
//               Out of stock
//             </Box>
//           )}
//         </Box>
//         <Box
//           bg="#FBDED3"
//           height="44px"
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           mt={4}
//         >
//           <Text fontSize="16px" fontWeight="bold" color="#FF5733">
//             {product.product_quantity} Available
//           </Text>
//         </Box>
//       </Box>
//       <Stack mt={4} spacing={2}>
//         <Text fontWeight="normal" fontSize="lg">
//           {product.product_name}
//         </Text>

//         <Flex gap={4} alignItems="center">
//           <Text color={isOnSale ? "#FF5733" : "#FF5733"} fontWeight="normal">
//             ₦{isOnSale ? product.discount_price : product.unit_price}
//           </Text>
//           {isOnSale && (
//             <Text as="s" color="#FF5743" fontSize="sm">
//               ₦{product.unit_price}
//             </Text>
//           )}
//         </Flex>
//       </Stack>
//     </Box>
//   );
// };

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import LoadingSpinner from "../../features/helpers/LoadingSpinner";
import PaginationControls from "../../features/helpers/Pagination";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { ProductCard } from "./_subpages/CategoriesSection";

export default function CategoryProductPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    productsByCategory,
    isProductsByCategory,
    setSelectedCategoryId,
    refetchProductsByCategory,
    selectedCategoryId,
    productsByCategoryPagination,
    handlePageChange,
    handleAddToCart,
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
    <Box py={{ base: "60px", md: "80px", lg: "120px" }}>
      <Flex
        align="center"
        justify="center"
        position="relative"
        bg="#FFF2ED"
        p={{ base: 4, md: 6 }}
        mt={{ base: 16, md: 12, lg: 16 }}
        mb={{ base: 4, md: 6 }}
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
          Product List
        </Heading>
      </Flex>
      <Box py={{ base: 4, md: 6, lg: 8 }} px={{ base: 4, md: 8, lg: "140px" }}>
        {!products || products?.length === 0 ? (
          <Text textAlign="center">No products found for this category.</Text>
        ) : (
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={{ base: 4, md: 6, lg: 8 }}
          >
            {products?.map((product: Product) => (
              <ProductCard
                key={product._id}
                product={product}
                onAddToCart={() => handleAddToCart(product._id ?? "", product)}
              />
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
