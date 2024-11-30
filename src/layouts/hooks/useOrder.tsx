import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../../services/axios";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

export const useOrder = () => {
  const toast = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!(
      localStorage.getItem("userToken") || localStorage.getItem("token")
    );
  });

  const [isVendorAuthenticated, setIsVendorAuthenticated] = useState(() => {
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

  const fetchOrders = async (
    limit: number,
    page: number,
    status: string
  ): Promise<any> => {
    const response = await apiClient.get(
      `/order/fetch/by-buyer?limit=${limit}&page=${page}&status=${status}`
    );
    // console.log(response, "the order");
    return response.data;
  };

  const {
    mutate: createOrder,
    isPending: isCreatingOrder,
    isSuccess: orderSuccess,
    error: createOrderError,
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

  return {
    createOrder,
    isCreatingOrder,
    createOrderError,
    orderSuccess,
    orders,
    isFetchingOrders,
    fetchOrdersError,
    refetchOrders,
  };
};
