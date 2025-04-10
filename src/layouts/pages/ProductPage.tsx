import {
  Box,
  Image,
  Text,
  Stack,
  Flex,
  SimpleGrid,
  Button,
  Heading,
} from "@chakra-ui/react";
import { Product, useProduct } from "../hooks/useProduct";
import { useNavigate } from "react-router-dom";
import PaginationControls from "../../features/helpers/Pagination";
import { useEffect } from "react";
import { ProductCard } from "./_subpages/CategoriesSection";
import { ChevronLeftIcon } from "@chakra-ui/icons";

export default function ProductPage() {
  const navigate = useNavigate();
  const { products, productsPagination, handlePageChange, handleAddToCart } =
    useProduct();
  // console.log(products,"pro")
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box py="120px">
      <Flex
        align="center"
        justify="center"
        position="relative"
        bg="#FFF2ED"
        p={6}
        mt={16}
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
          Product List
        </Heading>
      </Flex>
      <Box py={8} px="140px">
        <SimpleGrid columns={[1, 2, 3]} spacing={9}>
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={() => handleAddToCart(product._id ?? "", product)}
            />
          ))}
        </SimpleGrid>
        <PaginationControls
          currentPage={productsPagination.currentPage}
          totalPages={productsPagination.totalPages}
          onPageChange={handlePageChange}
          hasNextPage={productsPagination.hasNextPage}
        />
      </Box>
    </Box>
  );
}
