import { Box, Flex, Text } from "@chakra-ui/react";
import SortModal from "../../../features/modals/SortModal";
import SummaryBoxes from "../_subpages/SummaryBox";
import InventoryTable from "../_subpages/InventoryTable";
import PaginationControls from "../../../features/helpers/Pagination";
import { useVendor } from "../../hooks/useVendor";

const VendorInventory = () => {
  const { vendorInventory, vendorInventoryPagination, handlePageChange } =
    useVendor();
  // console.log(vendorInventory, "vendorInventory");
  // const [currentPage, setCurrentPage] = useState(1); // Added state for current page

  // const handlePageChange = (newPage: SetStateAction<number>) => {
  //   setCurrentPage(newPage);
  // };

  return (
    <Box p={4} height="100%">
      <Flex justify="flex-end" mb={4}>
        <SortModal />
      </Flex>

      <SummaryBoxes
        total_in_stock={vendorInventory?.data?.total_in_stock || 0}
        total_products={vendorInventory?.data?.total_products || 0}
        total_sold={vendorInventory?.data?.total_sold || 0}
      />

      <Box overflowX="auto" width="100%" maxW="100%" height="100%" >
      {vendorInventory?.data?.inventory_records?.data?.length > 0 ? (
        <InventoryTable
          inventory={vendorInventory?.data?.inventory_records?.data}
        />
      ) : (
        <Box textAlign="center" py={4}>
          <Text>
            {vendorInventory?.data?.inventory_records ? 
              "No available inventory." : 
              "Loading inventory..."
            }
          </Text>
        </Box>
      )}
      </Box>

      <PaginationControls
        currentPage={vendorInventoryPagination.currentPage}
        totalPages={vendorInventoryPagination.totalPages}
        onPageChange={handlePageChange}
        hasNextPage={vendorInventoryPagination.hasNextPage}
      />
    </Box>
  );
};

export default VendorInventory;
