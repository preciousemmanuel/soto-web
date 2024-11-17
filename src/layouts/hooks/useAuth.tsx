import { useEffect, useState } from "react";
import apiClient from "../../services/axios";
import { useToast } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

export const useAuth = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("token");
  });

  // Function to call the login API
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

        // Store token in local storage
        localStorage.setItem("token", Token);

        // Set authentication status
        setIsAuthenticated(true);

        // Show success toast
        toast({
          title: "Login Successful",
          description: "Welcome back!",
          status: "success",
          duration: 7000,
          isClosable: true,
          position: "top-right",
        });

        // Navigate to home or attempted page
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
          title: "Useer Created Successful",
          description: "Welcome back!",
          status: "success",
          duration: 7000,
          isClosable: true,
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const logout = () => {

    setProfile(null);
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/auth");
  };

  useEffect(() => {
    // Check if token exists in localStorage on component mount
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

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

        // Return data for further use in the component
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

        // Redirect to login page
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

 

  return {
    isAuthenticated,
    login,
    logout,
    signup,
    requestOtp,
    resetPassword,
  };
};
