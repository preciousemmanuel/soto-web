import { Flex, Box, Button } from "@chakra-ui/react";
import ProductImageGallery from "../product/productImage";
import ProductDetails from "../product/productDetails";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../../hooks/useProduct";
import LoadingSpinner from "../../../features/helpers/LoadingSpinner";
import { useEffect } from "react";

const VendorProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { useSingleProduct } = useProduct();
  const { data: oneProduct, isLoading } = useSingleProduct(productId as string);
  const products = oneProduct?.data;
  const product = products?.product;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  return (
    <Box>
      {isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          h="100vh"
        >
          <LoadingSpinner />
        </Box>
      ) : (
        <Flex
          direction={{ base: "column", md: "row" }}
          p={{ base: 4, sm: 6, md: 8, lg: 10 }}
          gap={{ base: 6, sm: 8, md: 12, lg: 20 }}
          mt={{ base: 4, sm: 6, md: 8, lg: 12 }}
          mb={{ base: 4, sm: 6, md: 8, lg: 12 }}
          align={{ base: "center", md: "flex-start" }}
          maxW="container.xl"
          mx="auto"
        >
          <Box
            w={{ base: "100%", sm: "90%", md: "45%" }}
            mb={{ base: 6, md: 0 }}
          >
            <ProductImageGallery images={product?.images || []} />
          </Box>

          <Box
            w={{ base: "100%", sm: "90%", md: "55%" }}
            mb={{ base: 6, md: 0 }}
          >
            <ProductDetails
              showOthers={false}
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
                in_stock: product?.in_stock || false,
                images: product?.images || [],
                is_discounted: product?.is_discounted || false,
                is_verified: product?.is_verified || false,
                is_deleted: product?.is_deleted || false,
                status: product?.status,
                ...product,
              }}
            />
          </Box>
          <Button
            bg="black"
            size={{ base: "md", sm: "lg" }}
            borderRadius="full"
            color="white"
            fontWeight="500"
            height={{ base: "40px", sm: "50px" }}
            width={{ base: "200px", sm: "250px" }}
            fontSize={{ base: "lg", sm: "xl" }}
            onClick={() => navigate(`/edit-product/${productId}`)}
            mt={{ base: 4, sm: 6 }}
            mb={{ base: 8, sm: 0 }}
          >
            Edit Product
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default VendorProductDetailsPage;
