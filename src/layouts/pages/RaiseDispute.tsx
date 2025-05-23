import {
  Box,
  Text,
  VStack,
  HStack,
  Input,
  Textarea,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Heading,
  Flex,
  Select,
} from "@chakra-ui/react";
import { FiPaperclip } from "react-icons/fi";
import { useVendor } from "../hooks/useVendor";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useProduct } from "../hooks/useProduct";

interface DisputeFormData {
  title: string;
  description: string;
  images: File[];
  order?: string;
}

const RaiseDisputePage = () => {
  const { useCreateDispute } = useVendor();
  const { createProductFormData } = useProduct();
  const { orderId } = useParams<{ orderId: string }>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DisputeFormData>();
  const [selectedImages, setSelectedImages] = useState<FileList | any>(null);
  const loading = useCreateDispute.isPending;
  const success = useCreateDispute.isSuccess;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages(e.target.files);
    }
  };

  const onSubmit = async (data: DisputeFormData) => {
    const disputeData = {
      title: data.title,
      description: data.description,
      order: orderId || "",
    };

    const formData = createProductFormData(disputeData, selectedImages || []);

    await useCreateDispute.mutate(formData);
  };
  useEffect(() => {
    if (success) {
      reset();
    }
  }, [success]);

  return (
    <Box bg="white" borderRadius="md" mt={{ base: "80px", md: "150px" }}>
      <Heading
        size="lg"
        mb={{ base: 4, md: 6 }}
        mt={{ base: 4, md: 6 }}
        fontFamily="Poppins"
        bg="#FFF2ED"
        py={{ base: 4, md: 6 }}
        textAlign="center"
      >
        Raise Dispute
      </Heading>
      <Box mx="auto" px={{ base: 4, md: 0 }}>
        <Text
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="bold"
          textAlign="center"
          color="#FF5753"
          mb={2}
        >
          Raise Dispute
        </Text>
        <Text
          fontSize={{ base: "xs", md: "sm" }}
          color="gray.600"
          textAlign="center"
          mb={{ base: 4, md: 6 }}
        >
          Kindly input your dispute title and let us know your complaint
        </Text>
      </Box>

      <VStack
        spacing={{ base: 4, md: 6 }}
        align="stretch"
        maxWidth="700px"
        mx="auto"
        py={{ base: "20px", md: "40px" }}
        px={{ base: 4, md: 0 }}
      >
        <form>
          <Flex
            gap={{ base: 4, md: 20 }}
            w="full"
            direction={{ base: "column", md: "row" }}
          >
            <FormControl isInvalid={!!errors.title}>
              <FormLabel fontSize={{ base: "xs", md: "sm" }} color="gray.700">
                Dispute Title
              </FormLabel>
              <Select
                {...register("title")}
                w="full"
                placeholder="Select Dispute Category"
                borderColor="gray.300"
                _focus={{ borderColor: "orange.400" }}
                _hover={{ borderColor: "gray.400" }}
                size={{ base: "sm", md: "md" }}
              >
                <option value="Order and Delivery">Order and Delivery</option>
                <option value="Payment and Refund">Payment and Refund</option>
                <option value="Product quality and authenticity">
                  Product quality and authenticity
                </option>
                <option value="Warranty and Return">Warranty and Return</option>
                <option value="Fraud and security">Fraud and security</option>
              </Select>
            </FormControl>
            <HStack gap={{ base: 2, md: "16px" }} w="full" alignItems="center">
              <FormLabel fontSize={{ base: "xs", md: "sm" }} color="gray.700">
                Attach Photos (Optional)
              </FormLabel>
              <Input
                type="file"
                multiple
                onChange={handleImageChange}
                accept=".jpg, .jpeg, .png"
                display="none"
                id="photo-upload"
              />
              <IconButton
                as="label"
                htmlFor="photo-upload"
                aria-label="Attach Photos"
                icon={<FiPaperclip />}
                variant="outline"
                borderColor="#FF5753"
                color="#FF5753"
                _hover={{ bg: "orange.50" }}
                cursor="pointer"
                size={{ base: "sm", md: "md" }}
              />
            </HStack>
          </Flex>
          <FormControl
            isInvalid={!!errors?.description}
            mt={{ base: 4, md: 6 }}
          >
            <FormLabel fontSize={{ base: "xs", md: "sm" }} color="gray.700">
              Type your complaint
            </FormLabel>
            <Textarea
              {...register("description", {
                // required: "description is required",
              })}
              height={{ base: "150px", md: "200px" }}
              placeholder="Type your description"
              borderColor="gray.300"
              _focus={{ borderColor: "orange.400" }}
              _hover={{ borderColor: "gray.400" }}
              resize="none"
              size={{ base: "sm", md: "md" }}
            />
          </FormControl>

          <Button
            mt={4}
            color="white"
            bg="#FF5753"
            size={{ base: "md", md: "lg" }}
            w="full"
            borderRadius="md"
            // type="submit"
            onClick={handleSubmit(onSubmit)}
            loadingText="Submitting..."
            isLoading={loading}
          >
            Submit
          </Button>
        </form>
      </VStack>
    </Box>
  );
};

export default RaiseDisputePage;
