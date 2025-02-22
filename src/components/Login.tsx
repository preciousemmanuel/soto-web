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
  Link
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
import AuthImage from "../assets/auth.png";
import Logo from "../assets/soto.svg";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../layouts/hooks/useAuth";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleLogin = async () => {
    try {
      await login({
        email_or_phone_number: emailOrPhone,
        password,
        userType: "USER",
      });
    } catch (error) {
      console.log("Login Failed" + " " + error);
    }
  };

  return (
    <Box height="100%">
      {/* Navbar */}
      <Flex
        bg="#FFF2ED"
        px={4}
        py={4}
        justify="space-between"
        align="center"
        fontSize="sm"
      >
        <Text fontWeight="500" color="gray">
          20% off store
        </Text>
        <Flex align="center" gap={4}>
          <Flex align="center" color="gray">
            <Icon as={FaMapMarkerAlt} mr={1} />
            <Text>Location</Text>
          </Flex>
          <Flex align="center" color="gray">
            <Icon as={FaGlobe} mr={1} />
            <Text>ENG</Text>
          </Flex>
          <RouterLink to="/auth/vendor-signup">
            <Text color="#FF5733" textDecoration="underline" fontWeight="bold">Sell on Soto</Text>
          </RouterLink>
        </Flex>
      </Flex>

      <Image
        src={Logo}
        alt="Logo"
        py={8}
        px={8}
        width="120px"
        onClick={() => navigate("/")}
        cursor="pointer"
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
          bg="#FFFAF8"
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
              Buyer's Login
            </Text>
            <Text color="black" mb={6} textAlign="center" fontFamily="Poppins">
              Kindly enter your correct details
            </Text>
            {/* 
            <Flex mb={4} gap={4} flexDirection={{ base: "column", sm: "row" }}>
              <Button
                flex="1"
                leftIcon={<Icon as={FaFacebook} color="blue" />}
                bg="#FEF0EA"
                color="gray"
              >
                Facebook
              </Button>
              <Button
                flex="1"
                leftIcon={<Icon as={FcGoogle} />}
                bg="#FEF0EA"
                color="gray"
                mt={{ base: 2, sm: 0 }}
              >
                Google
              </Button>
            </Flex> */}

            {/* <Flex alignItems="center" mb={4}>
              <Divider />
              <Text px={2} color="gray.500">
                or
              </Text>
              <Divider />
            </Flex> */}

            <Box mb={4}>
              <Text mb={1} color="gray">
                Email/Name
              </Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none" mt="1.5">
                  <Icon as={FaUser} color="gray.500" />
                </InputLeftElement>
                <Input
                  placeholder="Enter your email or username"
                  height="52px"
                  bg="#F8EDEA80"
                  outline="none"
                  borderRadius="xl"
                  fontSize="sm"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                />
              </InputGroup>
            </Box>

            <Box mb={4} mt={4}>
              <Text mb={1} color="gray">
                Password
              </Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none" mt="1.5">
                  <Icon as={FaLock} color="gray" />
                </InputLeftElement>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  height="52px"
                  bg="#F8EDEA80"
                  outline="none"
                  borderRadius="xl"
                  fontSize="sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement
                  onClick={togglePasswordVisibility}
                  cursor="pointer"
                  mt="1.5"
                >
                  <Icon as={showPassword ? FaEyeSlash : FaEye} color="gray" />
                </InputRightElement>
              </InputGroup>
              <Text
                color="#FF5753"
                textAlign="right"
                fontWeight="500"
                fontSize="sm"
                mt={2}
              >
                <Link as={RouterLink} to="/auth/forget-password">
                  Forgot password?
                </Link>
              </Text>
            </Box>

            <Button
              color="white"
              bg="#FF5733"
              height="48px"
              width="100%"
              borderRadius="full"
              mb={4}
              onClick={handleLogin}
              isLoading={loading}
              loadingText="Logging in"
            >
              Login
            </Button>

            <Text textAlign="center" color="gray.600">
              New to Soto?{" "}
              <Link
                as={RouterLink}
                to="/auth/signup"
                color="#FF5733"
                fontWeight="500"
              >
                Create an account
              </Link>
            </Text>
            <Text textAlign="center" py="3" color="gray.600">
              Are you a Vendor?{" "}
              <Link as={RouterLink} color="#FF5733" to="/auth/vendor-login">
                Login
              </Link>
              /
              <Link as={RouterLink} color="#FF5733" to="/auth/vendor-signup">
                Register
              </Link>
            </Text>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Login;
