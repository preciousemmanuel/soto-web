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
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const [showAddBank, setShowAddBank] = useState(false);
  const { myBankDetails, isLoadingMyBankDetails, useMakeWithdrawalRequest } =
    useVendor();

  const {
    mutate: makeWithdrawal,
    isPending,
    isSuccess,
  } = useMakeWithdrawalRequest;

  function handleAddBankInput() {
    setShowAddBank(true);
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
      bank_details_id: selectedBank._id,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/withdrawal-success");
    }
  }, [isSuccess]);

  // const charge = Math.round((Number(amount) || 0) * 0.1);

  return (
    <Grid
      templateColumns={{ base: "1fr", md: "1fr 1fr" }}
      gap={{ base: 4, md: 8 }}
      h="100%"
      px={{ base: 4, md: 8 }}
    >
      <Box
        bg="white"
        px={{ base: 4, sm: 8, md: 12, lg: 20, xl: 120 }}
        h={{ base: "auto", md: "100vh" }}
        py={{ base: 8, md: 100 }}
      >
        <Text
          fontSize={{ base: "xl", md: "24px" }}
          fontWeight="bold"
          color="#00000"
          my={{ base: 4, md: 8 }}
        >
          Withdraw to bank
        </Text>
        <Box
          p={{ base: 4, md: 16 }}
          borderWidth="1px"
          borderColor="#9F9F9F"
          borderRadius="2xl"
          w="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          h={{ base: "200px", md: "280px" }}
        >
          <Box mt={{ base: 2, md: 4 }}>
            <Text fontSize={{ base: "xs", md: "sm" }} mb={2}>
              Enter Amount
            </Text>
            <Input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fontSize={{ base: "4xl", md: "6xl" }}
              fontWeight="bold"
              color="#FF5733"
              textAlign="center"
              inputMode="numeric"
              border="none"
              py={{ base: 6, md: 12 }}
            />
          </Box>
          <Text
            mt={{ base: 2, md: 4 }}
            fontSize={{ base: "2xs", md: "xs" }}
            color="gray.600"
          >
            The above amount will be deducted from your wallet with a 10% charge
            automatically applied.
          </Text>
        </Box>
        {!showAddBank ? (
          <Box mt={{ base: 4, md: 4 }}>
            <Button
              color="white"
              bgColor="#FF5733"
              size={{ base: "md", md: "lg" }}
              w="100%"
              _hover={{ bg: "#FF5733" }}
              onClick={handleContinue}
              isDisabled={!amount || !selectedAccount}
              isLoading={isPending}
              loadingText="Processing..."
            >
              Continue
            </Button>
          </Box>
        ) : (
          <Box mt={{ base: 4, md: 4 }}>
            <BankForm setShowAddBank={setShowAddBank} />
          </Box>
        )}
      </Box>

      <Box
        bg="#FFF2ED"
        px={{ base: 4, sm: 8, md: 12, lg: 20 }}
        py={{ base: 8, md: 40 }}
        h={{ base: "auto", md: "100vh" }}
      >
        <Text
          fontSize={{ base: "md", md: "lg" }}
          fontWeight="bold"
          color="#00000"
          mb={{ base: 2, md: 4 }}
        >
          Choose Account
        </Text>
        {isLoadingMyBankDetails ? (
          <Text>Loading bank details...</Text>
        ) : (
          <RadioGroup onChange={setSelectedAccount} value={selectedAccount}>
            <Stack spacing={{ base: 2, md: 4 }}>
              {myBankDetails?.data?.slice(0, 3).map((bank: any) => (
                <Box
                  key={bank.account_number}
                  p={{ base: 2, md: 4 }}
                  border="1px solid"
                  borderColor={
                    selectedAccount === bank.account_number
                      ? "#E6C7C033"
                      : "#FFF2ED"
                  }
                  borderRadius="md"
                  bg={
                    selectedAccount === bank.account_number
                      ? "#E6C7C033"
                      : "#FFF2ED"
                  }
                >
                  <Radio
                    value={bank?.account_number}
                    _checked={{ bg: "#FF5733", fontSize: "14px" }}
                  >
                    <Text fontWeight="bold">{bank.account_name}</Text>
                    <Text fontSize={{ base: "xs", md: "sm" }} color="gray.600">
                      {bank?.account_number} - {bank?.bank?.name}
                    </Text>
                  </Radio>
                </Box>
              ))}
            </Stack>
          </RadioGroup>
        )}
        <Box my={{ base: 4, md: 8 }}>
          <Button
            color="white"
            bgColor="#FF5733"
            size={{ base: "md", md: "lg" }}
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
