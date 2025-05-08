import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../../services/axios";
import { CartItem } from "../pages/_subpages/CategoriesSection";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
  raw_price?: number;
  is_discounted?: boolean;
  in_stock?: boolean;
  is_verified?: boolean;
  is_deleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
  favourite?: boolean;
  status?: any;
}

interface ProductResponse {
  data: {
    data: Product[];
    pagination: {
      currentPage: number;
      hasNext: boolean;
      pageCount: number;
      pageSize: number;
      totalCount: number;
    };
  };
}

export const useProduct = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [productCategoryData, setProductCategoryData] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const fetchProducts = async (
    limit: number,
    page: number,
    status: string,
    categoryId: string,
    productName?: string
  ): Promise<ProductResponse> => {
    let url = `/product/fetch?limit=${50}&page=${page}`;

    if (status) url += `&fetch_type=${status}`;
    if (categoryId) url += `&category=${categoryId}`;
    if (productName) url += `&product_name=${encodeURIComponent(productName)}`;

    const response = await apiClient.get(url);
    return response.data;
  };

  const {
    data: PopularProducts,
    isLoading: PopularProductsLoading,
    error: PopularProductsError,
  } = useQuery({
    queryKey: ["PopularProducts", currentPage, itemsPerPage],
    queryFn: () => fetchProducts(20, currentPage, "POPULAR", ""),
    enabled: true,
    retry: false,
  });

  const {
    data: products,
    isLoading: productsLoading,
    error: productsError,
    refetch,
  } = useQuery({
    queryKey: ["products", currentPage, itemsPerPage],
    queryFn: () => fetchProducts(20, currentPage, "", ""),
    enabled: true,
    retry: false,
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
      retry: false,
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

  // const removeFromWishlist = async (productId: string) => {
  //   try {
  //     const response = await apiClient.delete(
  //       `/product/add-to-wishlist/${productId}`
  //     );
  //     return response.data;
  //   } catch (error) {
  //     throw error;
  //   }
  // };

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

  const useWishlist = (
    limit: number = itemsPerPage,
    page: number = currentPage
  ) => {
    return useQuery({
      queryKey: ["wishlist", limit, page],
      queryFn: () => fetchWishlist(limit, page),
      enabled: !!limit && !!page,
      retry: false,
    });
  };

  const addMutation = useMutation({
    mutationFn: (productId: string) => addToWishlist(productId),
    onSuccess: (response) => {
      toast({
        title: `${response?.message}`,
        description: "Product has been added to your wishlist",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      toast({
        title: `${error.response?.data?.message}`,
        description:
          "An error occurred while adding the product to your wishlist.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  // const removeMutation = useMutation({
  //   mutationFn: (productId: string) => removeFromWishlist(productId),
  //   onSuccess: (response) => {
  //     console.log(response,"new")
  //     toast({
  //       title: `${response?.message}`,
  //       description: "Product has been removed from your wishlist",
  //       status: "success",
  //       duration: 2000,
  //       isClosable: true,
  //     });
  //   },
  //   onError: (error:any) => {
  //     toast({
  //       title: `${error?.response?.data?.message}`,
  //       description:
  //         "An error occurred while removing the product from your wishlist.",
  //       status: "error",
  //       duration: 2000,
  //       isClosable: true,
  //     });
  //   },
  // });

  const writeReview = async (productId: string, formData: any) => {
    try {
      const response = await apiClient.post(
        `/product/write-a-review/${productId}`,
        formData
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const reviewMutation = useMutation({
    mutationFn: ({
      productId,
      formData,
    }: {
      productId: string;
      formData: any;
    }) => writeReview(productId, formData),
    onSuccess: (response) => {
      console.log(response, "new");
      toast({
        title: `${response?.message}`,
        description: "Review created",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      toast({
        title: `${error?.response?.data?.message}`,
        description: "An error occurred while creating the review.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const handleAddToCart = (productId: string, productData: any) => {
   
    const existingCart = localStorage.getItem("cart");
    let cartItems: CartItem[] = existingCart ? JSON.parse(existingCart) : [];

    const productToAdd: any = Array.isArray(productData)
      ? productData.find((p: any) => p._id === productId)
      : productData;
    // console.log(productToAdd, "productToAdd");
    // // Add validation for product quantity
    if (!productToAdd) {
      toast({
        title: "Product not found",
        description: "The product you're trying to add doesn't exist",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    if ((productToAdd?.product_quantity ?? 0) <= 0) {
      toast({
        title: "Out of stock",
        description: "This product is currently out of stock",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }

    const existingItemIndex = cartItems.findIndex(
      (item) => item.productId === productId
    );

    if (existingItemIndex !== -1) {
      // Check if adding more would exceed available quantity
      if (
        cartItems[existingItemIndex]?.quantity <
        (productToAdd?.product_quantity ?? 0)
      ) {
        cartItems[existingItemIndex].quantity += 1;
      }
    } else {
      cartItems.push({
        productId,
        productName: productToAdd?.product_name ?? "",
        price: productToAdd?.unit_price ?? 0,
        image: productToAdd?.images?.[0] ?? "",
        quantity: 1,
        discount: productToAdd?.is_discounted
          ? productToAdd?.discount_price
          : 0,
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

  const clearAllCart = () => {
    localStorage.removeItem("cart");
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const updateCart = (product: Product, quantity: number) => {
   
    const existingCart = localStorage.getItem("cart");
    let cartItems: CartItem[] = existingCart ? JSON.parse(existingCart) : [];

    const existingItemIndex = cartItems.findIndex(
      (item) => item.productId === product._id
    );

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity = quantity;
    } else {
      cartItems.push({
        productId: product?._id ?? "",
        quantity: quantity,
        productName: product?.product_name ?? "",
        price: product?.unit_price ?? 0,
        image: product?.images?.[0] ?? "",
        discount: product.is_discounted ? product.discount_price : 0,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    window.dispatchEvent(new Event("cartUpdated"));
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
      formData.append(`images[${index}]`, image);
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
    onSuccess: (response: any) => {
      toast({
        title: `${response?.message}`,
        description: "Product has been added successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/alert-success");
    },
    onError: (error: any) => {
      toast({
        title: `${error?.response?.data?.message}`,
        description: error?.message || "An unknown error occurred",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const updateProductApiCall = async (formData: FormData): Promise<Product> => {
    try {
      const productId = formData.get("id");
      if (!productId || typeof productId !== "string") {
        throw new Error("Invalid product ID");
      }

      const response = await apiClient.put<Product>(
        `/product/update/${productId}`,
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
      throw new Error(
        "An unexpected error occurred while updating the product"
      );
    }
  };

  const useUpdateProduct = useMutation<Product, Error, FormData>({
    mutationFn: updateProductApiCall,
    onSuccess: (response: any) => {
      toast({
        title: `${response?.message}`,
        description: "Product has been updated successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/alert-success");
    },
    onError: (error: any) => {
      toast({
        title: error?.response?.data?.message || "Update failed",
        description: error?.message || "An unknown error occurred",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const fetchCategories = async (limit: number) => {
    try {
      const response = await apiClient.get(`/category/fetch?limit=${limit}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories", itemsPerPage],
    queryFn: () => fetchCategories(30),
    enabled: true,
    retry: true,
  });

  const {
    data: productsByCategory,
    refetch: refetchProductsByCategory,
    isLoading: isProductsByCategory,
    error: errorProductsByCategory,
  } = useQuery({
    queryKey: [
      "categoriesProducts",
      selectedCategoryId,
      currentPage,
      itemsPerPage,
    ],
    queryFn: async () => {
      if (!selectedCategoryId) return null;
      return fetchProducts(20, currentPage, "", selectedCategoryId);
    },
    enabled: Boolean(selectedCategoryId),
  });

  const {
    data: searchResults,
    isLoading: isSearchLoading,
    isSuccess: isFetched,
    error: searchError,
  } = useQuery({
    queryKey: ["productSearch", searchQuery, currentPage, itemsPerPage],
    queryFn: () =>
      fetchProducts(itemsPerPage, currentPage, "", "", searchQuery),
    enabled: searchQuery.length >= 2,
    staleTime: 0,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const fetchBusinessCategories = async (limit: number) => {
    try {
      const response = await apiClient.get(
        `/business/fetch-business-categories?limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const { data: businessCategories, isLoading: businessCategoriesLoading } =
    useQuery({
      queryKey: ["businessCategories", itemsPerPage],
      queryFn: () => fetchBusinessCategories(30),
      enabled: true,
      retry: true,
    });

  return {
    useWishlist,
    reviewMutation,
    addToWishlist: addMutation.mutate,
    // removeFromWishlist: removeMutation.mutate,
    categories,
    isLoading:
      productsLoading ||
      addMutation.isPending ||
      reviewMutation.isPending ||
      // removeMutation.isPending ||
      useAddNewProduct.isPending ||
      useUpdateProduct.isPending,
    error:
      productsError ||
      addMutation.error ||
      reviewMutation.error ||
      // removeMutation.error ||
      useAddNewProduct.error ||
      useUpdateProduct.error,

    handleAddToCart,
    handleRemoveFromCart,
    products: products?.data?.data || [],
    // total: products?.data?.total || 0,
    refetch,
    useSingleProduct,
    popluarProducts: PopularProducts?.data?.data || [],
    // PopluarProductsLoading,
    // PopluarProductsError,
    createProductFormData,
    useAddNewProduct,
    useUpdateProduct,
    updateCart,
    fetchProducts,
    setSelectedCategoryId,
    productCategoryData,
    setProductCategoryData,
    productsByCategory,
    isProductsByCategory,
    refetchProductsByCategory,
    errorProductsByCategory,
    selectedCategoryId,
    searchResults: searchResults?.data?.data || [],
    isSearchLoading,
    searchError,
    handleSearch,
    isFetched,
    searchQuery,
    currentPage: products?.data?.pagination?.currentPage || 1,
    totalPages: products?.data?.pagination?.pageCount || 1,
    totalItems: products?.data?.pagination?.totalCount || 0,
    pageSize: products?.data?.pagination?.pageSize || 10,
    hasNextPage: products?.data?.pagination?.hasNext || false,
    handlePageChange,
    handleItemsPerPageChange,
    setCurrentPage,
    setItemsPerPage,
    clearAllCart,
    productsPagination: {
      currentPage: products?.data?.pagination?.currentPage || 1,
      totalPages: products?.data?.pagination?.pageCount || 1,
      totalItems: products?.data?.pagination?.totalCount || 0,
      pageSize: products?.data?.pagination?.pageSize || 10,
      hasNextPage: products?.data?.pagination?.hasNext || false,
    },

    popularProductsPagination: {
      currentPage: PopularProducts?.data?.pagination?.currentPage || 1,
      totalPages: PopularProducts?.data?.pagination?.pageCount || 1,
      totalItems: PopularProducts?.data?.pagination?.totalCount || 0,
      pageSize: PopularProducts?.data?.pagination?.pageSize || 10,
      hasNextPage: PopularProducts?.data?.pagination?.hasNext || false,
    },
    categoriesPagination: {
      currentPage: categories?.data?.pagination?.currentPage || 1,
      totalPages: categories?.data?.pagination?.pageCount || 1,
      totalItems: categories?.data?.pagination?.totalCount || 0,
      pageSize: categories?.data?.pagination?.pageSize || 10,
      hasNextPage: categories?.data?.pagination?.hasNext || false,
    },
    productsByCategoryPagination: {
      currentPage: productsByCategory?.data?.pagination?.currentPage || 1,
      totalPages: productsByCategory?.data?.pagination?.pageCount || 1,
      totalItems: productsByCategory?.data?.pagination?.totalCount || 0,
      pageSize: productsByCategory?.data?.pagination?.pageSize || 10,
      hasNextPage: productsByCategory?.data?.pagination?.hasNext || false,
    },
    searchResultsPagination: {
      currentPage: searchResults?.data?.pagination?.currentPage || 1,
      totalPages: searchResults?.data?.pagination?.pageCount || 1,
      totalItems: searchResults?.data?.pagination?.totalCount || 0,
      pageSize: searchResults?.data?.pagination?.pageSize || 10,
      hasNextPage: searchResults?.data?.pagination?.hasNext || false,
    },
    businessCategories,
    businessCategoriesLoading,
  };
};
