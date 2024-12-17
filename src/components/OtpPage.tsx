import { Box, Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Text, Icon } from "@chakra-ui/react";
import { useAuth } from "../layouts/hooks/useAuth";
import { FaGlobe, FaMapMarkerAlt } from "react-icons/fa";
import AuthImage from "../assets/for.png";
import OtpInput from "./OtpInupt";
import { useNavigate } from "react-router-dom";

const OtpVerification = () => {
  const navigate = useNavigate();
  const {
    loading,
    validateOtp,
    isSuccessOTP,
    isAuthenticated
  } = useAuth();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpResult = otp.join("");

  const handleValidateOTP = async () => {
    await validateOtp({ otp: otpResult, otp_purpose: "ACCOUNT_VALIDATION" });
  };

  useEffect(() => {
    if (isSuccessOTP) {
      if (isAuthenticated) {
        navigate("/auth");
      }else{
        navigate("/auth/vendor-login");
      }
    }
  }, [isSuccessOTP]);

  return (
    <Box minHeight="100vh">
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
             OTP Verification
            </Text>
            <Text color="black" mb={6} textAlign="center" fontFamily="Poppins">
            Kindly enter the 4 digits OTP sent to your email or phone number to proceed
            </Text>

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
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default OtpVerification;
