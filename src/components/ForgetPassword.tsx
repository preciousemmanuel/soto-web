import { useState } from "react";
import {
  Box,
  Text,
  Input,
  Button,
  VStack,
  Flex,
  // Flex,
  Icon,
} from "@chakra-ui/react";
import { useAuth } from "../layouts/hooks/useAuth";
import { FaGlobe, FaMapMarkerAlt } from "react-icons/fa";

const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { requestOtp } = useAuth();
  const { resetPassword } = useAuth();

  const handleRequestOtp = async () => {
    const response: any = await requestOtp({
      email_or_phone_number: emailOrPhone,
    });
    if (response) setStep(2);
  };

  const handleResetPassword = async () => {
    await resetPassword({ new_password: newPassword, otp });
  };

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
      <Box w="100%" maxW="400px" mx="auto" p={4} mt={32}>
        <VStack spacing={6}>
          {step === 1 && (
            <>
              <Text fontSize="lg" fontWeight="bold">
                Forgot Password
              </Text>
              <Input
                placeholder="Enter your email or phone number"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
              />
              <Button
                bg="#FF5733"
                color="white"
                // isLoading={requestLoading}
                onClick={handleRequestOtp}
                w="full"
              >
                Request OTP
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <Text fontSize="lg" fontWeight="bold">
                Reset Password
              </Text>
              <Input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Input
                placeholder="Enter New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Button
                bg="#FF5733"
                color="white"
                // isLoading={resetLoading}
                onClick={handleResetPassword}
                w="full"
              >
                Reset Password
              </Button>
            </>
          )}
        </VStack>
      </Box>
    </Box>
  );
};

export default ForgetPassword;
