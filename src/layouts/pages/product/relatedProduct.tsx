import {
  Box,
  Image,
  SimpleGrid,
  Text,
  Badge,
  Stack,
  Button,
} from "@chakra-ui/react";
import pan from "../../../assets/pan.png";
import earpod from "../../../assets/earpod.png";
import watches from "../../../assets/watches.png";
import tv from "../../../assets/tv.png";
import { useNavigate } from "react-router-dom";

const relatedDataProducts = [
  {
    name: "Syltherine",
    price: "₦2,500,000",
    discount: "30%",
    image: pan,
    category: "Stylish cafe chair",
  },
  {
    name: "Bar Chair",
    price: "₦2,500,000",
    image: earpod,
    category: "Stylish bar chair",
  },
  {
    name: "Clean 4 Seater",
    price: "₦7,000,000",
    originalPrice: "₦14,000,000",
    discount: "50%",
    image: watches,
    category: "Luxury big sofa",
  },
  {
    name: "L-Shape Sofa",
    price: "₦500,000",
    image: tv,
    category: "Outdoor bar table and stool",
  },
];

const RelatedProducts = ({ title }: { title: string }) => {
  const navigate = useNavigate();
  return (
    <Box p={5} px={14} my="70px" fontFamily="">
      <Text fontSize="34px" textAlign="center" fontWeight="semibold" mb={5}>
        {title}
      </Text>
      <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
        {relatedDataProducts.map((product, index) => (
          <Box
            key={index}
            overflow="hidden"
            p={3}
            bg="#F4F5F7"
            w="250px"
            h="350px"
            position="relative"
          >
            {product.discount && (
              <Badge
                bg="#FF5733"
                color={"white"}
                borderRadius="100%"
                position="absolute"
                h="30px"
                w="30px"
                top="3"
                fontWeight={"normal"}
                right="3"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {product.discount}
              </Badge>
            )}
            <Image
              src={product.image}
              objectFit={"contain"}
              boxSize="200px"
              alt={product.name}
            />
            <Stack spacing={2} mt={2}>
              <Text fontWeight="bold">{product.name}</Text>
              <Text color="gray.500">{product.category}</Text>
              <Text fontWeight="bold" color="red.500">
                {product.price}
              </Text>
              {product.originalPrice && (
                <Text fontSize="sm" textDecoration="line-through">
                  {product.originalPrice}
                </Text>
              )}
            </Stack>
          </Box>
        ))}
      </SimpleGrid>
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
          onClick={() => navigate("/product-list")}
        >
          See More
        </Button>
      </Box>
    </Box>
  );
};

export default RelatedProducts;
