import { Box, Button, Flex, Heading, Image, Text, useToast } from "@chakra-ui/react";
import Logo from "../../assets/soto.svg";
import AuthImage from "../../assets/aov.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCallback } from "react";

export default function ApprovePage() {
  const navigate = useNavigate();
  const { user, refetchProfile } = useAuth();
  const toast = useToast();
// console.log(user,"USERR")
  const handleApprovedPage = useCallback(async () => {
    if (user?.vendor_status === "APPROVED") {
      try {
        const { data, isError } = await refetchProfile(); 
        if (!isError) {
        //  console.log(data) 
          navigate("/vendor-overview");
        }
        toast({
          title: `Status: ${data?.vendor_status}`,
          description: data?.vendor_status === "APPROVED" 
            ? "Your business registration is approved."
            : undefined,
          status: data?.vendor_status === "APPROVED" ? "success" : undefined,
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      } catch (error) {
        console.error("Error during profile refetch:", error);
      }
    } else {
      toast({
        title: `Status: ${user?.vendor_status}`,
        description: user?.vendor_status === "PENDING" 
          ? "Your business registration is still pending approval."
          : "Your business registration status needs attention.",
        status: user?.vendor_status === "PENDING" ? "warning" : "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
    }
  }, [user?.vendor_status, refetchProfile, navigate]);

  return (
    <Box height="100%">
      <Flex dir="row" alignItems="center">
        <Image
          src={Logo}
          alt="Logo"
          py={4}
          px={8}
          width="120px"
          onClick={() => navigate("/")}
          cursor="pointer"
        />
      </Flex>
      <Heading size="lg" textAlign="center" py={2}>
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
        h="30px"
        w="100px"
        borderRadius="5"
        fontSize="16px"
        fontWeight="bold"
        alignItems="center"
        justifyContent="center"
        mx="auto"
        mb={4}
      >
        {user?.vendor_status}
      </Flex>
      <Flex
        direction={{ base: "column" }}
        minHeight="100%"
        position="relative"
      >
        <Box
          bgImage={AuthImage}
          bgSize="contain"
          bgRepeat="no-repeat"
          bgPosition="center"
          display={{ base: "none", md: "block" }}
          height="300px"
          width="100%"
          opacity={0.8}
          mb={8}
        />

        <Box
          display="flex"
          flexDir="column"
          justifyContent="center"
          alignItems="center"
          mt={{ base: 20, md: 0 }}
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
            my={2}
            onClick={handleApprovedPage}
          >
            Check Status
          </Button>
        </Box>
      </Flex>
    </Box>
  );
}
