import { useEffect, useRef, useState } from "react";
import {
  Box,
  Text,
  Input,
  Button,
  VStack,
  Flex,
  // Flex,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { useAuth } from "../layouts/hooks/useAuth";
import { FaGlobe, FaMapMarkerAlt } from "react-icons/fa";
import AuthImage from "../assets/for.png";
import OtpInput from "./OtpInupt";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const { requestOtp, isSuccesRequest, isSuccessOTP, loading, validateOtp } =
    useAuth();

  const handleRequestOtp = async () => {
    await requestOtp({
      email_or_phone_number: emailOrPhone,
    });
  };

  const otpResult = otp.join("");

  const handleValidateOTP = async () => {
    await validateOtp({ otp: otpResult, otp_purpose: "CHANGE_PASSWORD" });
    localStorage.setItem("otp", otpResult);
  };

  useEffect(() => {
    if (isSuccessOTP) {
      navigate("/auth/reset-password");
    }
  }, [isSuccessOTP]);

  //   {
  //     "otp":"5205",
  //     "otp_purpose": "CHANGE_PASSWORD" // CHANGE_PASSWORD | FORGOT_PASSWORD | SIGNUP_COMPLETE | PASSWORD_RESET | ACCOUNT_VALIDATION
  // }

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
          bgSize="50% 50%"
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
              Forgot Password
            </Text>
            <Text color="black" mb={6} textAlign="center" fontFamily="Poppins">
              Kindly enter your registered email or phone number to reset your
              password
            </Text>
            {!isSuccesRequest ? (
              <>
                <Box mb={4}>
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
                </Box>

                <Button
                  color="white"
                  bg="#FF5733"
                  height="48px"
                  width="100%"
                  borderRadius="full"
                  mb={4}
                  onClick={handleRequestOtp}
                  isLoading={loading}
                  loadingText="Loading..."
                >
                  Continue
                </Button>
              </>
            ) : (
              <Flex
                direction="column"
                align="center"
                justify="center"
                bg="#FFFBF8"
              >
                <OtpInput otp={otp} setOtp={setOtp} />
                <Button
                  mt={6}
                  w="300px"
                  h="50px"
                  bg="#FF5733"
                  color="white"
                  borderRadius="full"
                  isLoading={loading}
                  _hover={{ bg: "#E04E2C" }}
                  isDisabled={otp.some((digit) => digit === "")}
                  onClick={handleValidateOTP}
                >
                  Continue
                </Button>
              </Flex>
            )}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default ForgetPassword;
