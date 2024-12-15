import { useState } from "react";
import {
  Box,
  Button,
  Avatar,
  Text,
  HStack,
  VStack,
  IconButton,
  SimpleGrid,
  Icon,
} from "@chakra-ui/react";
import {
  FaEye,
  FaEyeSlash,
  FaMoneyBill,
  FaArrowDown,
  FaArrowUp,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useVendor } from "../../hooks/useVendor";
import LoadingSpinner from "../../../features/helpers/LoadingSpinner";

const VendorWallet = () => {
  const [showBalance, setShowBalance] = useState(false);
  const { user } = useAuth();
  const { transactionLogs, isLoading } = useVendor();
  const transactions = transactionLogs?.data?.data || [];

  const navigate = useNavigate();


  return (
    <Box
      px="50px"
      py="150px"
      h="100%"
      bg="linear-gradient(161.91deg, #FF5733 -17.77%, #FFF8F7 36.84%, #FFFFFF 91.46%)"
    >
      <HStack mb={6} spacing={4} py={2} alignItems="center">
        <Avatar name={`${user?.FirstName} ${user?.LastName}`} size={["md", "lg"]} />
        <VStack align="start" spacing={0}>
          <Text fontWeight="500" color="white" fontSize={["md", "lg"]}>
          {`${user?.FirstName} ${user?.LastName}`}
          </Text>
          <Text fontSize={["sm", "md"]} fontWeight="500" color="white">
            More sales today
          </Text>
        </VStack>
      </HStack>

      <SimpleGrid columns={[1, 1, 2]} alignItems="flex-start" spacing={[4, 6]} mb={6}>
        <Box>
          <Text fontSize={["lg", "xl", "36px"]} fontWeight="500" color="#1A1A1A">
          Wallets
          </Text>
          <Box
            p={8}
            bg="rgba(208, 85, 59, 1)"
            borderRadius="34px"
            height="200px"
            width="100%"
            maxW="400px"
          >
            <Box
              display="flex"
              gap="50px"
              flexDirection="row"
              alignItems="center"
            >
              <Text
                fontSize={["lg", "xl", "24px"]}
                fontWeight="500"
                color="white"
              >
                Available Balance
              </Text>

              <IconButton
                icon={showBalance ? <FaEyeSlash /> : <FaEye />}
                aria-label="Toggle Balance"
                onClick={() => setShowBalance(!showBalance)}
                bg="transparent"
                color="white"
                _hover={{ bg: "transparent" }}
                size={["sm", "34px"]}
              />
            </Box>
            <Text fontSize={["2xl", "46px"]} fontWeight="bold" color="white">
              {showBalance ? `₦${user?.wallet?.current_balance}` : "****"}
            </Text>
          </Box>
          <HStack spacing={4} mt={8} flexWrap="wrap">
            <Button
              leftIcon={<FaMoneyBill />}
              bg="#FF5733"
              color="white"
              size={["md", "lg"]}
              rounded="full"
              onClick={() => navigate("/vendor-withdraw")}
              width={["100%", "auto"]}
            >
              Withdraw Request
            </Button>
            {/* <Button
              leftIcon={<FaMoneyBill />}
              colorScheme="orange"
              size={["md", "lg"]}
              rounded="full"
              onClick={() => navigate("/vendor-request")}
              variant="outline"
              width={["100%", "auto"]}
            >
              Request
            </Button> */}
          </HStack>
        </Box>

        <Box>
          <HStack justify="space-between" p={4}>
            <Text fontSize={["md", "lg"]} fontWeight="bold">
              Recent Transactions
            </Text>
            <Button
              variant="link"
              onClick={() => navigate("/vendor-transcactions")}
              color="#FF5733"
            >
              See all
            </Button>
          </HStack>
         {isLoading ? <LoadingSpinner/> : 
          transactions?.length > 0 ? (
            <Box p={4} bg="white" borderRadius="md" boxShadow="md">
              {transactions?.slice(0, 10)?.map((trx:any) => (
                <HStack key={trx._id} mt={4} spacing={4}>
                  <Icon
                    as={trx.type === "DEBIT" ? FaArrowUp : FaArrowDown}
                    color={trx.type === "DEBIT" ? "red.500" : "green.500"}
                  />
                  <VStack align="start" spacing={0}>
                    <Text fontSize={["sm", "md"]} fontWeight="500">
                      {trx.narration}
                    </Text>
                    <Text fontSize="xs" fontWeight="500">
                      Reference: {trx.reference}
                    </Text>
                  </VStack>
                  <VStack align="end" spacing={0} ml="auto">
                    <Text fontSize={["sm", "md"]} fontWeight="500" color="green">
                      ₦{trx.amount}
                    </Text>
                    <Text fontSize="xs" fontWeight="500">
                      {new Date(trx.createdAt).toLocaleDateString()}
                    </Text>
                  </VStack>
                </HStack>
              ))}
            </Box>
          ) : (
            <Text>No transactions available.</Text>
          )
         }
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default VendorWallet;
