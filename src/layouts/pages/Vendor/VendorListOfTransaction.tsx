import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  HStack,
  IconButton,
  useBreakpointValue,
  Avatar,
  VStack,
} from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useVendor } from "../../hooks/useVendor";
import { useAuth } from "../../hooks/useAuth";
import LoadingSpinner from "../../../features/helpers/LoadingSpinner";
import PaginationControls from "../../../features/helpers/Pagination";
import { useEffect } from "react";

const VendorListOfTransaction = () => {
  const navigate = useNavigate();
  const {
    transactionLogs,
    isLoading,
    transactionLogsPagination,
    handlePageChange,
  } = useVendor();
  const { user } = useAuth();
  const transactions = transactionLogs?.data?.data || [];
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box
      px="20px"
      py="150px"
      h="100vh"
      bg="linear-gradient(161.91deg, #FF5733 -17.77%, #FFF8F7 36.84%, #FFFFFF 91.46%)"
    >
      <IconButton
        icon={<FaArrowLeft />}
        aria-label="Back"
        onClick={() => navigate(-1)}
        variant="ghost"
        size={useBreakpointValue({ base: "sm", md: "md" })}
      />
      <Box mx="70px">
        <HStack mb={6} spacing={4} py={2} alignItems="center">
          <Avatar
            name={`${user?.FirstName} ${user?.LastName}`}
            size={["md", "lg"]}
          />
          <VStack align="start" spacing={0}>
            <Text fontWeight="500" color="white" fontSize={["md", "lg"]}>
              {`${user?.FirstName} ${user?.LastName}`}
            </Text>
            <Text fontSize={["sm", "md"]} fontWeight="500" color="white">
              More sales today
            </Text>
          </VStack>
        </HStack>
        <HStack spacing={2} my={8}>
          <Text fontSize={["27px", "xl"]} fontWeight="500">
            All Transactions
          </Text>
        </HStack>
      </Box>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Box
          borderRadius="md"
          boxShadow="md"
          overflowX="auto"
          bg="white"
          p={4}
          mx="70px"
        >
          <Table
            variant="simple"
            size={useBreakpointValue({ base: "sm", md: "md" })}
          >
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
              {transactions?.map((trx: any) => (
                <Tr key={trx?._id}>
                  <Td>{trx?.reference}</Td>
                  <Td>{trx?.narration}</Td>
                  <Td>{new Date(trx?.createdAt).toLocaleDateString()}</Td>
                  <Td>{`${trx?.currency} ${(
                    trx?.amount / 100
                  ).toLocaleString()}`}</Td>
                  <Td
                    color={
                      trx?.status === "SUCCESSFUL"
                        ? "green.500"
                        : trx?.status === "PENDING"
                        ? "orange.500"
                        : "red.500"
                    }
                  >
                    {trx?.status}
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
          <Box px={4} pt={8}>
            <PaginationControls
              currentPage={transactionLogsPagination.currentPage}
              totalPages={transactionLogsPagination.totalPages}
              onPageChange={handlePageChange}
              hasNextPage={transactionLogsPagination.hasNextPage}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default VendorListOfTransaction;
