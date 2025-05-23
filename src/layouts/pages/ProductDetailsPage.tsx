import { Flex, Box, Button } from "@chakra-ui/react";
import ProductImageGallery from "./product/productImage";
import ProductDetails from "./product/productDetails";
import ProductDescription from "./product/productDescription";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import RelatedProducts from "./product/relatedProduct";
import LoadingSpinner from "../../features/helpers/LoadingSpinner";
import { useEffect } from "react";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const { useSingleProduct } = useProduct();
  const { data: oneProduct, isLoading } = useSingleProduct(productId as string);
  const products = oneProduct?.data;
  const product = products?.product;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box pt={14}>
      <Flex
        align="start"
        justify="start"
        position="relative"
        mt={{ base: 20, md: 140 }}
        mx={{ base: 4, md: 6 }}
      >
        <Button
          onClick={() => navigate(-1)}
          leftIcon={<ChevronLeftIcon />}
          variant="ghost"
          color="#FF5753"
          size={{ base: "sm", md: "md" }}
        >
          Back
        </Button>
      </Flex>
      <Box mt={{ base: -20, md: -120 }}>
        {isLoading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minH="50vh"
          >
            <LoadingSpinner />
          </Box>
        ) : (
          <Flex
            direction={{ base: "column", md: "row" }}
            p={{ base: 2, md: 4, lg: 10 }}
            gap={{ base: 4, md: 8, lg: 20 }}
            mt={{ base: 4, md: 8, lg: 120 }}
            align={{ base: "center", md: "flex-start" }}
          >
            <Box w={{ base: "100%", sm: "90%", md: "45%" }}>
              <ProductImageGallery images={product?.images || []} />
            </Box>

            <Box
              w={{ base: "100%", sm: "90%", md: "55%" }}
              mt={{ base: 4, md: 0 }}
            >
              <ProductDetails
                showColor={false}
                product={{
                  _id: product?._id,
                  vendor: product?.vendor || "",
                  height: product?.height || 0,
                  width: product?.width || 0,
                  weight: product?.weight || 0,
                  product_name: product?.product_name || "",
                  unit_price: product?.unit_price || 0,
                  description: product?.description || "",
                  product_quantity: product?.product_quantity || 0,
                  category: product?.category?.name,
                  rating: product?.rating,
                  in_stock: false,
                  images: product?.images || [],
                  is_discounted: product?.is_discounted || false,
                  is_verified: product?.is_verified || false,
                  is_deleted: product?.is_deleted || false,
                  total_quantity_sold: product?.total_quantity_sold || 0,
                }}
              />
            </Box>
          </Flex>
        )}
      </Box>
      <Box px={{ base: 2, md: 4, lg: 6 }}>
        <ProductDescription
          reviews={products?.reviews}
          description={product?.description || ""}
          productId={productId}
        />
        <RelatedProducts
          title="Related Products"
          categoryId={product?.category?._id}
        />
      </Box>
    </Box>
  );
};

export default ProductDetailsPage;
