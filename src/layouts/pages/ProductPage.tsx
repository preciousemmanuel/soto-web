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
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={{ base: 4, md: 6, lg: 9 }}
        >
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
