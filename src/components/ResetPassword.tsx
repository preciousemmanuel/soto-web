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
import { Link } from "react-router-dom";

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
        px={{ base: 2, md: 4 }}
        py={{ base: 2, md: 4 }}
        justify="space-between"
        align="center"
        fontSize={{ base: "xs", sm: "sm" }}
        flexWrap="wrap"
        gap={2}
      >
        <Text fontWeight="500" color="gray">
          20% off store
        </Text>
        <Flex align="center" gap={{ base: 2, md: 4 }} flexWrap="wrap">
          <Flex align="center" color="gray">
            <Icon as={FaMapMarkerAlt} mr={1} boxSize={{ base: 3, md: 4 }} />
            <Text fontSize={{ base: "xs", sm: "sm" }}>Location</Text>
          </Flex>
          <Flex align="center" color="gray">
            <Icon as={FaGlobe} mr={1} boxSize={{ base: 3, md: 4 }} />
            <Text fontSize={{ base: "xs", sm: "sm" }}>ENG</Text>
          </Flex>
          <Link to="/auth/vendor-signup">
            <Text
              color="#FF5733"
              textDecoration="underline"
              fontWeight="bold"
              fontSize={{ base: "xs", sm: "sm" }}
            >
              Sell on Soto
            </Text>
          </Link>
        </Flex>
      </Flex>
      <Flex
        direction={{ base: "column", md: "row" }}
        minHeight={{ base: "calc(100vh - 48px)", md: "calc(100vh - 56px)" }}
      >
        <Box
          flex="1"
          bgImage={AuthImage}
          bgSize={{ md: "60% 60%", lg: "50% 50%" }}
          bgRepeat="no-repeat"
          bgPosition="center"
          display={{ base: "none", md: "block" }}
          minHeight={{ base: "200px", md: "auto" }}
        />

        <Box
          flex="1"
          p={{ base: 4, md: 8 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          py={{ base: 4, md: 6 }}
          px={{ base: 4, md: 6 }}
          bg="#FFFAF8"
        >
          <Box width="100%" maxWidth={{ base: "100%", sm: "400px" }}>
            <Text
              fontSize={{ base: "2xl", sm: "3xl" }}
              fontWeight="600"
              mb={2}
              textAlign="center"
              fontFamily="Poppins"
              color="#FF5733"
            >
              Reset Password
            </Text>
            <Text
              color="black"
              mb={{ base: 4, sm: 6 }}
              textAlign="center"
              fontFamily="Poppins"
              fontSize={{ base: "sm", sm: "md" }}
            >
              Enter your Otp and new password
            </Text>
            <Box mb={{ base: 3, sm: 4 }} mt={{ base: 2, sm: 4 }}>
              <Text mb={1} color="gray" fontSize={{ base: "sm", sm: "md" }}>
                Password
              </Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none" mt="1.5">
                  <Icon as={FaLock} color="gray" boxSize={{ base: 4, sm: 5 }} />
                </InputLeftElement>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  height={{ base: "44px", sm: "52px" }}
                  bg="#F8EDEA80"
                  outline="none"
                  borderRadius="xl"
                  fontSize={{ base: "xs", sm: "sm" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement
                  onClick={togglePasswordVisibility}
                  cursor="pointer"
                  mt="1.5"
                >
                  <Icon
                    as={showPassword ? FaEyeSlash : FaEye}
                    color="gray"
                    boxSize={{ base: 4, sm: 5 }}
                  />
                </InputRightElement>
              </InputGroup>
            </Box>
            <Button
              color="white"
              bg="#FF5733"
              height={{ base: "40px", sm: "48px" }}
              width="100%"
              borderRadius="full"
              mb={{ base: 3, sm: 4 }}
              onClick={handleResetPassword}
              isLoading={loading}
              loadingText="Loading..."
              fontSize={{ base: "sm", sm: "md" }}
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
