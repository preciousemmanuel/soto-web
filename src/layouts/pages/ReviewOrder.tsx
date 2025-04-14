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
// import { useNavigate } from "react-router-dom";
import PaginationControls from "../../features/helpers/Pagination";

const ReviewNewOrder = ({ order }: { order: any }) => (
  <Box mt={{ base: 8, md: 8 }}>
    <Flex
      bg="pink.50"
      p={{ base: 3, md: 5 }}
      borderRadius="md"
      justify="space-between"
      align="center"
      flexDirection={{ base: "column", md: "row" }}
      gap={{ base: 4, md: 0 }}
    >
      <Box
        bg="white"
        p={{ base: 2, md: 3 }}
        borderRadius="md"
        borderWidth="2px"
        borderColor="#908D8D"
        boxShadow="sm"
        width={{ base: "100%", md: "auto" }}
      >
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={{ base: 3, md: 4 }}
        >
          <GridItem>
            <Text
              fontWeight="medium"
              color="#616060"
              fontSize={{ base: "sm", md: "md" }}
            >
              Product Name
            </Text>
            <Text
              fontWeight="normal"
              color="#908D8D"
              fontSize={{ base: "xs", md: "sm" }}
            >
              {order?.product_name}
            </Text>
          </GridItem>
          <GridItem>
            <Text
              fontWeight="medium"
              color="#616060"
              fontSize={{ base: "sm", md: "md" }}
            >
              Product Brand
            </Text>
            <Text
              fontWeight="normal"
              color="#908D8D"
              fontSize={{ base: "xs", md: "sm" }}
            >
              {order?.product_brand || "N/A"}
            </Text>
          </GridItem>
          <GridItem>
            <Text
              fontWeight="medium"
              color="#616060"
              fontSize={{ base: "sm", md: "md" }}
            >
              Type
            </Text>
            <Text
              fontWeight="normal"
              color="#908D8D"
              fontSize={{ base: "xs", md: "sm" }}
            >
              {order?.type}
            </Text>
          </GridItem>

          <GridItem>
            <Text
              fontWeight="medium"
              color="#616060"
              fontSize={{ base: "sm", md: "md" }}
            >
              Size
            </Text>
            <Text
              fontWeight="normal"
              color="#908D8D"
              fontSize={{ base: "xs", md: "sm" }}
            >
              {order?.size}
            </Text>
          </GridItem>
          <GridItem>
            <Text
              fontWeight="medium"
              color="#616060"
              fontSize={{ base: "sm", md: "md" }}
            >
              Color
            </Text>
            <Text
              fontWeight="normal"
              color="#908D8D"
              fontSize={{ base: "xs", md: "sm" }}
            >
              {order?.color}
            </Text>
          </GridItem>
          <GridItem>
            <Text
              fontWeight="medium"
              color="#616060"
              fontSize={{ base: "sm", md: "md" }}
            >
              Qty
            </Text>
            <Text
              fontWeight="normal"
              color="#908D8D"
              fontSize={{ base: "xs", md: "sm" }}
            >
              {order?.quantity}
            </Text>
          </GridItem>

          <GridItem>
            <Text
              fontWeight="medium"
              color="#616060"
              fontSize={{ base: "sm", md: "md" }}
            >
              Price Range
            </Text>
            <Text
              fontWeight="normal"
              color="#908D8D"
              fontSize={{ base: "xs", md: "sm" }}
            >
              {order?.min_price} - {order?.max_price}
            </Text>
          </GridItem>
        </Grid>
        <GridItem mt={{ base: 2, md: 3 }}>
          <Text
            fontWeight="medium"
            color="#616060"
            fontSize={{ base: "sm", md: "md" }}
          >
            Order Status
          </Text>
          <Text
            fontWeight="normal"
            color="#908D8D"
            fontSize={{ base: "xs", md: "sm" }}
          >
            {order?.approval_status}
          </Text>
        </GridItem>
      </Box>
      <Flex
        direction={{ base: "row", md: "column" }}
        bg="gray.800"
        p={{ base: 2, md: 5 }}
        color="white"
        align="center"
        justify="space-around"
        gap={{ base: 2, md: 0 }}
        width={{ base: "100%", md: "auto" }}
        borderRadius="md"
      >
        <Button
          leftIcon={<EditIcon />}
          color="white"
          variant="solid"
          mb={{ base: 0, md: 2 }}
          size={{ base: "xs", md: "sm" }}
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
          mb={{ base: 0, md: 2 }}
          size={{ base: "xs", md: "sm" }}
          _hover="gray.800"
        >
          Review Order
        </Button>
        <Button
          leftIcon={<DeleteIcon />}
          bg="gray.800"
          color="red"
          variant="solid"
          size={{ base: "xs", md: "sm" }}
          _hover="gray.800"
        >
          Delete Order
        </Button>
      </Flex>
    </Flex>
  </Box>
);

export default function ReviewOrder() {
  const {
    customOrdersData: orders,
    customOrdersDataPagination,
    handlePageChange,
  } = useOrder();
  const allOrder = orders;
  const order = allOrder?.data?.data;

  return (
    <Box mt={{ base: 20, md: 120 }}>
      <Heading
        size="lg"
        textAlign="center"
        mb={{ base: 4, md: 6 }}
        bg={"#FFF2ED"}
        color={"#FF5733"}
        fontFamily={"Poppins"}
        fontSize={{ base: "18px", md: "22px" }}
        px={{ base: 3, md: 6 }}
        py={{ base: 3, md: 4 }}
      >
        Review Order
      </Heading>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        mb={{ base: 4, md: 6 }}
        px={{ base: 4, md: 10 }}
      >
        <Text
          fontWeight=""
          fontSize={{ base: "sm", md: "17px" }}
          fontFamily={"Poppins"}
          color={"gray"}
        >
          Recently Added
        </Text>
      </Flex>
      <Box my={{ base: 8, md: 20 }} mx={{ base: 4, md: 12 }}>
        {!order || order?.length === 0 ? (
          <Text textAlign="center" color="gray" mt={{ base: 20, md: 120 }}>
            No orders to review.
          </Text>
        ) : (
          order?.map((orderItem: { _id: string }) => (
            <ReviewNewOrder key={orderItem._id} order={orderItem} />
          ))
        )}
      </Box>
      <Box px={{ base: 4, md: 24 }} py={{ base: 4, md: 8 }}>
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
