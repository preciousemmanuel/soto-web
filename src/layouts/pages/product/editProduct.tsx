import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Switch,
  VStack,
  HStack,
  Text,
  Icon,
  IconButton,
  Image,
  Select,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaRegImages } from "react-icons/fa";
import { useProduct } from "../../hooks/useProduct";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeftIcon } from "@chakra-ui/icons";

const EditProduct: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { useUpdateProduct, isLoading, createProductFormData, categories } =
    useProduct();
  const category = categories?.data?.data;
  const [isInStock, setIsInStock] = useState(true);
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { useSingleProduct } = useProduct();
  const { data: oneProduct, isLoading: loadingNow } = useSingleProduct(
    productId as string
  );
  const products = oneProduct?.data;
  const product = products?.product;

  React.useEffect(() => {
    if (product) {
      setValue("product_name", product.product_name);
      setValue("category", product.category?._id);
      setValue("product_quantity", product.product_quantity);
      setValue("unit_price", product.unit_price);
      setValue("weight", product.weight);
      setValue("discount_price", product.discount_price);
      setValue("length", product.length);
      setValue("height", product.height);
      setValue("width", product.width);
      setValue("description", product.description);
      setIsInStock(product.in_stock === "YES");
      setIsDiscounted(!!product.discount_price);

      if (product.images?.length) {
        setImagePreviews([...product.images]);
      }
    }
  }, [product, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const totalImages = imagePreviews.length + e.target.files.length;
     
      setSelectedImages(e.target.files);
      const previews = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews((prev) => [...prev, ...previews]);
    }
  };

  const onSubmit = async (data: any) => {
    if (productId) {
      const {
        product_name,
        category,
        product_quantity,
        unit_price,
        weight,
        discount_price,
        length,
        height,
        width,
        description,
      } = data;

      const formData = new FormData();
      formData.append("product_name", product_name);
      formData.append("category", category);
      formData.append("product_quantity", product_quantity);
      formData.append("unit_price", unit_price);
      formData.append("description", description);
      formData.append("is_discounted", String(isDiscounted));
      formData.append("in_stock", isInStock ? "YES" : "NO");
      if (weight && weight !== "") {
        formData.append("weight", String(Number(weight)));
      }
      if (length && length !== "") {
        formData.append("length", String(Number(length)));
      }
      if (height && height !== "") {
        formData.append("height", String(Number(height)));
      }
      if (width && width !== "") {
        formData.append("width", String(Number(width)));
      }
      if (discount_price) {
        formData.append("discount_price", String(Number(discount_price)));
      }

      // const totalImages =
      //   (product?.images?.length || 0) + (selectedImages?.length || 0);
      // if (totalImages < 2) {
      //   alert("Product must have at least 2 images total");
      //   return;
      // }

      // Append new images if any
      if (selectedImages) {
        Array.from(selectedImages).forEach((file) => {
          formData.append("images[]", file);
        });
      }

      // Always include existing images
      if (product?.images) {
        product.images.forEach((imageUrl: string) => {
          formData.append("existing_images[]", imageUrl);
        });
      }

      formData.append("id", productId as string);
      await useUpdateProduct.mutateAsync(formData);
    } else {
      alert("Please ensure product ID is valid");
    }
  };

  return (
    <Box py="150px">
      <Flex
        align="center"
        justify="center"
        position="relative"
        bg="#FFF2ED"
        p={{ base: 4, md: 6 }}
        // mt={{ base: 10, md: 20 }}
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
          {useUpdateProduct.isSuccess === false
            ? "Edit Product"
            : "Review Product"}
        </Heading>
      </Flex>
      <Box my={6} textAlign="center">
        <Text fontSize="md" fontWeight="normal" color="#908D8D">
          Kindly enter your product details
        </Text>
      </Box>
      <Box
        bg="pink.50"
        p={8}
        borderWidth="1px"
        borderColor="#FF5733"
        borderRadius="md"
        boxShadow="md"
        maxW="750px"
        mx="auto"
      >
        <VStack spacing={4} align="center">
          <FormControl>
            <FormLabel>Product name</FormLabel>
            <Input
              h="60px"
              bg="white"
              borderRadius="15px"
              placeholder="Enter name"
              {...register("product_name", { required: true })}
            />
          </FormControl>

          <HStack spacing={4}>
            <FormControl>
              <FormLabel>Product Category</FormLabel>
              <Select
                h="60px"
                bg="white"
                borderRadius="15px"
                placeholder="Select category"
                {...register("category", { required: true })}
              >
                {category?.map((category: any) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>Quantity</FormLabel>
              <Input
                h="60px"
                bg="white"
                borderRadius="15px"
                placeholder="Enter quantity"
                type="number"
                {...register("product_quantity")}
              />
            </FormControl>
          </HStack>

          <HStack spacing={4}>
            <FormControl>
              <FormLabel>Unit Price</FormLabel>
              <Input
                h="60px"
                bg="white"
                borderRadius="15px"
                placeholder="Enter price"
                type="number"
                {...register("unit_price")}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Weight</FormLabel>
              <Input
                h="60px"
                bg="white"
                borderRadius="15px"
                placeholder="Enter weight"
                type="number"
                {...register("weight")}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Discount (optional)</FormLabel>
              {isDiscounted ? null : (
                <Switch
                  colorScheme="red"
                  size="lg"
                  isChecked={isDiscounted}
                  onChange={(e) => setIsDiscounted(e.target.checked)}
                />
              )}
              {isDiscounted && (
                <Input
                  h="60px"
                  bg="white"
                  borderRadius="15px"
                  placeholder="0%"
                  type="number"
                  {...register("discount_price")}
                />
              )}
            </FormControl>
          </HStack>

          <FormControl>
            <FormLabel>Dimensions (optional)</FormLabel>
            <HStack spacing={4}>
              <Input
                h="60px"
                bg="white"
                borderRadius="15px"
                placeholder="Length (mm)"
                type="number"
                {...register("length")}
              />
              <Input
                h="60px"
                bg="white"
                borderRadius="15px"
                placeholder="Height (mm)"
                type="number"
                {...register("height")}
              />
              <Input
                h="60px"
                bg="white"
                borderRadius="15px"
                placeholder="Width (mm)"
                type="number"
                {...register("width")}
              />
            </HStack>
          </FormControl>

          <FormControl>
            <FormLabel>Upload Product Image</FormLabel>
            <Text fontSize={12} py={4}>
              To upload multiple images, please select the multiple images from
              the image dialog
            </Text>
            <Input
              type="file"
              multiple
              onChange={handleImageChange}
              accept=".jpg, .jpeg, .png"
              p={4}
              h="150px"
              bg="white"
              textAlign="center"
              borderRadius="lg"
              color="gray.500"
              display="none"
              id="file-upload"
            />
            <FormLabel
              htmlFor="file-upload"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              h="150px"
              bg="white"
              borderRadius="lg"
              color="gray.500"
              border="1px dashed gray"
            >
              <IconButton
                variant="outline"
                aria-label="Images"
                onClick={() => document.getElementById("file-upload")?.click()}
                fontSize="50px"
                icon={<FaRegImages color="#979797" />}
              />
              <Text fontSize="md">Upload Product Image</Text>
              <Text fontSize="sm">Image should be under 5MB</Text>
            </FormLabel>
          </FormControl>
          <Box my={4} borderRadius="10px">
            {imagePreviews.length > 0 && (
              <Box mt={4}>
                <Text fontSize="md">Product Images</Text>
                <Box display="flex" flexWrap="wrap">
                  {imagePreviews.map((preview, index) => (
                    <Box
                      key={index}
                      m={2}
                      p={2}
                      borderRadius="lg"
                      position="relative"
                    >
                      <Image
                        src={preview}
                        alt={`Preview ${index}`}
                        boxSize="150px"
                        objectFit="cover"
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>

          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              placeholder="Describe your product"
              h="150px"
              bg="white"
              borderRadius="15px"
              {...register("description")}
            />
          </FormControl>

          <FormControl
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            my="12px"
          >
            <FormLabel mb="0">Mark Product in stock</FormLabel>
            <Switch
              colorScheme="red"
              size="lg"
              isChecked={isInStock}
              onChange={(e) => setIsInStock(e.target.checked)}
            />
          </FormControl>

          <Button
            color="white"
            bg="#FF5733"
            _hover={{ bg: "#FF5734", color: "white" }}
            size="lg"
            width="60%"
            h="60px"
            isLoading={isLoading}
            loadingText="Adding Product..."
            borderRadius="15px"
            onClick={handleSubmit(onSubmit)}
          >
            Update Product
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default EditProduct;
