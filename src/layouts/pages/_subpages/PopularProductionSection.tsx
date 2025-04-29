import React from "react";
import {
  Box,
  Grid,
  Heading,
  Text,
  Image,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { useProduct } from "../../hooks/useProduct";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ProductCard } from "./CategoriesSection";

interface Category {
  _id: string;
  name: string;
  image: string;
}

const CategoryCard: React.FC<{
  category: Category;
  handleCategory: (categoryId: string) => void;
}> = ({ category, handleCategory }) => (
  <Box
    position="relative"
    borderRadius="xl"
    overflow="hidden"
    h="100px"
    w="full"
    cursor="pointer"
    _hover={{
      transform: "scale(1.02)",
      shadow: "lg",
      transition: "all 0.2s ease-in-out",
    }}
    onClick={() => category?._id && handleCategory(category?._id)}
  >
    <Box position="absolute" top={0} left={0} right={0} bottom={0}>
      <Image
        src={category.image}
        alt={category.name}
        objectFit="cover"
        w="full"
        h="full"
      />
    </Box>
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bgGradient="linear(to-b, transparent, blackAlpha.600)"
    />
    <Flex
      position="relative"
      direction="column"
      justify="flex-end"
      h="full"
      p={4}
      color="white"
    >
      <Text
        fontSize="lg"
        fontWeight="semibold"
        textShadow="0 2px 4px rgba(0,0,0,0.2)"
      >
        {category.name}
      </Text>
    </Flex>
  </Box>
);

// const ProductCard: React.FC<{ product: any,onClick: any }> = ({ product, onClick }) => (
//   <Box
//     borderRadius="8px"
//     borderWidth="1px"
//     borderColor="#F9D3CB"
//     overflow="hidden"
//     bg="#F1F1F3"
//     onClick={onClick}
//     cursor="pointer"
//   >
//     <HStack pt="14px">
//       <Image
//         src={product?.images[0]}
//         alt={product?.product_name}
//         w="120px"
//         h="90px"
//         objectFit="cover"
//         mx="auto"
//       />
//     </HStack>

//     <Box p={4} textAlign={{ base: "center", md: "left" }}>
//       <Text color="#FF5733CC" fontSize="sm">
//         {product?.category?.name}
//       </Text>
//       <Text fontSize="lg" fontWeight="semibold" mt={1}>
//         {product?.product_name}
//       </Text>
//       <HStack mt={2} spacing={1} mx={{ base: "auto", md: 0 }}>
//         {Array(5)
//           .fill("")
//           .map((_, i) => (
//             <StarIcon
//               key={i}
//               color={i < (product?.favourite ? 5 : 0) ? "#FF8A00" : "gray.200"}
//               fontSize="sm"
//             />
//           ))}
//         <Text fontSize="12px" color="gray.600">
//           {product?.total_quantity_sold} reviews
//         </Text>
//       </HStack>

//       <Text fontSize="xl" fontWeight="bold" mt={2} color="#FF5733">
//         ₦{product?.unit_price?.toLocaleString() || ""}
//         {product?.is_discounted && (
//           <Text
//             as="span"
//             fontSize="sm"
//             color="gray.500"
//             textDecoration="line-through"
//             ml={2}
//           >
//             ₦{product?.discount_price?.toLocaleString() || ""}
//           </Text>
//         )}
//       </Text>
//     </Box>
//   </Box>
// );

const PopularProductsSection: React.FC = () => {
  const navigate = useNavigate();
  const {
    popluarProducts,
    categories,
    setSelectedCategoryId,
    refetchProductsByCategory,
    handleAddToCart,
  } = useProduct();
  // console.log(popluarProducts,"popluar product")
  const category = categories?.data?.data;

  const fetchProductsByCategory = async (categoryId: string) => {
    try {
      setSelectedCategoryId(categoryId);
      await refetchProductsByCategory();
      navigate(`/category-list?category=${categoryId}`);
    } catch (error) {
      setSelectedCategoryId("");
    }
  };

  const handleProductClick = (productId: any) => {
    navigate(`/products/${productId}`);
  };

  return (
    <>
    <Box py={4} fontFamily="Poppins">
      <VStack spacing={8} align="stretch">
        <Box px={{ base: 6, md: 16 }} pb={24}>
          <Heading fontSize="30px" mb={2}>
            Popular Categories
          </Heading>
          <Text color="gray.600" mb={4} fontSize="20px">
            You have a choice to shop based on categories
          </Text>
          <Swiper
            slidesPerView="auto"
            spaceBetween={30}
            grabCursor={true}
            mousewheel={true}
            modules={[Mousewheel, Navigation]}
            navigation={true}
            breakpoints={{
              320: { slidesPerView: 1.2 },
              480: { slidesPerView: 2.2 },
              768: { slidesPerView: 3.2 },
              1024: { slidesPerView: 4.2 },
            }}
            style={{ padding: "10px" }}
          >
            {category?.map((category: any) => (
              <SwiperSlide key={category?._id} style={{ width: "auto" }}>
                <Box maxW="300px" w="100%">
                  <CategoryCard
                    category={category}
                    handleCategory={fetchProductsByCategory}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        <Box py={{ base: 10, md: 20 }} bg="#F1F1F3" px={{ base: 6, md: 16 }}>
          <Heading fontSize="30px" mb={2}>
            Popular Products
          </Heading>
          <Text color="gray.600" fontSize="20px" mb={4}>
            You have a choice to shop based on categories
          </Text>
          <Grid
            templateColumns={{
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(5, 1fr)",
            }}
            gap={4}
          >
            {popluarProducts?.slice(0, 5)?.map((product) => (
              <ProductCard
                key={product?._id}
                product={product}
                onAddToCart={() => handleAddToCart(product?._id ?? "", product)}
              />
            ))}
          </Grid>
        </Box>
      </VStack>
    </Box>
    </>
  );
};

export default PopularProductsSection;
