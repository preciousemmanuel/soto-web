import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../services/axios";
import { useToast } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

export const useAuth = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!(
      localStorage.getItem("userToken") || localStorage.getItem("token")
    );
  });

  const [isVendorAuthenticated, setIsVendorAuthenticated] = useState(() => {
    return !!localStorage.getItem("vendorToken");
  });

  const { data: user, refetch: refetchProfile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await apiClient.get("/user/profile");
      // console.log(response.data.data)
      const {
        FirstName,
        LastName,
        Email,
        ShippingAddress,
        PhoneNumber,
        wallet,
        vendor_status,
      } = response.data.data;
      return {
        FirstName,
        LastName,
        Email,
        ShippingAddress,
        PhoneNumber,
        wallet,
        vendor_status,
      };
    },
    enabled: isAuthenticated || isVendorAuthenticated,
    retry: true,
  });

  const loginMutation = useMutation({
    mutationFn: (credentials: {
      email_or_phone_number: string;
      password: string;
      userType: "USER";
    }) => apiClient.post("/user/login", credentials),
    onSuccess: (response) => {
      localStorage.removeItem("userToken");
      localStorage.removeItem("vendorToken");
      const { Token } = response.data.data;
      localStorage.setItem("userToken", Token);
      setIsAuthenticated(true);

      toast({
        title: `${response?.data?.message}`,
        description: "Welcome back!",
        status: "success",
        duration: 7000,
        isClosable: true,
        position: "top-right",
      });

      const origin = location.state?.from?.pathname || "/";
      navigate(origin);
    },
    onError: (error: any) => {
      // console.error("Login failed:", error);
      toast({
        title: `${error?.response?.data?.message}`,
        description: "Please check your credentials and try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });
  // console.log(user,"userr")
  const vendorLoginMutation = useMutation({
    mutationFn: (credentials: {
      email_or_phone_number: string;
      password: string;
      userType: "VENDOR";
    }) => apiClient.post("/user/login", credentials),
    onSuccess: (response) => {
      localStorage.removeItem("userToken");
      localStorage.removeItem("vendorToken");
      const { Token } = response.data.data;
      localStorage.setItem("vendorToken", Token);
      setIsVendorAuthenticated(true);

      toast({
        title: `${response?.data?.message}`,
        description: "Welcome back!",
        status: "success",
        duration: 7000,
        isClosable: true,
        position: "top-right",
      });
      navigate("/vendor-overview");
    },
    onError: (error: any) => {
      // console.error("Vendor login failed:", error);
      toast({
        title: `${error?.response?.data?.message}`,
        description: "Please check your credentials and try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const signupMutation = useMutation({
    mutationFn: (userData: {
      FullName: string;
      Email: string;
      PhoneNumber: string;
      Password: string;
      SignupChannel: string;
      UserType: string;
    }) => apiClient.post("/user/signup", userData),
    onSuccess: (response) => {
      localStorage.removeItem("userToken");
      localStorage.removeItem("vendorToken");
      const { Token } = response.data.data;
      localStorage.setItem("userToken", Token);
      setIsAuthenticated(true);
      toast({
        title: `${response?.data?.message}`,
        description: "Welcome! Please login to continue.",
        status: "success",
        duration: 7000,
        isClosable: true,
        position: "top-right",
      });
      navigate("/auth/shipping-address");
    },
    onError: (error: any) => {
      // console.error("Signup failed:", error);
      toast({
        title: `${error?.response?.data?.message}`,
        description: "Please try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const requestOtpMutation = useMutation({
    mutationFn: (data: { email_or_phone_number: string }) =>
      apiClient.post("/user/change-password-request", data),
    onSuccess: (response) => {
      const { email } = response.data.data;
      toast({
        title: `${response?.data?.message}`,
        description: `An OTP has been sent to ${email}.`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      return response.data.data;
    },
    onError: (error: any) => {
      // console.error("Error requesting OTP:", error);
      toast({
        title: `${error?.response?.data?.message}`,
        description: "Please check the email or phone number and try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const validateOtpMutation = useMutation({
    mutationFn: (payload: any) => apiClient.post("/user/validate-otp", payload),
    onSuccess: (response) => {
      toast({
        title: `${response?.data?.message}`,
        description: "OTP validated successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
    onError: (error: any) => {
      toast({
        title: `${error?.response?.data?.message}`,
        description: "Please check the OTP and try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (payload: { new_password: string; otp: string }) =>
      apiClient.put("/user/reset-password", payload),
    onSuccess: (response) => {
      toast({
        title: `${response?.data?.message}`,
        description:
          "Your password has been reset. Please log in with your new credentials.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/auth");
    },
    onError: (error: any) => {
      // console.error("Password reset failed:", error);
      toast({
        title: `${error?.response?.data?.message}`,
        description: "Please check the OTP and try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const addShippingAddressMutation = useMutation({
    mutationFn: (addressData: any) =>
      apiClient.put("/user/add-shipping-address", addressData),
    onSuccess: (response) => {
      toast({
        title: `${response?.data?.message}`,
        description: "Your shipping address has been added successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/");
    },
    onError: (error: any) => {
      // console.error("Failed to add shipping address:", error);
      toast({
        title: `${error?.response?.data?.message}`,
        description: "Please try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const updateShippingAddressMutation = useMutation({
    mutationFn: (addressData: any) =>
      apiClient.put("/user/update-shipping-address", addressData),
    onSuccess: (response) => {
      toast({
        title: `${response?.data?.message}`,
        description: "Your shipping address has been updated successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate(-1); 
    },
    onError: (error: any) => {
      // console.error("Failed to add shipping address:", error);
      toast({
        title: `${error?.response?.data?.message}`,
        description: "Please try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: (profileData: any) =>
      apiClient.put("/user/update-profile", profileData),
    onSuccess: (response) => {
      toast({
        title: `${response?.data?.message}`,
        description: "Your profile has been updated successfully.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      refetchProfile();
    },
    onError: (error: any) => {
      toast({
        title: `${error?.response?.data?.message}`,
        description: "Please try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const logout = () => {
    localStorage.removeItem("userToken");
    setIsAuthenticated(false);
    queryClient.clear();
    navigate("/auth");
  };

  const vendorLogout = () => {
    localStorage.removeItem("vendorToken");
    setIsVendorAuthenticated(false);
    queryClient.clear();
    navigate("/auth/vendor-login");
  };

  const switchToUser = () => {
    localStorage.removeItem("vendorToken");
    localStorage.removeItem("cart");
    setIsAuthenticated(false);
    queryClient.clear();
    navigate("/auth");
  };

  const switchToVendor = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("cart");
    setIsAuthenticated(false);
    queryClient.clear();
    navigate("/auth/vendor-login");
  };

  useEffect(() => {
    const userToken =
      localStorage.getItem("userToken") || localStorage.getItem("token");
    if (userToken) {
      setIsAuthenticated(true);
    }
    const vendorToken = localStorage.getItem("vendorToken");

    if (vendorToken) setIsVendorAuthenticated(true);
  }, []);

  return {
    isAuthenticated,
    isVendorAuthenticated,
    loading:
      loginMutation.isPending ||
      vendorLoginMutation.isPending ||
      signupMutation.isPending ||
      requestOtpMutation.isPending ||
      resetPasswordMutation.isPending ||
      addShippingAddressMutation.isPending ||
      validateOtpMutation.isPending ||
      updateProfileMutation.isPending ||
      updateShippingAddressMutation.isPending,
    login: loginMutation.mutate,
    vendorLogin: vendorLoginMutation.mutate,
    logout,
    vendorLogout,
    updateProfile: updateProfileMutation.mutate,
    signup: signupMutation.mutate,
    switchToVendor,
    requestOtp: requestOtpMutation.mutate,
    isSuccesRequest: requestOtpMutation.isSuccess,
    isSuccessOTP: validateOtpMutation.isSuccess,
    isErrorOTP: validateOtpMutation.isError,
    resetPassword: resetPasswordMutation.mutate,
    addShippingAddress: addShippingAddressMutation.mutate,
    validateOtp: validateOtpMutation.mutate,
    user,
    refetchProfile,
    switchToUser,
    updateShippingAddress: updateShippingAddressMutation.mutate,
  };
};
