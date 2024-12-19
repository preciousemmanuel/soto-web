import { useEffect, useState } from "react";
import {
  Box,
  Text,
  Input,
  Button,
  Flex,
  Icon,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import {
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGlobe,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useAuth } from "../layouts/hooks/useAuth";
import AuthImage from "../assets/Wave.png";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const { resetPassword, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  useEffect(() => {
    const storedOtp = localStorage.getItem("otp");
    if (storedOtp) {
      setOtp(storedOtp);
    }
  }, []);

  const handleResetPassword = async () => {
    await resetPassword({ new_password: password, otp });
    await localStorage.removeItem("otp");
  };

  return (
    <Box height="100%">
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
          <Text fontWeight="500" color="#FF5733">
            Buy & sell on Soto
          </Text>
        </Flex>
      </Flex>
      <Flex
        direction={{ base: "column", md: "row" }}
        minHeight="calc(100vh - 56px)"
      >
        <Box
          flex="1"
          bgImage={AuthImage}
          bgSize="60% 60%"
          bgRepeat="no-repeat"
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
              Reset Password
            </Text>
            <Text color="black" mb={6} textAlign="center" fontFamily="Poppins">
              Enter your Otp and new password
            </Text>
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
            </Box>
            <Button
              color="white"
              bg="#FF5733"
              height="48px"
              width="100%"
              borderRadius="full"
              mb={4}
              onClick={handleResetPassword}
              isLoading={loading}
              loadingText="Loading..."
            >
              Continue
            </Button>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default ResetPassword;
