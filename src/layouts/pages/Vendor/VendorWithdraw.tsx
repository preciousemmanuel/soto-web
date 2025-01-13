import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Input,
  Text,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { useVendor } from "../../hooks/useVendor";
import BankForm from "./BankForm";
import { useNavigate } from "react-router-dom";

const VendorWithdraw = () => {
  const navigate = useNavigate()
  const [amount, setAmount] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [showAddBank, setShowAddBank] = useState(false);
  const { 
    myBankDetails, 
    isLoadingMyBankDetails,
    useMakeWithdrawalRequest 
  } = useVendor();

  const { mutate: makeWithdrawal, isPending,isSuccess } = useMakeWithdrawalRequest;

  function handleAddBankInput () {
      setShowAddBank(true)
  }

  // const handleMax = () => {
  //   setAmount("34123");
  // };

  const handleContinue = () => {
    const selectedBank = myBankDetails?.data?.find(
      (bank: any) => bank.account_number === selectedAccount
    );

    if (!selectedBank || !amount) {
      return;
    }

    makeWithdrawal({
      amount: Number(amount),
      bank_details_id: selectedBank._id
    });
  };

  useEffect(() => {
   if(isSuccess) {
    navigate("/withdrawal-success")
   }
  }, [isSuccess])
  

  // const charge = Math.round((Number(amount) || 0) * 0.1);

  return (
    <Grid
      templateColumns={{ base: "1fr", md: "1fr 1fr" }}
      gap={8}
      // px={8}
      h="100%"
    >
      <Box bg="white" px={120} h="100vh" py="100px">
        <Text fontSize="24px" fontWeight="bold" color="#00000" my={8}>
          Withdraw to bank
        </Text>
        <Box
          p={16}
          borderWidth="1px"
          borderColor="#9F9F9F"
          borderRadius="2xl"
          w="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          h="280px"
        >
          <Box mt={4}>
            <Text fontSize="sm" mb={2}>
              Enter Amount
            </Text>
            <Input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fontSize="6xl"
              fontWeight="bold"
              color="#FF5733"
              textAlign="center"
              inputMode="numeric"
              border="none"
              py={12}
            />
            {/* <Text mt={2} fontSize="sm" color="gray.500">
              Charges: {charge || 0}
            </Text> */}
          </Box>
          <Text mt={4} fontSize="xs" color="gray.600">
            The above amount will be deducted from your wallet with a 10% charge
            automatically applied.
          </Text>
        </Box>
      {!showAddBank ? <Box mt={4}>
       {/* <Flex
          justify="space-between"
          w="100%"
          align="center"
          bg="#FFE8E3"
          h={12}
          px={4}
          my={4}
          borderRadius="10px"
        >
          <Text fontSize="sm" fontWeight="semibold" color="#FF5733">
            Bal. N34,123
          </Text>
          <Button
            size="sm"
            color="#FF5733"
            fontWeight="semibold"
            variant="outline"
            _hover={{ bg: "#FFE8E3" }}
            onClick={handleMax}
          >
            Use Max
          </Button>
        </Flex> */}
        <Button
          color="white"
          bgColor="#FF5733"
          size="lg"
          w="100%"
          _hover={{ bg: "#FF5733" }}
          onClick={handleContinue}
          isDisabled={!amount || !selectedAccount}
          isLoading={isPending}
          loadingText="Processing..."
        >
          Continue
        </Button>
       </Box> :
       <Box mt={4}>
        <BankForm setShowAddBank={setShowAddBank}/>
       </Box>}
      </Box>

      <Box bg="#FFF2ED" px={20} py={40} h="100vh">
        <Text fontSize="lg" fontWeight="bold" color="#00000" mb={4}>
          Choose Account
        </Text>
        {isLoadingMyBankDetails ? (
          <Text>Loading bank details...</Text>
        ) : (
          <RadioGroup onChange={setSelectedAccount} value={selectedAccount}>
            <Stack spacing={4}>
              {myBankDetails?.data?.slice(0, 3).map((bank: any) => (
                <Box
                  key={bank.account_number}
                  p={4}
                  border="1px solid"
                  borderColor={
                    selectedAccount === bank.account_number ? "#E6C7C033" : "#FFF2ED"
                  }
                  borderRadius="md"
                  bg={selectedAccount === bank.account_number ? "#E6C7C033" : "#FFF2ED"}
                >
                  <Radio 
                    value={bank?.account_number} 
                    _checked={{ bg: "#FF5733", fontSize: "14px" }}
                  >
                    <Text fontWeight="bold">{bank.account_name}</Text>
                    <Text fontSize="sm" color="gray.600">
                      {bank?.account_number} - {bank?.bank?.name}
                    </Text>
                  </Radio>
                </Box>
              ))}
            </Stack>
          </RadioGroup>
        )}
        <Box my={8}>
          <Button
            color="white"
            bgColor="#FF5733"
            size="lg"
            w="100%"
            _hover={{ bg: "#FF5733" }}
            onClick={handleAddBankInput}
          >
            Add bank account
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default VendorWithdraw;





