import {
  Box,
  Flex,
  Button,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Icon,
  Image,
  Link,
} from "@chakra-ui/react";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGlobe,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";
import { useState } from "react";
import AuthImage from "../assets/auth.png";
import Logo from "../assets/soto.png";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../layouts/hooks/useAuth";

const Signup = () => {
  const { signup, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      phoneNumber: Yup.string()
        .matches(/^\d+$/, "Phone number should contain only digits")
        .min(10, "Phone number should be at least 10 digits")
        .required("Phone Number is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        // .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Password must contain at least one letter and one number")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        signup({
          FullName: values.fullName,
          Email: values.email,
          PhoneNumber: values.phoneNumber,
          Password: values.password,
          SignupChannel: "DEFAULT",
          UserType: "USER",
        });
        // Handle post-signup actions, like redirecting
      } catch (error) {
        console.error("Signup failed:", error);
      }
    },
  });

  return (
    <Box minHeight="100vh">
      {/* Navbar */}
      <Flex
        bg="#FFF2ED"
        px={4}
        py={4}
        justify="space-between"
        align="center"
        fontSize="sm"
        flexDirection={{ base: "column", md: "row" }}
        textAlign={{ base: "center", md: "left" }}
      >
        <Text fontWeight="500" color="gray" mb={{ base: 2, md: 0 }}>
          20% off store
        </Text>
        <Flex
          align="center"
          gap={4}
          justifyContent={{ base: "center", md: "flex-end" }}
        >
          <Flex align="center" color="gray">
            <Icon as={FaMapMarkerAlt} mr={1} />
            <Text>Location</Text>
          </Flex>
          <Flex align="center" color="gray">
            <Icon as={FaGlobe} mr={1} />
            <Text>ENG</Text>
          </Flex>
          <Text fontWeight="500" color="#FF5733">
            Buy & sell on Soto
          </Text>
        </Flex>
      </Flex>

      <Image
        src={Logo}
        alt="Soto Logo"
        py={8}
        px={8}
        width="120px"
        onClick={() => navigate("/")}
      />

      {/* Main Content */}
      <Flex
        direction={{ base: "column", md: "row" }}
        minHeight="calc(100vh - 56px)"
      >
        <Box
          flex="1"
          bgImage={AuthImage}
          bgSize="cover"
          bgPosition="center"
          display={{ base: "none", md: "block" }}
        />

        <Box
          flex="1"
          p={8}
          display="flex"
          alignItems="center"
          justifyContent="center"
          py={6}
          px={6}
          bg={"#FFFAF8"}
        >
          <Box width="100%" maxWidth="400px">
            <Text
              fontSize="3xl"
              fontWeight="600"
              mb={2}
              textAlign="center"
              fontFamily="Poppins"
              color="#FF5733"
            >
              Create New Account
            </Text>
            <Text color="black" mb={6} textAlign="center" fontFamily="Poppins">
              Kindly enter your correct details
            </Text>

            <form onSubmit={formik.handleSubmit}>
              <Box mb={4}>
                <Text mb={1} color="gray">
                  Full Name
                </Text>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" mt="1.5">
                    <Icon as={FaUser} color="gray.500" />
                  </InputLeftElement>
                  <Input
                    name="fullName"
                    placeholder="Enter your full name"
                    height="52px"
                    bg="#F8EDEA80"
                    borderRadius="xl"
                    fontSize="sm"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </InputGroup>
                {formik.touched.fullName && formik.errors.fullName ? (
                  <Text color="red.500" fontSize="sm">
                    {formik.errors.fullName}
                  </Text>
                ) : null}
              </Box>

              <Box mb={4}>
                <Text mb={1} color="gray">
                  Email Address
                </Text>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" mt="1.5">
                    <Icon as={FaUser} color="gray.500" />
                  </InputLeftElement>
                  <Input
                    name="email"
                    placeholder="Enter your email address"
                    height="52px"
                    bg="#F8EDEA80"
                    borderRadius="xl"
                    fontSize="sm"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </InputGroup>
                {formik.touched.email && formik.errors.email ? (
                  <Text color="red.500" fontSize="sm">
                    {formik.errors.email}
                  </Text>
                ) : null}
              </Box>

              <Box mb={4}>
                <Text mb={1} color="gray">
                  Phone Number
                </Text>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" mt="1.5">
                    <Icon as={FaPhone} color="gray.500" />
                  </InputLeftElement>
                  <Input
                    name="phoneNumber"
                    placeholder="Enter your phone number"
                    height="52px"
                    bg="#F8EDEA80"
                    borderRadius="xl"
                    fontSize="sm"
                    value={formik.values.phoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </InputGroup>
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <Text color="red.500" fontSize="sm">
                    {formik.errors.phoneNumber}
                  </Text>
                ) : null}
              </Box>

              <Box mb={4}>
                <Text mb={1} color="gray">
                  Password
                </Text>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" mt="1.5">
                    <Icon as={FaLock} color="gray" />
                  </InputLeftElement>
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    height="52px"
                    bg="#F8EDEA80"
                    borderRadius="xl"
                    fontSize="sm"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <InputRightElement
                    onClick={togglePasswordVisibility}
                    cursor="pointer"
                    mt="1.5"
                  >
                    <Icon as={showPassword ? FaEyeSlash : FaEye} color="gray" />
                  </InputRightElement>
                </InputGroup>
                {formik.touched.password && formik.errors.password ? (
                  <Text color="red.500" fontSize="sm">
                    {formik.errors.password}
                  </Text>
                ) : null}
              </Box>

              <Button
                isLoading={loading}
                loadingText="Creating Account"
                type="submit"
                color="white"
                bg="#FF5733"
                height="48px"
                width="100%"
                borderRadius="full"
                mb={4}
              >
                Create Account
              </Button>
            </form>

            <Text textAlign="center" color="gray.600">
              Already have an account?{" "}
              <Link as={RouterLink} color="#FF5733" to="/auth">
                Login
              </Link>
            </Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Signup;
