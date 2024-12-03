import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../../services/axios";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

export const useOrder = () => {
  const toast = useToast();
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
    onSuccess: () => {
      toast({
        title: "Order Created",
        description: "Your custom order has been created successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Error Creating Order",
        description: "An error occurred while creating your order.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const {
    mutate: addNewOrderMutation,
    isPending: isAddingOrder,
    isSuccess: addOrderSuccess,
    error: addOrderError,
  } = useMutation({
    mutationFn: addNewOrder,
    onSuccess: (res) => {
      setNewOrderResponse(res);
      toast({
        title: "Order Added",
        description: "Your new order has been added successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Error Adding Order",
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
    onError: (error) => {
      toast({
        title: "Error Generating Payment Link",
        description: "An error occurred while generating your payment link.",
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
    queryKey: ["fetchOrders"],
    queryFn: () => fetchOrders(10, 1, "CUSTOM"),
    enabled: isAuthenticated || isVendorAuthenticated,
    retry: false,
  });

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
    states,
    isFetchingStates,
    fetchStatesError,
    cities,
    isFetchingCities,
    fetchCitiesError,
    newOrderResponse,
  };
};
