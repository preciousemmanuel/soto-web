import { Flex, Box } from "@chakra-ui/react";
import ProductImageGallery from "./product/productImage";
import ProductDetails from "./product/productDetails";
import ProductDescription from "./product/productDescription";
import { useParams } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import RelatedProducts from "./product/relatedProduct";
import { useEffect } from "react";
import LoadingSpinner from "../../features/helpers/LoadingSpinner";

const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const { useSingleProduct, handleAddToCart } = useProduct();
  const { data: oneProduct, isLoading } = useSingleProduct(productId as string);
  useEffect(() => {
    const handleCartUpdate = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    };

    window.addEventListener("cartUpdated", handleCartUpdate);
    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const products = oneProduct?.data;
  const product = products?.product;
  // console.log(products,"PRODUCT")
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
              // sizes={["", "", ""]}
              // colors={["", "", ""]}
              onClick={() => handleAddToCart(productId as string)}
            />
          </Box>
        </Flex>
      )}
      <ProductDescription reviews={products?.reviews} description={product?.description || ""} />
      <RelatedProducts title="Related Products" categoryId={product?.category?._id} />
    </Box>
  );
};

export default ProductDetailsPage;
