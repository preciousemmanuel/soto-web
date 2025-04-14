import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import Logo from "../../assets/soto.svg";
import AuthImage from "../../assets/aov.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCallback, useState } from "react";

export default function ApprovePage() {
  const navigate = useNavigate();
  const { user, refetchProfile } = useAuth();
  const toast = useToast();
  // console.log(user,"USERR")
  const handleApprovedPage = useCallback(async () => {
    try {
      const { data } = await refetchProfile();
      if (user?.vendor_status === "APPROVED") {
        toast({
          title: `Status: ${data?.vendor_status}`,
          description:
            data?.vendor_status === "APPROVED"
              ? "Your business registration is approved."
              : undefined,
          status: data?.vendor_status === "APPROVED" ? "success" : undefined,
          duration: 2000,
          isClosable: true,
          position: "top",
        });
        navigate("/vendor-overview");
      } else {
        toast({
          title: `Status: ${user?.vendor_status}`,
          description:
            user?.vendor_status === "PENDING"
              ? "Your business registration is still pending approval."
              : "Your business registration status needs attention.",
          status: user?.vendor_status === "PENDING" ? "warning" : "error",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      }
    } catch (error) {
      console.error("Error during profile refetch:", error);
    }
  }, [user?.vendor_status, navigate]);

  return (
    <Box height="100vh" px={{ base: 4, md: 8 }}>
      <Flex dir="row" alignItems="center" justifyContent="center">
        <Image
          src={Logo}
          alt="Logo"
          py={{ base: 2, md: 4 }}
          px={{ base: 4, md: 8 }}
          width={{ base: "80px", md: "120px" }}
          onClick={() => navigate("/")}
          cursor="pointer"
        />
      </Flex>
      <Heading
        size={{ base: "md", md: "lg" }}
        textAlign="center"
        py={{ base: 1, md: 2 }}
        fontSize={{ base: "xl", md: "2xl" }}
      >
        Awaiting Admin Approval!!!
      </Heading>
      <Flex
        bg={
          user?.vendor_status === "APPROVED"
            ? "green"
            : user?.vendor_status === "PENDING"
            ? "#FFC900"
            : undefined
        }
        color="white"
        h={{ base: "24px", md: "30px" }}
        w={{ base: "80px", md: "100px" }}
        borderRadius="5"
        fontSize={{ base: "sm", md: "16px" }}
        fontWeight="bold"
        alignItems="center"
        justifyContent="center"
        mx="auto"
        mb={{ base: 2, md: 4 }}
      >
        {user?.vendor_status}
      </Flex>
      <Flex
        direction="column"
        minHeight="100%"
        position="relative"
        mt={{ base: 4, md: 8 }}
      >
        <Box
          bgImage={AuthImage}
          bgSize="contain"
          bgRepeat="no-repeat"
          bgPosition="center"
          display={{ base: "none", md: "block" }}
          height={{ base: "200px", md: "300px" }}
          width="100%"
          opacity={0.8}
          mb={{ base: 4, md: 8 }}
        />

        <Box
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          mt={{ base: 8, md: 0 }}
          px={{ base: 2, md: 0 }}
        >
          <Text
            fontSize={{ base: "sm", md: "md" }}
            textAlign="center"
            mb={{ base: 2, md: 4 }}
          >
            Your registration will be approved by the admin within a short time
          </Text>
          <Button
            color="white"
            bg="#FF5733"
            height={{ base: "40px", md: "48px" }}
            width={{ base: "80%", sm: "300px" }}
            maxW="300px"
            justifySelf="center"
            borderRadius="md"
            my={{ base: 1, md: 2 }}
            fontSize={{ base: "sm", md: "md" }}
            onClick={handleApprovedPage}
          >
            Check Status
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
