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
      boxShadow={{ base: "none", md: "lg" }}
      border="1px"
      borderColor="gray.200"
      borderRadius="md"
      p={{ base: 1, sm: 2, md: 4 }}
      overflowX="auto"
      mx={{ base: 0, sm: 2, md: 0 }}
      mt={{ base: 2, sm: 4, md: 6 }}
      width="100%"
    >
      <Table 
        variant="simple" 
        size={{ base: "sm", sm: "md", md: "md" }}
        whiteSpace={{ base: "nowrap", md: "normal" }}
      >
        <Thead>
          <Tr>
            <Th fontSize={{ base: "10px", sm: "sm", md: "md" }}>S/N</Th>
            <Th fontSize={{ base: "10px", sm: "sm", md: "md" }}>Product</Th>
            <Th fontSize={{ base: "10px", sm: "sm", md: "md" }} display={{ base: "none", sm: "table-cell" }}>Buyer</Th>
            <Th fontSize={{ base: "10px", sm: "sm", md: "md" }}>Qty</Th>
            <Th fontSize={{ base: "10px", sm: "sm", md: "md" }}>Price</Th>
            <Th fontSize={{ base: "10px", sm: "sm", md: "md" }}>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {inventory?.map((item: InventoryRecord, index: number) => (
            <Tr key={item?._id}>
              <Td fontSize={{ base: "10px", sm: "sm", md: "md" }}>{index + 1}</Td>
              <Td 
                fontSize={{ base: "10px", sm: "sm", md: "md" }}
                maxW={{ base: "100px", sm: "150px", md: "200px" }}
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {item?.product_name}
              </Td>
              <Td 
                fontSize={{ base: "10px", sm: "sm", md: "md" }}
                display={{ base: "none", sm: "table-cell" }}
              >
                {item?.buyer?.FirstName} {item?.buyer?.LastName}
              </Td>
              <Td fontSize={{ base: "10px", sm: "sm", md: "md" }}>{item?.quantity}</Td>
              <Td fontSize={{ base: "10px", sm: "sm", md: "md" }}>₦{item?.unit_price}</Td>
              <Td fontSize={{ base: "10px", sm: "sm", md: "md" }}>
                <Box 
                  as="span"
                  px={{ base: 1, sm: 2 }}
                  py={{ base: 0.5, sm: 1 }}
                  borderRadius="md"
                  bg="white"
                  fontWeight="medium"
                  textTransform="capitalize"
                  whiteSpace="nowrap"
                  color={
                    item?.status === 'BOOKED' ? '#28AD07' :
                    item?.status === 'PENDING' ? '#28AD07' :
                    item?.status === 'PICKED_UP' ? '#28AD07' :
                    item?.status === 'DELIVERED' ? 'green.500' :
                    item?.status === 'CANCELLED' ? 'red.500' :
                    item?.status === 'FAILED' ? 'red.500' :
                    'gray.500'
                  }
                >
                  {item?.status.toUpperCase().replace('_', ' ')}
                </Box>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default InventoryTable;
