import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Image,
  Badge,
  Text,
  Stack,
  Flex,
  SimpleGrid,
  IconButton,
  VStack,
} from "@chakra-ui/react";
import { IoCartOutline } from "react-icons/io5";
import { Product, useProduct } from "../../hooks/useProduct";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../features/helpers/LoadingSpinner";

interface ProductCardProps {
  product: Product;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const notDiscount = product?.discount_price === undefined;
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
            src={product?.images ? product?.images[0] : ""}
            alt={product?.product_name}
            w="full"
            h="160px"
            objectFit="contain"
          />

          <Box
            position="absolute"
            top={1}
            left={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            px={2}
          >
            <Box display="flex" alignItems="center" justifyContent="flex-start">
              {notDiscount ? null : (
                <Box
                  bg="#FF5733"
                  color="white"
                  p={1}
                  h="26px"
                  w="40px"
                  borderRadius={3}
                  fontSize="12px"
                  fontWeight="medium"
                  mr={2}
                >
                  <Text>-{product?.discount_price}%</Text>
                </Box>
              )}
            </Box>
            <Box display="flex" alignItems="center" justifyContent="flex-end">
              {/* <IconButton
                aria-label="Delete wishlist"
                icon={<DeleteIcon color="#FF5733" fontSize={20} />}
                size="md"
                bg={"transparent"}
                rounded="full"
                // onClick={handleWishlistClick}
                colorScheme="gray"
              /> */}
            </Box>
          </Box>
        </Box>
        <Box
          as="button"
          color="#FF5733"
          borderColor="#FF5733"
          borderWidth="1px"
          height="44px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          mt={4}
          w="100%"
        >
          <Flex alignItems="center" gap={4}>
            <IoCartOutline fontSize="24px" />
            <Text fontSize="16px" fontWeight="medium" color="#FF5733">
              Add Cart
            </Text>
          </Flex>
        </Box>
      </Box>
      <Stack mt={4} spacing={2}>
        <Text fontWeight="normal" textAlign="left" fontSize="lg">
          {product?.product_name}
        </Text>

        <Flex gap={4} alignItems="center">
          <Text color={isOnSale ? "#FF5733" : "#FF5733"} fontWeight="normal">
            ₦{isOnSale ? product?.discount_price : product?.unit_price}
          </Text>
          {isOnSale && (
            <Text as="s" color="#FF5743" fontSize="sm">
              ₦{product?.unit_price}
            </Text>
          )}
        </Flex>
      </Stack>
    </Box>
  );
};

export default function WishListPage() {
  const { useWishlist } = useProduct();
  const { data: product, isLoading } = useWishlist(20, 1);
  const products = product?.data?.data;
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
        WishList
      </Text>
      <Box py={4} px="140px">
        <Text fontSize="lg" mb={6} textAlign={"left"} color={"#FF5733"}>
          Wishlist ({products?.length})
        </Text>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <SimpleGrid columns={[1, 2, 3]} spacing={0.5}>
            {products?.map((product: Product) => (
              <ProductCard key={product?._id} product={product} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
}
