// InventoryPage.js

import { SetStateAction, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import SortModal from "../../../features/modals/SortModal";
import SummaryBoxes from "../_subpages/SummaryBox";
import InventoryTable from "../_subpages/InventoryTable";
import PaginationControls from "../../../features/helpers/Pagination";


const VendorInventory = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 7;

  const inventory = [
    { id: "INV001", orderDate: "2024-11-01", deliveredTo: "Customer A", in: 100, out: 50, balance: 50 },
    { id: "INV002", orderDate: "2024-10-28", deliveredTo: "Customer B", in: 200, out: 150, balance: 50 },
    // ... other inventory items
  ];

  const handlePageChange = (newPage: SetStateAction<number>) => {
    setCurrentPage(newPage);
    // fetch new page data here if necessary
  };

  return (
    <Box p={4} minHeight="100vh">
      <Flex justify="flex-end" mb={4}>
        <SortModal />
      </Flex>

      <SummaryBoxes totalProducts={100} totalSold={80} totalInStock={20} />

      <InventoryTable inventory={inventory} />

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};

export default VendorInventory;
