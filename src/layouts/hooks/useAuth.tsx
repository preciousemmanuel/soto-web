import { useEffect, useState } from "react";
import apiClient from "../../services/axios";
import { useToast } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

export const useAuth = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // Separate states for user and vendor authentication
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("userToken");
  });
  
  const [isVendorAuthenticated, setIsVendorAuthenticated] = useState(() => {
    return !!localStorage.getItem("vendorToken");
  });

  // User login
  const login = async (credentials: {
    email_or_phone_number: string;
    password: string;
    userType: "USER";
  }) => {
    setLoading(true);
    try {
      const response = await apiClient.post("/user/login", credentials);
      if (response.status === 200) {
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
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Function to call the signup API
  const signup = async (userData: {
    FullName: string;
    Email: string;
    PhoneNumber: string;
    Password: string;
    SignupChannel: string;
    UserType: string;
  }) => {
    try {
      const response = await apiClient.post("/user/signup", userData);

      if (response.status === 201) {
        toast({
          title: "User Created Successfully",
          description: "Welcome! Please login to continue.",
          status: "success",
          duration: 7000,
          isClosable: true,
          position: "top-right",
        });
        navigate("/auth");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      toast({
        title: "Signup Failed",
        description: "Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Vendor login
  const vendorLogin = async (credentials: {
    email_or_phone_number: string;
    password: string;
    userType: "VENDOR";
  }) => {
    setLoading(true);
    try {
      const response = await apiClient.post("/user/login", credentials);
      if (response.status === 200) {
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
      }
    } catch (error) {
      console.error("Vendor login failed:", error);
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // User logout
  const logout = () => {
    localStorage.removeItem("userToken");
    setIsAuthenticated(false);
    navigate("/auth");
  };

  // Vendor logout
  const vendorLogout = () => {
    localStorage.removeItem("vendorToken");
    setIsVendorAuthenticated(false);
    navigate("/auth/vendor-login");
  };

  // Switch to vendor
  const switchToVendor = () => {
    localStorage.removeItem("userToken");
    setIsAuthenticated(false);
    navigate("/auth/vendor-login");
  };

  const requestOtp = async (email_or_phone_number: {
    email_or_phone_number: string;
  }) => {
    setLoading(true);
    try {
      const response = await apiClient.post(
        "/user/change-password-request",
        email_or_phone_number
      );
      if (response.status === 200) {
        const { otp, token, email } = response.data.data;
        toast({
          title: "OTP Sent Successfully",
          description: `An OTP has been sent to ${email}.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        return { otp, token };
      }
    } catch (error) {
      console.error("Error requesting OTP:", error);
      toast({
        title: "Failed to Request OTP",
        description: "Please check the email or phone number and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (payload: {
    new_password: string;
    otp: string;
  }) => {
    setLoading(true);
    try {
      const response = await apiClient.put("/user/reset-password", payload);
      if (response.status === 200) {
        toast({
          title: "Password Reset Successfully",
          description:
            "Your password has been reset. Please log in with your new credentials.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        navigate("/auth");
      }
    } catch (error) {
      console.error("Password reset failed:", error);
      toast({
        title: "Failed to Reset Password",
        description: "Please check the OTP and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    const vendorToken = localStorage.getItem("vendorToken");
    
    if (userToken) setIsAuthenticated(true);
    if (vendorToken) setIsVendorAuthenticated(true);
  }, []);

  return {
    isAuthenticated,
    isVendorAuthenticated,
    loading,
    login,
    vendorLogin,
    logout,
    vendorLogout,
    signup,
    switchToVendor,
    requestOtp,
    resetPassword
  };
};