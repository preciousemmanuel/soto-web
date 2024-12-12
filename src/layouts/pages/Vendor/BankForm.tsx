import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  VStack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useVendor } from "../../hooks/useVendor";
import { useForm } from "react-hook-form";



 const BankForm = ({setShowAddBank}: {setShowAddBank: (show: boolean) => void}) => {
    const [showBankList, setShowBankList] = useState(false);
    const { banks, setSearch,search, isLoadingBanks, useAddMyBankDetails,refetchMyBankDetails } = useVendor();
    const { mutate: addBankDetails, isPending,isSuccess } = useAddMyBankDetails;
  
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
  
    const handleBankSearch = (value: string) => {
      setSearch(value);
      setShowBankList(true);
    };
  
    const handleBankSelect = (bankId: string, bankName: string) => {
      setValue("bank_id", bankId);
      setSearch(bankName)
      setShowBankList(false);
    };
  
    const onSubmit = (data: { account_number: string; bank_id: string }) => {
      addBankDetails(data);
    };

    useEffect(() => {
        refetchMyBankDetails()
        if(isSuccess){
            setShowAddBank(false);
        }
    }, [isSuccess])
    
  
    return (
      <Box bg="white">
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4} align="stretch">
            <FormControl isInvalid={!!errors.account_number}>
              <FormLabel fontSize="sm" color="gray.600">
                Account number
              </FormLabel>
              <Input
                {...register("account_number", { required: true })}
                type="text"
                placeholder="Enter account"
                bg="gray.100"
                border="none"
                fontSize="sm"
                h="50px"
              />
            </FormControl>
  
            <FormControl position="relative">
              <FormLabel fontSize="sm" color="gray.600">
                Bank Name
              </FormLabel>
              <Input
                bg="gray.100"
                border="none"
                fontSize="sm"
                value={search}
                h="50px"
                onChange={(e) => handleBankSearch(e.target.value)}
                placeholder="Search for bank"
                _focus={{ bg: "white", outline: "none", border: "1px solid #FF5733" }}
              />
  
              {showBankList && banks?.data && (
                <Box
                  position="absolute"
                  top="100%"
                  left={0}
                  right={0}
                  bg="white"
                  boxShadow="md"
                  borderRadius="md"
                  maxH="200px"
                  overflowY="auto"
                  zIndex={1000}
                >
                  {isLoadingBanks ? (
                    <Box p={2}>Loading...</Box>
                  ) : (
                    Array.isArray(banks.data.data) ? (
                      banks?.data.data?.map((bank: { name: string; _id: string }, index: number) => (
                        <Box
                          key={index}
                          p={2}
                          cursor="pointer"
                          _hover={{ bg: "gray.100" }}
                          onClick={() => handleBankSelect(bank?._id, bank?.name)}
                        >
                          {bank?.name}
                        </Box>
                      ))
                    ) : (
                      <Box p={2}>No banks found</Box>
                    )
                  )}
                </Box>
              )}
            </FormControl>
  
            <Button
              type="submit"
              bgColor="#FF5733"
              size="lg"
              color="white"
              w="100%"
              _hover={{ bg: "#FF5733" }}
              isLoading={isPending}
              loadingText="Proceeding..."
            >
              Proceed
            </Button>
          </VStack>
        </form>
      </Box>
    );
  };

  export default BankForm