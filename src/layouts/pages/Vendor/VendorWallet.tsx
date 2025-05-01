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
  Badge,
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

  // console.log(transactions,"transactions")
  const navigate = useNavigate();

  return (
    <Box
      px={{ base: 4, sm: 6, md: 8, lg: 12, xl: 20 }}
      py={{ base: 20, sm: 20, md: 20, lg: 40}}
      h="100%"
      bg="linear-gradient(161.91deg, #FF5733 -17.77%, #FFF8F7 36.84%, #FFFFFF 91.46%)"
    >
      <HStack
        mb={{ base: 4, md: 6 }}
        spacing={{ base: 2, md: 4 }}
        py={2}
        alignItems="center"
      >
        <Avatar
          name={`${user?.FirstName} ${user?.LastName}`}
          size={{ base: "sm", sm: "md", md: "lg" }}
        />
        <VStack align="start" spacing={0}>
          <Text
            fontWeight="500"
            color="white"
            fontSize={{ base: "sm", sm: "md", md: "lg" }}
          >
            {`${user?.FirstName} ${user?.LastName}`}
          </Text>
          <Text
            fontSize={{ base: "xs", sm: "sm", md: "md" }}
            fontWeight="500"
            color="white"
          >
            More sales today
          </Text>
        </VStack>
      </HStack>

      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        alignItems="flex-start"
        spacing={{ base: 4, md: 6 }}
        mb={6}
      >
        <Box>
          <Text
            fontSize={{ base: "md", sm: "lg", md: "xl", lg: "2xl" }}
            fontWeight="500"
            color="#1A1A1A"
          >
            Wallets
          </Text>
          <Box
            p={{ base: 4, sm: 6, md: 8 }}
            bg="rgba(208, 85, 59, 1)"
            borderRadius="34px"
            height={{ base: "150px", sm: "180px", md: "200px" }}
            width="100%"
            maxW="400px"
          >
            <Box
              display="flex"
              gap={{ base: 4, sm: 6, md: 8 }}
              flexDirection="row"
              alignItems="center"
            >
              <Text
                fontSize={{ base: "md", sm: "lg", md: "xl" }}
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
                size={{ base: "sm", sm: "md", md: "lg" }}
              />
            </Box>
            <Text
              fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
              fontWeight="bold"
              color="white"
            >
              {showBalance ? `₦${user?.wallet?.current_balance}` : "****"}
            </Text>
          </Box>
          <HStack
            spacing={{ base: 2, md: 4 }}
            mt={{ base: 4, md: 8 }}
            flexWrap="wrap"
          >
            <Button
              leftIcon={<FaMoneyBill />}
              bg="#FF5733"
              color="white"
              size={{ base: "md", sm: "md", md: "lg" }}
              rounded="full"
              onClick={() => navigate("/vendor-withdraw")}
              width={{ base: "100%", sm: "auto" }}
            >
              Withdraw Request
            </Button>
          </HStack>
        </Box>

        <Box mt={{ base: 6, md: 0 }}>
          <HStack justify="space-between" p={{ base: 2, md: 4 }}>
            <Text
              fontSize={{ base: "sm", sm: "md", md: "lg" }}
              fontWeight="bold"
            >
              Recent Transactions
            </Text>
            <Button
              variant="link"
              onClick={() => navigate("/vendor-transcactions")}
              color="#FF5733"
              fontSize={{ base: "sm", sm: "md" }}
            >
              See all
            </Button>
          </HStack>
          {isLoading ? (
            <LoadingSpinner />
          ) : transactions?.length > 0 ? (
            <Box
              p={{ base: 4, md: 4 }}
              bg="white"
              borderRadius="md"
              boxShadow="md"
              height="100%"
            >
              {transactions?.slice(0, 10)?.map((trx: any) => (
                <HStack
                  key={trx._id}
                  mt={{ base: 2, md: 4 }}
                  spacing={{ base: 2, md: 4 }}
                >
                  <Icon
                    as={trx.type === "DEBIT" ? FaArrowUp : FaArrowDown}
                    color={trx.type === "DEBIT" ? "red.500" : "green.500"}
                    boxSize={{ base: 4, sm: 5 }}
                  />
                  <VStack align="start" spacing={0}>
                    <Text
                      fontSize={{ base: "xs", sm: "sm", md: "md" }}
                      fontWeight="500"
                    >
                      {trx.narration}
                    </Text>
                    <Text fontSize="xs" fontWeight="500">
                      Reference: {trx.reference}
                    </Text>
                    <Badge
                      colorScheme={
                        trx.status === "PENDING" ? "yellow" :
                        trx.status === "SUCCESSFUL" ? "green" :
                        trx.status === "FAILED" ? "red" : "gray"
                      }
                      fontSize="xs"
                      mt={1}
                    >
                      {trx.status}
                    </Badge>
                  </VStack>
                  <VStack align="end" spacing={0} ml="auto">
                    <Text
                      fontSize={{ base: "xs", sm: "sm", md: "md" }}
                      fontWeight="500"
                      color={trx.type === "DEBIT" ? "red.500" : "green.500"}
                    >
                      {trx.type === "DEBIT" ? "-" : "+"}₦{trx.amount}
                    </Text>
                    <Text fontSize="xs" fontWeight="500">
                      {new Date(trx.createdAt).toLocaleDateString()}
                    </Text>
                  </VStack>
                </HStack>
              ))}
            </Box>
          ) : (
            <Text fontSize={{ base: "sm", md: "md" }}>
              No transactions available.
            </Text>
          )}
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default VendorWallet;
