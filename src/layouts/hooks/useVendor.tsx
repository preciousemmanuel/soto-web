import { useToast } from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../../services/axios";
import debounce from 'lodash/debounce';

export const useVendor = () => {
  const toast = useToast();
  const [search, setSearch] = useState("");
  const [selectedTimeframe, setSelectedTimeframe] = useState("THIS_MONTH");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const [isVendorAuthenticated] = useState(() => {
    return !!localStorage.getItem("vendorToken");
  });

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const debouncedSearch = useCallback(
    debounce((searchTerm: string) => {
      setDebouncedSearchTerm(searchTerm);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(search);
    return () => {
      debouncedSearch.cancel();
    };
  }, [search, debouncedSearch]);

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
      `/order/fetch/by-vendor-new?limit=${limit}&page=${page}`
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

  const fetchNotifications = async (limit: number, page: number) => {
    const response = await apiClient.get(
      `/notification/fetch?limit=${limit}&page=${page}`
    );
    return response.data;
  };

  const markNotificationAsRead = async (id: string) => {
    const response = await apiClient.put(`/notification/mark-as-read/${id}`);
    return response.data;
  };

  const useMarkNotificationAsRead = useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      toast({
        title: "Notification marked as read",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Error marking notification as read",
        status: "error", 
        duration: 2000,
        isClosable: true,
      });
    }
  });

  const fetchBanks = async (limit: number, page: number) => {
    const response = await apiClient.get(
      `/business/fetch-banks?limit=${limit}&page=${page}`
    );
    return response.data;
  };

  const {
    data: banks,
    isLoading: isLoadingBanks,
    isError: isErrorBanks,
    refetch: refetchBanks,
  } = useQuery({
    queryKey: ["banks", { limit: 20, page: 1}],
    queryFn: () => fetchBanks(179, currentPage),
    enabled: isVendorAuthenticated,
    retry: true,
  });

  const {
    data: notifications,
    isLoading: isLoadingNotifications,
    isError: isErrorNotifications,
  } = useQuery({
    queryKey: ["notifications", currentPage, itemsPerPage],
    queryFn: () => fetchNotifications(itemsPerPage, currentPage),
    enabled: isVendorAuthenticated,
    retry: false,
  });

  const getMyBankDetails = async () => {
    try {
      const response = await apiClient.get(`/business/get-my-bank-details`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const useGetMyBankDetails = useQuery({
    queryKey: ["get-my-bank-details"],
    queryFn: getMyBankDetails,
    enabled: isVendorAuthenticated,
    retry: false,
  });

  const addMyBankDetails = async (bankDetails: any) => {
    try {
      const response = await apiClient.post(`/business/add-my-bank-details`, bankDetails);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const useAddMyBankDetails = useMutation({
    mutationFn: addMyBankDetails,
    onSuccess: (res) => {
      toast({
        title: "Bank Details Added",
        description: "Your bank details have been added successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (error) => {
      console.log(error)
      toast({
        title: "Error Adding Bank Details",
        description: "An error occurred while adding your bank details.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const makeWithdrawalRequest = async (withdrawalDetails: any) => {
    try {
      const response = await apiClient.post(`/business/make-withdrawal-request`, withdrawalDetails);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const useMakeWithdrawalRequest = useMutation({
    mutationFn: makeWithdrawalRequest,
    onSuccess: (res) => {
      toast({
        title: "Withdrawal Request Sent",
        description: "Your withdrawal request has been sent successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (error:any) => {
      toast({
        title: `${error?.response?.data?.message}`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const {
    data: vendorOverviewData,
    isLoading: isLoadingVendorOverview,
    isError: isErrorVendorOverview,
  } = useQuery({
    queryKey: ["vendorOverview", { time_frame: selectedTimeframe }],
    queryFn: () => fetchVendorOverview(selectedTimeframe),
    enabled: isVendorAuthenticated,
    retry: false,
  });

  const {
    data: ordersByVendor,
    isLoading: isLoadingOrdersByVendor,
    isError: isErrorOrdersByVendor,
  } = useQuery({
    queryKey: ["ordersByVendor", currentPage, itemsPerPage],
    queryFn: () => fetchOrdersByVendor(itemsPerPage, currentPage),
    enabled: isVendorAuthenticated,
    retry: false,
  });

  const {
    data: topProductsByVendor,
    isLoading: isLoadingTopProductsByVendor,
    isError: isErrorTopProductsByVendor,
  } = useQuery({
    queryKey: ["topProductsByVendor",  currentPage, itemsPerPage],
    queryFn: () => fetchTopProductsByVendor(itemsPerPage, currentPage),
    enabled: isVendorAuthenticated,
    retry: false,
  });

  const {
    data: allProductsByVendor,
    isLoading: isLoadingAllProductsByVendor,
    isError: isErrorAllProductsByVendor,
  } = useQuery({
    queryKey: ["allTopProductsByVendor", currentPage, itemsPerPage],
    queryFn: () => fetchTopProductsByVendor(itemsPerPage, currentPage),
    enabled: isVendorAuthenticated,
    retry: false,
  });

  const {
    data: transactionLogs,
    isLoading: isLoadingTransactionLogs,
    isError: isErrorTransactionLogs,
  } = useQuery({
    queryKey: ["transactionLogs", currentPage, itemsPerPage],
    queryFn: () => fetchTransactionLogs(itemsPerPage, currentPage),
    enabled:  isVendorAuthenticated,
    retry: false,
  });

  const {
    data: vendorInventory,
    isLoading: isLoadingVendorInventory,
    isError: isErrorVendorInventory,
  } = useQuery({
    queryKey: ["vendorInventory", currentPage, itemsPerPage],
    queryFn: () => fetchVendorInventory(itemsPerPage, currentPage),
    enabled: isVendorAuthenticated,
    retry: false,
  });

  const {
    data: salesAnalytics,
    isLoading: isLoadingSalesAnalytics,
    isError: isErrorSalesAnalytics,
  } = useQuery({
    queryKey: ["salesAnalytics"],
    queryFn: fetchSalesAnalytics,
    enabled:  isVendorAuthenticated,
    retry: false,
  });

  const {
    data: myBankDetails,
    isLoading: isLoadingMyBankDetails,
    isError: isErrorMyBankDetails,
    refetch: refetchMyBankDetails
  } = useGetMyBankDetails;

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return {
    vendorOverviewData,
    isLoading:
      isLoadingVendorOverview ||
      isLoadingOrdersByVendor ||
      isLoadingTopProductsByVendor ||
      isLoadingTransactionLogs ||
      isLoadingVendorInventory ||
      isLoadingSalesAnalytics ||
      isLoadingBanks ||
      isLoadingMyBankDetails ||
      isLoadingNotifications,
    isError:
      isErrorVendorOverview ||
      isErrorOrdersByVendor ||
      isErrorTopProductsByVendor ||
      isErrorTransactionLogs ||
      isErrorVendorInventory ||
      isErrorSalesAnalytics ||
      isErrorBanks ||
      isErrorMyBankDetails ||
      isErrorNotifications,
    ordersByVendor,
    topProductsByVendor,
    transactionLogs,
    vendorInventory,
    salesAnalytics,
    banks,
    notifications,
    selectedTimeframe,
    setSelectedTimeframe,
    allProductsByVendor,
    isLoadingAllProductsByVendor,
    isErrorAllProductsByVendor,
    isLoadingBanks,
    isErrorBanks,
    refetchBanks,
    search,
    setSearch,
    useAddMyBankDetails,
    myBankDetails,
    isLoadingMyBankDetails,
    isErrorMyBankDetails,
    useMakeWithdrawalRequest,
    refetchMyBankDetails,
    handlePageChange,
    handleItemsPerPageChange,
    setCurrentPage,
    setItemsPerPage,
    useMarkNotificationAsRead,
    ordersByVendorPagination: {
      currentPage: ordersByVendor?.data?.pagination?.currentPage || 1,
      totalPages: ordersByVendor?.data?.pagination?.pageCount || 1,
      totalItems: ordersByVendor?.data?.pagination?.totalCount || 0,
      pageSize: ordersByVendor?.data?.pagination?.pageSize || 10,
      hasNextPage: ordersByVendor?.data?.pagination?.hasNext || false,
    },
    transactionLogsPagination: {
      currentPage: transactionLogs?.data?.pagination?.currentPage || 1,
      totalPages: transactionLogs?.data?.pagination?.pageCount || 1,
      totalItems: transactionLogs?.data?.pagination?.totalCount || 0,
      pageSize: transactionLogs?.data?.pagination?.pageSize || 10,
      hasNextPage: transactionLogs?.data?.pagination?.hasNext || false,
    },
    vendorInventoryPagination: {
      currentPage: vendorInventory?.data?.pagination?.currentPage || 1,
      totalPages: vendorInventory?.data?.pagination?.pageCount || 1,
      totalItems: vendorInventory?.data?.pagination?.totalCount || 0,
      pageSize: vendorInventory?.data?.pagination?.pageSize || 10,
      hasNextPage: vendorInventory?.data?.pagination?.hasNext || false,
    },
    allProductsByVendorPagination: {
      currentPage: allProductsByVendor?.data?.pagination?.currentPage || 1,
      totalPages: allProductsByVendor?.data?.pagination?.pageCount || 1,
      totalItems: allProductsByVendor?.data?.pagination?.totalCount || 0,
      pageSize: allProductsByVendor?.data?.pagination?.pageSize || 10,
      hasNextPage: allProductsByVendor?.data?.pagination?.hasNext || false,
    },
    notificationsPagination: {
      currentPage: notifications?.data?.pagination?.currentPage || 1,
      totalPages: notifications?.data?.pagination?.pageCount || 1,
      totalItems: notifications?.data?.pagination?.totalCount || 0,
      pageSize: notifications?.data?.pagination?.pageSize || 10,
      hasNextPage: notifications?.data?.pagination?.hasNext || false,
    },
  };
};
