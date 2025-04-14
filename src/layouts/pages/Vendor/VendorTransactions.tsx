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
import PaginationControls from "../../../features/helpers/Pagination";
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

interface VendorTransactionsProps {
  transactions: Transaction[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasNextPage: boolean;
}

const VendorTransactions = ({
  transactions,
  currentPage,
  totalPages,
  onPageChange,
  hasNextPage,
}: VendorTransactionsProps) => {
  return (
    <Box
      bg="white"
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      p={{ base: 2, md: 4 }}
      overflowX="auto"
      mt={{ base: 4, md: 6 }}
      mx={{ base: 2, md: 0 }}
    >
      <Text
        fontSize={{ base: "md", md: "lg" }}
        fontWeight="500"
        mb={{ base: 2, md: 4 }}
      >
        Recent Transactions
      </Text>
      <Table variant="simple" size={{ base: "xs", sm: "sm", md: "md" }}>
        <Thead>
          <Tr>
            <Th fontSize={{ base: "xs", sm: "sm", md: "md" }}>Payment ID</Th>
            <Th fontSize={{ base: "xs", sm: "sm", md: "md" }}>Title</Th>
            <Th fontSize={{ base: "xs", sm: "sm", md: "md" }}>Trx. Date</Th>
            <Th fontSize={{ base: "xs", sm: "sm", md: "md" }}>Amount</Th>
            <Th fontSize={{ base: "xs", sm: "sm", md: "md" }}>Status</Th>
            {/* <Th fontSize={{ base: "xs", sm: "sm", md: "md" }}>Action</Th> */}
          </Tr>
        </Thead>
        <Tbody>
          {transactions?.length === 0 ? (
            <Tr>
              <Td
                colSpan={6}
                textAlign="center"
                fontSize={{ base: "xs", sm: "sm", md: "md" }}
              >
                No transactions available
              </Td>
            </Tr>
          ) : (
            transactions?.map((transaction: Transaction) => (
              <Tr key={transaction?._id}>
                <Td fontSize={{ base: "xs", sm: "sm", md: "md" }}>
                  {transaction?.reference}
                </Td>
                <Td fontSize={{ base: "xs", sm: "sm", md: "md" }}>
                  {transaction?.narration}
                </Td>
                <Td fontSize={{ base: "xs", sm: "sm", md: "md" }}>
                  {new Date(transaction?.createdAt).toLocaleDateString()}
                </Td>
                <Td fontSize={{ base: "xs", sm: "sm", md: "md" }}>
                  {transaction?.amount} {transaction?.currency}
                </Td>
                <Td
                  fontSize={{ base: "xs", sm: "sm", md: "md" }}
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
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      <Box px={{ base: 2, md: 4 }} pt={{ base: 4, md: 8 }}>
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          hasNextPage={hasNextPage}
        />
      </Box>
    </Box>
  );
};

export default VendorTransactions;
