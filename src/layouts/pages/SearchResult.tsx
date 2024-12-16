import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Text, Spinner, Image, Flex, Stack, SimpleGrid } from '@chakra-ui/react';
import { Product, useProduct } from '../hooks/useProduct';
import PaginationControls from '../../features/helpers/Pagination';


interface ProductCardProps {
    product: Product;
  }
  
  interface ProductCardProps {
    product: Product;
  }
  const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const isOutOfStock = product.product_quantity !== undefined && product.product_quantity < 0;
    const isOnSale =
      product?.is_discounted &&
      product?.discount_price !== undefined &&
      product?.unit_price !== undefined &&
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


const SearchResults = () => {
  const location = useLocation();
  const { handleSearch, searchResults, isSearchLoading,productsPagination, handlePageChange } = useProduct();

  useEffect(() => {
    
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');

   
    if (query) {
      handleSearch(query);
    }
  }, [location.search, handleSearch]);

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
        <SimpleGrid columns={[1, 2, 3]} spacing={0.5}>
          {searchResults?.map((product) => (
            <ProductCard key={product._id} product={product} />
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