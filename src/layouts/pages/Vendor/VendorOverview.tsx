import {
  Box,
  Flex,
  Text,
  Avatar,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Icon,
  Image,
  TabIndicator,
  useBreakpointValue,
  Table,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { useState } from "react";
import { HiChevronRight } from "react-icons/hi";

// Dummy data for products and graph
const products = [
  { id: 1, name: "Product 1", price: "$100", qty: "5 in stock" },
  { id: 2, name: "Product 2", price: "$200", qty: "Out of stock" },
  { id: 3, name: "Product 3", price: "$150", qty: "8 in stock" },
];

const orders = [
  {
    id: 1,
    product: "Product A",
    date: "2024-11-01",
    price: "$50",
    status: "Pending",
  },
  {
    id: 2,
    product: "Product B",
    date: "2024-10-15",
    price: "$100",
    status: "Delivered",
  },
  {
    id: 3,
    product: "Product C",
    date: "2024-09-30",
    price: "$75",
    status: "Canceled",
  },
];

const VendorOverview = () => {
  const [activeTab, setActiveTab] = useState(0);
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });

  return (
    <Box p={4} minHeight="100vh" mt={28}>
      {/* Top Section */}
      <Flex justify="space-between" align="center" mb={8} flexWrap="wrap">
        <Flex align="center" gap={2} mb={[4, 0]}>
          <Avatar size="lg" />
          <Box>
            <Text fontSize="2xl" fontWeight="500">
              Hi, Ruchi
            </Text>
            <Text fontSize="lg" color="gray.500">
              Make more sales today
            </Text>
          </Box>
        </Flex>
        <Button
          bg="black"
          size="lg"
          borderRadius="full"
          color="white"
          fontWeight="500"
        >
          Add Product
        </Button>
      </Flex>

      {/* Tabs Section */}
      <Box p={4} borderRadius="md">
        <Tabs
          index={activeTab}
          onChange={(index) => setActiveTab(index)}
          variant="unstyled"
        >
          <TabList
            display="flex"
            flexWrap={{ base: "wrap", md: "nowrap" }}
            justifyContent={{ base: "center", md: "flex-start" }}
            alignItems="center"
            gap={2}
          >
            <Tab fontSize="lg" fontWeight="500" color="gray.500">
              Overview
            </Tab>
            <Tab fontSize="lg" fontWeight="500" color="gray.500">
              Inventory
            </Tab>
            <Tab fontSize="lg" fontWeight="500" color="gray.500">
              Transactions
            </Tab>
          </TabList>
          <TabIndicator
            mt="-1.5px"
            height="2px"
            bg="#FF5733"
            borderRadius="1px"
          />
          <TabPanels>
            <TabPanel>
              {/* Overview Content */}
              <Flex gap={8} flexWrap="wrap">
                <Flex direction="column" gap={6} flex="1">
                  <Box
                    bg="white"
                    p={4}
                    borderRadius="md"
                    width={["100%", "300px"]}
                    border="1px"
                    borderColor="gray.200"
                  >
                    <Text fontSize="sm" py={2} color="#FF5733">
                      Sold
                    </Text>
                    <Text fontSize="2xl" textAlign="center" fontWeight="500">
                      $1200
                    </Text>
                    <Text fontSize="md" color="green.500">
                      +15%
                    </Text>
                    <Text
                      fontSize="lg"
                      textAlign="center"
                      mt={2}
                      color="gray.500"
                    >
                      Amount to be remitted
                    </Text>
                  </Box>
                  <Box
                    bg="white"
                    p={4}
                    borderRadius="md"
                    width={["100%", "320px"]}
                    border="1px"
                    borderColor="gray.200"
                  >
                    <Text fontSize="sm" py={2} color="#FF5733">
                      Market
                    </Text>
                    <Text fontSize="2xl" textAlign="center" fontWeight="500">
                      $1500
                    </Text>
                    <Text fontSize="md" color="blue.500">
                      Amount in stock
                    </Text>
                  </Box>
                </Flex>

                <Box
                  flex="2"
                  mb={6}
                  width="100%"
                  maxWidth="600px"
                  border="1px"
                  borderColor="#FF5733"
                  boxShadow="lg"
                  p={4}
                  borderRadius="md"
                >
                  <Text fontSize="md" fontWeight="500" mb={2}>
                    Income Stats
                  </Text>
                  <Text>Graph showing March revenue: $4000</Text>
                </Box>

                <Flex
                  direction="column"
                  gap={4}
                  width="100%"
                  maxWidth="500px"
                  border="1px"
                  borderColor="gray.200"
                  p={4}
                >
                  <Flex justify="space-between" align="center" mb={4}>
                    <Text fontSize="md" fontWeight="500">
                      Top Products
                    </Text>
                    <Flex align="center" color="#FF5733" cursor="pointer">
                      See all <Icon as={HiChevronRight} ml={1} />
                    </Flex>
                  </Flex>
                  {products.map((product) => (
                    <Flex
                      key={product.id}
                      justify="space-between"
                      align="center"
                      p={3}
                      bg="white"
                      borderRadius="md"
                      boxShadow="sm"
                      wrap="wrap"
                    >
                      <Image
                        src="https://via.placeholder.com/50"
                        boxSize="50px"
                        alt={product.name}
                      />
                      <Box flex="1" ml={4}>
                        <Text fontSize="md" fontWeight="bold">
                          {product.name}
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                          {product.price}
                        </Text>
                      </Box>
                      <Button size="sm" variant="outline" fontWeight="500">
                        {product.qty}
                      </Button>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
              <Box
                bg="white"
                boxShadow="lg"
                border="1px"
                borderColor="gray.200"
                borderRadius="md"
                p={4}
                overflowX="auto"
                mt={6}
              >
                <Text fontSize="lg" fontWeight="500" mb={4}>
                  Orders
                </Text>
                <Table variant="simple" size="sm">
                  <Thead>
                    <Tr>
                      <Th>Order ID</Th>
                      <Th>Product</Th>
                      <Th>Order Date</Th>
                      <Th>Price</Th>
                      <Th>Status</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {orders.map((order) => (
                      <Tr key={order.id}>
                        <Td>{order.id}</Td>
                        <Td>{order.product}</Td>
                        <Td>{order.date}</Td>
                        <Td>{order.price}</Td>
                        <Td
                          color={
                            order.status === "Delivered"
                              ? "green.500"
                              : order.status === "Canceled"
                              ? "red.500"
                              : "yellow.500"
                          }
                        >
                          {order.status}
                        </Td>
                        <Td>
                          <Button size={buttonSize}>...</Button>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </TabPanel>
            {/* Additional TabPanels for Inventory and Transactions */}
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default VendorOverview;
