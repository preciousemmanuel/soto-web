import {
  Box,
  Heading,
  Text,
  Button,
  Flex,
  Grid,
  GridItem,
  // VStack,
  // Checkbox,
} from "@chakra-ui/react";
import { ChevronLeftIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
// import { FaEye } from "react-icons/fa";
import { useOrder } from "../hooks/useOrder";
// import { useNavigate } from "react-router-dom";
// import PaginationControls from "../../features/helpers/Pagination";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ReviewNewOrder = ({
  order,
  deleteSelectedButton,
  onEditOrder,
}: {
  order: any;
  onEditOrder: () => void;
  deleteSelectedButton: () => void;
}) => (
  <Box mt={{ base: 8, md: 8 }} w="full">
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
        width={{ base: "100%", md: "70%" }}
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
        {/* <GridItem mt={{ base: 2, md: 3 }}>
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
        </GridItem> */}
      </Box>
      <Flex
        direction={{ base: "row", md: "column" }}
        bg="gray.800"
        p={{ base: 2, md: 5 }}
        color="white"
        justify="center"
        align="center"
        gridGap={2}
        gap={{ base: 2, md: 0 }}
        width={{ base: "100%", md: "auto" }}
        borderRadius="md"
        h="240px"
      >
        <Button
          leftIcon={<EditIcon />}
          color="white"
          variant="solid"
          mb={{ base: 0, md: 2 }}
          size={{ base: "xs", md: "sm" }}
          bg="gray.800"
          _hover="gray.800"
          onClick={onEditOrder}
        >
          Edit Order
        </Button>
        {/* <Button
          leftIcon={<FaEye />}
          bg="gray.800"
          color="white"
          variant="solid"
          mb={{ base: 0, md: 2 }}
          size={{ base: "xs", md: "sm" }}
          _hover="gray.800"
        >
          Review Order
        </Button> */}
        <Button
          onClick={() => {
            
            deleteSelectedButton();
          }}
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
  const [draftOrders, setDraftOrders] = useLocalStorage("draftOrders", []);
  const {createCustomOrders, isCreatingOrder, } = useOrder();
  // const [selectedOrders, setSelectedOrders] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleSubmitOrders = async () => {
    try {
      if (draftOrders.length === 0) return;
      await createCustomOrders({ orders: draftOrders });
      setDraftOrders([]);
      navigate("/custom-order");
      toast.success("Orders submitted successfully");
    } catch (error) {
      console.error("Order submission failed:", error);
    }
  };

  // console.log(draftOrders);

  // const toggleSelectOrder = (id: string) => {
  //   setSelectedOrders((prev) =>
  //     prev.includes(id)
  //       ? prev.filter((orderId) => orderId !== id)
  //       : [...prev, id]
  //   );
  // };

  const deleteOrder = (index: number) => {
    setDraftOrders((prev:any) => {
      const newOrders = prev.filter((_: any, i: number) => i !== index);
      toast.success("Order deleted successfully");
      return newOrders;
    });
  };

  return (
    <Box mt={{ base: 20, md: 180 }}>
      <Flex
        align="center"
        justify="center"
        position="relative"
        bg="#FFF2ED"
        p={{ base: 4, md: 6 }}
        mt={{ base: 6, md: 20 }}
        mb={6}
      >
        <Button
          position="absolute"
          left={{ base: 2, md: 6 }}
          onClick={() => navigate(-1)}
          leftIcon={<ChevronLeftIcon />}
          variant="ghost"
          color="#FF5753"
          size={{ base: "sm", md: "md" }}
        >
          Back
        </Button>
        <Heading size="100px" fontFamily="Poppins" color="#FF5753">
        Review Order
        </Heading>
      </Flex>
    
      {draftOrders.length === 0 ? (
        <Text textAlign="center" color="gray" mt={{ base: 20, md: 120 }}>
          No orders to review.
        </Text>
      ) : (
        <Flex flexDirection="column" gap={6}>
          {draftOrders.map((order, index) => (
            <Box key={index} w="full" position="relative" px={{base: 4, md: 24}}>
              <ReviewNewOrder
                onEditOrder={() => {
                  navigate(`/edit-order?editIndex=${index}`);
                }}
                deleteSelectedButton={() => deleteOrder(index)}
                order={order}
              />
            </Box>
          ))}
        </Flex>
      )}
      {/* <Box px={{ base: 4, md: 24 }} py={{ base: 4, md: 8 }}>
        <PaginationControls
          currentPage={customOrdersDataPagination.currentPage}
          totalPages={customOrdersDataPagination.totalPages}
          onPageChange={handlePageChange}
          hasNextPage={customOrdersDataPagination.hasNextPage}
        />
      </Box> */}
      <Flex justifyContent="center" gap={6} my={6}>
        <Button
          onClick={() => navigate('/custom-order')}
          variant="outline"
          size="md"
          rounded="14px"
          width="20%"
          h="50px"
          _hover={{
            bg: "#FF5753",
            color: "white",
            borderColor: "#FF5753",
          }}
          _active={{
            bg: "#FF5753",
            color: "white",
            borderColor: "#FF5753",
          }}
          borderColor="#FF5753"
          color="#FF5753"
        >
          Add More
        </Button>
        <Button
          onClick={handleSubmitOrders}
          isLoading={isCreatingOrder}
          variant="solid"
          size="md"
          rounded="14px"
          width="20%"
          h="50px"
          _hover={{
            bg: "#FF5753",
            color: "white",
          }}
          _active={{
            bg: "#FF5753",
            color: "white",
          }}
          bg="#FF5753"
          color="white"
        >
          Submit
        </Button>
      </Flex>
    </Box>
  );
}


