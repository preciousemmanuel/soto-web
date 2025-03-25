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
        <Box display="flex" justifyContent="center" alignItems="center">
          <LoadingSpinner />
        </Box>
      ) : (
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
                // total_quantity_sold: product?.total_quantity_sold || 0,
                status: product?.status,
                ...product,
              }}
              // sizes={["", "", ""]}
              // colors={["", "", ""]}
            />
          </Box>
          <Button
            bg="black"
            size="lg"
            borderRadius="full"
            color="white"
            fontWeight="500"
            height="50px"
            width="250px"
            fontSize="xl"
            onClick={() => navigate(`/edit-product/${productId}`)}
          >
            Edit Product
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default VendorProductDetailsPage;
