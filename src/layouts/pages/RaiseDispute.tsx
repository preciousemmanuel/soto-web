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
  const {createProductFormData} = useProduct()
  const { orderId } = useParams<{ orderId: string }>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors},
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
    try {
      const disputeData = {
        title: data.title,
        description: data.description,
        order: orderId || ""
      };
     const formData = createProductFormData(disputeData,selectedImages)
      await useCreateDispute.mutate(formData);
    } catch (error) {
      console.error("Error submitting dispute:", error);
    }
  };
  useEffect(() => {
    if(success){
      reset()
    }
  }, [success])
  

  return (
    <Box bg="white" borderRadius="md" mt="120px">
      <Heading
        size="lg"
        mb={6}
        mt={6}
        fontFamily="Poppins"
        bg="#FFF2ED"
        py={6}
        textAlign="center"
      >
        Raise Dispute
      </Heading>
      <Box mx="auto">
        <Text
          fontSize="xl"
          fontWeight="bold"
          textAlign="center"
          color="#FF5753"
          mb={2}
        >
          Raise Dispute
        </Text>
        <Text fontSize="sm" color="gray.600" textAlign="center" mb={6}>
          Kindly input your dispute title and let us know your complaint
        </Text>
      </Box>

      <VStack spacing={6} align="stretch" maxWidth="700px" mx="auto" py="40px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex gap={20} w="full">
            <FormControl isInvalid={!!errors.title}>
              <FormLabel fontSize="sm" color="gray.700">
                Dispute Title
              </FormLabel>
              <Input
                {...register("title", { required: "Title is required" })}
                w="full"
                placeholder="Dispute Title"
                borderColor="gray.300"
                _focus={{ borderColor: "orange.400" }}
                _hover={{ borderColor: "gray.400" }}
              />
            </FormControl>
            <HStack gap="16px" w="full" alignItems="center">
              <FormLabel fontSize="sm" color="gray.700">
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
              />
            </HStack>
          </Flex>
          <FormControl isInvalid={!!errors?.description} mt={6}>
            <FormLabel fontSize="sm" color="gray.700">
              Type your complaint
            </FormLabel>
            <Textarea
              {...register("description", {
                required: "description is required",
              })}
              height="200px"
              placeholder="Type your description"
              borderColor="gray.300"
              _focus={{ borderColor: "orange.400" }}
              _hover={{ borderColor: "gray.400" }}
              resize="none"
            />
          </FormControl>

          <Button
            mt={4}
            color="white"
            bg="#FF5753"
            size="lg"
            w="full"
            borderRadius="md"
            type="submit"
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
