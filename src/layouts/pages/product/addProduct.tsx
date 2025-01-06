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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FaRegImages } from "react-icons/fa";
import { useProduct } from "../../hooks/useProduct";


const AddProduct: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { useAddNewProduct, isLoading, createProductFormData, categories } =
    useProduct();
  const category = categories?.data?.data;
  const [isInStock, setIsInStock] = useState(true);
  const [isDiscounted, setIsDiscounted] = useState(false);
  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

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

  const onSubmit = async (data:any) => {
    if (selectedImages) {
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
        description
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
        ...(discount_price && { discount_price: Number(discount_price) })
      };
      const formData = createProductFormData(newProduct, selectedImages);
      useAddNewProduct.mutate(formData);
    }
  };

  return (
    <Box py="120px">
      <Text
        textAlign="center"
        bg={"#FFF2ED"}
        pt={4}
        pb={4}
        color="#FF5733"
        fontSize="2xl"
        fontWeight="bold"
        mb={8}
      >
        {useAddNewProduct.isSuccess === false
          ? "Add Product"
          : "Review Product"}
      </Text>
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
            <Text fontSize={12} py={4}>To upload multiple images, please select the multiple images from the image dialog</Text>
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
                onClick={() => document.getElementById('file-upload')?.click()}
                fontSize="50px"
                icon={<FaRegImages color="#979797" />}
              />
              <Text fontSize="md">Upload Product Image</Text>
              <Text fontSize="sm">Image should be under 5MB</Text>
            </FormLabel>
          </FormControl>
          <Box my={4} borderRadius="10px">
            {selectedImages && (
              <Box mt={4}>
                <Text fontSize="md"> Product Images</Text>
                <Box display="flex" flexWrap="wrap">
                  {imagePreviews?.map((preview, index) => (
                    <Box key={index} m={2} p={2} borderRadius="lg">
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
            Add Product
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default AddProduct;
