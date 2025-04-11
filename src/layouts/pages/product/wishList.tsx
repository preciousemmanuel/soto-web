import { ChevronLeftIcon, DeleteIcon } from "@chakra-ui/icons";
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
  Button,
  Heading,
} from "@chakra-ui/react";
import { IoCartOutline } from "react-icons/io5";
import { Product, useProduct } from "../../hooks/useProduct";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../features/helpers/LoadingSpinner";
import { ProductCard } from "../_subpages/CategoriesSection";

interface ProductCardProps {
  product: Product;
}

interface ProductCardProps {
  product: Product;
}

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const notDiscount = product?.discount_price === undefined;
//   const isOnSale =
//     product?.is_discounted &&
//     product?.discount_price !== undefined &&
//     product?.unit_price !== undefined &&
//     product?.discount_price < product?.unit_price;
//   const navigate = useNavigate();
//   const handleProductClick = (e: React.MouseEvent) => {
//     if ((e.target as HTMLElement).closest("button")) {
//       return;
//     }
//     navigate(`/products/${product?._id}`);
//   };

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
//             src={product?.images ? product?.images[0] : ""}
//             alt={product?.product_name}
//             w="full"
//             h="160px"
//             objectFit="contain"
//           />

//           <Box
//             position="absolute"
//             top={1}
//             left={2}
//             display="flex"
//             alignItems="center"
//             justifyContent="space-between"
//             width="100%"
//             px={2}
//           >
//             <Box display="flex" alignItems="center" justifyContent="flex-start">
//               {notDiscount ? null : (
//                 <Box
//                   bg="#FF5733"
//                   color="white"
//                   p={1}
//                   h="26px"
//                   w="40px"
//                   borderRadius={3}
//                   fontSize="12px"
//                   fontWeight="medium"
//                   mr={2}
//                 >
//                   <Text>-{product?.discount_price}%</Text>
//                 </Box>
//               )}
//             </Box>
//             <Box display="flex" alignItems="center" justifyContent="flex-end">
//               {/* <IconButton
//                 aria-label="Delete wishlist"
//                 icon={<DeleteIcon color="#FF5733" fontSize={20} />}
//                 size="md"
//                 bg={"transparent"}
//                 rounded="full"
//                 // onClick={handleWishlistClick}
//                 colorScheme="gray"
//               /> */}
//             </Box>
//           </Box>
//         </Box>
//         <Box
//           as="button"
//           color="#FF5733"
//           borderColor="#FF5733"
//           borderWidth="1px"
//           height="44px"
//           display="flex"
//           alignItems="center"
//           justifyContent="center"
//           mt={4}
//           w="100%"
//         >
//           <Flex alignItems="center" gap={4}>
//             <IoCartOutline fontSize="24px" />
//             <Text fontSize="16px" fontWeight="medium" color="#FF5733">
//               Add Cart
//             </Text>
//           </Flex>
//         </Box>
//       </Box>
//       <Stack mt={4} spacing={2}>
//         <Text fontWeight="normal" textAlign="left" fontSize="lg">
//           {product?.product_name}
//         </Text>

//         <Flex gap={4} alignItems="center">
//           <Text color={isOnSale ? "#FF5733" : "#FF5733"} fontWeight="normal">
//             ₦{isOnSale ? product?.discount_price : product?.unit_price}
//           </Text>
//           {isOnSale && (
//             <Text as="s" color="#FF5743" fontSize="sm">
//               ₦{product?.unit_price}
//             </Text>
//           )}
//         </Flex>
//       </Stack>
//     </Box>
//   );
// };

export default function WishListPage() {
  const { useWishlist, handleAddToCart } = useProduct();
  const navigate = useNavigate();
  const { data: product, isLoading } = useWishlist(20, 1);
  const products = product?.data?.data;
  return (
    <Box py={{ base: "60px", md: "80px", lg: "120px" }}>
      <Flex
        align="center"
        justify="center"
        position="relative"
        bg="#FFF2ED"
        p={{ base: 3, md: 6 }}
        mt={{ base: 6, md: 10 }}
        mb={{ base: 4, md: 6 }}
      >
        <Button
          position="absolute"
          left={{ base: 3, md: 6 }}
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
          WishList
        </Heading>
      </Flex>
      <Box
        py={{ base: 2, md: 4 }}
        px={{ base: 4, sm: 6, md: "60px", lg: "100px", xl: "140px" }}
      >
        <Text
          fontSize={{ base: "md", md: "lg" }}
          mb={{ base: 4, md: 6 }}
          textAlign="left"
          color="#FF5733"
        >
          Wishlist ({products?.length})
        </Text>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3 }}
            spacing={{ base: 2, md: 4 }}
          >
            {products?.map((product: Product) => (
              <ProductCard
                key={product?._id}
                product={product}
                onAddToCart={() => handleAddToCart(product._id ?? "", product)}
              />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
}
