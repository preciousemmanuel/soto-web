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
      p={{ base: 2, md: 4 }}
      overflowX="auto"
      mx={{ base: 2, md: 0 }}
      mt={{ base: 4, md: 6 }}
    >
      <Table variant="simple" size={{ base: "xs", sm: "sm", md: "md" }}>
        <Thead>
          <Tr>
            <Th fontSize={{ base: "xs", sm: "sm", md: "md" }}>S/N</Th>
            <Th fontSize={{ base: "xs", sm: "sm", md: "md" }}>Product Name</Th>
            <Th fontSize={{ base: "xs", sm: "sm", md: "md" }}>Buyer Name</Th>
            <Th fontSize={{ base: "xs", sm: "sm", md: "md" }}>Quantity</Th>
            <Th fontSize={{ base: "xs", sm: "sm", md: "md" }}>Unit Price</Th>
            <Th fontSize={{ base: "xs", sm: "sm", md: "md" }}>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {inventory?.map((item: InventoryRecord, index: number) => (
            <Tr key={item?._id}>
              <Td fontSize={{ base: "xs", sm: "sm", md: "md" }}>{index + 1}</Td>
              <Td fontSize={{ base: "xs", sm: "sm", md: "md" }}>
                {item?.product_name}
              </Td>
              <Td fontSize={{ base: "xs", sm: "sm", md: "md" }}>
                {item?.buyer?.FirstName} {item?.buyer?.LastName}
              </Td>
              <Td fontSize={{ base: "xs", sm: "sm", md: "md" }}>
                {item?.quantity}
              </Td>
              <Td fontSize={{ base: "xs", sm: "sm", md: "md" }}>
                {item?.unit_price}
              </Td>
              <Td fontSize={{ base: "xs", sm: "sm", md: "md" }}>
                {item?.status}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default InventoryTable;
