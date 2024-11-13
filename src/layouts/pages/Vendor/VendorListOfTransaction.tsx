import { Box, Button, Table, Thead, Tbody, Tr, Th, Td, Text, HStack, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const VendorListOfTransaction = () => {
  const navigate = useNavigate();

  const transactions = [
    { id: "001", title: "Order Payment", date: "2024-11-01", amount: "$250.00", status: "Completed" },
    { id: "002", title: "Withdrawal", date: "2024-11-02", amount: "$150.00", status: "Pending" },
    { id: "003", title: "Refund", date: "2024-11-03", amount: "$50.00", status: "Failed" },
    { id: "004", title: "Order Payment", date: "2024-11-04", amount: "$300.00", status: "Completed" },
    { id: "005", title: "Withdrawal", date: "2024-11-05", amount: "$200.00", status: "Completed" },
  ];

  return (
    <Box p={[4, 6]} maxW="container.lg" mx="auto"  mt={32}
    bg="linear-gradient(161.91deg, #FF5733 -17.77%, #FFF8F7 36.84%, #FFFFFF 91.46%)" 
    >
      {/* Back Button */}
      <HStack spacing={2} mb={4}>
        <IconButton
          icon={<FaArrowLeft />}
          aria-label="Back"
          onClick={() => navigate(-1)}
          variant="ghost"
          size={useBreakpointValue({ base: "sm", md: "md" })}
        />
        <Text fontSize={["27px", "xl"]} fontWeight="500">Transactions</Text>
      </HStack>

      {/* Transactions Table */}
      <Box
        borderRadius="md"
        boxShadow="md"
        overflowX="auto"
        bg="white"
        p={4}
      >
        <Table variant="simple" size={useBreakpointValue({ base: "sm", md: "md" })}>
          <Thead>
            <Tr>
              <Th>Payment ID</Th>
              <Th>Title</Th>
              <Th>Trx. Date</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((trx) => (
              <Tr key={trx.id}>
                <Td>{trx.id}</Td>
                <Td>{trx.title}</Td>
                <Td>{trx.date}</Td>
                <Td>{trx.amount}</Td>
                <Td color={trx.status === "Completed" ? "green.500" : trx.status === "Pending" ? "orange.500" : "red.500"}>
                  {trx.status}
                </Td>
                <Td>
                  <Button size="sm" colorScheme="teal" variant="outline">
                    View
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default VendorListOfTransaction;
