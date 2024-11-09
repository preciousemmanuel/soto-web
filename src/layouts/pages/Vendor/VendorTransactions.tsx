// TransactionsTable.js

import { Box, Text, Table, Thead, Th, Tr, Tbody, Td, Button } from "@chakra-ui/react";

const VendorTransactions = ({ transactions }) => {
  return (
    <Box bg="white" boxShadow="lg" border="1px" borderColor="gray.200" borderRadius="md" p={4} overflowX="auto" mt={6}>
      <Text fontSize="lg" fontWeight="500" mb={4}>
        Recent Transactions
      </Text>
      <Table variant="simple" size="sm">
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
          {transactions.map((transaction) => (
            <Tr key={transaction.id}>
              <Td>{transaction.id}</Td>
              <Td>{transaction.title}</Td>
              <Td>{transaction.date}</Td>
              <Td>{transaction.amount}</Td>
              <Td color={transaction.status === "Completed" ? "green.500" : transaction.status === "Pending" ? "yellow.500" : "red.500"}>
                {transaction.status}
              </Td>
              <Td>
                <Button size="sm">View</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default VendorTransactions;
