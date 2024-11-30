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
      const { FirstName, LastName, Email } = response.data.data;
      return { FirstName, LastName, Email };
    },
    enabled: isAuthenticated || isVendorAuthenticated,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: (credentials: {
      email_or_phone_number: string;
      password: string;
      userType: "USER";
    }) => apiClient.post("/user/login", credentials),
    onSuccess: (response) => {
      const { Token } = response.data.data;
      localStorage.setItem("userToken", Token);
      setIsAuthenticated(true);

      toast({
        title: "Login Successful",
        description: "Welcome back!",
        status: "success",
        duration: 7000,
        isClosable: true,
        position: "top-right",
      });

      const origin = location.state?.from?.pathname || "/";
      navigate(origin);
    },
    onError: (error) => {
      // console.error("Login failed:", error);
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const vendorLoginMutation = useMutation({
    mutationFn: (credentials: {
      email_or_phone_number: string;
      password: string;
      userType: "VENDOR";
    }) => apiClient.post("/user/login", credentials),
    onSuccess: (response) => {
      const { Token } = response.data.data;
      localStorage.setItem("vendorToken", Token);
      setIsVendorAuthenticated(true);

      toast({
        title: "Vendor Login Successful",
        description: "Welcome back!",
        status: "success",
        duration: 7000,
        isClosable: true,
        position: "top-right",
      });

      navigate("/vendor-overview");
    },
    onError: (error) => {
      // console.error("Vendor login failed:", error);
      toast({
        title: "Login Failed",
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
    onSuccess: () => {
      toast({
        title: "User Created Successfully",
        description: "Welcome! Please login to continue.",
        status: "success",
        duration: 7000,
        isClosable: true,
        position: "top-right",
      });
      navigate("/auth");
    },
    onError: (error) => {
      console.error("Signup failed:", error);
      toast({
        title: "Signup Failed",
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
        title: "OTP Sent Successfully",
        description: `An OTP has been sent to ${email}.`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      return response.data.data;
    },
    onError: (error) => {
      console.error("Error requesting OTP:", error);
      toast({
        title: "Failed to Request OTP",
        description: "Please check the email or phone number and try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (payload: { new_password: string; otp: string }) =>
      apiClient.put("/user/reset-password", payload),
    onSuccess: () => {
      toast({
        title: "Password Reset Successfully",
        description:
          "Your password has been reset. Please log in with your new credentials.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      navigate("/auth");
    },
    onError: (error) => {
      // console.error("Password reset failed:", error);
      toast({
        title: "Failed to Reset Password",
        description: "Please check the OTP and try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    },
  });

  const logout = () => {
    localStorage.removeItem("userToken");
    setIsAuthenticated(false);
    queryClient.clear(); // Clear all queries from cache
    navigate("/auth");
  };

  const vendorLogout = () => {
    localStorage.removeItem("vendorToken");
    setIsVendorAuthenticated(false);
    queryClient.clear(); // Clear all queries from cache
    navigate("/auth/vendor-login");
  };

  const switchToVendor = () => {
    localStorage.removeItem("userToken");
    setIsAuthenticated(false);
    queryClient.clear(); // Clear all queries from cache
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
      resetPasswordMutation.isPending,
    login: loginMutation.mutate,
    vendorLogin: vendorLoginMutation.mutate,
    logout,
    vendorLogout,
    signup: signupMutation.mutate,
    switchToVendor,
    requestOtp: requestOtpMutation.mutate,
    resetPassword: resetPasswordMutation.mutate,
    user,
    refetchProfile,
  };
};
