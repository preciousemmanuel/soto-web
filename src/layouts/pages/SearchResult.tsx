import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Text, Spinner, Image, Flex, Stack, SimpleGrid, HStack } from '@chakra-ui/react';
import { Product, useProduct } from '../hooks/useProduct';
import PaginationControls from '../../features/helpers/Pagination';
// import { StarIcon } from '@chakra-ui/icons';
import { ProductCard } from './_subpages/CategoriesSection';





const SearchResults = () => {
  const location = useLocation();
  const { handleSearch, searchResults, isSearchLoading,productsPagination, handlePageChange,handleAddToCart } = useProduct();

  useEffect(() => {
    
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');

   
    if (query) {
      handleSearch(query);
    }
  }, [location.search, handleSearch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isSearchLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box p={6} maxWidth="container.xl" margin="auto" mt={180} mx={24}>
      <Text fontSize="2xl" mb={4}>
        Search Results for "{new URLSearchParams(location.search).get('query')}"
      </Text>
      {searchResults?.length === 0 ? (
        <Text>No results found.</Text>
      ) : (
        <SimpleGrid columns={[1, 2, 3]} spacing={8}>
          {searchResults?.map((product) => (
            <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart}/>
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