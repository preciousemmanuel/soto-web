import React from "react";
import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  Image,
  Flex,
  HStack,
  VStack,
  // StarIcon,
  Badge,
  Stack,
} from "@chakra-ui/react";

import grocery from "../../../assets/grocery.png";
import furniture from "../../../assets/furniture.png";
import fashion from "../../../assets/fashion.png";
import gaming from "../../../assets/gaming.png";
import phones from "../../../assets/phones.png";
import laptop from "../../../assets/laptops.png";
import pan from "../../../assets/pan.png";
import earpod from "../../../assets/earpod.png";
import watches from "../../../assets/watches.png";
import tv from "../../../assets/tv.png";
import { StarIcon } from "@chakra-ui/icons";
import { useProduct } from "../../hooks/useProduct";

interface Category {
  id: string;
  name: string;
  image: string;
}

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  series?: string;
}

const categories: Category[] = [
  { id: "1", name: "Grocery", image: grocery },
  { id: "2", name: "Furniture", image: furniture },
  { id: "3", name: "Fashion", image: fashion },
  { id: "4", name: "Gaming", image: gaming },
  { id: "5", name: "Phones & Tabs", image: phones },
];

const products: Product[] = [
  {
    id: "1",
    name: "HP Laptop",
    category: "Computer",
    price: 49000,
    image: laptop,
    rating: 4,
    reviews: 200,
    series: "Blues Series",
  },
  {
    id: "2",
    name: "Frying Pan",
    category: "Kitchen",
    price: 8700,
    image: pan,
    rating: 4,
    reviews: 307,
    series: "Steel",
  },
  {
    id: "3",
    name: "Wrist Watch",
    category: "Fashion",
    price: 52000,
    image: watches,
    rating: 4,
    reviews: 110,
    series: "Black Series",
  },
  {
    id: "4",
    name: "Earpod",
    category: "Accessories",
    price: 37100,
    image: earpod,
    rating: 4,
    reviews: 131,
    series: "Blues Series",
  },
  {
    id: "5",
    name: "45 inches TV",
    category: "Electronics",
    price: 354000,
    image: tv,
    rating: 4,
    reviews: 420,
    series: "Smart",
  },
];

const CategoryCard: React.FC<{ category: Category }> = ({ category }) => (
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

const ProductCard: React.FC<{ product: any }> = ({ product }) => (
  <Box
    borderRadius="8px"
    borderWidth="1px"
    borderColor="#F9D3CB"
    overflow="hidden"
    bg="#F1F1F3"
  >
    <HStack pt="14px">
      <Image
        src={product?.images[0]}
        alt={product?.product_name}
        w="120px"
        h="90px"
        objectFit="cover"
        mx="auto"
      />
    </HStack>

    <Box p={4} textAlign={{ base: "center", md: "left" }}>
      <Text color="#FF5733CC" fontSize="sm">
        {product?.category?.name}
      </Text>
      <Text fontSize="lg" fontWeight="semibold" mt={1}>
        {product?.product_name}
      </Text>
      <Text fontSize="sm">{product?.description}</Text>

      <HStack mt={2} spacing={1} mx={{ base: "auto", md: 0 }}>
        {Array(5)
          .fill("")
          .map((_, i) => (
            <StarIcon
              key={i}
              color={i < (product?.favourite ? 5 : 0) ? "#FF8A00" : "gray.200"}
              fontSize="sm"
            />
          ))}
        <Text fontSize="12px" color="gray.600">
          {product?.total_quantity_sold} reviews
        </Text>
      </HStack>

      <Text fontSize="xl" fontWeight="bold" mt={2} color="#FF5733">
        ₦{product?.unit_price.toLocaleString()}
        {product?.is_discounted && (
          <Text
            as="span"
            fontSize="sm"
            color="gray.500"
            textDecoration="line-through"
            ml={2}
          >
            ₦{product?.discount_price.toLocaleString()}
          </Text>
        )}
      </Text>
    </Box>
  </Box>
);

const PopularProductsSection: React.FC = () => {
  const { popluarProducts } = useProduct();
  return (
    <Box py={4} fontFamily="Poppins">
      <VStack spacing={8} align="stretch">
        <Box px={{ base: 6, md: 16 }} pb={24}>
          <Heading fontSize="30px" mb={2}>
            Popular Categories
          </Heading>
          <Text color="gray.600" mb={4} fontSize="20px">
            You have a choice to shop based on categories
          </Text>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(5, 1fr)",
            }}
            gap={4}
          >
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </Grid>
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
            {popluarProducts?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </Grid>
        </Box>
      </VStack>
    </Box>
  );
};

export default PopularProductsSection;
