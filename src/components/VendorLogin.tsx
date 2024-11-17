import {
    Box,
    Flex,
    Button,
    Text,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Divider,
    Icon,
    Image,
    Link,
    useToast,
    FormControl,
    FormErrorMessage,
  } from "@chakra-ui/react";
  import {
    FaFacebook,
    FaUser,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaGlobe,
    FaMapMarkerAlt,
  } from "react-icons/fa";
  import { useState } from "react";
  import { Link as RouterLink, useNavigate } from "react-router-dom";
  import { useFormik } from "formik";
  import * as Yup from "yup";
  import AuthImage from "../assets/auth.png";
  import Logo from "../assets/soto.png";
  import { FcGoogle } from "react-icons/fc";
  import { useAuth } from "../layouts/hooks/useAuth";
  
  const validationSchema = Yup.object().shape({
    email_or_phone_number: Yup.string()
      .required("Email or phone number is required"),
    password: Yup.string()
      .required("Password is required"),
  });
  
  const VendorLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();
    const { vendorlogin } = useAuth();
  
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
  
    const formik = useFormik({
      initialValues: {
        email_or_phone_number: "",
        password: "",
      },
      validationSchema,
      onSubmit: async (values, { setSubmitting }) => {
        try {
          const loginData = {
            ...values,
            userType: "VENDOR" // Hardcoding userType as VENDOR
          };
  
          await vendorlogin (loginData);
          
          toast({
            title: "Login Successful",
            description: "Welcome back!",
            status: "success",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
  
          // Add navigation logic here if needed
          // navigate("/dashboard");
        } catch (error) {
          toast({
            title: "Login Failed",
            description: error.response?.data?.message || "Invalid credentials",
            status: "error",
            duration: 5000,
            isClosable: true,
            position: "top-right",
          });
        } finally {
          setSubmitting(false);
        }
      },
    });
  
    return (
      <Box minHeight="100vh">
        {/* Navbar */}
        <Flex bg="#FFF2ED" px={4} py={4} justify="space-between" align="center" fontSize="sm">
          <Text fontWeight="500" color="gray">20% off store</Text>
          <Flex align="center" gap={4}>
            <Flex align="center" color="gray">
              <Icon as={FaMapMarkerAlt} mr={1} />
              <Text>Location</Text>
            </Flex>
            <Flex align="center" color="gray">
              <Icon as={FaGlobe} mr={1} />
              <Text>ENG</Text>
            </Flex>
            <Text fontWeight="500" color="#FF5733">Buy & sell on Soto</Text>
          </Flex>
        </Flex>
  
        <Image src={Logo} alt="Logo" py={8} px={8} width="120px" />
  
        {/* Main Content */}
        <Flex direction={{ base: "column", md: "row" }} minHeight="calc(100vh - 56px)">
          <Box flex="1" bgImage={AuthImage} bgSize="cover" bgPosition="center" display={{ base: "none", md: "block" }} />
  
          <Box flex="1" p={8} display="flex" alignItems="center" justifyContent="center" py={6} px={6} bg="#FFFAF8">
            <Box width="100%" maxWidth="400px">
              <Text fontSize="3xl" fontWeight="600" mb={2} textAlign="center" fontFamily="Poppins" color="#FF5733">
                Login
              </Text>
              <Text color="black" mb={6} textAlign="center" fontFamily="Poppins">
                Kindly enter your correct details
              </Text>
  
              <Flex mb={4} gap={4} flexDirection={{ base: "column", sm: "row" }}>
                <Button flex="1" leftIcon={<Icon as={FaFacebook} color="blue" />} bg="#FEF0EA" color="gray">
                  Facebook
                </Button>
                <Button flex="1" leftIcon={<Icon as={FcGoogle} />} bg="#FEF0EA" color="gray" mt={{ base: 2, sm: 0 }}>
                  Google
                </Button>
              </Flex>
  
              <Flex alignItems="center" mb={4}>
                <Divider />
                <Text px={2} color="gray.500">or</Text>
                <Divider />
              </Flex>
  
              <form onSubmit={formik.handleSubmit}>
                <FormControl 
                  isInvalid={formik.touched.email_or_phone_number && formik.errors.email_or_phone_number} 
                  mb={4}
                >
                  <Text mb={1} color="gray">Email/Phone Number</Text>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaUser} color="gray.500" />
                    </InputLeftElement>
                    <Input
                      name="email_or_phone_number"
                      placeholder="Enter your email or phone number"
                      height="52px"
                      bg="#F8EDEA80"
                      outline="none"
                      borderRadius="xl"
                      fontSize="sm"
                      {...formik.getFieldProps('email_or_phone_number')}
                    />
                  </InputGroup>
                  <FormErrorMessage>{formik.errors.email_or_phone_number}</FormErrorMessage>
                </FormControl>
  
                <FormControl 
                  isInvalid={formik.touched.password && formik.errors.password} 
                  mb={4}
                >
                  <Text mb={1} color="gray">Password</Text>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaLock} color="gray" />
                    </InputLeftElement>
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      height="52px"
                      bg="#F8EDEA80"
                      outline="none"
                      borderRadius="xl"
                      fontSize="sm"
                      {...formik.getFieldProps('password')}
                    />
                    <InputRightElement onClick={togglePasswordVisibility} cursor="pointer">
                      <Icon as={showPassword ? FaEyeSlash : FaEye} color="gray" />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                  <Text color="#FF5753" textAlign="right" fontWeight="500" fontSize="sm" mt={2}>
                    <Link as={RouterLink} to="/auth/forgot-password">Forgot password?</Link>
                  </Text>
                </FormControl>
  
                <Button
                  type="submit"
                  color="white"
                  bg="#FF5733"
                  height="48px"
                  width="100%"
                  borderRadius="full"
                  mb={4}
                  isLoading={formik.isSubmitting}
                  loadingText="Logging in..."
                >
                  Login
                </Button>
              </form>
  
              <Text textAlign="center" color="gray.600">
                New to Soto?{" "}
                <Link as={RouterLink} to="/auth/vendor-signup" color="#FF5733" fontWeight="500">
                  Create a business account
                </Link>
              </Text>
            </Box>
          </Box>
        </Flex>
      </Box>
    );
  };
  
  export default VendorLogin;