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
    FaPhone,
  } from "react-icons/fa";
  import { useState } from "react";
  import AuthImage from "../assets/auth.png";
  import Logo from "../assets/soto.png";
  import { FcGoogle } from "react-icons/fc";
import { Link as RouterLink } from "react-router-dom";
  
  const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => setShowPassword(!showPassword);
  
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
  
        <Image src={Logo} alt="Soto Logo" py={8} px={8} width="120px" />
  
        {/* Main Content */}
        <Flex
          direction={{ base: "column", md: "row" }}
          minHeight="calc(100vh - 56px)"
        >
          {/* Left Image Section */}
          <Box
            flex="1"
            bgImage={AuthImage}
            bgSize="cover"
            bgPosition="center"
            display={{ base: "none", md: "block" }}
            // Adjusted width for a smaller image
          />
  
          {/* Right Signup Form Section */}
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
  
              <Flex mb={4} gap={4} flexDirection={{ base: "column", sm: "row" }}>
                <Button
                  flex="1"
                  leftIcon={<Icon as={FaFacebook} color="blue" />}
                  bg="#FEF0EA"
                  borderRadius="full"
                  height="48px"
                  color="gray"
                  fontWeight="400"
                  fontSize="sm"
                >
                  Facebook
                </Button>
                <Button
                  flex="1"
                  leftIcon={<Icon as={FcGoogle} />}
                  bg="#FEF0EA"
                  borderRadius="full"
                  height="48px"
                  color="gray"
                  fontWeight="400"
                  fontSize="sm"
                  mt={{ base: 2, sm: 0 }}
                >
                  Google
                </Button>
              </Flex>
  
              <Flex alignItems="center" mb={4}>
                <Divider />
                <Text px={2} color="gray.500">
                  or
                </Text>
                <Divider />
              </Flex>
  
              <Box mb={4}>
                <Text mb={1} color="gray">
                  Full Name
                </Text>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FaUser} color="gray.500" />
                  </InputLeftElement>
                  <Input
                    placeholder="Enter your full name"
                    height="52px"
                    bg="#F8EDEA80"
                    outline="none"
                    borderRadius="xl"
                    fontSize="sm"
                  />
                </InputGroup>
              </Box>
  
              <Box mb={4}>
                <Text mb={1} color="gray">
                  Email Address
                </Text>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FaUser} color="gray.500" />
                  </InputLeftElement>
                  <Input
                    placeholder="Enter your email address"
                    height="52px"
                    bg="#F8EDEA80"
                    outline="none"
                    borderRadius="xl"
                    fontSize="sm"
                  />
                </InputGroup>
              </Box>
  
              <Box mb={4}>
                <Text mb={1} color="gray">
                  Phone Number
                </Text>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FaPhone} color="gray.500" />
                  </InputLeftElement>
                  <Input
                    placeholder="Enter your phone number"
                    height="52px"
                    bg="#F8EDEA80"
                    outline="none"
                    borderRadius="xl"
                    fontSize="sm"
                  />
                </InputGroup>
              </Box>
  
              <Box mb={4}>
                <Text mb={1} color="gray">
                  Password
                </Text>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
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
                  />
                  <InputRightElement
                    onClick={togglePasswordVisibility}
                    cursor="pointer"
                  >
                    <Icon as={showPassword ? FaEyeSlash : FaEye} color="gray" />
                  </InputRightElement>
                </InputGroup>
              </Box>
  
              <Button
                color="white"
                bg="#FF5733"
                height="48px"
                width="100%"
                borderRadius="full"
                mb={4}
              >
                Create Account
              </Button>
  
              <Text textAlign="center" color="gray.600">
                Already have an account?{" "}
                <Link as={RouterLink} color="#FF5733"  to="/auth">
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
  