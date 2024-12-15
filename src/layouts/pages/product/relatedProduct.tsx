import {
  Box,
  Image,
  SimpleGrid,
  Text,
  Badge,
  Stack,
  Button,
} from "@chakra-ui/react";
import { useNavigate} from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import { useEffect } from "react";
import LoadingSpinner from "../../../features/helpers/LoadingSpinner";

const RelatedProducts = ({ title,categoryId }: { title: string, categoryId: string }) => {
  const navigate = useNavigate();
  const { 
    productsByCategory, 
    isProductsByCategory, 
    setSelectedCategoryId,
    refetchProductsByCategory,
    selectedCategoryId
  } = useProduct();


  const products = productsByCategory?.data?.data;

  useEffect(() => {
    if (categoryId && categoryId !== selectedCategoryId) {
      setSelectedCategoryId(categoryId);
      refetchProductsByCategory();
    }
  }, [categoryId, setSelectedCategoryId, selectedCategoryId, refetchProductsByCategory]);

 
  const handleProductClick = (productId:any) => {
    navigate(`/products/${productId}`);
  };



  return (
    <Box p={5} px={14} my="70px" fontFamily="">
      <Text fontSize="34px" textAlign="center" fontWeight="semibold" mb={5}>
        {title}
      </Text>
      {isProductsByCategory ? <LoadingSpinner/> :
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
        {products?.slice(0, 4).map((product) => (
          <Box
            key={product._id}
            overflow="hidden"
            p={3}
            bg="#F4F5F7"
            w="250px"
            h="350px"
            position="relative"
            cursor="pointer"
            onClick={() => handleProductClick(product?._id)}
          >
            {product.is_discounted && (
              <Badge
                bg="#FF5733"
                color="white"
                borderRadius="100%"
                position="absolute"
                h="30px"
                w="30px"
                top="3"
                fontWeight="normal"
                right="3"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                Sale
              </Badge>
            )}
            <Image
              src={product?.images ? product.images[0] : 'placeholder-image-url'}
              objectFit="contain"
              boxSize="200px"
              alt={product.product_name}
            />
            <Stack spacing={2} mt={2}>
              <Text fontWeight="bold">{product?.product_name}</Text>
              <Text color="gray.500">{product?.category?.name}</Text>
              <Text fontWeight="bold" color="red.500">
                ₦{product?.unit_price ? product.unit_price.toLocaleString() : 'N/A'}
              </Text>
            </Stack>
          </Box>
        ))}
      </SimpleGrid> }
      <Box display="flex" justifyContent="center" w="100%" mt={8}>
        <Button
          borderRadius="full"
          px={16}
          py={6}
          color="#FF5733"
          border="1px solid"
          borderColor="#FF5733"
          bg="white"
          _hover={{ bg: "#FF5733", color: "white" }}
          onClick={() => navigate(`/category-list?category=${categoryId}`)}
        >
          See More
        </Button>
      </Box>
    </Box>
  );
};

export default RelatedProducts;
