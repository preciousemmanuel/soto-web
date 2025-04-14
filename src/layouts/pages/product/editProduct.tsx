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
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaRegImages } from "react-icons/fa";
import { useProduct } from "../../hooks/useProduct";
import { useNavigate, useParams } from "react-router-dom";

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
        setImagePreviews(product.images);
      }
    }
  }, [product, setValue]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (e.target.files.length > 5) {
        alert("You can only upload a maximum of 5 images.");
        return;
      }
      setSelectedImages(e.target.files);
      const filesArray = Array.from(e.target.files);
      const previews = filesArray.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
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

      const newProduct = {
        product_name,
        category,
        product_quantity,
        unit_price,
        description,
        is_discounted: isDiscounted,
        in_stock: isInStock ? "YES" : "NO",
        ...(weight && weight !== "" && { weight: Number(weight) }),
        ...(length && length !== "" && { length: Number(length) }),
        ...(height && height !== "" && { height: Number(height) }),
        ...(width && width !== "" && { width: Number(width) }),
        ...(discount_price && { discount_price: Number(discount_price) }),
      };

      const imagesToUpload = selectedImages
        ? selectedImages
        : new DataTransfer().files;
      const formData = createProductFormData(newProduct, imagesToUpload);

      if (!selectedImages && product?.images) {
        product.images.forEach((imageUrl: string, index: number) => {
          formData.append(`existingImages[${index}]`, imageUrl);
        });
      }

      formData.append("id", productId);
      await useUpdateProduct.mutateAsync(formData);
    } else {
      alert("Please ensure product ID is valid");
    }
  };

  return (
    <Box py={{ base: "80px", md: "120px" }} px={{ base: 4, md: 8 }}>
      <Text
        textAlign="center"
        bg={"#FFF2ED"}
        pt={4}
        pb={4}
        color="#FF5733"
        fontSize={{ base: "xl", md: "2xl" }}
        fontWeight="bold"
        mb={{ base: 4, md: 8 }}
      >
        {useUpdateProduct.isSuccess === false
          ? "Edit Product"
          : "Review Product"}
      </Text>
      <Box my={{ base: 4, md: 6 }} textAlign="center">
        <Text
          fontSize={{ base: "sm", md: "md" }}
          fontWeight="normal"
          color="#908D8D"
        >
          Kindly enter your product details
        </Text>
      </Box>
      <Box
        bg="pink.50"
        p={{ base: 4, md: 8 }}
        borderWidth="1px"
        borderColor="#FF5733"
        borderRadius="md"
        boxShadow="md"
        maxW={{ base: "100%", md: "750px" }}
        mx="auto"
      >
        <VStack spacing={{ base: 2, md: 4 }} align="center">
          <FormControl>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>
              Product name
            </FormLabel>
            <Input
              h={{ base: "50px", md: "60px" }}
              bg="white"
              borderRadius="15px"
              placeholder="Enter name"
              fontSize={{ base: "sm", md: "md" }}
              {...register("product_name", { required: true })}
            />
          </FormControl>

          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: 2, md: 4 }}
            w="full"
          >
            <FormControl>
              <FormLabel fontSize={{ base: "sm", md: "md" }}>
                Product Category
              </FormLabel>
              <Select
                h={{ base: "50px", md: "60px" }}
                bg="white"
                borderRadius="15px"
                placeholder="Select category"
                fontSize={{ base: "sm", md: "md" }}
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
              <FormLabel fontSize={{ base: "sm", md: "md" }}>
                Quantity
              </FormLabel>
              <Input
                h={{ base: "50px", md: "60px" }}
                bg="white"
                borderRadius="15px"
                placeholder="Enter quantity"
                type="number"
                fontSize={{ base: "sm", md: "md" }}
                {...register("product_quantity")}
              />
            </FormControl>
          </Stack>

          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: 2, md: 4 }}
            w="full"
          >
            <FormControl>
              <FormLabel fontSize={{ base: "sm", md: "md" }}>
                Unit Price
              </FormLabel>
              <Input
                h={{ base: "50px", md: "60px" }}
                bg="white"
                borderRadius="15px"
                placeholder="Enter price"
                type="number"
                fontSize={{ base: "sm", md: "md" }}
                {...register("unit_price")}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={{ base: "sm", md: "md" }}>Weight</FormLabel>
              <Input
                h={{ base: "50px", md: "60px" }}
                bg="white"
                borderRadius="15px"
                placeholder="Enter weight"
                type="number"
                fontSize={{ base: "sm", md: "md" }}
                {...register("weight")}
              />
            </FormControl>
            <FormControl>
              <FormLabel fontSize={{ base: "sm", md: "md" }}>
                Discount (optional)
              </FormLabel>
              {isDiscounted ? null : (
                <Switch
                  colorScheme="red"
                  size={{ base: "md", md: "lg" }}
                  isChecked={isDiscounted}
                  onChange={(e) => setIsDiscounted(e.target.checked)}
                />
              )}
              {isDiscounted && (
                <Input
                  h={{ base: "50px", md: "60px" }}
                  bg="white"
                  borderRadius="15px"
                  placeholder="0%"
                  type="number"
                  fontSize={{ base: "sm", md: "md" }}
                  {...register("discount_price")}
                />
              )}
            </FormControl>
          </Stack>

          <FormControl>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>
              Dimensions (optional)
            </FormLabel>
            <Stack
              direction={{ base: "column", md: "row" }}
              spacing={{ base: 2, md: 4 }}
            >
              <Input
                h={{ base: "50px", md: "60px" }}
                bg="white"
                borderRadius="15px"
                placeholder="Length (mm)"
                type="number"
                fontSize={{ base: "sm", md: "md" }}
                {...register("length")}
              />
              <Input
                h={{ base: "50px", md: "60px" }}
                bg="white"
                borderRadius="15px"
                placeholder="Height (mm)"
                type="number"
                fontSize={{ base: "sm", md: "md" }}
                {...register("height")}
              />
              <Input
                h={{ base: "50px", md: "60px" }}
                bg="white"
                borderRadius="15px"
                placeholder="Width (mm)"
                type="number"
                fontSize={{ base: "sm", md: "md" }}
                {...register("width")}
              />
            </Stack>
          </FormControl>

          <FormControl>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>
              Upload Product Image
            </FormLabel>
            <Text fontSize={{ base: "xs", md: "sm" }} py={2}>
              To upload multiple images, please select the multiple images from
              the image dialog
            </Text>
            <Input
              type="file"
              multiple
              onChange={handleImageChange}
              accept=".jpg, .jpeg, .png"
              p={2}
              h={{ base: "120px", md: "150px" }}
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
              h={{ base: "120px", md: "150px" }}
              bg="white"
              borderRadius="lg"
              color="gray.500"
              border="1px dashed gray"
            >
              <IconButton
                variant="outline"
                aria-label="Images"
                onClick={() => document.getElementById("file-upload")?.click()}
                fontSize={{ base: "40px", md: "50px" }}
                icon={<FaRegImages color="#979797" />}
              />
              <Text fontSize={{ base: "sm", md: "md" }}>
                Upload Product Image
              </Text>
              <Text fontSize={{ base: "xs", md: "sm" }}>
                Image should be under 5MB
              </Text>
            </FormLabel>
          </FormControl>
          <Box my={4} borderRadius="10px" w="full">
            {(selectedImages || product?.images) && (
              <Box mt={4}>
                <Text fontSize={{ base: "sm", md: "md" }}>Product Images</Text>
                <Box display="flex" flexWrap="wrap" justifyContent="center">
                  {imagePreviews?.map((preview, index) => (
                    <Box key={index} m={2} p={2} borderRadius="lg">
                      <Image
                        src={preview}
                        alt={`Preview ${index}`}
                        boxSize={{ base: "100px", md: "150px" }}
                        objectFit="cover"
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>

          <FormControl>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>
              Description
            </FormLabel>
            <Textarea
              placeholder="Describe your product"
              h={{ base: "120px", md: "150px" }}
              bg="white"
              borderRadius="15px"
              fontSize={{ base: "sm", md: "md" }}
              {...register("description")}
            />
          </FormControl>

          <FormControl
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            my="12px"
          >
            <FormLabel mb="0" fontSize={{ base: "sm", md: "md" }}>
              Mark Product in stock
            </FormLabel>
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
