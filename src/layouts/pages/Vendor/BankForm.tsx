import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  FormControl,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { useVendor } from "../../hooks/useVendor";
import { useForm } from "react-hook-form";

const BankForm = ({
  setShowAddBank,
}: {
  setShowAddBank: (show: boolean) => void;
}) => {
  const {
    banks,
    setSearch,
    search,
    isLoadingBanks,
    useAddMyBankDetails,
    refetchMyBankDetails,
  } = useVendor();
  const { mutate: addBankDetails, isPending, isSuccess } = useAddMyBankDetails;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      account_number: "",
      bank_id: "",
    },
  });

  const handleBankSelect = (bankId: string, bankName: string) => {
    setValue("bank_id", bankId);
    setSearch(bankName);
  };

  const onSubmit = (data: { account_number: string; bank_id: string }) => {
    addBankDetails(data);
  };

  useEffect(() => {
    refetchMyBankDetails();
    if (isSuccess) {
      setShowAddBank(false);
    }
  }, [isSuccess]);

  return (
    <Box bg="white" p={{ base: 4, md: 6, lg: 8 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={{ base: 3, md: 4, lg: 5 }} align="stretch">
          <FormControl isInvalid={!!errors.account_number}>
            <FormLabel fontSize={{ base: "sm", md: "md" }} color="gray.600">
              Account number
            </FormLabel>
            <Input
              {...register("account_number", { required: true })}
              type="text"
              placeholder="Enter account"
              bg="gray.100"
              border="none"
              fontSize={{ base: "sm", md: "md" }}
              h={{ base: "40px", md: "50px", lg: "60px" }}
              p={{ base: 2, md: 3 }}
            />
          </FormControl>

          <FormControl position="relative">
            <FormLabel fontSize={{ base: "sm", md: "md" }} color="gray.600">
              Bank Name
            </FormLabel>
            <Select
              bg="gray.100"
              border="none"
              fontSize={{ base: "sm", md: "md" }}
              value={search}
              h={{ base: "40px", md: "50px", lg: "60px" }}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                const selectedBank = banks?.data?.data.find(
                  (bank: { _id: string }) => bank._id === e.target.value
                );
                handleBankSelect(e.target.value, selectedBank?.name || "");
              }}
              placeholder="Select a bank"
              _focus={{
                bg: "white",
                outline: "none",
                border: "1px solid #FF5733",
              }}
              p={{ base: 2, md: 3 }}
            >
              {isLoadingBanks ? (
                <option>Loading...</option>
              ) : Array.isArray(banks?.data?.data) ? (
                banks?.data?.data.map((bank: { name: string; _id: string }) => (
                  <option key={bank?._id} value={bank?._id}>
                    {bank?.name}
                  </option>
                ))
              ) : (
                <option>No banks found</option>
              )}
            </Select>
          </FormControl>

          <Button
            type="submit"
            bgColor="#FF5733"
            size={{ base: "md", md: "lg" }}
            color="white"
            w="100%"
            _hover={{ bg: "#FF5733" }}
            isLoading={isPending}
            loadingText="Proceeding..."
            mt={{ base: 2, md: 4 }}
            py={{ base: 3, md: 4 }}
            fontSize={{ base: "sm", md: "md" }}
          >
            Proceed
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default BankForm;
