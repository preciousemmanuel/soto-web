// InventoryTable.js

import { Box, Table, Thead, Th, Tr, Tbody, Td } from "@chakra-ui/react";

const InventoryTable = ({ inventory }: any) => {
  return (
    <Box bg="white" boxShadow="lg" border="1px" borderColor="gray.200" borderRadius="md" p={4} overflowX="auto">
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>S/N</Th>
            <Th>Order Date</Th>
            <Th>Delivered To</Th>
            <Th>In</Th>
            <Th>Out</Th>
            <Th>Balance</Th>
          </Tr>
        </Thead>
        <Tbody>
          {inventory.map((item, index) => (
            <Tr key={item.id}>
              <Td>{index + 1}</Td>
              <Td>{item.orderDate}</Td>
              <Td>{item.deliveredTo}</Td>
              <Td>{item.in}</Td>
              <Td>{item.out}</Td>
              <Td>{item.balance}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default InventoryTable;
