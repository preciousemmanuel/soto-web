import {
  Box,
  Image,
  Badge,
  Text,
  Stack,
  Flex,
  SimpleGrid,
  Heading,
  Button,
} from "@chakra-ui/react";
import { Product } from "../../hooks/useProduct";
import { useNavigate } from "react-router-dom";
import { useVendor } from "../../hooks/useVendor";
import LoadingSpinner from "../../../features/helpers/LoadingSpinner";
import PaginationControls from "../../../features/helpers/Pagination";
// import { useEffect } from "react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { ProductCard } from "../_subpages/CategoriesSection";

// interface ProductCardProps {
//   product: Product;
// }

// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
//   const isOutOfStock =
//     product.product_quantity !== undefined && product.product_quantity < 0;
//   const navigate = useNavigate();

//   const handleProductClick = (e: React.MouseEvent) => {
//     if ((e.target as HTMLElement).closest("button")) {
//       return;
//     }
//     navigate(`/vendor-product/${product?._id}`);
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
//             src={product?.images?.[0]}
//             alt={product?.product_name}
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
//               borderRadius="full"
//               fontSize="12px"
//               fontWeight="bold"
//               display="flex"
//               alignItems="center"
//               justifyContent="center"
//             >
//               Out of stock
//             </Box>
//           )}
          // <Box
          //   bg={
          //     product?.status === "APPROVED"
          //       ? "green"
          //       : product?.status === "PENDING"
          //       ? "#FFC900"
          //       : "red"
          //   }
          //   color="white"
          //   h="26px"
          //   w="90px"
          //   position="absolute"
          //   top={2}
          //   right={2}
          //   borderRadius="full"
          //   fontSize="12px"
          //   fontWeight="bold"
          //   display="flex"
          //   alignItems="center"
          //   justifyContent="center"
          // >
          //   {product?.status}
          // </Box>
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
//             {product?.product_quantity} Available
//           </Text>
//         </Box>
//       </Box>
//       <Stack mt={4} spacing={2}>
//         <Text fontWeight="normal" fontSize="lg">
//           {product?.product_name}
//         </Text>

//         <Flex gap={4} alignItems="center">
//           <Text as="s" color="#FF5743" fontSize="sm">
//             ₦{product?.raw_price}
//           </Text>
//         </Flex>
//       </Stack>
//     </Box>
//   );
// };

export default function VendorProductList() {
  const {
    allProductsByVendor,
    isLoadingAllProductsByVendor,
    handlePageChange,
    allProductsByVendorPagination,
  } = useVendor();
  const navigate = useNavigate();
  const products = allProductsByVendor?.data?.data;
  return (
    <Box py={{ base: "80px", md: "120px" }}>
      <Flex
        align="center"
        justify="center"
        position="relative"
        bg="#FFF2ED"
        p={{ base: 4, md: 6 }}
        mt={{ base: 10, md: 20 }}
        mb={{ base: 4, md: 6 }}
      >
        <Button
          position="absolute"
          left={{ base: 2, md: 6 }}
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
      {isLoadingAllProductsByVendor ? (
        <LoadingSpinner />
      ) : (
        <Box py={{ base: 4, md: 8 }} px={{ base: 4, sm: 8, md: "140px" }}>
          <SimpleGrid
            columns={{ base: 1, sm: 2, md: 3 }}
            spacing={{ base: 2, md: 4 }}
          >
            {products?.map((product: any) => (
              <ProductCard
                key={product?._id}
                product={product}
                onAddToCart={() => {}}
                showWishlist={false}
                showAddToCart={false}
                showBorder={true}
                showRating={false}
                showStatus={true}
              />
            ))}
          </SimpleGrid>
          <PaginationControls
            currentPage={allProductsByVendorPagination.currentPage}
            totalPages={allProductsByVendorPagination.totalPages}
            onPageChange={handlePageChange}
            hasNextPage={allProductsByVendorPagination.hasNextPage}
          />
        </Box>
      )}
    </Box>
  );
}
