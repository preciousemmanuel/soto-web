import { Button } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { VStack } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";

const EditOrder = () => {
  const { register, handleSubmit, setValue } = useForm();
  const [draftOrders, setDraftOrders] = useLocalStorage("draftOrders", []);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const navigate = useNavigate();
  // Load order data when component mounts
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const index = searchParams.get('editIndex');
    const numIndex = index ? parseInt(index) : -1;
    
    if (numIndex >= 0 && numIndex < draftOrders.length) {
      setEditingIndex(numIndex);
      const order = draftOrders[numIndex];
      Object.keys(order).forEach(key => {
        setValue(key, order[key]);
      });
    } else {
      navigate('/review-order'); 
    }
  }, [draftOrders, setValue, navigate]);

  const onSubmit = (data: any) => {
    if (editingIndex !== null) {
      const updatedDrafts:any = [...draftOrders];
      updatedDrafts[editingIndex] = data;
      setDraftOrders(updatedDrafts);
    }
    navigate("/review-order");
  };

  const renderFormFields = (register: any) => (
    <VStack
      spacing={4}
      align="start"
      w="full"
      bg={"#FFF2ED"}
      px={6}
      py={6}
      borderRadius={"md"}
    >
      <Box w="full">
        <Text fontSize="sm" mb={2} fontWeight="medium" color={"gray"}>
          Product Name
        </Text>
        <Input
          placeholder="Input product name"
          h="50px"
          rounded="full"
          bg="white"
          {...register("product_name")}
        />
      </Box>
      <Box w="full">
        <Text fontSize="sm" mb={2} fontWeight="medium" color={"gray"}>
          Product Brand
        </Text>
        <Input
          placeholder="Input product brand"
          h="50px"
          rounded="full"
          bg="white"
          {...register("product_brand")}
        />
      </Box>
      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        <Box w="full">
          <Text fontSize="sm" mb={2} fontWeight="medium" color={"gray"}>
            Size
          </Text>
          <Input
            placeholder="Compact"
            rounded="full"
            bg="white"
            _placeholder={{ color: "gray.500" }}
            h="50px"
            {...register("size")}
          />
        </Box>
        <Box w="full">
          <Text fontSize="sm" mb={2} fontWeight="medium" color={"gray"}>
            Color
          </Text>
          <Input
            placeholder="White"
            rounded="full"
            bg="white"
            _placeholder={{ color: "gray.500" }}
            h="50px"
            {...register("color")}
          />
        </Box>
        <Box w="full">
          <Text fontSize="sm" mb={2} fontWeight="medium" color={"gray"}>
            Type
          </Text>
          <Input
            placeholder="Mechanical"
            rounded="full"
            bg="white"
            _placeholder={{ color: "gray.500" }}
            h="50px"
            {...register("type")}
          />
        </Box>
        <Box w="full">
          <Text fontSize="sm" mb={2} fontWeight="medium" color={"gray"}>
            Quantity
          </Text>
          <Input
            type="number"
            placeholder="1"
            rounded="full"
            bg="white"
            _placeholder={{ color: "gray.500" }}
            h="50px"
            {...register("quantity")}
          />
        </Box>
      </SimpleGrid>
      <Box w="full">
        <Text fontSize="sm" mb={2} fontWeight="medium" color={"gray"}>
          Price Range
        </Text>
        <HStack spacing={4}>
          <Input
            placeholder="Minimum Price"
            h="50px"
            rounded="full"
            bg="white"
            {...register("min_price")}
          />
          <Input
            placeholder="Maximum Price"
            h="50px"
            rounded="full"
            bg="white"
            {...register("max_price")}
          />
        </HStack>
      </Box>
      <Box w="full">
        <Text fontSize="sm" mb={2} fontWeight="medium" color={"gray"}>
          Phone Number
        </Text>
        <Input
          placeholder="9876543210"
          h="50px"
          rounded="full"
          bg="white"
          {...register("phone_number")}
        />
      </Box>
      <Box w="full">
        <Text fontSize="sm" mb={2} fontWeight="medium" color={"gray"}>
          Email
        </Text>
        <Input
          type="email"
          placeholder="user@example.com"
          h="50px"
          rounded="full"
          bg="white"
          {...register("email")}
        />
      </Box>
      <Box w="full">
        <Text fontSize="sm" mb={2} fontWeight="medium" color={"gray"}>
          Note
        </Text>
        <Textarea
          placeholder="Please include a wrist rest if available."
          h="150px"
          rounded="lg"
          bg="white"
          {...register("note")}
        />
      </Box>
    </VStack>
  );

  return (
    <Box w="full" mx="auto" bg="" rounded="lg" boxShadow="" mt={{ base: 20, md: 180 }}>
      <Flex
        align="center"
        justify="center"
        position="relative"
        bg="#FFF2ED"
        p={{ base: 4, md: 6 }}
        mt={{ base: 6, md: 20 }}
        mb={6}
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
        <Heading size="100px" fontFamily="Poppins" color="#FF5753">
          Edit Order
        </Heading>
      </Flex>

      <Text
        textAlign="center"
        mb={8}
        color="gray"
        fontSize={{ base: "sm", md: "md" }}
      >
        Update your order details
      </Text>
      <Box px={{ base: 4, md: 6, lg: 300 }} py={6}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderFormFields(register)}
          <Button
            bg="#FF5733"
            color="white"
            h={{ base: "40px", md: "50px" }}
            borderRadius="xl"
            variant="outline"
            type="submit"
            mt={6}
            width={{ base: "full", md: "auto" }}
            fontSize={{ base: "sm", md: "md" }}
          >
            Update
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default EditOrder;