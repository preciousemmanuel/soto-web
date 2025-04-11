import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Text,
  Spinner,
  Image,
  Flex,
  Stack,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";
import { Product, useProduct } from "../hooks/useProduct";
import PaginationControls from "../../features/helpers/Pagination";
// import { StarIcon } from '@chakra-ui/icons';
import { ProductCard } from "./_subpages/CategoriesSection";

const SearchResults = () => {
  const location = useLocation();
  const {
    handleSearch,
    searchResults,
    isSearchLoading,
    productsPagination,
    handlePageChange,
    handleAddToCart,
  } = useProduct();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");

    if (query) {
      handleSearch(query);
    }
  }, [location.search, handleSearch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isSearchLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box
      p={{ base: 4, md: 6 }}
      maxWidth="container.xl"
      margin="auto"
      mt={{ base: "120px", md: "150px", lg: "180px" }}
      mx={{ base: 2, sm: 4, md: 6, lg: 24 }}
    >
      <Text fontSize={{ base: "xl", md: "2xl" }} mb={4}>
        Search Results for "{new URLSearchParams(location.search).get("query")}"
      </Text>
      {searchResults?.length === 0 ? (
        <Text fontSize={{ base: "md", md: "lg" }}>No results found.</Text>
      ) : (
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3 }}
          spacing={{ base: 4, md: 6, lg: 8 }}
        >
          {searchResults?.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={() => handleAddToCart(product._id ?? "", product)}
            />
          ))}
        </SimpleGrid>
      )}
      <PaginationControls
        currentPage={productsPagination.currentPage}
        totalPages={productsPagination.totalPages}
        onPageChange={handlePageChange}
        hasNextPage={productsPagination.hasNextPage}
      />
    </Box>
  );
};

export default SearchResults;
