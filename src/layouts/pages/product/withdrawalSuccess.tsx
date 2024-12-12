import React from "react";
import { Button, Center, Text, VStack, Icon } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const WithdrawalSuccessMessage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Center minH="100vh" bg="white">
      <VStack spacing={6} p={6} maxW="400px" textAlign="center">
       
        <Icon as={CheckCircleIcon} w={16} h={16} color="green.400" />

        
        <Text fontSize="xl" fontWeight="bold" color="green.600">
        Your withdrawal has been successfully submitted
        </Text>

        
        <Text fontSize="md" color="gray.600">
        Your withdrawal is on its way to your bank. If you encounter any issue, contact support 
        </Text>

        
        <Button
          colorScheme="blackAlpha"
          bg="black"
          color="white"
          size="lg"
          width="full"
          onClick={() => {
            navigate("/vendor-wallet");
          }}
        >
          Back To Wallet
        </Button>
      </VStack>
    </Center>
  );
};

export default WithdrawalSuccessMessage;
