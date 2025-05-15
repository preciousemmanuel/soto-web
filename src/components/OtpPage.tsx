import { Box, Button, Flex } from "@chakra-ui/react";
import { Text, Icon } from "@chakra-ui/react";
import { FaGlobe, FaMapMarkerAlt } from "react-icons/fa";
import AuthImage from "../assets/for.png";
import OtpInput from "./OtpInupt";
import React, { useState, useEffect } from "react";
const OtpPage = ({
  loading,
  onClick,
  otp,
  setOtp,
  onResend,
}: {
  loading: boolean;
  onClick: () => void;
  otp: any;
  setOtp: (otp: any) => void;
  onResend: () => void;
}) => {
  const [timeLeft, setTimeLeft] = React.useState(60);
  const [showResend, setShowResend] = useState(false);

  React.useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowResend(true);
    }
  }, [timeLeft]);

  const handleResend = () => {
    setTimeLeft(60);
    setShowResend(false);
    onResend();
  };
  return (
    <Box height="100%">
      <Flex
        bg="#FFF2ED"
        px={{ base: 2, md: 4 }}
        py={{ base: 2, md: 4 }}
        justify="space-between"
        align="center"
        fontSize={{ base: "xs", md: "sm" }}
      >
        <Text fontWeight="500" color="gray" fontSize={{ base: "xs", md: "sm" }}>
          20% off store
        </Text>
        <Flex align="center" gap={{ base: 2, md: 4 }}>
          <Flex align="center" color="gray">
            <Icon as={FaMapMarkerAlt} mr={1} boxSize={{ base: 3, md: 4 }} />
            <Text fontSize={{ base: "xs", md: "sm" }}>Location</Text>
          </Flex>
          <Flex align="center" color="gray">
            <Icon as={FaGlobe} mr={1} boxSize={{ base: 3, md: 4 }} />
            <Text fontSize={{ base: "xs", md: "sm" }}>ENG</Text>
          </Flex>
          <Text
            fontWeight="500"
            color="#FF5733"
            fontSize={{ base: "xs", md: "sm" }}
          >
            Buy & sell on Soto
          </Text>
        </Flex>
      </Flex>
      <Flex
        direction={{ base: "column", md: "row" }}
        minHeight={{ base: "calc(100vh - 48px)", md: "calc(100vh - 56px)" }}
      >
        <Box
          flex="1"
          bgImage={AuthImage}
          bgSize={{ base: "30% 30%", md: "50% 50%" }}
          bgRepeat="no-repeat"
          bgPosition="center"
          display={{ base: "none", md: "block" }}
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
          <Box width="100%" maxWidth={{ base: "300px", md: "400px" }}>
            <Text
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="600"
              mb={2}
              textAlign="center"
              fontFamily="Poppins"
              color="#FF5733"
            >
              OTP Verification
            </Text>
            <Text
              color="black"
              mb={{ base: 4, md: 6 }}
              textAlign="center"
              fontFamily="Poppins"
              fontSize={{ base: "sm", md: "md" }}
            >
              Kindly enter the 4 digits OTP sent to your email or phone number
              to proceed
            </Text>

            <Flex
              direction="column"
              align="center"
              justify="center"
              bg="#FFFBF8"
            >
              <OtpInput otp={otp} setOtp={setOtp} />
              {showResend ? (
                <Button
                  mt={2}
                  variant="link"
                  color="#FF5733"
                  onClick={handleResend}
                  fontSize={{ base: "sm", md: "md" }}
                >
                  Resend OTP
                </Button>
              ) : (
                <Text mt={2} color="gray.500" fontSize={{ base: "sm", md: "md" }}>
                  Resend OTP in {timeLeft} seconds
                </Text>
              )}
              <Button
                mt={{ base: 4, md: 6 }}
                w={{ base: "250px", md: "300px" }}
                h={{ base: "40px", md: "50px" }}
                bg="#FF5733"
                color="white"
                borderRadius="full"
                isLoading={loading}
                _hover={{ bg: "#E04E2C" }}
                isDisabled={otp.some((digit: any) => digit === "")}
                onClick={onClick}
                fontSize={{ base: "sm", md: "md" }}
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

export default OtpPage;
