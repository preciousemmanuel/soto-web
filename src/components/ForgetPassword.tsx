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
import { Link, useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const navigate = useNavigate();
  const [canResend, setCanResend] = useState(false);
  const [timer, setTimer] = useState(60);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const { requestOtp, isSuccesRequest, isSuccessOTP, loading, validateOtp } =
    useAuth();

  useEffect(() => {
    if (isSuccesRequest) {
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev === 0) {
            clearInterval(countdown);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [isSuccesRequest]);

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

  const handleResendOtp = async () => {
    await requestOtp({
      email_or_phone_number: emailOrPhone,
    });
    setCanResend(false);
    setTimer(60);
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
              Forgot Password
            </Text>
            <Text
              color="black"
              mb={{ base: 4, sm: 6 }}
              textAlign="center"
              fontFamily="Poppins"
              fontSize={{ base: "sm", sm: "md" }}
            >
              Kindly enter your registered email or phone number to reset your
              password
            </Text>
            {!isSuccesRequest ? (
              <>
                <Box mb={{ base: 3, sm: 4 }}>
                  <Input
                    placeholder="Enter your email or username"
                    height={{ base: "48px", sm: "52px" }}
                    bg="#F8EDEA80"
                    outline="none"
                    borderRadius="xl"
                    fontSize={{ base: "sm", sm: "md" }}
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                  />
                </Box>

                <Button
                  color="white"
                  bg="#FF5733"
                  height={{ base: "44px", sm: "48px" }}
                  width="100%"
                  borderRadius="full"
                  mb={{ base: 3, sm: 4 }}
                  onClick={handleRequestOtp}
                  isLoading={loading}
                  loadingText="Loading..."
                  fontSize={{ base: "sm", sm: "md" }}
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
                  mt={{ base: 4, sm: 6 }}
                  w={{ base: "100%", sm: "300px" }}
                  h={{ base: "48px", sm: "50px" }}
                  bg="#FF5733"
                  color="white"
                  borderRadius="full"
                  isLoading={loading}
                  _hover={{ bg: "#E04E2C" }}
                  isDisabled={otp.some((digit) => digit === "")}
                  onClick={handleValidateOTP}
                  fontSize={{ base: "sm", sm: "md" }}
                >
                  Continue
                </Button>
                <Text mt={2} color="gray.500">
                  {canResend ? (
                    <Button
                      variant="link"
                      color="#FF5733"
                      onClick={handleResendOtp}
                      disabled={!canResend}
                    >
                      Resend OTP
                    </Button>
                  ) : (
                    `Resend OTP in ${timer} seconds`
                  )}
                </Text>
              </Flex>
            )}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default ForgetPassword;
