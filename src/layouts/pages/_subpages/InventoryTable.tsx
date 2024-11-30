// InventoryTable.js

import { Box, Table, Thead, Th, Tr, Tbody, Td } from "@chakra-ui/react";
interface ShippingAddress {
  country: string;
}

interface Buyer {
  ShippingAddress: ShippingAddress;
  _id: string;
  FirstName: string;
  LastName: string;
}

interface InventoryRecord {
  _id: string;
  product_id: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  vendor: string;
  buyer: Buyer;
  order: string;
  is_discounted: boolean;
  status: string;
  is_remitted: boolean;
  createdAt: string;
  updatedAt: string;
}
const InventoryTable = ({ inventory }: { inventory: InventoryRecord[] }) => {
  return (
    <Box
      bg="white"
      boxShadow="lg"
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      p={4}
      overflowX="auto"
    >
      <Table variant="simple" size="sm">
        <Thead>
          <Tr>
            <Th>S/N</Th>
            <Th>Product Name</Th>
            <Th>Buyer Name</Th>
            <Th>Quantity</Th>
            <Th>Unit Price</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {inventory?.map((item: InventoryRecord, index: number) => (
            <Tr key={item?._id}>
              <Td>{index + 1}</Td>
              <Td>{item?.product_name}</Td>
              <Td>
                {item?.buyer?.FirstName} {item?.buyer?.LastName}
              </Td>
              <Td>{item?.quantity}</Td>
              <Td>{item?.unit_price}</Td>
              <Td>{item?.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default InventoryTable;
