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
  Stat,
  StatNumber,
  StatHelpText,
  Select,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { HiChevronRight } from "react-icons/hi";
import VendorTransactions from "./VendorTransactions";
import VendorInventory from "./VendorInventory";
import { useVendor } from "../../hooks/useVendor";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Chart from "chart.js/auto";
// import { Product } from "../../hooks/useProduct";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../features/helpers/LoadingSpinner";
import PaginationControls from "../../../features/helpers/Pagination";

const VendorOverview = () => {
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();
  const buttonSize = useBreakpointValue({ base: "sm", md: "md" });
  const {
    vendorOverviewData,
    selectedTimeframe,
    setSelectedTimeframe,
    topProductsByVendor,
    ordersByVendor,
    transactionLogs,
    ordersByVendorPagination,
    handlePageChange,
    transactionLogsPagination,
    isLoading,
  } = useVendor();
  const [chartData, setChartData] = useState<any>(null);
  const businessData = vendorOverviewData?.data?.user?.business;
  const incomeStatAgg = vendorOverviewData?.data?.income_stat_agg;
  const topProduct = topProductsByVendor?.data?.data;
  const leastOrder = ordersByVendor?.data?.data;
  // console.log(leastOrder,"leastOrder")
  const allTransactionLogs = transactionLogs?.data?.data;
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // console.log(vendorOverviewData,"overview")

  const handleProductClick = (orderId: string) => {
    navigate(`/vendor-orders/${orderId}`);
  };

  const handleTimeframeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedTimeframe(event.target.value);
  };

  const transformData = (data: Record<string, any[]>) => {
    const labels: string[] = [];
    const values: number[] = [];

    for (const day in data) {
      labels.push(day);
      const totalPrice = data[day].reduce(
        (sum, entry) => sum + (entry.total_price_value || 0),
        0
      );
      values.push(totalPrice);
    }

    return { labels, values };
  };

  useEffect(() => {
    const { labels, values } = transformData(incomeStatAgg);
    setChartData({
      labels,
      datasets: [
        {
          label: "Total Income",
          data: values,
          fill: true,
          backgroundColor: "rgba(255,87,51,0.2)",
          borderColor: "#FF5733",
          pointBackgroundColor: "#FF5733",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "#FF5733",
        },
      ],
    });
  }, []);

  const options: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: { ticks: { beginAtZero: true } },
    },
  };

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  return (
    <Box>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <Box
          p={{ base: 2, md: 4 }}
          height="100%"
          mt={{ base: "80px", md: "130px" }}
          px={{ base: 2, md: 16 }}
        >
          <Flex
            justify="space-between"
            align="center"
            mb={8}
            flexWrap="wrap"
            direction={{ base: "column", md: "row" }}
          >
            <Flex align="center" gap={2} mb={{ base: 4, md: 0 }}>
              <Avatar
                size={{ base: "md", md: "lg" }}
                src={businessData?.business_logo}
              />
              <Box>
                <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="500">
                  {businessData?.business_name}
                </Text>
                <Text fontSize={{ base: "md", md: "lg" }} color="gray.500">
                  {businessData?.category}
                </Text>
              </Box>
            </Flex>
            <Button
              bg="black"
              size={{ base: "md", md: "lg" }}
              borderRadius="full"
              color="white"
              fontWeight="500"
              onClick={() => navigate("/add-product")}
              width={{ base: "full", md: "auto" }}
              mt={{ base: 4, md: 0 }}
            >
              Add Product
            </Button>
          </Flex>

          {/* Tabs Section */}
          <Box p={{ base: 2, md: 4 }} borderRadius="md">
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
                <Tab
                  fontSize={{ base: "md", md: "lg" }}
                  fontWeight="500"
                  color="gray.500"
                >
                  Overview
                </Tab>
                <Tab
                  fontSize={{ base: "md", md: "lg" }}
                  fontWeight="500"
                  color="gray.500"
                >
                  Inventory
                </Tab>
                <Tab
                  fontSize={{ base: "md", md: "lg" }}
                  fontWeight="500"
                  color="gray.500"
                >
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
                  <Flex
                    gap={{ base: 4, md: 12 }}
                    direction={{ base: "column", md: "column", lg: "row" }}
                  >
                    <Flex direction="column" gap={6} width="100%">
                      <Flex
                        justifyContent="space-between"
                        direction={{ base: "column", md: "row" }}
                        mb={8}
                        gap={4}
                      >
                        <StatCard
                          title="Sold"
                          value={`₦${
                            vendorOverviewData?.data?.total_unremitted || 0
                          }`}
                          growth="+0%"
                          description="Amount To Be Remitted"
                        />
                        <StatCard
                          title="On Market"
                          value={`₦${
                            vendorOverviewData?.data?.total_in_stock || 0
                          }`}
                          growth="+0%"
                          description="Amount In Stock"
                        />
                      </Flex>

                      <Box
                        flex="2"
                        mb={6}
                        width="100%"
                        border="1px"
                        borderColor="#FF5733"
                        p={{ base: 2, md: 4 }}
                        borderRadius="md"
                      >
                        <Flex
                          justifyContent="space-between"
                          alignItems="center"
                          mb={4}
                          direction={{ base: "column", md: "row" }}
                          gap={2}
                        >
                          <Text fontWeight="bold" mb={{ base: 2, md: 0 }}>
                            Income stats
                          </Text>
                          <Select
                            value={selectedTimeframe}
                            onChange={handleTimeframeChange}
                            width={{ base: "100%", md: "150px" }}
                            size="sm"
                            bg="white"
                            borderColor="gray.300"
                          >
                            <option value="YESTERDAY">Yesterday</option>
                            <option value="TODAY">Today</option>
                            <option value="THIS_WEEK">This Week</option>
                            <option value="LAST_7_DAYS">Last 7 Days</option>
                            <option value="LAST_WEEK">Last Week</option>
                            <option value="THIS_MONTH">This Month</option>
                            <option value="LAST_6_MONTHS">Last 6 Months</option>
                            <option value="LAST_12_MONTHS">
                              Last 12 Months
                            </option>
                          </Select>
                        </Flex>
                        <Box
                          height={{ base: "200px", md: "300px" }}
                          width={{ base: "100%", md: "600px" }}
                        >
                          {chartData ? (
                            <Line data={chartData} options={options} />
                          ) : (
                            <LoadingSpinner />
                          )}
                        </Box>
                      </Box>
                    </Flex>
                    <Flex
                      direction="column"
                      gap={4}
                      width="100%"
                      h="100%"
                      border="1px"
                      borderColor="gray.200"
                      p={{ base: 2, md: 4 }}
                    >
                      <Flex justify="space-between" align="center" mb={4}>
                        <Text fontSize="md" fontWeight="900">
                          Top Products
                        </Text>
                        <Flex
                          align="center"
                          color="#FF5733"
                          cursor="pointer"
                          onClick={() => navigate("/vendor-product-list")}
                        >
                          See all <Icon as={HiChevronRight} ml={1} />
                        </Flex>
                      </Flex>
                      {topProduct?.length > 0 ? (
                        topProduct?.slice(0, 4).map((product: any) => (
                          <Flex
                            key={product?._id}
                            justify="space-between"
                            align="center"
                            cursor="pointer"
                            p={3}
                            bg="white"
                            borderRadius="md"
                            direction={{ base: "column", md: "row" }}
                            gap={2}
                            onClick={() =>
                              navigate(`/vendor-product/${product?._id}`)
                            }
                          >
                            <Image
                              src={product?.images && product?.images[0]}
                              boxSize={{ base: "80px", md: "100px" }}
                              alt={product?.product_name}
                            />
                            <Box
                              flex="1"
                              ml={{ base: 0, md: 4 }}
                              textAlign={{ base: "center", md: "left" }}
                            >
                              <Text fontSize="md" fontWeight="bold" mb={2}>
                                {product?.product_name}
                              </Text>
                              <Text
                                fontSize="sm"
                                fontWeight="bold"
                                mb={2}
                                color="gray.05"
                              >
                                Status:{" "}
                                <Text
                                  color={
                                    product?.status === "PENDING"
                                      ? "yellow.500"
                                      : product?.status === "APPROVED"
                                      ? "green.500"
                                      : product?.status === "DECLINED"
                                      ? "red.500"
                                      : "gray.500"
                                  }
                                >
                                  {product?.status}
                                </Text>
                              </Text>
                              <Text
                                fontSize="sm"
                                fontWeight="bold"
                                color="gray.500"
                              >
                                Price:{" "}
                                {product?.raw_price
                                  ? `₦${product?.raw_price}`
                                  : "N/A"}
                              </Text>
                            </Box>
                            <Button
                              size="sm"
                              variant="outline"
                              fontWeight="500"
                              width={{ base: "100%", md: "auto" }}
                            >
                              {`${product?.product_quantity} in stock`}
                            </Button>
                          </Flex>
                        ))
                      ) : (
                        <Text>No top products available.</Text>
                      )}
                    </Flex>
                  </Flex>
                  <Box
                    bg="white"
                    border="1px"
                    borderColor="gray.200"
                    borderRadius="md"
                    p={{ base: 2, md: 4 }}
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
                          <Th>Order Date</Th>
                          <Th>Products</Th>
                          <Th>Status</Th>
                          <Th>Action</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {leastOrder?.length > 0 ? (
                          leastOrder?.map((order: any) => (
                            <Tr key={order?._id}>
                              <Td>{order?.tracking_id}</Td>
                              <Td>
                                {new Date(
                                  order?.createdAt
                                ).toLocaleDateString()}
                              </Td>
                              <Td>{order?.items?.length}</Td>
                              <Td
                                color={
                                  order?.status === "DELIVERED"
                                    ? "green.500"
                                    : order?.status === "CANCELED"
                                    ? "red.500"
                                    : "yellow.500"
                                }
                              >
                                {order.status.replace("_", " ")}
                              </Td>
                              <Td>
                                <Button
                                  size={buttonSize}
                                  onClick={() => handleProductClick(order?._id)}
                                >
                                  View
                                </Button>
                              </Td>
                            </Tr>
                          ))
                        ) : (
                          <Tr>
                            <Td colSpan={6} textAlign="center">
                              No least order available
                            </Td>
                          </Tr>
                        )}
                      </Tbody>
                    </Table>
                    <Box px={4} pt={8}>
                      <PaginationControls
                        currentPage={ordersByVendorPagination.currentPage}
                        totalPages={ordersByVendorPagination.totalPages}
                        onPageChange={handlePageChange}
                        hasNextPage={ordersByVendorPagination.hasNextPage}
                      />
                    </Box>
                  </Box>
                </TabPanel>
                {/* Additional TabPanels for Inventory and Transactions */}
                {/* TabPanel for Transactions */}
                <TabPanel>
                  {/* <TransactionsTable transactions={transactions} /> */}
                  {/* <Text>inventory</Text> */}
                  <VendorInventory />
                </TabPanel>
                {/* TabPanel for Transactions */}
                <TabPanel>
                  <VendorTransactions
                    transactions={allTransactionLogs}
                    currentPage={transactionLogsPagination.currentPage}
                    totalPages={transactionLogsPagination.totalPages}
                    onPageChange={handlePageChange}
                    hasNextPage={transactionLogsPagination.hasNextPage}
                  />
                  {/* <Text>transactions</Text> */}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      )}
    </Box>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  growth: string;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  growth,
  description,
}) => {
  return (
    <Box
      p={4}
      bg="white"
      rounded="lg"
      borderWidth="1px"
      textAlign="center"
      width="100%"
    >
      <Text fontWeight="medium" fontSize="16px" color="gray.500" mb={2}>
        {title}
      </Text>
      <Stat>
        <StatNumber fontSize="30px">{value}</StatNumber>
        <StatHelpText color={growth.startsWith("+") ? "green.500" : "red.500"}>
          {growth}
        </StatHelpText>
      </Stat>
      <Text color="gray.400" mt={2}>
        {description}
      </Text>
    </Box>
  );
};

export default VendorOverview;
