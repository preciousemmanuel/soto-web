import React from "react";
import { Button, Center, Text, VStack, Icon } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const SuccessMessage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Center minH="100vh" bg="white">
      <VStack spacing={6} p={6} maxW="400px" textAlign="center">
       
        <Icon as={CheckCircleIcon} w={16} h={16} color="green.400" />

        
        <Text fontSize="xl" fontWeight="bold" color="green.600">
          Products Upload successfully submitted
        </Text>

        
        <Text fontSize="md" color="gray.600">
          Your product will be published in 30 mins by Admin. If you encounter
          any issue, contact support.
        </Text>

        
        <Button
          colorScheme="blackAlpha"
          bg="black"
          color="white"
          size="lg"
          width="full"
          onClick={() => {
            navigate("/");
          }}
        >
          Back To Overview
        </Button>
      </VStack>
    </Center>
  );
};

export default SuccessMessage;
