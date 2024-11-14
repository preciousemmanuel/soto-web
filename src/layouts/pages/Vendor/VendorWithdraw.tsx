import React, { useState } from "react";
import { Box, Text, Input, VStack, Button, Divider, Select, HStack, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const VendorWithdraw = () => {
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleContinue = () => {
    setShowAccountDetails(true);
  };

  const handleProceed = () => {
    // Show success message and redirect after a short delay
    toast({
      title: "Withdrawal Successful",
      description: "Your request is being processed",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setTimeout(() => {
      navigate("/vendor-wallet"); // Redirects back to the wallet after a few seconds
    }, 3000);
  };

  return (
    <Box p={[4, 6]} maxW="1200px" mx="auto" mt={32} bg="gray.50" borderRadius="md" boxShadow="lg">
      <HStack align="start" spacing={6} flexWrap="wrap">
        
        {/* First Box: Withdraw to Bank */}
        <Box p={6} bg="white" borderRadius="md" boxShadow="md" flex="1" minW="300px">
          <Text fontSize="xl" fontWeight="bold" mb={4}>Withdraw to Bank</Text>
          
          {/* Enter Amount Section */}
          <Box p={4} bg="gray.100" borderRadius="md" mb={4}>
            <Text fontWeight="bold">Enter Amount</Text>
            <Input
              type="number"
              placeholder="Enter amount"
              bg="transparent"
              mt={2}
              variant="filled"
              _focus={{ bg: "white" }}
            />
            <Text fontSize="sm" color="gray.500" mt={2}>
              This amount will be deducted from your wallet with a 10% charge automatically applied.
            </Text>
          </Box>

          {/* Balance and Continue Button */}
          {!showAccountDetails && (
            <>
              <Text fontWeight="bold" fontSize="lg" mt={4}>Bal: $5,000.00</Text>
              <Button mt={4} colorScheme="orange" onClick={handleContinue}>
                Continue
              </Button>
            </>
          )}
        </Box>

        {/* Second Box: Account Details */}
        {showAccountDetails && (
          <Box p={6} bg="gray.100" borderRadius="md" boxShadow="md" flex="1" minW="300px">
            <Text fontSize="lg" fontWeight="bold" mb={4}>Choose Account</Text>

            {/* Account Number and Bank Name */}
            <VStack align="start" spacing={3}>
              <Text fontWeight="bold">Account Number</Text>
              <Input placeholder="Enter account number" variant="filled" />

              <Text fontWeight="bold">Bank Name</Text>
              <Select placeholder="Select bank" variant="filled">
                <option value="bank1">Bank 1</option>
                <option value="bank2">Bank 2</option>
                <option value="bank3">Bank 3</option>
              </Select>
            </VStack>

            {/* Proceed Button */}
            <Button mt={6} colorScheme="orange" onClick={handleProceed} width="full">
              Proceed
            </Button>
          </Box>
        )}
      </HStack>
    </Box>
  );
};

export default VendorWithdraw;
