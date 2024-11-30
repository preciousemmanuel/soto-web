// InventoryPage.js

import { SetStateAction, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import SortModal from "../../../features/modals/SortModal";
import SummaryBoxes from "../_subpages/SummaryBox";
import InventoryTable from "../_subpages/InventoryTable";
import PaginationControls from "../../../features/helpers/Pagination";
import { useVendor } from "../../hooks/useVendor";

const VendorInventory = () => {
  const { vendorInventory } = useVendor();

  const [currentPage, setCurrentPage] = useState(1); // Added state for current page

  const handlePageChange = (newPage: SetStateAction<number>) => {
    setCurrentPage(newPage);
  };

  return (
    <Box p={4} minHeight="100vh">
      <Flex justify="flex-end" mb={4}>
        <SortModal />
      </Flex>

      <SummaryBoxes
        total_in_stock={vendorInventory?.data?.total_in_stock || 0}
        total_products={vendorInventory?.data?.total_products || 0}
        total_sold={vendorInventory?.data?.total_sold || 0}
      />

      {vendorInventory?.data?.inventory_records?.length > 0 ? (
        <InventoryTable
          inventory={vendorInventory?.data.inventory_records?.data}
        />
      ) : (
        <Box textAlign="center" py={4}>
          <Text>No available inventory.</Text>
        </Box>
      )}

      <PaginationControls
        currentPage={currentPage}
        totalPages={vendorInventory?.data?.pagination?.totalPages}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};

export default VendorInventory;
