import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../../services/axios";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

export const useOrder = () => {
  const toast = useToast();
  const [shippingRate, setShippingRate] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const clearCart = () => {
    localStorage.removeItem("cart");
  };
  const [newOrderResponse, setNewOrderResponse] = useState<any>(null);
  const [isAuthenticated] = useState(() => {
    return !!(
      localStorage.getItem("userToken") || localStorage.getItem("token")
    );
  });

  const [isVendorAuthenticated] = useState(() => {
    return !!localStorage.getItem("vendorToken");
  });

  const createCustomOrder = async (orderData: any): Promise<any> => {
    try {
      const response = await apiClient.post("/order/create-custom", orderData);
      if (!response || !response.data) {
        return [];
      }
      return response.data;
    } catch (error) {
      return [];
    }
  };

  const addNewOrder = async (orderData: any): Promise<any> => {
    try {
      const response = await apiClient.post("/order/create", orderData);
      if (!response || !response.data) {
        return [];
      }
      return response.data;
    } catch (error) {
      return [];
    }
  };

  const generatePaymentLink = async (orderData: any): Promise<any> => {
    try {
      const response = await apiClient.post(
        "/transaction/generate-payment-link",
        orderData
      );
      if (!response || !response.data) {
        return [];
      }
      return response.data;
    } catch (error) {
      return [];
    }
  };

  const generateShippingRate = async (orderData: any): Promise<any> => {
    try {
      const response = await apiClient.post(
        "/delivery/agility-get-price",
        orderData
      );
      if (!response || !response.data) {
        return [];
      }
      return response.data;
    } catch (error) {
      return [];
    }
  };

  const fetchOrders = async (
    limit: number,
    page: number,
    status: string
  ): Promise<any> => {
    const response = await apiClient.get(
      `/order/fetch/by-buyer?limit=${limit}&page=${page}&status=${status}`
    );
    return response.data;
  };

  const fetchVendorOrders = async (
    limit: number,
    page: number,
    status: string
  ): Promise<any> => {
    const response = await apiClient.get(
      `/order/fetch/by-vendor-new?limit=${limit}&page=${page}&status=${status}`
    );
    return response.data;
  };

  const fetchOneOrder = async (orderId: string): Promise<{ data: any }> => {
    const response = await apiClient.get(`/order/view-one/${orderId}`);
    return response.data;
  };

  const fetchOneVendorOrder = async (orderId: string): Promise<{ data: any }> => {
    const response = await apiClient.get(`/order/view-one-by-vendor/${orderId}`);
    return response.data;
  };

  const fetchStates = async (): Promise<any> => {
    const response = await apiClient.get("/delivery/get-states");
    return response.data;
  };

  const fetchCities = async (
    countryCode: string,
    stateCode: string
  ): Promise<any> => {
    const response = await apiClient.get(
      `/delivery/get-cities?country_code=${countryCode}&state_code=${stateCode}`
    );
    return response.data;
  };

  const {
    mutate: createCustomOrders,
    isPending: isCreatingOrder,
    isSuccess: orderSuccess,
    error: createCustomOrderError,
  } = useMutation({
    mutationFn: createCustomOrder,
    onSuccess: (response) => {
      if (!response || response.length === 0) {
        toast({
          title: "Error Creating Order",
          description: "Unable to create your order. Please try again.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        return;
      }
      toast({
        title: `${response?.message}`,
        description: "Your custom order has been created successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      toast({
        title: `${error?.response?.data?.message}`,
        description:
          error?.message || "An error occurred while creating your order.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const {
    mutate: addNewOrderMutation,
    isPending: isAddingOrder,
    isError: addOrderError,
    isSuccess: addOrderSuccess,
  } = useMutation({
    mutationFn: addNewOrder,
    onSuccess: (res) => {
      toast({
        title: `${res?.message}`,
        description: "Your new order has been added successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      setNewOrderResponse(res);
    },
    onError: (error:any) => {
      toast({
        title: `${error?.response?.data?.message}`,
        description: "An error occurred while adding your order.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const {
    mutate: generatePaymentLinkMutation,
    isPending: isGeneratingPaymentLink,
    isSuccess: generatePaymentLinkSuccess,
    error: generatePaymentLinkError,
  } = useMutation({
    mutationFn: generatePaymentLink,
    onSuccess: (res) => {
      // console.log(res);
      if (res?.data?.data && res?.data?.data?.authorization_url) {
        clearCart();
        window.location.href = res?.data?.data?.authorization_url;
      } else {
        toast({
          title: "Error",
          description: "No authorization URL returned.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    },
    onError: (error:any) => {
      toast({
        title: `${error?.response?.data?.message}`,
        description: "An error occurred while generating your payment link.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const {
    mutate: generateShippingRateMutation,
    isPending: isShippingRateLink,
    isSuccess: shippingRateSuccess,
    error: shippingRateError,
  } = useMutation({
    mutationFn: generateShippingRate,
    onSuccess: (res) => {
      setShippingRate(res?.data?.shipping_cost);
    },
    onError: (error:any) => {
      toast({
        title: `${error?.response?.data?.message}`,
        description: "An error occurred while generating your shipping rate.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  

  const {
    data: orders,
    isLoading: isFetchingOrders,
    error: fetchOrdersError,
    refetch: refetchOrders,
  } = useQuery({
    queryKey: ["fetchOrders", currentPage, itemsPerPage],
    queryFn: () => fetchOrders(itemsPerPage, currentPage, ""),
    enabled: isAuthenticated,
    retry: false,
  });

  const {
    data: customOrdersData,
    isLoading: isFetchingCustomOrders,
    error: fetchCustomOrdersError,
    refetch: refetchCustomOrders,
  } = useQuery({
    queryKey: ["customOrders", currentPage, itemsPerPage],
    queryFn: () => fetchOrders(itemsPerPage, currentPage, "CUSTOM"),
    enabled: isAuthenticated,
    retry: false,
  });

  const {
    data: ordersVendor,
    isLoading: isFetchingOrdersVendor,
    error: fetchOrdersErrorVendor,
    refetch: refetchOrdersVendor,
  } = useQuery({
    queryKey: ["fetchOrdersVendor", currentPage, itemsPerPage],
    queryFn: () => fetchVendorOrders(itemsPerPage, currentPage, status),
    enabled: isVendorAuthenticated,
    retry: false,
  });

  const useSingleOrder = (orderId: string) => {
    return useQuery({
      queryKey: ["buyer-orders", orderId],
      queryFn: () => fetchOneOrder(orderId),
      enabled: isAuthenticated || isVendorAuthenticated,
    });
  };

  const useSingleVendorOrder = (orderId: string) => {
    return useQuery({
      queryKey: ["vendor-orders", orderId],
      queryFn: () => fetchOneVendorOrder(orderId),
      enabled: (isVendorAuthenticated),
    });
  };

  const {
    data: states,
    isLoading: isFetchingStates,
    error: fetchStatesError,
  } = useQuery({
    queryKey: ["fetchStates"],
    queryFn: fetchStates,
    retry: false,
  });

  const {
    data: cities,
    isLoading: isFetchingCities,
    error: fetchCitiesError,
  } = useQuery({
    queryKey: ["fetchCities"],
    queryFn: () => fetchCities("NG", "LA"),
    retry: false,
  });

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return {
    createCustomOrders,
    isCreatingOrder,
    createCustomOrderError,
    orderSuccess,
    addNewOrderMutation,
    isAddingOrder,
    addOrderSuccess,
    addOrderError,
    generatePaymentLinkMutation,
    isGeneratingPaymentLink,
    generatePaymentLinkSuccess,
    generatePaymentLinkError,
    orders,
    isFetchingOrders,
    fetchOrdersError,
    refetchOrders,
    ordersVendor,
    isFetchingOrdersVendor,
    fetchOrdersErrorVendor,
    refetchOrdersVendor,
    states,
    isFetchingStates,
    fetchStatesError,
    cities,
    isFetchingCities,
    fetchCitiesError,
    newOrderResponse,
    useSingleOrder,
    generateShippingRateMutation,
    isShippingRateLink,
    shippingRateSuccess,
    shippingRateError,
    shippingRate,
    customOrdersData,
    isFetchingCustomOrders,
    fetchCustomOrdersError,
    clearCart,
    refetchCustomOrders,
    useSingleVendorOrder,
    customOrdersDataPagination: {
      currentPage: customOrdersData?.data?.pagination?.currentPage || 1,
      totalPages: customOrdersData?.data?.pagination?.pageCount || 1,
      totalItems: customOrdersData?.data?.pagination?.totalCount || 0,
      pageSize: customOrdersData?.data?.pagination?.pageSize || 10,
      hasNextPage: customOrdersData?.data?.pagination?.hasNext || false,
    },
    ordersPagination: {
      currentPage: orders?.data?.pagination?.currentPage || 1,
      totalPages: orders?.data?.pagination?.pageCount || 1,
      totalItems: orders?.data?.pagination?.totalCount || 0,
      pageSize: orders?.data?.pagination?.pageSize || 10,
      hasNextPage: orders?.data?.pagination?.hasNext || false,
    },
    ordersVendorPagination: {
      currentPage: ordersVendor?.data?.pagination?.currentPage || 1,
      totalPages: ordersVendor?.data?.pagination?.pageCount || 1,
      totalItems: ordersVendor?.data?.pagination?.totalCount || 0,
      pageSize: ordersVendor?.data?.pagination?.pageSize || 10,
      hasNextPage: ordersVendor?.data?.pagination?.hasNext || false,
    },
    handlePageChange,
    handleItemsPerPageChange,
    setCurrentPage,
    setItemsPerPage,
  };
};
