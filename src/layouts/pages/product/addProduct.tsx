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

  const onSubmit = async (data: any) => {
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
      const formData = createProductFormData(newProduct, selectedImages);
      useAddNewProduct.mutate(formData);
    }
  };

  return (
    <Box py={{ base: "60px", md: "90px", lg: "120px" }}>
      <Text
        textAlign="center"
        bg={"#FFF2ED"}
        pt={{ base: 2, md: 3, lg: 4 }}
        pb={{ base: 2, md: 3, lg: 4 }}
        color="#FF5733"
        fontSize={{ base: "xl", md: "2xl" }}
        fontWeight="bold"
        mb={{ base: 4, md: 6, lg: 8 }}
      >
        {useAddNewProduct.isSuccess === false
          ? "Add Product"
          : "Review Product"}
      </Text>
      <Box my={{ base: 3, md: 4, lg: 6 }} textAlign="center">
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
        p={{ base: 4, md: 6, lg: 8 }}
        borderWidth="1px"
        borderColor="#FF5733"
        borderRadius="md"
        boxShadow="md"
        maxW={{ base: "90%", sm: "80%", md: "750px" }}
        mx="auto"
      >
        <VStack spacing={{ base: 3, md: 4 }} align="center">
          <FormControl>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>
              Product name
            </FormLabel>
            <Input
              h={{ base: "50px", md: "60px" }}
              bg="white"
              borderRadius="15px"
              placeholder="Enter name"
              {...register("product_name", { required: true })}
            />
          </FormControl>

          <HStack
            spacing={{ base: 2, md: 4 }}
            w="100%"
            flexWrap={{ base: "wrap", md: "nowrap" }}
          >
            <FormControl mb={{ base: 3, md: 0 }}>
              <FormLabel fontSize={{ base: "sm", md: "md" }}>
                Product Category
              </FormLabel>
              <Select
                h={{ base: "50px", md: "60px" }}
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
              <FormLabel fontSize={{ base: "sm", md: "md" }}>
                Quantity
              </FormLabel>
              <Input
                h={{ base: "50px", md: "60px" }}
                bg="white"
                borderRadius="15px"
                placeholder="Enter quantity"
                type="number"
                {...register("product_quantity")}
              />
            </FormControl>
          </HStack>

          <HStack
            spacing={{ base: 2, md: 4 }}
            w="100%"
            flexWrap={{ base: "wrap", md: "nowrap" }}
          >
            <FormControl mb={{ base: 3, md: 0 }}>
              <FormLabel fontSize={{ base: "sm", md: "md" }}>
                Unit Price
              </FormLabel>
              <Input
                h={{ base: "50px", md: "60px" }}
                bg="white"
                borderRadius="15px"
                placeholder="Enter price"
                type="number"
                {...register("unit_price")}
              />
            </FormControl>
            <FormControl mb={{ base: 3, md: 0 }}>
              <FormLabel fontSize={{ base: "sm", md: "md" }}>Weight</FormLabel>
              <Input
                h={{ base: "50px", md: "60px" }}
                bg="white"
                borderRadius="15px"
                placeholder="Enter weight"
                type="number"
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
                  {...register("discount_price")}
                />
              )}
            </FormControl>
          </HStack>

          <FormControl>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>
              Dimensions (optional)
            </FormLabel>
            <HStack spacing={{ base: 2, md: 4 }} w="100%">
              <Input
                h={{ base: "50px", md: "60px" }}
                bg="white"
                borderRadius="15px"
                placeholder="Length (mm)"
                type="number"
                {...register("length")}
              />
              <Input
                h={{ base: "50px", md: "60px" }}
                bg="white"
                borderRadius="15px"
                placeholder="Height (mm)"
                type="number"
                {...register("height")}
              />
              <Input
                h={{ base: "50px", md: "60px" }}
                bg="white"
                borderRadius="15px"
                placeholder="Width (mm)"
                type="number"
                {...register("width")}
              />
            </HStack>
          </FormControl>

          <FormControl>
            <FormLabel fontSize={{ base: "sm", md: "md" }}>
              Upload Product Image
            </FormLabel>
            <Text
              fontSize={{ base: "xs", sm: "sm", md: "12px" }}
              py={{ base: 2, md: 4 }}
            >
              To upload multiple images, please select the multiple images from
              the image dialog
            </Text>
            <Input
              type="file"
              multiple
              onChange={handleImageChange}
              accept=".jpg, .jpeg, .png"
              p={{ base: 2, md: 4 }}
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
              <Text fontSize={{ base: "xs", sm: "sm" }}>
                Image should be under 5MB
              </Text>
            </FormLabel>
          </FormControl>
          <Box my={{ base: 2, md: 4 }} borderRadius="10px" w="100%">
            {selectedImages && (
              <Box mt={{ base: 2, md: 4 }}>
                <Text fontSize={{ base: "sm", md: "md" }}> Product Images</Text>
                <Box display="flex" flexWrap="wrap" justifyContent="center">
                  {imagePreviews?.map((preview, index) => (
                    <Box
                      key={index}
                      m={{ base: 1, md: 2 }}
                      p={{ base: 1, md: 2 }}
                      borderRadius="lg"
                    >
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
              {...register("description")}
            />
          </FormControl>

          <FormControl
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            my={{ base: 2, md: "12px" }}
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
            Add Product
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default AddProduct;
