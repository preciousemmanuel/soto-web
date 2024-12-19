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

const RaiseDisputePage = () => {
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
        <Flex gap={20} w="full">
          <FormControl>
            <FormLabel fontSize="sm" color="gray.700">
              Dispute Title
            </FormLabel>
            <Input
              w="full"
              placeholder="Dispute Title"
              borderColor="gray.300"
              _focus={{ borderColor: "orange.400" }}
              _hover={{ borderColor: "gray.400" }}
            />
          </FormControl>
          <HStack gap="16px" w="full" alignItems="center">
            <FormLabel fontSize="sm" color="gray.700">
              Attach Photo (Optional)
            </FormLabel>
            <IconButton
              aria-label="Attach Photo"
              icon={<FiPaperclip />}
              variant="outline"
              borderColor="#FF5753"
              color="#FF5753"
              _hover={{ bg: "orange.50" }}
            />
          </HStack>
        </Flex>
        <FormControl>
          <FormLabel fontSize="sm" color="gray.700">
            Type your complaint
          </FormLabel>
          <Textarea
            height="200px"
            placeholder="Type your complaint"
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
        >
          Submit
        </Button>
      </VStack>
    </Box>
  );
};

export default RaiseDisputePage;
