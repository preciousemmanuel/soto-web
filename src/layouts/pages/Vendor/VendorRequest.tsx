import {
    Box,
    Text,
    Divider,
    FormLabel,
    Input,
    Button,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Stack,
    useBreakpointValue,
  } from "@chakra-ui/react";
  import { useState } from "react";
  
  const VendorRequest = () => {
    const [requestedAmount, setRequestedAmount] = useState("");
    const [wallet, setWallet] = useState("");
  
    const handleRequestSubmit = () => {
      // handle request submission logic here
      console.log("Request submitted", { requestedAmount, wallet });
    };
  
    const soldBalance = "$2,500.00"; // Example sold balance amount
  
    // Sample request history data
    const requestHistory = [
      { id: "001", fundTo: "Wallet", date: "2024-10-31", amount: "$100", status: "Completed" },
      { id: "002", fundTo: "Bank", date: "2024-11-01", amount: "$150", status: "Pending" },
      { id: "003", fundTo: "Wallet", date: "2024-11-02", amount: "$200", status: "Completed" },
    ];
  
    const isMobile = useBreakpointValue({ base: true, md: false });
  
    return (
      <Stack direction={isMobile ? "column" : "row"} spacing={8} p={8} mt={32}>
        {/* Withdrawal Request Box */}
        <Box
          p={6}
          bg="white"
          boxShadow="md"
          borderRadius="md"
          width={isMobile ? "100%" : "436px"}
        >
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Withdrawal Request
          </Text>
          <Divider mb={4} />
          
          <FormLabel fontWeight="500">Requested Amount</FormLabel>
          <Input
            placeholder="Enter amount"
            value={requestedAmount}
            onChange={(e) => setRequestedAmount(e.target.value)}
            mb={2}
            bg="#F5F6F8"
          />
          <Text fontSize="sm" color="gray.500" mb={4}>
            Sold Balance: {soldBalance}
          </Text>
  
          <FormLabel fontWeight="500">To Wallet</FormLabel>
          <Input
            placeholder="Enter wallet address"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
            mb={6}
            bg="#F5F6F8"
          />
  
          <Button
            bg="#FF5733"
            width="100%"
            onClick={handleRequestSubmit}
            color="white"
          >
            Submit Request
          </Button>
        </Box>
  
        {/* Request History Box */}
        <Box
          p={6}
          bg="white"
          boxShadow="md"
          borderRadius="md"
          width={isMobile ? "100%" : "45%"}
        >
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Request History
          </Text>
  
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>Fund To</Th>
                <Th>Date</Th>
                <Th>Amount</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {requestHistory.map((request, index) => (
                <Tr
                  key={request.id}
                  bg={index % 2 === 0 ? "gray.100" : "white"}
                >
                  <Td>{request.fundTo}</Td>
                  <Td>{request.date}</Td>
                  <Td>{request.amount}</Td>
                  <Td>{request.status}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
  
          {/* Pagination */}
          <Stack direction="row" spacing={2} justify="center" mt={4}>
            <Button size="sm" variant="outline" disabled>
              Prev
            </Button>
            <Button size="sm" colorScheme="teal">
              1
            </Button>
            <Button size="sm" variant="outline">
              Next
            </Button>
          </Stack>
        </Box>
      </Stack>
    );
  };
  
  export default VendorRequest;
  