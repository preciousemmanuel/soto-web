import { useState } from "react";
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
} from "@chakra-ui/react";

function CustomOrder() {
  const [step, setStep] = useState<number | string >(1); // 1: Create Order, 2: Add Order, 3: Review Order
  const [orders, setOrders] = useState([]);

  // Save and Submit button handler
  const handleSaveSubmit = () => {
    // Save logic (mocked)
    setOrders([...orders, {}]);
    setStep(step === 1 ? 2 : 3); // Move to the next step
  };

  // Initial Form Layout (Create Order)
  const CreateOrder = () => (
    <Box w="full" maxW="600px" mx="auto" p={6} bg="" rounded="lg" boxShadow="">
      <Heading
        size="lg"
        textAlign="center"
        color={"#FF5733"}
        mb={4}
        mt={8}
        bg={"#FFF2ED"}
        px={6}
        py={4}
        fontFamily={"Poppins"}
        width={"100%"}
        fontWeight={"bold"}
        fontSize={"22px"}
      >
        Create Order
      </Heading>
      <Text textAlign="center" mb={8} color={"gray"}>
        Kindly enter your order details
      </Text>
      {renderFormFields()}
      <Flex mt={6} justify="space-between">
        <Button colorScheme="orange" variant="outline">
          Save & Add
        </Button>
        <Button colorScheme="orange" onClick={handleSaveSubmit}>
          Save & Submit
        </Button>
      </Flex>
    </Box>
  );

  // Second Step Layout (Add Order)
  const AddOrder = () => (
    <Box textAlign="center" w="full" maxW="600px" mx="auto" p={6} rounded="lg">
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb={8}
        bg={"#FFF2ED"}
        px={6}
        py={4}
      >
        <Heading
          size="lg"
          color={"#FF5733"}
          fontFamily={"Poppins"}
          width={"100%"}
          fontWeight={"bold"}
          fontSize={"22px"}
        >
          Add Order
        </Heading>
        <Button
          bg={"black"}
          color="white"
          fontSize={"14px"}
          onClick={() => setStep(3)}
        >
          Review Order
        </Button>
      </Flex>
      <Text mb={4} color={"gray"}>
        Kindly enter your order details
      </Text>
      {renderFormFields()}
      <Flex mt={6} justify="space-between">
        <Button colorScheme="orange" variant="outline">
          Save & Add
        </Button>
        <Button colorScheme="orange" onClick={handleSaveSubmit}>
          Save & Submit
        </Button>
      </Flex>
    </Box>
  );

  // Review Order Layout
  const ReviewOrder = () => (
    <Box mt={8}>
      <Heading
        size="lg"
        textAlign="center"
        mb={6}
        bg={"#FFF2ED"}
        color={"#FF5733"}
        fontFamily={"Poppins"}
        fontSize={"22px"}
        px={6}
        py={4}
      >
        Review Order
      </Heading>
      <Flex justifyContent="space-between" alignItems="center" mb={6} px={10}>
        <Text fontWeight="" fontSize="17px"  fontFamily={"Poppins"} color={"gray"}>
          Recently Added
        </Text>
        <Button rounded="full">Select All</Button>
      </Flex>
      <SimpleGrid columns={[1, 3]} spacing={6} mb={8}>
        {orders.map((_order, index) => (
          <Box key={index} p={4} bg="gray.100" rounded="md" shadow="sm">
            <Text>Product Name: Example</Text>
            <Text>Brand: Example</Text>
            <Text>Size: Large</Text>
            <Text>Color: Red</Text>
            <Text>Quantity: 2</Text>
            <HStack spacing={2} mt={4}>
              <Button size="sm" colorScheme="blue">
                Edit Order
              </Button>
              <Button size="sm" colorScheme="blackAlpha" color="white">
                Review Order
              </Button>
              <Button size="sm" colorScheme="red">
                Delete Order
              </Button>
            </HStack>
          </Box>
        ))}
      </SimpleGrid>
      <Button colorScheme="blackAlpha" color="white" w="full">
        Submit
      </Button>
    </Box>
  );

  // Shared Form Fields
  const renderFormFields = () => (
    <VStack
      spacing={4}
      align="start"
      w="full"
      bg={"#FFF2ED"}
      px={6}
      py={6}
      borderRadius={"md"}
    >
      {[
        "Product Name",
        "Product Brand",
        "Size",
        "Color",
        "Quantity",
        "Type",
        "Type",
      ].map((label) => (
        <Box key={label} w="full">
          <Text fontSize="sm" mb={2} color={"gray"}>
            {label}
          </Text>
          <Input
            placeholder={label}
            rounded="full"
            bg="white"
            _placeholder={{ color: "gray.500" }}
          />
        </Box>
      ))}
      <Box w="full">
        <Text fontSize="sm" mb={2} color={"gray"}>
          Price Range
        </Text>
        <HStack spacing={4}>
          <Input placeholder="Minimum" rounded="full" bg="white" />
          <Input placeholder="Maximum" rounded="full" bg="white" />
        </HStack>
      </Box>
      <Box w="full">
        <Text fontSize="sm" mb={2} color={"gray"}>
          Message
        </Text>
        <Textarea placeholder="Enter message" rounded="lg" bg="white" />
      </Box>
    </VStack>
  );

  return (
    <Box p={6} minH="100vh" mt={20}>
      {/* Conditional Rendering for each step */}
      {step === 1 && <CreateOrder />}
      {step === 2 && <AddOrder />}
      {step === 3 && <ReviewOrder />}
    </Box>
  );
}

export default CustomOrder;
