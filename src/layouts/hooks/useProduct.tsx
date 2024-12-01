import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../../services/axios";
import { CartItem } from "../pages/_subpages/CategoriesSection";
import { useToast } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

interface Category {
  _id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
export interface Product {
  _id?: string;
  product_name?: string;
  description?: string;
  category?: Category;
  images?: string[];
  vendor?: string;
  unit_price?: number;
  product_quantity?: number;
  total_quantity_sold?: number;
  height?: number;
  width?: number;
  weight?: number;
  discount_price?: number;
  is_discounted?: boolean;
  in_stock?: boolean;
  is_verified?: boolean;
  is_deleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  favourite?: boolean;
}

interface ProductResponse {
  data: {
    data: Product[];
    total: number;
  };
}

export const useProduct = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const fetchProducts = async (
    limit: number,
    page: number,
    status: string
  ): Promise<ProductResponse> => {
    const response = await apiClient.get(
      `/product/fetch?limit=${limit}&page=${page}&fetch_type=${status}`
    );
    return response.data;
  };
  const {
    data: PopluarProducts,
    isLoading: PopluarProductsLoading,
    error: PopluarProductsError,
    // refetch,
  } = useQuery({
    queryKey: ["PopluarProducts"],
    queryFn: () => fetchProducts(5, 1, "POPULAR"),
  });

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(10, 1, ""),
  });

  const fetchSingleProduct = async (
    productId: string
  ): Promise<{ data: any }> => {
    const response = await apiClient.get(`/product/view-one/${productId}`);
    return response.data;
  };

  const useSingleProduct = (productId: string) => {
    return useQuery({
      queryKey: ["product", productId],
      queryFn: () => fetchSingleProduct(productId),
      enabled: !!productId,
    });
  };

  const addToWishlist = async (productId: string) => {
    try {
      const response = await apiClient.post(
        `/product/add-to-wishlist/${productId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      const response = await apiClient.delete(
        `/product/add-to-wishlist/${productId}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const fetchWishlist = async (limit: number, page: number) => {
    try {
      const response = await apiClient.get(
        `/product/fetch-wishlist?limit=${limit}&page=${page}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const useWishlist = (limit: number, page: number) => {
    return useQuery({
      queryKey: ["wishlist", limit, page],
      queryFn: () => fetchWishlist(limit, page),
      enabled: !!limit && !!page,
    });
  };

  const addMutation = useMutation({
    mutationFn: (productId: string) => addToWishlist(productId),
    onSuccess: () => {
      toast({
        title: "Added to Wishlist",
        description: "Product has been added to your wishlist",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Error Adding to Wishlist",
        description:
          "An error occurred while adding the product to your wishlist.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const removeMutation = useMutation({
    mutationFn: (productId: string) => removeFromWishlist(productId),
    onSuccess: () => {
      toast({
        title: "Removed from Wishlist",
        description: "Product has been removed from your wishlist",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (error) => {
      toast({
        title: "Error Removing from Wishlist",
        description:
          "An error occurred while removing the product from your wishlist.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const handleAddToCart = (productId: string) => {
    const existingCart = localStorage.getItem("cart");
    let cartItems: CartItem[] = existingCart ? JSON.parse(existingCart) : [];

    const productToAdd = products?.data?.data?.find(
      (p: any) => p._id === productId
    );
    if (!productToAdd) return;

    const existingItemIndex = cartItems.findIndex(
      (item) => item.productId === productId
    );

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push({
        productId,
        productName: productToAdd.product_name ?? "",
        price: productToAdd.unit_price ?? 0,
        image: productToAdd.images?.[0] ?? "",
        quantity: 1,
      });
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleRemoveFromCart = (productId: string) => {
    const existingCart = localStorage.getItem("cart");
    let cartItems: CartItem[] = existingCart ? JSON.parse(existingCart) : [];

    const indexToRemove = cartItems.findIndex(
      (item) => item.productId === productId
    );

    if (indexToRemove !== -1) {
      cartItems.splice(indexToRemove, 1);
      localStorage.setItem("cart", JSON.stringify(cartItems));
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };
  const createProductFormData = (
    data: Record<string, any>,
    images: FileList
  ): FormData => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    Array.from(images).forEach((image, index) => {
      formData.append(`images`, image);
    });

    return formData;
  };

  const addNewProductApiCall = async (formData: FormData): Promise<Product> => {
    try {
      const response = await apiClient.post<Product>(
        `/product/add-new`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unexpected error occurred while adding the product");
    }
  };

  const useAddNewProduct = useMutation<Product, Error, FormData>({
    mutationFn: addNewProductApiCall,
    onSuccess: (data) => {
      toast({
        title: "Product Added",
        description: "Product has been added successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/alert-success");
    },
    onError: (error) => {
      toast({
        title: "Error Adding Product",
        description: error?.message || "An unknown error occurred",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const fetchCategories = async (limit: number, page: number) => {
    try {
      const response = await apiClient.get(
        `/category/fetch?limit=${limit}&page=${page}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const { data: categories } = useQuery({
    queryKey: ["categories", 10, 1],
    queryFn: () => fetchCategories(10, 1),
  });

  return {
    useWishlist,
    addToWishlist: addMutation.mutate,
    removeFromWishlist: removeMutation.mutate,
    categories,
    isLoading:
      productsLoading ||
      addMutation.isPending ||
      removeMutation.isPending ||
      useAddNewProduct.isPending,
    error:
      productsError ||
      addMutation.error ||
      removeMutation.error ||
      useAddNewProduct.error,
    handleAddToCart,
    handleRemoveFromCart,
    products: products?.data?.data || [],
    total: products?.data?.total || 0,
    refetch,
    useSingleProduct,
    popluarProducts: PopluarProducts?.data?.data || [],
    PopluarProductsLoading,
    PopluarProductsError,
    createProductFormData,
    useAddNewProduct,
  };
};
