import { Flex, Box } from "@chakra-ui/react";
import ProductImageGallery from "./product/productImage";
import ProductDetails from "./product/productDetails";
import ProductDescription from "./product/productDescription";
import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import RelatedProducts from "./product/relatedProduct";

const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { useSingleProduct } = useProduct();
  const oneProduct = useSingleProduct(productId as string);

  const product = oneProduct?.data?.data.product;

  return (
    <Box>
      <Flex
        direction={{ base: "column", md: "row" }}
        p={{ base: 4, md: 10 }}
        gap={{ base: 8, md: 20, lg: 40 }}
        mt={{ base: 30, md: 120 }}
        align={{ base: "center", md: "flex-start" }}
      >
        <Box w={{ base: "100%", md: "45%" }}>
          <ProductImageGallery images={product?.images || []} />
        </Box>

        <Box w={{ base: "100%", md: "55%" }}>
          <ProductDetails
            product={{
              product_name: product?.product_name || "",
              unit_price: product?.unit_price || 0,
              description: product?.description || "",
              product_quantity: product?.product_quantity || 0,
              category: product?.category.name,
              images: [],
              rating: product?.rating,
              in_stock: false,
            }}
            sizes={["XS", "L", "XL"]}
            colors={["teal", "gray.400", "green.500"]}
          />
        </Box>
      </Flex>
      <ProductDescription />
      <RelatedProducts title="Related Products" />
    </Box>
  );
};

export default ProductDetailsPage;
