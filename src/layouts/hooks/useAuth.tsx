import { useEffect, useState } from "react";
import apiClient from "../../services/axios";
import { useToast } from "@chakra-ui/react";
import {  useLocation, useNavigate } from "react-router-dom";


export const useAuth = () => {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('token');
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
        const origin = location.state?.from?.pathname || '/';
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
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/auth');
  };

  useEffect(() => {
    // Check if token exists in localStorage on component mount
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return {
    isAuthenticated,
    login,
    logout,
    signup,
  };
};
