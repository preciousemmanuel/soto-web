// TransactionsTable.js

import {
  Box,
  Text,
  Table,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
  Button,
} from "@chakra-ui/react";

interface Transaction {
  _id: string;
  reference: string;
  amount: number;
  user: string;
  type: "DEBIT" | "CREDIT";
  status: "SUCCESSFUL" | "PENDING" | "FAILED";
  currency: string;
  narration: string;
  narration_id: string;
  createdAt: string;
  updatedAt: string;
}

const VendorTransactions = ({
  transactions,
}: {
  transactions: Transaction[];
}) => {
  return (
    <Box
      bg="white"
      boxShadow="lg"
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      p={4}
      overflowX="auto"
      mt={6}
    >
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
          {transactions?.length === 0 ? (
            <Tr>
              <Td colSpan={6} textAlign="center">
                No transactions available
              </Td>
            </Tr>
          ) : (
            transactions?.map((transaction: Transaction) => (
              <Tr key={transaction?._id}>
                <Td>{transaction?.reference}</Td>
                <Td>{transaction?.narration}</Td>
                <Td>{new Date(transaction?.createdAt).toLocaleDateString()}</Td>
                <Td>
                  {transaction?.amount} {transaction?.currency}
                </Td>
                <Td
                  color={
                    transaction?.status === "SUCCESSFUL"
                      ? "green.500"
                      : transaction?.status === "PENDING"
                      ? "yellow.500"
                      : "red.500"
                  }
                >
                  {transaction?.status}
                </Td>
                {/* <Td>
                <Button size="sm">View</Button>
              </Td> */}
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
    </Box>
  );
};

export default VendorTransactions;
