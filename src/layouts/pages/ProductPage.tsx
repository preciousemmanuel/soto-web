import { Box, Image, Text, Stack, Flex, SimpleGrid } from "@chakra-ui/react";
import { Product, useProduct } from "../hooks/useProduct";
import { useNavigate } from "react-router-dom";
import PaginationControls from "../../features/helpers/Pagination";
import { useEffect } from "react";
import { ProductCard } from "./_subpages/CategoriesSection";


export default function ProductPage() {
  const { products, productsPagination, handlePageChange,handleAddToCart } =
    useProduct();
  // console.log(products,"pro")

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
        <SimpleGrid columns={[1, 2, 3]} spacing={0.5}>
          {products.map((product) => (
           <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart}/>
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
