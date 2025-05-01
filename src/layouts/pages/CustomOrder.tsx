import { Key, useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  VStack,
  SimpleGrid,
  Flex,
  HStack,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { ChevronLeftIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { FaEye } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useOrder } from "../hooks/useOrder";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

function CustomOrder() {
  const [draftOrders, setDraftOrders] = useLocalStorage("draftOrders", []);
  const navigate = useNavigate();

  const CreateOrder = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
      const newDraftOrders:any = [...draftOrders, data];
      setDraftOrders(newDraftOrders);
      navigate("/review-order");
    };
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    // const onSubmit = async (data: any) => {
    //   try {
    //     const formattedData = {
    //       orders: [data],
    //     };
    //     await createCustomOrders(formattedData);
    //   } catch (error) {
    //     console.error("Order creation failed:", error);
    //   }
    // };
    // useEffect(() => {
    //   if (orderSuccess) {
    //     refetchOrders();
    //     navigate("/review-order");
    //   }
    // }, [orderSuccess]);

    return (
      <Box w="full" mx="auto" bg="" rounded="lg" boxShadow="">
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
            Create Order
          </Heading>
        </Flex>

        <Text
          textAlign="center"
          mb={8}
          color="gray"
          fontSize={{ base: "sm", md: "md" }}
        >
          Kindly enter your order details
        </Text>
        <Box px={{ base: 4, md: 6, lg: 300 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {renderFormFields(register)}
            <Button
              // isLoading={isCreatingOrder}
              loadingText="Submitting..."
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
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    );
  };

  // const AddOrder = () => {
  //   const { register, handleSubmit } = useForm();
  //   const { createCustomOrders, isCreatingOrder, orderSuccess, refetchOrders } =
  //     useOrder();

  //   const onSubmit = async (data: any) => {
  //     try {
  //       const formattedData = {
  //         orders: [data],
  //       };
  //       const res: any = await createCustomOrders(formattedData);
  //       if (res) {
  //         await refetchOrders();
  //       }
  //     } catch (error) {
  //       console.error("Order creation failed:", error);
  //     }
  //   };
  //   return (
  //     <Box w="full" mx="auto" p={{ base: 4, md: 6 }} rounded="lg">
  //       <Flex
  //         justifyContent="space-between"
  //         alignItems="center"
  //         mb={8}
  //         bg="#FFF2ED"
  //         px={{ base: 4, md: 6 }}
  //         py={4}
  //       >
  //         <Heading
  //           size={{ base: "md", md: "lg" }}
  //           color="#FF5733"
  //           fontFamily="Poppins"
  //           width="100%"
  //           fontWeight="bold"
  //           fontSize={{ base: "18px", md: "22px" }}
  //         >
  //           Add Order
  //         </Heading>
  //         <Button
  //           bg="black"
  //           color="white"
  //           fontSize={{ base: "12px", md: "14px" }}
  //           size={{ base: "sm", md: "md" }}
  //         >
  //           Review Order
  //         </Button>
  //       </Flex>
  //       <Text
  //         mb={4}
  //         textAlign="center"
  //         color="gray"
  //         fontSize={{ base: "sm", md: "md" }}
  //       >
  //         Kindly enter your order details
  //       </Text>
  //       <Box px={{ base: 4, md: 6, lg: 300 }}>
  //         <form onSubmit={handleSubmit(onSubmit)}>
  //           {renderFormFields(register)}
  //           <Button
  //             isLoading={isCreatingOrder}
  //             loadingText="Submitting..."
  //             bg="#FF5733"
  //             color="white"
  //             h={{ base: "40px", md: "50px" }}
  //             borderRadius="xl"
  //             variant="outline"
  //             type="submit"
  //             mt={6}
  //             width={{ base: "full", md: "auto" }}
  //             fontSize={{ base: "sm", md: "md" }}
  //           >
  //             Save & Submit
  //           </Button>
  //         </form>
  //       </Box>
  //     </Box>
  //   );
  // };

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
    <Box p={4} minH="100vh" mt="100px">
      <CreateOrder />
    </Box>
  );
}

export default CustomOrder;
