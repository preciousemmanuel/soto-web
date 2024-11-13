import { useState } from "react";
import { Box, Button, Avatar, Text, HStack, VStack, IconButton, SimpleGrid, Icon } from "@chakra-ui/react";
import { FaEye, FaEyeSlash, FaMoneyBill, FaArrowDown, FaArrowUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const VendorWallet = () => {
  const [showBalance, setShowBalance] = useState(false);
  const navigate = useNavigate();

  const transactions = [
    { id: "001", title: "Order Payment", date: "2024-11-01", amount: "$250.00", type: "income" },
    { id: "002", title: "Withdrawal", date: "2024-11-02", amount: "$150.00", type: "expense" }
  ];

  return (
    <Box 
      p={[4, 6]} 
      py={12} 
      px={[4, 6, 12]} 
      mt={[16, 24, 32]} 
      bg="linear-gradient(161.91deg, #FF5733 -17.77%, #FFF8F7 36.84%, #FFFFFF 91.46%)"
    >
      {/* User Info */}
      <HStack mb={6} spacing={4} py={8} alignItems="center">
        <Avatar name="John Doe" size={["md", "lg"]} />
        <VStack align="start" spacing={0}>
          <Text fontWeight="500" color="white" fontSize={["md", "lg"]}>John Doe</Text>
          <Text fontSize={["sm", "md"]} fontWeight="500" color="white">More sales today</Text>
        </VStack>
      </HStack>

      {/* Wallet and Actions */}
      <SimpleGrid columns={[1, 1, 2]} spacing={[4, 6]} mb={6}>
        <Box>
          <Box 
            p={4} 
            bg="rgba(208, 85, 59, 1)" 
            borderRadius="md" 
            boxShadow="md" 
            height="auto" 
            width="100%" 
            maxW="458px"
          >
            <Text fontSize={["lg", "xl", "25px"]} fontWeight="500" color="white" mb={4}>Wallet</Text>
            <HStack>
              <Text fontSize={["2xl", "33px"]} fontWeight="bold" color="white">
                {showBalance ? "$10,000.00" : "****"}
              </Text>
              <IconButton
                icon={showBalance ? <FaEyeSlash /> : <FaEye />}
                aria-label="Toggle Balance"
                onClick={() => setShowBalance(!showBalance)}
                bg="transparent"
                color="white"
                _hover={{ bg: "transparent" }}
                size={["sm", "md"]}
              />
            </HStack>
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
              Withdraw
            </Button>
            <Button
              leftIcon={<FaMoneyBill />}
              colorScheme="orange"
              size={["md", "lg"]}
              rounded="full"
              onClick={() => navigate("/vendor-request")}
              variant="outline"
              width={["100%", "auto"]}
            >
              Request
            </Button>
          </HStack>
        </Box>

        {/* Recent Transactions */}
        <Box>
          <HStack justify="space-between" p={4}>
            <Text fontSize={["md", "lg"]} fontWeight="bold">Recent Transactions</Text>
            <Button variant="link" onClick={() => navigate("/vendor-transcactions")} color="#FF5733">
              See all
            </Button>
          </HStack>
          <Box p={4} bg="white" borderRadius="md" boxShadow="md">
            {transactions.map(trx => (
              <HStack key={trx.id} mt={4} spacing={4}>
                <Icon as={trx.type === "income" ? FaArrowDown : FaArrowUp} color={trx.type === "income" ? "green.500" : "red.500"} />
                <VStack align="start" spacing={0}>
                  <Text fontSize={["sm", "md"]} fontWeight="500">{trx.title}</Text>
                  <Text fontSize="xs" fontWeight="500">ID: {trx.id}</Text>
                </VStack>
                <VStack align="end" spacing={0} ml="auto">
                  <Text fontSize={["sm", "md"]} fontWeight="500" color="green">{trx.amount}</Text>
                  <Text fontSize="xs" fontWeight="500">{trx.date}</Text>
                </VStack>
              </HStack>
            ))}
          </Box>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default VendorWallet;
