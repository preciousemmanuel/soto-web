import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Logo from "../../assets/soto.png";
import AuthImage from "../../assets/aov.png";
import { useNavigate } from "react-router-dom";

export default function ApprovePage() {
  const navigate = useNavigate();
  return (
    <Box minHeight="100vh">
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

        <Box display="flex" flexDir="column" justifyContent="center" alignItems="center">
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
              onClick={() => navigate("/auth/vendor-login")}
            //   isLoading={loading}
            //   loadingText="Logging in"
          >
            Check Status
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
