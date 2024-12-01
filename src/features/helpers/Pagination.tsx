import { HStack, Button, Text } from "@chakra-ui/react";
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const PaginationControls: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <HStack justifyContent="space-between" mt={4}>
      <Text>
        Page {currentPage} of {totalPages}
      </Text>
      <HStack spacing={4}>
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
        >
          Next
        </Button>
      </HStack>
    </HStack>
  );
};

export default PaginationControls;
