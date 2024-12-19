import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Logo from "../../assets/soto.png";
import AuthImage from "../../assets/aov.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCallback } from "react";

export default function ApprovePage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleApporvedPage = useCallback(() => {
    if (user?.vendor_status === "APPROVED") {
      navigate("/vendor-overview");
    }
  }, [user, navigate]);
  return (
    <Box height="100%">
      <Flex dir="row" alignItems="center" gap="350px">
        <Image
          src={Logo}
          alt="Logo"
          py={8}
          px={8}
          width="120px"
          onClick={() => navigate("/")}
          cursor="pointer"
        />
        <Heading size="lg" textAlign="center">
          Awaiting Admin Approval!!
        </Heading>
      </Flex>
      <Flex
        bg={
          user?.vendor_status === "APPROVED"
            ? "green"
            : user?.vendor_status === "PENDING"
            ? "#FFC900"
            : "red"
        }
        color="white"
        h="30px"
        w="100px"
        borderRadius="5"
        fontSize="16px"
        fontWeight="bold"
        alignItems="center"
        justifyContent="center"
        mx="auto"
      >
        {user?.vendor_status}
      </Flex>
      <Flex
        direction={{ base: "column" }}
        minHeight="calc(100vh - 56px)"
        // justifyContent="center"
        // alignItems="center"
      >
        <Box
          flex="1"
          bgImage={AuthImage}
          bgSize="30%"
          bgRepeat="no-repeat"
          bgPosition="center"
          display={{ base: "none", md: "block" }}
        />

        <Box
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
        >
          <Text>
            Your registration will be approved by the admin within a short time
          </Text>
          <Button
            color="white"
            bg="#FF5733"
            height="48px"
            width="300px"
            justifySelf="center"
            borderRadius="md"
            my={8}
            onClick={handleApporvedPage}
          >
            Check Status
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
