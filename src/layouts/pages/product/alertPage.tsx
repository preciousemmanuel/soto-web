import React from "react";
import { Button, Center, Text, VStack, Icon } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const SuccessMessage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Center minH="100vh" bg="white">
      <VStack
        spacing={{ base: 4, md: 6 }}
        p={{ base: 4, md: 6 }}
        maxW={{ base: "90%", sm: "400px", md: "500px" }}
        textAlign="center"
      >
        <Icon
          as={CheckCircleIcon}
          w={{ base: 12, md: 16 }}
          h={{ base: 12, md: 16 }}
          color="green.400"
        />

        <Text
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="bold"
          color="green.600"
        >
          Products Upload successfully submitted
        </Text>

        <Text fontSize={{ base: "sm", md: "md" }} color="gray.600">
          Your product will be published in 30 mins by Admin. If you encounter
          any issue, contact support.
        </Text>

        <Button
          colorScheme="blackAlpha"
          bg="black"
          color="white"
          size={{ base: "md", md: "lg" }}
          width="full"
          onClick={() => {
            navigate("/vendor-overview");
          }}
        >
          Back To Overview
        </Button>
      </VStack>
    </Center>
  );
};

export default SuccessMessage;
