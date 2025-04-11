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
      px={{ base: 4, md: 6, lg: 8 }}
      py={{ base: 20, md: 32, lg: 40 }}
      minH="100vh"
      bg="linear-gradient(161.91deg, #FF5733 -17.77%, #FFF8F7 36.84%, #FFFFFF 91.46%)"
    >
      <IconButton
        icon={<FaArrowLeft />}
        aria-label="Back"
        onClick={() => navigate(-1)}
        variant="ghost"
        size={useBreakpointValue({ base: "sm", md: "md" })}
        mb={{ base: 4, md: 6 }}
      />
      <Box mx={{ base: 4, sm: 6, md: 8, lg: 12, xl: 20 }}>
        <HStack mb={{ base: 4, md: 6 }} spacing={4} py={2} alignItems="center">
          <Avatar
            name={`${user?.FirstName} ${user?.LastName}`}
            size={useBreakpointValue({ base: "md", md: "lg" })}
          />
          <VStack align="start" spacing={0}>
            <Text
              fontWeight="500"
              color="white"
              fontSize={{ base: "md", md: "lg" }}
            >
              {`${user?.FirstName} ${user?.LastName}`}
            </Text>
            <Text
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="500"
              color="white"
            >
              More sales today
            </Text>
          </VStack>
        </HStack>
        <HStack spacing={2} my={{ base: 4, md: 6 }}>
          <Text
            fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}
            fontWeight="500"
          >
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
          p={{ base: 2, md: 4 }}
          mx={{ base: 4, sm: 6, md: 8, lg: 12, xl: 20 }}
          mb={{ base: 4, md: 6 }}
        >
          <Table
            variant="simple"
            size={useBreakpointValue({ base: "sm", md: "md" })}
          >
            <Thead>
              <Tr>
                <Th fontSize={{ base: "xs", sm: "sm", md: "md" }}>
                  Payment ID
                </Th>
                <Th fontSize={{ base: "xs", sm: "sm", md: "md" }}>Title</Th>
                <Th fontSize={{ base: "xs", sm: "sm", md: "md" }}>Trx. Date</Th>
                <Th fontSize={{ base: "xs", sm: "sm", md: "md" }}>Amount</Th>
                <Th fontSize={{ base: "xs", sm: "sm", md: "md" }}>Status</Th>
                <Th fontSize={{ base: "xs", sm: "sm", md: "md" }}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {transactions?.map((trx: any) => (
                <Tr key={trx?._id}>
                  <Td fontSize={{ base: "xs", sm: "sm", md: "md" }}>
                    {trx?.reference}
                  </Td>
                  <Td fontSize={{ base: "xs", sm: "sm", md: "md" }}>
                    {trx?.narration}
                  </Td>
                  <Td fontSize={{ base: "xs", sm: "sm", md: "md" }}>
                    {new Date(trx?.createdAt).toLocaleDateString()}
                  </Td>
                  <Td fontSize={{ base: "xs", sm: "sm", md: "md" }}>{`${
                    trx?.currency
                  } ${(trx?.amount / 100).toLocaleString()}`}</Td>
                  <Td
                    fontSize={{ base: "xs", sm: "sm", md: "md" }}
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
                    <Button
                      size={useBreakpointValue({
                        base: "xs",
                        sm: "sm",
                        md: "md",
                      })}
                      colorScheme="teal"
                      variant="outline"
                    >
                      View
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Box px={{ base: 2, md: 4 }} pt={{ base: 4, md: 6 }}>
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
