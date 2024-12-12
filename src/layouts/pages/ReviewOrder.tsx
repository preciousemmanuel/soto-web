import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { FaEye } from "react-icons/fa";
import { useOrder } from "../hooks/useOrder";
import { useNavigate } from "react-router-dom";
import PaginationControls from "../../features/helpers/Pagination";

const ReviewNewOrder = ({ order }: { order: any }) => (
  <Box mt={8}>
    <Flex
      bg="pink.50"
      p={5}
      borderRadius="md"
      justify="space-between"
      align="center"
    >
      <Box
        bg="white"
        p={3}
        borderRadius="md"
        borderWidth="2px"
        borderColor="#908D8D"
        boxShadow="sm"
      >
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          <GridItem>
            <Text fontWeight="medium" color="#616060" fontSize="md">
              Product Name
            </Text>
            <Text fontWeight="normal" color="#908D8D" fontSize="sm">
              {order.product_name}
            </Text>
          </GridItem>
          <GridItem>
            <Text fontWeight="medium" color="#616060" fontSize="md">
              Product Brand
            </Text>
            <Text fontWeight="normal" color="#908D8D" fontSize="sm">
              {order.product_brand || "N/A"}
            </Text>
          </GridItem>
          <GridItem>
            <Text fontWeight="medium" color="#616060" fontSize="md">
              Type
            </Text>
            <Text fontWeight="normal" color="#908D8D" fontSize="sm">
              {order.type}
            </Text>
          </GridItem>

          <GridItem>
            <Text fontWeight="medium" color="#616060" fontSize="md">
              Size
            </Text>
            <Text fontWeight="normal" color="#908D8D" fontSize="sm">
              {order.size}
            </Text>
          </GridItem>
          <GridItem>
            <Text fontWeight="medium" color="#616060" fontSize="md">
              Color
            </Text>
            <Text fontWeight="normal" color="#908D8D" fontSize="sm">
              {order.color}
            </Text>
          </GridItem>
          <GridItem>
            <Text fontWeight="medium" color="#616060" fontSize="md">
              Qty
            </Text>
            <Text fontWeight="normal" color="#908D8D" fontSize="sm">
              {order.quantity}
            </Text>
          </GridItem>

          <GridItem>
            <Text fontWeight="medium" color="#616060" fontSize="md">
              Price Range
            </Text>
            <Text fontWeight="normal" color="#908D8D" fontSize="sm">
              {order.min_price} - {order.max_price}
            </Text>
          </GridItem>
        </Grid>
      </Box>
      <Flex
        direction="column"
        bg="gray.800"
        p={5}
        color="white"
        align="center"
        justify="space-around"
      >
        <Button
          leftIcon={<EditIcon />}
          color="white"
          variant="solid"
          mb={2}
          size="sm"
          bg="gray.800"
          _hover="gray.800"
        >
          Edit Order
        </Button>
        <Button
          leftIcon={<FaEye />}
          bg="gray.800"
          color="white"
          variant="solid"
          mb={2}
          size="sm"
          _hover="gray.800"
        >
          Review Order
        </Button>
        <Button
          leftIcon={<DeleteIcon />}
          bg="gray.800"
          color="red"
          variant="solid"
          size="sm"
          _hover="gray.800"
        >
          Delete Order
        </Button>
      </Flex>
    </Flex>
  </Box>
);

export default function ReviewOrder() {
  const { customOrdersData: orders, customOrdersDataPagination,handlePageChange } = useOrder();
  const allOrder = orders;
  const order = allOrder?.data?.data;

  return (
    <Box mt={120}>
        <Heading
          size="lg"
          textAlign="center"
          mb={6}
          bg={"#FFF2ED"}
          color={"#FF5733"}
          fontFamily={"Poppins"}
          fontSize={"22px"}
          px={6}
          py={4}
        >
          Review Order
        </Heading>
      <Flex justifyContent="space-between" alignItems="center" mb={6} px={10}>
        <Text
          fontWeight=""
          fontSize="17px"
          fontFamily={"Poppins"}
          color={"gray"}
        >
          Recently Added
        </Text>
        {/* <Button rounded="full">Select All</Button> */}
      </Flex>
      <Box my={20} mx={12}>
        {!order || order.length === 0 ? (
          <Text textAlign="center" color="gray" mt={120}>
            No orders to review.
          </Text>
        ) : (
          order?.map((orderItem: { _id: string }) => (
            <ReviewNewOrder key={orderItem._id} order={orderItem} />
          ))
        )}   
      </Box>
      <Box px={24} pt={8}>
        <PaginationControls
          currentPage={customOrdersDataPagination.currentPage}
          totalPages={customOrdersDataPagination.totalPages}
          onPageChange={handlePageChange}
          hasNextPage={customOrdersDataPagination.hasNextPage}
        />
      </Box>
    </Box>
  );
}
