import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  HStack,
  VStack,
  Button,
  Select,
  SimpleGrid,
  Badge,
  Flex,
  Link,
  Icon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

interface ProductCategory {
  _id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductUser {
  _id: string;
  FirstName: string;
  LastName: string;
  Email?: string;
}

interface ProductReview {
  _id: string;
  comment: string;
  rating: number;
  product: string;
  user?: ProductUser;
  createdAt: string;
  updatedAt: string;
}

interface ProductData {
  _id: string;
  product_name: string;
  description: string;
  category: ProductCategory;
  images: string[];
  vendor: string;
  unit_price: number;
  product_quantity: number;
  height: number;
  width: number;
  weight: number;
  is_discounted: boolean;
  in_stock: boolean;
  is_verified: boolean;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
  total_quantity_sold: number;
  rating: number;
}

interface ProductDetails {
  product: ProductData;
  reviews?: ProductReview[];
  total_reviews?: number;
  sizes?: string[];
  colors?: string[];
}

const ProductDetails: React.FC<ProductDetails> = ({
  product,
  //   reviews,
  sizes,
  colors,
  total_reviews,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const formattedPrice = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(product?.unit_price);

  return (
    <VStack align="start" spacing={5}>
      <Box>
        <Text fontSize="44px" fontWeight="bold">
          {product?.product_name}
        </Text>
        <Text fontSize="25px" color="#FF5733">
          {formattedPrice}
        </Text>
        <HStack spacing={1}>
          {Array(5)
            .fill("")
            .map((_, i) => (
              <StarIcon
                key={i}
                color={i < product?.rating ? "#FF8A00" : "gray.200"}
                fontSize="16px"
              />
            ))}
          <Text fontSize="sm" ml={2}>
            ({total_reviews} Customer Reviews)
          </Text>
        </HStack>
      </Box>

      <Text fontSize="md">{product?.description}</Text>

      <Badge colorScheme={product?.in_stock ? "green" : "red"}>
        {product?.in_stock ? "In Stock" : "Out of Stock"}
      </Badge>

      <Box>
        <Text fontWeight="bold" mb={2}>
          Size
        </Text>
        <HStack spacing={3}>
          {sizes?.map((size) => (
            <Button
              key={size}
              size="sm"
              variant={selectedSize === size ? "solid" : "outline"}
              colorScheme="orange"
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </Button>
          ))}
        </HStack>
      </Box>

      <Box>
        <Text fontWeight="bold" mb={2}>
          Color
        </Text>
        <HStack spacing={3}>
          {colors?.map((color) => (
            <Box
              key={color}
              boxSize="30px"
              borderRadius="full"
              bg={color}
              border={
                selectedColor === color ? "2px solid black" : "1px solid gray"
              }
              cursor="pointer"
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </HStack>
      </Box>
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={{ base: 3, md: 4 }}
        align={{ base: "stretch", md: "center" }}
        wrap="wrap"
      >
        <Box
          border="1px solid black"
          bg="transparent"
          borderRadius="5px"
          w={{ base: "100%", md: "170px" }}
          h="50px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          px={4}
          mb={{ base: 3, md: 0 }}
        >
          <Button
            onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
            isDisabled={quantity <= 1}
            variant="ghost"
          >
            -
          </Button>
          <Text>{quantity}</Text>
          <Button
            onClick={() =>
              setQuantity((prev) =>
                Math.min(prev + 1, product?.product_quantity)
              )
            }
            isDisabled={quantity >= product?.product_quantity}
            variant="ghost"
          >
            +
          </Button>
        </Box>
        <Button
          border="1px solid black"
          bg="transparent"
          w={{ base: "100%", md: "170px" }}
          h="50px"
          isDisabled={!product?.in_stock}
          _hover={{ bg: "transparent" }}
          mb={{ base: 3, md: 0 }}
        >
          Add To Cart
        </Button>
        <Button
          bg="#FF5733"
          color="white"
          w={{ base: "100%", md: "170px" }}
          h="50px"
          isDisabled={!product?.in_stock}
          _hover={{ bg: "#FF5733" }}
        >
          Buy Now
        </Button>
      </Flex>
      <Box mt={6} p={4} borderTop="1px" borderColor="gray.200">
        <HStack spacing={4} mb={2}>
          <Text fontWeight="normal" color="gray.600">
            Category:
          </Text>
          <Text>{product?.category}</Text>
        </HStack>

        <HStack spacing={4} mb={2}>
          <Text fontWeight="normal" color="gray.600">
            Tags:
          </Text>
          <Text color="gray.600">Sofa, Chair, Home, Shop</Text>
        </HStack>

        <HStack spacing={4}>
          <Text fontWeight="normal" color="gray.600">
            Share:
          </Text>
          <HStack spacing={2}>
            <Link href="#" isExternal>
              <Icon as={FaFacebook} boxSize={5} />
            </Link>
            <Link href="#" isExternal>
              <Icon as={FaLinkedin} boxSize={5} />
            </Link>
            <Link href="#" isExternal>
              <Icon as={FaTwitter} boxSize={5} />
            </Link>
          </HStack>
        </HStack>
      </Box>
    </VStack>
  );
};

export default ProductDetails;
