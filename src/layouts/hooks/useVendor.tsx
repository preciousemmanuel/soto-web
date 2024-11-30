import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../services/axios";

export const useVendor = () => {
  const toast = useToast();
  const [selectedTimeframe, setSelectedTimeframe] = useState("THIS_MONTH");
  const [isAuthenticated] = useState(() => {
    return !!(
      localStorage.getItem("userToken") || localStorage.getItem("token")
    );
  });

  const [isVendorAuthenticated] = useState(() => {
    return !!localStorage.getItem("vendorToken");
  });

  const fetchVendorOverview = async (timeframe: string) => {
    const response = await apiClient.get(
      `/user/vendor-overview?time_frame=${timeframe}`
    );
    return response.data;
  };

  useEffect(() => {
    fetchVendorOverview(selectedTimeframe);
  }, [selectedTimeframe]);

  const fetchOrdersByVendor = async (limit: number, page: number) => {
    const response = await apiClient.get(
      `/order/fetch/by-vendor?limit=${limit}&page=${page}`
    );
    return response.data;
  };

  const fetchTopProductsByVendor = async (limit: number, page: number) => {
    const response = await apiClient.get(
      `/product/vendor-fetch?limit=${limit}&page=${page}`
    );
    return response.data;
  };

  const fetchTransactionLogs = async (limit: number, page: number) => {
    const response = await apiClient.get(
      `/transaction/logs?limit=${limit}&page=${page}`
    );
    return response.data;
  };

  const fetchVendorInventory = async (limit: number, page: number) => {
    const response = await apiClient.get(
      `/user/vendor-inventory?limit=${limit}&page=${page}`
    );
    return response.data;
  };

  const fetchSalesAnalytics = async () => {
    const response = await apiClient.get(`/user/sales-analytics`);
    return response.data;
  };

  const {
    data: vendorOverviewData,
    isLoading: isLoadingVendorOverview,
    isError: isErrorVendorOverview,
  } = useQuery({
    queryKey: ["vendorOverview", { time_frame: selectedTimeframe }],
    queryFn: () => fetchVendorOverview(selectedTimeframe),
    enabled: isAuthenticated || isVendorAuthenticated,
    retry: false,
  });

  const {
    data: ordersByVendor,
    isLoading: isLoadingOrdersByVendor,
    isError: isErrorOrdersByVendor,
  } = useQuery({
    queryKey: ["ordersByVendor", { limit: 4, page: 1 }],
    queryFn: () => fetchOrdersByVendor(4, 1),
    enabled: isAuthenticated || isVendorAuthenticated,
    retry: false,
  });

  const {
    data: topProductsByVendor,
    isLoading: isLoadingTopProductsByVendor,
    isError: isErrorTopProductsByVendor,
  } = useQuery({
    queryKey: ["topProductsByVendor", { limit: 5, page: 1 }],
    queryFn: () => fetchTopProductsByVendor(5, 1),
    enabled: isVendorAuthenticated,
    retry: false,
  });

  const {
    data: allProductsByVendor,
    isLoading: isLoadingAllProductsByVendor,
    isError: isErrorAllProductsByVendor,
  } = useQuery({
    queryKey: ["topProductsByVendor", { limit: 10, page: 1 }],
    queryFn: () => fetchTopProductsByVendor(10, 1),
    enabled: isVendorAuthenticated,
    retry: false,
  });

  const {
    data: transactionLogs,
    isLoading: isLoadingTransactionLogs,
    isError: isErrorTransactionLogs,
  } = useQuery({
    queryKey: ["transactionLogs", { limit: 10, page: 1 }],
    queryFn: () => fetchTransactionLogs(10, 1),
    enabled: isAuthenticated || isVendorAuthenticated,
    retry: false,
  });

  const {
    data: vendorInventory,
    isLoading: isLoadingVendorInventory,
    isError: isErrorVendorInventory,
  } = useQuery({
    queryKey: ["vendorInventory", { limit: 10, page: 1 }],
    queryFn: () => fetchVendorInventory(10, 1),
    enabled: isAuthenticated || isVendorAuthenticated,
    retry: false,
  });

  const {
    data: salesAnalytics,
    isLoading: isLoadingSalesAnalytics,
    isError: isErrorSalesAnalytics,
  } = useQuery({
    queryKey: ["salesAnalytics"],
    queryFn: fetchSalesAnalytics,
    enabled: isAuthenticated || isVendorAuthenticated,
    retry: false,
  });

  return {
    vendorOverviewData,
    isLoading:
      isLoadingVendorOverview ||
      isLoadingOrdersByVendor ||
      isLoadingTopProductsByVendor ||
      isLoadingTransactionLogs ||
      isLoadingVendorInventory ||
      isLoadingSalesAnalytics,
    isError:
      isErrorVendorOverview ||
      isErrorOrdersByVendor ||
      isErrorTopProductsByVendor ||
      isErrorTransactionLogs ||
      isErrorVendorInventory ||
      isErrorSalesAnalytics,
    ordersByVendor,
    topProductsByVendor,
    transactionLogs,
    vendorInventory,
    salesAnalytics,
    selectedTimeframe,
    setSelectedTimeframe,
    allProductsByVendor,
    isLoadingAllProductsByVendor,
    isErrorAllProductsByVendor,
  };
};
